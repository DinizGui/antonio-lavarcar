"""Gera os clipes do site via API da Higgsfield e prepara para a web.

Fluxo por clipe:
  1. still: Grok Image 2 (edição) usando a foto da Cayenne como referência,
     já no visual preto e dourado do site
  2. vídeo: Kling 3.0 Pro image-to-video animando esse still (5s, sem som)
  3. ffmpeg: MP4 H.264 + WebM VP9 sem áudio, <= 1920px, < 4 MB, poster .jpg

Credencial: HF_KEY="api-key:api-secret" em .env.local (nunca é impressa).
Cada etapa é pulada se o arquivo já existir, então rodar de novo não cobra de novo.

uso:
  python scripts/generate_media.py                 # todos
  python scripts/generate_media.py hero_foam reveal  # só alguns
  python scripts/generate_media.py --stills-only   # só os stills (pra revisar antes do vídeo)
  python scripts/generate_media.py --encode-only   # só refaz o ffmpeg
"""
from __future__ import annotations

import json
import os
import subprocess
import sys
import traceback
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REF_CAR = ROOT / "scripts" / "ref" / "cayenne.jpg"
WORK = ROOT / "media-src"  # stills e brutos (fora do public, fora do git)
OUT = ROOT / "public" / "media"

IMAGE_MODEL = "xai/grok-imagine-image-2.0"
VIDEO_MODEL = "kling-video/v3.0/pro/image-to-video"
MAX_MB = 3.8


def load_key() -> None:
    env = ROOT / ".env.local"
    if not os.environ.get("HF_KEY") and env.exists():
        for line in env.read_text(encoding="utf-8").splitlines():
            if line.startswith("HF_KEY="):
                os.environ["HF_KEY"] = line.split("=", 1)[1].strip().strip('"')
    if ":" not in os.environ.get("HF_KEY", ""):
        sys.exit("HF_KEY ausente em .env.local (formato api-key:api-secret).")


STYLE = (
    "cinematic, shot on ARRI, dark moody studio, pure black background, warm golden rim "
    "lighting, gold highlights on water droplets, high contrast, shallow depth of field, "
    "photorealistic, 4K, no text, no logos"
)

CAR = (
    "the exact SUV coupe from the reference photo (same body shape, headlights, grille, "
    "roofline and wheels), repainted in deep gloss black, gold brake calipers, "
    "every badge, crest and emblem removed, no license plate"
)

SHOTS: dict[str, dict] = {
    "hero_foam": {
        "aspect": "16:9",
        "still": f"Close-up of the glossy hood and front headlight of {CAR}, covered in thick white "
        "snow foam, a professional car detailer's gloved hand holding a black microfiber wash mitt "
        "at the edge of the frame",
        "motion": "Slow-motion close-up of thick white snow foam sliding down the glossy hood of a "
        "black luxury SUV, a professional car detailer's gloved hand entering frame with a black "
        "microfiber wash mitt and gently wiping the foam, slow camera drift",
    },
    "pressure_wash": {
        "aspect": "16:9",
        "still": f"Professional car detailer in a black uniform with subtle gold details rinsing {CAR} "
        "with a pressure washer, backlit water mist glowing gold, three-quarter front view",
        "motion": "Professional car detailer in a black uniform with subtle gold details rinsing a "
        "black luxury SUV with a pressure washer, water jet and backlit mist glowing gold, slow "
        "camera push-in",
    },
    "hand_wash": {
        "aspect": "16:9",
        "still": f"Two professional detailers in black uniforms hand-washing the side doors of {CAR} "
        "with black microfiber mitts, rich soap suds, paint reflections",
        "motion": "Two professional detailers hand-washing a black luxury SUV with microfiber mitts, "
        "soap suds running down the doors, slow lateral tracking shot, focus on hands and paint "
        "reflections",
    },
    "interior": {
        "aspect": "16:9",
        "still": "Interior of a luxury SUV coupe like the reference car, a detailer cleaning a black "
        "leather sport seat with a soft brush and a light plume of steam, warm golden light coming "
        "through the window, macro detail of the leather texture, no logos",
        "motion": "Detailer cleaning a black leather car seat with a soft brush while steam rises, "
        "warm golden light through the window, slow macro push on the leather texture",
    },
    "polish": {
        "aspect": "16:9",
        "still": f"Close-up of a detailer using an orbital polisher on the front fender of {CAR}, "
        "mirror-like black paint with golden reflections",
        "motion": "Detailer moving an orbital polisher across black car paint, swirl marks "
        "disappearing, golden reflections sweeping across the mirror-like surface, close-up",
    },
    "reveal": {
        "aspect": "16:9",
        "still": f"Spotless {CAR} with water beads on the paint, standing alone in a black studio, "
        "golden studio light strips reflecting along its body lines, low three-quarter hero angle",
        "motion": "Slow cinematic orbit around a spotless black luxury SUV with water beads on the "
        "paint, golden studio lights reflecting along its body lines, final hero shot",
    },
    "hero_foam_mobile": {
        "aspect": "9:16",
        "still": f"Vertical close-up of the glossy hood and front headlight of {CAR}, covered in thick "
        "white snow foam, a professional car detailer's gloved hand holding a black microfiber "
        "wash mitt at the bottom of the frame",
        "motion": "Slow-motion close-up of thick white snow foam sliding down the glossy hood of a "
        "black luxury SUV, a gloved detailer's hand with a black microfiber mitt gently wiping the "
        "foam, slow vertical camera drift",
    },
}


def estimate(model: str, args: dict) -> str:
    import httpx

    try:
        r = httpx.post(
            f"https://api.higgsfield.ai/estimate/{model}",
            headers={"Authorization": f"Key {os.environ['HF_KEY']}"},
            json=args,
            timeout=30,
        ).json()
        return f"~US${r['usd']}" if "usd" in r else "sem estimativa"
    except Exception:
        return "sem estimativa"


def download(url: str, dest: Path) -> None:
    import httpx

    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(httpx.get(url, timeout=300, follow_redirects=True).content)


def subscribe(model: str, args: dict, label: str) -> dict:
    import higgsfield_client as hf

    print(f"  [{label}] {model} {estimate(model, args)} ... enviando", flush=True)
    result = hf.subscribe(model, arguments=args)
    print(f"  [{label}] status={result.get('status')} id={result.get('request_id')}", flush=True)
    return result


def gen_still(name: str, shot: dict, ref_url: str) -> Path:
    path = WORK / "stills" / f"{name}.jpg"
    if path.exists():
        print(f"  [still] já existe {path.name}")
        return path
    args = {
        "prompt": f"{shot['still']}. {STYLE}",
        "image_urls": [ref_url],
        "aspect_ratio": shot["aspect"],
        "resolution": "2k",
        "quality": "medium",
    }
    res = subscribe(IMAGE_MODEL, args, "still")
    images = res.get("images") or ([res["image"]] if res.get("image") else [])
    if not images:
        raise RuntimeError(f"sem imagem no resultado: {json.dumps(res)[:300]}")
    download(images[0]["url"], path)
    return path


def gen_video(name: str, shot: dict, still: Path) -> Path:
    import higgsfield_client as hf

    path = WORK / "raw" / f"{name}.mp4"
    if path.exists():
        print(f"  [vídeo] já existe {path.name}")
        return path
    args = {
        "prompt": f"{shot['motion']}. {STYLE}",
        "image_url": hf.upload_file(str(still)),
        "duration": 5,
        "sound": "off",
        "cfg_scale": 0.5,
    }
    res = subscribe(VIDEO_MODEL, args, "vídeo")
    url = (res.get("video") or {}).get("url")
    if not url:
        raise RuntimeError(f"sem vídeo no resultado: {json.dumps(res)[:300]}")
    download(url, path)
    return path


def ff(*args: str) -> None:
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *args], check=True)


def duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


def encode(name: str, raw: Path, vertical: bool) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    scale = "scale='min(1080,iw)':-2" if vertical else "scale='min(1920,iw)':-2"
    dur = duration(raw)
    kbps = int(MAX_MB * 8 * 1024 / dur * 0.92)
    mp4, webm, poster = OUT / f"{name}.mp4", OUT / f"{name}.webm", OUT / f"{name}.jpg"
    ff("-i", str(raw), "-an", "-vf", f"{scale},format=yuv420p", "-c:v", "libx264", "-preset", "slow",
       "-b:v", f"{kbps}k", "-maxrate", f"{int(kbps * 1.3)}k", "-bufsize", f"{kbps * 2}k",
       "-movflags", "+faststart", str(mp4))
    ff("-i", str(raw), "-an", "-vf", scale, "-c:v", "libvpx-vp9", "-b:v", f"{int(kbps * 0.8)}k",
       "-deadline", "good", "-cpu-used", "2", "-row-mt", "1", str(webm))
    ff("-ss", "0.6", "-i", str(raw), "-frames:v", "1", "-vf",
       "scale='min(720,iw)':-2" if vertical else "scale='min(1280,iw)':-2", "-q:v", "5", str(poster))
    sizes = ", ".join(f"{p.suffix[1:]} {p.stat().st_size / 1e6:.2f}MB" for p in (mp4, webm, poster))
    print(f"  [ffmpeg] {name}: {sizes}")


def main() -> None:
    encode_only = "--encode-only" in sys.argv
    stills_only = "--stills-only" in sys.argv
    names = [a for a in sys.argv[1:] if not a.startswith("--")] or list(SHOTS)
    failed: list[tuple[str, str]] = []
    ref_url = ""
    if not encode_only:
        load_key()
        import higgsfield_client as hf

        ref_url = hf.upload_file(str(REF_CAR))
    for name in names:
        shot = SHOTS[name]
        print(f"\n== {name} ({shot['aspect']})", flush=True)
        try:
            raw = WORK / "raw" / f"{name}.mp4"
            if stills_only:
                gen_still(name, shot, ref_url)
                continue
            if not encode_only:
                raw = gen_video(name, shot, gen_still(name, shot, ref_url))
            encode(name, raw, shot["aspect"] == "9:16")
        except Exception as exc:  # segue com os outros e reporta no fim
            traceback.print_exc(limit=1)
            failed.append((name, str(exc)[:200]))
    print("\n== resumo")
    for name in names:
        ok = name not in {f for f, _ in failed}
        print(f"  {'OK   ' if ok else 'FALHA'} {name}")
    for name, err in failed:
        print(f"  {name}: {err}")


if __name__ == "__main__":
    main()

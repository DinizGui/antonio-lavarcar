# antonio-lavarcar

Site institucional de estética automotiva (preto e dourado). Next.js 15 (App Router) + TypeScript + Tailwind 4, GSAP (ScrollTrigger, SplitText, `@gsap/react`) e Lenis.

## Rodar

```bash
npm install
npm run dev
```

## Mídia (Higgsfield)

Os vídeos em `public/media/` foram gerados por `scripts/generate_media.py`:

1. still no Grok Image 2 (edição) usando a foto da Cayenne em `scripts/ref/cayenne.jpg` como referência
2. animação no Kling 3.0 Pro image-to-video (5s, sem som)
3. ffmpeg: MP4 H.264 + WebM VP9, sem áudio, até 1920px, abaixo de 4 MB, poster `.jpg`

Credencial: `HF_KEY="api-key:api-secret"` em `.env.local` (fora do git).

```bash
python -m pip install higgsfield-client httpx
python scripts/generate_media.py                # gera tudo (pula o que já existe)
python scripts/generate_media.py --stills-only  # só os stills
python scripts/generate_media.py --encode-only  # só refaz o ffmpeg
```

## Dados do negócio

Todos os dados ficam em `data/site.ts`. Itens marcados com `TODO` são placeholders.

## Deploy

```bash
npx vercel --prod
```

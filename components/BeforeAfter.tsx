"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@/lib/gsap";
import { revealIn } from "@/lib/reveal";
import SectionHead from "./SectionHead";

// TODO: trocar pelas fotos reais de antes e depois (mesmo enquadramento nas duas)
const BEFORE = "/media/ba-before.webp";
const AFTER = "/media/ba-after.webp";

export default function BeforeAfter() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);

  useGSAP(() => void revealIn(root.current), { scope: root });

  const fromPointer = (clientX: number) => {
    const r = frame.current!.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section ref={root} className="relative bg-ink py-24 md:py-36" aria-labelledby="antes-depois">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHead
          align="center"
          eyebrow="Antes e depois"
          title={
            <span id="antes-depois">
              Arraste e veja a <span className="text-gold italic">diferença</span>.
            </span>
          }
          text="Mesma pintura, mesma luz. Só mudou o cuidado."
        />

        <div
          ref={frame}
          data-reveal
          className="gold-border relative mx-auto mt-14 aspect-[4/3] max-w-5xl cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[3px] sm:aspect-[16/9] md:mt-20"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            fromPointer(e.clientX);
          }}
          onPointerMove={(e) => e.buttons === 1 && fromPointer(e.clientX)}
        >
          <Image src={AFTER} alt="Depois: pintura preta polida e espelhada" fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src={BEFORE} alt="Antes: pintura opaca, empoeirada e com marcas" fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
          </div>

          <span className="absolute left-4 top-4 bg-ink/70 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.3em] text-cream/80 backdrop-blur">Antes</span>
          <span className="absolute right-4 top-4 bg-ink/70 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.3em] text-gold-1 backdrop-blur">Depois</span>

          <div className="pointer-events-none absolute inset-y-0 w-px bg-gradient-to-b from-gold-3 via-gold-1 to-gold-3" style={{ left: `${pos}%` }}>
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold-1 bg-ink/80 text-gold-1 backdrop-blur">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
              </svg>
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(pos)}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Comparar antes e depois"
            className="peer absolute inset-x-0 bottom-0 h-px w-full opacity-0"
          />
        </div>
      </div>
    </section>
  );
}

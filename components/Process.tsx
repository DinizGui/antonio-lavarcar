"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";
import { revealIn } from "@/lib/reveal";
import { scrollToY } from "@/lib/lenis";
import { steps } from "@/data/site";
import LazyVideo from "./LazyVideo";
import SectionHead from "./SectionHead";

const head = (
  <SectionHead
    eyebrow="Processo"
    title={
      <>
        Cinco etapas. <span className="text-gold italic">Nenhum atalho.</span>
      </>
    }
  />
);

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      revealIn(root.current);
      const mm = gsap.matchMedia();
      // desktop: seção pinada, scroll troca a etapa e enche a linha dourada
      mm.add(MQ.desktop, () => {
        const n = steps.length;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".pin-wrap",
            start: "top top",
            end: `+=${n * 75}%`,
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n * 0.999))),
          },
        });
        tl.fromTo(".progress-fill", { scaleY: 0 }, { scaleY: 1, ease: "none" });
        return () => tl.scrollTrigger?.kill();
      });
    },
    { scope: root },
  );

  const jump = (i: number) => {
    const st = ScrollTrigger.getAll().find((t) => t.pin === root.current?.querySelector(".pin-wrap"));
    if (!st) return;
    const y = st.start + ((st.end - st.start) * (i + 0.5)) / steps.length;
    scrollToY(y);
  };

  return (
    <section id="processo" ref={root} className="relative bg-ink-2">
      {/* desktop com movimento: pinado */}
      <div className="pin-wrap relative hidden h-screen overflow-hidden md:motion-safe:block">
        <div className="mx-auto grid h-full max-w-7xl grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-14 px-8 pt-16">
          <div>
            {head}
            <ol className="relative mt-12 pl-8">
              <span className="absolute bottom-2 left-0 top-2 w-px bg-white/10" aria-hidden="true" />
              <span className="progress-fill absolute bottom-2 left-0 top-2 w-px origin-top bg-gradient-to-b from-gold-1 via-gold-2 to-gold-3" aria-hidden="true" />
              {steps.map((s, i) => (
                <li key={s.name} className="relative py-3">
                  <span
                    className={`absolute -left-[2.3rem] top-[1.35rem] h-2.5 w-2.5 rounded-full border transition-colors duration-500 ${
                      i <= active ? "border-gold-1 bg-gold-1" : "border-white/25 bg-ink-2"
                    }`}
                    aria-hidden="true"
                  />
                  <button type="button" onClick={() => jump(i)} className="text-left" aria-current={i === active ? "step" : undefined}>
                    <span className={`block font-serif text-3xl transition-colors duration-500 lg:text-[2.1rem] ${i === active ? "text-cream" : "text-cream/35"}`}>
                      <span className="mr-3 text-base text-gold-2">{String(i + 1).padStart(2, "0")}</span>
                      {s.name}
                    </span>
                  </button>
                  <p
                    className={`max-w-sm overflow-hidden text-[0.95rem] leading-relaxed text-mute transition-[opacity,max-height] duration-500 ${
                      i === active ? "mt-2 max-h-24 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {s.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="gold-border relative aspect-[16/10] overflow-hidden rounded-[3px] bg-ink">
            {steps.map((s, i) => (
              <div key={s.name} className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}>
                <LazyVideo name={s.video} active={i === active} preloadInactive={Math.abs(i - active) <= 1} className="h-full w-full object-cover" />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-7 font-serif text-xl text-cream/90">
              <span className="text-gold">{String(active + 1).padStart(2, "0")}</span>
              <span className="text-cream/40"> / {String(steps.length).padStart(2, "0")}</span>
            </p>
          </div>
        </div>
      </div>

      {/* celular e movimento reduzido: lista simples */}
      <div className="stack mx-auto max-w-7xl px-4 py-24 md:px-8 md:motion-safe:hidden">
        {head}
        <ol className="mt-12 grid gap-12 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.name} data-reveal>
              <div className="gold-border relative aspect-video overflow-hidden rounded-[3px] bg-ink">
                <LazyVideo name={s.video} className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-6 font-serif text-3xl text-cream">
                <span className="mr-3 text-base text-gold-2">{String(i + 1).padStart(2, "0")}</span>
                {s.name}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

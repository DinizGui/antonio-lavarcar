"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { revealIn } from "@/lib/reveal";
import { waLink } from "@/data/site";
import LazyVideo from "./LazyVideo";

const points = ["Extração de bancos e carpetes", "Vapor que higieniza sem encharcar", "Hidratação de couro com pH neutro", "Ozônio para tirar odores"];

export default function Interior() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealIn(root.current);
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        gsap.fromTo(".int-text", { yPercent: 18 }, { yPercent: -18, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(".int-media", { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-ink-2 py-24 md:py-40" aria-labelledby="interior-title">
      <div className="glow -left-40 bottom-0 h-[34rem] w-[34rem]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-12 md:gap-16 md:px-8">
        <div data-reveal className="gold-border relative aspect-[4/5] overflow-hidden rounded-[3px] md:col-span-7 md:aspect-[5/4]">
          <div className="int-media absolute inset-0 will-change-transform">
            <LazyVideo name="interior" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="int-text md:col-span-5">
          <p data-reveal className="eyebrow flex items-center gap-4">
            <span className="hairline inline-block w-10" aria-hidden="true" />
            Interior
          </p>
          <h2 id="interior-title" data-reveal className="mt-5 font-serif text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.02]">
            Por dentro, o carro <span className="text-gold italic">volta a ser novo</span>.
          </h2>
          <p data-reveal className="mt-6 text-base leading-relaxed text-mute md:text-lg">
            É onde você passa o tempo. Tiramos a sujeira que não aparece na foto e devolvemos o couro macio, sem brilho de silicone e sem cheiro forte.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} data-reveal className="flex items-center gap-4 text-cream/85">
                <span className="hairline inline-block w-6 shrink-0" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <a data-reveal href={waLink("Olá! Vim pelo site e quero agendar uma higienização interna.")} target="_blank" rel="noopener" className="btn-gold mt-10">
            Agendar higienização
          </a>
        </div>
      </div>
    </section>
  );
}

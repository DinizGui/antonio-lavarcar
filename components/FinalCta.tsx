"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MQ } from "@/lib/gsap";
import { revealIn } from "@/lib/reveal";
import { waLink } from "@/data/site";
import LazyVideo from "./LazyVideo";
import { WhatsIcon } from "./Icons";

export default function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealIn(root.current, "[data-reveal]:not(.cta-title)");
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const split = SplitText.create(".cta-title", { type: "words", mask: "words" });
        gsap.set(".cta-title", { opacity: 1 });
        gsap.from(split.words, { yPercent: 110, duration: 1.2, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: ".cta-title", start: "top 85%", once: true } });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-[90svh] items-center overflow-hidden bg-ink py-28" aria-labelledby="cta-title">
      <LazyVideo name="reveal" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,.55)_0%,rgba(10,10,10,.85)_70%,#0a0a0a_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8">
        <p data-reveal className="eyebrow flex items-center justify-center gap-4">
          <span className="hairline inline-block w-10" aria-hidden="true" />
          Agenda aberta
          <span className="hairline inline-block w-10" aria-hidden="true" />
        </p>
        <h2 id="cta-title" data-reveal className="cta-title mt-6 font-serif text-[clamp(2.8rem,7.5vw,6rem)] font-medium leading-[1]">
          Seu próximo reflexo <span className="text-gold italic">começa aqui</span>.
        </h2>
        <p data-reveal className="mx-auto mt-6 max-w-lg text-base text-cream/75 md:text-lg">
          Chama no WhatsApp, manda uma foto do carro e receba o orçamento na hora.
        </p>
        <a data-reveal href={waLink()} target="_blank" rel="noopener" className="btn-gold is-solid mt-11 !px-10 !py-5 !text-[0.85rem]">
          <WhatsIcon className="h-5 w-5" />
          Agendar no WhatsApp
        </a>
      </div>
    </section>
  );
}

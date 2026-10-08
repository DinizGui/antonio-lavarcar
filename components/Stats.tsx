"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { stats } from "@/data/site";

const fmt = (v: number, d: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-count]", root.current).forEach((el) => {
          const target = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals);
          const obj = { v: 0 };
          el.textContent = fmt(0, decimals);
          gsap.to(obj, {
            v: target,
            duration: 2.2,
            ease: "power3.out",
            onUpdate: () => (el.textContent = fmt(obj.v, decimals)),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        gsap.to("[data-reveal]", {
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Números" className="relative border-y border-white/5 bg-ink-2">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/5 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-8">
        {stats.map((s) => (
          <div key={s.label} data-reveal className="flex flex-col items-center gap-2 py-10 text-center md:py-14">
            <p className="font-serif text-6xl font-medium leading-none md:text-7xl">
              <span className="text-gold" data-count={s.value} data-decimals={s.decimals}>
                {fmt(s.value, s.decimals)}
              </span>
              <span className="text-gold">{s.suffix}</span>
            </p>
            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-mute">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

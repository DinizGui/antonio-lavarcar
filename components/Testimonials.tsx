"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { revealIn } from "@/lib/reveal";
import { business, testimonials } from "@/data/site";
import SectionHead from "./SectionHead";
import { Arrow, Star } from "./Icons";

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [i, setI] = useState(0);
  const [perView, setPerView] = useState(1);
  const [paused, setPaused] = useState(false);
  const max = Math.max(0, testimonials.length - perView);

  useGSAP(() => void revealIn(root.current), { scope: root });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const set = () => setPerView(mq.matches ? 2 : 1);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const go = useCallback((n: number) => setI(() => (n > max ? 0 : n < 0 ? max : n)), [max]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(track.current, { xPercent: -(100 / perView) * i, duration: reduce ? 0 : 0.9, ease: "power3.inOut" });
  }, [i, perView]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(i + 1), 6000);
    return () => clearInterval(t);
  }, [i, paused, go]);

  return (
    <section
      id="depoimentos"
      ref={root}
      className="relative overflow-hidden bg-ink-2 py-24 md:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead
            eyebrow="Clientes"
            title={
              <>
                Quem confia, <span className="text-gold italic">volta</span>.
              </>
            }
            text={`${business.rating.toLocaleString("pt-BR")} de média em ${business.reviewCount} avaliações no Google.`}
          />
          <div data-reveal className="flex gap-3">
            <button type="button" onClick={() => go(i - 1)} aria-label="Depoimento anterior" className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-2/40 text-gold-1 transition-colors hover:border-gold-1">
              <Arrow className="h-4 w-4 rotate-180" />
            </button>
            <button type="button" onClick={() => go(i + 1)} aria-label="Próximo depoimento" className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-2/40 text-gold-1 transition-colors hover:border-gold-1">
              <Arrow className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div data-reveal className="mt-14 overflow-hidden md:mt-16" aria-roledescription="carrossel" aria-label="Depoimentos">
          <ul ref={track} className="flex will-change-transform" aria-live="polite">
            {testimonials.map((t, n) => (
              <li
                key={t.name}
                className="w-full shrink-0 pr-4 lg:w-1/2"
                aria-roledescription="slide"
                aria-label={`${n + 1} de ${testimonials.length}`}
                aria-hidden={n < i || n >= i + perView}
              >
                <figure className="gold-border flex h-full flex-col rounded-[3px] bg-ink p-8 md:p-12">
                  <div className="flex gap-1" role="img" aria-label={`${t.rating} de 5 estrelas`}>
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <Star key={k} className="h-4 w-4" />
                    ))}
                  </div>
                  <blockquote className="mt-7 flex-1 font-serif text-2xl leading-snug text-cream md:text-[1.75rem]">“{t.text}”</blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-white/5 pt-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-2/50 font-serif text-lg text-gold-1">{t.name[0]}</span>
                    <span>
                      <span className="block text-sm font-semibold text-cream">{t.name}</span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-mute">{t.car}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex gap-2" aria-hidden="true">
          {Array.from({ length: max + 1 }).map((_, n) => (
            <span key={n} className={`h-px transition-all duration-500 ${n === i ? "w-12 bg-gold-1" : "w-6 bg-white/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

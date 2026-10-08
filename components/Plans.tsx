"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { revealIn } from "@/lib/reveal";
import { plans, waLink } from "@/data/site";
import SectionHead from "./SectionHead";

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default function Plans() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealIn(root.current?.querySelector(".head") ?? null);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(".plan", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: ".plans-grid", start: "top 80%", once: true } });
      });
    },
    { scope: root },
  );

  return (
    <section id="planos" ref={root} className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="glow left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="head">
          <SectionHead
            align="center"
            eyebrow="Pacotes"
            title={
              <>
                Escolha o nível de <span className="text-gold italic">cuidado</span>.
              </>
            }
            text="Preço fechado antes de começar. Se o carro precisar de algo diferente, a gente avisa antes."
          />
        </div>

        <div className="plans-grid mt-16 grid items-stretch gap-5 md:mt-20 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              data-reveal
              className={`plan relative flex flex-col rounded-[3px] ${
                p.featured ? "bg-[linear-gradient(160deg,#e8c36a_0%,#c9a24a_45%,#8c6a2a_100%)] p-px lg:-my-6" : "gold-border bg-ink-2 p-8 md:p-10"
              }`}
            >
              <div className={p.featured ? "flex h-full flex-col rounded-[2px] bg-[linear-gradient(180deg,#1a1610_0%,#0d0c0a_100%)] p-8 md:p-10 lg:py-16" : "flex h-full flex-col"}>
                {p.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[linear-gradient(120deg,#e8c36a,#c9a24a)] px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-ink">
                    Mais escolhido
                  </span>
                )}
                <h3 className="font-serif text-3xl text-cream">{p.name}</h3>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className={`font-serif text-6xl leading-none ${p.featured ? "text-gold" : "text-cream"}`}>{brl(p.price)}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-mute">{p.period}</span>
                </p>
                <div className="hairline my-8 opacity-50" />
                <ul className="flex-1 space-y-3.5">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[0.95rem] text-cream/85">
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-gold-1" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                      </svg>
                      {it}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(`Olá! Vim pelo site e quero agendar o pacote ${p.name}.`)}
                  target="_blank"
                  rel="noopener"
                  className={`btn-gold mt-10 w-full ${p.featured ? "is-solid" : ""}`}
                >
                  Quero o {p.name}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

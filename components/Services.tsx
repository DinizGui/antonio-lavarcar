"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { revealIn } from "@/lib/reveal";
import { services, waLink } from "@/data/site";
import SectionHead from "./SectionHead";
import { Arrow, ServiceIcon } from "./Icons";

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealIn(root.current?.querySelector(".head") ?? null);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          ".svc-card",
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: ".svc-grid", start: "top 82%", once: true },
          },
        );
      });
    },
    { scope: root },
  );

  // brilho dourado seguindo o mouse (só mexe em variáveis CSS)
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="servicos" ref={root} className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="glow -right-60 top-20 h-[40rem] w-[40rem]" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="head flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead
            eyebrow="Serviços"
            title={
              <>
                Do enxágue à <span className="text-gold italic">vitrificação</span>.
              </>
            }
            text="Cada serviço tem método, produto e tempo próprios. Nada de pacote genérico: a gente avalia o carro e diz o que ele precisa."
          />
        </div>

        <ul className="svc-grid mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
          {services.map((s, i) => (
            <li
              key={s.name}
              onPointerMove={onMove}
              data-reveal
              className={`svc-card card-glow gold-border group relative flex flex-col rounded-[3px] bg-ink-2 p-7 md:p-9 ${
                i === services.length - 1 ? "lg:col-span-1 sm:col-span-2 lg:col-start-2" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <ServiceIcon name={s.icon} className="h-10 w-10 text-gold-1" />
                <span className="font-serif text-sm text-cream/40">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-10 font-serif text-[1.9rem] leading-tight text-cream">{s.name}</h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-mute">{s.desc}</p>
              <div className="mt-8 flex items-end justify-between border-t border-white/5 pt-5">
                <p className="text-xs uppercase tracking-[0.2em] text-cream/60">
                  a partir de <span className="ml-1 font-serif text-2xl normal-case tracking-normal text-gold">{brl(s.price)}</span>
                </p>
                <a
                  href={waLink(`Olá! Vim pelo site e quero agendar: ${s.name}.`)}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Agendar ${s.name} pelo WhatsApp`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-2/40 text-gold-1 transition-colors group-hover:border-gold-1 group-hover:bg-gold-1 group-hover:text-ink"
                >
                  <Arrow className="h-4 w-4" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

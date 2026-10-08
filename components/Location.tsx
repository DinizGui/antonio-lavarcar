"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { revealIn } from "@/lib/reveal";
import { business, fullAddress, waLink } from "@/data/site";
import SectionHead from "./SectionHead";
import { WhatsIcon } from "./Icons";

export default function Location() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => void revealIn(root.current), { scope: root });

  const q = encodeURIComponent(`${business.fullName}, ${fullAddress}`);

  return (
    <section id="contato" ref={root} className="relative bg-ink-2 py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <SectionHead
            eyebrow="Onde estamos"
            title={
              <>
                Venha até nós ou <span className="text-gold italic">a gente busca</span>.
              </>
            }
          />
          <dl className="mt-10 space-y-8">
            <div data-reveal>
              <dt className="eyebrow">Endereço</dt>
              <dd className="mt-2 text-lg text-cream">
                {business.address.street}
                <br />
                {business.address.district}, {business.address.city}/{business.address.state}
              </dd>
              <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener" className="mt-2 inline-block text-sm text-gold-1 underline decoration-gold-3 underline-offset-4">
                Abrir rota no Maps
              </a>
            </div>
            <div data-reveal>
              <dt className="eyebrow">Horário</dt>
              <dd className="mt-2 space-y-1.5">
                {business.hours.map((h) => (
                  <p key={h.label} className="flex justify-between gap-6 border-b border-white/5 pb-1.5 text-cream/85">
                    <span>{h.label}</span>
                    <span className={h.value === "Fechado" ? "text-mute" : "text-cream"}>{h.value}</span>
                  </p>
                ))}
              </dd>
            </div>
            <div data-reveal>
              <dt className="eyebrow">WhatsApp</dt>
              <dd className="mt-2">
                <a href={waLink()} target="_blank" rel="noopener" className="inline-flex items-center gap-3 text-lg text-cream hover:text-gold-1">
                  <WhatsIcon className="h-5 w-5 text-gold-1" />
                  {business.whatsappDisplay}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div data-reveal className="gold-border relative min-h-[22rem] overflow-hidden rounded-[3px] md:col-span-7 md:min-h-[34rem]">
          <iframe
            title={`Mapa com a localização da ${business.fullName}`}
            src={`https://www.google.com/maps?q=${business.address.lat},${business.address.lng}&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(.92)_contrast(.9)_sepia(.25)_hue-rotate(5deg)]"
          />
        </div>
      </div>
    </section>
  );
}

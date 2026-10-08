"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { revealIn } from "@/lib/reveal";
import { business, gallery } from "@/data/site";
import SectionHead from "./SectionHead";

const spans = ["md:col-span-7 md:row-span-2", "md:col-span-5", "md:col-span-5", "md:col-span-4", "md:col-span-4", "md:col-span-4"];

export default function Gallery() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealIn(root.current?.querySelector(".head") ?? null);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>(".g-item", root.current).forEach((el, n) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
          tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut", delay: (n % 3) * 0.08 })
            .fromTo(el.querySelector("img"), { scale: 1.25 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0.1);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-ink py-24 md:py-36" aria-labelledby="galeria-title">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="head flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            eyebrow="Galeria"
            title={
              <span id="galeria-title">
                Detalhe é o <span className="text-gold italic">nosso padrão</span>.
              </span>
            }
          />
          <a data-reveal href={`https://instagram.com/${business.instagram}`} target="_blank" rel="noopener" className="btn-gold self-start md:self-end">
            @{business.instagram}
          </a>
        </div>

        <div className="mt-14 grid auto-rows-[14rem] grid-cols-2 gap-3 md:mt-20 md:auto-rows-[17rem] md:grid-cols-12 md:gap-4">
          {gallery.map((g, n) => (
            <figure key={g.src} className={`g-item relative overflow-hidden rounded-[3px] bg-ink-2 ${n === 0 || n === gallery.length - 1 ? "col-span-2" : ""} ${spans[n]}`}>
              <Image src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 50vw, 40vw" className="object-cover transition-transform duration-700 hover:scale-[1.04]" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

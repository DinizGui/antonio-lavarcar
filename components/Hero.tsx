"use client";

import { useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import { gsap, SplitText, useGSAP, MQ } from "@/lib/gsap";
import { business, waLink } from "@/data/site";
import { scrollToHash } from "@/lib/lenis";
import LazyVideo from "./LazyVideo";
import { WhatsIcon } from "./Icons";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [video, setVideo] = useState<string | null>(null);

  // escolhe o clipe 9:16 no celular e só baixa depois do load (não disputa com o LCP)
  useEffect(() => {
    const pick = () => setVideo(window.matchMedia("(max-width: 767px)").matches ? "hero_foam_mobile" : "hero_foam");
    if (document.readyState === "complete") requestAnimationFrame(pick);
    else window.addEventListener("load", pick, { once: true });
    return () => window.removeEventListener("load", pick);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const split = SplitText.create(".hero-title", { type: "words", mask: "words" });
        gsap.set(".hero-title", { opacity: 1 });
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(split.words, { yPercent: 115, duration: 1.3, stagger: 0.07 }, 0.15)
          .to("[data-hero-fade]", { opacity: 1, duration: 1, stagger: 0.12 }, 0.7)
          .from("[data-hero-fade]", { y: 18, duration: 1, stagger: 0.12 }, 0.7)
          .from(".hero-line", { scaleX: 0, duration: 1.4, ease: "power3.inOut" }, 0.5);

        // vídeo afunda um pouco ao rolar
        gsap.to(".hero-media", {
          yPercent: 12,
          scale: 1.06,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  const common = { alt: "", sizes: "100vw", quality: 70, priority: true };
  const { props: { srcSet: mobileSet } } = getImageProps({ ...common, src: "/media/hero_foam_mobile.jpg", width: 720, height: 1280 });
  const { props: desktopProps } = getImageProps({ ...common, src: "/media/hero_foam.jpg", width: 1280, height: 720 });

  return (
    <section id="topo" ref={root} className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink pb-24 md:items-center md:pb-0">
      <div className="hero-media absolute inset-0 will-change-transform">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileSet} />
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img {...desktopProps} className="absolute inset-0 h-full w-full object-cover" />
        </picture>
        {video && <LazyVideo key={video} name={video} eager className="absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,.55)_0%,rgba(10,10,10,.25)_35%,rgba(10,10,10,.85)_80%,#0a0a0a_100%)] md:bg-[linear-gradient(90deg,rgba(10,10,10,.92)_0%,rgba(10,10,10,.6)_45%,rgba(10,10,10,.15)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="glow -left-40 top-1/3 h-[38rem] w-[38rem]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <p data-reveal data-hero-fade className="eyebrow mb-6 flex items-center gap-4">
            <span className="hero-line hairline inline-block w-12 origin-left" />
            {business.tagline} {/* TODO: bairro/cidade */}
          </p>
          <h1 data-reveal className="hero-title font-serif text-[clamp(2.9rem,8.4vw,6.6rem)] font-medium leading-[0.98] tracking-[-0.01em] text-cream">
            Seu carro tratado <span className="text-gold italic">como obra</span> de coleção.
          </h1>
          <p data-reveal data-hero-fade className="mt-7 max-w-xl text-base leading-relaxed text-cream/75 md:text-lg">
            Lavagem técnica, polimento e vitrificação feitos à mão, com produto certo e tempo de sobra. Você agenda, a gente devolve brilhando.
          </p>
          <div data-reveal data-hero-fade className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href={waLink()} target="_blank" rel="noopener" className="btn-gold is-solid">
              <WhatsIcon className="h-4 w-4" />
              Agendar no WhatsApp
            </a>
            <a
              href="#servicos"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#servicos");
              }}
              className="btn-gold"
            >
              Ver serviços
            </a>
          </div>
        </div>
      </div>

      <div data-reveal data-hero-fade className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" aria-hidden="true">
        <span className="text-[0.62rem] uppercase tracking-[0.4em] text-cream/50">Role</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="scroll-dot absolute left-0 top-0 h-4 w-px bg-gold-1" />
        </span>
      </div>
    </section>
  );
}

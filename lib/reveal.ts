"use client";

import { gsap, MQ } from "./gsap";

/** Sobe e acende cada [data-reveal] dentro do escopo quando entra na tela. Chamar dentro do useGSAP. */
export function revealIn(scope: Element | null, selector = "[data-reveal]") {
  if (!scope) return;
  const mm = gsap.matchMedia();
  mm.add(MQ.motion, () => {
    gsap.utils.toArray<HTMLElement>(selector, scope).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } },
      );
    });
  });
  return mm;
}

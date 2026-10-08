import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (instance) instance.scrollTo(el as HTMLElement, { offset: -64, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function scrollToY(y: number) {
  if (instance) instance.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

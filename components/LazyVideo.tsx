"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  name: string;
  className?: string;
  /** quando false, não toca (e só carrega se `preloadInactive`) */
  active?: boolean;
  preloadInactive?: boolean;
  /** começa a carregar sem esperar a viewport (hero) */
  eager?: boolean;
};

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function LazyVideo({ name, className = "", active = true, preloadInactive = false, eager = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shouldLoad = (near || eager) && (active || preloadInactive);

  useEffect(() => {
    if (shouldLoad && !loaded) setLoaded(true);
  }, [shouldLoad, loaded]);

  // as <source> só existem depois do render com loaded=true
  useEffect(() => {
    if (loaded) ref.current?.load();
  }, [loaded]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !loaded) return;
    if (active && (visible || eager) && !reduced()) el.play().catch(() => {});
    else el.pause();
  }, [active, visible, loaded, eager]);

  return (
    <video
      ref={ref}
      className={className}
      poster={`/media/${name}.jpg`}
      muted
      loop
      playsInline
      autoPlay={false}
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    >
      {loaded && <source src={`/media/${name}.webm`} type="video/webm" />}
      {loaded && <source src={`/media/${name}.mp4`} type="video/mp4" />}
    </video>
  );
}

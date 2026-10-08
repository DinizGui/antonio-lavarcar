"use client";

import { useEffect, useState } from "react";
import { business, waLink } from "@/data/site";
import { scrollToHash } from "@/lib/lenis";
import { WhatsIcon } from "./Icons";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#planos", label: "Planos" },
  { href: "#depoimentos", label: "Clientes" },
  { href: "#contato", label: "Onde estamos" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToHash(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
        scrolled || open ? "border-b border-white/5 bg-ink/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <a href="#topo" onClick={(e) => go(e, "#topo")} className="font-serif text-2xl font-semibold tracking-[0.18em] md:text-[1.7rem]" aria-label={`${business.fullName}, voltar ao topo`}>
          <span className="text-gold">{business.name.toUpperCase()}</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="text-[0.78rem] uppercase tracking-[0.2em] text-cream/75 transition-colors hover:text-gold-1">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={waLink()} target="_blank" rel="noopener" className="btn-gold hidden !py-3 sm:inline-flex">
            <WhatsIcon className="h-4 w-4" />
            Agendar no WhatsApp
          </a>
          <button
            type="button"
            className="relative h-11 w-11 lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute left-2.5 right-2.5 h-px bg-gold-1 transition-transform duration-300 ${open ? "top-1/2 rotate-45" : "top-[40%]"}`} />
            <span className={`absolute left-2.5 right-2.5 h-px bg-gold-1 transition-transform duration-300 ${open ? "top-1/2 -rotate-45" : "top-[60%]"}`} />
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] border-t border-white/5 bg-ink px-4 pb-10 pt-8 lg:hidden"
      >
        <nav aria-label="Menu" className="flex flex-col">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="border-b border-white/5 py-5 font-serif text-3xl text-cream">
              {l.label}
            </a>
          ))}
        </nav>
        <a href={waLink()} target="_blank" rel="noopener" className="btn-gold is-solid mt-10 w-full">
          <WhatsIcon className="h-4 w-4" />
          Agendar no WhatsApp
        </a>
      </div>
    </header>
  );
}

import { waLink } from "@/data/site";
import { WhatsIcon } from "./Icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label="Agendar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#e8c36a,#c9a24a_50%,#8c6a2a)] text-ink shadow-[0_10px_40px_-10px_rgba(201,162,74,.7)] transition-transform duration-300 hover:scale-105 md:bottom-8 md:right-8 md:h-16 md:w-16"
    >
      <span className="pulse-ring absolute inset-0 rounded-full border border-gold-1" aria-hidden="true" />
      <WhatsIcon className="h-7 w-7" />
    </a>
  );
}

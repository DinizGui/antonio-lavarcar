import { business, fullAddress, waLink } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink">
      <div className="hairline absolute inset-x-0 top-0 opacity-40" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl font-semibold tracking-[0.18em]">
            <span className="text-gold">{business.name.toUpperCase()}</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute">{business.tagline}. Lavagem técnica, polimento, vitrificação e higienização com hora marcada.</p>
        </div>
        <div>
          <p className="eyebrow">Contato</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <a href={waLink()} target="_blank" rel="noopener" className="hover:text-gold-1">
                WhatsApp {business.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`https://instagram.com/${business.instagram}`} target="_blank" rel="noopener" className="hover:text-gold-1">
                Instagram @{business.instagram}
              </a>
            </li>
            <li>{fullAddress}</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Horário</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {business.hours.map((h) => (
              <li key={h.label}>
                {h.label}: {h.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 pb-24 pt-6 text-xs md:pb-6 text-cream/60 md:flex-row md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {business.fullName}. CNPJ {business.cnpj}
          </p>
          <p>Feito com cuidado, como nossos carros.</p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { business, fullAddress } from "@/data/site";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const title = `${business.fullName} | Lavagem técnica, polimento e vitrificação em ${business.address.city}`;
const description = `Estética automotiva de alto padrão em ${business.address.district}, ${business.address.city}. Lavagem técnica, higienização interna, polimento e vitrificação com hora marcada. Agende pelo WhatsApp.`;

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title,
  description,
  alternates: { canonical: "/" },
  keywords: ["lava-jato", "estética automotiva", "polimento", "vitrificação", "higienização interna", business.address.city, business.address.district],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: business.fullName,
    title,
    description,
    images: [{ url: "/media/og.jpg", width: 1200, height: 630, alt: business.fullName }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/media/og.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["AutoWash", "LocalBusiness"],
  "@id": `${business.url}/#negocio`,
  name: business.fullName,
  url: business.url,
  image: `${business.url}/media/og.jpg`,
  telephone: `+${business.whatsapp}`,
  priceRange: "R$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.zip,
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: business.address.lat, longitude: business.address.lng },
  openingHoursSpecification: business.hours
    .filter((h) => h.days.length)
    .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
  aggregateRating: { "@type": "AggregateRating", ratingValue: business.rating, reviewCount: business.reviewCount },
  sameAs: [`https://instagram.com/${business.instagram}`],
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
};

// liga as classes que escondem o que o GSAP revela antes da hidratação (sem flash)
const motionScript = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased">
        <SmoothScroll />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}

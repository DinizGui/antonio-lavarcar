// Dados do negócio. Tudo marcado com TODO é placeholder e precisa do dado real.

export const business = {
  name: "Aurum", // TODO: nome real do lava-jato
  fullName: "Aurum Estética Automotiva", // TODO
  tagline: "Estética automotiva de alto padrão",
  url: "https://aurum-estetica.vercel.app", // TODO: domínio definitivo
  whatsapp: "5511999999999", // TODO: número real com DDI+DDD
  whatsappDisplay: "(11) 99999-9999", // TODO
  instagram: "aurum.estetica", // TODO: @ real
  cnpj: "00.000.000/0001-00", // TODO
  address: {
    street: "Rua Augusta, 1500", // TODO
    district: "Consolação", // TODO
    city: "São Paulo", // TODO
    state: "SP", // TODO
    zip: "01304-001", // TODO
    lat: -23.5558, // TODO
    lng: -46.6596, // TODO
  },
  hours: [
    { label: "Segunda a sexta", value: "8h às 19h", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "19:00" },
    { label: "Sábado", value: "8h às 15h", days: ["Saturday"], opens: "08:00", closes: "15:00" },
    { label: "Domingo", value: "Fechado", days: [], opens: "", closes: "" },
  ], // TODO: horário real
  rating: 4.9, // TODO: nota real no Google
  reviewCount: 312, // TODO
};

export const waMessage = "Olá! Vim pelo site e quero agendar uma lavagem.";

export function waLink(message = waMessage) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const fullAddress = `${business.address.street}, ${business.address.district}, ${business.address.city}/${business.address.state}`;

export const stats = [
  { value: 3200, suffix: "+", label: "carros atendidos", decimals: 0 }, // TODO
  { value: 8, suffix: "", label: "anos de estrada", decimals: 0 }, // TODO
  { value: 4.9, suffix: "", label: "nota no Google", decimals: 1 }, // TODO
];

export type IconName = "drop" | "sparkle" | "seat" | "polish" | "shield" | "wax" | "engine";

// TODO: conferir serviços e preços reais
export const services: { name: string; desc: string; price: number; icon: IconName }[] = [
  { name: "Lavagem Simples", desc: "Carroceria, rodas e vidros com shampoo neutro e secagem sem marcas.", price: 60, icon: "drop" },
  { name: "Lavagem Completa", desc: "Externa detalhada, aspiração, painel e caixas de roda por dentro.", price: 110, icon: "sparkle" },
  { name: "Higienização Interna", desc: "Bancos, teto e carpetes com extração e vapor. Sai sem cheiro de produto.", price: 380, icon: "seat" },
  { name: "Polimento", desc: "Correção de riscos finos e marcas de lavagem, devolvendo o espelho da pintura.", price: 650, icon: "polish" },
  { name: "Vitrificação", desc: "Camada cerâmica de até 3 anos. A sujeira escorre e o brilho fica.", price: 1490, icon: "shield" },
  { name: "Enceramento", desc: "Cera de carnaúba aplicada à mão para profundidade e proteção leve.", price: 150, icon: "wax" },
  { name: "Lavagem de Motor", desc: "Limpeza a seco e vapor, com proteção dos componentes elétricos.", price: 120, icon: "engine" },
];

export const steps = [
  { name: "Pré-lavagem", desc: "Snow foam solta a sujeira pesada antes de qualquer contato com a pintura.", video: "hero_foam" },
  { name: "Lavagem técnica", desc: "Método de dois baldes e luvas de microfibra. Nada de esponja que risca.", video: "hand_wash" },
  { name: "Descontaminação", desc: "Removedor de ferro e enxágue de alta pressão tiram o que a lavagem não alcança.", video: "pressure_wash" },
  { name: "Polimento", desc: "Máquina orbital e compostos certos para cada pintura. Os riscos somem, o reflexo volta.", video: "polish" },
  { name: "Proteção", desc: "Selante ou vitrificação fecham o trabalho e seguram o brilho por meses.", video: "reveal" },
];

// TODO: valores e itens reais dos pacotes
export const plans = [
  { name: "Essencial", price: 110, period: "por lavagem", items: ["Lavagem completa", "Aspiração interna", "Pretinho nos pneus", "Limpeza de vidros"], featured: false },
  { name: "Signature", price: 790, period: "pacote", items: ["Lavagem técnica detalhada", "Higienização interna", "Polimento de um passo", "Selante de 6 meses", "Leva e traz na região"], featured: true },
  { name: "Concours", price: 2190, period: "pacote", items: ["Correção de pintura em 2 etapas", "Vitrificação de 3 anos", "Vitrificação de rodas e vidros", "Hidratação de couro", "Revisão gratuita em 30 dias"], featured: false },
];

// TODO: trocar por depoimentos reais (com autorização)
export const testimonials = [
  { name: "Rafael M.", car: "Porsche Cayenne", text: "Deixei a Cayenne pra polimento e voltou melhor que quando saiu da concessionária. Atendimento sem enrolação.", rating: 5 },
  { name: "Juliana P.", car: "BMW X5", text: "A higienização tirou um cheiro que eu já tinha desistido. Mandaram foto de cada etapa pelo WhatsApp.", rating: 5 },
  { name: "Eduardo S.", car: "Audi RS6", text: "Fiz a vitrificação faz um ano e o carro ainda lava com água e pronto. Vale cada real.", rating: 5 },
  { name: "Camila T.", car: "Volvo XC60", text: "Pontuais, cuidadosos e o carro volta perfumado na medida. Virei cliente fixa.", rating: 5 },
];

export const gallery = [
  { src: "/media/gallery/reveal.webp", alt: "SUV preto com gotas de água sob luz dourada de estúdio" },
  { src: "/media/gallery/hero_foam.webp", alt: "Capô coberto de espuma sendo lavado com luva de microfibra" },
  { src: "/media/gallery/interior.webp", alt: "Banco de couro preto sendo limpo com pincel e vapor" },
  { src: "/media/gallery/pressure_wash.webp", alt: "Profissional enxaguando SUV preto com lavadora de alta pressão" },
  { src: "/media/gallery/polish.webp", alt: "Polimento com máquina orbital no para-lama preto" },
  { src: "/media/gallery/hand_wash.webp", alt: "Dois profissionais lavando a lateral do carro à mão" },
]; // TODO: incluir fotos reais da loja e de clientes

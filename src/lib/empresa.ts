// Identificação de quem opera o site — fonte única para header, footer,
// Política de Privacidade, Termos de Uso e página Sobre.

export const EMPRESA = {
  marca: "Orienta",
  cidade: "Belo Horizonte – MG",
  email: "orienta.admi@gmail.com",
  telefone: "+55 (31) 97177-8537",
  whatsappNumero: "5531971778537",
  instagram: "@orienta.vc",
  instagramUrl: "https://www.instagram.com/orienta.vc/",
  youtube: "@orientaVC",
  youtubeUrl: "https://www.youtube.com/@orientaVC",
  dominioPrincipal: "orienta.vc",
  dominios: ["orienta.vc", "orientafinancas.com.br"],
} as const;

export const WHATSAPP_URL = `https://wa.me/${EMPRESA.whatsappNumero}`;
export const EMAIL_URL = `mailto:${EMPRESA.email}`;

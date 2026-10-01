// Identificação de quem opera o site — fonte única para header, footer,
// Política de Privacidade, Termos de Uso e página Sobre. Mantenha em dia:
// o Google Ads exige que esses dados estejam visíveis e sejam verificáveis.

export const EMPRESA = {
  marca: "Orienta",
  responsavel: "Isadora Figueiredo Lara",
  cpf: "083.785.016-98",
  cidade: "Belo Horizonte – MG",
  email: "orienta.admi@gmail.com",
  telefone: "+55 (31) 97177-8537",
  whatsappNumero: "5531971778537",
  horario: "Segunda a sexta, das 9h às 18h",
  instagram: "@orienta.vc",
  instagramUrl: "https://www.instagram.com/orienta.vc/",
  youtube: "@orientaVC",
  youtubeUrl: "https://www.youtube.com/@orientaVC",
  dominioPrincipal: "orienta.vc",
  dominios: ["orienta.vc", "orientafinancas.com.br"],
} as const;

export const WHATSAPP_URL = `https://wa.me/${EMPRESA.whatsappNumero}`;
export const EMAIL_URL = `mailto:${EMPRESA.email}`;

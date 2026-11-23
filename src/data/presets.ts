import rawPresets from "./countryPresets.json";
import { RegionPreset, RegionPresetId, WidgetConfig, WidgetStyle } from "@/types/widget";

export const REGION_PRESETS: RegionPreset[] = rawPresets.presets as RegionPreset[];

export function getPresetById(id: RegionPresetId): RegionPreset {
  return (
    REGION_PRESETS.find((preset) => preset.id === id) || REGION_PRESETS[0]
  );
}

export const WIDGET_STYLE_OPTIONS: {
  id: WidgetStyle;
  name: string;
  tag: string;
  description: string;
  bestFor: string;
}[] = [
  {
    id: "classic",
    name: "Card Clássico",
    tag: "Padrão Validado",
    description:
      "Card vertical com emojis em destaque, explicação dupla (Cookies + Café) e grade 2x2 de ações.",
    bestFor: "SaaS, Apps Web e Repositórios",
  },
  {
    id: "compact",
    name: "Minimal Compacto",
    tag: "Discreto",
    description:
      "Layout enxuto com cabeçalho alinhado, mensagem condensada e pílulas rápidas de apoio.",
    bestFor: "Portfólios, Blogs e Landing Pages",
  },
  {
    id: "banner",
    name: "Dock Horizontal",
    tag: "Wide Bar",
    description:
      "Barra panorâmica estilo dock moderno com texto à esquerda e botões agrupados à direita.",
    bestFor: "Documentações e Produtos Desktop",
  },
];

/**
 * Configuração do widget REAL exibido no próprio site Cookies & Coffee.
 * 👉 Troque pelos seus links pessoais.
 */
export const SITE_WIDGET_CONFIG: WidgetConfig = {
  presetId: "hybrid-br-global",
  style: "classic",
  nationalCoffeeUrl: "https://pagaum.cafe/",
  nationalSubUrl: "https://apoia.se/",
  intlCoffeeUrl: "https://ko-fi.com/",
  intlSubUrl: "https://github.com/sponsors/conrider3000",
  theme: "coffee",
  position: "bottom-right",
  removeWatermark: true,
};

/** Plataformas suportadas (o criador escolhe as suas). */
export const SUPPORTED_PLATFORMS: {
  name: string;
  type: "Avulso" | "Mensal" | "Avulso + Mensal";
  region: "Brasil" | "Global" | "LatAm";
}[] = [
  { name: "Pix direto", type: "Avulso", region: "Brasil" },
  { name: "Paga um Café", type: "Avulso", region: "Brasil" },
  { name: "LivePix", type: "Avulso", region: "Brasil" },
  { name: "APOIA.se", type: "Mensal", region: "Brasil" },
  { name: "Catarse", type: "Mensal", region: "Brasil" },
  { name: "Ko-fi", type: "Avulso + Mensal", region: "Global" },
  { name: "Buy Me a Coffee", type: "Avulso + Mensal", region: "Global" },
  { name: "GitHub Sponsors", type: "Avulso + Mensal", region: "Global" },
  { name: "Patreon", type: "Mensal", region: "Global" },
  { name: "Liberapay", type: "Mensal", region: "Global" },
  { name: "Open Collective", type: "Avulso + Mensal", region: "Global" },
  { name: "PayPal.me", type: "Avulso", region: "Global" },
  { name: "Stripe Payment Links", type: "Avulso + Mensal", region: "Global" },
  { name: "Cafecito", type: "Avulso", region: "LatAm" },
];

export const DEFAULT_WIDGET_CONFIG: WidgetConfig = {
  presetId: "hybrid-br-global",
  style: "classic",
  nationalCoffeeUrl: "https://pagaum.cafe/seu-usuario",
  nationalSubUrl: "https://apoia.se/seu-projeto",
  intlCoffeeUrl: "https://ko-fi.com/yourhandle",
  intlSubUrl: "https://github.com/sponsors/yourhandle",
  theme: "coffee",
  position: "bottom-right",
  removeWatermark: false,
};

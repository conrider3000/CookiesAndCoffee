export type RegionPresetId =
  | "hybrid-br-global"
  | "br-lgpd"
  | "eu-gdpr"
  | "us-ccpa"
  | "latam-es";

export type WidgetTheme = "coffee" | "light" | "dark";
export type WidgetStyle = "classic" | "compact" | "banner";
export type WidgetPosition = "bottom-right" | "bottom-left" | "center";
export type VisitorSimulationMode = "BR" | "INTL";

export interface PlatformRecommendation {
  name: string;
  type: "one-time" | "recurring";
  region: "BR" | "INTL" | "LATAM";
  fee: string;
  url: string;
  highlight: string;
}

export interface LocalizedWidgetCopy {
  title: string;
  cookiesLabel: string;
  cookiesText: string;
  coffeeLabel: string;
  coffeeText: string;
  oneTimeButton: string;
  recurringButton: string;
  rejectButton: string;
  acceptButton: string;
}

export interface RegionPreset {
  id: RegionPresetId;
  name: string;
  badge: string;
  lawName: string;
  complianceModel: "opt-in-strict" | "opt-out-ccpa" | "hybrid-geo";
  legalSummary: string;
  recommendedPlatforms: PlatformRecommendation[];
  copy: {
    BR: LocalizedWidgetCopy;
    INTL: LocalizedWidgetCopy;
  };
}

export interface WidgetConfig {
  presetId: RegionPresetId;
  style: WidgetStyle;
  nationalCoffeeUrl: string;
  nationalSubUrl: string;
  intlCoffeeUrl: string;
  intlSubUrl: string;
  theme: WidgetTheme;
  position: WidgetPosition;
  removeWatermark: boolean;
}

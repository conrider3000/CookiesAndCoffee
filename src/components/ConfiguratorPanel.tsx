"use client";

import React from "react";
import {
  LayoutGrid,
  Minimize2,
  PanelBottom,
  ExternalLink,
  Check,
} from "lucide-react";
import {
  REGION_PRESETS,
  WIDGET_STYLE_OPTIONS,
  getPresetById,
} from "@/data/presets";
import {
  RegionPresetId,
  WidgetConfig,
  WidgetPosition,
  WidgetStyle,
  WidgetTheme,
} from "@/types/widget";

interface ConfiguratorPanelProps {
  config: WidgetConfig;
  onChange: (updated: Partial<WidgetConfig>) => void;
}

export default function ConfiguratorPanel({
  config,
  onChange,
}: ConfiguratorPanelProps) {
  const activePreset = getPresetById(config.presetId);

  const renderStyleIcon = (id: WidgetStyle) => {
    if (id === "classic") return <LayoutGrid className="h-4 w-4" />;
    if (id === "compact") return <Minimize2 className="h-4 w-4" />;
    return <PanelBottom className="h-4 w-4" />;
  };

  return (
    <div className="space-y-8">
      {/* Seção 1: Galeria dos 3 Estilos de Widget */}
      <section
        id="estilos"
        className="scroll-mt-24 rounded-[28px] border border-[#E5D5C3] bg-white p-6 shadow-[0_12px_36px_-16px_rgba(59,35,20,0.08)] sm:p-8"
      >
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C583A]">
              Passo 01 • Arquitetura Visual
            </span>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight text-[#2C1810]">
              Escolha um dos 3 Estilos de Widget
            </h2>
          </div>
          <p className="text-xs text-[#6E5241]">
            Clique para testar ao vivo no palco acima
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          {WIDGET_STYLE_OPTIONS.map((styleOpt) => {
            const isSelected = config.style === styleOpt.id;
            return (
              <button
                key={styleOpt.id}
                type="button"
                onClick={() => onChange({ style: styleOpt.id })}
                className={`group relative flex flex-col justify-between rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? "border-[#3E2417] bg-[#FAF6F0] ring-1 ring-[#3E2417]"
                    : "border-[#E5D5C3] bg-white hover:border-[#C8A987] hover:bg-[#FAF6F0]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border ${
                        isSelected
                          ? "border-[#3E2417] bg-[#3E2417] text-white"
                          : "border-[#E5D5C3] bg-[#FAF6F0] text-[#5C3A21]"
                      }`}
                    >
                      {renderStyleIcon(styleOpt.id)}
                    </span>
                    <span className="rounded-full border border-[#E5D5C3] bg-white px-2 py-0.5 text-[10px] font-bold text-[#6F3E1E]">
                      {styleOpt.tag}
                    </span>
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-[#2C1810]">
                    {styleOpt.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#6E5241]">
                    {styleOpt.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#EFE5D8] pt-2.5 text-[11px] font-medium text-[#8C583A]">
                  <span>{styleOpt.bestFor}</span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-[#3E2417]" />}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Seção 2: Configurador de Links, Jurisdição e Aparência */}
      <section
        id="configurar"
        className="scroll-mt-24 space-y-7 rounded-[28px] border border-[#E5D5C3] bg-white p-6 shadow-[0_12px_36px_-16px_rgba(59,35,20,0.08)] sm:p-8"
      >
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C583A]">
            Passo 02 • Roteamento &amp; Conformidade
          </span>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight text-[#2C1810]">
            Configure seus Links e Jurisdição Legal
          </h2>
          <p className="mt-1 text-xs text-[#6E5241]">
            O widget exibe automaticamente os links nacionais para visitantes do
            Brasil e internacionais para o resto do mundo.
          </p>
        </div>

        {/* Seletor de Perfil Regional / Leis */}
        <div className="space-y-3 rounded-2xl border border-[#EFE5D8] bg-[#FAF6F0]/70 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="region-preset-select"
              className="text-xs font-bold text-[#2C1810]"
            >
              Perfil Jurídico &amp; Região
            </label>
            <span className="rounded-full bg-[#EFE3D4] px-2.5 py-0.5 text-[10px] font-bold text-[#5C3A21]">
              {activePreset.lawName}
            </span>
          </div>

          <select
            id="region-preset-select"
            value={config.presetId}
            onChange={(e) =>
              onChange({ presetId: e.target.value as RegionPresetId })
            }
            className="w-full rounded-xl border border-[#DBC3A7] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#2C1810] shadow-sm focus:border-[#3E2417] focus:outline-none"
          >
            {REGION_PRESETS.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>

          <p className="text-xs leading-relaxed text-[#6E5241]">
            {activePreset.legalSummary}
          </p>

          {/* Pílulas Clicáveis das Plataformas Recomendadas */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="mr-1 text-[11px] font-semibold text-[#8C583A]">
              Plataformas recomendadas:
            </span>
            {activePreset.recommendedPlatforms.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-[#E5D5C3] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#3E2417] transition hover:border-[#8C583A] hover:bg-[#FAF6F0]"
              >
                <span>{p.name}</span>
                <span className="text-[10px] font-normal text-[#8C6D58]">
                  ({p.fee})
                </span>
                <ExternalLink className="h-2.5 w-2.5 text-[#8C6D58]" />
              </a>
            ))}
          </div>
        </div>

        {/* Inputs dos 4 Canais Estratégicos */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="national-coffee-url"
              className="flex items-center justify-between text-xs font-bold text-[#3E2417]"
            >
              <span>☕ Café Brasil (Avulso / Pix)</span>
              <span className="rounded bg-[#FAF6F0] px-1.5 py-0.5 text-[10px] font-semibold text-[#8C583A]">
                BR
              </span>
            </label>
            <input
              id="national-coffee-url"
              type="url"
              value={config.nationalCoffeeUrl}
              onChange={(e) => onChange({ nationalCoffeeUrl: e.target.value })}
              placeholder="https://pagaum.cafe/seu-usuario"
              className="w-full rounded-xl border border-[#E5D5C3] bg-[#FAF6F0]/60 px-3.5 py-2.5 text-xs font-medium text-[#2C1810] placeholder-[#A9927D] transition focus:border-[#3E2417] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="national-sub-url"
              className="flex items-center justify-between text-xs font-bold text-[#3E2417]"
            >
              <span>🔄 Assinatura Brasil (Mensal)</span>
              <span className="rounded bg-[#FAF6F0] px-1.5 py-0.5 text-[10px] font-semibold text-[#8C583A]">
                BR
              </span>
            </label>
            <input
              id="national-sub-url"
              type="url"
              value={config.nationalSubUrl}
              onChange={(e) => onChange({ nationalSubUrl: e.target.value })}
              placeholder="https://apoia.se/seu-projeto"
              className="w-full rounded-xl border border-[#E5D5C3] bg-[#FAF6F0]/60 px-3.5 py-2.5 text-xs font-medium text-[#2C1810] placeholder-[#A9927D] transition focus:border-[#3E2417] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="intl-coffee-url"
              className="flex items-center justify-between text-xs font-bold text-[#3E2417]"
            >
              <span>🌎 Café Internacional (USD / EUR)</span>
              <span className="rounded bg-[#FAF6F0] px-1.5 py-0.5 text-[10px] font-semibold text-[#8C583A]">
                GLOBAL
              </span>
            </label>
            <input
              id="intl-coffee-url"
              type="url"
              value={config.intlCoffeeUrl}
              onChange={(e) => onChange({ intlCoffeeUrl: e.target.value })}
              placeholder="https://ko-fi.com/yourhandle"
              className="w-full rounded-xl border border-[#E5D5C3] bg-[#FAF6F0]/60 px-3.5 py-2.5 text-xs font-medium text-[#2C1810] placeholder-[#A9927D] transition focus:border-[#3E2417] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="intl-sub-url"
              className="flex items-center justify-between text-xs font-bold text-[#3E2417]"
            >
              <span>🚀 Patrocínio Internacional (Mensal)</span>
              <span className="rounded bg-[#FAF6F0] px-1.5 py-0.5 text-[10px] font-semibold text-[#8C583A]">
                GLOBAL
              </span>
            </label>
            <input
              id="intl-sub-url"
              type="url"
              value={config.intlSubUrl}
              onChange={(e) => onChange({ intlSubUrl: e.target.value })}
              placeholder="https://github.com/sponsors/yourhandle"
              className="w-full rounded-xl border border-[#E5D5C3] bg-[#FAF6F0]/60 px-3.5 py-2.5 text-xs font-medium text-[#2C1810] placeholder-[#A9927D] transition focus:border-[#3E2417] focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Tema, Posição & White-Label */}
        <div className="grid grid-cols-1 gap-4 border-t border-[#EFE5D8] pt-6 sm:grid-cols-2">
          <div className="space-y-1.5">
            <span className="block text-xs font-bold text-[#3E2417]">
              Paleta de Cores do Widget
            </span>
            <div className="grid grid-cols-3 gap-1 rounded-xl border border-[#E5D5C3] bg-[#FAF6F0] p-1">
              {(
                [
                  { id: "coffee", label: "☕ Espresso" },
                  { id: "light", label: "🍪 Creme" },
                  { id: "dark", label: "🌙 Noite" },
                ] as { id: WidgetTheme; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChange({ theme: opt.id })}
                  className={`rounded-lg py-2 text-xs font-semibold transition ${
                    config.theme === opt.id
                      ? "bg-[#3E2417] text-white shadow-sm"
                      : "text-[#6E5241] hover:text-[#2C1810]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="block text-xs font-bold text-[#3E2417]">
              Canto da Tela
            </span>
            <div className="grid grid-cols-2 gap-1 rounded-xl border border-[#E5D5C3] bg-[#FAF6F0] p-1">
              {(
                [
                  { id: "bottom-right", label: "Inferior Direito" },
                  { id: "bottom-left", label: "Inferior Esquerdo" },
                ] as { id: WidgetPosition; label: string }[]
              ).map((pos) => (
                <button
                  key={pos.id}
                  type="button"
                  onClick={() => onChange({ position: pos.id })}
                  className={`rounded-lg py-2 text-xs font-semibold transition ${
                    config.position === pos.id
                      ? "bg-[#3E2417] text-white shadow-sm"
                      : "text-[#6E5241] hover:text-[#2C1810]"
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* White-label toggle */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E5D5C3] bg-[#FAF6F0] px-4 py-3.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#2C1810]">
                Modo White-Label (ocultar &ldquo;Powered by Cookies &amp; Coffee&rdquo;)
              </span>
              <span className="rounded-full bg-[#3E2417] px-2 py-0.5 text-[10px] font-bold text-[#EBC796]">
                INDIE / PRO
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-[#6E5241]">
              Remove a assinatura discreta no rodapé do widget.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={config.removeWatermark}
            onClick={() =>
              onChange({ removeWatermark: !config.removeWatermark })
            }
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
              config.removeWatermark ? "bg-[#3E2417]" : "bg-[#D5BFA8]"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                config.removeWatermark ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </section>
    </div>
  );
}

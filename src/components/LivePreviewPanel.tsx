"use client";

import React, { useState } from "react";
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Pin,
  LayoutGrid,
  Minimize2,
  PanelBottom,
  Globe,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import CookieCoffeeWidget from "./CookieCoffeeWidget";
import { WIDGET_STYLE_OPTIONS, getPresetById } from "@/data/presets";
import {
  VisitorSimulationMode,
  WidgetConfig,
  WidgetStyle,
  WidgetTheme,
} from "@/types/widget";

interface LivePreviewPanelProps {
  config: WidgetConfig;
  visitorMode: VisitorSimulationMode;
  onVisitorModeChange: (mode: VisitorSimulationMode) => void;
  onChangeConfig: (updated: Partial<WidgetConfig>) => void;
}

export default function LivePreviewPanel({
  config,
  visitorMode,
  onVisitorModeChange,
  onChangeConfig,
}: LivePreviewPanelProps) {
  const [selectedConsent, setSelectedConsent] = useState<
    "accepted" | "rejected" | null
  >(null);
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isFloatingMode, setIsFloatingMode] = useState<boolean>(false);
  const [lastEventText, setLastEventText] = useState<string>(
    'Aguardando interação · Escolha Cookies (Aceitar/Recusar) e feche no ✕'
  );

  const preset = getPresetById(config.presetId);

  const handleConsent = (status: "accepted" | "rejected") => {
    setSelectedConsent(status);
    setLastEventText(
      `Escolha marcada: "${status}" salva no localStorage! Agora clique no ✕ para fechar (ou apoie no Café).`
    );
  };

  const handleCloseWidget = () => {
    if (!selectedConsent) return;
    setIsClosed(true);
    setLastEventText(
      `Janela fechada no ✕ após escolha "${selectedConsent}" · CustomEvent("cookieConsentChanged") ativo.`
    );
  };

  const handleReset = () => {
    setSelectedConsent(null);
    setIsClosed(false);
    setLastEventText("Consentimento resetado · Janela reaberta no palco");
  };

  const getStyleIcon = (id: WidgetStyle) => {
    if (id === "classic") return <LayoutGrid className="h-3.5 w-3.5" />;
    if (id === "compact") return <Minimize2 className="h-3.5 w-3.5" />;
    return <PanelBottom className="h-3.5 w-3.5" />;
  };

  return (
    <div id="playground" className="scroll-mt-24">
      <div className="overflow-hidden rounded-[22px] border-2 border-[#DCC5AD] bg-[#FAF5EE] p-4 shadow-[0_26px_70px_-18px_rgba(46,25,15,0.16)] sm:p-6">
        {/* Top Playground Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#E6D6C3] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#8C5230]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#26150D]">
              [ PLAYGROUND INTERATIVO · TESTE AO VIVO ]
            </span>
            <span className="rounded-full border border-[#C89D66] bg-[#F3E5D3] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#6F3E1E]">
              LIVE
            </span>
          </div>

          {/* Controles de Simulação */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 3 Estilos */}
            <div className="flex flex-wrap items-center gap-1 rounded-xl border border-[#DCC5AD] bg-white p-1">
              {WIDGET_STYLE_OPTIONS.map((styleOpt) => (
                <button
                  key={styleOpt.id}
                  type="button"
                  onClick={() => {
                    onChangeConfig({ style: styleOpt.id });
                    setIsClosed(false);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                    config.style === styleOpt.id
                      ? "bg-[#3D2214] text-[#FAF5EE] shadow-sm"
                      : "text-[#684B39] hover:bg-[#FAF5EE] hover:text-[#26150D]"
                  }`}
                >
                  {getStyleIcon(styleOpt.id)}
                  <span>{styleOpt.name}</span>
                </button>
              ))}
            </div>

            {/* Simulador Brasil vs Global */}
            <div className="inline-flex items-center rounded-xl border border-[#DCC5AD] bg-white p-1">
              <button
                type="button"
                onClick={() => onVisitorModeChange("BR")}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                  visitorMode === "BR"
                    ? "bg-[#8C5230] text-white shadow-sm"
                    : "text-[#684B39] hover:text-[#26150D]"
                }`}
              >
                🇧🇷 Visitante BR
              </button>
              <button
                type="button"
                onClick={() => onVisitorModeChange("INTL")}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                  visitorMode === "INTL"
                    ? "bg-[#8C5230] text-white shadow-sm"
                    : "text-[#684B39] hover:text-[#26150D]"
                }`}
              >
                🌎 Visitante Global
              </button>
            </div>

            {/* Tema */}
            <div className="inline-flex items-center rounded-xl border border-[#DCC5AD] bg-white p-1">
              {(
                [
                  { id: "coffee", label: "☕ Espresso" },
                  { id: "light", label: "🍪 Creme" },
                  { id: "dark", label: "🌙 Dark" },
                ] as { id: WidgetTheme; label: string }[]
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onChangeConfig({ theme: t.id })}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                    config.theme === t.id
                      ? "bg-[#F3E5D3] text-[#26150D]"
                      : "text-[#684B39] hover:text-[#26150D]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bezel da Tela Simulada */}
        <div className="mt-4 overflow-hidden rounded-2xl border-2 border-[#DCC5AD] bg-white shadow-inner">
          {/* Barra de Endereço do Navegador Simulado */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFE5D8] bg-[#F6EFE6] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#D97757]" />
              <span className="h-3 w-3 rounded-full bg-[#E6B86A]" />
              <span className="h-3 w-3 rounded-full bg-[#68A377]" />
              <span className="ml-2 rounded-lg border border-[#E2D2C0] bg-white px-3 py-1 font-mono text-xs font-medium text-[#5C3A21]">
                https://seu-produto-indie.app
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#684B39]">
              <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 font-semibold text-[#3D2214]">
                <Globe className="h-3 w-3 text-[#8C5230]" />
                {visitorMode === "BR"
                  ? "Visitante Brasil (pt-BR) → seus links nacionais"
                  : "Visitante Global (en-US) → seus links internacionais"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-[#EFE3D4] px-2 py-0.5 font-bold text-[#6F3E1E]">
                <ShieldCheck className="h-3 w-3" />
                {preset.lawName}
              </span>
            </div>
          </div>

          {/* Palco com Fundo de Página Real + Janela Cookie y Café em Destaque */}
          <div
            style={{
              backgroundImage:
                "radial-gradient(#DFCCB7 1.1px, transparent 1.1px)",
              backgroundSize: "20px 20px",
            }}
            className="relative flex min-h-[410px] flex-col items-center justify-between gap-6 p-6 sm:p-10"
          >
            {/* Contexto sutil do site hospedeiro no topo do palco */}
            <div className="flex w-full flex-wrap items-center justify-between gap-3 rounded-xl border border-[#EFE5D8] bg-white/90 px-4 py-2.5 text-xs backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[#5C3A21]">
                <span className="font-bold text-[#26150D]">
                  Roteamento ativo neste teste:
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-[#FAF5EE] px-2 py-0.5 font-mono text-[11px] text-[#6F3E1E]">
                  {visitorMode === "BR"
                    ? config.nationalCoffeeUrl
                    : config.intlCoffeeUrl}
                  <ExternalLink className="h-2.5 w-2.5" />
                </span>
                <span>+</span>
                <span className="inline-flex items-center gap-1 rounded bg-[#FAF5EE] px-2 py-0.5 font-mono text-[11px] text-[#6F3E1E]">
                  {visitorMode === "BR"
                    ? config.nationalSubUrl
                    : config.intlSubUrl}
                  <ExternalLink className="h-2.5 w-2.5" />
                </span>
              </div>

              <div className="flex items-center gap-2">
                {selectedConsent && !isClosed && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#DCC5AD] bg-white px-2.5 py-1 text-xs font-bold text-[#8C5230] hover:bg-[#FAF5EE]"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Limpar escolha</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsFloatingMode(!isFloatingMode)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold transition ${
                    isFloatingMode
                      ? "border-[#3D2214] bg-[#3D2214] text-white"
                      : "border-[#DCC5AD] bg-[#FAF5EE] text-[#3D2214] hover:bg-[#EFE3D4]"
                  }`}
                >
                  <Pin className="h-3 w-3" />
                  <span>
                    {isFloatingMode
                      ? "Desafixar da tela"
                      : "Testar flutuando na tela"}
                  </span>
                </button>
              </div>
            </div>

            {/* O Widget Cookie y Café em si */}
            <div className="my-auto flex w-full items-center justify-center py-2">
              {!isClosed ? (
                isFloatingMode ? (
                  <div className="max-w-md rounded-2xl border-2 border-dashed border-[#C89D66] bg-white/95 p-6 text-center shadow-sm">
                    <p className="text-base font-extrabold text-[#26150D]">
                      Widget flutuando na sua tela! 👇
                    </p>
                    <p className="mt-1 text-xs text-[#684B39]">
                      O widget está posicionado sobre esta página exatamente
                      como aparecerá no site do seu produto.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsFloatingMode(false)}
                      className="mt-4 rounded-xl bg-[#3D2214] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#26150D]"
                    >
                      Voltar widget para dentro do palco
                    </button>
                  </div>
                ) : (
                  <CookieCoffeeWidget
                    config={config}
                    visitorMode={visitorMode}
                    selectedConsent={selectedConsent}
                    onConsentChange={handleConsent}
                    onClose={handleCloseWidget}
                  />
                )
              ) : (
                <div className="flex max-w-md flex-col items-center rounded-2xl border-2 border-[#DCC5AD] bg-white p-7 text-center shadow-lg">
                  {selectedConsent === "accepted" ? (
                    <CheckCircle2 className="mb-2 h-9 w-9 text-[#2E7D32]" />
                  ) : (
                    <XCircle className="mb-2 h-9 w-9 text-[#8C5230]" />
                  )}
                  <p className="text-base font-extrabold text-[#26150D]">
                    {selectedConsent === "accepted"
                      ? 'Janela fechada com "accepted"'
                      : 'Janela fechada com "rejected"'}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#684B39]">
                    Você escolheu a opção de cookies (que ficou marcada sem
                    fechar o café) e clicou no <strong>✕</strong> para fechar.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#3D2214] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#26150D]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Resetar &amp; Testar Novamente</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Playground Footer Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#5C3A21]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#2E7D32]" />
            <span>{lastEventText}</span>
          </div>

          <div className="flex items-center gap-3">
            {(isClosed || selectedConsent) && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 font-bold text-[#8C5230] underline hover:text-[#26150D]"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Resetar estado</span>
              </button>
            )}
            <span className="font-mono text-[11px] text-[#8C6D58]">
              Vanilla JS · Zero dependências
            </span>
          </div>
        </div>
      </div>

      {/* Modo Flutuante Real na Página */}
      {isFloatingMode && !isClosed && (
        <div
          className={
            config.position === "center"
              ? "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
              : `fixed bottom-5 z-50 w-[calc(100vw-40px)] ${
                  config.style === "banner"
                    ? "max-w-[760px]"
                    : config.style === "compact"
                      ? "max-w-[540px]"
                      : "max-w-[560px]"
                } ${config.position === "bottom-left" ? "left-5" : "right-5"}`
          }
        >
          <CookieCoffeeWidget
            config={config}
            visitorMode={visitorMode}
            selectedConsent={selectedConsent}
            onConsentChange={handleConsent}
            onClose={handleCloseWidget}
          />
        </div>
      )}
    </div>
  );
}

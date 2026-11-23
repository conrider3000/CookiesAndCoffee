"use client";

import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { getPresetById } from "@/data/presets";
import { VisitorSimulationMode, WidgetConfig } from "@/types/widget";

interface CookieCoffeeWidgetProps {
  config: WidgetConfig;
  visitorMode: VisitorSimulationMode;
  selectedConsent?: "accepted" | "rejected" | null;
  onConsentChange: (status: "accepted" | "rejected") => void;
  onClose?: () => void;
}

export default function CookieCoffeeWidget({
  config,
  visitorMode,
  selectedConsent,
  onConsentChange,
  onClose,
}: CookieCoffeeWidgetProps) {
  const [internalConsent, setInternalConsent] = useState<
    "accepted" | "rejected" | null
  >(selectedConsent ?? null);
  const [needChoiceHint, setNeedChoiceHint] = useState(false);

  useEffect(() => {
    if (selectedConsent !== undefined) {
      setInternalConsent(selectedConsent);
    }
  }, [selectedConsent]);

  const activeConsent =
    selectedConsent !== undefined ? selectedConsent : internalConsent;

  const preset = getPresetById(config.presetId);
  const copy = visitorMode === "BR" ? preset.copy.BR : preset.copy.INTL;

  const coffeeUrl =
    visitorMode === "BR"
      ? config.nationalCoffeeUrl || "https://pagaum.cafe/"
      : config.intlCoffeeUrl || "https://ko-fi.com/";

  const subUrl =
    visitorMode === "BR"
      ? config.nationalSubUrl || "https://apoia.se/"
      : config.intlSubUrl || "https://github.com/sponsors";

  const handleSelectConsent = (status: "accepted" | "rejected") => {
    setInternalConsent(status);
    setNeedChoiceHint(false);
    onConsentChange(status);
  };

  const handleTryClose = () => {
    if (!activeConsent) {
      setNeedChoiceHint(true);
      return;
    }
    onClose?.();
  };

  const palette =
    config.theme === "light"
      ? {
          bg: "#FFFFFF",
          colBg: "#FAF5EE",
          text: "#26150D",
          muted: "#684B39",
          border: "#E2D0BC",
          coffeeBg: "#F3E3D0",
          coffeeText: "#6F3E1E",
          coffeeBorder: "#D4B592",
          subBg: "#EAE0D5",
          subText: "#3D2214",
          subBorder: "#C9B29B",
          rejectBg: "#FFFFFF",
          rejectText: "#5C3A21",
          acceptBg: "#3D2214",
          acceptText: "#FFFFFF",
          selectedRing: "#2E7D32",
        }
      : config.theme === "coffee"
        ? {
            bg: "#26150D",
            colBg: "#321C12",
            text: "#FAF5EE",
            muted: "#D4C2B2",
            border: "#4A2E1F",
            coffeeBg: "rgba(235, 199, 150, 0.16)",
            coffeeText: "#EBC796",
            coffeeBorder: "rgba(235, 199, 150, 0.42)",
            subBg: "rgba(250, 245, 238, 0.11)",
            subText: "#FAF5EE",
            subBorder: "rgba(250, 245, 238, 0.26)",
            rejectBg: "rgba(255, 255, 255, 0.03)",
            rejectText: "#E7D9C8",
            acceptBg: "#FAF5EE",
            acceptText: "#26150D",
            selectedRing: "#EBC796",
          }
        : {
            bg: "#161618",
            colBg: "#202024",
            text: "#f4f4f5",
            muted: "#a1a1aa",
            border: "#2e2e33",
            coffeeBg: "rgba(251, 191, 36, 0.14)",
            coffeeText: "#fbbf24",
            coffeeBorder: "rgba(251, 191, 36, 0.38)",
            subBg: "rgba(96, 165, 250, 0.14)",
            subText: "#60a5fa",
            subBorder: "rgba(96, 165, 250, 0.38)",
            rejectBg: "transparent",
            rejectText: "#e4e4e7",
            acceptBg: "#ffffff",
            acceptText: "#18181b",
            selectedRing: "#fbbf24",
          };

  const renderCloseButton = () => (
    <button
      type="button"
      onClick={handleTryClose}
      title={
        activeConsent
          ? visitorMode === "BR"
            ? "Fechar janela"
            : "Close window"
          : visitorMode === "BR"
            ? "Escolha uma opção de cookies antes de fechar"
            : "Choose a cookie option before closing"
      }
      aria-label={visitorMode === "BR" ? "Fechar" : "Close"}
      style={{
        borderColor: activeConsent ? palette.selectedRing : palette.border,
        backgroundColor: activeConsent ? palette.acceptBg : palette.colBg,
        color: activeConsent ? palette.acceptText : palette.muted,
      }}
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition ${
        activeConsent
          ? "cursor-pointer opacity-100 shadow-sm hover:scale-105"
          : "cursor-not-allowed opacity-55"
      }`}
    >
      <X className="h-3.5 w-3.5" />
    </button>
  );

  const renderCookieButtons = (compact = false) => {
    const isRejected = activeConsent === "rejected";
    const isAccepted = activeConsent === "accepted";
    const btnPadding = compact ? "px-2 py-2 text-[11px]" : "px-2.5 py-2.5 text-xs";

    return (
      <div className="space-y-1.5">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleSelectConsent("rejected")}
            aria-pressed={isRejected}
            style={{
              backgroundColor: isRejected ? palette.acceptBg : palette.rejectBg,
              color: isRejected ? palette.acceptText : palette.rejectText,
              borderColor: isRejected ? palette.selectedRing : palette.border,
              boxShadow: isRejected
                ? `0 0 0 2px ${palette.selectedRing}`
                : "none",
              opacity: isAccepted ? 0.55 : 1,
            }}
            className={`inline-flex items-center justify-center gap-1 rounded-lg border text-center font-bold transition hover:opacity-95 active:scale-[0.98] ${btnPadding}`}
          >
            {isRejected && <Check className="h-3.5 w-3.5 shrink-0" />}
            <span>{copy.rejectButton}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectConsent("accepted")}
            aria-pressed={isAccepted}
            style={{
              backgroundColor: palette.acceptBg,
              color: palette.acceptText,
              borderColor: isAccepted ? palette.selectedRing : palette.acceptBg,
              boxShadow: isAccepted
                ? `0 0 0 2px ${palette.selectedRing}`
                : "none",
              opacity: isRejected ? 0.55 : 1,
            }}
            className={`inline-flex items-center justify-center gap-1 rounded-lg border text-center font-bold transition hover:opacity-95 active:scale-[0.98] ${btnPadding}`}
          >
            {isAccepted && <Check className="h-3.5 w-3.5 shrink-0" />}
            <span>{copy.acceptButton}</span>
          </button>
        </div>

        {needChoiceHint && !activeConsent && (
          <p
            style={{ color: palette.coffeeText }}
            className="text-center text-[11px] font-semibold"
          >
            {visitorMode === "BR"
              ? "👆 Escolha Aceitar ou Recusar antes de fechar no ✕"
              : "👆 Please choose Accept or Reject before closing with ✕"}
          </p>
        )}

        {activeConsent && (
          <p
            style={{ color: palette.muted }}
            className="text-center text-[11px] font-medium"
          >
            {visitorMode === "BR"
              ? "✓ Escolha salva! Clique no ✕ no topo quando quiser fechar."
              : "✓ Choice saved! Click ✕ at the top whenever you're ready to close."}
          </p>
        )}
      </div>
    );
  };

  /* ESTILO 2: COMPACTO CÁPSULAS DUPLAS (Coluna 1: Cookies | Coluna 2: Café) */
  if (config.style === "compact") {
    return (
      <div
        role="dialog"
        aria-label={copy.title}
        style={{
          maxWidth: "540px",
          borderRadius: "18px",
          padding: "16px",
          backgroundColor: palette.bg,
          color: palette.text,
          border: `1px solid ${palette.border}`,
          boxShadow:
            "0 24px 48px -12px rgba(38, 21, 13, 0.28), 0 8px 16px -8px rgba(38, 21, 13, 0.16)",
        }}
        className="relative w-full transition-all duration-200"
      >
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Cookies & Coffee"
              className="h-7 w-7 object-contain"
            />
            <h3
              style={{ color: palette.text }}
              className="text-sm font-extrabold tracking-tight"
            >
              {copy.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span
              style={{
                color: palette.muted,
                borderColor: palette.border,
              }}
              className="rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase"
            >
              {visitorMode === "BR" ? "LGPD · BR" : "GDPR · INTL"}
            </span>
            {renderCloseButton()}
          </div>
        </div>

        {/* 2 Colunas Lado a Lado: Coluna 1 = Cookies | Coluna 2 = Café */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Coluna 1: Cookies + Botões de Cookies */}
          <div
            style={{
              backgroundColor: palette.colBg,
              borderColor: needChoiceHint ? palette.coffeeText : palette.border,
            }}
            className="flex flex-col justify-between rounded-xl border p-3.5 text-left"
          >
            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold">
                <span>🍪</span>
                <span style={{ color: palette.text }}>
                  {copy.cookiesLabel.replace(":", "")}
                </span>
              </div>
              <p
                style={{ color: palette.muted }}
                className="text-[12px] leading-relaxed"
              >
                {copy.cookiesText}
              </p>
            </div>

            <div className="mt-3">{renderCookieButtons(true)}</div>
          </div>

          {/* Coluna 2: Café + Botões do Café */}
          <div
            style={{
              backgroundColor: palette.colBg,
              borderColor: palette.border,
            }}
            className="flex flex-col justify-between rounded-xl border p-3.5 text-left"
          >
            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold">
                <span>☕</span>
                <span style={{ color: palette.text }}>
                  {copy.coffeeLabel.replace(":", "")}
                </span>
              </div>
              <p
                style={{ color: palette.muted }}
                className="text-[12px] leading-relaxed"
              >
                {copy.coffeeText}
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-1.5">
              <a
                href={coffeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: palette.coffeeBg,
                  color: palette.coffeeText,
                  borderColor: palette.coffeeBorder,
                }}
                className="inline-flex items-center justify-center rounded-lg border px-2 py-2 text-center text-[11px] font-bold transition hover:opacity-90"
              >
                {copy.oneTimeButton}
              </a>
              <a
                href={subUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: palette.subBg,
                  color: palette.subText,
                  borderColor: palette.subBorder,
                }}
                className="inline-flex items-center justify-center rounded-lg border px-2 py-2 text-center text-[11px] font-bold transition hover:opacity-90"
              >
                {copy.recurringButton}
              </a>
            </div>
          </div>
        </div>

        {!config.removeWatermark && (
          <div className="mt-2.5 text-center">
            <a
              href="#precos"
              style={{ color: palette.muted }}
              className="inline-block text-[10px] opacity-80 hover:underline"
            >
              <img
                src="/logo.png"
                alt=""
                aria-hidden="true"
                className="mr-1 inline-block h-4 w-4 align-[-3px] object-contain"
              />
              Powered by Cookies &amp; Coffee
            </a>
          </div>
        )}
      </div>
    );
  }

  /* ESTILO 3: DOCK HORIZONTAL PANORÂMICO (Coluna 1: Cookies | Coluna 2: Café) */
  if (config.style === "banner") {
    return (
      <div
        role="dialog"
        aria-label={copy.title}
        style={{
          maxWidth: "760px",
          borderRadius: "18px",
          padding: "20px 22px",
          backgroundColor: palette.bg,
          color: palette.text,
          border: `1px solid ${palette.border}`,
          boxShadow:
            "0 24px 48px -12px rgba(38, 21, 13, 0.28), 0 8px 16px -8px rgba(38, 21, 13, 0.16)",
        }}
        className="relative w-full transition-all duration-200"
      >
        {/* Top bar with title + X */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Cookies & Coffee"
              className="h-7 w-7 object-contain"
            />
            <h3
              style={{ color: palette.text }}
              className="text-sm font-extrabold tracking-tight"
            >
              {copy.title}
            </h3>
          </div>
          {renderCloseButton()}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Coluna Esquerda (1): Explicação de Cookies + Botões de Cookies */}
          <div className="flex flex-col justify-between text-left">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl leading-none">🍪</span>
                  <span
                    style={{ color: palette.text }}
                    className="text-sm font-extrabold"
                  >
                    {visitorMode === "BR"
                      ? "Privacidade & Cookies"
                      : "Privacy & Cookies"}
                  </span>
                </div>
                <span
                  style={{ color: palette.muted }}
                  className="font-mono text-[10px] font-bold uppercase opacity-75"
                >
                  {preset.lawName}
                </span>
              </div>
              <p
                style={{ color: palette.muted }}
                className="text-xs leading-relaxed"
              >
                {copy.cookiesText}
              </p>
            </div>

            <div className="mt-3.5">{renderCookieButtons(false)}</div>
          </div>

          {/* Coluna Direita (2): Explicação do Café + Botões do Café */}
          <div
            style={{
              borderColor: palette.border,
            }}
            className="flex flex-col justify-between border-t pt-4 text-left md:border-l md:border-t-0 md:pl-5 md:pt-0"
          >
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-xl leading-none">☕</span>
                <span
                  style={{ color: palette.text }}
                  className="text-sm font-extrabold"
                >
                  {visitorMode === "BR"
                    ? "Apoie com um Café"
                    : "Support with a Coffee"}
                </span>
              </div>
              <p
                style={{ color: palette.muted }}
                className="text-xs leading-relaxed"
              >
                {copy.coffeeText}
              </p>
            </div>

            <div className="mt-3.5 grid grid-cols-2 gap-2">
              <a
                href={coffeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: palette.coffeeBg,
                  color: palette.coffeeText,
                  borderColor: palette.coffeeBorder,
                }}
                className="inline-flex items-center justify-center rounded-lg border px-3 py-2.5 text-center text-xs font-bold transition hover:opacity-90"
              >
                {copy.oneTimeButton}
              </a>
              <a
                href={subUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: palette.subBg,
                  color: palette.subText,
                  borderColor: palette.subBorder,
                }}
                className="inline-flex items-center justify-center rounded-lg border px-3 py-2.5 text-center text-xs font-bold transition hover:opacity-90"
              >
                {copy.recurringButton}
              </a>
            </div>
          </div>
        </div>

        {!config.removeWatermark && (
          <div
            style={{ borderTop: `1px solid ${palette.border}` }}
            className="mt-3.5 pt-2 text-center text-[11px]"
          >
            <a
              href="#precos"
              style={{ color: palette.muted }}
              className="opacity-85 hover:underline"
            >
              <img
                src="/logo.png"
                alt=""
                aria-hidden="true"
                className="mr-1 inline-block h-4 w-4 align-[-3px] object-contain"
              />
              Powered by Cookies &amp; Coffee
            </a>
          </div>
        )}
      </div>
    );
  }

  /* ESTILO 1: CARD CLÁSSICO 2 COLUNAS (Coluna 1: Cookies com seus botões | Coluna 2: Café com seus botões) */
  return (
    <div
      role="dialog"
      aria-label={copy.title}
      style={{
        maxWidth: "560px",
        borderRadius: "16px",
        padding: "22px",
        backgroundColor: palette.bg,
        color: palette.text,
        border: `1px solid ${palette.border}`,
        boxShadow:
          "0 24px 48px -12px rgba(38, 21, 13, 0.28), 0 8px 16px -8px rgba(38, 21, 13, 0.16)",
      }}
      className="relative w-full transition-all duration-200"
    >
      {/* Botão Fechar (✕) no canto superior direito */}
      <div className="absolute right-4 top-4">{renderCloseButton()}</div>

      {/* Cabeçalho Centralizado com Logo Oficial */}
      <div className="mb-1.5 flex justify-center select-none">
        <img
          src="/logo.png"
          alt="Cookies & Coffee"
          className="h-14 w-14 object-contain"
        />
      </div>

      <h3
        style={{ color: palette.text }}
        className="mb-4 text-center text-lg font-extrabold tracking-tight"
      >
        {copy.title}
      </h3>

      {/* Corpo Dividido em 2 Colunas: Coluna 1 = Cookies | Coluna 2 = Café */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* COLUNA 1: Parágrafo dos Cookies + Botões dos Cookies */}
        <div
          style={{
            backgroundColor: palette.colBg,
            borderColor: needChoiceHint ? palette.coffeeText : palette.border,
          }}
          className="flex flex-col justify-between rounded-xl border p-4 text-left"
        >
          <p
            style={{
              fontSize: "13px",
              lineHeight: "1.55",
              color: palette.muted,
            }}
          >
            <strong style={{ color: palette.text, fontWeight: 700 }}>
              🍪 {copy.cookiesLabel}
            </strong>{" "}
            {copy.cookiesText}
          </p>

          <div className="mt-4">{renderCookieButtons(false)}</div>
        </div>

        {/* COLUNA 2: Parágrafo do Café + Botões do Café */}
        <div
          style={{
            backgroundColor: palette.colBg,
            borderColor: palette.border,
          }}
          className="flex flex-col justify-between rounded-xl border p-4 text-left"
        >
          <p
            style={{
              fontSize: "13px",
              lineHeight: "1.55",
              color: palette.muted,
            }}
          >
            <strong style={{ color: palette.text, fontWeight: 700 }}>
              ☕ {copy.coffeeLabel}
            </strong>{" "}
            {copy.coffeeText}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={coffeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: palette.coffeeBg,
                color: palette.coffeeText,
                borderColor: palette.coffeeBorder,
              }}
              className="inline-flex items-center justify-center rounded-lg border px-2.5 py-2.5 text-center text-xs font-bold transition hover:opacity-90 active:scale-[0.98]"
            >
              {copy.oneTimeButton}
            </a>

            <a
              href={subUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: palette.subBg,
                color: palette.subText,
                borderColor: palette.subBorder,
              }}
              className="inline-flex items-center justify-center rounded-lg border px-2.5 py-2.5 text-center text-xs font-bold transition hover:opacity-90 active:scale-[0.98]"
            >
              {copy.recurringButton}
            </a>
          </div>
        </div>
      </div>

      {!config.removeWatermark && (
        <div className="mt-3 text-center">
          <a
            href="#precos"
            style={{ color: palette.muted }}
            className="inline-block text-[11px] opacity-85 transition hover:underline hover:opacity-100"
          >
            <img
              src="/logo.png"
              alt=""
              aria-hidden="true"
              className="mr-1 inline-block h-4 w-4 align-[-3px] object-contain"
            />
            Powered by Cookies &amp; Coffee
          </a>
        </div>
      )}
    </div>
  );
}

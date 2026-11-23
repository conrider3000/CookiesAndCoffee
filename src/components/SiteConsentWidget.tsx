"use client";

import React, { useEffect, useState } from "react";
import CookieCoffeeWidget from "./CookieCoffeeWidget";
import { SITE_WIDGET_CONFIG } from "@/data/presets";
import { VisitorSimulationMode } from "@/types/widget";

const STORAGE_KEY = "cookies_and_coffee_site_consent";

/**
 * Widget real do próprio site Cookies & Coffee ("dogfooding").
 * Aparece TODA vez que o usuário entra ou atualiza o site, centralizado na tela
 * com o restante do site embaçado atrás (backdrop-blur forte), e só fecha no ✕
 * após escolher Aceitar ou Recusar.
 */
export default function SiteConsentWidget() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<VisitorSimulationMode>("BR");
  const [selectedConsent, setSelectedConsent] = useState<
    "accepted" | "rejected" | null
  >(null);

  useEffect(() => {
    const lang = (navigator.language || "en").toLowerCase();
    let tz = "";
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch {
      /* ignore */
    }
    const isBR =
      lang.startsWith("pt") ||
      ["Sao_Paulo", "Fortaleza", "Manaus", "Recife", "Bahia", "Belem"].some(
        (city) => tz.includes(city)
      );
    setMode(isBR ? "BR" : "INTL");
    setSelectedConsent(null);
    setVisible(true);
  }, []);

  const handleConsentChange = (status: "accepted" | "rejected") => {
    setSelectedConsent(status);
    localStorage.setItem(STORAGE_KEY, status);
    window.dispatchEvent(
      new CustomEvent("cookieConsentChanged", { detail: { status } })
    );
  };

  const handleClose = () => {
    if (!selectedConsent) return;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1A0E07]/50 p-4 backdrop-blur-md animate-[ccFadeIn_.25s_ease-out]"
    >
      <div className="w-full max-w-[560px]">
        <CookieCoffeeWidget
          config={SITE_WIDGET_CONFIG}
          visitorMode={mode}
          selectedConsent={selectedConsent}
          onConsentChange={handleConsentChange}
          onClose={handleClose}
        />
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import CookieCoffeeWidget from "./CookieCoffeeWidget";
import { SITE_WIDGET_CONFIG } from "@/data/presets";
import { VisitorSimulationMode } from "@/types/widget";

const STORAGE_KEY = "cookies_and_coffee_site_consent";

/**
 * Widget real do próprio site Cookies & Coffee ("dogfooding").
 * Aparece centralizado na tela, marca a escolha de cookies sem fechar na hora,
 * e só fecha quando a pessoa clica no ✕ após escolher Aceitar ou Recusar.
 */
export default function SiteConsentWidget() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<VisitorSimulationMode>("BR");
  const [selectedConsent, setSelectedConsent] = useState<
    "accepted" | "rejected" | null
  >(null);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

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

    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px] animate-[ccFadeIn_.3s_ease-out]">
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

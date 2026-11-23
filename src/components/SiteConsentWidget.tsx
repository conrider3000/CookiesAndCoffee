"use client";

import React, { useEffect, useState } from "react";
import CookieCoffeeWidget from "./CookieCoffeeWidget";
import { SITE_WIDGET_CONFIG } from "@/data/presets";
import { VisitorSimulationMode } from "@/types/widget";

const STORAGE_KEY = "cookies_and_coffee_site_consent";

/**
 * Widget real do próprio site Cookies & Coffee ("dogfooding").
 * Aparece ao abrir o site, pergunta sobre cookies e pede um café.
 */
export default function SiteConsentWidget() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<VisitorSimulationMode>("BR");

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

    const timer = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(timer);
  }, []);

  const handleConsent = (status: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, status);
    setVisible(false);
    window.dispatchEvent(
      new CustomEvent("cookieConsentChanged", { detail: { status } })
    );
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] w-[calc(100vw-32px)] max-w-[560px] animate-[ccFadeIn_.35s_ease-out]">
      <CookieCoffeeWidget
        config={SITE_WIDGET_CONFIG}
        visitorMode={mode}
        onConsentChange={handleConsent}
      />
    </div>
  );
}

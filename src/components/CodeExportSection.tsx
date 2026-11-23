"use client";

import React, { useState } from "react";
import { Check, Copy, Minimize2, Terminal } from "lucide-react";
import {
  generateEdgeCloudCode,
  generateMinifiedEmbedCode,
  generateVanillaEmbedCode,
} from "@/lib/generateWidgetCode";
import { WidgetConfig } from "@/types/widget";

interface CodeExportSectionProps {
  config: WidgetConfig;
}

export default function CodeExportSection({ config }: CodeExportSectionProps) {
  const [activeTab, setActiveTab] = useState<"embed" | "edge">("embed");
  const [isMinified, setIsMinified] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const displayedCode =
    activeTab === "embed"
      ? isMinified
        ? generateMinifiedEmbedCode(config)
        : generateVanillaEmbedCode(config)
      : generateEdgeCloudCode(config);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="exportar"
      className="scroll-mt-24 space-y-5 rounded-[28px] border border-[#E5D5C3] bg-white p-6 shadow-[0_12px_36px_-16px_rgba(59,35,20,0.08)] sm:p-8"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C583A]">
            Passo 03 • Instalação Instantânea
          </span>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight text-[#2C1810]">
            Copie e cole antes do <code className="text-[#6F3E1E]">&lt;/body&gt;</code>
          </h2>
          <p className="mt-0.5 text-xs text-[#6E5241]">
            Funciona em qualquer stack: HTML puro, Next.js, Astro, WordPress,
            Webflow ou Docs.
          </p>
        </div>

        <div className="inline-flex self-start rounded-xl border border-[#E5D5C3] bg-[#FAF6F0] p-1">
          <button
            type="button"
            onClick={() => setActiveTab("embed")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === "embed"
                ? "bg-[#3E2417] text-white shadow-sm"
                : "text-[#6E5241] hover:text-[#2C1810]"
            }`}
          >
            Embed Vanilla JS (Grátis)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("edge")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === "edge"
                ? "bg-[#3E2417] text-white shadow-sm"
                : "text-[#6E5241] hover:text-[#2C1810]"
            }`}
          >
            Cloud Edge Geo-IP (Pro)
          </button>
        </div>
      </div>

      {/* Terminal Espresso */}
      <div className="overflow-hidden rounded-2xl border border-[#492E20] bg-[#23140D] shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3D251A] bg-[#2C1910] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#C87D55]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#EBC796]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#84A98C]" />
            <span className="ml-1 font-mono text-[11px] text-[#D4C2B2]">
              {activeTab === "embed"
                ? `widget-${config.style}.html`
                : "edge-script.html"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === "embed" && (
              <button
                type="button"
                onClick={() => setIsMinified(!isMinified)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#563626] px-2.5 py-1 text-[11px] font-medium text-[#E7D9C8] transition hover:bg-[#3A2217]"
              >
                <Minimize2 className="h-3 w-3" />
                <span>{isMinified ? "Expandir" : "Minificar 1 Linha"}</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#EBC796] px-3.5 py-1.5 text-xs font-bold text-[#23140D] shadow-sm transition hover:bg-[#F5DAB2]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Código Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copiar Snippet</span>
                </>
              )}
            </button>
          </div>
        </div>

        <pre className="max-h-[290px] overflow-auto p-4 font-mono text-xs leading-relaxed text-[#FAF6F0]">
          <code>{displayedCode}</code>
        </pre>
      </div>

      {/* Dica rápida do CustomEvent */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-[#EFE5D8] bg-[#FAF6F0] px-4 py-3 text-xs text-[#6E5241] sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 shrink-0 text-[#6F3E1E]" />
          <span>
            Dispara automaticamente{" "}
            <code className="font-mono font-semibold text-[#2C1810]">
              window.addEventListener(&quot;cookieConsentChanged&quot;, fn)
            </code>
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#8C583A]">
          detail.status = &quot;accepted&quot; | &quot;rejected&quot;
        </span>
      </div>
    </section>
  );
}

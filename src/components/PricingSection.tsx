"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, Lock } from "lucide-react";

interface PricingSectionProps {
  onTryPlayground?: () => void;
}

export default function PricingSection({
  onTryPlayground,
}: PricingSectionProps) {
  const [currency, setCurrency] = useState<"BRL" | "USD">("BRL");

  const plans = [
    {
      name: "Demo",
      tag: "Sem Cadastro",
      priceBRL: "R$ 0",
      priceUSD: "$0",
      period: "para testar",
      subtitle: "Experimente a interface e os 3 estilos ao vivo no Playground.",
      href: null as string | null,
      highlight: false,
      cta: "Testar no Playground",
      items: [
        "Simulação ao vivo no site (Brasil vs. Global)",
        "Teste dos 3 estilos e 3 paletas de cor",
        "Visualização dos eventos LGPD/GDPR/CCPA",
        "Não inclui acesso ao Studio nem exportação",
      ],
    },
    {
      name: "Indie",
      tag: "Mais Popular",
      priceBRL: "R$ 19",
      priceUSD: "$5",
      period: "/mês",
      subtitle: "Libera os Passos 1, 2 e 3 no Studio para criar e exportar.",
      href: "/studio?plan=indie",
      highlight: true,
      cta: "Assinar Indie & Abrir Studio",
      items: [
        "Acesso completo ao Studio (Passos 1, 2 e 3)",
        "Os 3 estilos de widget + suas cores e links",
        "100% White-Label (remove marca d'água)",
        "Até 3 domínios + atualização remota",
        "0% de comissão nas suas doações",
      ],
    },
    {
      name: "Pro",
      tag: "Scale & Geo-IP",
      priceBRL: "R$ 49",
      priceUSD: "$15",
      period: "/mês",
      subtitle: "Para múltiplos produtos com Geo-IP na borda e analytics.",
      href: "/studio?plan=pro",
      highlight: false,
      cta: "Assinar Pro & Abrir Studio",
      items: [
        "Tudo do Indie + Domínios ilimitados",
        "Script Cloud Edge com Geo-IP (CF-IPCountry)",
        "Analytics de cliques por plataforma de café",
        "Logs anonimizados de consentimento (auditoria)",
        "Suporte prioritário",
      ],
    },
  ];

  return (
    <section id="precos" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#8C583A]">
            <Sparkles className="h-3.5 w-3.5" />
            Planos do Studio
          </span>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#2C1810]">
            0% de comissão sobre o seu café.
          </h2>
          <p className="mt-0.5 text-xs text-[#6E5241]">
            O valor dos apoios vai 100% direto para as plataformas que você
            escolher.
          </p>
        </div>

        {/* Switch Moeda */}
        <div className="inline-flex rounded-xl border border-[#E5D5C3] bg-[#FAF6F0] p-1">
          <button
            type="button"
            onClick={() => setCurrency("BRL")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              currency === "BRL"
                ? "bg-[#3E2417] text-white shadow-sm"
                : "text-[#6E5241] hover:text-[#2C1810]"
            }`}
          >
            🇧🇷 BRL (R$)
          </button>
          <button
            type="button"
            onClick={() => setCurrency("USD")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              currency === "USD"
                ? "bg-[#3E2417] text-white shadow-sm"
                : "text-[#6E5241] hover:text-[#2C1810]"
            }`}
          >
            🌎 USD ($)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col justify-between rounded-[24px] border p-6 transition ${
              plan.highlight
                ? "border-[#3E2417] bg-[#FAF6F0] shadow-[0_18px_40px_-15px_rgba(59,35,20,0.16)] ring-1 ring-[#3E2417]"
                : "border-[#E5D5C3] bg-white"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#2C1810]">
                  {plan.name}
                </h3>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    plan.highlight
                      ? "bg-[#3E2417] text-[#EBC796]"
                      : "border border-[#E5D5C3] bg-[#FAF6F0] text-[#6E5241]"
                  }`}
                >
                  {plan.tag}
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold tracking-tight text-[#2C1810]">
                  {currency === "BRL" ? plan.priceBRL : plan.priceUSD}
                </span>
                <span className="text-xs font-medium text-[#6E5241]">
                  {plan.period}
                </span>
              </div>

              <p className="mt-1.5 text-xs leading-relaxed text-[#6E5241]">
                {plan.subtitle}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-[#E8D9C8] pt-4">
                {plan.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-snug text-[#3E2417]"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8C583A]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {plan.href ? (
              <Link
                href={plan.href}
                className={`mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition ${
                  plan.highlight
                    ? "bg-[#3E2417] text-white shadow-sm hover:bg-[#2C1810]"
                    : "border border-[#DBC3A7] bg-[#FAF6F0] text-[#3E2417] hover:bg-[#F2E6D8]"
                }`}
              >
                <Lock className="h-3.5 w-3.5" />
                <span>{plan.cta}</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={onTryPlayground}
                className="mt-6 w-full rounded-xl border border-[#DBC3A7] bg-[#FAF6F0] py-2.5 text-xs font-bold text-[#3E2417] transition hover:bg-[#F2E6D8]"
              >
                {plan.cta}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

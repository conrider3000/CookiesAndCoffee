"use client";

import React, { useState } from "react";
import {
  Sparkles,
  QrCode,
  Zap,
  Palette,
  ShieldCheck,
  Check,
  Send,
} from "lucide-react";

const CUSTOM_ADDONS = [
  {
    id: "pix-modal",
    icon: QrCode,
    title: "QR Code Pix + Copia e Cola dentro do Widget",
    desc: "O apoiador escaneia ou copia a chave Pix direto na janela, sem sair do seu site (aumenta a conversão em até 3x).",
  },
  {
    id: "post-download",
    icon: Zap,
    title: "Gatilho Inteligente Pós-Download / Pós-Uso",
    desc: "Exibe ou destaca o pedido de café exatamente quando o usuário baixa seu software (.exe/.zip) ou conclui uma ação.",
  },
  {
    id: "brand-design",
    icon: Palette,
    title: "Identidade Visual, Mascote & Animações Exclusivas",
    desc: "Desenhado sob medida com as fontes, cores, bordas e o ícone/logo do seu produto (como no DisplayBridge e Vynil Ripper).",
  },
  {
    id: "consent-v2",
    icon: ShieldCheck,
    title: "Google Consent Mode v2 + GTM / PostHog Chave na Mão",
    desc: "Entregamos o código já integrado com suas tags de Analytics, Pixel e regras de bloqueio prévio.",
  },
];

export default function CustomWidgetSection() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "pix-modal",
    "post-download",
    "brand-design",
  ]);
  const [projectUrl, setProjectUrl] = useState<string>("");
  const [requestSent, setRequestSent] = useState<boolean>(false);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setRequestSent(false);
  };

  const handleRequestCustom = (packageName: string) => {
    setRequestSent(true);
    const chosenTitles = CUSTOM_ADDONS.filter((a) =>
      selectedFeatures.includes(a.id)
    )
      .map((a) => a.title)
      .join(", ");

    const subject = encodeURIComponent(
      `[Cookies & Coffee] Encomenda de ${packageName}`
    );
    const body = encodeURIComponent(
      `Olá! Quero encomendar um Widget Personalizado (${packageName}).\n\nSite/Projeto: ${
        projectUrl || "A informar"
      }\nRecursos desejados: ${chosenTitles}\n`
    );
    window.open(`mailto:contato@cookiesandcoffee.dev?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <section id="personalizado" className="scroll-mt-24">
      {/* Section Header estilo DisplayBridge / Open Vynil Ripper */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          className="mx-auto mb-4 h-20 w-20 object-contain"
        />
        <span className="font-mono text-xs font-extrabold uppercase tracking-[0.14em] text-[#8C5230]">
          [ E S T Ú D I O   S O B   M E D I D A   •   B E S P O K E ]
        </span>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#26150D] sm:text-4xl">
          Quer um Widget 100% Personalizado para o seu Produto?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#684B39] sm:text-base">
          Além do gerador gratuito, nossa equipe projeta e programa um widget
          exclusivo com a cara do seu software,{" "}
          <strong className="text-[#26150D]">
            Pix QR Code nativo sem sair da tela
          </strong>{" "}
          e gatilhos de conversão pós-download.
        </p>
      </div>

      {/* Seletor Interativo de Recursos Sob Medida (4 Studio Cards) */}
      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5C3A21]">
            Selecione o que você quer no seu widget exclusivo:
          </span>
          <span className="text-xs font-semibold text-[#8C5230]">
            {selectedFeatures.length} de {CUSTOM_ADDONS.length} recursos
            selecionados
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CUSTOM_ADDONS.map((addon) => {
            const Icon = addon.icon;
            const isSelected = selectedFeatures.includes(addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => toggleFeature(addon.id)}
                className={`group flex flex-col justify-between rounded-2xl border-2 p-5 text-left transition ${
                  isSelected
                    ? "border-[#3D2214] bg-[#FAF5EE] shadow-md"
                    : "border-[#E4D3C0] bg-white hover:border-[#C89D66]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#EFE5D8] pb-3">
                    <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#8C5230]">
                      <Icon className="h-4 w-4 text-[#3D2214]" />
                      <span>[ RECURSO CUSTOM ]</span>
                    </span>
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-md border text-xs font-bold ${
                        isSelected
                          ? "border-[#3D2214] bg-[#3D2214] text-white"
                          : "border-[#D9C0A3] bg-white text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-extrabold text-[#26150D]">
                    {addon.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#684B39]">
                    {addon.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2 Painéis de Pacotes Sob Medida (inspirado nos 2 .dl-panel do Open Vynil Ripper e DisplayBridge) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Card 1: Widget Sob Medida Pro (Featured) */}
        <div className="flex flex-col justify-between rounded-[22px] border-2 border-[#3D2214] bg-gradient-to-b from-[#FAF5EE] to-white p-7 shadow-[0_20px_50px_-15px_rgba(61,34,20,0.18)]">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#8C5230]">
                  [ MAIS PEDIDO • PAGAMENTO ÚNICO ]
                </div>
                <h3 className="mt-1 text-2xl font-extrabold text-[#26150D]">
                  Widget Personalizado Sob Medida
                </h3>
              </div>
              <span className="rounded-full border border-[#3D2214] bg-[#3D2214] px-3 py-1 font-mono text-xs font-bold text-[#EBC796]">
                Entrega 48h
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#26150D]">
                R$ 290
              </span>
              <span className="text-xs font-semibold text-[#684B39]">
                pagamento único (sem mensalidade) · ou US$ 59
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#684B39]">
              Ideal para criadores de softwares, jogos, SaaS e ferramentas
              open-source que querem maximizar doações com um widget único.
            </p>

            <ul className="mt-5 space-y-2.5 border-t border-[#E6D6C3] pt-5 text-xs text-[#26150D]">
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-[#8C5230]" />
                <span>
                  <strong>Design 100% na identidade do seu site</strong> (cores,
                  fontes, logo e layout sob medida)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-[#8C5230]" />
                <span>
                  <strong>Modal Pix QR Code &amp; Copia-e-Cola integrado</strong>{" "}
                  (sem redirecionar o visitante)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-[#8C5230]" />
                <span>
                  <strong>Gatilho pós-download</strong> (exibe o café quando o
                  usuário baixa seu app)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-[#8C5230]" />
                <span>
                  <strong>Código-fonte 100% seu</strong> + suporte na instalação
                  (HTML, Next.js, React, WordPress)
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-6 space-y-3">
            <input
              type="url"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              placeholder="Cole o link do seu site ou repositório (opcional)..."
              className="w-full rounded-xl border border-[#D9C0A3] bg-white px-3.5 py-2.5 text-xs text-[#26150D] placeholder-[#9C826B] focus:border-[#3D2214] focus:outline-none"
            />
            <button
              type="button"
              onClick={() =>
                handleRequestCustom("Widget Personalizado Sob Medida (R$ 290)")
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#4E2C1B] to-[#2E190F] px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(46,25,15,0.25)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              <Sparkles className="h-4 w-4 text-[#EBC796]" />
              <span>ENCOMENDAR MEU WIDGET PERSONALIZADO</span>
            </button>
            <div className="text-center font-mono text-[11px] text-[#8C6D58]">
              Satisfação garantida · Ajustes visuais inclusos · 0% comissão
            </div>
          </div>
        </div>

        {/* Card 2: Setup Full-Stack + Analytics + Consent Mode v2 */}
        <div className="flex flex-col justify-between rounded-[22px] border-2 border-[#E4D3C0] bg-white p-7 shadow-sm">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#8C5230]">
                  [ ESTÚDIO COMPLETO + INTEGRAÇÃO ]
                </div>
                <h3 className="mt-1 text-2xl font-extrabold text-[#26150D]">
                  Pack Full-Compliance &amp; Conversão
                </h3>
              </div>
              <span className="rounded-full border border-[#D9C0A3] bg-[#FAF5EE] px-3 py-1 font-mono text-xs font-bold text-[#6F3E1E]">
                Chave na Mão
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#26150D]">
                R$ 590
              </span>
              <span className="text-xs font-semibold text-[#684B39]">
                pagamento único · ou US$ 119
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#684B39]">
              Para empresas, SaaS em crescimento ou criadores com múltiplos
              produtos que querem nossa equipe fazendo a implantação completa via
              Pull Request.
            </p>

            <ul className="mt-5 space-y-2.5 border-t border-[#EFE5D8] pt-5 text-xs text-[#26150D]">
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-[#8C5230]" />
                <span>
                  <strong>Tudo do pacote Widget Sob Medida</strong> para até 3
                  sites/produtos seus
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-[#8C5230]" />
                <span>
                  <strong>Implantação direta via Pull Request</strong> no seu
                  GitHub/Vercel
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-[#8C5230]" />
                <span>
                  <strong>Google Consent Mode v2 + GTM + PostHog</strong>{" "}
                  configurados e auditados
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-[#8C5230]" />
                <span>
                  <strong>Roteamento Geo-IP na borda</strong> (Cloudflare
                  Workers / Vercel Edge Middleware)
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() =>
                handleRequestCustom("Pack Full-Compliance & Conversão (R$ 590)")
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#3D2214] bg-[#FAF5EE] px-5 py-3.5 text-sm font-extrabold text-[#26150D] transition hover:bg-[#3D2214] hover:text-white"
            >
              <Send className="h-4 w-4" />
              <span>SOLICITAR IMPLANTAÇÃO COMPLETA</span>
            </button>
            <div className="text-center font-mono text-[11px] text-[#8C6D58]">
              Inclui call de alinhamento ou briefing assíncrono direto
            </div>
          </div>
        </div>
      </div>

      {requestSent && (
        <div className="mt-4 rounded-xl border border-[#8C5230] bg-[#FAF5EE] p-3 text-center text-xs font-semibold text-[#3D2214]">
          ✓ Seu rascunho de pedido com os {selectedFeatures.length} recursos
          escolhidos foi preparado!
        </div>
      )}
    </section>
  );
}

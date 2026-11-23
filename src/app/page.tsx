"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import LivePreviewPanel from "@/components/LivePreviewPanel";
import CustomWidgetSection from "@/components/CustomWidgetSection";
import PricingSection from "@/components/PricingSection";
import SiteConsentWidget from "@/components/SiteConsentWidget";
import { DEFAULT_WIDGET_CONFIG, SUPPORTED_PLATFORMS } from "@/data/presets";
import { VisitorSimulationMode, WidgetConfig } from "@/types/widget";
import {
  Check,
  Lock,
  Sparkles,
  Globe2,
  ShieldCheck,
  Wallet,
  Columns2,
  Zap,
  HeartHandshake,
  X,
  ArrowRight,
} from "lucide-react";

function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <span className="font-mono text-xs font-extrabold uppercase tracking-[0.14em] text-[#8C5230]">
        {kicker}
      </span>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#26150D] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-[#684B39] sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function HomePage() {
  const [config, setConfig] = useState<WidgetConfig>(DEFAULT_WIDGET_CONFIG);
  const [visitorMode, setVisitorMode] = useState<VisitorSimulationMode>("BR");

  const handleUpdateConfig = (updated: Partial<WidgetConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-[#26150D]">
      <Navbar onScrollTo={scrollToSection} />

      {/* Widget real do próprio site */}
      <SiteConsentWidget />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(960px 480px at 50% -100px, rgba(212, 163, 115, 0.25), transparent 68%), radial-gradient(540px 380px at 88% 20%, rgba(140, 82, 48, 0.08), transparent 65%)",
        }}
      />

      <main className="mx-auto max-w-[1140px] space-y-24 px-5 pb-24 pt-14 sm:px-6 sm:pt-20">
        {/* 1. HERO */}
        <section className="mx-auto max-w-3xl space-y-6 text-center">
          <div className="relative mx-auto h-36 w-36 sm:h-44 sm:w-44">
            <div
              aria-hidden="true"
              className="absolute inset-4 rounded-full bg-[#EBC796]/40 blur-3xl"
            />
            <img
              src="/logo.png"
              alt="Cookies & Coffee"
              className="relative h-full w-full object-contain drop-shadow-[0_18px_30px_rgba(61,34,20,0.18)]"
            />
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-[#26150D] sm:text-6xl sm:leading-[1.08]">
            Seu aviso de cookies{" "}
            <span className="bg-gradient-to-r from-[#6F3E1E] via-[#9C5C34] to-[#B67D4E] bg-clip-text text-transparent">
              agora pede um café.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#684B39] sm:text-lg">
            Todo site precisa avisar sobre cookies. Todo criador independente
            precisa de apoio. O Cookies &amp; Coffee junta os dois em{" "}
            <strong className="text-[#26150D]">um único widget</strong>: cumpre
            a LGPD, GDPR e CCPA e convida o visitante a apoiar seu trabalho pela{" "}
            <strong className="text-[#26150D]">
              plataforma de doação que você escolher
            </strong>
            .
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={() => scrollToSection("como-funciona")}
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-b from-[#4E2C1B] to-[#2E190F] px-7 py-4 text-sm font-extrabold text-white shadow-[0_14px_32px_rgba(61,34,20,0.28)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              <span>Ver como funciona</span>
              <ArrowRight className="h-4 w-4 text-[#EBC796]" />
            </button>
            <Link
              href="/studio"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#D9C0A3] bg-[#FAF5EE] px-6 py-4 text-sm font-bold text-[#3D2214] transition hover:-translate-y-0.5 hover:border-[#8C5230]"
            >
              <Lock className="h-4 w-4 text-[#8C5230]" />
              <span>Acessar Studio (Assinantes)</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs font-semibold text-[#684B39]">
            {[
              "0% de comissão nas doações",
              "Mais de 14 plataformas",
              "2 colunas claras (Cookies + Café)",
              "1 linha de código",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#8C5230]" />
                {item}
              </span>
            ))}
          </div>

          <p className="pt-2 text-xs text-[#8C6D58]">
            👉 Repare na tela: este site usa o próprio Cookies &amp; Coffee
            centralizado.
          </p>
        </section>

        {/* 2. O PROBLEMA x A SOLUÇÃO */}
        <section>
          <SectionHeader
            kicker="[ O PROBLEMA ]"
            title="Banner de cookie é obrigatório. Mas não precisa ser inútil."
            subtitle="Hoje o criador paga por uma ferramenta de cookies e ainda espalha links de doação perdidos pelo rodapé e pelo README."
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#E4D3C0] bg-white p-7">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#8C6D58]">
                Como é hoje
              </div>
              <ul className="mt-4 space-y-3 text-sm text-[#684B39]">
                {[
                  "Banner de cookies que só irrita o visitante",
                  "Ferramentas de consentimento caras e cobradas em dólar",
                  "Links de doação escondidos no rodapé",
                  "Mesmo botão em dólar para brasileiros e estrangeiros",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-[#B5654A]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-[#3D2214] bg-[#FAF5EE] p-7 shadow-[0_20px_50px_-20px_rgba(61,34,20,0.25)]">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#8C5230]">
                Com Cookies &amp; Coffee
              </div>
              <ul className="mt-4 space-y-3 text-sm text-[#26150D]">
                {[
                  "O aviso obrigatório vira um momento de apoio",
                  "Cookies e Café lado a lado, cada um com seus botões",
                  "Você escolhe as plataformas de doação que já usa",
                  "Links nacionais para o Brasil, internacionais para o mundo",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2E7D32]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. COMO FUNCIONA */}
        <section id="como-funciona" className="scroll-mt-24">
          <SectionHeader
            kicker="[ COMO FUNCIONA ]"
            title="Pronto em 4 passos"
            subtitle="Sem intermediário financeiro: o clique vai direto para os seus links."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                title: "Escolha suas plataformas",
                desc: "Use as plataformas que você já tem: Pix, Ko-fi, Patreon, GitHub Sponsors, Buy Me a Coffee e muitas outras.",
              },
              {
                num: "02",
                title: "Separe por público",
                desc: "Defina um link de café avulso e um de assinatura para o Brasil, e outro par para visitantes internacionais.",
              },
              {
                num: "03",
                title: "Configure no Studio",
                desc: "Assinantes acessam os Passos 1, 2 e 3 no Studio para escolher estilo, cores, região legal e copiar o snippet.",
              },
              {
                num: "04",
                title: "Cole 1 linha",
                desc: "Cole o código antes do </body>. Funciona em HTML, Next.js, WordPress, Astro e mais.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border-2 border-[#E4D3C0] bg-[#FAF5EE]/60 p-6 transition hover:-translate-y-0.5 hover:border-[#C89D66]"
              >
                <span className="inline-flex rounded-full border border-[#C89D66] bg-[#F3E5D3] px-3 py-1 font-mono text-xs font-bold text-[#6F3E1E]">
                  PASSO {step.num}
                </span>
                <h3 className="mt-4 text-base font-extrabold text-[#26150D]">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#684B39]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PLATAFORMAS SUPORTADAS */}
        <section id="plataformas" className="scroll-mt-24">
          <SectionHeader
            kicker="[ PLATAFORMAS ]"
            title="Use a plataforma que você preferir"
            subtitle="O widget só redireciona para os seus links. O dinheiro vai 100% direto para você."
          />

          <div className="flex flex-wrap justify-center gap-2.5">
            {SUPPORTED_PLATFORMS.map((p) => (
              <div
                key={p.name}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#E4D3C0] bg-white px-4 py-2.5 transition hover:border-[#8C5230]"
              >
                <span className="text-sm font-bold text-[#26150D]">
                  {p.name}
                </span>
                <span className="rounded-md bg-[#FAF5EE] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#8C5230]">
                  {p.region} · {p.type}
                </span>
              </div>
            ))}
            <div className="inline-flex items-center rounded-xl border-2 border-dashed border-[#D9C0A3] px-4 py-2.5 text-sm font-semibold text-[#8C6D58]">
              + qualquer link de pagamento
            </div>
          </div>
        </section>

        {/* 5. RECURSOS */}
        <section>
          <SectionHeader
            kicker="[ RECURSOS ]"
            title="Pensado para criadores independentes"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Columns2,
                title: "Cookies e Café lado a lado",
                desc: "Cada explicação fica na sua coluna com os próprios botões. Ao escolher os cookies, a opção fica marcada e a janela só fecha no ✕ para o visitante não esquecer o café.",
              },
              {
                icon: Globe2,
                title: "Nacional e Internacional",
                desc: "Detecta o país/idioma do visitante e mostra os links certos para cada público, no idioma certo.",
              },
              {
                icon: ShieldCheck,
                title: "LGPD, GDPR e CCPA",
                desc: "Aceitar e Recusar com o mesmo peso visual, sem dark patterns, e um evento JS para liberar seu Analytics.",
              },
              {
                icon: Wallet,
                title: "Zero comissão",
                desc: "Não processamos pagamentos. O clique leva direto para a sua página de doação.",
              },
              {
                icon: Zap,
                title: "Leve de verdade",
                desc: "Vanilla JS sem dependências (~2.4 KB). Não pesa no carregamento do seu site.",
              },
              {
                icon: HeartHandshake,
                title: "Widget sob medida",
                desc: "Quer algo exclusivo, com QR Code Pix na própria janela? A gente cria para você.",
              },
            ].map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="rounded-2xl border-2 border-[#E4D3C0] bg-white p-6 transition hover:-translate-y-1 hover:border-[#8C5230]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9C0A3] bg-[#FAF5EE] text-[#3D2214]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-extrabold text-[#26150D]">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#684B39]">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. PLAYGROUND DE DEMONSTRAÇÃO (Passos 1, 2 e 3 ficam no /studio para assinantes) */}
        <section className="space-y-8">
          <SectionHeader
            kicker="[ TESTE AO VIVO ]"
            title="Experimente os 3 estilos na prática"
            subtitle="Alterne o estilo, o tema e simule visitantes do Brasil ou do exterior."
          />

          <LivePreviewPanel
            config={config}
            visitorMode={visitorMode}
            onVisitorModeChange={setVisitorMode}
            onChangeConfig={handleUpdateConfig}
          />

          {/* Convite para o Studio (Passos 1, 2 e 3) */}
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border-2 border-[#3D2214] bg-[#FAF5EE] p-6 text-center sm:flex-row sm:text-left">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8C5230]">
                <Lock className="h-3.5 w-3.5" />
                <span>Área do Assinante (/studio)</span>
              </div>
              <h3 className="text-lg font-extrabold text-[#26150D]">
                Quer personalizar seus links (Passos 1, 2 e 3) e gerar o código?
              </h3>
              <p className="text-xs text-[#684B39]">
                Assinantes Indie e Pro desbloqueiam o configurador completo,
                regras legais por região, modo White-Label e exportação em 1
                clique.
              </p>
            </div>

            <Link
              href="/studio"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-b from-[#4E2C1B] to-[#2E190F] px-6 py-3.5 text-xs font-extrabold text-white shadow-md transition hover:brightness-110"
            >
              <Lock className="h-3.5 w-3.5 text-[#EBC796]" />
              <span>Abrir Studio de Criação</span>
            </Link>
          </div>
        </section>

        {/* 7. SOB MEDIDA */}
        <CustomWidgetSection />

        {/* 8. PREÇOS */}
        <PricingSection onTryPlayground={() => scrollToSection("playground")} />

        {/* 9. FAQ */}
        <section id="faq" className="scroll-mt-24">
          <SectionHeader kicker="[ DÚVIDAS ]" title="Perguntas frequentes" />

          <div className="mx-auto max-w-3xl space-y-3">
            {[
              {
                q: "Vocês cobram porcentagem sobre as doações?",
                a: "Não. O Cookies & Coffee não processa pagamentos: o botão leva o visitante direto para a sua página na plataforma que você escolheu.",
              },
              {
                q: "O que está incluído na Área do Assinante (/studio)?",
                a: "Lá ficam os Passos 1, 2 e 3: escolha dos 3 estilos de widget, configuração dos seus 4 links regionais, seleção de regras (LGPD/GDPR/CCPA), remoção de marca d'água (White-Label) e exportação do snippet Vanilla JS ou Cloud Edge.",
              },
              {
                q: "Quais plataformas de doação posso usar?",
                a: "Qualquer uma que tenha um link: Pix, Paga um Café, LivePix, APOIA.se, Catarse, Ko-fi, Buy Me a Coffee, GitHub Sponsors, Patreon, Liberapay, Open Collective, PayPal.me, Stripe e outras.",
              },
              {
                q: "Como o widget sabe se o visitante é do Brasil?",
                a: "Pelo idioma/fuso horário do navegador no snippet embarcado, ou pelo IP na borda (CF-IPCountry) no script Cloud Edge do plano Pro.",
              },
              {
                q: "Como funciona o widget sob medida?",
                a: "Você escolhe os recursos (QR Code Pix na janela, gatilho pós-download, visual da sua marca) e nossa equipe entrega o código pronto, com pagamento único.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border-2 border-[#E4D3C0] bg-white px-6 py-4 transition open:border-[#8C5230] open:bg-[#FAF5EE]/50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-extrabold text-[#26150D] sm:text-base">
                  <span>{item.q}</span>
                  <span className="font-mono text-lg font-bold text-[#8C5230] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-[#684B39] sm:text-sm">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="rounded-[28px] bg-gradient-to-b from-[#3D2214] to-[#26150D] px-6 py-14 text-center text-white">
          <img
            src="/logo.png"
            alt=""
            aria-hidden="true"
            className="mx-auto mb-5 h-24 w-24 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
          />
          <h2 className="text-2xl font-extrabold sm:text-4xl">
            Pronto para ganhar seu próximo café?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#D4C2B2]">
            Assine e monte seu widget em minutos no Studio, ou encomende um
            feito sob medida para o seu produto.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 rounded-xl bg-[#EBC796] px-6 py-3.5 text-sm font-extrabold text-[#26150D] transition hover:bg-[#F5DAB2]"
            >
              <Lock className="h-4 w-4" />
              <span>Acessar Studio (Assinantes)</span>
            </Link>
            <button
              type="button"
              onClick={() => scrollToSection("personalizado")}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#6B4530] px-6 py-3.5 text-sm font-bold text-[#FAF5EE] transition hover:border-[#EBC796]"
            >
              <Sparkles className="h-4 w-4 text-[#EBC796]" />
              Encomendar sob medida
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-[#E4D3C0] bg-[#FAF5EE] py-10">
        <div className="mx-auto flex max-w-[1140px] flex-col items-center justify-between gap-4 px-6 text-xs text-[#684B39] sm:flex-row">
          <div className="flex items-center gap-2.5 font-extrabold text-[#26150D]">
            <img
              src="/logo.png"
              alt=""
              aria-hidden="true"
              className="h-9 w-9 object-contain"
            />
            <span>Cookies &amp; Coffee</span>
          </div>
          <div className="flex flex-wrap gap-5 font-semibold">
            {[
              ["como-funciona", "Como funciona"],
              ["playground", "Testar"],
              ["personalizado", "Sob medida"],
              ["precos", "Preços"],
              ["faq", "Dúvidas"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className="hover:text-[#26150D]"
              >
                {label}
              </button>
            ))}
            <Link href="/studio" className="hover:text-[#26150D]">
              Studio
            </Link>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("cookies_and_coffee_site_consent");
                window.location.reload();
              }}
              className="hover:text-[#26150D]"
            >
              Preferências de cookies
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

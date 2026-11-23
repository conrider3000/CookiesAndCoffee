"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Crown,
  KeyRound,
  Lock,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import LivePreviewPanel from "@/components/LivePreviewPanel";
import ConfiguratorPanel from "@/components/ConfiguratorPanel";
import CodeExportSection from "@/components/CodeExportSection";
import { DEFAULT_WIDGET_CONFIG } from "@/data/presets";
import { VisitorSimulationMode, WidgetConfig } from "@/types/widget";

const SUBSCRIBER_STORAGE_KEY = "cookies_and_coffee_subscriber_session";
const OWNER_EMAIL = "falaconrado@gmail.com";
const OWNER_PASSWORD = "admin";

interface SubscriberSession {
  email: string;
  plan: "indie" | "pro";
  activatedAt: string;
}

function StudioContent() {
  const searchParams = useSearchParams();
  const initialPlanParam =
    searchParams.get("plan") === "indie" ? "indie" : "pro";

  const [session, setSession] = useState<SubscriberSession | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [config, setConfig] = useState<WidgetConfig>({
    ...DEFAULT_WIDGET_CONFIG,
    removeWatermark: true,
  });
  const [visitorMode, setVisitorMode] = useState<VisitorSimulationMode>("BR");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SUBSCRIBER_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SubscriberSession;
        if (parsed?.email?.toLowerCase() === OWNER_EMAIL) {
          setSession(parsed);
        } else {
          localStorage.removeItem(SUBSCRIBER_STORAGE_KEY);
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail !== OWNER_EMAIL || password !== OWNER_PASSWORD) {
      setErrorMsg("E-mail ou senha inválidos.");
      return;
    }

    setErrorMsg("");
    const newSession: SubscriberSession = {
      email: OWNER_EMAIL,
      plan: initialPlanParam,
      activatedAt: new Date().toISOString(),
    };
    localStorage.setItem(SUBSCRIBER_STORAGE_KEY, JSON.stringify(newSession));
    setSession(newSession);
  };

  const handleLogout = () => {
    localStorage.removeItem(SUBSCRIBER_STORAGE_KEY);
    setSession(null);
    setPassword("");
  };

  const handleUpdateConfig = (updated: Partial<WidgetConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="min-h-screen bg-white text-[#26150D]">
      {/* Header do Studio */}
      <header className="sticky top-0 z-50 border-b-2 border-[#E4D3C0] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-[70px] max-w-[1140px] items-center justify-between gap-4 px-5 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 text-left"
            >
              <img
                src="/logo.png"
                alt="Cookies & Coffee"
                width={40}
                height={40}
                className="h-10 w-10 object-contain transition group-hover:scale-105"
              />
              <div>
                <span className="block text-sm font-extrabold tracking-tight text-[#26150D] sm:text-base">
                  Cookies &amp; Coffee Studio
                </span>
                <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#8C5230]">
                  Área do Assinante
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            {session ? (
              <>
                <span className="hidden items-center gap-1.5 rounded-full border border-[#D9C0A3] bg-[#FAF5EE] px-3 py-1 font-mono text-xs font-bold uppercase text-[#3D2214] sm:inline-flex">
                  <Crown className="h-3.5 w-3.5 text-[#8C5230]" />
                  <span>Plano {session.plan}</span>
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#E4D3C0] bg-white px-3 py-2 text-xs font-bold text-[#684B39] transition hover:border-[#8C5230] hover:text-[#26150D]"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sair</span>
                </button>
              </>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#E4D3C0] bg-[#FAF5EE] px-3.5 py-2 text-xs font-bold text-[#3D2214] transition hover:border-[#8C5230]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Voltar ao site</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1140px] px-5 pb-24 pt-10 sm:px-6 sm:pt-14">
        {!hydrated ? (
          <div className="py-24 text-center text-sm font-semibold text-[#684B39]">
            Verificando sessão...
          </div>
        ) : !session ? (
          /* LOGIN DO ASSINANTE */
          <section className="mx-auto max-w-md">
            <div className="rounded-[28px] border-2 border-[#3D2214] bg-gradient-to-b from-[#FAF5EE] to-white p-6 shadow-[0_24px_60px_-18px_rgba(46,25,15,0.2)] sm:p-8">
              <div className="text-center">
                <img
                  src="/logo.png"
                  alt="Cookies & Coffee"
                  className="mx-auto mb-4 h-16 w-16 object-contain"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3D2214] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#EBC796]">
                  <Lock className="h-3 w-3" />
                  Acesso Restrito ao Assinante
                </span>
                <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-[#26150D]">
                  Entrar no Studio
                </h1>
                <p className="mt-1.5 text-xs leading-relaxed text-[#684B39]">
                  Faça login para acessar os Passos 1, 2 e 3 e gerar o código do
                  seu widget.
                </p>
              </div>

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="subscriber-email"
                    className="block text-xs font-bold text-[#3D2214]"
                  >
                    E-mail
                  </label>
                  <input
                    id="subscriber-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full rounded-xl border-2 border-[#D9C0A3] bg-white px-4 py-3 text-sm text-[#26150D] placeholder-[#A9927D] focus:border-[#3D2214] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="subscriber-password"
                    className="block text-xs font-bold text-[#3D2214]"
                  >
                    Senha
                  </label>
                  <input
                    id="subscriber-password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border-2 border-[#D9C0A3] bg-white px-4 py-3 text-sm text-[#26150D] placeholder-[#A9927D] focus:border-[#3D2214] focus:outline-none"
                  />
                </div>

                {errorMsg && (
                  <p className="rounded-xl border border-[#E5B8AD] bg-[#FFF5F2] px-3 py-2 text-xs font-semibold text-[#B54B35]">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#4E2C1B] to-[#2E190F] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(46,25,15,0.25)] transition hover:brightness-110"
                >
                  <KeyRound className="h-4 w-4 text-[#EBC796]" />
                  <span>Entrar no Studio</span>
                </button>
              </form>
            </div>
          </section>
        ) : (
          /* ÁREA LIBERADA DO ASSINANTE: PREVIEW + PASSOS 1, 2 E 3 */
          <div className="space-y-10">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E4D3C0] bg-[#FAF5EE] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3D2214] text-[#EBC796]">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-base font-extrabold text-[#26150D]">
                      Studio Liberado ({session.plan.toUpperCase()})
                    </h1>
                    <span className="rounded-full bg-[#E6D6C3] px-2 py-0.5 font-mono text-[10px] font-bold text-[#3D2214]">
                      {session.email}
                    </span>
                  </div>
                  <p className="text-xs text-[#684B39]">
                    Configure os Passos 1, 2 e 3 abaixo e acompanhe o resultado
                    ao vivo no palco.
                  </p>
                </div>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C5230] hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Voltar para a Landing Page</span>
              </Link>
            </div>

            <LivePreviewPanel
              config={config}
              visitorMode={visitorMode}
              onVisitorModeChange={setVisitorMode}
              onChangeConfig={handleUpdateConfig}
            />

            <ConfiguratorPanel config={config} onChange={handleUpdateConfig} />

            <CodeExportSection config={config} />
          </div>
        )}
      </main>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white p-12 text-center text-sm text-[#684B39]">
          Carregando Studio...
        </div>
      }
    >
      <StudioContent />
    </Suspense>
  );
}

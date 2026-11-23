"use client";

import React from "react";
import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";

interface NavbarProps {
  onScrollTo: (id: string) => void;
}

export default function Navbar({ onScrollTo }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#E4D3C0] bg-white/90 backdrop-blur-md">
      <div className="mx-auto grid h-[70px] max-w-[1140px] grid-cols-[1fr_auto] items-center gap-5 px-6 md:grid-cols-[1fr_auto_1fr]">
        {/* Brand */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group inline-flex items-center gap-3 justify-self-start text-left"
        >
          <img
            src="/logo.png"
            alt="Cookies & Coffee"
            width={44}
            height={44}
            className="h-11 w-11 object-contain transition group-hover:scale-105"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-[#26150D]">
                Cookies &amp; Coffee
              </span>
              <span className="rounded-full border border-[#D9C0A3] bg-[#FAF5EE] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#8C5230]">
                v2.0
              </span>
            </div>
          </div>
        </button>

        {/* Center Nav */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 md:flex"
        >
          <button
            type="button"
            onClick={() => onScrollTo("como-funciona")}
            className="rounded-lg px-3 py-1.5 text-sm font-semibold text-[#684B39] transition hover:bg-[#FAF5EE] hover:text-[#26150D]"
          >
            Como funciona
          </button>
          <button
            type="button"
            onClick={() => onScrollTo("plataformas")}
            className="rounded-lg px-3 py-1.5 text-sm font-semibold text-[#684B39] transition hover:bg-[#FAF5EE] hover:text-[#26150D]"
          >
            Plataformas
          </button>
          <button
            type="button"
            onClick={() => onScrollTo("playground")}
            className="rounded-lg px-3 py-1.5 text-sm font-semibold text-[#684B39] transition hover:bg-[#FAF5EE] hover:text-[#26150D]"
          >
            Testar
          </button>
          <button
            type="button"
            onClick={() => onScrollTo("personalizado")}
            className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-bold text-[#8C5230] transition hover:bg-[#FAF5EE] hover:text-[#26150D]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Sob Medida</span>
          </button>
          <button
            type="button"
            onClick={() => onScrollTo("precos")}
            className="rounded-lg px-3 py-1.5 text-sm font-semibold text-[#684B39] transition hover:bg-[#FAF5EE] hover:text-[#26150D]"
          >
            Preços
          </button>
          <button
            type="button"
            onClick={() => onScrollTo("faq")}
            className="rounded-lg px-3 py-1.5 text-sm font-semibold text-[#684B39] transition hover:bg-[#FAF5EE] hover:text-[#26150D]"
          >
            Dúvidas
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 justify-self-end">
          <button
            type="button"
            onClick={() => onScrollTo("personalizado")}
            className="hidden rounded-xl border-2 border-[#D9C0A3] bg-[#FAF5EE] px-3.5 py-2 text-xs font-bold text-[#3D2214] transition hover:border-[#8C5230] sm:inline-flex"
          >
            Encomendar Widget
          </button>
          <Link
            href="/studio"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-[#4E2C1B] to-[#2E190F] px-4 py-2.5 text-xs font-bold text-white shadow-[0_8px_20px_rgba(62,36,23,0.22)] transition hover:-translate-y-0.5 hover:brightness-110"
          >
            <Lock className="h-3.5 w-3.5 text-[#EBC796]" />
            <span>Acessar Studio</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

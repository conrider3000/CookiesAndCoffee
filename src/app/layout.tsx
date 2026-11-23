import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cookies & Coffee — Cookies + Café em 1 linha",
  description:
    "Banner minimalista de consentimento de cookies (LGPD, GDPR, CCPA) combinado com botões localizados de café e assinatura.",
  openGraph: {
    title: "Cookies & Coffee — Seu aviso de cookies agora pede um café",
    description:
      "Widget de 1 linha que une consentimento de cookies (LGPD/GDPR/CCPA) e doações pela plataforma que você escolher.",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen bg-white text-[#3B2314] antialiased selection:bg-[#E7D8C5] selection:text-[#3B2314]">
        {children}
      </body>
    </html>
  );
}

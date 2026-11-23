# ☕🍪 Cookies & Coffee — Micro-SaaS MVP

Plataforma SaaS onde desenvolvedores independentes, criadores e donos de produtos digitais configuram um banner de consentimento de cookies (**LGPD, GDPR, CCPA**) combinado com roteamento localizado de doações (**"cafezinho" avulso + assinatura mensal**) em 1 único código `<script>`.

## 🚀 Arquitetura dos 4 Canais Estratégicos
- **☕ Café Nacional (Avulso):** [Paga um Café](https://pagaum.cafe/) / LivePix — Pix direto na conta (0% de taxa).
- **🔄 Assinatura Nacional (Mensal):** [APOIA.se](https://apoia.se/) / Catarse — Recorrência mensal no Brasil (Pix, boleto e cartão).
- **🌎 Café Internacional (Avulso):** [Ko-fi](https://ko-fi.com/) / Buy Me a Coffee — Checkout rápido em USD/EUR.
- **🚀 Assinatura Internacional (Mensal):** [GitHub Sponsors](https://github.com/sponsors) / Patreon — Patrocínio recorrente global (0% de taxa no GitHub Sponsors).

## 📂 Estrutura de Pastas

```text
Cookies&Coffee/
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
└── src/
    ├── types/
    │   └── widget.ts                 # Tipagens do Widget, Presets Regionais e Regras Legais
    ├── data/
    │   ├── countryPresets.json       # Seed JSON com regras (LGPD, GDPR, CCPA, LatAm, Híbrido) e plataformas
    │   └── presets.ts                # Helpers tipados e configuração inicial padrão
    ├── lib/
    │   └── generateWidgetCode.ts     # Gerador do snippet Vanilla JS/CSS (zero dependências) + Script Edge Pro
    ├── components/
    │   ├── Navbar.tsx                # Cabeçalho SaaS com navegação rápida
    │   ├── ConfiguratorPanel.tsx     # Coluna Esquerda: Seletor Regional/Leis, 4 Links e Customização Visual
    │   ├── LivePreviewPanel.tsx      # Coluna Direita: Simulador de navegador (BR vs Intl) + Reset e Event Log
    │   ├── CookieCoffeeWidget.tsx    # Componente fiel à especificação visual do card flutuante
    │   ├── CodeExportSection.tsx     # Exportação: Aba 1 (Embed Vanilla JS Grátis) e Aba 2 (Cloud Edge Pro)
    │   └── PricingSection.tsx        # Planos Free ($0), Indie (R$ 19 / $5) e Pro (R$ 49 / $15)
    └── app/
        ├── globals.css
        ├── layout.tsx
        └── page.tsx
```

## 🛠️ Como Executar Localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000` no navegador.

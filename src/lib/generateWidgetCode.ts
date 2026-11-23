import { getPresetById } from "@/data/presets";
import { WidgetConfig } from "@/types/widget";
import { EMBED_LOGO_DATA_URI } from "./logoDataUri";

function getThemeTokens(theme: WidgetConfig["theme"]) {
  if (theme === "light") {
    return {
      bgColor: "#FFFFFF",
      colBg: "#FAF5EE",
      textColor: "#26150D",
      mutedText: "#684B39",
      borderColor: "#E2D0BC",
      coffeeBg: "#F3E3D0",
      coffeeText: "#6F3E1E",
      coffeeBorder: "#D4B592",
      subBg: "#EAE0D5",
      subText: "#3D2214",
      subBorder: "#C9B29B",
      rejectBg: "#FFFFFF",
      rejectText: "#5C3A21",
      acceptBg: "#3D2214",
      acceptText: "#FFFFFF",
    };
  }

  if (theme === "coffee") {
    return {
      bgColor: "#26150D",
      colBg: "#321C12",
      textColor: "#FAF5EE",
      mutedText: "#D4C2B2",
      borderColor: "#4A2E1F",
      coffeeBg: "rgba(235, 199, 150, 0.16)",
      coffeeText: "#EBC796",
      coffeeBorder: "rgba(235, 199, 150, 0.42)",
      subBg: "rgba(250, 245, 238, 0.11)",
      subText: "#FAF5EE",
      subBorder: "rgba(250, 245, 238, 0.26)",
      rejectBg: "rgba(255, 255, 255, 0.03)",
      rejectText: "#E7D9C8",
      acceptBg: "#FAF5EE",
      acceptText: "#26150D",
    };
  }

  return {
    bgColor: "#161618",
    colBg: "#202024",
    textColor: "#f4f4f5",
    mutedText: "#a1a1aa",
    borderColor: "#2e2e33",
    coffeeBg: "rgba(251, 191, 36, 0.14)",
    coffeeText: "#fbbf24",
    coffeeBorder: "rgba(251, 191, 36, 0.38)",
    subBg: "rgba(96, 165, 250, 0.14)",
    subText: "#60a5fa",
    subBorder: "rgba(96, 165, 250, 0.38)",
    rejectBg: "transparent",
    rejectText: "#e4e4e7",
    acceptBg: "#ffffff",
    acceptText: "#18181b",
  };
}

export function generateVanillaEmbedCode(config: WidgetConfig): string {
  const preset = getPresetById(config.presetId);
  const t = getThemeTokens(config.theme);
  const posRule =
    config.position === "bottom-left" ? "left: 20px;" : "right: 20px;";
  const maxWidth =
    config.style === "banner"
      ? "760px"
      : config.style === "compact"
        ? "520px"
        : "560px";

  const copyPayload = {
    BR: {
      ...preset.copy.BR,
      coffeeUrl: config.nationalCoffeeUrl || "https://pagaum.cafe/",
      subUrl: config.nationalSubUrl || "https://apoia.se/",
    },
    INTL: {
      ...preset.copy.INTL,
      coffeeUrl: config.intlCoffeeUrl || "https://ko-fi.com/",
      subUrl: config.intlSubUrl || "https://github.com/sponsors",
    },
  };

  const watermarkHtml = config.removeWatermark
    ? ""
    : `<div class="cc-w-footer"><a href="https://cookiesandcoffee.dev" target="_blank" rel="noopener noreferrer"><img class="cc-w-mini-logo" src="${EMBED_LOGO_DATA_URI}" alt="" aria-hidden="true" />Powered by Cookies &amp; Coffee</a></div>`;

  const headerHtml =
    config.style === "banner"
      ? `''`
      : config.style === "compact"
        ? `'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">' +
      '<div style="display:flex;align-items:center;gap:8px"><img class="cc-w-logo-sm" src="' + LOGO_URI + '" alt="Cookies &amp; Coffee" /><h3 class="cc-w-title" style="margin:0;text-align:left;font-size:15px">' + t.title + '</h3></div>' +
      '<span style="font-size:10px;opacity:.75;border:1px solid ${t.borderColor};padding:2px 8px;border-radius:99px">' + (isBR ? 'LGPD · BR' : 'GDPR · INTL') + '</span>' +
    '</div>'`
        : `'<img class="cc-w-logo" src="' + LOGO_URI + '" alt="Cookies &amp; Coffee" /><h3 class="cc-w-title">' + t.title + '</h3>'`;

  return `<!-- Cookies & Coffee Widget (2 Colunas: Café + Cookies | Estilo: ${config.style} | ${preset.lawName}) -->
<script>
(function() {
  var STORAGE_KEY = "cookies_and_coffee_consent";
  if (localStorage.getItem(STORAGE_KEY)) return;

  var DATA = ${JSON.stringify(copyPayload)};
  var LOGO_URI = "${EMBED_LOGO_DATA_URI}";
  var lang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  var tz = "";
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
  var isBR = lang.indexOf("pt") === 0 || tz.indexOf("Sao_Paulo") !== -1 || tz.indexOf("Fortaleza") !== -1 || tz.indexOf("Manaus") !== -1;
  var t = isBR ? DATA.BR : DATA.INTL;

  var style = document.createElement("style");
  style.textContent = [
    "#cc-widget-card{position:fixed;bottom:20px;${posRule}max-width:${maxWidth};width:calc(100vw - 40px);background:${t.bgColor};color:${t.textColor};border:1px solid ${t.borderColor};border-radius:16px;padding:20px;z-index:9999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;box-shadow:0 24px 48px -12px rgba(38,21,13,0.28),0 8px 16px -8px rgba(38,21,13,0.16);box-sizing:border-box;animation:ccFadeIn .28s ease-out}",
    "@keyframes ccFadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}",
    "#cc-widget-card .cc-w-logo{display:block;width:54px;height:54px;margin:0 auto 6px auto;object-fit:contain}",
    "#cc-widget-card .cc-w-logo-sm{display:block;width:28px;height:28px;object-fit:contain}",
    "#cc-widget-card .cc-w-mini-logo{width:15px;height:15px;vertical-align:-3px;margin-right:4px;object-fit:contain}",
    "#cc-widget-card .cc-w-title{text-align:center;font-size:18px;font-weight:800;margin:0 0 14px 0;color:${t.textColor}}",
    "#cc-widget-card .cc-w-cols{display:grid;grid-template-columns:1fr 1fr;gap:14px}",
    "@media(max-width:540px){#cc-widget-card .cc-w-cols{grid-template-columns:1fr}}",
    "#cc-widget-card .cc-w-col{display:flex;flex-direction:column;justify-content:space-between;background:${t.colBg};border:1px solid ${t.borderColor};border-radius:12px;padding:14px;text-align:left}",
    "#cc-widget-card .cc-w-p{font-size:12.5px;line-height:1.55;color:${t.mutedText};margin:0 0 12px 0}",
    "#cc-widget-card .cc-w-p strong{color:${t.textColor};font-weight:700}",
    "#cc-widget-card .cc-w-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px}",
    "#cc-widget-card .cc-w-btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:9px 10px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;cursor:pointer;transition:opacity .15s,transform .1s;border:1px solid transparent;text-align:center;line-height:1.2}",
    "#cc-widget-card .cc-w-btn:hover{opacity:.92}",
    "#cc-widget-card .cc-w-btn:active{transform:scale(.98)}",
    "#cc-widget-card .cc-w-btn-coffee{background:${t.coffeeBg};color:${t.coffeeText};border-color:${t.coffeeBorder}}",
    "#cc-widget-card .cc-w-btn-sub{background:${t.subBg};color:${t.subText};border-color:${t.subBorder}}",
    "#cc-widget-card .cc-w-btn-reject{background:${t.rejectBg};color:${t.rejectText};border-color:${t.borderColor}}",
    "#cc-widget-card .cc-w-btn-accept{background:${t.acceptBg};color:${t.acceptText};border-color:${t.acceptBg}}",
    "#cc-widget-card .cc-w-footer{margin-top:10px;text-align:center;font-size:11px}",
    "#cc-widget-card .cc-w-footer a{color:${t.mutedText};text-decoration:none;opacity:.85}",
    "#cc-widget-card .cc-w-footer a:hover{opacity:1;text-decoration:underline}"
  ].join("");
  document.head.appendChild(style);

  var card = document.createElement("div");
  card.id = "cc-widget-card";
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", t.title);
  card.innerHTML =
    ${headerHtml} +
    '<div class="cc-w-cols">' +
      '<div class="cc-w-col">' +
        '<p class="cc-w-p"><strong>☕ ' + t.coffeeLabel + '</strong> ' + t.coffeeText + '</p>' +
        '<div class="cc-w-actions">' +
          '<a class="cc-w-btn cc-w-btn-coffee" href="' + t.coffeeUrl + '" target="_blank" rel="noopener noreferrer">' + t.oneTimeButton + '</a>' +
          '<a class="cc-w-btn cc-w-btn-sub" href="' + t.subUrl + '" target="_blank" rel="noopener noreferrer">' + t.recurringButton + '</a>' +
        '</div>' +
      '</div>' +
      '<div class="cc-w-col">' +
        '<p class="cc-w-p"><strong>🍪 ' + t.cookiesLabel + '</strong> ' + t.cookiesText + '</p>' +
        '<div class="cc-w-actions">' +
          '<button type="button" class="cc-w-btn cc-w-btn-reject" data-cc-action="rejected">' + t.rejectButton + '</button>' +
          '<button type="button" class="cc-w-btn cc-w-btn-accept" data-cc-action="accepted">' + t.acceptButton + '</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '${watermarkHtml}';

  function handleConsent(status) {
    localStorage.setItem(STORAGE_KEY, status);
    card.remove();
    window.dispatchEvent(new CustomEvent("cookieConsentChanged", { detail: { status: status } }));
  }

  card.querySelector('[data-cc-action="rejected"]').addEventListener("click", function() { handleConsent("rejected"); });
  card.querySelector('[data-cc-action="accepted"]').addEventListener("click", function() { handleConsent("accepted"); });
  document.body.appendChild(card);
})();
</script>`;
}

export function generateMinifiedEmbedCode(config: WidgetConfig): string {
  const full = generateVanillaEmbedCode(config);
  return full
    .replace(/\n\s+/g, "")
    .replace(/;\s+/g, ";")
    .replace(/:\s+/g, ":");
}

export function generateEdgeCloudCode(config: WidgetConfig): string {
  return `<!-- Cookies & Coffee Cloud Edge (Pro — Geo-IP Routing via CF-IPCountry) -->
<script
  src="https://cookiesandcoffee.dev"
  data-style="${config.style}"
  data-preset="${config.presetId}"
  data-theme="${config.theme}"
  data-position="${config.position}"
  data-br-coffee="${config.nationalCoffeeUrl}"
  data-br-sub="${config.nationalSubUrl}"
  data-intl-coffee="${config.intlCoffeeUrl}"
  data-intl-sub="${config.intlSubUrl}"
  defer
></script>`;
}

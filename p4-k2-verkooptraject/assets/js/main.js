const pathPrefix = location.pathname.includes("/opdrachten/") ? "../" : "";
const currentFile = location.pathname.split("/").pop() || "index.html";
const sidePanel = document.querySelector(".side-panel");
const layout = document.querySelector(".layout");
const navGrid = document.querySelector(".nav-grid");

const pages = [
  ["index.html", "Instructie"],
  ["opdrachten/opdracht-1.html", "1 Voorbereiding commercieel traject"],
  ["opdrachten/opdracht-2.html", "2 Klantgesprek"],
  ["opdrachten/opdracht-3.html", "3 Offertetraject"],
  ["opdrachten/opdracht-4-1.html", "4.1 Verzorgen ordertraject"],
  ["opdrachten/opdracht-4-2.html", "4.2 Bewaken ordertraject", "sub-item"],
  ["opdrachten/opdracht-5-1.html", "5.1 Onderzoeken klanttevredenheid"],
  ["opdrachten/opdracht-5-2.html", "5.2 Opstellen verbetervoorstel", "sub-item"]
];

const downloads = [
  ["downloads/bijlagen/bijlage-1-crm-truecacao-placeholder.docx", "Bijlage 1 CRM-systeem TrueCacao"],
  ["downloads/bijlagen/bijlage-2-klanttevredenheid-placeholder.pdf", "Bijlage 2 Klanttevredenheidsonderzoek TrueCacao"],
  ["downloads/formats/format-offerte-placeholder.docx", "Format offerte"],
  ["downloads/formats/format-orderbevestiging-placeholder.docx", "Format orderbevestiging"],
  ["downloads/formats/format-email-placeholder.docx", "Format e-mail"]
];

function rootHref(target) {
  return `${pathPrefix}${target}`;
}

function isActive(target) {
  if (currentFile === "index.html" && target === "index.html") return true;
  return target.endsWith(currentFile) && currentFile !== "index.html";
}

if (navGrid) {
  navGrid.innerHTML = `
    <a class="top-tab top-tab-logo" href="${rootHref("../dutchdelight-site/index.html")}" target="_blank" rel="noopener">
      <img src="${rootHref("../dutchdelight-site/assets/logo-dutchdelight.png")}" alt="DutchDelight Chocolates">
    </a>
    <a class="top-tab" href="${rootHref("index.html")}">Examenvoorbereiding</a>
    <a class="top-tab active" href="${rootHref("index.html")}">Examenopdrachten</a>
    <div class="quick-tools" aria-label="Snel zoeken">
      <a class="start-return" href="${rootHref("../index.html")}">Terug naar startmenu</a>
      <span title="Home">⌂</span>
      <span title="Help">?</span>
      <input type="search" aria-label="Zoeken" placeholder="Typ zoekterm">
      <button aria-label="Zoeken">⌕</button>
    </div>
  `;
}

if (layout) {
  const hero = document.createElement("section");
  hero.className = "exam-hero page-shell";
  hero.innerHTML = `<h1>Proefexamen SPL P4-K2</h1><img class="hero-logo" src="${rootHref("../dutchdelight-site/assets/logo-dutchdelight.png")}" alt="">`;
  document.querySelector(".site-nav")?.after(hero);

  const crumb = document.createElement("div");
  crumb.className = "breadcrumb";
  crumb.textContent = currentFile === "index.html" ? "home › examenopdrachten" : `home › examenopdrachten › ${document.querySelector("h2")?.textContent.toLowerCase() || ""}`;
  layout.prepend(crumb);
}

if (sidePanel) {
  const menuLinks = pages.map(([target, label, extraClass]) => {
    const classes = ["menu-item"];
    if (extraClass) classes.push(extraClass);
    if (isActive(target)) classes.push("active");
    return `<a class="${classes.join(" ")}" href="${rootHref(target)}">${label}</a>`;
  }).join("");

  const bijlagen = downloads.slice(0, 2).map(([target, label]) => `<a href="${rootHref(target)}">${label}</a>`).join("");
  const formats = downloads.slice(2).map(([target, label]) => `<a href="${rootHref(target)}">${label}</a>`).join("");

  sidePanel.innerHTML = `
    <nav class="assignment-menu" aria-label="Examenopdrachten">${menuLinks}</nav>
    <section class="side-downloads" aria-label="Downloads">
      <h2>Bijlagen</h2>
      ${bijlagen}
      <h3>Formats</h3>
      ${formats}
    </section>
  `;
}

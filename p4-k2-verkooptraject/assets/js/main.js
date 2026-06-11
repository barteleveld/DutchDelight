const pathPrefix = location.pathname.includes("/opdrachten/") ? "../" : "";
const currentFile = location.pathname.split("/").pop() || "index.html";
const sidePanel = document.querySelector(".side-panel");
const layout = document.querySelector(".layout");
const navGrid = document.querySelector(".nav-grid");

const menuGroups = [
  { target: "index.html", label: "Instructie" },
  { target: "opdrachten/opdracht-1.html", label: "1 Voorbereiding commercieel traject" },
  { target: "opdrachten/opdracht-2.html", label: "2 Klantgesprek" },
  { target: "opdrachten/opdracht-3.html", label: "3 Offertetraject" },
  {
    label: "4 Ordertraject",
    children: [
      { target: "opdrachten/opdracht-4-1.html", label: "4.1 Verzorgen ordertraject" },
      { target: "opdrachten/opdracht-4-2.html", label: "4.2 Bewaken ordertraject" }
    ]
  },
  {
    label: "5 Klanttevredenheid",
    children: [
      { target: "opdrachten/opdracht-5-1.html", label: "5.1 Onderzoeken klanttevredenheid" },
      { target: "opdrachten/opdracht-5-2.html", label: "5.2 Opstellen verbetervoorstel" }
    ]
  }
];

const downloads = [
  ["downloads/bijlagen/Bijlage 1 CRM-systeem TrueCacao.docx", "Bijlage 1 CRM-systeem TrueCacao"],
  ["downloads/bijlagen/Bijlage 2 Klanttevredenheidsonderzoek TrueCacao.pdf", "Bijlage 2 Klanttevredenheidsonderzoek TrueCacao"],
  ["downloads/formats/Format offerte.docx", "Format offerte"],
  ["downloads/formats/Format orderbevestiging.docx", "Format orderbevestiging"],
  ["downloads/formats/Format e-mail.docx", "Format e-mail"]
];

function rootHref(target) {
  return `${pathPrefix}${target}`;
}

function isActive(target) {
  if (currentFile === "index.html" && target === "index.html") return true;
  return target.endsWith(currentFile) && currentFile !== "index.html";
}

function groupHasActiveChild(group) {
  return group.children?.some((child) => isActive(child.target));
}

function renderMenuGroup(group, index) {
  if (!group.children) {
    return `<a class="menu-item${isActive(group.target) ? " active" : ""}" href="${rootHref(group.target)}">${group.label}</a>`;
  }

  const groupId = `assignment-group-${index}`;
  const expanded = groupHasActiveChild(group);
  const children = group.children.map((child) => (
    `<a class="submenu-item${isActive(child.target) ? " active" : ""}" href="${rootHref(child.target)}">${child.label}</a>`
  )).join("");

  return `
    <div class="menu-section${expanded ? " expanded" : ""}">
      <button class="menu-group${expanded ? " active" : ""}" type="button" aria-expanded="${expanded}" aria-controls="${groupId}">
        <span>${group.label}</span>
        <span class="menu-toggle" aria-hidden="true">${expanded ? "-" : "+"}</span>
      </button>
      <div class="submenu${expanded ? " open" : ""}" id="${groupId}">
        ${children}
      </div>
    </div>
  `;
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
      <span title="Home">&#8962;</span>
      <span title="Help">?</span>
      <input type="search" aria-label="Zoeken" placeholder="Typ zoekterm">
      <button aria-label="Zoeken">&#8981;</button>
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
  crumb.textContent = currentFile === "index.html" ? "home > examenopdrachten" : `home > examenopdrachten > ${document.querySelector("h2")?.textContent.toLowerCase() || ""}`;
  layout.prepend(crumb);
}

if (sidePanel) {
  const bijlagen = downloads.slice(0, 2).map(([target, label]) => `<a href="${rootHref(target)}">${label}</a>`).join("");
  const formats = downloads.slice(2).map(([target, label]) => `<a href="${rootHref(target)}">${label}</a>`).join("");

  sidePanel.innerHTML = `
    <nav class="assignment-menu" aria-label="Examenopdrachten">${menuGroups.map(renderMenuGroup).join("")}</nav>
    <section class="side-downloads" aria-label="Downloads">
      <h2>Bijlagen</h2>
      ${bijlagen}
      <h3>Formats</h3>
      ${formats}
    </section>
  `;

  sidePanel.querySelectorAll(".menu-group").forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.closest(".menu-section");
      const submenu = section?.querySelector(".submenu");
      const toggle = button.querySelector(".menu-toggle");
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      section?.classList.toggle("expanded", !expanded);
      submenu?.classList.toggle("open", !expanded);
      if (toggle) toggle.textContent = expanded ? "+" : "-";
    });
  });
}


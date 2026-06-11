const pathPrefix = location.pathname.includes("/opdrachten/") ? "../" : "";
const currentPath = location.pathname.replace(/\\/g, "/");
const currentFile = location.pathname.split("/").pop() || "index.html";
const sidePanel = document.querySelector(".side-panel");
const layout = document.querySelector(".layout");

const pages = [
  ["index.html", "Instructie"],
  ["opdrachten/opdracht-1.html", "1 Marktpositie"],
  ["opdrachten/opdracht-2.html", "2 Customer journey"],
  ["opdrachten/opdracht-3-1.html", "3.1 Vertalen trends en ontwikkelingen"],
  ["opdrachten/opdracht-3-2.html", "3.2 Feedback verwerken", "sub-item"],
  ["opdrachten/opdracht-4.html", "4 Commercieel aanbod"],
  ["opdrachten/opdracht-5-1.html", "5.1 Opstellen verbetervoorstel"],
  ["opdrachten/opdracht-5-2.html", "5.2 Feedback verwerken", "sub-item"]
];

function rootHref(target) {
  return `${pathPrefix}${target}`;
}

function isActive(target) {
  if (currentFile === "index.html" && !currentPath.includes("/opdrachten/") && target === "index.html") return true;
  return target.endsWith(currentFile) && currentFile !== "index.html";
}

if (layout) {
  const hero = document.createElement("section");
  hero.className = "exam-hero page-shell";
  hero.innerHTML = `<h1>Proefexamen SPL B1-K1</h1><img class="hero-logo" src="${rootHref("../dutchdelight-site/assets/logo-dutchdelight.png").replace("b1-k1-customer-journey/../", "")}" alt="">`;
  document.querySelector(".site-nav")?.after(hero);

  const crumb = document.createElement("div");
  crumb.className = "breadcrumb";
  crumb.textContent = currentFile === "index.html" ? "home > examenopdrachten" : `home > examenopdrachten > ${document.querySelector("h2")?.textContent.toLowerCase() || ""}`;
  layout.prepend(crumb);
}

if (sidePanel) {
  const menuLinks = pages.map(([target, label, extraClass]) => {
    const classes = ["menu-item"];
    if (extraClass) classes.push(extraClass);
    if (isActive(target)) classes.push("active");
    return `<a class="${classes.join(" ")}" href="${rootHref(target)}">${label}</a>`;
  }).join("");

  sidePanel.innerHTML = `
    <nav class="assignment-menu" aria-label="Examenopdrachten">${menuLinks}</nav>
  `;
}

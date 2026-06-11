const pathPrefix = location.pathname.includes("/opdrachten/") ? "../" : "";
const currentPath = location.pathname.replace(/\\/g, "/");
const currentFile = location.pathname.split("/").pop() || "index.html";
const sidePanel = document.querySelector(".side-panel");
const layout = document.querySelector(".layout");

const menuGroups = [
  { target: "index.html", label: "Instructie" },
  { target: "opdrachten/opdracht-1.html", label: "1 Marktpositie" },
  { target: "opdrachten/opdracht-2.html", label: "2 Customer journey" },
  {
    label: "3 Trends en ontwikkelingen",
    children: [
      { target: "opdrachten/opdracht-3-1.html", label: "3.1 Vertalen trends en ontwikkelingen" },
      { target: "opdrachten/opdracht-3-2.html", label: "3.2 Feedback verwerken" }
    ]
  },
  { target: "opdrachten/opdracht-4.html", label: "4 Commercieel aanbod" },
  {
    label: "5 Verbetervoorstel",
    children: [
      { target: "opdrachten/opdracht-5-1.html", label: "5.1 Opstellen verbetervoorstel" },
      { target: "opdrachten/opdracht-5-2.html", label: "5.2 Feedback verwerken" }
    ]
  }
];

function rootHref(target) {
  return `${pathPrefix}${target}`;
}

function isActive(target) {
  if (currentFile === "index.html" && !currentPath.includes("/opdrachten/") && target === "index.html") return true;
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
  sidePanel.innerHTML = `
    <nav class="assignment-menu" aria-label="Examenopdrachten">${menuGroups.map(renderMenuGroup).join("")}</nav>
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

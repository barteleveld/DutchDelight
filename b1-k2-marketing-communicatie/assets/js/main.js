const pathPrefix = location.pathname.includes("/opdrachten/") ? "../" : "";
const currentFile = location.pathname.split("/").pop() || "index.html";
const inAssignments = location.pathname.includes("/opdrachten/");
const menu = document.querySelector(".assignment-menu");
const downloadsPanel = document.querySelector("#downloads-panel");

const menuGroups = [
  { target: "index.html", label: "Instructie" },
  {
    label: "1 Voorbereiden communicatie-uiting",
    children: [
      { target: "opdrachten/opdracht-1-1.html", label: "1.1 Verwerken en verzamelen van informatie" },
      { target: "opdrachten/opdracht-1-2.html", label: "1.2 Verwerken feedback" }
    ]
  },
  { target: "opdrachten/opdracht-2.html", label: "2 Ontwikkelen communicatie-uiting" },
  {
    label: "3 Uitvoeren webcare",
    children: [
      { target: "opdrachten/opdracht-3-1.html", label: "3.1 Volgen van berichten en reageren op berichten" },
      { target: "opdrachten/opdracht-3-2.html", label: "3.2 Evalueren uitgevoerde webcare" }
    ]
  }
];

const downloadsByFile = {
  "opdracht-1-1.html": {
    bijlagen: [
      ["downloads/Bijlage 1 E-mail van Sanne Vermeer.pdf", "Bijlage 1 E-mail van Sanne Vermeer", "pdf"],
      ["downloads/Bijlage 2 Conclusies voorbereiden communicatie-uiting.docx", "Bijlage 2 Conclusies voorbereiden communicatie-uiting", "word"]
    ],
    formats: []
  },
  "opdracht-2.html": {
    bijlagen: [["downloads/Bijlage 3 Briefing digitale flyer Pulse.pdf", "Bijlage 3 Briefing digitale flyer Pulse", "pdf"]],
    formats: []
  },
  "opdracht-3-1.html": {
    bijlagen: [
      ["downloads/Bijlage 4 Retourvoorwaarden zakelijke klanten DutchDelight Chocolates.pdf", "Bijlage 4 Retourvoorwaarden zakelijke klanten DutchDelight Chocolates", "pdf"],
      ["downloads/Bijlage 5 Online berichten DutchDelight Chocolates.pdf", "Bijlage 5 Online berichten DutchDelight Chocolates", "pdf"]
    ],
    formats: [["downloads/Format notitie.docx", "Format notitie", "word"]]
  },
  "opdracht-3-2.html": {
    bijlagen: [["downloads/Bijlage 6 Rapportage webcare DutchDelight Chocolates.xlsx", "Bijlage 6 Rapportage webcare DutchDelight Chocolates", "excel"]],
    formats: [["downloads/Format notitie.docx", "Format notitie", "word"]]
  }
};

function rootHref(target) {
  return `${pathPrefix}${target}`;
}

function isActive(target) {
  if (currentFile === "index.html" && target === "index.html" && !inAssignments) return true;
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

if (menu) {
  menu.innerHTML = menuGroups.map(renderMenuGroup).join("");
  menu.querySelectorAll(".menu-group").forEach((button) => {
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

function appendDownloadSection(title, items) {
  if (!downloadsPanel || !items.length) return;
  const heading = document.createElement(title === "Bijlagen" ? "h2" : "h3");
  heading.textContent = title;
  downloadsPanel.appendChild(heading);
  items.forEach(([target, label, type]) => {
    const link = document.createElement("a");
    link.className = `download ${type}`;
    link.href = rootHref(target);
    link.target = "_blank";
    link.rel = "noopener";
    if (type === "word" || type === "excel") link.download = "";
    link.textContent = label;
    downloadsPanel.appendChild(link);
  });
}

if (downloadsPanel) {
  const downloads = downloadsByFile[currentFile] || { bijlagen: [], formats: [] };
  downloadsPanel.hidden = !(downloads.bijlagen.length || downloads.formats.length);
  appendDownloadSection("Bijlagen", downloads.bijlagen);
  appendDownloadSection("Formats", downloads.formats);
}

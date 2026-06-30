const pathPrefix = location.pathname.includes("/opdrachten/") ? "../" : "";
const currentFile = location.pathname.split("/").pop() || "index.html";
const inAssignments = location.pathname.includes("/opdrachten/");
const menu = document.querySelector(".assignment-menu");
const downloadsPanel = document.querySelector("#downloads-panel");

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
    label: "5 Aftersales",
    children: [
      { target: "opdrachten/opdracht-5-1.html", label: "5.1 Onderzoeken klanttevredenheid" },
      { target: "opdrachten/opdracht-5-2.html", label: "5.2 Opstellen verbetervoorstel" }
    ]
  }
];

const downloadsByFile = {
  "opdracht-1.html": {
    bijlagen: [["downloads/bijlagen/Bijlage 1 CRM-systeem TrueCacao.docx", "Bijlage 1 CRM-systeem TrueCacao", "word"]],
    formats: []
  },
  "opdracht-2.html": {
    bijlagen: [["downloads/bijlagen/Bijlage 1 CRM-systeem TrueCacao.docx", "Bijlage 1 CRM-systeem TrueCacao", "word"]],
    formats: []
  },
  "opdracht-3.html": {
    bijlagen: [["downloads/bijlagen/Bijlage 1 CRM-systeem TrueCacao.docx", "Bijlage 1 CRM-systeem TrueCacao", "word"]],
    formats: [["downloads/formats/Format offerte.docx", "Format offerte", "word"]]
  },
  "opdracht-4-1.html": {
    bijlagen: [["downloads/bijlagen/Bijlage 1 CRM-systeem TrueCacao.docx", "Bijlage 1 CRM-systeem TrueCacao", "word"]],
    formats: [["downloads/formats/Format orderbevestiging.docx", "Format orderbevestiging", "word"]]
  },
  "opdracht-4-2.html": {
    bijlagen: [["downloads/bijlagen/Bijlage 1 CRM-systeem TrueCacao.docx", "Bijlage 1 CRM-systeem TrueCacao", "word"]],
    formats: [["downloads/formats/Format e-mail.docx", "Format e-mail", "word"]]
  },
  "opdracht-5-1.html": {
    bijlagen: [],
    formats: [["downloads/formats/Format e-mail.docx", "Format e-mail", "word"]]
  },
  "opdracht-5-2.html": {
    bijlagen: [["downloads/bijlagen/Bijlage 2 Klanttevredenheidsonderzoek TrueCacao.pdf", "Bijlage 2 Klanttevredenheidsonderzoek TrueCacao", "pdf"]],
    formats: [["downloads/formats/Format e-mail.docx", "Format e-mail", "word"]]
  },
  "bijlagen.html": {
    bijlagen: [
      ["downloads/bijlagen/Bijlage 1 CRM-systeem TrueCacao.docx", "Bijlage 1 CRM-systeem TrueCacao", "word"],
      ["downloads/bijlagen/Bijlage 2 Klanttevredenheidsonderzoek TrueCacao.pdf", "Bijlage 2 Klanttevredenheidsonderzoek TrueCacao", "pdf"]
    ],
    formats: []
  },
  "formats.html": {
    bijlagen: [],
    formats: [
      ["downloads/formats/Format offerte.docx", "Format offerte", "word"],
      ["downloads/formats/Format orderbevestiging.docx", "Format orderbevestiging", "word"],
      ["downloads/formats/Format e-mail.docx", "Format e-mail", "word"]
    ]
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
      <div class="submenu${expanded ? " open" : ""}" id="${groupId}">${children}</div>
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

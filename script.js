const pages = document.querySelectorAll(".article-page");
const menuItems = document.querySelectorAll(".menu-item");
const breadcrumb = document.querySelector("#breadcrumb");
const downloadsPanel = document.querySelector("#downloads-panel");
const topTabs = document.querySelectorAll("button.top-tab");
const topPages = document.querySelectorAll(".top-page");
const groupToggles = document.querySelectorAll("[data-group-toggle]");
const submenus = document.querySelectorAll(".submenu");
const startPage = document.querySelector("#start-page");
const examInterfaces = document.querySelectorAll(".exam-interface");
const choiceMessage = document.querySelector("#choice-message");
const examChoiceButtons = document.querySelectorAll("[data-exam-choice]");
const returnStartButtons = document.querySelectorAll("[data-return-start]");

const downloadsByPage = {
  instructie: {
    bijlagen: [],
    formats: []
  },
  "opdracht-1-1": {
    bijlagen: [
      { label: "Bijlage 1 E-mail van Sanne Vermeer", type: "pdf", href: "downloads/Bijlage 1 E-mail van Sanne Vermeer.pdf" },
      { label: "Bijlage 2 Conclusies voorbereiden communicatie-uiting", type: "word", href: "downloads/Bijlage 2 Conclusies voorbereiden communicatie-uiting.docx" }
    ],
    formats: []
  },
  "opdracht-1-2": {
    bijlagen: [],
    formats: []
  },
  "opdracht-2": {
    bijlagen: [
      { label: "Bijlage 3 Briefing digitale flyer premium chocoladegeschenken", type: "pdf", href: "downloads/Bijlage 3 Briefing digitale flyer premium chocoladegeschenken.pdf" }
    ],
    formats: []
  },
  "opdracht-3-1": {
    bijlagen: [
      { label: "Bijlage 4 Retourvoorwaarden zakelijke klanten DutchDelight Chocolates", type: "pdf", href: "downloads/Bijlage 4 Retourvoorwaarden zakelijke klanten DutchDelight Chocolates.pdf" },
      { label: "Bijlage 5 Online berichten DutchDelight Chocolates", type: "pdf", href: "downloads/Bijlage 5 Online berichten DutchDelight Chocolates.pdf" }
    ],
    formats: [
      { label: "Format notitie", type: "word", href: "downloads/Format notitie.docx" }
    ]
  },
  "opdracht-3-2": {
    bijlagen: [
      { label: "Bijlage 6 Rapportage webcare DutchDelight Chocolates", type: "excel", href: "downloads/Bijlage 6 Rapportage webcare DutchDelight Chocolates.xlsx" }
    ],
    formats: [
      { label: "Format notitie", type: "word", href: "downloads/Format notitie.docx" }
    ]
  }
};

function appendDownloadSection(title, items) {
  if (!items.length) return;

  const heading = document.createElement(title === "Bijlagen" ? "h2" : "h3");
  heading.textContent = title;
  downloadsPanel.appendChild(heading);

  items.forEach((item) => {
    const link = document.createElement("a");
    link.className = `download ${item.type}`;
    link.href = item.href;
    link.target = "_blank";
    link.rel = "noopener";
    if ((item.type === "word" || item.type === "excel") && !item.href.endsWith(".html")) {
      link.download = "";
    }
    link.textContent = item.label;
    downloadsPanel.appendChild(link);
  });
}

function renderDownloads(pageId) {
  const downloads = downloadsByPage[pageId] || downloadsByPage.instructie;
  downloadsPanel.innerHTML = "";
  const hasDownloads = downloads.bijlagen.length || downloads.formats.length;
  downloadsPanel.hidden = !hasDownloads;
  appendDownloadSection("Bijlagen", downloads.bijlagen);
  appendDownloadSection("Formats", downloads.formats);
}

function setGroupOpen(groupId, open) {
  const toggle = document.querySelector(`[data-group-toggle="${groupId}"]`);
  const submenu = document.querySelector(`[data-group="${groupId}"]`);
  if (!toggle || !submenu) return;
  toggle.classList.toggle("expanded", open);
  toggle.setAttribute("aria-expanded", String(open));
  const indicator = toggle.querySelector("span");
  if (indicator) indicator.textContent = open ? "-" : "+";
  submenu.classList.toggle("open", open);
}

function closeInactiveGroups(activeGroupId) {
  groupToggles.forEach((toggle) => {
    const groupId = toggle.dataset.groupToggle;
    setGroupOpen(groupId, groupId === activeGroupId);
  });
}

function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.toggle("active-page", page.id === pageId);
  });

  menuItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.page === pageId);
  });

  const activePage = document.getElementById(pageId);
  const activeMenuItem = document.querySelector(`.menu-item[data-page="${pageId}"]`);
  closeInactiveGroups(activeMenuItem?.dataset.parentGroup || null);
  breadcrumb.textContent = activePage.dataset.crumb;
  document.title = `${activePage.dataset.title} | Proefexamen SPL B1-K2`;
  renderDownloads(pageId);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showTopPage(pageId) {
  topPages.forEach((page) => {
    page.classList.toggle("active-top-page", page.id === `${pageId}-page`);
  });

  topTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.topPage === pageId);
  });
}

function showStartPage() {
  startPage.hidden = false;
  examInterfaces.forEach((element) => {
    element.hidden = true;
  });
  if (choiceMessage) choiceMessage.hidden = true;
  document.title = "Proefexamens Junior Accountmanager";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showExamShell() {
  startPage.hidden = true;
  examInterfaces.forEach((element) => {
    element.hidden = false;
  });
  showTopPage("examens");
  showPage("instructie");
}

examChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.examChoice === "b1-k2") {
      showExamShell();
      return;
    }

    if (button.dataset.examChoice === "p4-k1") {
      window.location.href = "p4-k1-accountmanagement/index.html";
      return;
    }

    if (choiceMessage) {
      const taskName = button.querySelector("span")?.textContent || "Deze kerntaak";
      choiceMessage.querySelector("h2").textContent = `${taskName} is nog niet beschikbaar`;
      choiceMessage.hidden = false;
      choiceMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
});

returnStartButtons.forEach((button) => {
  button.addEventListener("click", showStartPage);
});

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    showTopPage("examens");
    showPage(item.dataset.page);
  });
});

groupToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const groupId = toggle.dataset.groupToggle;
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    closeInactiveGroups(null);
    setGroupOpen(groupId, !isOpen);
  });
});

topTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    showTopPage(tab.dataset.topPage);
  });
});

document.querySelectorAll("[data-company-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showTopPage("dutchdelight");
  });
});

renderDownloads("instructie");

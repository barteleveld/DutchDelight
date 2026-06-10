const pages = document.querySelectorAll(".article-page");
const menuItems = document.querySelectorAll(".menu-item");
const breadcrumb = document.querySelector("#breadcrumb");
const downloadsPanel = document.querySelector("#downloads-panel");
const topTabs = document.querySelectorAll("button.top-tab");
const topPages = document.querySelectorAll(".top-page");

const downloadsByPage = {
  instructie: {
    bijlagen: [],
    formats: []
  },
  "opdracht-1": {
    bijlagen: [
      { label: "Bijlage 1 Informatie over DolceDistribuzione", type: "word", href: "downloads/Bijlage%201%20Informatie%20over%20DolceDistribuzione.docx" },
      { label: "Bijlage 2 Accountplan DolceDistribuzione", type: "word", href: "downloads/Bijlage%202%20Accountplan%20DolceDistribuzione.docx" }
    ],
    formats: []
  },
  "opdracht-2": {
    bijlagen: [
      { label: "Bijlage 3 Verkoopdoelen DutchDelight Chocolates", type: "word", href: "downloads/Bijlage%203%20Verkoopdoelen%20DutchDelight%20Chocolates.docx" }
    ],
    formats: [
      { label: "Format e-mail", type: "word", href: "downloads/Format%20e-mail.docx" }
    ]
  },
  "opdracht-3": {
    bijlagen: [
      { label: "Bijlage 4 Organogram DutchDelight Chocolates", type: "pdf", href: "downloads/Bijlage%204%20Organogram%20DutchDelight%20Chocolates.pdf" },
      { label: "Bijlage 5 E-mail van collega over verkoopondersteuning", type: "pdf", href: "downloads/Bijlage%205%20E-mail%20van%20collega%20over%20verkoopondersteuning.pdf" }
    ],
    formats: [
      { label: "Format actieplan", type: "word", href: "downloads/Format%20actieplan.docx" },
      { label: "Format e-mail", type: "word", href: "downloads/Format%20e-mail.docx" }
    ]
  },
  "opdracht-4": {
    bijlagen: [
      { label: "Bijlage 6 E-mail van sales support", type: "pdf", href: "downloads/Bijlage%206%20E-mail%20van%20sales%20support.pdf" },
      { label: "Bijlage 7 Verslag evaluatiegesprek met account DolceDistribuzione", type: "pdf", href: "downloads/Bijlage%207%20Verslag%20evaluatiegesprek%20met%20account%20DolceDistribuzione.pdf" }
    ],
    formats: [
      { label: "Format e-mail", type: "word", href: "downloads/Format%20e-mail.docx" }
    ]
  },
  "opdracht-5": {
    bijlagen: [
      { label: "Bijlage 8 Informatie over Noire Signature Bars", type: "pdf", href: "downloads/Bijlage%208%20Informatie%20over%20Noire%20Signature%20Bars.pdf" }
    ],
    formats: [
      { label: "Format LinkedIn", type: "word", href: "downloads/Format%20LinkedIn.docx" }
    ]
  }
};

function appendDownloadSection(title, items) {
  if (!items.length) return;

  const heading = document.createElement(title === "Bijlagen" ? "h2" : "h3");
  heading.textContent = title;
  downloadsPanel.appendChild(heading);

  items.forEach((item) => {
    if (item.missing) {
      const missing = document.createElement("div");
      missing.className = "missing-download";
      missing.innerHTML = `<span>${item.label}<span class="missing-note">input ontbreekt</span></span>`;
      downloadsPanel.appendChild(missing);
      return;
    }

    const link = document.createElement("a");
    link.className = `download ${item.type}`;
    link.href = item.href;
    link.target = "_blank";
    link.rel = "noopener";
    if (item.type === "word") {
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

function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.toggle("active-page", page.id === pageId);
  });

  menuItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.page === pageId);
  });

  const activePage = document.getElementById(pageId);
  breadcrumb.textContent = activePage.dataset.crumb;
  document.title = `${activePage.dataset.title} | Proefexamen SPL P4-K1`;
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

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    showTopPage("examens");
    showPage(item.dataset.page);
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

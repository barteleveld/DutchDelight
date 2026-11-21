(() => {
  "use strict";
  const pathPrefix = location.pathname.includes("/opdrachten/") ? "../" : "";
  const currentFile = location.pathname.split("/").pop() || "index.html";
  const inAssignments = location.pathname.includes("/opdrachten/");
  const menu = document.querySelector(".assignment-menu");
  const downloadsPanel = document.querySelector("#downloads-panel");

  const { title, subject, version, brand, menuGroups, downloadsByFile } = window.examConfig;
  const site = rootHref("../dutchdelight-site/");
  document.body.dataset.brand = brand;
  const shell = document.querySelector(".exam-header");
  shell.innerHTML = `
    <nav class="platform-nav" aria-label="Hoofdnavigatie"><div class="page-width nav-inner">
      <div class="tabs-main">
        <a class="top-tab top-tab-logo" href="${site}index.html" target="_blank" rel="noopener"><img src="${site}assets/logo-dutchdelight.png" alt="DutchDelight Chocolates"></a>
        <a class="top-tab active" href="${rootHref("index.html")}">Examenopdrachten</a>
      </div>
      <div class="quick-tools"><a class="start-return" href="${rootHref("../index.html")}">Terug naar startmenu</a></div>
    </div></nav>
    <div class="exam-banner"><div class="page-width banner-inner"><div class="banner-copy"><p></p><h1></h1><span></span></div></div></div>`;
  shell.querySelector(".banner-copy p").textContent = subject;
  shell.querySelector("h1").textContent = title;
  shell.querySelector(".banner-copy span").textContent = [version, brand].filter(Boolean).join(" · ");
  shell.querySelector(".top-tab.active").setAttribute("aria-current", inAssignments ? "location" : "page");

  function rootHref(target) {
    return `${pathPrefix}${target}`;
  }

  function isActive(target) {
    if (currentFile === "index.html" && target === "index.html" && !inAssignments) return true;
    return inAssignments && target === `opdrachten/${currentFile}`;
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
    return `<div class="menu-section${expanded ? " expanded" : ""}"><button class="menu-group${expanded ? " active" : ""}" type="button" aria-expanded="${expanded}" aria-controls="${groupId}"><span>${group.label}</span><span class="menu-toggle" aria-hidden="true">${expanded ? "−" : "+"}</span></button><div class="submenu${expanded ? " open" : ""}" id="${groupId}">${children}</div></div>`;
  }

  if (menu) {
    menu.innerHTML = menuGroups.map(renderMenuGroup).join("");
    menu.id = "opdrachtmenu";
    menu.querySelector("a.active")?.setAttribute("aria-current", "page");
    const label = document.createElement("p");
    label.className = "menu-label";
    label.textContent = "Opdrachtmenu";
    const toggle = document.createElement("button");
    toggle.className = "mobile-menu";
    toggle.type = "button";
    toggle.setAttribute("aria-controls", menu.id);
    toggle.innerHTML = 'Opdrachtmenu <span aria-hidden="true"></span>';
    function expandMenu(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.lastElementChild.textContent = open ? "−" : "+";
    }
    expandMenu(false);
    toggle.addEventListener("click", () => expandMenu(toggle.getAttribute("aria-expanded") !== "true"));
    menu.before(label, toggle);
    menu.querySelectorAll(".menu-group").forEach((button) => {
      button.addEventListener("click", () => {
        const section = button.closest(".menu-section");
        const submenu = section?.querySelector(".submenu");
        const toggle = button.querySelector(".menu-toggle");
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        section?.classList.toggle("expanded", !expanded);
        submenu?.classList.toggle("open", !expanded);
        if (toggle) toggle.textContent = expanded ? "+" : "−";
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
      if (["word", "excel", "text"].includes(type)) link.download = "";
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
})();

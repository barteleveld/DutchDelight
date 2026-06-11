const pathPrefix = location.pathname.includes("/opdrachten/") ? "../" : "";
const currentFile = location.pathname.split("/").pop() || "index.html";
const menu = document.querySelector(".assignment-menu");

const pages = [
  ["index.html", "Instructie"],
  ["opdrachten/opdracht-1.html", "1 Eerste opdracht"]
];

function rootHref(target) {
  return `${pathPrefix}${target}`;
}

function isActive(target) {
  if (currentFile === "index.html" && target === "index.html") return true;
  return target.endsWith(currentFile) && currentFile !== "index.html";
}

if (menu) {
  menu.innerHTML = pages.map(([target, label]) => {
    const active = isActive(target) ? " active" : "";
    return `<a class="menu-item${active}" href="${rootHref(target)}">${label}</a>`;
  }).join("");
}

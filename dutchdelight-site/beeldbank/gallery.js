const groups = Array.from(document.querySelectorAll(".collection-group"));
const filters = document.querySelector(".filters");
const viewer = document.querySelector(".viewer");
const photo = document.querySelector("#viewer-image");
const download = viewer.querySelector(".download-image");
let visibleImages = [];
let index = 0;
let opener;

filters.hidden = false;
filters.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  for (const option of filters.querySelectorAll("button")) {
    option.setAttribute("aria-pressed", String(option === button));
  }
  for (const group of groups) {
    group.hidden = button.dataset.filter !== "all" && button.dataset.filter !== group.dataset.category;
  }
});

function displayImage(position) {
  index = (position + visibleImages.length) % visibleImages.length;
  const selected = visibleImages[index];
  const title = selected.querySelector("strong").textContent;
  const format = selected.querySelector("small").textContent;
  photo.src = selected.href;
  photo.alt = title;
  photo.parentElement.classList.toggle("on-dark", selected.classList.contains("on-dark"));
  download.href = selected.href;
  viewer.querySelector("#viewer-title").textContent = title;
  viewer.querySelector("#viewer-count").textContent = (index + 1) + " van " + visibleImages.length + " · " + format;
}

document.querySelector(".catalogue").addEventListener("click", event => {
  const link = event.target.closest(".thumbnail");
  if (!link || typeof viewer.showModal !== "function" || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  opener = link;
  visibleImages = Array.from(document.querySelectorAll(".collection-group:not([hidden]) .thumbnail"));
  displayImage(visibleImages.indexOf(link));
  viewer.showModal();
});
viewer.querySelector("#viewer-prev").addEventListener("click", () => displayImage(index - 1));
viewer.querySelector("#viewer-next").addEventListener("click", () => displayImage(index + 1));
viewer.querySelector("#viewer-close").addEventListener("click", () => viewer.close());
viewer.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    displayImage(index + (event.key === "ArrowRight" ? 1 : -1));
  }
});
viewer.addEventListener("click", event => {
  if (event.target !== viewer) return;
  const rect = viewer.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX >= rect.right || event.clientY < rect.top || event.clientY >= rect.bottom) viewer.close();
});
viewer.addEventListener("close", () => opener?.focus({preventScroll: true}));

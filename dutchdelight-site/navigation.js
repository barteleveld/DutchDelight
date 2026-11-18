const menu = document.querySelector(".more");

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.open) {
    menu.open = false;
    menu.querySelector("summary").focus();
  }
});

document.addEventListener("click", (event) => {
  if (!menu.contains(event.target)) menu.open = false;
});

menu.addEventListener("focusout", (event) => {
  if (!menu.contains(event.relatedTarget)) menu.open = false;
});

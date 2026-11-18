const copyButton = document.querySelector(".copy-contact");
const copyStatus = document.querySelector(".copy-status");
const directory = document.querySelector(".directory");

if (navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    const lines = Array.from(directory.children, row => {
      const label = row.querySelector("dt").innerText;
      const value = row.querySelector("dd").innerText;
      return label + "\n" + value;
    });
    try {
      await navigator.clipboard.writeText(lines.join("\n\n"));
      copyStatus.textContent = "Contactgegevens gekopieerd.";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(directory);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = "De gegevens zijn geselecteerd. Kies Kopiëren om ze over te nemen.";
    }
  });
}

const form = document.querySelector(".write-us form");
form.addEventListener("submit", event => {
  event.preventDefault();
  const values = new FormData(form);
  const subject = "Contact DutchDelight | " + values.get("merk");
  const lines = [
    values.get("bericht"), "", values.get("naam"), values.get("bedrijf"),
    values.get("email"), values.get("land")
  ];
  const body = lines.filter((value, index) => index === 1 || value).join("\r\n");
  window.location.href = form.action + "?subject=" + encodeURIComponent(subject)
    + "&body=" + encodeURIComponent(body);
});

const choiceMessage = document.querySelector("#choice-message");
const examChoiceButtons = document.querySelectorAll("[data-exam-choice]");

const examVersions = {
  "b1-k1-a": { status: "Niet beschikbaar", route: "" },
  "b1-k1-b": { status: "Beschikbaar", route: "b1-k1-customer-journey/index.html" },
  "b1-k1-c": { status: "Niet beschikbaar", route: "" },
  "b1-k2-a": { status: "Niet beschikbaar", route: "" },
  "b1-k2-b": { status: "Beschikbaar", route: "b1-k2-marketing-communicatie/index.html" },
  "b1-k2-c": { status: "Niet beschikbaar", route: "" },
  "p4-k1-a": { status: "Beschikbaar", route: "p4-k1-accountmanagement/index.html" },
  "p4-k1-b": { status: "Niet beschikbaar", route: "" },
  "p4-k1-c": { status: "Niet beschikbaar", route: "" },
  "p4-k2-a": { status: "Niet beschikbaar", route: "" },
  "p4-k2-b": { status: "Niet beschikbaar", route: "" },
  "p4-k2-c": { status: "In ontwikkeling", route: "p4-k2-verkooptraject/index.html" }
};

examChoiceButtons.forEach((button) => {
  const version = examVersions[button.dataset.examChoice];
  if (!version?.route) {
    button.setAttribute("aria-disabled", "true");
  }

  button.addEventListener("click", () => {
    const selected = examVersions[button.dataset.examChoice];
    if (selected?.route) {
      window.location.href = selected.route;
      return;
    }

    if (choiceMessage) {
      const versionName = button.querySelector("strong")?.textContent || "Deze versie";
      choiceMessage.querySelector("h2").textContent = `${versionName} is nog niet beschikbaar`;
      choiceMessage.hidden = false;
      choiceMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
});

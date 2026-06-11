const choiceMessage = document.querySelector("#choice-message");
const examChoiceButtons = document.querySelectorAll("[data-exam-choice]");
const examRoutes = {"b1-k1": "b1-k1-customer-journey/index.html", "b1-k2": "b1-k2-marketing-communicatie/index.html", "p4-k1": "p4-k1-accountmanagement/index.html", "p4-k2": "p4-k2-verkooptraject/index.html"};
examChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const route = examRoutes[button.dataset.examChoice];
    if (route) { window.location.href = route; return; }
    if (choiceMessage) {
      const taskName = button.querySelector("span")?.textContent || "Deze kerntaak";
      choiceMessage.querySelector("h2").textContent = `${taskName} is nog niet beschikbaar`;
      choiceMessage.hidden = false;
      choiceMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
});
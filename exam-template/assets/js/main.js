const menuGroups = [{target: "index.html", label: "Instructie"}, {label: "1 Klantgesprek", children: [{target: "opdrachten/opdracht-1.html", label: "1.1 Bereid een klantgesprek voor"}]}];
const downloadsByFile = {"opdracht-1.html": {bijlagen: [], formats: [["downloads/formats/Gespreksnotitie.txt", "Gespreksnotitie", "text"]]}};

window.examConfig = {
  "title": "Examenbasis",
  "subject": "Junior Accountmanager",
  "version": "Voorbeeldversie",
  "brand": "",
  menuGroups,
  downloadsByFile
};

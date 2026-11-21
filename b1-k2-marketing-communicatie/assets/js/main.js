const menuGroups = [
  { target: "index.html", label: "Instructie" },
  {
    label: "1 Voorbereiden communicatie-uiting",
    children: [
      { target: "opdrachten/opdracht-1-1.html", label: "1.1 Verwerken en verzamelen van informatie" },
      { target: "opdrachten/opdracht-1-2.html", label: "1.2 Verwerken feedback" }
    ]
  },
  { target: "opdrachten/opdracht-2.html", label: "2 Ontwikkelen communicatie-uiting" },
  {
    label: "3 Uitvoeren webcare",
    children: [
      { target: "opdrachten/opdracht-3-1.html", label: "3.1 Volgen van berichten en reageren op berichten" },
      { target: "opdrachten/opdracht-3-2.html", label: "3.2 Evalueren uitgevoerde webcare" }
    ]
  }
];

const downloadsByFile = {
  "opdracht-1-1.html": {
    bijlagen: [
      ["downloads/Bijlage 1 E-mail van Sanne Vermeer.pdf", "Bijlage 1 E-mail van Sanne Vermeer", "pdf"],
      ["downloads/Bijlage 2 Conclusies voorbereiden communicatie-uiting.docx", "Bijlage 2 Conclusies voorbereiden communicatie-uiting", "word"]
    ],
    formats: []
  },
  "opdracht-2.html": {
    bijlagen: [["downloads/Bijlage 3 Briefing digitale flyer Pulse.pdf", "Bijlage 3 Briefing digitale flyer Pulse", "pdf"]],
    formats: []
  },
  "opdracht-3-1.html": {
    bijlagen: [
      ["downloads/Bijlage 4 Retourvoorwaarden zakelijke klanten DutchDelight Chocolates.pdf", "Bijlage 4 Retourvoorwaarden zakelijke klanten DutchDelight Chocolates", "pdf"],
      ["downloads/Bijlage 5 Online berichten DutchDelight Chocolates.pdf", "Bijlage 5 Online berichten DutchDelight Chocolates", "pdf"]
    ],
    formats: [["downloads/Format notitie.docx", "Format notitie", "word"]]
  },
  "opdracht-3-2.html": {
    bijlagen: [["downloads/Bijlage 6 Rapportage webcare DutchDelight Chocolates.xlsx", "Bijlage 6 Rapportage webcare DutchDelight Chocolates", "excel"]],
    formats: [["downloads/Format notitie.docx", "Format notitie", "word"]]
  }
};

window.examConfig = {
  "title": "Proefexamen B1-K2",
  "subject": "Marketing en communicatie",
  "version": "Versie B",
  "brand": "Pulse",
  menuGroups,
  downloadsByFile
};

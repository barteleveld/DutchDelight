const menuGroups = [
  { target: "index.html", label: "Instructie" },
  { target: "opdrachten/opdracht-1.html", label: "1 Marktpositie" },
  { target: "opdrachten/opdracht-2.html", label: "2 Customer journey" },
  {
    label: "3 Trends en ontwikkelingen",
    children: [
      { target: "opdrachten/opdracht-3-1.html", label: "3.1 Vertalen trends en ontwikkelingen" },
      { target: "opdrachten/opdracht-3-2.html", label: "3.2 Feedback verwerken" }
    ]
  },
  { target: "opdrachten/opdracht-4.html", label: "4 Commercieel aanbod" },
  {
    label: "5 Verbetervoorstel",
    children: [
      { target: "opdrachten/opdracht-5-1.html", label: "5.1 Opstellen verbetervoorstel" },
      { target: "opdrachten/opdracht-5-2.html", label: "5.2 Feedback verwerken" }
    ]
  }
];

const downloadsByFile = {
  "opdracht-1.html": {
    bijlagen: [
      ["downloads/bijlagen/Bijlage 1 Resultaten enquete zakelijke afnemers Pulse.pdf", "Bijlage 1 Resultaten enquête zakelijke afnemers Pulse", "pdf"],
      ["downloads/bijlagen/Bijlage 2 Aanbod concurrenten energieke snacks.pdf", "Bijlage 2 Aanbod concurrenten energieke snacks", "pdf"],
      ["downloads/bijlagen/Bijlage 3 Uitgangspunten DutchDelight Chocolates en Pulse.pdf", "Bijlage 3 Uitgangspunten DutchDelight Chocolates en Pulse", "pdf"]
    ],
    formats: [
      ["downloads/formats/Format notitie.docx", "Format notitie", "word"],
      ["downloads/formats/Format e-mail.docx", "Format e-mail", "word"]
    ]
  },
  "opdracht-2.html": {
    bijlagen: [["downloads/bijlagen/Bijlage 4 Klantreacties Pulse.xlsx", "Bijlage 4 Klantreacties Pulse", "excel"]],
    formats: [
      ["downloads/formats/Format notitie.docx", "Format notitie", "word"],
      ["downloads/formats/Format e-mail.docx", "Format e-mail", "word"]
    ]
  },
  "opdracht-3-1.html": {
    bijlagen: [],
    formats: [
      ["downloads/formats/Format notitie.docx", "Format notitie", "word"],
      ["downloads/formats/Format 5W+1H-vragen.docx", "Format 5W+1H-vragen", "word"],
      ["downloads/formats/Format e-mail.docx", "Format e-mail", "word"]
    ]
  },
  "opdracht-3-2.html": {
    bijlagen: [],
    formats: [["downloads/formats/Format 5W+1H-vragen.docx", "Format 5W+1H-vragen", "word"]]
  },
  "opdracht-4.html": {
    bijlagen: [],
    formats: [
      ["downloads/formats/Format notitie.docx", "Format notitie", "word"],
      ["downloads/formats/Format e-mail.docx", "Format e-mail", "word"]
    ]
  },
  "opdracht-5-1.html": {
    bijlagen: [["downloads/bijlagen/Bijlage 5 Bevindingen Pulse.pdf", "Bijlage 5 Bevindingen Pulse", "pdf"]],
    formats: [
      ["downloads/formats/Format verbetervoorstel.docx", "Format verbetervoorstel", "word"],
      ["downloads/formats/Format e-mail.docx", "Format e-mail", "word"]
    ]
  },
  "opdracht-5-2.html": {
    bijlagen: [],
    formats: [["downloads/formats/Format verbetervoorstel.docx", "Format verbetervoorstel", "word"]]
  }
};

window.examConfig = {
  title: "Proefexamen B1-K1",
  subject: "Onderzoekt de customer journey",
  version: "Versie B",
  brand: "Pulse",
  menuGroups,
  downloadsByFile
};

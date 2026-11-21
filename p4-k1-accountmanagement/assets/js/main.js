const menuGroups = [
  { target: "index.html", label: "Instructie" },
  { target: "opdrachten/opdracht-1.html", label: "1 Accountprofiel en accountanalyse" },
  { target: "opdrachten/opdracht-2.html", label: "2 Accountstrategie en marketingmix voor het account" },
  { target: "opdrachten/opdracht-3.html", label: "3 Actieplan" },
  { target: "opdrachten/opdracht-4.html", label: "4 Evalueren accountplan" },
  { target: "opdrachten/opdracht-5.html", label: "5 Netwerken" }
];

const downloadsByFile = {
  "opdracht-1.html": {
    bijlagen: [
      ["downloads/Bijlage%201%20Informatie%20over%20DolceDistribuzione.docx", "Bijlage 1 Informatie over DolceDistribuzione", "word"],
      ["downloads/Bijlage%202%20Accountplan%20DolceDistribuzione.docx", "Bijlage 2 Accountplan DolceDistribuzione", "word"]
    ],
    formats: []
  },
  "opdracht-2.html": {
    bijlagen: [["downloads/Bijlage%203%20Verkoopdoelen%20DutchDelight%20Chocolates.docx", "Bijlage 3 Verkoopdoelen DutchDelight Chocolates", "word"]],
    formats: [["downloads/Format%20e-mail.docx", "Format e-mail", "word"]]
  },
  "opdracht-3.html": {
    bijlagen: [
      ["downloads/Bijlage%204%20Organogram%20DutchDelight%20Chocolates.pdf", "Bijlage 4 Organogram DutchDelight Chocolates", "pdf"],
      ["downloads/Bijlage%205%20E-mail%20van%20collega%20over%20verkoopondersteuning.pdf", "Bijlage 5 E-mail van collega over verkoopondersteuning", "pdf"]
    ],
    formats: [
      ["downloads/Format%20actieplan.docx", "Format actieplan", "word"],
      ["downloads/Format%20e-mail.docx", "Format e-mail", "word"]
    ]
  },
  "opdracht-4.html": {
    bijlagen: [
      ["downloads/Bijlage%206%20E-mail%20van%20sales%20support.pdf", "Bijlage 6 E-mail van sales support", "pdf"],
      ["downloads/Bijlage%207%20Verslag%20evaluatiegesprek%20met%20account%20DolceDistribuzione.pdf", "Bijlage 7 Verslag evaluatiegesprek met account DolceDistribuzione", "pdf"]
    ],
    formats: [["downloads/Format%20e-mail.docx", "Format e-mail", "word"]]
  },
  "opdracht-5.html": {
    bijlagen: [["downloads/Bijlage%208%20Informatie%20over%20Noire%20Signature%20Bars.pdf", "Bijlage 8 Informatie over Noire Signature Bars", "pdf"]],
    formats: [["downloads/Format%20LinkedIn.docx", "Format LinkedIn", "word"]]
  }
};

window.examConfig = {
  title: "Proefexamen P4-K1",
  subject: "Accountmanagement",
  version: "Versie A",
  brand: "Noire",
  menuGroups,
  downloadsByFile
};

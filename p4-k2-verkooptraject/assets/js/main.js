const menuGroups = [
  { target: "index.html", label: "Instructie" },
  { target: "opdrachten/opdracht-1.html", label: "1 Voorbereiding commercieel traject" },
  { target: "opdrachten/opdracht-2.html", label: "2 Klantgesprek" },
  { target: "opdrachten/opdracht-3.html", label: "3 Offertetraject" },
  {
    label: "4 Ordertraject",
    children: [
      { target: "opdrachten/opdracht-4-1.html", label: "4.1 Verzorgen ordertraject" },
      { target: "opdrachten/opdracht-4-2.html", label: "4.2 Bewaken ordertraject" }
    ]
  },
  {
    label: "5 Aftersales",
    children: [
      { target: "opdrachten/opdracht-5-1.html", label: "5.1 Onderzoeken klanttevredenheid" },
      { target: "opdrachten/opdracht-5-2.html", label: "5.2 Opstellen verbetervoorstel" }
    ]
  }
];

const downloadsByFile = {
  "opdracht-1.html": {
    bijlagen: [["downloads/bijlagen/Bijlage 1 CRM-systeem TrueCacao.xlsx", "Bijlage 1 CRM-systeem TrueCacao", "excel"]],
    formats: []
  },
  "opdracht-2.html": {
    bijlagen: [["downloads/bijlagen/Bijlage 1 CRM-systeem TrueCacao.xlsx", "Bijlage 1 CRM-systeem TrueCacao", "excel"]],
    formats: []
  },
  "opdracht-3.html": {
    bijlagen: [["downloads/bijlagen/Bijlage 1 CRM-systeem TrueCacao.xlsx", "Bijlage 1 CRM-systeem TrueCacao", "excel"]],
    formats: [["downloads/formats/Format offerte.docx", "Format offerte", "word"]]
  },
  "opdracht-4-1.html": {
    bijlagen: [["downloads/bijlagen/Bijlage 1 CRM-systeem TrueCacao.xlsx", "Bijlage 1 CRM-systeem TrueCacao", "excel"]],
    formats: [["downloads/formats/Format orderbevestiging.docx", "Format orderbevestiging", "word"]]
  },
  "opdracht-4-2.html": {
    bijlagen: [["downloads/bijlagen/Bijlage 1 CRM-systeem TrueCacao.xlsx", "Bijlage 1 CRM-systeem TrueCacao", "excel"]],
    formats: [["downloads/formats/Format e-mail.docx", "Format e-mail", "word"]]
  },
  "opdracht-5-1.html": {
    bijlagen: [],
    formats: [["downloads/formats/Format e-mail.docx", "Format e-mail", "word"]]
  },
  "opdracht-5-2.html": {
    bijlagen: [["downloads/bijlagen/Bijlage 2 Klanttevredenheidsonderzoek TrueCacao.pdf", "Bijlage 2 Klanttevredenheidsonderzoek TrueCacao", "pdf"]],
    formats: [["downloads/formats/Format e-mail.docx", "Format e-mail", "word"]]
  }
};

window.examConfig = {
  title: "Proefexamen P4-K2",
  subject: "Verkooptraject",
  version: "Versie C",
  brand: "TrueCacao",
  menuGroups,
  downloadsByFile
};

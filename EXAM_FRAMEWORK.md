# Schaalbaar Examenraamwerk

Dit raamwerk is de standaard voor alle nieuwe proefexamens binnen dit project.

## Doel

Elk proefexamen moet zelfstandig te openen zijn, maar wel dezelfde DutchDelight-casuswereld, navigatie, visuele stijl en bestandslogica gebruiken.

## Standaard Mapstructuur

Gebruik voor nieuwe examens deze structuur:

```text
examencode-korte-naam/
  index.html
  opdrachten/
    opdracht-1.html
    opdracht-2.html
  downloads/
    bijlagen/
    formats/
  assets/
    css/
      styles.css
    js/
      main.js
  README.md
```

## Pagina-opbouw

Elke examenmap bevat:

- `index.html`: instructie en overzicht.
- `opdrachten/`: één HTML-bestand per opdracht of subopdracht.
- `downloads/bijlagen/`: casusbijlagen voor studenten.
- `downloads/formats/`: invulformats voor studenten.
- `assets/css/styles.css`: examenstijl.
- `assets/js/main.js`: navigatie, breadcrumbs en downloadpanelen.

## Navigatie

De examens gebruiken dezelfde platformlogica:

- bovenbalk met student, mboRijnland en uitloggen;
- topmenu met DutchDelight-logo;
- tabs `Examenvoorbereiding` en `Examenopdrachten`;
- rechts `Terug naar startmenu`;
- linker opdrachtmenu;
- downloads bij de relevante opdracht.

## Naamgeving

- Titelvorm: `Proefexamen SPL B1-K2`, `Proefexamen SPL P4-K1`, enzovoort.
- Geen oude labels zoals `JAM EP9`, `EP1 1A1` of `Oefenexamen` in de zichtbare studentomgeving.
- Gebruik duidelijke mapnamen, bijvoorbeeld `p4-k1-accountmanagement`.
- Bestandsnamen van bijlagen blijven studentvriendelijk: `Bijlage 1 ...`, `Format ...`.

## Inhoudelijke Opbouw Per Opdracht

Gebruik deze volgorde:

1. Titel en tijdsindicatie.
2. Situatie.
3. Opdracht.
4. Uitwerking in concrete stappen.
5. Resultaat.
6. Bijlagen en formats.

## Kwaliteitscontrole

Controleer bij elke wijziging:

- startmenu opent het juiste examen;
- topmenu-links werken;
- DutchDelight-logo komt uit de centrale assetmap;
- bijlagen/formats bestaan en linken goed;
- geen oude casustermen of oude merknamen;
- geen mojibake zoals `Ã`, `â`, `Â`;
- titel en H1 zijn consequent;
- de examenmap kan zelfstandig lokaal geopend worden.

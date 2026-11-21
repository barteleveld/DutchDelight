# Gedeelde examenbasis

Open index.html voor een werkend voorbeeld met instructie, uitklapbaar opdrachtmenu en een downloadbaar notitieformat. Lokaal openen en GitHub Pages worden beide ondersteund. Dit voorbeeld telt niet mee als examenversie.

## Een versie maken

1. Kopieer exam-template naar de geplande examenmap uit VERSIES.md, naast examenbasis en dutchdelight-site. De gedeelde bestanden niet kopiëren. Vul de interne WERKKAART.md in.
2. Stel titel, vakgebied, versie, merk, menuGroups en downloadsByFile in bij assets/js/main.js. De tab Examenopdrachten opent index.html: de instructie, ook het eerste item in menuGroups. Menudoelen zijn relatief aan de examenmap. Gebruik permanente, unieke bestandsnamen.
3. Bewerk de instructie en kopieer de voorbeeldopdracht voor de vereiste opdrachten. Pas per pagina de browsertitel, broodkruimels, eventuele fallbacklinks en artikeltekst aan. Zet echte bijlagen en formats in de eigen examenmap en vervang het voorbeeldformat.
4. Test vanaf de kiezer en via een rechtstreeks geopende opdracht op desktop en mobiel. Test per opdracht menu, download en terugweg. Publiceer alleen de afgesproken versie.

## Onderhoud

Opmaak staat in ../examenbasis/examen.css. Navigatie, mobiele menuknop en downloadpanelen staan in ../examenbasis/examen.js. De examenconfiguratie moet vóór het gedeelde script laden. Gedeelde wijzigingen raken alle aangesloten versies; controleer ook versies met andere downloadpaden. De centrale bedrijfslogo's en foto's blijven in dutchdelight-site/assets.

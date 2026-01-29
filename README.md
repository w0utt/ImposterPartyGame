# ImposterPartyGame

Een interactief party game waar één speler de Imposter is. Het spel heeft twee modi:
- **Categorie & persoon**: Iedereen krijgt een bekend woord/persoon, één iemand is Imposter en kent het woord niet
- **Vraag & antwoord**: Iedereen krijgt dezelfde vraag, maar de Imposter krijgt een andere vraag

## Project Structuur

```
ImposterPartyGame/
├── index.html          # Hoofd HTML bestand
├── css/
│   └── styles.css      # Alle styling
├── js/
│   └── game.js         # Game logica en event handlers
├── data/
│   └── config.js       # Game configuratie (categorieën, woorden, vragen)
└── README.md
```

## Bestanden Uitleg

- **index.html**: De hoofd HTML structuur van de applicatie
- **css/styles.css**: Alle CSS styling inclusief dark mode, responsive design, en animaties
- **js/game.js**: JavaScript voor game flow, speler management, en UI interacties
- **data/config.js**: Configuratie data inclusief:
  - Categorieën en woorden voor de "Categorie & persoon" modus
  - Vragen voor de "Vraag & antwoord" modus

## Hoe te Gebruiken

1. Open `index.html` in een browser
2. Kies een game modus
3. Voer het aantal spelers in en optioneel hun namen
4. Klik op "Start ronde"
5. Geef de telefoon door aan elke speler om hun rol te zien
6. De Imposter krijgt geen woord (in modus 1) of een andere vraag (in modus 2)

## Aanpassen

### Nieuwe categorieën of woorden toevoegen
Bewerk `data/config.js` en voeg items toe aan het `GAME_CONFIG.categories` array.

### Nieuwe vragen toevoegen
Bewerk `data/config.js` en voeg items toe aan het `GAME_CONFIG.prompts` array.

### Styling aanpassen
Bewerk `css/styles.css` om kleuren, lettertypen, of layout aan te passen.
# ImposterPartyGame

Een interactief party game waar één speler de Imposter is. Het spel heeft twee modi:
- **Categorie & persoon**: Iedereen krijgt een bekend woord/persoon, één iemand is Imposter en kent het woord niet
- **Vraag & antwoord**: Iedereen krijgt dezelfde vraag, maar de Imposter krijgt een andere vraag

## 🎮 Spel Modi

### Lokaal Spel (Één Apparaat)
Het originele spel waar je het apparaat doorgeeft aan elke speler. Geen setup vereist, werkt direct!

### Online Multiplayer (Meerdere Apparaten)
Nieuw! Speel nu met meerdere apparaten, Kahoot-stijl:
- **Host** maakt een kamer en krijgt een 6-cijferige code
- **Spelers** joinen met hun naam en de code
- Iedereen ziet op hun eigen apparaat hun rol
- Vereist Firebase configuratie (zie [MULTIPLAYER_SETUP.md](MULTIPLAYER_SETUP.md))

## Project Structuur

```
ImposterPartyGame/
├── index.html              # Hoofd HTML bestand
├── css/
│   └── styles.css          # Alle styling
├── js/
│   ├── game.js             # Game logica en event handlers
│   └── multiplayer.js      # Multiplayer functionaliteit (nieuw!)
├── data/
│   └── config.js           # Game configuratie (categorieën, woorden, vragen)
├── README.md               # Deze file
└── MULTIPLAYER_SETUP.md    # Multiplayer configuratie handleiding
```

## Bestanden Uitleg

- **index.html**: De hoofd HTML structuur van de applicatie met multiplayer UI
- **css/styles.css**: Alle CSS styling inclusief dark mode, responsive design, en animaties
- **js/game.js**: JavaScript voor game flow, speler management, en UI interacties
- **js/multiplayer.js**: Multiplayer functionaliteit met Firebase Realtime Database
- **data/config.js**: Configuratie data inclusief:
  - Categorieën en woorden voor de "Categorie & persoon" modus
  - Vragen voor de "Vraag & antwoord" modus

## Hoe te Gebruiken

### Lokaal Spel
1. Open `index.html` in een browser
2. Klik op "Lokaal spel (één apparaat)"
3. Kies een game modus
4. Voer het aantal spelers in en optioneel hun namen
5. Klik op "Start ronde"
6. Geef de telefoon door aan elke speler om hun rol te zien
7. De Imposter krijgt geen woord (in modus 1) of een andere vraag (in modus 2)

### Online Multiplayer
Zie [MULTIPLAYER_SETUP.md](MULTIPLAYER_SETUP.md) voor volledige setup instructies.

**Kort overzicht:**
1. Configureer Firebase Realtime Database (eenmalig)
2. Host maakt een kamer en deelt de 6-cijferige code
3. Spelers joinen met de code
4. Host start het spel wanneer iedereen er is

## Aanpassen

### Nieuwe categorieën of woorden toevoegen
Bewerk `data/config.js` en voeg items toe aan het `GAME_CONFIG.categories` array.

### Nieuwe vragen toevoegen
Bewerk `data/config.js` en voeg items toe aan het `GAME_CONFIG.prompts` array.

### Styling aanpassen
Bewerk `css/styles.css` om kleuren, lettertypen, of layout aan te passen.

## Features

✅ Twee spel modi (Categorie & Vraag)  
✅ Lokaal spel op één apparaat  
✅ Online multiplayer met room codes  
✅ Responsive design voor mobiel en desktop  
✅ Dark mode interface  
✅ Geen installatie vereist  
✅ Werkt op GitHub Pages  

## Technologie

- Vanilla JavaScript (geen frameworks)
- Firebase Realtime Database voor multiplayer
- CSS3 met moderne features
- Mobile-first responsive design
# Multiplayer Setup Guide

Het Imposter Game ondersteunt nu multiplayer met room codes! Spelers kunnen via verschillende apparaten spelen met een Kahoot-achtige ervaring.

## Hoe het werkt

### Voor Lokaal Spel (Geen Setup Vereist)
- Klik op "Lokaal spel (één apparaat)"
- Voer spelers in en geef het apparaat door zoals voorheen

### Voor Online Multiplayer (Firebase Vereist)

#### Stap 1: Firebase Project Aanmaken
1. Ga naar [Firebase Console](https://console.firebase.google.com/)
2. Klik op "Add project" en volg de stappen
3. Geef je project een naam (bijv. "imposter-game")
4. Schakel Google Analytics uit (optioneel)

#### Stap 2: Realtime Database Aanmaken
1. In je Firebase project, ga naar "Build" → "Realtime Database"
2. Klik op "Create Database"
3. Kies een locatie (bijv. europe-west1)
4. Start in "test mode" (voor ontwikkeling)
5. Let op: Voor productie gebruik, pas de security rules aan:
```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["createdAt"]
      }
    }
  }
}
```

#### Stap 3: Firebase Config Ophalen
1. Ga naar Project Settings (tandwiel icoon)
2. Scroll naar beneden naar "Your apps"
3. Klik op het web icoon (</>)
4. Geef je app een naam
5. Kopieer de `firebaseConfig` object

#### Stap 4: Config Toevoegen aan de Code
1. Open `js/multiplayer.js`
2. Vervang de `firebaseConfig` aan het begin van het bestand met jouw config:
```javascript
const firebaseConfig = {
  apiKey: "jouw-api-key",
  authDomain: "jouw-project.firebaseapp.com",
  databaseURL: "https://jouw-project-default-rtdb.firebaseio.com",
  projectId: "jouw-project",
  storageBucket: "jouw-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

#### Stap 5: Deployen naar GitHub Pages
1. Commit je wijzigingen
2. Push naar GitHub
3. Ga naar repository Settings → Pages
4. Selecteer de branch en map
5. Sla op en wacht tot de site is gedeployed

## Multiplayer Gebruiken

### Als Host:
1. Klik op "Host online spel"
2. Vul je naam in
3. Klik op "Maak kamer aan"
4. Deel de 6-cijferige code met andere spelers
5. Wacht tot spelers joinen
6. Klik op "Start spel" wanneer iedereen er is

### Als Speler:
1. Klik op "Join online spel"
2. Vul je naam in
3. Vul de 6-cijferige code in die je van de host kreeg
4. Klik op "Join kamer"
5. Wacht tot de host het spel start

## Troubleshooting

### "Firebase is not defined" error
- Controleer of je de Firebase SDK correct hebt toegevoegd in index.html
- Zorg dat je internet hebt en dat de Firebase CDN niet geblokkeerd is

### "Kamer niet gevonden" error
- Controleer of de room code correct is (6 karakters)
- Zorg dat de host de kamer heeft aangemaakt voordat je probeert te joinen
- Rooms worden automatisch verwijderd na 24 uur inactiviteit

### Spelers kunnen niet joinen
- Controleer je Firebase Realtime Database rules
- Zorg dat "read" en "write" op true staan voor /rooms

## Beveiliging

Voor een productie deployment:
1. Gebruik Firebase Security Rules om te voorkomen dat onbevoegde gebruikers data kunnen wijzigen
2. Implementeer rate limiting
3. Voeg authenticatie toe indien gewenst
4. Monitor je Firebase usage in de Firebase Console

## Kosten

Firebase heeft een gratis tier (Spark plan) dat voldoende is voor kleine tot middelgrote groepen:
- 1 GB storage
- 10 GB/maand data transfer
- 100 gelijktijdige verbindingen

Voor grotere groepen, bekijk de Firebase pricing op https://firebase.google.com/pricing

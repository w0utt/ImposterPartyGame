export const MODES = {
  CATEGORIES: "categories",
  PROMPT: "prompt"
};

export const GAME_CONFIG = {
  categories: [
    {
      naam: "Beroemde voetballer",
      woorden: [
        "Lionel Messi","Cristiano Ronaldo","Kevin De Bruyne","Eden Hazard",
        "Romelu Lukaku","Thibaut Courtois","Kylian Mbappé","Neymar",
        "Erling Haaland","Robert Lewandowski","Harry Kane","Luka Modrić",
        "Karim Benzema","Mohamed Salah","Virgil van Dijk","Sadio Mané",
        "Antoine Griezmann","Jude Bellingham","Vinícius Júnior","Manuel Neuer",
        "Ronaldinho","Zinedine Zidane","Andrés Iniesta"
      ]
    },
    {
      naam: "Bekende Vlaming (BV)",
      woorden: [
        "Stromae","Koen Wauters","Niels Destadsbader","Gert Verhulst",
        "Marthe De Pillecyn","James Cooke","Dimitri Vegas","K3",
        "Willy Sommers","Erik Van Looy","Tom Waes","Jani Kazaltzis",
        "Andy Peelman","Philippe Geubels"
      ]
    }
    // 👉 rest categorieën exact zoals origineel
  ],

  prompts: [
    { publiek: "Wat vind jij het ergste insect?", imposter: "Welk insect zou je zijn als je er één kon zijn?" },
    { publiek: "Vanaf welke leeftijd kon jij met de fiets rijden?", imposter: "Kies een getal tussen 5 en 15." },
    { publiek: "Wat is het beste fastfood restaurant?", imposter: "Welk fastfood restaurant is het meest overrated?" }
    // 👉 rest prompts exact zoals origineel
  ]
};

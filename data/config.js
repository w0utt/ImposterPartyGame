const GAME_CONFIG = {
  categories: [
    {
      naam: "Beroemde voetballer",
      woorden: [
        "Lionel Messi",
        "Cristiano Ronaldo",
        "Kevin De Bruyne",
        "Eden Hazard",
        "Romelu Lukaku",
        "Thibaut Courtois",
        "Kylian Mbappé",
        "Neymar",
        "Erling Haaland",
        "Robert Lewandowski",
        "Harry Kane",
        "Luka Modrić",
        "Karim Benzema",
        "Mohamed Salah",
        "Virgil van Dijk",
        "Sadio Mané",
        "Antoine Griezmann",
        "Jude Bellingham",
        "Vinícius Júnior",
        "Manuel Neuer",
        "Ronaldinho",
        "Zinedine Zidane",
        "Andrés Iniesta"
      ]
    },
    {
      naam: "Bekende Vlaming (BV)",
      woorden: [
        "Stromae",
        "Koen Wauters",
        "Niels Destadsbader",
        "Gert Verhulst",
        "Marthe De Pillecyn",
        "James Cooke",
        "Dimitri Vegas",
        "K3",
        "Willy Sommers",
        "Erik Van Looy",
        "Tom Waes",
        "Jani Kazaltzis",
        "Andy Peelman",
        "Philippe Geubels"
      ]
    },
    {
      naam: "Internationale zanger of zangeres",
      woorden: [
        "Taylor Swift",
        "Ed Sheeran",
        "Beyoncé",
        "Adele",
        "The Weeknd",
        "Dua Lipa",
        "Billie Eilish",
        "Harry Styles",
        "Kanye West",
        "Bruno Mars",
        "Lady Gaga",
        "Rihanna",
        "Justin Bieber",
        "Sam Smith",
        "Ariana Grande",
        "Shakira",
        "Selena Gomez",
        "Olivia Rodrigo",
      ]
    },
    {
      naam: "Internationale acteur of actrice",
      woorden: [
        "Leonardo DiCaprio",
        "Tom Cruise",
        "Scarlett Johansson",
        "Ryan Reynolds",
        "Jennifer Lawrence",
        "Dwayne Johnson",
        "Zendaya",
        "Keanu Reeves"
      ]
    },
    {
      naam: "Bekende politicus",
      woorden: [
        "Alexander De Croo",
        "Bart De Wever",
        "Emmanuel Macron",
        "Angela Merkel",
        "Donald Trump",
        "Barack Obama",
        "Ursula von der Leyen",
        "Greta Thunberg",
        "Tom Van Grieken",
        "Joe Biden"
      ]
    },
    {
      naam: "Bekende YouTuber / creator",
      woorden: [
        "MrBeast",
        "PewDiePie",
        "Enzo Knol",
        "Kastiop",
        "Acid",
        "KSI",
        "Logan Paul",
        "Jake Paul"
      ]
    },
    {
      naam: "Land",
      woorden: [
        "België",
        "Nederland",
        "Frankrijk",
        "Duitsland",
        "Spanje",
        "Portugal",
        "Italië",
        "Zweden",
        "Noorwegen",
        "Finland",
        "Japan",
        "China",
        "Brazilië",
        "Argentinië",
        "Australië",
        "Canada",
        "Mexico",
        "Marokko",
        "Egypte",
        "India"
      ]
    },
    {
      naam: "Grote stad",
      woorden: [
        "Brussel",
        "Antwerpen",
        "Gent",
        "Amsterdam",
        "Rotterdam",
        "Parijs",
        "Londen",
        "Berlijn",
        "Madrid",
        "Barcelona",
        "New York",
        "Los Angeles",
        "Tokio",
        "Osaka",
        "Dubai",
        "Singapore",
        "Sydney",
        "Rio de Janeiro",
        "Kaapstad",
        "Istanbul"
      ]
    },
    {
      naam: "Bekende sporter (niet-voetbal)",
      woorden: [
        "Lewis Hamilton",
        "Max Verstappen",
        "Novak Djokovic",
        "Roger Federer",
        "Serena Williams",
        "Tiger Woods",
        "Michael Phelps",
        "Usain Bolt",
        "Conor McGregor"
      ]
    },
    {
      naam: "Bekend merk of bedrijf",
      woorden: [
        "Apple",
        "Google",
        "Tesla",
        "Mercedes-Benz",
        "BMW",
        "Coca-Cola",
        "McDonald's",
        "Nike",
        "Adidas",
        "Samsung",
        "Sony",
        "Red Bull"
      ]
    },
    {
      naam: "Fictief personage",
      woorden: [
        "Harry Potter",
        "Lord Voldemort",
        "Batman",
        "Joker",
        "Spider-Man",
        "Darth Vader",
        "Yoda",
        "Elsa",
        "Shrek",
        "Goku",
        "Iron Man",
        "Captain America",
        "Thor",
        "Hulk",
        "Hermione Granger",
        "Severus Snape",
        "Luke Skywalker",
        "SpongeBob SquarePants",
        "Homer Simpson",
        "Katniss Everdeen"
      ]
    },
    {
      naam: "Eten",
      woorden: [
        "Pizza",
        "Sushi",
        "Hamburger",
        "Frieten",
        "Lasagne",
        "Tacos",
        "Döner",
        "Loempia",
        "Pita",
        "Ravioli",
        "Croque monsieur",
        "Spaghetti",
        "Bami",
        "Curry",
        "Paella",
        "Falafel",
        "Burrito",
        "Ramen",
        "Kebab",
        "Wrap",
        "Chili con carne",
        "Focaccia",
        "Hotdog",
        "Quiche",
        "Baklava",
        "Gyoza",
        "Kip saté",
        "Moussaka",
        "Risotto",
        "Bruschetta",
        "Pancakes",
        "Waffles",
        "Tiramisu",
        "Macaroni",
        "Nachos",
      ]
    }
  ],

  prompts: [
    {
      publiek: "Welk insect haat je het meest?",
      imposter: "Welk insect zou je zijn als je er één kon zijn?"
    },
    {
      publiek: "Vanaf welke leeftijd kon jij met de fiets rijden?",
      imposter: "Kies een getal tussen 5 en 15."
    },
    {
      publiek: "Wat is het beste fastfood restaurant?",
      imposter: "Welk fastfood restaurant is het meest overrated?"
    },
    {
      publiek: "Wat is de beste vakantie die je ooit gehad hebt?",
      imposter: "Wat was je minst leuke vakantie ooit?"
    },
    {
      publiek: "Welke film kun je keer op keer opnieuw kijken?",
      imposter: "Welke film kun je niet meer opnieuw kijken?"
    },
    {
      publiek: "Wat is je favoriete snack van de frituur?",
      imposter: "Wat is de meest overrated snack in de frituur?"
    },
    {
      publiek: "In welke stad zou je het liefst wonen?",
      imposter: "Noem een stad waar je absoluut níet zou willen wonen."
    },
    {
      publiek: "Wat is een hobby die je leuk vindt of graag zou doen?",
      imposter: "Noem een hobby die totaal niet bij jou past."
    },
    {
      publiek: "Wat is je favoriete seizoen van het jaar?",
      imposter: "Wat is jouw minst favoriete seizoen van het jaar?"
    },
    {
      publiek: "Wat is je favoriete zoogdier?",
      imposter: "Welk zoogdier zou jij kunnen verslaan in een gevecht?"
    },
    {
      publiek: "Wat is je favoriete frisdrank?",
      imposter: "Welke frisdrank is het meest overrated?"
    },
    {
      publiek: "Wat is het leukste dat je ooit kocht?",
      imposter: "Noem iets dat je al lang wilt maar nog nooit gekocht hebt."
    },
    {
      publiek: "Wat is je favoriete broodbeleg?",
      imposter: "Noem broodbeleg dat je vroeger vaak at maar nu bijna nooit."
    },
    {
      publiek: "Wat is je favoriete dier in de zoo?",
      imposter: "Welk dier in de zoo is het engste?"
    },
    {
      publiek: "Wat is je favoriete tv-programma?",
      imposter: "Noem een tv-programma dat je bijna nooit kijkt."
    },
    {
      publiek: "Welke stad vind jij het mooist in Europa?",
      imposter: "Welke stad in Europa zou je niet willen bezoeken?"
    },
    {
      publiek: "Wat zou jij doen op een vrije zondag?",
      imposter: "Noem iets dat je nooit zou doen op zondag."
    },
    {
      publiek: "Welk land wil je ooit nog bezoeken?",
      imposter: "Noem een land waar je geen interesse in hebt."
    },
    {
      publiek: "Wat is volgens jou een van de mooiste talen?",
      imposter: "Noem een taal die je niet begrijpt."
    },
    {
      publiek: "Welke kleur vind jij het mooist?",
      imposter: "Noem een kleur die je nooit zou dragen."
    },
    {
      publiek: "Wat is je favoriete ijsje?",
      imposter: "Noem een ijssmaak dat je nooit neemt."
    },
    {
      publiek: "Welke sport zou je professioneel willen uitoefenen als je mocht kiezen?",
      imposter: "Wat is de domste sport die je kent?"
    },
    {
      publiek: "Wat is je lievelingseten als kind?",
      imposter: "Noem iets dat je vaak at als kind, maar nu niet meer."
    },
    {
      publiek: "Welke muziek luister je het vaakst?",
      imposter: "Noem een muziekgenre dat je nooit luistert."
    },
    {
      publiek: "Wat is je favoriete vakantieland?",
      imposter: "Welk land zou je nog eens willen bezichtigen van de landen die je al hebt bezichtigd?"
    },
    {
      publiek: "Wat is een talent dat je hebt?",
      imposter: "Noem een talent dat niemand bij jou verwacht."
    },
    {
      publiek: "Wat is het leukste cadeau dat je ooit kreeg?",
      imposter: "Noem iets wat je graag zou krijgen maar nooit durft te vragen."
    },
    {
      publiek: "Welke acteur of actrice vind jij echt goed?",
      imposter: "Welke acteur of actrice is overrated?"
    },
    {
      publiek: "Wat is je favoriete kledingstuk?",
      imposter: "Noem een kledingstuk dat je vandaag niet draagt."
    },
    {
      publiek: "Wat zou voor jou de age of consent moeten zijn?",
      imposter: "Geef me een range tussen de 10 en de 25."
    },
    {
      publiek: "Welke app gebruik jij het meest op je telefoon, maar zou je minder moeten gebruiken?",
      imposter: "Welke app staat op je telefoon maar gebruik je nooit?"
    },
    {
      publiek: "Wat is jouw favoriete game?",
      imposter: "Welk spel heb je gekocht, maar amper gespeeld."
    },
    {
      publiek: "Welke voetballer is overrated?",
      imposter: "Wie is je favoriete voetbalspeler?"
    },
  {
    "publiek": "Welk insect zou je zijn als je er één kon zijn?",
    "imposter": "Welk insect haat je het meest?"
  },
  {
    "publiek": "Kies een getal tussen 5 en 15.",
    "imposter": "Vanaf welke leeftijd kon jij met de fiets rijden?"
  },
  {
    "publiek": "Welk fastfood restaurant is het meest overrated?",
    "imposter": "Wat is het beste fastfood restaurant?"
  },
  {
    "publiek": "Wat was je minst leuke vakantie ooit?",
    "imposter": "Wat is de beste vakantie die je ooit gehad hebt?"
  },
  {
    "publiek": "Welke film kun je niet meer opnieuw kijken?",
    "imposter": "Welke film kun je keer op keer opnieuw kijken?"
  },
  {
    "publiek": "Wat is de meest overrated snack in de frituur?",
    "imposter": "Wat is je favoriete snack van de frituur?"
  },
  {
    "publiek": "Noem een stad waar je absoluut níet zou willen wonen.",
    "imposter": "In welke stad zou je het liefst wonen?"
  },
  {
    "publiek": "Noem een hobby die totaal niet bij jou past.",
    "imposter": "Wat is een hobby die je leuk vindt of graag zou doen?"
  },
  {
    "publiek": "Wat is jouw minst favoriete seizoen van het jaar?",
    "imposter": "Wat is je favoriete seizoen van het jaar?"
  },
  {
    "publiek": "Welk zoogdier zou jij kunnen verslaan in een gevecht?",
    "imposter": "Wat is je favoriete zoogdier?"
  },
  {
    "publiek": "Welke frisdrank is het meest overrated?",
    "imposter": "Wat is je favoriete frisdrank?"
  },
  {
    "publiek": "Noem iets dat je al lang wilt maar nog nooit gekocht hebt.",
    "imposter": "Wat is het leukste dat je ooit kocht?"
  },
  {
    "publiek": "Noem broodbeleg dat je vroeger vaak at maar nu bijna nooit.",
    "imposter": "Wat is je favoriete broodbeleg?"
  },
  {
    "publiek": "Welk dier in de zoo is het engste?",
    "imposter": "Wat is je favoriete dier in de zoo?"
  },
  {
    "publiek": "Noem een tv-programma dat je bijna nooit kijkt.",
    "imposter": "Wat is je favoriete tv-programma?"
  },
  {
    "publiek": "Welke stad in Europa zou je niet willen bezoeken?",
    "imposter": "Welke stad vind jij het mooist in Europa?"
  },
  {
    "publiek": "Noem iets dat je nooit zou doen op zondag.",
    "imposter": "Wat zou jij doen op een vrije zondag?"
  },
  {
    "publiek": "Noem een land waar je geen interesse in hebt.",
    "imposter": "Welk land wil je ooit nog bezoeken?"
  },
  {
    "publiek": "Noem een taal die je niet begrijpt.",
    "imposter": "Wat is volgens jou een van de mooiste talen?"
  },
  {
    "publiek": "Noem een kleur die je nooit zou dragen.",
    "imposter": "Welke kleur vind jij het mooist?"
  },
  {
    "publiek": "Noem een ijssmaak dat je nooit neemt.",
    "imposter": "Wat is je favoriete ijsje?"
  },
  {
    "publiek": "Wat is de domste sport die je kent?",
    "imposter": "Welke sport zou je professioneel willen uitoefenen als je mocht kiezen?"
  },
  {
    "publiek": "Noem iets dat je vaak at als kind, maar nu niet meer.",
    "imposter": "Wat is je lievelingseten als kind?"
  },
  {
    "publiek": "Noem een muziekgenre dat je nooit luistert.",
    "imposter": "Welke muziek luister je het vaakst?"
  },
  {
    "publiek": "Welk land zou je nog eens willen bezichtigen van de landen die je al hebt bezichtigd?",
    "imposter": "Wat is je favoriete vakantieland?"
  },
  {
    "publiek": "Noem een talent dat niemand bij jou verwacht.",
    "imposter": "Wat is een talent dat je hebt?"
  },
  {
    "publiek": "Noem iets wat je graag zou krijgen maar nooit durft te vragen.",
    "imposter": "Wat is het leukste cadeau dat je ooit kreeg?"
  },
  {
    "publiek": "Welke acteur of actrice is overrated?",
    "imposter": "Welke acteur of actrice vind jij echt goed?"
  },
  {
    "publiek": "Noem een kledingstuk dat je vandaag niet draagt.",
    "imposter": "Wat is je favoriete kledingstuk?"
  },
  {
    "publiek": "Geef me een range tussen de 10 en de 25.",
    "imposter": "Wat zou voor jou de age of consent moeten zijn?"
  },
  {
    "publiek": "Welke app staat op je telefoon maar gebruik je nooit?",
    "imposter": "Welke app gebruik jij het meest op je telefoon, maar zou je minder moeten gebruiken?"
  },
  {
    "publiek": "Welk spel heb je gekocht, maar amper gespeeld.",
    "imposter": "Wat is jouw favoriete game?"
  },
  {
    "publiek": "Wie is je favoriete voetbalspeler?",
    "imposter": "Welke voetballer is overrated?"
  }
  ]
};

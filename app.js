const pulaPlanCatalog = {
  sun: {
    balanced: [
      {
        name: "Kultur, Eis & Meeresluft",
        distance: "5,8 km",
        budget: "€€",
        stops: [
          {
            time: "09:00",
            type: "GESCHICHTE",
            duration: "1 Std. 30 Min.",
            title: "Arena von Pula",
            description: "Gladiatoren-Geschichten für die Kinder, beeindruckende Architektur für euch – morgens noch angenehm ruhig.",
            meta: ["★ Familienliebling", "🎟 Eintritt", "☀ wenig Schatten"],
            scene: "#edc17d",
            icon: "🏛️",
            map: "Arena Pula"
          },
          {
            time: "10:45",
            type: "GENUSSPAUSE",
            duration: "45 Min.",
            title: "Eiszeit bei Aroma",
            description: "Hausgemachtes Gelato und ein schattiges Plätzchen. Unsere Wahl: Pistazie und istrische Feige.",
            meta: ["🍦 Kinderfreundlich", "€ günstig", "❄ schattig"],
            scene: "#f4ad8d",
            icon: "🍦",
            map: "Aroma Gelato Pula"
          },
          {
            time: "12:00",
            type: "MEER & PAUSE",
            duration: "3 Std.",
            title: "Bucht von Ambrela",
            description: "Klares, flaches Wasser und genug Schatten unter Pinien. Ideal für Picknick, Baden und eine lange Pause.",
            meta: ["♒ Flacher Einstieg", "🌲 Naturschatten", "🚗 12 Min."],
            scene: "#76c4bd",
            icon: "🏖️",
            map: "Ambrela Beach Pula"
          },
          {
            time: "17:30",
            type: "ALTSTADT",
            duration: "2 Std.",
            title: "Forum & Abendessen",
            description: "Durch die Gassen zum Augustus-Tempel schlendern und den Tag bei Pasta oder frischem Fisch ausklingen lassen.",
            meta: ["♿ Kinderwagen-tauglich", "🍝 Viele Optionen", "◒ Nähe zum Sonnenuntergang"],
            scene: "#df9a74",
            icon: "🍝",
            map: "Forum Pula"
          }
        ]
      },
      {
        name: "Unter Pula & über den Wellen",
        distance: "6,4 km",
        budget: "€€",
        stops: [
          {
            time: "09:15",
            type: "ABENTEUER",
            duration: "1 Std.",
            title: "Zerostrasse-Tunnel",
            description: "Ein kühles Abenteuer unter der Altstadt – perfekt, bevor die Straßen voller werden.",
            meta: ["❄ angenehm kühl", "🎟 Eintritt", "★ spannend"],
            scene: "#9bb2a4",
            icon: "🔦",
            map: "Zerostrasse Pula"
          },
          {
            time: "10:30",
            type: "AUSSICHT",
            duration: "1 Std.",
            title: "Kaštel von Pula",
            description: "Kurzer Aufstieg, große Aussicht: Von der Festung entdeckt ihr Dächer, Hafen und Arena.",
            meta: ["◉ Panoramablick", "☀ Sonnenhut", "📷 Fotostopp"],
            scene: "#efc679",
            icon: "🏰",
            map: "Pula Castle Kastel"
          },
          {
            time: "12:15",
            type: "MEER & PAUSE",
            duration: "3 Std.",
            title: "Hawaiian Beach",
            description: "Türkisblaues Wasser auf Verudela. Mit Badeschuhen, Snacks und viel Zeit wird es herrlich entspannt.",
            meta: ["🌊 klares Wasser", "👟 Badeschuhe", "🚗 13 Min."],
            scene: "#59b9c0",
            icon: "🤿",
            map: "Hawaiian Beach Verudela"
          },
          {
            time: "18:00",
            type: "ABEND",
            duration: "1 Std. 30 Min.",
            title: "Uljanik-Leuchtkräne",
            description: "Frühes Abendessen am Hafen und zum Abschluss die berühmten leuchtenden Kräne bestaunen.",
            meta: ["✨ nach Einbruch der Dunkelheit", "🍕 Familienlokale", "🚶 Promenade"],
            scene: "#465e78",
            icon: "✨",
            map: "Lighting Giants Pula"
          }
        ]
      }
    ],
    relaxed: [
      {
        name: "Langsam durch den Urlaub",
        distance: "3,2 km",
        budget: "€€",
        stops: [
          {
            time: "09:30",
            type: "MARKT",
            duration: "1 Std.",
            title: "Frühstück an der Tržnica",
            description: "Lokales Obst, Gebäck und Kaffee rund um Pulas historische Markthalle.",
            meta: ["🍉 Frisches Obst", "€ günstig", "♿ gut zugänglich"],
            scene: "#f0b66f",
            icon: "🥐",
            map: "Pula Market"
          },
          {
            time: "11:00",
            type: "ALTSTADT",
            duration: "1 Std. 30 Min.",
            title: "Gassen, Torbögen & Eis",
            description: "Ohne Eile durch den Sergierbogen zum Forum – mit spontanen Stopps, wann immer euch danach ist.",
            meta: ["🍦 Eispause", "📷 Fotostopps", "🚶 kurze Wege"],
            scene: "#e6b17f",
            icon: "📷",
            map: "Arch of the Sergii Pula"
          },
          {
            time: "13:00",
            type: "LANGE PAUSE",
            duration: "3 Std. 30 Min.",
            title: "Pinien & Meer am Saccorgiana",
            description: "Ein schattiger Platz für ein langes Picknick, Planschen und vielleicht sogar ein Nickerchen.",
            meta: ["🌲 viel Schatten", "🌊 Badebucht", "🧺 Picknick"],
            scene: "#6dc2ac",
            icon: "🌲",
            map: "Saccorgiana Cove Pula"
          }
        ]
      }
    ],
    active: [
      {
        name: "Pula für kleine Abenteurer",
        distance: "12,4 km",
        budget: "€€",
        stops: [
          {
            time: "08:30",
            type: "RADTOUR",
            duration: "1 Std. 30 Min.",
            title: "Küstenrunde nach Verudela",
            description: "Früh starten, Fahrräder leihen und mit Pausen entlang der grünen Küste radeln.",
            meta: ["🚲 Helme einpacken", "☀ früh starten", "💧 Wasser"],
            scene: "#93c88e",
            icon: "🚲",
            map: "Verudela Pula"
          },
          {
            time: "10:30",
            type: "TIERWELT",
            duration: "2 Std.",
            title: "Aquarium Pula",
            description: "Haie, Seepferdchen und die Schildkrötenstation in einer alten Festung entdecken.",
            meta: ["🐢 Kinderhighlight", "🎟 Eintritt", "❄ drinnen"],
            scene: "#65b9bb",
            icon: "🐢",
            map: "Aquarium Pula"
          },
          {
            time: "13:00",
            type: "BADEPAUSE",
            duration: "2 Std.",
            title: "Sprung ins Meer",
            description: "Direkt auf Verudela eine Badebucht suchen, Kräfte sammeln und im Schatten picknicken.",
            meta: ["🌊 Baden", "🧺 Picknick", "👟 Badeschuhe"],
            scene: "#54b8cf",
            icon: "🤿",
            map: "Hawaiian Beach Verudela"
          },
          {
            time: "16:00",
            type: "ENTDECKEN",
            duration: "1 Std.",
            title: "Zerostrasse",
            description: "Durch das kühle Tunnelsystem unter Pula laufen und verborgene Abzweigungen erkunden.",
            meta: ["🔦 spannend", "❄ kühl", "🎟 Eintritt"],
            scene: "#8fa59c",
            icon: "🗺️",
            map: "Zerostrasse Pula"
          },
          {
            time: "18:00",
            type: "FINALE",
            duration: "1 Std. 30 Min.",
            title: "Pizza nahe der Arena",
            description: "Hungrige Abenteurer bekommen Pizza und einen letzten Blick auf Pulas Wahrzeichen.",
            meta: ["🍕 Kinderliebling", "🏛 Arena-Blick", "€€"],
            scene: "#e58f69",
            icon: "🍕",
            map: "Pizza near Arena Pula"
          }
        ]
      }
    ]
  },
  rain: {
    balanced: [
      {
        name: "Pula, auch wenn es regnet",
        distance: "4,1 km",
        budget: "€€",
        stops: [
          {
            time: "09:30",
            type: "MEERESWELT",
            duration: "2 Std. 30 Min.",
            title: "Aquarium Pula",
            description: "In der alten Festung warten heimische Meeresbewohner und die beliebte Schildkrötenstation.",
            meta: ["☂ überwiegend drinnen", "🐢 Kinderhighlight", "🎟 Eintritt"],
            scene: "#65b9bb",
            icon: "🐠",
            map: "Aquarium Pula"
          },
          {
            time: "12:30",
            type: "MITTAGESSEN",
            duration: "1 Std. 30 Min.",
            title: "Warme Pasta in der Altstadt",
            description: "Trockene Füße, istrische Pasta und genug Zeit für eine gemütliche Familienpause.",
            meta: ["🍝 Kinderportionen", "☂ drinnen", "€€"],
            scene: "#e9a173",
            icon: "🍝",
            map: "Family restaurant Pula old town"
          },
          {
            time: "14:30",
            type: "UNTERIRDISCH",
            duration: "1 Std. 30 Min.",
            title: "Zerostrasse & Kaštel-Lift",
            description: "Unterirdisch durch Pula und direkt hinauf zur Festung – ein echtes Regenabenteuer.",
            meta: ["🔦 spannend", "☂ wetterfest", "🎟 Eintritt"],
            scene: "#859e97",
            icon: "🔦",
            map: "Zerostrasse Pula"
          },
          {
            time: "16:30",
            type: "SÜSSES FINALE",
            duration: "1 Std.",
            title: "Kakao & Kuchen",
            description: "Ein gemütliches Café am Forum ist der perfekte Abschluss für euren Regentag.",
            meta: ["☕ warm & trocken", "🍰 Kuchenauswahl", "🚶 zentral"],
            scene: "#c99075",
            icon: "☕",
            map: "Cafe Forum Pula"
          }
        ]
      }
    ]
  }
};

const regionalStop = (time, type, duration, title, description, meta, scene, icon, map) => ({
  time, type, duration, title, description, meta, scene, icon, map
});

const istriaDestinations = {
  pula: {
    name: "Pula",
    shortName: "Pula",
    coordinates: { latitude: 44.8666, longitude: 13.8496 }
  },
  rovinj: {
    name: "Rovinj",
    shortName: "Rovinj",
    coordinates: { latitude: 45.0812, longitude: 13.6387 },
    route: "Altstadtgassen & grünes Kap",
    budget: "€€",
    distances: { balanced: "5,2 km", relaxed: "3,1 km", active: "7,8 km" },
    stops: [
      regionalStop("09:00", "MEERESWELT", "1 Std.", "Aquarium Rovinj", "Ein kompakter Einstieg in die Tierwelt der Adria – ideal, bevor die Altstadt voller wird.", ["🐠 Kinderfreundlich", "🎟 saisonal", "❄ drinnen"], "#76c4bd", "🐠", "Rovinj Aquarium"),
      regionalStop("10:30", "ALTSTADT", "1 Std. 30 Min.", "Balbi-Bogen & Grisia-Gasse", "Durch das autofreie Gassengewirr hinaufspazieren, kleine Ateliers entdecken und am Hafen ein Eis holen.", ["🚶 steile Gassen", "🍦 Eispause", "📷 Fotostopps"], "#edc17d", "🎨", "Balbi's Arch Rovinj"),
      regionalStop("12:15", "AUSSICHT", "45 Min.", "Kirche der Hl. Euphemia", "Rovinjs Wahrzeichen mit weitem Blick über Dächer und Inseln. Der Glockenturm ist optional.", ["⛪ Kirche frei", "↟ viele Stufen", "☀ wenig Schatten"], "#e6b17f", "⛪", "Church of Saint Euphemia Rovinj"),
      regionalStop("14:00", "NATUR & BADEN", "3 Std.", "Zlatni Rt & Lone Bay", "Schattige Wege, Spielplätze und eine Badepause im Waldpark Goldene Kap.", ["🌲 viel Schatten", "🏖 Badebucht", "🧺 Picknick"], "#69b99a", "🌳", "Golden Cape Rovinj")
    ],
    rainStops: [
      regionalStop("09:30", "MEERESWELT", "1 Std.", "Aquarium Rovinj", "Adriatische Fische und Meerestiere in einem kleinen historischen Aquarium entdecken.", ["☂ drinnen", "🐠 Kinderfreundlich", "🎟 saisonal"], "#76c4bd", "🐠", "Rovinj Aquarium"),
      regionalStop("11:00", "KULTUR", "1 Std.", "Batana Eco-Museum", "Die Geschichte der traditionellen Holzboote und des Lebens am Meer kennenlernen.", ["☂ drinnen", "⚓ lokal", "🎟 Eintritt"], "#7ba9b8", "⛵", "Batana Eco-Museum Rovinj"),
      regionalStop("12:30", "GENUSS", "1 Std. 30 Min.", "Mittagspause am Hafen", "Unter Arkaden istrische Pasta essen und auf die nächste trockene Phase warten.", ["🍝 Familienlokale", "☂ überdacht", "€€"], "#e5af79", "🍝", "Rovinj harbour restaurants")
    ]
  },
  porec: {
    name: "Poreč",
    shortName: "Poreč",
    coordinates: { latitude: 45.2272, longitude: 13.5958 },
    route: "UNESCO-Mosaike & Höhlenluft",
    budget: "€€",
    distances: { balanced: "10,6 km", relaxed: "2,8 km", active: "13,4 km" },
    stops: [
      regionalStop("09:00", "UNESCO", "1 Std. 15 Min.", "Euphrasius-Basilika", "Früh die leuchtenden Mosaike und den historischen Komplex erkunden; sonntags geschlossen.", ["★ UNESCO", "🎟 Eintritt", "↟ Glockenturm"], "#d9b473", "✨", "Euphrasian Basilica Porec"),
      regionalStop("10:30", "ALTSTADT", "1 Std.", "Decumanus & Marafor", "Auf römischen Spuren zur Romanischen Hausfassade und weiter an die Uferpromenade.", ["🚶 kurze Wege", "🍦 Eispause", "♿ teils eben"], "#e8a875", "🏛️", "Marafor Square Porec"),
      regionalStop("12:30", "HÖHLENABENTEUER", "1 Std. 30 Min.", "Baredine-Höhle", "Eine geführte Tour durch Tropfsteinhallen bei konstant kühlen 14 Grad – leichte Jacke mitnehmen.", ["❄ 14 °C", "🎟 Führung", "🚗 15 Min."], "#8d9b91", "🦎", "Baredine Cave"),
      regionalStop("15:00", "BADEN", "2 Std. 30 Min.", "Brulo Beach", "Schattige, gut ausgestattete Familienbucht südlich der Altstadt.", ["🌲 Pinien", "🏖 flacher Zugang", "☕ Infrastruktur"], "#64b9bf", "🏖️", "Brulo Beach Porec")
    ],
    rainStops: [
      regionalStop("09:00", "UNESCO", "1 Std. 30 Min.", "Euphrasius-Basilika", "Mosaike, Sakristei und Museum bilden ein wetterfestes Kulturprogramm.", ["☂ überwiegend drinnen", "★ UNESCO", "🎟 Eintritt"], "#d9b473", "✨", "Euphrasian Basilica Porec"),
      regionalStop("11:00", "HÖHLE", "1 Std. 30 Min.", "Baredine-Höhle", "Unter der Erde bleibt das Wetter draußen – feste Schuhe und eine leichte Jacke einpacken.", ["❄ 14 °C", "🎟 Führung", "↟ Treppen"], "#8d9b91", "🦎", "Baredine Cave"),
      regionalStop("13:00", "MUSEUM", "1 Std.", "Traktor Story", "Historische Landmaschinen direkt neben der Höhle – überraschend spannend für kleine Technikfans.", ["🚜 Familienhighlight", "☂ drinnen", "🎟 Eintritt"], "#c8a66b", "🚜", "Traktor Story Nova Vas")
    ]
  },
  umag: {
    name: "Umag & Savudrija",
    shortName: "Umag",
    coordinates: { latitude: 45.431, longitude: 13.523 },
    route: "Leuchtturm, Lagune & Altstadt",
    budget: "€€",
    distances: { balanced: "14,2 km", relaxed: "3,5 km", active: "19 km" },
    stops: [
      regionalStop("09:00", "KÜSTE", "1 Std.", "Leuchtturm Savudrija", "Den ältesten aktiven Leuchtturm der Adria von außen ansehen und am nahen Strand Muscheln suchen.", ["🚗 15 Min.", "◉ Außenbesuch", "🌊 Küste"], "#e6c26f", "💡", "Savudrija Lighthouse"),
      regionalStop("10:30", "BADEPAUSE", "2 Std.", "Laguna Stella Maris", "Flache Lagune, Pinien und gute Infrastruktur für eine entspannte Familienpause.", ["♒ flaches Wasser", "🌲 Schatten", "☕ Infrastruktur"], "#67bdc4", "🏖️", "Stella Maris Beach Umag"),
      regionalStop("13:30", "ALTSTADT", "1 Std. 30 Min.", "Umags venezianische Gassen", "Durch die kleine Altstadt zur Kirche und über die Uferpromenade bis zum Pier schlendern.", ["🚶 kompakt", "🍦 Eispause", "📷 Hafenblick"], "#df9b72", "🏘️", "Umag Old Town"),
      regionalStop("15:30", "GESCHICHTE", "1 Std.", "Stadtmuseum Umag", "Archäologie und Stadtgeschichte im mittelalterlichen Bischofsturm – Öffnung vorher prüfen.", ["☂ drinnen", "🎟 Zeiten prüfen", "🏰 Turm"], "#9ca69d", "🏺", "Museum of the City of Umag")
    ],
    rainStops: [
      regionalStop("10:00", "MUSEUM", "1 Std.", "Stadtmuseum Umag", "Ein kompakter Einstieg in Umags Archäologie und Geschichte im alten Wehrturm.", ["☂ drinnen", "🎟 Zeiten prüfen", "🏺 Sammlung"], "#9ca69d", "🏺", "Museum of the City of Umag"),
      regionalStop("11:30", "GENUSS", "1 Std. 30 Min.", "Istrische Mittagspause", "Pasta, Suppe und etwas Süßes in der Altstadt – trocken und ohne Zeitdruck.", ["🍝 Familienlokale", "☂ drinnen", "€€"], "#d7a171", "🍲", "Umag Old Town restaurants"),
      regionalStop("14:00", "KULTUR", "1 Std.", "Lapidarium Novigrad", "Nur rund 20 Minuten entfernt wartet eine moderne Sammlung historischer Steinfragmente.", ["🚗 20 Min.", "☂ drinnen", "🎟 günstig"], "#b5aaa0", "🗿", "Lapidarium Museum Novigrad")
    ]
  },
  novigrad: {
    name: "Novigrad",
    shortName: "Novigrad",
    coordinates: { latitude: 45.316, longitude: 13.561 },
    route: "Hafenleben & Familienstrand",
    budget: "€",
    distances: { balanced: "4,4 km", relaxed: "2,6 km", active: "7 km" },
    stops: [
      regionalStop("09:30", "HAFEN", "1 Std.", "Mandrač & Stadtmauer", "Rund um den Fischerhafen und entlang der mittelalterlichen Mauern in den Tag starten.", ["🚶 ebene Runde", "⚓ Fischerboote", "📷 Fotostopp"], "#75aeb8", "⚓", "Mandrac Novigrad"),
      regionalStop("10:45", "MUSEUM", "1 Std.", "Lapidarium", "Eine kleine, modern präsentierte Sammlung historischer Steinmonumente neben der Pfarrkirche.", ["☂ drinnen", "🎟 günstig", "◷ sonntags zu"], "#aaa49a", "🗿", "Lapidarium Museum Novigrad"),
      regionalStop("12:15", "ENTDECKEN", "45 Min.", "Zentrum der Fischereitradition", "Multimedial erfahren, wie Fischfang und Bootsbau Novigrad geprägt haben – Zeiten vorher prüfen.", ["⚓ kostenlos", "☂ drinnen", "◷ begrenzte Zeiten"], "#7aa4ae", "🐟", "Fishing Tradition Centre Novigrad"),
      regionalStop("14:00", "BADEN", "3 Std.", "Karpinjan Beach", "Flacher Einstieg, Pinien und genug Platz für einen langen Familiennachmittag.", ["♒ flacher Einstieg", "🌲 Schatten", "🚶 zentrumsnah"], "#67bec2", "🏖️", "Karpinjan Beach Novigrad")
    ],
    rainStops: [
      regionalStop("10:00", "MUSEUM", "1 Std.", "Lapidarium", "Historische Steinfragmente in moderner Architektur entdecken.", ["☂ drinnen", "🎟 günstig", "◷ sonntags zu"], "#aaa49a", "🗿", "Lapidarium Museum Novigrad"),
      regionalStop("11:30", "FISCHEREI", "1 Std.", "Zentrum der Fischereitradition", "Ein multimedialer Blick auf Boote, Netze und das Leben der Fischer.", ["☂ drinnen", "⚓ kostenlos", "◷ Zeiten prüfen"], "#7aa4ae", "🐟", "Fishing Tradition Centre Novigrad"),
      regionalStop("13:00", "GENUSS", "1 Std. 30 Min.", "Mittagessen am Mandrač", "Mit Blick auf die Boote eine warme Pause einlegen und Regenlücken für einen Hafenrundgang nutzen.", ["🍝 Familienlokale", "☂ drinnen", "€€"], "#dba675", "🍝", "Mandrac Novigrad restaurants")
    ]
  },
  vrsar: {
    name: "Vrsar & Lim-Bucht",
    shortName: "Vrsar",
    coordinates: { latitude: 45.149, longitude: 13.605 },
    route: "Kunst, Aussicht & Lim-Bucht",
    budget: "€€",
    distances: { balanced: "6,8 km", relaxed: "3 km", active: "10,2 km" },
    stops: [
      regionalStop("09:00", "KUNST", "1 Std.", "Skulpturenpark Džamonja", "Große moderne Skulpturen unter freiem Himmel – kostenlos und mit viel Platz zum Entdecken.", ["🎨 unter freiem Himmel", "✓ kostenlos", "☀ wenig Schatten"], "#a7aa8e", "🗿", "Dusan Dzamonja Sculpture Park"),
      regionalStop("10:30", "ALTSTADT", "1 Std. 30 Min.", "Historisches Vrsar", "Vom Hafen durch steile mittelalterliche Gassen hinauf zur Kirche St. Martin.", ["↟ steil", "🍦 Eispause", "📷 Gassen"], "#dfac78", "🏘️", "Vrsar Old Town"),
      regionalStop("12:15", "PANORAMA", "45 Min.", "Casanova-Aussichtspunkt", "Über die Inselwelt und bis zur grünen Lim-Bucht schauen.", ["◉ Panoramablick", "☀ Sonnenhut", "✓ kostenlos"], "#e7c06f", "🔭", "Casanova Viewpoint Vrsar"),
      regionalStop("14:00", "BOOTSTOUR", "3 Std.", "Lim-Bucht vom Wasser", "Vorab gebuchte Bootstour mit Badepause – Dauer und Wetterregel beim Anbieter prüfen.", ["⛵ vorab buchen", "🌊 Badepause", "☁ wetterabhängig"], "#67aeb7", "⛵", "Vrsar Harbour")
    ],
    rainStops: [
      regionalStop("10:00", "KULTUR", "45 Min.", "Kirche St. Martin", "Die Pfarrkirche und ihre Umgebung in einer Regenpause besuchen.", ["☂ teilweise drinnen", "↟ steiler Weg", "✓ kostenlos"], "#d5b079", "⛪", "Church of St Martin Vrsar"),
      regionalStop("11:15", "GENUSS", "1 Std. 30 Min.", "Mittagspause am Hafen", "In Ruhe essen und den Blick auf die wettergeschützten Boote genießen.", ["🍝 Familienlokale", "☂ drinnen", "€€"], "#dca06f", "🍲", "Vrsar Harbour restaurants"),
      regionalStop("13:30", "UNESCO-AUSFLUG", "2 Std.", "Euphrasius-Basilika in Poreč", "Bei Dauerregen liegt Poreč nur rund 15 Minuten entfernt und bietet ein gutes Programm drinnen.", ["🚗 15 Min.", "★ UNESCO", "🎟 Eintritt"], "#c9b178", "✨", "Euphrasian Basilica Porec")
    ]
  },
  fazana: {
    name: "Fažana & Brijuni",
    shortName: "Fažana",
    coordinates: { latitude: 44.927, longitude: 13.803 },
    route: "Inselabenteuer im Nationalpark",
    budget: "€€€",
    distances: { balanced: "6 km", relaxed: "3 km", active: "9 km" },
    stops: [
      regionalStop("08:45", "HAFEN", "45 Min.", "Früher Start in Fažana", "Tickets abholen, durch die alten Gassen schlendern und rechtzeitig am Anleger sein.", ["⛴ feste Abfahrt", "🎟 vorab buchen", "☕ Frühstück"], "#dfa36f", "⚓", "Fazana Harbour"),
      regionalStop("10:00", "NATIONALPARK", "1 Std.", "Veliki Brijun mit Inselbahn", "Die geführte Rundfahrt verbindet Landschaft, Geschichte und entspannte Wege.", ["🚂 im Ticket", "⛴ Fährfahrt", "★ Nationalpark"], "#8db88a", "🚂", "Brijuni National Park"),
      regionalStop("11:30", "TIERWELT", "1 Std.", "Safari Park Brijuni", "Zebras, Lamas und weitere Tiere auf der Inselroute beobachten.", ["🦓 Kinderhighlight", "✓ Standardtour", "☀ Sonnenhut"], "#a6bd7f", "🦓", "Safari Park Brijuni"),
      regionalStop("15:30", "BADEN", "2 Std.", "Fažana Nordstrand", "Nach der Rückfahrt am flachen Kiesstrand baden und über die Promenade zurücklaufen.", ["🏖 Familienstrand", "🌲 etwas Schatten", "🍦 Promenade"], "#67bdc2", "🏖️", "Fazana North Beach")
    ],
    rainStops: [
      regionalStop("09:30", "WICHTIG", "30 Min.", "Fährstatus prüfen", "Bei Regen fahren Touren oft, bei starkem Wind können sie ausfallen. Vor Abfahrt beim Nationalpark nachfragen.", ["⛴ wetterabhängig", "☎ vorher prüfen", "🎟 feste Zeit"], "#c9c56b", "⛴", "Brijuni National Park Office Fazana"),
      regionalStop("10:30", "MEERESWELT", "2 Std.", "Aquarium Pula", "Falls die Fähre ausfällt: In rund 20 Minuten erreicht ihr das Aquarium in der Festung Verudela.", ["🚗 20 Min.", "☂ drinnen", "🐢 Kinderhighlight"], "#67b4b8", "🐢", "Aquarium Pula"),
      regionalStop("13:30", "UNTERIRDISCH", "1 Std. 30 Min.", "Zerostrasse Pula", "Das Tunnelsystem unter Pulas Altstadt ist eine wetterfeste zweite Etappe.", ["🚗 15 Min.", "❄ kühl", "🎟 Eintritt"], "#909d96", "🔦", "Zerostrasse Pula")
    ]
  },
  medulin: {
    name: "Medulin & Kamenjak",
    shortName: "Medulin",
    coordinates: { latitude: 44.8225, longitude: 13.935 },
    route: "Dinosaurier & wilde Buchten",
    budget: "€€",
    distances: { balanced: "18 km", relaxed: "7 km", active: "24 km" },
    stops: [
      regionalStop("08:30", "DINOSAURIER", "1 Std.", "Dinosaurierpfad Grakalovac", "Früh auf Spurensuche am Kap Kamenjak gehen, bevor Wege und Felsen heiß werden.", ["🦕 Kinderhighlight", "☀ früh starten", "👟 feste Schuhe"], "#b8b37d", "🦕", "Dinosaur Trail Kamenjak"),
      regionalStop("10:00", "WILDE KÜSTE", "3 Std.", "Bucht Pinižule", "Felsen, klares Wasser und ein langer Badestopp – Wasser, Snacks und Badeschuhe mitbringen.", ["🌊 Naturbucht", "👟 Badeschuhe", "💧 Wasser mitnehmen"], "#58b4bc", "🤿", "Pinizule Beach Kamenjak"),
      regionalStop("14:30", "RÖMERSPUREN", "1 Std. 30 Min.", "Archäologiepark Vižula", "Zwischen römischen Villenresten spazieren; Spielbereiche machen den Stopp familientauglich.", ["✓ Eintritt frei", "♿ Hauptwege", "☀ Sonnenhut"], "#c8aa77", "🏺", "Vizula Archaeological Park"),
      regionalStop("17:00", "SAND & ABEND", "2 Std.", "Bijeca & Windmühle Malin", "Am flachen Sandstrand ausklingen lassen und später zur Windmühle an der Promenade laufen.", ["🏖 Sandstrand", "♒ flach", "🌅 Abendrunde"], "#68bdc4", "🌅", "Bijeca Beach Medulin")
    ],
    rainStops: [
      regionalStop("09:30", "MEERESWELT", "2 Std. 30 Min.", "Aquarium Pula", "Die Festung Verudela mit Aquarien und Schildkrötenstation liegt rund 15 Minuten entfernt.", ["🚗 15 Min.", "☂ drinnen", "🐢 Kinderhighlight"], "#67b4b8", "🐢", "Aquarium Pula"),
      regionalStop("12:30", "GENUSS", "1 Std. 30 Min.", "Mittagessen in Medulin", "Warme Pasta und eine Pause mit Blick auf den Hafen.", ["🍝 Familienlokale", "☂ drinnen", "€€"], "#d7a272", "🍝", "Medulin Harbour restaurants"),
      regionalStop("14:30", "UNTERIRDISCH", "1 Std. 30 Min.", "Zerostrasse Pula", "Ein kühles Tunnelabenteuer unter Pulas Altstadt als wetterfester Abschluss.", ["🚗 20 Min.", "🔦 spannend", "🎟 Eintritt"], "#909d96", "🔦", "Zerostrasse Pula")
    ]
  },
  labin: {
    name: "Labin & Rabac",
    shortName: "Labin",
    coordinates: { latitude: 45.095, longitude: 14.123 },
    route: "Bergstadt, Bergbau & Badebucht",
    budget: "€€",
    distances: { balanced: "9,6 km", relaxed: "3,2 km", active: "13 km" },
    stops: [
      regionalStop("09:00", "ALTSTADT", "1 Std.", "Labin & Fortica-Blick", "Durch das Florustor in die Bergstadt und hinauf zum Aussichtspunkt über Rabac.", ["↟ Kopfsteinpflaster", "◉ Aussicht", "☀ früh starten"], "#dfa36f", "🏘️", "Fortica Viewpoint Labin"),
      regionalStop("10:15", "BERGBAU", "1 Std. 15 Min.", "Nationalmuseum Labin", "Die Bergbaugeschichte inklusive Miniaturstollen macht Industriekultur greifbar.", ["⛏ Kinder spannend", "☂ drinnen", "🎟 Eintritt"], "#8f9690", "⛏️", "Labin National Museum"),
      regionalStop("12:00", "WANDERN", "1 Std. 30 Min.", "Sentona-Weg nach Rabac", "Über Brücken und an Bachläufen bergab; nur mit festen Schuhen und ohne Kinderwagen.", ["🥾 2,5 km", "↘ nur bergab", "🚕 Rückfahrt planen"], "#77a77d", "🥾", "Sentona Trail Labin"),
      regionalStop("14:30", "BADEN", "3 Std.", "Girandella Beach", "Klares Wasser und gute Infrastruktur für die verdiente Badepause.", ["🏖 Blaue Flagge", "👟 Badeschuhe", "☕ Infrastruktur"], "#5db3c0", "🏖️", "Girandella Beach Rabac")
    ],
    rainStops: [
      regionalStop("10:00", "BERGBAU", "1 Std. 30 Min.", "Nationalmuseum Labin", "Stadt- und Bergbaugeschichte mit begehbarem Miniaturstollen.", ["☂ drinnen", "⛏ Kinder spannend", "🎟 Eintritt"], "#8f9690", "⛏️", "Labin National Museum"),
      regionalStop("12:00", "GENUSS", "1 Std. 30 Min.", "Mittagspause in Labin", "Istrische Küche in der Altstadt und Zeit für eine trockene Pause.", ["🍝 Familienlokale", "☂ drinnen", "€€"], "#d5a172", "🍲", "Labin Old Town restaurants"),
      regionalStop("14:00", "KUNST", "1 Std.", "Stadtgalerie Labin", "Eine kleine Dosis zeitgenössische Kunst – aktuelle Ausstellung und Zeiten vorher prüfen.", ["☂ drinnen", "🎨 Ausstellung", "◷ Zeiten prüfen"], "#aaa49b", "🎨", "Labin City Gallery")
    ]
  },
  motovun: {
    name: "Motovun & Grožnjan",
    shortName: "Motovun",
    coordinates: { latitude: 45.336, longitude: 13.829 },
    route: "Künstlerdörfer & Mirna-Blick",
    budget: "€€",
    distances: { balanced: "28 km", relaxed: "5 km", active: "34 km" },
    stops: [
      regionalStop("09:00", "KÜNSTLERDORF", "1 Std. 30 Min.", "Grožnjan", "Galerien, Werkstätten und stille Gassen im morgendlichen Künstlerdorf entdecken.", ["🎨 viele Ateliers", "↟ Kopfsteinpflaster", "☀ früh starten"], "#dfa273", "🎨", "Groznjan Old Town"),
      regionalStop("11:00", "BAHNTRASSE", "1 Std.", "Parenzana bei Završje", "Ein kurzes Teilstück zu Viadukt und Tunneln laufen – Taschenlampe und Wasser einpacken.", ["🥾 kurze Runde", "🔦 Tunnel", "⚠ Hinweise prüfen"], "#87a684", "🚂", "Parenzana Zavrsje"),
      regionalStop("13:00", "DRUCKWERKSTATT", "1 Std.", "Antico in Motovun", "Eine historische Druckerpresse erleben und handgemachte Drucke ansehen; dienstags geschlossen.", ["☂ drinnen", "🎟 Eintritt", "◷ dienstags zu"], "#a99a87", "📜", "Antico Motovun"),
      regionalStop("14:30", "PANORAMA", "2 Std.", "Motovuns Stadtmauer", "Die Runde über die Mauern eröffnet den großen Blick über das Mirna-Tal; Anstieg vom Parkplatz einplanen.", ["◉ Panoramablick", "🎟 Eintritt", "↟ steil"], "#dfb66f", "🏰", "Motovun Town Walls")
    ],
    rainStops: [
      regionalStop("10:00", "DRUCKKUNST", "1 Std.", "Antico in Motovun", "Die Gutenberg-Replik und handwerkliche Drucke sind ein guter wettergeschützter Auftakt.", ["☂ drinnen", "🎟 Eintritt", "◷ dienstags zu"], "#a99a87", "📜", "Antico Motovun"),
      regionalStop("11:30", "GENUSS", "1 Std. 30 Min.", "Trüffel-Mittagessen", "Eine warme Pause mit istrischer Pasta; für Kinder eine Variante ohne Trüffel bestellen.", ["🍝 lokale Küche", "☂ drinnen", "€€"], "#d3a06e", "🍝", "Motovun restaurants"),
      regionalStop("14:00", "KLEINSTADT", "1 Std. 30 Min.", "Hum & Aura-Museum", "Bei Dauerregen bietet das kleine interaktive Museum in Hum eine Alternative rund 35 Minuten entfernt.", ["🚗 35 Min.", "☂ drinnen", "🎟 Eintritt"], "#aaa29a", "🏛️", "Aura Museum Hum")
    ]
  },
  buzet: {
    name: "Buzet, Roč & Hum",
    shortName: "Buzet",
    coordinates: { latitude: 45.409, longitude: 13.966 },
    route: "Glagolitische Spuren & Mühlendorf",
    budget: "€€",
    distances: { balanced: "30 km", relaxed: "8 km", active: "36 km" },
    stops: [
      regionalStop("09:00", "BERGSTADT", "1 Std.", "Altstadt von Buzet", "Durch Tore und kleine Plätze der ruhigen Oberstadt laufen, bevor es heiß wird.", ["↟ Kopfsteinpflaster", "◉ Aussicht", "☀ früh starten"], "#dfa16f", "🏘️", "Buzet Old Town"),
      regionalStop("10:30", "MITTELALTER", "1 Std.", "Roč", "Die kompakte befestigte Stadt und ihre glagolitische Geschichte entdecken.", ["📜 Kulturerbe", "🚗 15 Min.", "✓ frei zugänglich"], "#c3a574", "🏰", "Roc Istria"),
      regionalStop("12:00", "KLEINSTE STADT", "1 Std. 30 Min.", "Glagolitische Allee & Hum", "Entlang der elf Denkmäler nach Hum fahren, durch das Stadttor gehen und Mittag essen.", ["🚗 7 km Route", "📜 11 Denkmäler", "🍝 Mittagspause"], "#c9ae78", "🔤", "Hum Croatia"),
      regionalStop("15:00", "NATURORT", "1 Std. 30 Min.", "Kotli", "Alte Wassermühlen und ausgewaschene Kalksteinbecken ansehen; bei Nässe besonders vorsichtig sein.", ["🌿 Naturdenkmal", "👟 feste Schuhe", "⚠ Felsen rutschig"], "#73a696", "💧", "Kotli Istria")
    ],
    rainStops: [
      regionalStop("10:00", "MUSEUM", "1 Std.", "Aura-Museum Hum", "Interaktive Einblicke in alte Berufe und istrische Traditionen.", ["☂ drinnen", "🎟 Eintritt", "👨‍👩‍👧 Familie"], "#aaa29a", "🏛️", "Aura Museum Hum"),
      regionalStop("11:30", "GENUSS", "1 Std. 30 Min.", "Mittagessen in Hum", "Eine warme Pause in der kleinen Stadt und regionale Küche probieren.", ["🍝 lokale Küche", "☂ drinnen", "€€"], "#d1a170", "🍲", "Hum Croatia restaurants"),
      regionalStop("14:00", "KULTUR", "1 Std.", "Roč in einer Regenpause", "Stadttor, Kirchen und glagolitische Spuren auf einer kompakten Runde ansehen.", ["🚗 10 Min.", "☂ teils draußen", "📜 Kulturerbe"], "#c3a574", "🏰", "Roc Istria")
    ]
  }
};

const itinerary = document.querySelector("#itinerary");
const destinationSelect = document.querySelector("#destination-select");
const weatherSelect = document.querySelector("#weather-select");
const paceSelect = document.querySelector("#pace-select");
const replanButton = document.querySelector("#replan-button");
const shareButton = document.querySelector("#share-button");
const installButton = document.querySelector("#install-button");
const notificationButton = document.querySelector("#notification-button");
const profileButton = document.querySelector(".profile");
const partySize = document.querySelector("#party-size");
const adultCount = document.querySelector("#adult-count");
const childCount = document.querySelector("#child-count");
const childAgeFields = document.querySelector("#child-age-fields");
const childAgeHint = document.querySelector("#child-age-hint");
const beachGuideGrid = document.querySelector("#beach-guide-grid");
const tripGuideGrid = document.querySelector("#trip-guide-grid");
const foodGuideGrid = document.querySelector("#food-guide-grid");
const beachGuideMap = document.querySelector("#beach-guide-map");
const tripGuideMap = document.querySelector("#trip-guide-map");
const foodGuideMap = document.querySelector("#food-guide-map");
const beachGuideContext = document.querySelector("#beach-guide-context");
const tripGuideContext = document.querySelector("#trip-guide-context");
const foodGuideContext = document.querySelector("#food-guide-context");
const notificationDialog = document.querySelector("#notification-dialog");
const notificationDestination = document.querySelector("#notification-destination");
const weatherNotifications = document.querySelector("#weather-notifications");
const newsNotifications = document.querySelector("#news-notifications");
const saveNotificationsButton = document.querySelector("#save-notifications");
const disableNotificationsButton = document.querySelector("#disable-notifications");
const toast = document.querySelector("#toast");
const weatherElements = {
  icon: document.querySelector("#weather-icon"),
  status: document.querySelector("#weather-data-status"),
  temperature: document.querySelector("#weather-temperature"),
  dayRange: document.querySelector("#weather-day-range"),
  summary: document.querySelector("#weather-summary"),
  rain: document.querySelector("#weather-rain"),
  wind: document.querySelector("#weather-wind"),
  sunrise: document.querySelector("#weather-sunrise"),
  sunset: document.querySelector("#weather-sunset"),
  uvIndex: document.querySelector("#weather-uv"),
  waterTemperature: document.querySelector("#weather-water"),
  tip: document.querySelector("#weather-tip")
};
const favoriteCount = document.querySelector("#favorite-count");
const favoritesGrid = document.querySelector("#favorites-grid");
const favoritesEmpty = document.querySelector("#favorites-empty");
const ONESIGNAL_APP_ID = "cd00c6cc-ad14-4246-9cde-4de743ce8238";
const ONESIGNAL_SAFARI_WEB_ID = "web.onesignal.auto.4ed285de-faf5-4c6c-a346-3ff91e5aded6";
const NOTIFICATION_SETTINGS_KEY = "bura-notification-settings-v1";
const DESTINATION_STORAGE_KEY = "bura-selected-destination";
const FAMILY_SETTINGS_KEY = "bura-family-settings-v1";
let planIndex = 0;
let toastTimer;
let deferredInstallPrompt;
let weatherManuallySelected = false;
let lastWeatherRefresh = 0;
let oneSignalClient;
let notificationTagSyncTimers = [];
const favoriteRegistry = new Map();

function getPlans() {
  const weather = weatherSelect.value;
  const pace = paceSelect.value;
  const destinationKey = destinationSelect.value;

  if (destinationKey === "pula") {
    return pulaPlanCatalog[weather]?.[pace] || pulaPlanCatalog[weather]?.balanced || pulaPlanCatalog.sun.balanced;
  }

  const destination = istriaDestinations[destinationKey];
  const availableStops = weather === "rain" ? destination.rainStops : destination.stops;
  const stops = pace === "relaxed" ? availableStops.slice(0, 3) : availableStops;
  const paceLabel = {
    balanced: destination.route,
    relaxed: `Ganz entspannt durch ${destination.shortName}`,
    active: `${destination.shortName} für Entdecker`
  };

  return [{
    name: weather === "rain" ? `${destination.shortName} bei Regen` : paceLabel[pace],
    distance: destination.distances[pace],
    budget: destination.budget,
    stops
  }];
}

function buildDestinationMapUrl(coordinates) {
  const { latitude, longitude } = coordinates;
  const query = encodeURIComponent(`${latitude},${longitude}`);
  return `https://www.google.com/maps?q=${query}&hl=de&z=12&output=embed`;
}

function updateDestinationMap() {
  const destination = istriaDestinations[destinationSelect.value];
  const mapFrame = document.querySelector("#destination-map");
  if (!destination?.coordinates || !mapFrame) return;

  const mapKey = `${destinationSelect.value}:${destination.coordinates.latitude},${destination.coordinates.longitude}`;
  if (mapFrame.dataset.mapKey === mapKey) return;

  mapFrame.dataset.mapKey = mapKey;
  mapFrame.src = buildDestinationMapUrl(destination.coordinates);
  mapFrame.title = `Google Maps: ${destination.name}`;
}

function updateDestinationUI() {
  const destination = istriaDestinations[destinationSelect.value];
  document.querySelector("#hero-destination").textContent = `${destination.name}.`;
  document.querySelector("#profile-destination").textContent = destination.shortName;
  document.querySelector("#planner-destination").textContent = destination.name.toLocaleUpperCase("de-DE");
  document.title = "ISTRIVA";
  updateDestinationMap();
}

function getSavedDestination() {
  try {
    const destination = localStorage.getItem(DESTINATION_STORAGE_KEY);
    return destination && istriaDestinations[destination] ? destination : null;
  } catch {
    return null;
  }
}

function saveDestination(destination) {
  try {
    localStorage.setItem(DESTINATION_STORAGE_KEY, destination);
  } catch {
    // The current selection still works when browser storage is unavailable.
  }
}

function clampCount(value, minimum, maximum, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? Math.min(maximum, Math.max(minimum, parsed)) : fallback;
}

function normalizeChildAge(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? Math.min(17, Math.max(0, parsed)) : null;
}

function normalizeChildAges(ages, childTotal) {
  return Array.from(
    { length: childTotal },
    (_, index) => normalizeChildAge(Array.isArray(ages) ? ages[index] : null)
  );
}

function getFamilySettings() {
  try {
    const stored = JSON.parse(localStorage.getItem(FAMILY_SETTINGS_KEY) || "null");
    const children = clampCount(stored?.children, 0, 8, 2);
    return {
      adults: clampCount(stored?.adults, 1, 8, 2),
      children,
      childAges: normalizeChildAges(stored?.childAges, children)
    };
  } catch {
    return { adults: 2, children: 2, childAges: [null, null] };
  }
}

function childAgesComplete(settings = getFamilySettings()) {
  return settings.children === 0
    || (settings.childAges.length === settings.children
      && settings.childAges.every((age) => Number.isInteger(age)));
}

function familyDescription(settings = getFamilySettings()) {
  const adults = settings.adults === 1 ? "1 Erwachsener" : `${settings.adults} Erwachsene`;
  const children = settings.children === 1 ? "1 Kind" : `${settings.children} Kinder`;
  if (!childAgesComplete(settings) || settings.children === 0) {
    return `${adults} · ${children}`;
  }
  const ages = settings.childAges.map((age) => `${age}`).join(", ");
  return `${adults} · ${children} (${ages} J.)`;
}

function updateFamilyUI(settings = getFamilySettings()) {
  adultCount.value = settings.adults;
  childCount.value = settings.children;
  partySize.textContent = settings.adults + settings.children;
  childAgeFields.hidden = settings.children === 0;
  childAgeFields.innerHTML = settings.childAges.map((age, index) => `
    <label>
      <span>Kind ${index + 1}</span>
      <input class="child-age-input" type="number" min="0" max="17" step="1" inputmode="numeric" value="${age ?? ""}" placeholder="Alter" aria-label="Alter von Kind ${index + 1}" required>
      <small>Jahre</small>
    </label>
  `).join("");
  childAgeHint.textContent = childAgesComplete(settings)
    ? (settings.children > 0 ? "Alter wird für passende Familienempfehlungen berücksichtigt." : "")
    : "Bitte für jedes Kind das Alter angeben.";
  childAgeHint.classList.toggle("warning", !childAgesComplete(settings));
  childAgeFields.querySelectorAll(".child-age-input").forEach((input) => {
    input.addEventListener("change", saveFamilySettings);
  });
  profileButton.setAttribute(
    "aria-label",
    `${familyDescription(settings)} – Familienprofil öffnen`
  );
}

function saveFamilySettings() {
  const current = getFamilySettings();
  const children = clampCount(childCount.value, 0, 8, current.children);
  const enteredAges = [...childAgeFields.querySelectorAll(".child-age-input")]
    .map((input) => normalizeChildAge(input.value));
  const settings = {
    adults: clampCount(adultCount.value, 1, 8, current.adults),
    children,
    childAges: Array.from(
      { length: children },
      (_, index) => enteredAges[index] ?? current.childAges[index] ?? null
    )
  };

  try {
    localStorage.setItem(FAMILY_SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // The current values still work when browser storage is unavailable.
  }

  updateFamilyUI(settings);
  renderDiscoveryGuides();
  showToast(childAgesComplete(settings)
    ? `Familie angepasst: ${familyDescription(settings)}`
    : "Bitte noch das Alter aller Kinder angeben");
}

const weatherIcons = {
  clear: "☀",
  partlyCloudy: "◒",
  cloudy: "☁",
  fog: "≋",
  rain: "☂",
  snow: "❄",
  thunder: "ϟ",
  variable: "◌",
  wind: "〰",
  water: "∿",
  sunrise: "",
  sunset: "",
  uv: "◎"
};

function describeWeather(code) {
  if (code === 0) return { label: "Klar", icon: weatherIcons.clear };
  if (code <= 2) return { label: "Leicht bewölkt", icon: weatherIcons.partlyCloudy };
  if (code === 3) return { label: "Bedeckt", icon: weatherIcons.cloudy };
  if (code === 45 || code === 48) return { label: "Nebelig", icon: weatherIcons.fog };
  if (code >= 51 && code <= 57) return { label: "Nieselregen", icon: weatherIcons.rain };
  if (code >= 61 && code <= 67) return { label: "Regen", icon: weatherIcons.rain };
  if (code >= 71 && code <= 77) return { label: "Schnee", icon: weatherIcons.snow };
  if (code >= 80 && code <= 82) return { label: "Regenschauer", icon: weatherIcons.rain };
  if (code >= 95) return { label: "Gewitter", icon: weatherIcons.thunder };
  return { label: "Wechselhaft", icon: weatherIcons.variable };
}

function initWeatherDetailIcons() {
  document.querySelectorAll(".weather-detail-icon[data-icon]").forEach((element) => {
    const icon = weatherIcons[element.dataset.icon];
    if (icon) element.textContent = icon;
  });
}

function weatherCacheKey(destinationKey) {
  return `bura-live-weather-${destinationKey}`;
}

function readCachedWeather(destinationKey) {
  try {
    return JSON.parse(localStorage.getItem(weatherCacheKey(destinationKey)) || "null");
  } catch {
    return null;
  }
}

function cacheWeather(destinationKey, data) {
  try {
    localStorage.setItem(weatherCacheKey(destinationKey), JSON.stringify(data));
  } catch {
    // Live weather still works when local storage is unavailable.
  }
}

function shouldUseRainPlan(data) {
  return data.rainProbability >= 55
    || data.precipitation >= 0.2
    || (data.weatherCode >= 51 && data.weatherCode <= 82);
}

function getWeatherTip(data, destination) {
  if (shouldUseRainPlan(data)) {
    return `Für ${destination.shortName} ist die Regenoption automatisch vorbereitet.`;
  }
  if (data.temperature >= 28) {
    return `In ${destination.shortName} wird es warm – die längste Pause liegt in der Mittagshitze.`;
  }
  if (data.windSpeed >= 30) {
    return `Heute ist es windig – Bootsfahrten und Fährverbindungen bitte nochmals prüfen.`;
  }
  return `Gute Bedingungen für euren Familientag in ${destination.shortName}.`;
}

function formatWeatherTime(value) {
  return value?.slice(11, 16) || "--:--";
}

function buildDailyForecast(payload) {
  const daily = payload.daily;
  if (!daily?.time?.length) return [];

  return daily.time.map((date, index) => ({
    date,
    weatherCode: daily.weather_code?.[index],
    min: daily.temperature_2m_min?.[index],
    max: daily.temperature_2m_max?.[index],
    rainProbability: daily.precipitation_probability_max?.[index]
  }));
}

function formatForecastDayLabel(dateString, index) {
  if (index === 0) return "Heute";
  const date = new Date(`${dateString}T12:00:00`);
  return date.toLocaleDateString("de-DE", { weekday: "short" }).replace(".", "");
}

function renderWeatherForecast(days = []) {
  const grid = document.querySelector("#weather-forecast");
  if (!grid) return;

  grid.innerHTML = days.slice(0, 7).map((day, index) => {
    const condition = describeWeather(Number.isFinite(day.weatherCode) ? day.weatherCode : 0);
    const min = Number.isFinite(day.min) ? Math.round(day.min) : "--";
    const max = Number.isFinite(day.max) ? Math.round(day.max) : "--";
    const rain = Number.isFinite(day.rainProbability) ? Math.round(day.rainProbability) : "--";

    return `
      <article class="weather-forecast-day${index === 0 ? " is-today" : ""}">
        <span class="weather-forecast-label">${formatForecastDayLabel(day.date, index)}</span>
        <span class="weather-forecast-icon" aria-hidden="true">${condition.icon}</span>
        <strong class="weather-forecast-temps">${min}°–${max}°</strong>
        <span class="weather-forecast-rain"><span class="weather-glyph" aria-hidden="true">${weatherIcons.rain}</span> ${rain}%</span>
      </article>
    `;
  }).join("");
}

function applyWeatherData(data, { isLive, applyToPlan }) {
  const destination = istriaDestinations[destinationSelect.value];
  const condition = describeWeather(data.weatherCode);
  const temperature = Math.round(data.temperature);
  const apparentTemperature = Math.round(data.apparentTemperature);
  const updateTime = data.observedAt?.slice(11, 16)
    || new Date(data.fetchedAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

  weatherElements.icon.textContent = condition.icon;
  weatherElements.status.textContent = `${isLive ? "LIVE" : "ZWISCHENGESPEICHERT"} · ${updateTime}`;
  weatherElements.temperature.textContent = `${temperature}°`;
  weatherElements.dayRange.textContent = Number.isFinite(data.temperatureMin) && Number.isFinite(data.temperatureMax)
    ? `${Math.round(data.temperatureMin)}° – ${Math.round(data.temperatureMax)}°`
    : "--° – --°";
  weatherElements.summary.textContent = `${condition.label} · gefühlt ${apparentTemperature}°`;
  weatherElements.rain.textContent = `${Math.round(data.rainProbability)}%`;
  weatherElements.wind.textContent = `${Math.round(data.windSpeed)} km/h`;
  weatherElements.sunrise.textContent = formatWeatherTime(data.sunrise);
  weatherElements.sunset.textContent = formatWeatherTime(data.sunset);
  weatherElements.uvIndex.textContent = Number.isFinite(data.uvIndex)
    ? data.uvIndex.toFixed(1).replace(".0", "")
    : "--";
  weatherElements.waterTemperature.textContent = Number.isFinite(data.waterTemperature)
    ? `${Math.round(data.waterTemperature)}°`
    : "--°";
  renderWeatherForecast(data.forecast);
  weatherElements.tip.innerHTML = `<span>✦</span> ${getWeatherTip(data, destination)}`;

  weatherSelect.options[0].textContent = `Outdoorplan · ${temperature}°`;
  weatherSelect.options[1].textContent = `Regenoption · ${Math.round(data.rainProbability)}%`;

  if (applyToPlan && !weatherManuallySelected) {
    weatherSelect.value = shouldUseRainPlan(data) ? "rain" : "sun";
    planIndex = 0;
    renderPlan(true);
  }
}

async function fetchSeaSurfaceTemperature(latitude, longitude) {
  const endpoint = new URL("https://marine-api.open-meteo.com/v1/marine");
  endpoint.search = new URLSearchParams({
    latitude,
    longitude,
    current: "sea_surface_temperature",
    timezone: "auto"
  });

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) return null;
    const payload = await response.json();
    const value = payload.current?.sea_surface_temperature;
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

async function refreshLiveWeather({ applyToPlan = false } = {}) {
  const destinationKey = destinationSelect.value;
  const destination = istriaDestinations[destinationKey];
  const { latitude, longitude } = destination.coordinates;
  const endpoint = new URL("https://api.open-meteo.com/v1/forecast");

  endpoint.search = new URLSearchParams({
    latitude,
    longitude,
    current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,uv_index",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset",
    timezone: "auto",
    forecast_days: "7"
  });
  endpoint.searchParams.set("cache_bust", String(Date.now()));

  weatherElements.status.textContent = "LIVE-WETTER WIRD AKTUALISIERT";

  if (!navigator.onLine) {
    const cached = readCachedWeather(destinationKey);

    if (cached) {
      applyWeatherData(cached, { isLive: false, applyToPlan });
    } else {
      weatherElements.status.textContent = "OFFLINE · KEINE LIVE-DATEN";
      weatherElements.summary.textContent = "Wetter momentan nicht verfügbar";
      weatherElements.tip.innerHTML = `<span>✦</span> Der Tagesplan bleibt nutzbar; Wetter bitte vor dem Start prüfen.`;
    }
    return;
  }

  try {
    const [response, waterTemperature] = await Promise.all([
      fetch(endpoint, { cache: "no-store" }),
      fetchSeaSurfaceTemperature(latitude, longitude)
    ]);
    if (!response.ok) throw new Error(`Weather request failed with ${response.status}`);

    const payload = await response.json();
    const data = {
      temperature: payload.current.temperature_2m,
      apparentTemperature: payload.current.apparent_temperature,
      weatherCode: payload.current.weather_code,
      windSpeed: payload.current.wind_speed_10m,
      precipitation: payload.current.precipitation,
      uvIndex: payload.current.uv_index,
      waterTemperature,
      temperatureMin: payload.daily.temperature_2m_min[0],
      temperatureMax: payload.daily.temperature_2m_max[0],
      rainProbability: payload.daily.precipitation_probability_max[0],
      sunrise: payload.daily.sunrise[0],
      sunset: payload.daily.sunset[0],
      forecast: buildDailyForecast(payload),
      observedAt: payload.current.time,
      fetchedAt: Date.now()
    };

    cacheWeather(destinationKey, data);
    lastWeatherRefresh = Date.now();

    if (destinationSelect.value === destinationKey) {
      applyWeatherData(data, { isLive: true, applyToPlan });
    }
  } catch {
    const cached = readCachedWeather(destinationKey);

    if (destinationSelect.value !== destinationKey) return;

    if (cached) {
      applyWeatherData(cached, { isLive: false, applyToPlan });
      return;
    }

    weatherElements.status.textContent = "OFFLINE · KEINE LIVE-DATEN";
    weatherElements.summary.textContent = "Wetter momentan nicht verfügbar";
    weatherElements.tip.innerHTML = `<span>✦</span> Der Tagesplan bleibt nutzbar; Wetter bitte vor dem Start prüfen.`;
  }
}

function getNotificationSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem(NOTIFICATION_SETTINGS_KEY) || "null");
    return {
      weather: stored?.weather !== false,
      news: stored?.news !== false
    };
  } catch {
    return { weather: true, news: true };
  }
}

function saveNotificationSettings(settings) {
  try {
    localStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings));
    localStorage.removeItem("bura-weather-notifications");
  } catch {
    // Push subscriptions also work when preferences cannot be stored locally.
  }
}

function currentNotificationPreference() {
  const key = destinationSelect.value;
  const destination = istriaDestinations[key];
  const settings = getNotificationSettings();
  return {
    key,
    name: destination.name,
    weather: settings.weather,
    news: settings.news
  };
}

function notificationSubscriptionActive() {
  return oneSignalClient?.User.PushSubscription.optedIn === true;
}

function updateNotificationButton() {
  const active = notificationSubscriptionActive();
  notificationButton.classList.toggle("active", active);
  notificationButton.setAttribute("aria-pressed", String(active));
  notificationButton.title = active
    ? "Benachrichtigungen einstellen"
    : "Benachrichtigungen aktivieren";
}

function updateNotificationDialog() {
  const settings = getNotificationSettings();
  const destination = istriaDestinations[destinationSelect.value];
  const active = notificationSubscriptionActive();

  notificationDestination.textContent = destination.name;
  weatherNotifications.checked = settings.weather;
  newsNotifications.checked = settings.news;
  saveNotificationsButton.textContent = active ? "Speichern" : "Aktivieren";
  disableNotificationsButton.hidden = !active;
}

async function syncNotificationPreference() {
  if (!oneSignalClient) return;

  const preference = currentNotificationPreference();
  const topics = preference.weather && preference.news
    ? "weather_news"
    : (preference.weather ? "weather" : "news");

  await oneSignalClient.User.addTags({
    destination: preference.key,
    notification_topics: topics
  });
}

function scheduleNotificationTagSync() {
  notificationTagSyncTimers.forEach((timer) => clearTimeout(timer));
  notificationTagSyncTimers = [0, 1500, 5000].map((delay) => setTimeout(() => {
    syncNotificationPreference().catch(() => undefined);
  }, delay));
}

async function saveNotificationPreferences() {
  const settings = {
    weather: weatherNotifications.checked,
    news: newsNotifications.checked
  };

  if (!settings.weather && !settings.news) {
    showToast("Bitte mindestens eine Update-Art auswählen");
    return;
  }

  if (!oneSignalClient) {
    showToast("Der Benachrichtigungsdienst wird noch geladen");
    return;
  }

  const wasActive = notificationSubscriptionActive();
  saveNotificationsButton.disabled = true;

  try {
    saveNotificationSettings(settings);

    if (!oneSignalClient.Notifications.permission) {
      await oneSignalClient.Notifications.requestPermission();
    }

    if (!oneSignalClient.Notifications.permission) {
      const blocked = "Notification" in window && Notification.permission === "denied";
      showToast(blocked
        ? "Benachrichtigungen sind in den Geräteeinstellungen blockiert"
        : "Benachrichtigungen wurden nicht freigegeben");
      updateNotificationButton();
      return;
    }

    await oneSignalClient.User.PushSubscription.optIn();
    await syncNotificationPreference();
    scheduleNotificationTagSync();
    updateNotificationButton();
    notificationDialog.close();
    showToast(wasActive
      ? "Benachrichtigungseinstellungen wurden gespeichert"
      : "Benachrichtigungen sind aktiviert");
  } catch {
    showToast("Benachrichtigungen konnten nicht aktiviert werden");
  } finally {
    saveNotificationsButton.disabled = false;
  }
}

async function disableNotifications() {
  if (!oneSignalClient) return;

  disableNotificationsButton.disabled = true;

  try {
    await oneSignalClient.User.PushSubscription.optOut();
    updateNotificationButton();
    notificationDialog.close();
    showToast("Benachrichtigungen wurden deaktiviert");
  } catch {
    showToast("Benachrichtigungen konnten nicht deaktiviert werden");
  } finally {
    disableNotificationsButton.disabled = false;
  }
}

function getOneSignalWorkerConfig() {
  const manifestUrl = document.querySelector('link[rel="manifest"]')?.href || window.location.href;
  const basePath = new URL(".", manifestUrl).pathname;
  return {
    path: `${basePath.replace(/^\/+/, "")}push/onesignal/OneSignalSDKWorker.js`,
    scope: `${basePath}push/onesignal/`
  };
}

function initializeOneSignal() {
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async (OneSignal) => {
    const worker = getOneSignalWorkerConfig();
    const manifestUrl = document.querySelector('link[rel="manifest"]')?.href || window.location.href;

    try {
      await OneSignal.init({
        appId: ONESIGNAL_APP_ID,
        safari_web_id: ONESIGNAL_SAFARI_WEB_ID,
        serviceWorkerPath: worker.path,
        serviceWorkerParam: { scope: worker.scope },
        autoResubscribe: true,
        notifyButton: { enable: false },
        welcomeNotification: { disable: true },
        notificationClickHandlerMatch: "origin",
        notificationClickHandlerAction: "navigate"
      });

      oneSignalClient = OneSignal;
      OneSignal.Notifications.setDefaultUrl(new URL(".", manifestUrl).href);

      OneSignal.Notifications.addEventListener("permissionChange", updateNotificationButton);
      OneSignal.User.PushSubscription.addEventListener("change", (event) => {
        updateNotificationButton();
        if (event.current.id || event.current.token || event.current.optedIn) {
          scheduleNotificationTagSync();
        }
      });

      const supported = OneSignal.Notifications.isPushSupported();
      notificationButton.hidden = !(supported || isIos);
      updateNotificationButton();

      scheduleNotificationTagSync();
    } catch (error) {
      console.warn("OneSignal konnte nicht initialisiert werden", error);
      oneSignalClient = undefined;
      notificationButton.hidden = true;
    }
  });
}

function mapUrl(place) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place)}`;
}

function mapSearchUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function renderTripAdvisorBadge({ map, title, key } = {}) {
  const info = getTripAdvisorInfo({ map, title, key });
  if (!info?.url) return "";

  const ratingLabel = tripAdvisorRatingLabel(info.rating);
  const reviewLabel = formatTripAdvisorReviews(info.reviews);
  const ratingContent = ratingLabel
    ? `<strong>${ratingLabel}</strong><span class="tripadvisor-bubbles" aria-hidden="true">${"●".repeat(Math.min(5, Math.round(info.rating)))}${"○".repeat(Math.max(0, 5 - Math.round(info.rating)))}</span>${reviewLabel ? `<span class="tripadvisor-count">(${reviewLabel})</span>` : ""}`
    : `<span class="tripadvisor-cta">Bewertungen ansehen</span>`;

  return `<a class="tripadvisor-badge" href="${info.url}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(title)} auf TripAdvisor ansehen"><span class="tripadvisor-brand">TripAdvisor</span>${ratingContent}</a>`;
}

function initStaticTripAdvisorBadges() {
  document.querySelectorAll("[data-tripadvisor-map]").forEach((slot) => {
    slot.innerHTML = renderTripAdvisorBadge({
      map: slot.dataset.tripadvisorMap,
      title: slot.dataset.tripadvisorTitle,
      key: slot.dataset.tripadvisorKey
    });
  });
}

const MOBILE_GUIDE_BREAKPOINT = 620;
const MOBILE_GUIDE_LIMIT = 4;
const GUIDE_GRID_MIN_COLUMN = 320;
const GUIDE_GRID_GAP = 16;

function getGuideGridColumns(grid) {
  const width = grid?.clientWidth || document.querySelector("main")?.clientWidth || window.innerWidth;
  return Math.max(1, Math.floor((width + GUIDE_GRID_GAP) / (GUIDE_GRID_MIN_COLUMN + GUIDE_GRID_GAP)));
}

function guideDisplayLimit(grid) {
  if (window.matchMedia(`(max-width: ${MOBILE_GUIDE_BREAKPOINT}px)`).matches) {
    return MOBILE_GUIDE_LIMIT;
  }

  const columns = getGuideGridColumns(grid);
  return Math.ceil(MOBILE_GUIDE_LIMIT / columns) * columns;
}

function guideItems(destinationKey, category, family, limit = MOBILE_GUIDE_LIMIT) {
  const catalog = guideCatalog[destinationKey] || guideCatalog.pula;
  return catalog[category]
    .map((key) => guidePlaces[category][key])
    .filter(Boolean)
    .sort((first, second) => {
      const hasChildren = family.children > 0;
      const agesComplete = childAgesComplete(family);
      const youngestAge = agesComplete && hasChildren ? Math.min(...family.childAges) : 0;
      const firstEligible = !hasChildren || first.suitability.minAge <= youngestAge;
      const secondEligible = !hasChildren || second.suitability.minAge <= youngestAge;

      if (firstEligible !== secondEligible) return firstEligible ? -1 : 1;

      const priorityKey = hasChildren ? "family" : "adult";
      const groupWeight = family.adults + family.children >= 5 ? 2 : 0;
      const firstScore = first.suitability[priorityKey] * 10
        + first.suitability.groups * groupWeight;
      const secondScore = second.suitability[priorityKey] * 10
        + second.suitability.groups * groupWeight;
      return secondScore - firstScore;
    })
    .slice(0, limit);
}

function personalizedGuideMeta(item, family) {
  const meta = [...item.meta];
  if (family.children > 0) {
    const agesComplete = childAgesComplete(family);
    const youngestAge = agesComplete ? Math.min(...family.childAges) : 0;
    if (item.suitability.minAge > youngestAge) {
      meta.unshift(`⚠ empfohlen ab ${item.suitability.minAge} Jahren`);
    } else if (item.suitability.family >= 5) {
      meta.unshift("✓ besonders familienfreundlich");
    }
  }
  if (family.adults + family.children >= 5 && item.suitability.groups >= 5) {
    meta.unshift("👥 gut für größere Familien");
  }
  if (item.suitability.note) meta.push(`ℹ ${item.suitability.note}`);
  return meta.slice(0, 4);
}

function renderGuideCards(grid, destinationKey, category, label, family) {
  const limit = guideDisplayLimit(grid);
  const items = guideItems(destinationKey, category, family, limit);
  grid.innerHTML = items.map((item) => {
    const favorite = {
      id: `guide:${category}:${item.key}`,
      title: item.title,
      description: item.description,
      icon: item.icon,
      map: item.map,
      category: label
    };
    registerFavorite(favorite);
    return `
      <article class="guide-card">
        <button class="location-favorite" type="button" data-favorite-id="${favorite.id}" aria-label="${item.title} als Favorit markieren" aria-pressed="false">♡</button>
        <div class="guide-card-icon" aria-hidden="true">${item.icon}</div>
        <div class="guide-card-copy">
          <span class="guide-card-label">${label}</span>
          <h3><a class="place-link" href="${mapUrl(item.map)}" target="_blank" rel="noopener noreferrer">${item.title}<span aria-hidden="true">↗</span></a></h3>
          <p>${item.description}</p>
          ${renderTripAdvisorBadge({ map: item.map, title: item.title, key: `${category}:${item.key}` })}
          <div class="guide-card-bottom">
            <div class="guide-card-meta">${personalizedGuideMeta(item, family).map((entry) => `<span>${entry}</span>`).join("")}</div>
            <a class="guide-map-link" href="${mapUrl(item.map)}" target="_blank" rel="noopener noreferrer" aria-label="${item.title} in Google Maps öffnen">🗺️ Google Maps</a>
          </div>
        </div>
      </article>
    `;
  }).join("");
  syncFavoriteButtons();
}

function renderDiscoveryGuides() {
  const destinationKey = destinationSelect.value;
  const destination = istriaDestinations[destinationKey];
  const family = getFamilySettings();
  const destinationLabel = destination.name.toLocaleUpperCase("de-DE");

  document.querySelector("#beach-guide-destination").textContent = destinationLabel;
  document.querySelector("#trip-guide-destination").textContent = destinationLabel;
  document.querySelector("#food-guide-destination").textContent = destinationLabel;

  beachGuideMap.href = mapSearchUrl(`Strände ${destination.name} Istrien`);
  tripGuideMap.href = mapSearchUrl(`Ausflüge ${destination.name} Istrien`);
  foodGuideMap.href = mapSearchUrl(`Restaurants Bars ${destination.name} Istrien`);

  let familyContext = `${family.adults} ${family.adults === 1 ? "Erwachsener" : "Erwachsene"}`;
  if (family.children > 0 && childAgesComplete(family)) {
    familyContext += ` · ${family.children} ${family.children === 1 ? "Kind" : "Kinder"} (${family.childAges.join(", ")} J.)`;
  } else if (family.children > 0) {
    familyContext += " · Kinderalter bitte oben ergänzen";
  } else {
    familyContext += " · ohne Kinder";
  }
  [beachGuideContext, tripGuideContext, foodGuideContext].forEach((element) => {
    element.textContent = `Persönlich sortiert für: ${familyContext}`;
    element.classList.toggle("warning", family.children > 0 && !childAgesComplete(family));
  });

  renderGuideCards(beachGuideGrid, destinationKey, "beaches", "STRAND", family);
  renderGuideCards(tripGuideGrid, destinationKey, "trips", "TAGESAUSFLUG", family);
  renderGuideCards(foodGuideGrid, destinationKey, "food", "ESSEN & TRINKEN", family);
}

function renderPlan(animate = false) {
  const plans = getPlans();
  const plan = plans[planIndex % plans.length];

  document.querySelector("#plan-name").textContent = plan.name;
  document.querySelector("#stop-count").textContent = plan.stops.length;
  document.querySelector("#distance").textContent = plan.distance;
  document.querySelector("#budget").textContent = plan.budget;

  itinerary.innerHTML = plan.stops.map((stop) => {
    const favorite = {
      id: `stop:${encodeURIComponent(stop.map)}`,
      title: stop.title,
      description: stop.description,
      icon: stop.icon,
      map: stop.map,
      category: stop.type
    };
    registerFavorite(favorite);
    return `
      <article class="stop">
        <time class="time">${stop.time}</time>
        <div class="stop-content">
          <div class="stop-top">
            <span class="stop-type">${stop.type}</span>
            <span class="stop-duration">◷ ${stop.duration}</span>
            <button class="location-favorite stop-favorite" type="button" data-favorite-id="${favorite.id}" aria-label="${stop.title} als Favorit markieren" aria-pressed="false">♡</button>
          </div>
          <h3><a class="place-link" href="${mapUrl(stop.map)}" target="_blank" rel="noopener noreferrer">${stop.title}<span aria-hidden="true">↗</span></a></h3>
          <p>${stop.description}</p>
          ${renderTripAdvisorBadge({ map: stop.map, title: stop.title })}
          <div class="stop-meta">${stop.meta.map((item) => `<span>${item}</span>`).join("")}</div>
        </div>
        <div class="stop-image">
          <span aria-hidden="true">${stop.icon}</span>
          <a class="map-link" href="${mapUrl(stop.map)}" target="_blank" rel="noopener noreferrer" aria-label="${stop.title} in Google Maps öffnen">🗺️ Google Maps</a>
        </div>
      </article>
    `;
  }).join("");
  syncFavoriteButtons();

  if (animate) {
    itinerary.classList.remove("replanning");
    requestAnimationFrame(() => itinerary.classList.add("replanning"));
  }
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function updateDate() {
  const formatted = new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long"
  }).format(new Date());
  document.querySelector("#current-date").textContent = formatted.toLocaleUpperCase("de-DE");
}

const featuredFavoriteItems = [
  {
    id: "guide:trips:kamenjak",
    title: "Sonnenuntergang am Kap Kamenjak",
    description: "Wilde Küste, kleine Buchten und der schönste Blick aufs Abendrot.",
    icon: "🌅",
    map: "Cape Kamenjak Croatia",
    category: "GEHEIMTIPP"
  },
  {
    id: "guide:food:pulaMarket",
    title: "Tržnica – Pulas Markthalle",
    description: "Frisches Obst, lokale Snacks und echtes istrisches Lebensgefühl.",
    icon: "🍅",
    map: "Pula Market Croatia",
    category: "MARKT"
  }
];

function registerFavorite(item) {
  favoriteRegistry.set(item.id, item);
}

featuredFavoriteItems.forEach(registerFavorite);

function normalizeFavorite(item) {
  if (!item || typeof item !== "object") return null;
  const required = ["id", "title", "description", "icon", "map", "category"];
  if (!required.every((key) => typeof item[key] === "string" && item[key])) return null;
  return Object.fromEntries(required.map((key) => [key, item[key]]));
}

function getSavedFavorites() {
  try {
    const parsed = JSON.parse(localStorage.getItem("bura-favorites") || "[]");
    if (!Array.isArray(parsed)) return [];
    if (parsed.every((item) => Number.isInteger(item))) {
      return parsed
        .map((index) => featuredFavoriteItems[index])
        .filter(Boolean);
    }
    return parsed.map(normalizeFavorite).filter(Boolean);
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem("bura-favorites", JSON.stringify(favorites));
  } catch {
    // The prototype remains usable when browser storage is unavailable.
  }
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function renderFavorites() {
  const saved = getSavedFavorites();
  favoritesEmpty.hidden = saved.length > 0;
  document.querySelector("#clear-favorites").disabled = saved.length === 0;
  favoritesGrid.innerHTML = saved.map((item) => `
    <article class="favorite-place-card">
      <div class="favorite-place-icon" aria-hidden="true">${escapeHTML(item.icon)}</div>
      <div>
        <span>${escapeHTML(item.category)}</span>
        <h3><a class="place-link" href="${mapUrl(item.map)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.title)}<span aria-hidden="true">↗</span></a></h3>
        <p>${escapeHTML(item.description)}</p>
        ${renderTripAdvisorBadge({ map: item.map, title: item.title })}
        <a href="${mapUrl(item.map)}" target="_blank" rel="noopener noreferrer">🗺️ Google Maps</a>
      </div>
      <button class="location-favorite selected" type="button" data-favorite-id="${escapeHTML(item.id)}" aria-label="${escapeHTML(item.title)} aus Favoriten entfernen" aria-pressed="true">♥</button>
    </article>
  `).join("");
}

function syncFavoriteButtons() {
  const savedIDs = new Set(getSavedFavorites().map((item) => item.id));
  document.querySelectorAll("[data-favorite-id]").forEach((button) => {
    const selected = savedIDs.has(button.dataset.favoriteId);
    button.classList.toggle("selected", selected);
    button.textContent = selected ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(selected));
    const item = favoriteRegistry.get(button.dataset.favoriteId);
    if (item) {
      button.setAttribute(
        "aria-label",
        selected
          ? `${item.title} aus Favoriten entfernen`
          : `${item.title} als Favorit markieren`
      );
    }
  });
}

function syncFavorites() {
  const saved = getSavedFavorites();
  favoriteCount.textContent = saved.length;
  renderFavorites();
  syncFavoriteButtons();
}

function toggleFavorite(favoriteID) {
  const saved = getSavedFavorites();
  const selected = saved.some((item) => item.id === favoriteID);
  const next = selected
    ? saved.filter((item) => item.id !== favoriteID)
    : [...saved, favoriteRegistry.get(favoriteID)].filter(Boolean);
  saveFavorites(next);
  syncFavorites();
  showToast(selected ? "Aus Favoriten entfernt" : "Für später gemerkt ♥");
}

destinationSelect.addEventListener("change", () => {
  planIndex = 0;
  weatherManuallySelected = false;
  saveDestination(destinationSelect.value);
  updateDestinationUI();
  renderPlan(true);
  renderDiscoveryGuides();
  refreshLiveWeather({ applyToPlan: true });
  scheduleNotificationTagSync();
  const destination = istriaDestinations[destinationSelect.value];
  showToast(`Euer Tagesplan für ${destination.name} ist bereit`);
});

[adultCount, childCount].forEach((input) => {
  input.addEventListener("change", saveFamilySettings);
});

weatherSelect.addEventListener("change", () => {
  planIndex = 0;
  weatherManuallySelected = true;
  renderPlan(true);
  showToast(weatherSelect.value === "rain" ? "Regenoption ist eingeplant ☂" : "Sonnenplan ist zurück ☀");
});

paceSelect.addEventListener("change", () => {
  planIndex = 0;
  renderPlan(true);
  showToast(`Tempo auf „${paceSelect.options[paceSelect.selectedIndex].text}“ angepasst`);
});

replanButton.addEventListener("click", () => {
  const plans = getPlans();
  planIndex = (planIndex + 1) % plans.length;
  renderPlan(true);
  showToast(plans.length > 1 ? "Eine neue Route ist bereit ✦" : "Das ist aktuell unsere beste Route für eure Auswahl");
});

shareButton.addEventListener("click", async () => {
  const destination = istriaDestinations[destinationSelect.value];
  const family = familyDescription();
  const shareData = {
    title: `Unser Familientag in ${destination.name}`,
    text: `Unser ISTRIVA-Tagesplan für ${family}: ${document.querySelector("#plan-name").textContent}`,
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(`${shareData.text} – ${shareData.url}`);
      showToast("Tagesplan wurde in die Zwischenablage kopiert");
    }
  } catch (error) {
    if (error.name !== "AbortError") showToast("Teilen ist in diesem Browser nicht verfügbar");
  }
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-favorite-id]");
  if (!button) return;
  toggleFavorite(button.dataset.favoriteId);
});

document.querySelector("#clear-favorites").addEventListener("click", () => {
  saveFavorites([]);
  syncFavorites();
  showToast("Favoriten wurden geleert");
});

profileButton.addEventListener("click", () => {
  const destination = istriaDestinations[destinationSelect.value];
  showToast(`${familyDescription()} · ${destination.name}`);
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.hidden = false;
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = undefined;
  installButton.hidden = true;
  showToast("ISTRIVA wurde erfolgreich installiert");
});

installButton.addEventListener("click", async () => {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = undefined;
    installButton.hidden = true;
    return;
  }

  showToast("Auf iPhone: Teilen antippen und „Zum Home-Bildschirm“ wählen");
});

notificationButton.addEventListener("click", () => {
  if (isIos && !isStandalone) {
    installButton.hidden = false;
    showToast("Auf iPhone: App zuerst zum Home-Bildschirm hinzufügen und von dort öffnen");
    return;
  }

  if (!oneSignalClient) {
    showToast("Der Benachrichtigungsdienst wird noch geladen");
    return;
  }

  updateNotificationDialog();
  notificationDialog.showModal();
});

saveNotificationsButton.addEventListener("click", saveNotificationPreferences);
disableNotificationsButton.addEventListener("click", disableNotifications);

const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
const isStandalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;

if (isStandalone) {
  document.body.classList.add("standalone");
}

if (isIos && !isStandalone) {
  installButton.hidden = false;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .catch(() => {
        showToast("Offline-Modus konnte nicht aktiviert werden");
      });
  });
}

initializeOneSignal();

window.addEventListener("online", () => {
  refreshLiveWeather({ applyToPlan: !weatherManuallySelected });
  scheduleNotificationTagSync();
});

document.addEventListener("visibilitychange", () => {
  const refreshInterval = 5 * 60 * 1000;
  if (document.visibilityState === "visible") {
    scheduleNotificationTagSync();
    if (Date.now() - lastWeatherRefresh > refreshInterval) {
      refreshLiveWeather({ applyToPlan: !weatherManuallySelected });
    }
  }
});

setInterval(() => {
  refreshLiveWeather({ applyToPlan: !weatherManuallySelected });
}, 15 * 60 * 1000);

let guideResizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(guideResizeTimer);
  guideResizeTimer = setTimeout(() => renderDiscoveryGuides(), 150);
});

const requestedDestination = new URLSearchParams(window.location.search).get("destination");
const initialDestination = requestedDestination && istriaDestinations[requestedDestination]
  ? requestedDestination
  : getSavedDestination();
if (initialDestination) {
  destinationSelect.value = initialDestination;
  saveDestination(initialDestination);
}

updateDate();
syncFavorites();
updateFamilyUI();
updateDestinationUI();
initStaticTripAdvisorBadges();
initWeatherDetailIcons();
renderPlan();
renderDiscoveryGuides();
refreshLiveWeather({ applyToPlan: true });

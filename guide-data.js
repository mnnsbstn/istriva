const guideItem = (title, description, meta, icon, map) => ({
  title, description, meta, icon, map
});

const guidePlaces = {
  beaches: {
    ambrela: guideItem("Bucht von Ambrela", "Klares Wasser, Pinien und mehrere Badebereiche auf Verudela.", ["🌲 Naturschatten", "👟 Badeschuhe"], "🏖️", "Ambrela Beach Pula"),
    gortanova: guideItem("Gortanova Uvala", "Kleine Kiesbucht an der Lungomare mit ruhigem Einstieg und Pinien.", ["♒ sanfter Einstieg", "☕ Café in der Nähe"], "🌊", "Gortanova Uvala Beach Pula"),
    hawaiian: guideItem("Hawaiian Beach", "Türkisfarbene Felsenbucht für sichere Schwimmer und Schnorchler.", ["🤿 Schnorcheln", "⚠ Felszugang"], "🤿", "Hawaiian Beach Verudela"),
    valkane: guideItem("Valkane Beach", "Stadtnaher Strand mit Kies, Plattformen und guter Infrastruktur.", ["♿ gut erreichbar", "☕ Gastronomie"], "🏊", "Valkane Beach Pula"),
    fazanaNorth: guideItem("Fažana Nordstrand", "Familienfreundlicher Kiesstrand direkt an der langen Promenade.", ["👨‍👩‍👧 Familie", "🍦 Promenade"], "🏖️", "Fazana North Beach"),
    badel: guideItem("Badel Beach", "Zentraler Strand mit Blick auf die Brijuni-Inseln.", ["🚶 zentrumsnah", "🌅 Abendlicht"], "🌅", "Badel Beach Fazana"),
    valbandon: guideItem("Valbandon Beach", "Flache Abschnitte, Wiesen und Platz für einen langen Badetag.", ["♒ flache Bereiche", "🧺 Picknick"], "🧺", "Valbandon Beach"),
    biVal: guideItem("Bi Val Beach", "Weitläufige Küste südlich von Fažana mit Sport- und Badebereichen.", ["🏄 Aktivitäten", "☕ Infrastruktur"], "🏄", "Bi Val Beach Fazana"),
    bijeca: guideItem("Bijeca Beach", "Medulins langer Sandstrand mit besonders flachem Wasser.", ["🏖 Sand", "♒ kleine Kinder"], "🏝️", "Bijeca Beach Medulin"),
    albaChiara: guideItem("Alba Chiara Beach", "Kiesstrand mit klarem Wasser und Blick über die Medulin-Bucht.", ["🌊 klares Wasser", "☀ Sonnenschutz"], "🌊", "Alba Chiara Beach Medulin"),
    pinizule: guideItem("Bucht Pinižule", "Wilde Naturbucht am Kap Kamenjak mit Dinosaurierspuren in der Nähe.", ["🌿 Naturbucht", "💧 Wasser mitnehmen"], "🦕", "Pinizule Beach Kamenjak"),
    skoljic: guideItem("Školjić Beach", "Geschützte Kamenjak-Bucht für Baden, Kajak und entspannte Pausen.", ["🛶 Kajak", "👟 Badeschuhe"], "🛶", "Skoljic Beach Kamenjak"),
    lone: guideItem("Lone Bay", "Beliebte Kiesbucht am Waldpark Zlatni Rt, gut zu Fuß erreichbar.", ["🌲 Pinien", "☕ Strandbar"], "🌳", "Lone Bay Rovinj"),
    borik: guideItem("Borik Beach", "Familienstrand mit sanftem Einstieg, Spielmöglichkeiten und Gastronomie.", ["👨‍👩‍👧 Familie", "♿ Zugänge"], "🏖️", "Borik Beach Rovinj"),
    cuvi: guideItem("Cuvi Beach", "Lange, ruhige Küste südlich von Rovinj mit viel Platz unter Bäumen.", ["🌲 Schatten", "🚲 gut per Rad"], "🚲", "Cuvi Beach Rovinj"),
    mulini: guideItem("Mulini Beach", "Gepflegter Strand nahe der Altstadt mit Promenade und Abendblick.", ["🚶 Promenade", "🌅 Sonnenuntergang"], "🌅", "Mulini Beach Rovinj"),
    brulo: guideItem("Brulo Beach", "Schattige Familienbucht südlich der Porečer Altstadt.", ["🌲 Pinien", "♒ guter Einstieg"], "🏖️", "Brulo Beach Porec"),
    materada: guideItem("Materada Beach", "Kies- und Felsabschnitte mit weitem Blick nördlich von Poreč.", ["🌊 Badeplateaus", "☕ Infrastruktur"], "🌊", "Materada Beach Porec"),
    zelenaLaguna: guideItem("Zelena Laguna", "Mehrere Badebuchten mit Sport, Schatten und familiengerechten Wegen.", ["🏄 Sport", "🌲 Schatten"], "🏄", "Zelena Laguna Beach Porec"),
    valMarea: guideItem("Val Marea Family Beach", "Auf Familien ausgerichteter Strand mit flachen Bereichen und Angeboten vor Ort.", ["👨‍👩‍👧 Familie", "♒ flacher Bereich"], "👨‍👩‍👧", "Val Marea Sandy Family Beach Porec"),
    vrsarCity: guideItem("Stadtstrand Vrsar", "Zentraler Kiesstrand nahe Hafen und Altstadt.", ["🚶 kurze Wege", "🍦 Hafen"], "🏖️", "Vrsar City Beach"),
    petalon: guideItem("Petalon Beach", "Ruhige Buchten und Felsplateaus südlich von Vrsar.", ["🌿 grüne Umgebung", "🤿 Schnorcheln"], "🤿", "Petalon Beach Vrsar"),
    portoSole: guideItem("Porto Sole Beach", "Weitläufiger Badebereich mit Wiesen, Kies und Sportangeboten.", ["🧺 Liegewiesen", "🏄 Aktivitäten"], "🏄", "Porto Sole Beach Vrsar"),
    belvedere: guideItem("Belvedere Beach", "Terrassierte Küste mit Inselblick und Nähe zur Promenade.", ["◉ Inselblick", "☕ Gastronomie"], "🔭", "Belvedere Beach Vrsar"),
    karpinjan: guideItem("Karpinjan Beach", "Flacher Einstieg, Pinien und viel Platz nördlich der Altstadt.", ["♒ flacher Einstieg", "🌲 Schatten"], "🏖️", "Karpinjan Beach Novigrad"),
    maestral: guideItem("Maestral Beach", "Gepflegter Stadtstrand mit Badeplateaus und Angeboten für Familien.", ["👨‍👩‍👧 Familie", "☕ Infrastruktur"], "🏊", "Maestral Beach Novigrad"),
    pineta: guideItem("Pineta Beach", "Ruhigere Küste unter Pinien mit Blick auf Novigrad.", ["🌲 Pinien", "🌅 Stadtblick"], "🌲", "Pineta Beach Novigrad"),
    rivarela: guideItem("Rivarela Beach", "Kompakter Strand direkt an der Stadtmauer und Uferpromenade.", ["🚶 Altstadtnähe", "🌅 Abendrunde"], "🌅", "Rivarela Beach Novigrad"),
    stella: guideItem("Laguna Stella Maris", "Geschützte Lagune mit flachem Wasser und guter Familieninfrastruktur.", ["♒ flaches Wasser", "🌲 Schatten"], "🏖️", "Stella Maris Beach Umag"),
    katoro: guideItem("Katoro Beach", "Aktiver Familienstrand mit Sport, Spielbereichen und Promenade.", ["🏄 Sport", "👨‍👩‍👧 Familie"], "🏄", "Katoro Beach Umag"),
    zambratija: guideItem("Zambratija Beach", "Seltene sandige Abschnitte und flaches Wasser nahe Savudrija.", ["🏖 Sandabschnitte", "♒ flach"], "🏝️", "Zambratija Beach"),
    kanegra: guideItem("Kanegra Beach", "Kiesbucht in grüner Umgebung nördlich von Umag.", ["🌿 Natur", "👟 Badeschuhe"], "🌿", "Kanegra Beach"),
    girandella: guideItem("Girandella Beach", "Klares Wasser und vielfältige Badebereiche an Rabacs Promenade.", ["🏖 Blaue Flagge", "☕ Infrastruktur"], "🏖️", "Girandella Beach Rabac"),
    maslinica: guideItem("Maslinica Beach", "Große, geschützte Bucht mit flacherem Einstieg bei Rabac.", ["♒ Familienbucht", "🧺 viel Platz"], "👨‍👩‍👧", "Maslinica Beach Rabac"),
    lanternaRabac: guideItem("Lanterna Beach Rabac", "Kleine Kiesbuchten mit klarem Wasser nahe dem Ortszentrum.", ["🤿 klares Wasser", "🚶 zentrumsnah"], "🤿", "Lanterna Beach Rabac"),
    ravni: guideItem("Ravni Beach", "Ruhigere Ostküstenbucht mit weitem Blick auf die Kvarner-Bucht.", ["🌿 ruhig", "🚗 Küstenausflug"], "🌊", "Ravni Beach Istria"),
    lanternaPorec: guideItem("Lanterna Beach", "Weitläufige Küste zwischen Novigrad und Poreč für einen ganzen Badetag.", ["🚗 Küstenausflug", "☕ Infrastruktur"], "🏖️", "Lanterna Beach Porec"),
    moscenicka: guideItem("Mošćenička Draga", "Langer Kiesstrand an der Kvarner-Küste unterhalb der Altstadt Mošćenice.", ["🚗 Tagesausflug", "🌊 Kvarner"], "🏖️", "Moscenicka Draga Beach"),
    brsec: guideItem("Brseč Beach", "Kleine türkisfarbene Bucht unterhalb des historischen Dorfes Brseč.", ["🌊 Naturbucht", "⚠ steiler Zugang"], "🌊", "Brsec Beach Croatia")
  },
  trips: {
    brijuni: guideItem("Nationalpark Brijuni", "Bootsfahrt ab Fažana, Inselbahn, Tierwelt und historische Spuren.", ["⛴ vorab buchen", "👨‍👩‍👧 Familienausflug"], "🦓", "Brijuni National Park Fazana"),
    kamenjak: guideItem("Kap Kamenjak", "Wilde Küste, Dinosaurierpfad und viele kleine Buchten im Naturpark.", ["🌿 Naturpark", "💧 Wasser mitnehmen"], "🦕", "Cape Kamenjak Premantura"),
    aquarium: guideItem("Aquarium Pula", "Meereswelt und Schildkrötenstation in der historischen Festung Verudela.", ["☂ wetterfest", "🐢 Kinderhighlight"], "🐢", "Aquarium Pula"),
    rovinjOld: guideItem("Rovinjer Altstadt", "Autofreie Gassen, Hafen und Aussicht an der Kirche der Hl. Euphemia.", ["🚶 zu Fuß", "📷 Fotostopps"], "🏘️", "Rovinj Old Town"),
    pulaArena: guideItem("Arena & Altstadt Pula", "Römische Geschichte, Markt und kompakte Wege durch das Stadtzentrum.", ["🏛 Geschichte", "🍦 Eispause"], "🏛️", "Arena Pula"),
    vodnjan: guideItem("Vodnjan & Olivenöl", "Steinhäuser, Street Art und regionale Produzenten im Hinterland.", ["🎨 Altstadt", "🫒 regionale Produkte"], "🫒", "Vodnjan Old Town"),
    dinoTrail: guideItem("Dinosaurierpfad Kamenjak", "Kurzer Naturweg zu Modellen und fossilen Spuren am Kap.", ["🦕 Kinderhighlight", "👟 feste Schuhe"], "🦕", "Dinosaur Trail Kamenjak"),
    vizula: guideItem("Archäologiepark Vižula", "Spazierwege über die Halbinsel mit römischen Villenresten.", ["🏺 Eintritt frei", "♿ Hauptwege"], "🏺", "Vizula Archaeological Park"),
    lim: guideItem("Lim-Bucht", "Aussichtspunkte, Bootsfahrten und grüne Hänge zwischen Rovinj und Vrsar.", ["⛵ Boot optional", "🌿 Landschaft"], "⛵", "Lim Fjord Croatia"),
    bale: guideItem("Bale", "Ruhige mittelalterliche Gassen, Steinhäuser und ein kompakter Ortskern.", ["🏘️ Kleinstadt", "🚶 kurze Runde"], "🏘️", "Bale Old Town Croatia"),
    vrsarTown: guideItem("Vrsar & Aussichtspunkte", "Steile Altstadtgassen und weiter Blick über die Inselwelt.", ["🔭 Panorama", "↟ Steigung"], "🔭", "Vrsar Old Town"),
    porecBasilica: guideItem("Euphrasius-Basilika", "UNESCO-Mosaike, Museum und römische Straßen im Herzen von Poreč.", ["★ UNESCO", "🎟 Eintritt"], "✨", "Euphrasian Basilica Porec"),
    baredine: guideItem("Baredine-Höhle", "Geführte Tour durch kühle Tropfsteinhallen nahe Poreč.", ["❄ 14 °C", "🎟 Führung"], "🦎", "Baredine Cave"),
    motovun: guideItem("Motovun", "Bergstadt, Stadtmauer und großer Blick über das Mirna-Tal.", ["🏰 Panorama", "↟ steiler Anstieg"], "🏰", "Motovun Old Town"),
    groznjan: guideItem("Grožnjan", "Ateliers, Musik und stille Gassen im Künstlerdorf.", ["🎨 Galerien", "📷 Fotostopps"], "🎨", "Groznjan Old Town"),
    novigradTown: guideItem("Novigrad & Mandrač", "Fischerhafen, Stadtmauer und entspannte Uferpromenade.", ["⚓ Hafen", "🚶 kompakt"], "⚓", "Mandrac Novigrad"),
    savudrija: guideItem("Leuchtturm Savudrija", "Küstenrunde zum ältesten aktiven Leuchtturm der Adria.", ["💡 Außenbesuch", "🌊 Küste"], "💡", "Savudrija Lighthouse"),
    labinOld: guideItem("Labiner Altstadt", "Bergstadtgassen, Fortica-Aussicht und Bergbaugeschichte.", ["⛏ Geschichte", "◉ Aussicht"], "⛏️", "Labin Old Town"),
    ucka: guideItem("Naturpark Učka", "Berglandschaft, Aussichtspunkte und Wanderwege über der Ostküste.", ["🥾 Wandern", "🌦 Wetter prüfen"], "🥾", "Ucka Nature Park"),
    rasa: guideItem("Raša & Bergbauerbe", "Planstadt und Industriekultur im Tal unterhalb von Labin.", ["⛏ Industriekultur", "🚗 kurze Fahrt"], "🏭", "Rasa Istria"),
    parenzana: guideItem("Parenzana", "Ehemalige Bahntrasse mit Viadukten, Tunneln und Mirna-Blicken.", ["🚲 Rad & Wandern", "🔦 Tunnel"], "🚂", "Parenzana Trail Istria"),
    humRoc: guideItem("Hum, Roč & Glagolitische Allee", "Kleine historische Orte und elf Denkmäler entlang der Landstraße.", ["📜 Kulturerbe", "🚗 Rundfahrt"], "🔤", "Hum Roc Glagolitic Alley"),
    sevenWaterfalls: guideItem("Weg der sieben Wasserfälle", "Lange Rundwanderung ab Buzet durch Schluchten und alte Dörfer.", ["🥾 anspruchsvoll", "⚠ Wetter prüfen"], "💧", "Seven Waterfalls Trail Buzet"),
    kotli: guideItem("Kotli", "Alte Mühlen und ausgewaschene Kalksteinbecken an der Mirna.", ["🌿 Naturdenkmal", "⚠ bei Nässe rutschig"], "💧", "Kotli Istria"),
    pazin: guideItem("Pazin & Schlucht", "Burg, Ethnografisches Museum und die markante Paziner Schlucht.", ["🏰 Burg", "🌿 Schlucht"], "🏰", "Pazin Castle Croatia")
  },
  food: {
    pulaMarket: guideItem("Pulas Markthalle", "Fisch, Obst, Käse und kleine Cafés rund um die historische Markthalle.", ["🥕 morgens", "☕ Markt-Cafés"], "🍅", "Pula Market"),
    pulaForum: guideItem("Konobas rund ums Forum", "Istrische Pasta, Fisch und familienfreundliche Terrassen in der Altstadt.", ["🍝 regionale Küche", "📞 abends reservieren"], "🍝", "Konoba Forum Pula"),
    lungomareBars: guideItem("Lungomare & Strandbars", "Getränke und kleine Speisen entlang Pulas Küstenpromenade.", ["🍹 Abend", "🌅 Meeresblick"], "🍹", "Beach bars Lungomare Pula"),
    verudelaDining: guideItem("Verudela: Essen am Meer", "Restaurants, Eisdielen und Bars nahe den Badebuchten.", ["🐟 Fisch & Pasta", "🍦 familienfreundlich"], "🐟", "Restaurants Verudela Pula"),
    fazanaHarbor: guideItem("Fažanas Hafen-Konobas", "Fisch vom Grill, Pasta und Terrassen entlang der Uferpromenade.", ["🐟 Fisch", "🌅 Hafenblick"], "🐟", "Konoba Fazana Harbour"),
    valbandonBars: guideItem("Valbandon: Strandbars & Snacks", "Unkomplizierte Pausen nahe Strand und Campingküste.", ["🍹 Strandbar", "🥪 kleine Speisen"], "🥪", "Beach bars Valbandon"),
    vodnjanFood: guideItem("Konobas rund um Vodnjan", "Rustikale Küche, Olivenöl und saisonale Gerichte im Hinterland.", ["🫒 Olivenöl", "🍖 regionale Küche"], "🫒", "Konoba Vodnjan"),
    brijuniDining: guideItem("Genusspause auf Brijuni", "Restaurants und Cafés rund um den Hafen von Veliki Brijun.", ["⛴ nur mit Inselbesuch", "☕ Hafen"], "☕", "Restaurants Veliki Brijun"),
    medulinPromenade: guideItem("Medulins Hafenpromenade", "Große Auswahl an Pasta, Fisch, Pizza und Eisdielen.", ["🍕 Familienauswahl", "🌅 Abendrunde"], "🍕", "Restaurants Medulin Harbour"),
    premanturaFood: guideItem("Premantura: Konobas & Bars", "Entspannte Lokale als Abschluss nach einem Tag am Kamenjak.", ["🍝 Konoba", "🍹 Abend"], "🍲", "Konoba Premantura"),
    pomerMarina: guideItem("Marina Pomer", "Ruhige Terrassen und Restaurants mit Blick auf die geschützte Bucht.", ["⛵ Marinablick", "🐟 Fisch"], "⛵", "Restaurants Marina Pomer"),
    liznjanFood: guideItem("Ližnjan: Dorf-Konobas", "Lokale Küche abseits der großen Promenaden.", ["🍲 ruhig", "📞 Zeiten prüfen"], "🍲", "Konoba Liznjan"),
    rovinjMarket: guideItem("Rovinjer Markt", "Obst, Käse, Olivenöl und Fisch direkt am Rand der Altstadt.", ["🥕 morgens", "🫒 regionale Produkte"], "🍅", "Rovinj Market"),
    rovinjOldFood: guideItem("Konobas in Rovinjs Altstadt", "Kleine Terrassen, Fisch und istrische Klassiker in den Gassen.", ["🐟 Fisch", "📞 reservieren"], "🍝", "Konoba Rovinj Old Town"),
    rovinjBars: guideItem("Hafenbars & Abendblick", "Aperitif, Eis und kleine Gerichte entlang des Rovinjer Hafens.", ["🍹 Aperitif", "🌅 Hafen"], "🍹", "Bars Rovinj Harbour"),
    limSeafood: guideItem("Muscheln an der Lim-Bucht", "Fisch- und Muschelrestaurants nahe den Zuchtgebieten der Bucht.", ["🦪 Muscheln", "🚗 Ausflugslokal"], "🦪", "Seafood restaurants Lim Fjord"),
    porecMarket: guideItem("Markt von Poreč", "Saisonales Obst, Käse und regionale Produkte nahe der Altstadt.", ["🥕 morgens", "🫒 lokale Produkte"], "🍅", "Porec Market"),
    porecOldFood: guideItem("Altstadt-Restaurants Poreč", "Pasta, Fisch und Pizzerien entlang Decumanus und Marafor.", ["🍝 große Auswahl", "🍕 Familie"], "🍝", "Restaurants Porec Old Town"),
    porecWaterfront: guideItem("Uferpromenade & Bars", "Drinks, Eis und Abendessen mit Blick auf Hafen und Insel Sveti Nikola.", ["🍹 Abend", "🌅 Hafenblick"], "🍹", "Bars Porec waterfront"),
    funtanaFood: guideItem("Funtana: Konobas am Meer", "Fischrestaurants und traditionelle Küche südlich von Poreč.", ["🐟 Fisch", "📞 reservieren"], "🐟", "Konoba Funtana Istria"),
    vrsarHarbor: guideItem("Vrsarer Hafenrestaurants", "Fisch, Pasta und Eis direkt an Booten und Promenade.", ["⚓ Hafen", "🐟 Fisch"], "🐟", "Restaurants Vrsar Harbour"),
    vrsarOldFood: guideItem("Altstadt-Konobas Vrsar", "Kleine Lokale oberhalb des Hafens mit istrischer Küche.", ["🍲 Konoba", "↟ Altstadt"], "🍲", "Konoba Vrsar Old Town"),
    novigradMandrac: guideItem("Essen am Mandrač", "Terrassen rund um den Fischerhafen mit Fisch und Pasta.", ["⚓ Fischerhafen", "🐟 Fisch"], "🐟", "Restaurants Mandrac Novigrad"),
    novigradOldFood: guideItem("Novigrader Altstadt-Lokale", "Konobas, Bistros und Eisdielen innerhalb der Stadtmauer.", ["🍝 regionale Küche", "🍦 Familie"], "🍝", "Restaurants Novigrad Old Town"),
    novigradMarket: guideItem("Novigrader Markt", "Kleine Marktstände und regionale Produkte nahe dem Zentrum.", ["🥕 morgens", "🫒 lokal"], "🍅", "Novigrad Market Croatia"),
    karpinjanBars: guideItem("Karpinjan: Cafés & Strandbars", "Lockere Getränkepause nach dem Badetag an der Promenade.", ["🍹 Strandbar", "🚶 Promenade"], "🍹", "Beach bars Karpinjan Novigrad"),
    umagOldFood: guideItem("Umags Altstadt-Restaurants", "Pasta, Fisch und familienfreundliche Lokale in den venezianischen Gassen.", ["🍝 Auswahl", "📞 abends reservieren"], "🍝", "Restaurants Umag Old Town"),
    umagHarbor: guideItem("Hafenbars Umag", "Aperitif und kleine Speisen mit Blick auf Boote und Ufer.", ["🍹 Abend", "⚓ Hafen"], "🍹", "Bars Umag Harbour"),
    savudrijaFish: guideItem("Fischlokale in Savudrija", "Küstenküche und Tagesfang rund um Hafen und Leuchtturm.", ["🐟 Fisch", "🌅 Küste"], "🐟", "Seafood restaurants Savudrija"),
    bujeFood: guideItem("Konobas rund um Buje", "Istrische Küche, Wein und Olivenöl im nordwestlichen Hinterland.", ["🍷 Weinregion", "🫒 Olivenöl"], "🍷", "Konoba Buje Istria"),
    labinOldFood: guideItem("Konobas in Labins Altstadt", "Pasta, Fleischgerichte und Terrassen in der Bergstadt.", ["🍲 regionale Küche", "◉ Aussicht"], "🍲", "Restaurants Labin Old Town"),
    rabacPromenade: guideItem("Rabacer Promenade", "Fisch, Pizza, Eis und Bars direkt am Meer.", ["🍕 Familienauswahl", "🌊 Meeresblick"], "🍕", "Restaurants Rabac Promenade"),
    trgetSeafood: guideItem("Fisch in Trget", "Ruhiger Hafenort mit Fischrestaurants an der Raša-Bucht.", ["🐟 Fisch", "🚗 Ausflugslokal"], "🐟", "Seafood restaurants Trget"),
    labinMarket: guideItem("Markt von Labin", "Regionale Produkte zwischen Küsten- und Hinterlandküche.", ["🥕 morgens", "🫒 regional"], "🍅", "Labin Market"),
    motovunTruffle: guideItem("Trüffelküche in Motovun", "Fuži, Pljukanci und saisonale Trüffelgerichte in der Bergstadt.", ["🍄 Trüffel", "📞 reservieren"], "🍄", "Truffle restaurants Motovun"),
    livadeTruffle: guideItem("Livade: Zentrum der Trüffel", "Restaurants und Spezialitätengeschäfte im Mirna-Tal.", ["🍄 Trüffel", "🚗 kurze Fahrt"], "🍄", "Truffle restaurants Livade"),
    groznjanWine: guideItem("Grožnjan: Weinbars & Cafés", "Kleine Terrassen zwischen Galerien und Künstlergassen.", ["🍷 Wein", "🎨 Atmosphäre"], "🍷", "Wine bars Groznjan"),
    oprtaljFood: guideItem("Oprtalj: Konoba-Pause", "Ruhige Hinterlandküche in und um die kleine Bergstadt.", ["🍲 Konoba", "◉ Mirna-Blick"], "🍲", "Konoba Oprtalj"),
    buzetOldFood: guideItem("Buzeter Altstadt-Konobas", "Istrische Hausküche in der historischen Oberstadt.", ["🍲 regionale Küche", "↟ Oberstadt"], "🍲", "Restaurants Buzet Old Town"),
    buzetTruffle: guideItem("Trüffelrestaurants rund um Buzet", "Pasta und saisonale Spezialitäten aus dem Trüffelland.", ["🍄 Trüffel", "📞 Saison prüfen"], "🍄", "Truffle restaurants Buzet"),
    humFood: guideItem("Konoba-Pause in Hum", "Herzhafte Gerichte und regionale Produkte in der kleinsten Stadt.", ["🍲 rustikal", "🚗 Ausflug"], "🍲", "Konoba Hum Croatia"),
    rocFood: guideItem("Roč: lokale Küche", "Ruhige Dorfrestaurants entlang der Glagolitischen Route.", ["🍝 Pasta", "📞 Zeiten prüfen"], "🍝", "Restaurants Roc Istria")
  }
};

const guideSuitability = {
  beaches: {
    ambrela: { family: 5, groups: 4 },
    gortanova: { family: 5, groups: 3 },
    hawaiian: { minAge: 7, family: 2, groups: 2, note: "für sichere Schwimmer" },
    valkane: { family: 5, groups: 5 },
    fazanaNorth: { family: 5, groups: 5 },
    badel: { family: 4, groups: 3 },
    valbandon: { family: 5, groups: 5 },
    biVal: { family: 5, groups: 5 },
    bijeca: { family: 5, groups: 5 },
    albaChiara: { minAge: 4, family: 4, groups: 4 },
    pinizule: { minAge: 5, family: 3, groups: 3, note: "Naturbucht ohne volle Infrastruktur" },
    skoljic: { minAge: 4, family: 4, groups: 4 },
    lone: { family: 5, groups: 5 },
    borik: { family: 5, groups: 5 },
    cuvi: { family: 4, groups: 5 },
    mulini: { minAge: 4, family: 4, groups: 3 },
    brulo: { family: 5, groups: 5 },
    materada: { minAge: 4, family: 4, groups: 4 },
    zelenaLaguna: { family: 5, groups: 5 },
    valMarea: { family: 5, groups: 5 },
    vrsarCity: { family: 5, groups: 4 },
    petalon: { minAge: 5, family: 3, groups: 3 },
    portoSole: { family: 5, groups: 5 },
    belvedere: { minAge: 4, family: 4, groups: 3 },
    karpinjan: { family: 5, groups: 5 },
    maestral: { family: 5, groups: 5 },
    pineta: { family: 4, groups: 4 },
    rivarela: { minAge: 5, family: 3, groups: 2 },
    stella: { family: 5, groups: 5 },
    katoro: { family: 5, groups: 5 },
    zambratija: { family: 5, groups: 4 },
    kanegra: { minAge: 4, family: 4, groups: 4 },
    girandella: { minAge: 4, family: 5, groups: 5 },
    maslinica: { family: 5, groups: 5 },
    lanternaRabac: { minAge: 5, family: 3, groups: 3 },
    ravni: { minAge: 6, family: 3, groups: 3 },
    lanternaPorec: { family: 5, groups: 5 },
    moscenicka: { minAge: 4, family: 4, groups: 5 },
    brsec: { minAge: 8, family: 2, groups: 2, note: "steiler Zugang" }
  },
  trips: {
    brijuni: { minAge: 3, family: 5, groups: 5 },
    kamenjak: { minAge: 4, family: 4, groups: 4 },
    aquarium: { family: 5, groups: 5 },
    rovinjOld: { family: 4, groups: 4 },
    pulaArena: { minAge: 3, family: 5, groups: 5 },
    vodnjan: { family: 4, groups: 4 },
    dinoTrail: { minAge: 3, family: 5, groups: 4 },
    vizula: { family: 5, groups: 5 },
    lim: { minAge: 4, family: 4, groups: 4 },
    bale: { family: 4, groups: 4 },
    vrsarTown: { minAge: 4, family: 4, groups: 3 },
    porecBasilica: { minAge: 4, family: 4, groups: 4 },
    baredine: { minAge: 4, family: 5, groups: 4 },
    motovun: { minAge: 5, family: 4, groups: 3 },
    groznjan: { family: 4, groups: 4 },
    novigradTown: { family: 5, groups: 5 },
    savudrija: { family: 4, groups: 4 },
    labinOld: { minAge: 4, family: 4, groups: 3 },
    ucka: { minAge: 8, family: 3, groups: 3, note: "Wanderung für größere Kinder" },
    rasa: { minAge: 6, family: 3, groups: 4 },
    parenzana: { minAge: 7, family: 4, groups: 4 },
    humRoc: { minAge: 4, family: 4, groups: 4 },
    sevenWaterfalls: { minAge: 10, family: 2, groups: 2, note: "lange, anspruchsvolle Wanderung" },
    kotli: { minAge: 6, family: 3, groups: 3, note: "Felsen können rutschig sein" },
    pazin: { minAge: 5, family: 4, groups: 4 }
  },
  food: {
    lungomareBars: { family: 2, adult: 5, groups: 3 },
    valbandonBars: { family: 3, adult: 4, groups: 4 },
    rovinjBars: { family: 2, adult: 5, groups: 3 },
    porecWaterfront: { family: 3, adult: 5, groups: 4 },
    karpinjanBars: { family: 3, adult: 4, groups: 4 },
    umagHarbor: { family: 3, adult: 5, groups: 4 },
    groznjanWine: { family: 2, adult: 5, groups: 3 },
    pulaMarket: { family: 5, adult: 4, groups: 5 },
    brijuniDining: { family: 5, adult: 3, groups: 5 },
    medulinPromenade: { family: 5, adult: 4, groups: 5 },
    rovinjMarket: { family: 5, adult: 4, groups: 5 },
    porecMarket: { family: 5, adult: 4, groups: 5 },
    novigradMarket: { family: 5, adult: 4, groups: 5 },
    labinMarket: { family: 5, adult: 4, groups: 5 }
  }
};

Object.entries(guidePlaces).forEach(([category, places]) => {
  Object.entries(places).forEach(([key, place]) => {
    place.key = key;
    place.suitability = {
      minAge: 0,
      family: 4,
      adult: 4,
      groups: 4,
      ...(guideSuitability[category]?.[key] || {})
    };
  });
});

const guideCatalog = {
  pula: {
    beaches: ["ambrela", "gortanova", "hawaiian", "valkane", "bijeca", "fazanaNorth"],
    trips: ["brijuni", "kamenjak", "aquarium", "rovinjOld", "pulaArena", "vodnjan"],
    food: ["pulaMarket", "pulaForum", "lungomareBars", "verudelaDining", "fazanaHarbor", "vodnjanFood"]
  },
  fazana: {
    beaches: ["fazanaNorth", "badel", "valbandon", "biVal", "valkane", "ambrela"],
    trips: ["brijuni", "pulaArena", "vodnjan", "kamenjak", "aquarium", "rovinjOld"],
    food: ["fazanaHarbor", "valbandonBars", "vodnjanFood", "brijuniDining", "pulaMarket", "pulaForum"]
  },
  medulin: {
    beaches: ["bijeca", "albaChiara", "pinizule", "skoljic", "ambrela", "gortanova"],
    trips: ["kamenjak", "dinoTrail", "vizula", "aquarium", "pulaArena", "brijuni"],
    food: ["medulinPromenade", "premanturaFood", "pomerMarina", "liznjanFood", "verudelaDining", "pulaMarket"]
  },
  rovinj: {
    beaches: ["lone", "borik", "cuvi", "mulini", "vrsarCity", "fazanaNorth"],
    trips: ["lim", "bale", "vrsarTown", "pulaArena", "brijuni", "porecBasilica"],
    food: ["rovinjMarket", "rovinjOldFood", "rovinjBars", "limSeafood", "vrsarHarbor", "funtanaFood"]
  },
  porec: {
    beaches: ["brulo", "materada", "zelenaLaguna", "valMarea", "vrsarCity", "karpinjan"],
    trips: ["porecBasilica", "baredine", "motovun", "vrsarTown", "groznjan", "lim"],
    food: ["porecMarket", "porecOldFood", "porecWaterfront", "funtanaFood", "vrsarHarbor", "limSeafood"]
  },
  vrsar: {
    beaches: ["vrsarCity", "petalon", "portoSole", "belvedere", "lone", "brulo"],
    trips: ["lim", "rovinjOld", "porecBasilica", "bale", "baredine", "motovun"],
    food: ["vrsarHarbor", "vrsarOldFood", "limSeafood", "funtanaFood", "porecMarket", "rovinjMarket"]
  },
  novigrad: {
    beaches: ["karpinjan", "maestral", "pineta", "rivarela", "materada", "stella"],
    trips: ["novigradTown", "groznjan", "baredine", "porecBasilica", "motovun", "savudrija"],
    food: ["novigradMandrac", "novigradOldFood", "novigradMarket", "karpinjanBars", "porecMarket", "umagOldFood"]
  },
  umag: {
    beaches: ["stella", "katoro", "zambratija", "kanegra", "karpinjan", "pineta"],
    trips: ["savudrija", "groznjan", "novigradTown", "motovun", "humRoc", "baredine"],
    food: ["umagOldFood", "umagHarbor", "savudrijaFish", "bujeFood", "novigradMandrac", "novigradMarket"]
  },
  labin: {
    beaches: ["girandella", "maslinica", "lanternaRabac", "ravni", "brsec", "moscenicka"],
    trips: ["labinOld", "ucka", "rasa", "pulaArena", "pazin", "kamenjak"],
    food: ["labinOldFood", "rabacPromenade", "trgetSeafood", "labinMarket", "liznjanFood", "pomerMarina"]
  },
  motovun: {
    beaches: ["lanternaPorec", "karpinjan", "materada", "lone", "brulo", "valMarea"],
    trips: ["motovun", "groznjan", "parenzana", "pazin", "humRoc", "baredine"],
    food: ["motovunTruffle", "livadeTruffle", "groznjanWine", "oprtaljFood", "buzetTruffle", "bujeFood"]
  },
  buzet: {
    beaches: ["girandella", "maslinica", "moscenicka", "brsec", "lanternaRabac", "ravni"],
    trips: ["sevenWaterfalls", "humRoc", "kotli", "pazin", "motovun", "parenzana"],
    food: ["buzetOldFood", "buzetTruffle", "humFood", "rocFood", "livadeTruffle", "oprtaljFood"]
  }
};

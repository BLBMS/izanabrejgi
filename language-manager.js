/* 044 */
// language-manager.js
// Upravljanje jezikov

// JEZIKOVNI PODATKI - VGRADIMO JIH V JS
const embeddedLanguageData = {
    "languages": {
        // ------------------------------------- SL ---------------------------------------------
        "sl": {
            "meta": {
                "title": "Iža na brejgi",
                "description": "Počitniška hiša v Moravskih Topliceh, Prekmurje"
            },
            "nav": {
                "home": "Domov",
                "description": "Opis",
                "about": "Ponujamo",
                "contact": "Kontakti",
                "map": "Zemljevid",
                "reserve": "Rezerviraj",
                "links": "Povezave"
            },
            "overlays": {
                "description": {
                    "title": "Opis",
                    "content": [
                        "Vrnite se v čase vaših dedkov in babic v prijetno hiško na mirni lokaciji med vinogradi, vendar na sodoben način z vsem udobjem današnjega časa.",
                        "Zaspite v tišini in v soju lune, zbudite se s ptičjim petjem.",
                        "Lahko uživate v naravi na lastnem dvorišču, lahko raziskujete okolico peš ali s kolesom po označenih poteh, lahko pa tudi uživate v bližnjih termalnih kopališčih.",
                        "Prevod iz prekmurščine je Hiša na griču. Beseda grič se lokalno ne uporablja, namesto nje je v uporabi beseda breg, ki je kot hrib, ali narečno brejg. Za prebivalce Spodnjih Moravec (to je nižinski del sedanjih Moravskih Toplic) je bila prva vzpetina v zaledju vasi uporabna predvsem za vinograde. Bolj ravninske predele v bližini kmetij pa so uporabljali kot kmetijska zemljišča.",
                        "Prva omemba hiše datira v leto 1864 in je že označena na prvih kartah. Prvotni namen stavbe je bila viničarija, kjer so živeli delavci s svojimi družinami in so skrbeli za te vinograde. Vinogradi in objekti pa so bili v lasti premožnejših kmetov iz spodnjega dela vasi.",
                        "Hiša je opremljena z restavriranim stilnim pohištvom takratnega časa in veliko kosov presega častitljivo starost 100 let.",
                        "Potrudili smo se, da vas popeljemo na potovanje v preteklost, da si vzamete čas za sebe in svoje najbližje ter mogoče tudi za razmislek o nekdanjih vrednotah, ki v tem prehitrem svetu vedno bolj izginjajo.",
                        "Prosimo, da hišo in pohištvo uporabljate skrbno in pazljivo, da ga bomo čez naslednjih 100 let lahko predali našim vnukom in pravnukom v takem stanju, kot so nam ga predali naši predniki.",
                        "Počitniška hiška se nahaja v naselju Moravske Toplice in to v predelu imenovanem Zgornji Moravci, v mirnem predelu sredi vinogradov in njiv. V bližini je nekaj hiš in vse niso stalno naseljene. Cesta vodi samo do teh hišk in do Gostišča Aleksander, malo naprej. V Gostišču strežejo večerje tudi za zunanje goste in če ste zelo lačni vam obisk močno priporočamo.",
                        "Sama lokacija je zelo primerna za sprehode, kar nekaj poti je krožnih, krajših in daljših in tudi nekaj vzponov se lahko nabere. Še posebej priporočamo obisk kolesarjem, tako cestnim ali treking kot tudi MTB. V stari kleti je zaklenjen prostor za vsa vaša kolesa. Če imate električna, si jih lahko tudi napolnite. Nekaj orodja se najde tudi za hitra popravila. Začetek vaše kolesarske trase je po cestah z malo prometa. Lahko sledite uradno označenim potem ali pa si jih ustvarite z vašo aplikacijo. Naš predlog je seveda, da se zapeljite v naravo, glejte okoli sebe in poslušajte mir. Izogibajte se glavnih cest, kajti številke na aplikaciji vam tega ne bodo zabeležile.",
                        "Za vse kopalne navdušence so seveda v spodnjem delu naselja Moravskih Toplic, imenovanem Spodnji Moravci, bazeni Term 3000 in Hotela Vivat, s savnami in wellnesi. Tam je tudi igrišče za golf in v parku trim steza.",
                        "Tam spodaj se nahaja trgovina, nekaj gostiln in picerija. Za večje nakupe je 8 km vstran regijsko središče Murska Sobota s sodobnimi trgovskimi centri.",
                        "Za ljubitelje bolj domače hrane in pijače pa priporočamo odhod v drugo smer, na Goričko. Priporočamo dve bližnji v Zgornjih Moravcih: Okrepčevalnica pri Goranu in Zeleni gaj. Pred odhodom prosim preverite delovni čas."
                    ]
                },
                "about": {
                    "title": "Ponujamo",
                    "intro1": "Počitniška hiša za 1-4 osebe vključuje:",
                    "items1": [
                        "ločeno spalnico",
                        "dodatno ležišče v dnevnem prostoru",
                        "jedilnico",
                        "celotno opremljeno kuhinjo",
                        "kopalnico s tušem",
                        "dodatnim straniščem",
                        "pokrito teraso",
                        "prostor za shranjevanje koles",
                        "dvema parkirnima mestoma",
                        "televizijo, Wi-Fi, ..."
                    ],
                    "intro2": "Dodatne informacije",
                    "items2": [
                        "Prijava od 14:00, odjava do 11:00.",
                        "Hišni ljubljenčki niso dovoljeni.",
                        "Zabave niso dovoljene.",
                        "Kajenje ni dovoljeno.",
                        "Nočni mir velja med 22.00 in 7.00.",
                        "Cenik velja za najem za od 1 do 4 osebe na nočitev.",
                        "Turistična taksa se plača posebej:",
                        "  - polnoletne osebe 2,50 € na noč,",
                        "  - otroci od 7 do 18 let 1,25 € na noč,",
                        "  - otroci do 7 let in invalidi so opravičeni do plačila turistične takse.",
                        "Vse cene so v EUR. Ne poslujemo z gotovino.",
                        "ID nastanitvenega obrata: 137845",
                        "Kategorizaja: počitniška hiša ***"
                    ],
                    "intro3": "Varnost",
                    "items3": [
                        "Detektor dima in ogljikovega dioksida.",
                        "Nadzorne kamere pokrivajo parkirišče in okolico hiše. Območje za najemnike: vsa okna, terasa in dvorišče pa ni pokrito s kamerami."
                    ],
                    "intro4": "Škoda in odgovornost",
                    "items4": [
                        "Goste prosimo, da z nastanitvijo in opremo ravnajo skrbno.",
                        "Morebitne poškodbe je potrebno takoj prijaviti.",
                        "Gost odgovarja za škodo, ki presega običajno rabo, in je lahko dolžan poravnati stroške popravila ali zamenjave."
                    ],
                },
                "contact": {
                    "title": "Kontakti",
                    "phone": "Telefon:",
                    "phoneValues": [
                        "+386 41 563 873 Tanja",
                        "+386 41 913 001 Marko"
                    ],
                    "email": "Email:",
                    "emailValues": [
                        "izanabrejgi@gmail.com",
                        "iza.na.brejgi@gmail.com"
                    ],
                    "address": "Naslov:",
                    "addressLines": [
                        "Rumičev breg 71",
                        "9226 Moravske Toplice",
                        "Goričko, Prekmurje, Slovenija"
                    ]
                },
            },
            "map": {
                "title": "📍 Iža na brejgi",
                "viewLabel": "Prikaži na zemljevidu",
                "navLabel": "Navigacija / Izračun poti",
                "googleMaps": "Google Maps",
                "appleMaps": "Apple Maps",
                "tip": "Kliknite na gumb za odprtje v aplikaciji ali brskalniku."
            },
            "reserve": {
                "title": "Rezervacija",
                "intro": "Rezervacijo izvedete preko spodnjega portala",
                "items": [
                    "• Ponujamo direktno rezervacijo brez provizije preko lastnega portala. Plačilo je s kreditno kartico.",
                    "• S premikanjem po mesecih lahko preverite tudi razpoložljivost nastanitve.",
                    "• Check-in se izvede preko on-line portala na dan prihoda v nastanitev. Takrat se preko istega portala plača tudi turistična taksa. Plačilo je s kreditno kartico."
                ],
                "button": "Odpri rezervacijski portal"
            },
            "footer": {
                "copyright": "&copy; 2026 Iža na brejgi. Vse pravice pridržane."
            }
        },
        // ------------------------------------- EN ---------------------------------------------
        "en": {
            "meta": {
                "title": "Iža na brejgi",
                "description": "Holiday house in Moravske Toplice, Prekmurje"
            },
            "nav": {
                "home": "Home",
                "description": "Description",
                "about": "We offer",
                "contact": "Contacts",
                "map": "Map",
                "reserve": "Book",
                "links": "Links"
            },
            "overlays": {
                "description": {
                    "title": "Description",
                    "content": [
                        "Return to the times of your grandparents in a cosy little house in a peaceful location among the vineyards - but in a modern way, with all the comfort of today.",
                        "Fall asleep in silence under the moonlight and wake up to the singing of birds.",
                        "You can enjoy nature in your own yard, explore the surroundings on foot or by bike along marked trails, or relax in the nearby thermal spas.",
                        "The translation from the local Prekmurje dialect is 'House on the Hill'. The word grič ('hill') is not used locally; instead, people use breg, which also means a hill, or the dialect version brejg. For the inhabitants of Spodnje Moravce (the lower part of today's Moravske Toplice), the first elevation behind the village was mainly used for vineyards. The flatter areas near the farms were used as agricultural land.",
                        "The first mention of the house dates back to 1864, and it is already marked on the earliest maps. The original purpose of the building was a viničarija - a vintner's house where workers and their families lived while taking care of the vineyards. The vineyards and the buildings were owned by the wealthier farmers from the lower part of the village.",
                        "The house is furnished with restored period furniture, and many pieces are more than 100 years old.",
                        "We have made an effort to take you on a journey into the past - to allow you to take time for yourself and your loved ones, and perhaps to reflect on the old values that are increasingly disappearing in today's fast-paced world.",
                        "Please use the house and furniture with care, so that we can pass them on to our grandchildren and great-grandchildren in the same condition in which they were handed down to us.",
                        "The holiday house is located in the area of Moravske Toplice, in a part called Zgornji Moravci, in a მშვიდ and quiet setting surrounded by vineyards and fields. There are only a few houses nearby, and not all are permanently occupied. The road leads only to these houses and to Aleksander Inn (Gostišče Aleksander), just a bit further up the road. The inn also serves dinners to external guests, and if you are very hungry, we highly recommend a visit.",
                        "The location is perfect for walking and hiking, with several circular routes of varying lengths and some gentle climbs along the way. It is especially ideal for cyclists — whether you prefer road cycling, trekking, or mountain biking (MTB). In the old cellar, there is a locked storage space for your bicycles. If you have e-bikes, you can also charge them there. Basic tools are available for quick repairs.",
                        "Your cycling routes can begin right from the house, along roads with very little traffic. You can follow officially marked cycling routes or create your own using your preferred app. Our suggestion is simple: head into nature, look around, and enjoy the peaceful surroundings. Try to avoid main roads — your app may not reflect the true beauty of the experience.",
                        "For swimming enthusiasts, the lower part of Moravske Toplice, called Spodnji Moravci, offers the Terme 3000 spa complex and Hotel Vivat, with pools, saunas, and wellness facilities. There is also a golf course and a fitness trail in the nearby park.",
                        "In this area, you will also find a grocery store, several restaurants, and a pizzeria. For larger shopping trips, the regional centre of Murska Sobota is just 8 km away and offers modern shopping centres.",
                        "For those who enjoy more traditional local food and drinks, we recommend heading in the opposite direction, towards the Goričko region. Two nearby options in Zgornji Moravci are “Okrepčevalnica pri Goranu” and “Zeleni gaj”. Please check their opening hours before visiting."
                    ]
                },
                "about": {
                    "title": "We offer",
                    "intro1": "A holiday house for 1-4 people includes:",
                    "items1": [
                        "a separate bedroom",
                        "an additional bed in the living room",
                        "a dining area",
                        "a fully equipped kitchen",
                        "a bathroom with shower",
                        "an extra toilet",
                        "a covered terrace",
                        "a storage space for bicycles",
                        "two parking spaces",
                        "Wi-Fi, television, internet radio, ..."
                    ],
                    "intro2": "Additional Information",
                    "items2": [
                        "Check-in from 14:00, check-out until 11:00.",
                        "Pets are not allowed.",
                        "Parties are not allowed.",
                        "Smoking is not permitted.",
                        "Quiet hours are from 22:00 to 07:00.",
                        "Price list applies for rental for 1 to 4 persons per night.",
                        "Tourist tax is paid separately:",
                        "  - adults 2.50 € per night,",
                        "  - children from 7 to 18 years 1.25 € per night,",
                        "  - children up to 7 years and disabled persons are exempt from tourist tax.",
                        "All prices are in EUR. We do not accept cash.",
                        "Accommodation ID: 137845",
                        "Categorization: holiday home ***"
                    ],
                    "intro3": "Safety",
                    "items3": [
                        "Smoke and carbon monoxide detector.",
                        "Security cameras cover the parking lot and the surroundings of the house. The tenant area: all windows, terrace, and courtyard are not covered by cameras."
                    ],
                    "intro4": "Damage & Liability",
                    "items4": [
                        "Guests are kindly asked to treat the property and all equipment with care.",
                        "Any damage caused during your stay must be reported promptly.",
                        "Guests are responsible for any damage beyond normal wear and tear and may be asked to cover the cost of repair or replacement."
                    ],
                },
                "contact": {
                    "title": "Contacts",
                    "phone": "Phone:",
                    "phoneValues": [
                        "+386 41 563 873 Tanja",
                        "+386 41 913 001 Marko"
                    ],
                    "email": "Email:",
                    "emailValues": [
                        "izanabrejgi@gmail.com",
                        "iza.na.brejgi@gmail.com"
                    ],
                    "address": "Address:",
                    "addressLines": [
                        "Rumičev breg 71",
                        "9226 Moravske Toplice",
                        "Goričko, Prekmurje, Slovenia"
                    ]
                },
            },
            "map": {
                "title": "📍 Iža na brejgi",
                "viewLabel": "View on map",
                "navLabel": "Navigation / Get directions",
                "googleMaps": "Google Maps",
                "appleMaps": "Apple Maps",
                "tip": "Click the button to open in app or browser."
            },
            "reserve": {
                "title": "Reservation",
                "intro": "Make your reservation through the portal below",
                "items": [
                    "• We offer direct booking without commission through our own portal. Payment by credit card.",
                    "• By scrolling through the months, you can also check the availability of the accommodation.",
                    "• Check-in is done through the online portal on the day of arrival at the accommodation. At that time, the tourist tax is also paid through the same portal. Payment by credit card."
                ],
                "button": "Open reservation portal"
            },
            "footer": {
                "copyright": "&copy; 2026 Iža na brejgi. All rights reserved."
            }
        },
        // ------------------------------------- DE ---------------------------------------------
        "de": {
            "meta": {
                "title": "Iža na brejgi",
                "description": "Ferienhaus in Moravske Toplice, Prekmurje"
            },
            "nav": {
                "home": "Startseite",
                "description": "Beschreibung",
                "about": "Wir bieten",
                "contact": "Kontakt",
                "map": "Karte",
                "reserve": "Buchen",
                "links": "Links"
            },
            "overlays": {
                "description": {
                    "title": "Beschreibung",
                    "content": [
                        "Reisen Sie zurück in die Zeit Ihrer Großeltern - in ein gemütliches Häuschen an einem ruhigen Ort zwischen Weinbergen, jedoch modern ausgestattet mit allen Annehmlichkeiten der heutigen Zeit.",
                        "Schlafen Sie in völliger Stille im Mondschein ein und erwachen Sie mit dem Gesang der Vögel.",
                        "Sie können die Natur im eigenen Hof genießen, die Umgebung zu Fuß oder mit dem Fahrrad auf markierten Wegen erkunden oder die nahegelegenen Thermen besuchen.",
                        "Die Übersetzung aus dem lokalen Dialekt Prekmurje lautet 'Haus am Hügel'. Das Wort grič ('Hügel') wird hier jedoch nicht verwendet; stattdessen sagt man breg, was ebenfalls einen Hügel bezeichnet, oder mundartlich brejg. Für die Bewohner von Spodnje Moravce (dem tiefer gelegenen Teil des heutigen Moravske Toplice) war die erste Anhöhe hinter dem Dorf vor allem für Weinberge bestimmt. Die flacheren Gebiete in der Nähe der Bauernhöfe nutzte man als Ackerland.",
                        "Die erste Erwähnung des Hauses stammt aus dem Jahr 1864, und es ist bereits auf den ältesten Karten eingezeichnet. Ursprünglich diente das Gebäude als Viničarija - ein Winzerhaus, in dem Arbeiter mit ihren Familien lebten und die Weinberge betreuten. Die Weinberge und Gebäude gehörten wohlhabenderen Bauern aus dem unteren Teil des Dorfes.",
                        "Das Haus ist mit restaurierten Möbeln aus jener Zeit ausgestattet, von denen viele über 100 Jahre alt sind.",
                        "Wir haben uns bemüht, Sie auf eine Reise in die Vergangenheit mitzunehmen - damit Sie Zeit für sich und Ihre Liebsten finden und vielleicht auch an die alten Werte denken, die in unserer schnelllebigen Welt immer mehr verloren gehen.",
                        "Bitte gehen Sie mit dem Haus und den Möbeln sorgsam um, damit wir sie in demselben Zustand unseren Enkeln und Urenkeln weitergeben können, wie sie uns von unseren Vorfahren überliefert wurden.",
                        "Das Ferienhaus befindet sich in der Ortschaft Moravske Toplice, im Ortsteil Zgornji Moravci, in einer ruhigen Lage, umgeben von Weinbergen und Feldern. In der Nähe gibt es nur wenige Häuser, die zudem nicht alle dauerhaft bewohnt sind. Die Straße führt ausschließlich zu diesen Häusern und weiter zum Gasthaus Aleksander (Gostišče Aleksander), das sich etwas weiter oben befindet. Dort werden auch Abendessen für externe Gäste angeboten – wenn Sie hungrig sind, empfehlen wir Ihnen einen Besuch.",
                        "Die Lage eignet sich hervorragend zum Spazierengehen und Wandern. Es gibt mehrere Rundwege unterschiedlicher Länge, teilweise auch mit leichten Anstiegen. Besonders empfehlenswert ist die Gegend für Radfahrer – egal ob Rennrad, Trekkingrad oder Mountainbike (MTB). Im alten Keller steht Ihnen ein abschließbarer Raum für Ihre Fahrräder zur Verfügung. E-Bikes können dort auch aufgeladen werden, und es gibt einige Werkzeuge für kleinere Reparaturen.",
                        "Ihre Radtouren können direkt an der Unterkunft beginnen, auf Straßen mit sehr wenig Verkehr. Sie können offiziellen, ausgeschilderten Routen folgen oder Ihre eigene Strecke mit einer App planen. Unser Tipp: Fahren Sie einfach in die Natur, genießen Sie die Umgebung und die Ruhe. Vermeiden Sie Hauptstraßen – Ihre App zeigt Ihnen nicht immer das beste Erlebnis.",
                        "Für Badebegeisterte befinden sich im unteren Teil von Moravske Toplice, im Ortsteil Spodnji Moravci, die Thermen Terme 3000 sowie das Hotel Vivat mit Pools, Saunen und Wellnessangeboten. Dort finden Sie auch einen Golfplatz sowie einen Trimmpfad im Park.",
                        "In diesem Bereich gibt es außerdem ein Lebensmittelgeschäft, einige Restaurants und eine Pizzeria. Für größere Einkäufe liegt das regionale Zentrum Murska Sobota nur 8 km entfernt und bietet moderne Einkaufszentren.",
                        "Für Liebhaber traditioneller regionaler Speisen und Getränke empfehlen wir einen Ausflug in die andere Richtung, ins Gebiet Goričko. Zwei nahegelegene Möglichkeiten in Zgornji Moravci sind die „Okrepčevalnica pri Goranu“ und „Zeleni gaj“. Bitte prüfen Sie vor Ihrem Besuch die Öffnungszeiten."
                    ]
                },
                "about": {
                    "title": "Wir bieten",
                    "intro1": "Ein Ferienhaus für 1-4 Personen inklusive:",
                    "items1": [
                        "Die Preisliste gilt für die Anmietung für 1 bis 4 Personen pro Nacht.",
                        "Haustiere sind nicht erlaubt.",
                        "Partys sind nicht erlaubt.",
                        "einer komplett ausgestatteten Küche",
                        "einem Badezimmer mit Dusche",
                        "einer zusätzlichen Toilette",
                        "einer überdachten Terrasse",
                        "einem Abstellraum für Fahrräder",
                        "zwei Parkplätzen",
                        "WLAN, Fernseher, Internetradio, ..."
                    ],
                    "intro2": "Zusätzliche Informationen",
                    "items2": [
                        "Check-in ab 14:00 Uhr, Check-out bis 11:00 Uhr.",
                        "Für 3. bis 4. Person: Aufschlag auf den Grundpreis.",
                        "Haustiere sind nicht erlaubt.",
                        "Rauchen ist nicht gestattet.",
                        "Nachtruhe gilt von 22:00 bis 07:00 Uhr.",
                        "Preisliste gilt für Vermietung für 1 bis 4 Personen pro Nacht.",
                        "Tourismusabgabe wird separat bezahlt:",
                        "  - Erwachsene 2,50 € pro Nacht,",
                        "  - Kinder von 7 bis 18 Jahren 1,25 € pro Nacht,",
                        "  - Kinder bis 7 Jahre und behinderte Personen sind von der Tourismusabgabe befreit.",
                        "Alle Preise sind v EUR. Wir akzeptieren kein Bargeld.",
                        "Beherbergungsbetriebs-ID: 137845",
                        "Kategorisierung: Ferienhaus ***"
                    ],
                    "intro3": "Sicherheit",
                    "items3": [
                        "Rauch- und Kohlenmonoxidmelder.",
                        "Überwachungskameras erfassen den Parkplatz und die Umgebung des Hauses. Der Bereich für Mieter: Alle Fenster, Terrasse und Hof sind nicht von Kameras erfasst."
                    ],
                    "intro4": "Schäden und Haftung",
                    "items4": [
                        "Wir bitten unsere Gäste, die Unterkunft und die Ausstattung sorgfältig zu behandeln.",
                        "Eventuelle Schäden sind umgehend zu melden.",
                        "Für Schäden, die über die normale Abnutzung hinausgehen, haftet der Gast und kann zur Übernahme der Reparatur- oder Ersatzkosten verpflichtet werden."
                    ],
                },
                "contact": {
                    "title": "Kontakt",
                    "phone": "Telefon:",
                    "phoneValues": [
                        "+386 41 563 873 Tanja",
                        "+386 41 913 001 Marko"
                    ],
                    "email": "Email:",
                    "emailValues": [
                        "izanabrejgi@gmail.com",
                        "iza.na.brejgi@gmail.com"
                    ],
                    "address": "Adresse:",
                    "addressLines": [
                        "Rumičev breg 71",
                        "9226 Moravske Toplice",
                        "Goričko, Prekmurje, Slowenien"
                    ]
                },
            },
            "map": {
                "title": "📍 Iža na brejgi",
                "viewLabel": "Auf Karte anzeigen",
                "navLabel": "Navigation / Route berechnen",
                "googleMaps": "Google Maps",
                "appleMaps": "Apple Maps",
                "tip": "Klicken Sie auf die Schaltfläche, um in der App oder im Browser zu öffnen."
            },
            "reserve": {
                "title": "Reservierung",
                "intro": "Buchen Sie über das untenstehende Portal",
                "items": [
                    "• Wir bieten eine direkte Buchung ohne Provision über unser eigenes Portal. Zahlung per Kreditkarte.",
                    "• Durch das Blättern durch die Monate können Sie auch die Verfügbarkeit der Unterkunft prüfen.",
                    "• Der Check-in erfolgt am Anreisetag in der Unterkunft über das Online-Portal. Zu diesem Zeitpunkt wird auch die Tourismusabgabe über dasselbe Portal bezahlt. Zahlung per Kreditkarte."
                ],
                "button": "Buchungsportal öffnen"
            },
            "footer": {
                "copyright": "&copy; 2026 Iža na brejgi. Alle Rechte vorbehalten."
            }
        }
    }
};

// Naloži jezikovne podatke
function loadLanguageData() {
    try {
        // Uporabi vgrajene podatke namesto fetch
        window.languageData = embeddedLanguageData.languages;

        // Nastavi privzeti jezik glede na lokacijo/brskalnik
        window.currentLanguage = detectLanguageByLocation();

        // Uporabi jezik
        applyLanguage(window.currentLanguage);

        // Inicializiraj zastavice
        initLanguageFlags();

    } catch (error) {
        console.error('Napaka pri nalaganju jezikovnih podatkov:', error);
        window.currentLanguage = 'sl';
        // Prikaži vsaj slovensko verzijo
        if (embeddedLanguageData.languages.sl) {
            window.languageData = embeddedLanguageData.languages;
            applyLanguage('sl');
        }
    }
}

// Določi jezik glede na lokacijo
function detectLanguageByLocation() {
    // Preveri URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');

    if (langParam && ['sl', 'en', 'de'].includes(langParam)) {
        return langParam;
    }

    // Preveri glede na jezik brskalnika
    const userLang = navigator.language || navigator.userLanguage;

    if (userLang.startsWith('sl')) {
        return 'sl';
    } else if (userLang.startsWith('de')) {
        return 'de';
    } else {
        return 'en';
    }
}

// Uporabi jezik

function applyLanguage(lang) {
    if (!languageData[lang]) return;

    const data = languageData[lang];
    currentLanguage = lang;

    // Posodobi naslov strani
    document.title = data.meta.title;
    document.documentElement.lang = lang;

    // Posodobi navigacijo
    updateNavigation(data.nav);

    // Posodobi naslove overlayev
    updateOverlayTitles(data.overlays);

    // Posodobi vsebino overlayev
    updateOverlayContent(lang);

    // Posodobi footer
    updateFooter(data.footer);

    // Posodobi aktivno zastavo
    updateActiveFlag(lang);

    // Shrani jezik v localStorage
    localStorage.setItem('preferredLanguage', lang);

    // Sinhroniziraj piškotke
    if (window.setCookieNoticeLanguage) {
        window.setCookieNoticeLanguage(lang);
    }

    // Sinhroniziraj links overlay - TO MORA OBSTAJATI
    if (window.updateLinksLanguage) {
        console.log('Calling updateLinksLanguage with:', lang);
        window.updateLinksLanguage(lang);
    }

    // Sinhroniziraj map overlay
    if (window.refreshMapLanguage) {
        window.refreshMapLanguage(lang);
    }

    // Posodobi reserve overlay, če je aktiven
    const reserveOverlay = document.getElementById('reserve-overlay');
    if (reserveOverlay && reserveOverlay.classList.contains('active')) {
        if (typeof updateReserveContent === 'function') {
            updateReserveContent(lang);
        }
    }

    // Preveri če so piškotki prikazani in jih posodobi
    const cookieNotice = document.getElementById('cookie-notice');
    if (cookieNotice && cookieNotice.style.display === 'block') {
        if (window.updateCookieTexts) {
            window.updateCookieTexts();
        }
    }
}

// Posodobi navigacijo
function updateNavigation(navData) {
    const navIds = {
        'nav-home': 'home',
        'nav-description': 'description',
        'nav-about': 'about',
        'nav-contact': 'contact',
        'nav-map': 'map',
        'nav-reserve': 'reserve',
        'nav-links': 'links'
    };

    for (const [elementId, dataKey] of Object.entries(navIds)) {
        const element = document.getElementById(elementId);
        if (element && navData[dataKey]) {
            element.textContent = navData[dataKey];
        }
    }
}

// Posodobi naslove overlayev
function updateOverlayTitles(overlaysData) {
    const titleIds = {
        'description-title': 'description.title',
        'about-title': 'about.title',
        'contact-title': 'contact.title',
    };

    for (const [elementId, dataPath] of Object.entries(titleIds)) {
        const element = document.getElementById(elementId);
        if (element) {
            const value = getValueByPath(overlaysData, dataPath);
            if (value) {
                element.textContent = value;
            }
        }
    }
}

// Pomožna funkcija za dostop do nested objektov
function getValueByPath(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Posodobi vsebino overlayev
function updateOverlayContent(lang) {
    const data = languageData[lang];
    if (!data) return;

    updateDescriptionContent(data.overlays.description);
    updateAboutContent(data.overlays.about);
    updateContactContent(data.overlays.contact);

    if (typeof updateReserveContent === 'function') {
        updateReserveContent(lang);
    }
}

// Posodobi opis overlay
function updateDescriptionContent(descriptionData) {
    const descriptionContent = document.getElementById('description-content');
    if (descriptionContent && descriptionData.content) {
        let html = '';
        descriptionData.content.forEach(paragraph => {
            html += `<p>${paragraph}</p>`;
        });
        descriptionContent.innerHTML = html;
    }
}

// Posodobi "ponujamo" overlay
function updateAboutContent(aboutData) {
    const aboutContent = document.getElementById('about-content');
    if (aboutContent && aboutData) {
        let html = '';

        // PRVI DEL - Ponujamo
        if (aboutData.intro1 && aboutData.items1) {
            html += `<h3 class="about-subtitle">${aboutData.intro1}</h3>`;
            html += '<ul class="about-list">';
            aboutData.items1.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        }

        // DRUGI DEL - Dodatne informacije
        if (aboutData.intro2 && aboutData.items2) {
            html += `<div class="additional-info-section">`;
            html += `<h3 class="additional-info-title">${aboutData.intro2}</h3>`;
            html += '<ul class="additional-info-list">';
            aboutData.items2.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
            html += `</div>`;
        }

        // TRETJI DEL - Varnost
        if (aboutData.intro3 && aboutData.items3) {
            html += `<div class="extra-info-section">`;
            html += `<h3 class="extra-info-title">${aboutData.intro3}</h3>`;
            html += '<ul class="extra-info-list">';
            aboutData.items3.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
            html += `</div>`;
        }

        // ČETRTI DEL - Škoda
        if (aboutData.intro4 && aboutData.items4) {
            html += `<div class="extra-info-section">`;
            html += `<h3 class="extra-info-title">${aboutData.intro4}</h3>`;
            html += '<ul class="extra-info-list">';
            aboutData.items4.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
            html += `</div>`;
        }

        aboutContent.innerHTML = html;
    }
}

// Posodobi kontakt overlay
function updateContactContent(contactData) {
    const contactContent = document.getElementById('contact-content');
    if (contactContent && contactData) {
        let html = '';

        // TELEFON - podpora za več številk (phoneValues)
        if (contactData.phoneValues && Array.isArray(contactData.phoneValues)) {
            html += '<div class="contact-item">';
            html += `<span class="contact-label">${contactData.phone}</span>`;
            html += '<div class="contact-values">';

            contactData.phoneValues.forEach(phone => {
                const phoneNumber = phone.replace(/[^\d+]/g, '');
                html += `<div class="contact-value">`;
                html += `<a href="tel:${phoneNumber}" class="contact-link phone-link">${phone}</a>`;
                html += `</div>`;
            });

            html += '</div>';
            html += '</div>';
        }
        // FALLBACK za staro strukturo (ena številka)
        else if (contactData.phoneValue) {
            html += '<div class="contact-item">';
            html += `<span class="contact-label">${contactData.phone}</span>`;
            html += '<div class="contact-values">';
            const phoneNumber = contactData.phoneValue.replace(/[^\d+]/g, '');
            html += `<div class="contact-value">`;
            html += `<a href="tel:${phoneNumber}" class="contact-link phone-link">${contactData.phoneValue}</a>`;
            html += `</div>`;
            html += '</div>';
            html += '</div>';
        }

        // EMAIL - podpora za več emailov (emailValues)
        if (contactData.emailValues && Array.isArray(contactData.emailValues)) {
            html += '<div class="contact-item">';
            html += `<span class="contact-label">${contactData.email}</span>`;
            html += '<div class="contact-values">';

            contactData.emailValues.forEach(email => {
                html += `<div class="contact-value">`;
                html += `<a href="mailto:${email}" class="contact-link email-link">${email}</a>`;
                html += `</div>`;
            });

            html += '</div>';
            html += '</div>';
        }
        // FALLBACK za staro strukturo (en email)
        else if (contactData.emailValue) {
            html += '<div class="contact-item">';
            html += `<span class="contact-label">${contactData.email}</span>`;
            html += '<div class="contact-values">';
            html += `<div class="contact-value">`;
            html += `<a href="mailto:${contactData.emailValue}" class="contact-link email-link">${contactData.emailValue}</a>`;
            html += `</div>`;
            html += '</div>';
            html += '</div>';
        }

        // NASLOV
        if (contactData.address && contactData.addressLines) {
            html += '<div class="contact-item address-item">';
            html += `<span class="contact-label">${contactData.address}</span>`;
            html += '<div class="contact-values">';

            contactData.addressLines.forEach(line => {
                html += `<div class="contact-value address-line">${line}</div>`;
            });

            html += '</div>';
            html += '</div>';
        }

        contactContent.innerHTML = html;
    }
}

// Posodobi footer
function updateFooter(footerData) {
    const footerText = document.getElementById('footer-text');
    if (footerText && footerData.copyright) {
        footerText.innerHTML = footerData.copyright;
    }
}

// Inicializiraj zastavice
function initLanguageFlags() {
    const flagElements = document.querySelectorAll('.language-flag');

    flagElements.forEach(flag => {
        flag.addEventListener('click', function (e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

// Posodobi aktivno zastavo
function updateActiveFlag(lang) {
    const flagElements = document.querySelectorAll('.language-flag');

    flagElements.forEach(flag => {
        const flagLang = flag.getAttribute('data-lang');
        if (flagLang === lang) {
            flag.classList.add('active-flag');
        } else {
            flag.classList.remove('active-flag');
        }
    });
}

// Zamenjaj jezik
function switchLanguage(lang) {
    if (languageData[lang]) {
        applyLanguage(lang);
        // Posodobi URL brez osveževanja strani
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.pushState({}, '', url);

        // OSVEŽI ZEMLJEVID ČE JE ODPRT
        if (typeof refreshMapLanguage === 'function') {
            setTimeout(() => {
                refreshMapLanguage(lang);
            }, 100);
        }

        // ✅ DODAJ: Obvesti cookie sistem o spremembi jezika
        if (window.setCookieNoticeLanguage) {
            window.setCookieNoticeLanguage(lang);
        }
    }
}

// Eksport funkcij
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadLanguageData,
        applyLanguage,
        switchLanguage,
        detectLanguageByLocation
    };

}

/* 051 */
/* links-overlay.js */

const baseLinksData = [
    {
        id: 1,
        icon: 'links/logo_i_feel_slo.png',
        logoBg: 'rgba(255, 255, 255, 1.00)',
        title: {
            sl: 'Slovenska turistična organizacija',
            en: 'Slovenian Tourist Board',
            de: 'Slowenisches Tourismusamt'
        },
        description: {
            sl: 'Uradni portal slovenskega turizma z informacijami o destinacijah, dogodkih in turističnih ponudbah po vsej Sloveniji.',
            en: 'Official portal of Slovenian tourism with information about destinations, events, and tourist offers throughout Slovenia.',
            de: 'Offizielles Portal des slowenischen Tourismus mit Informationen zu Destinationen, Veranstaltungen und touristischen Angeboten in ganz Slowenien.'
        },
        url: {
            sl: 'https://www.slovenia.info/sl',
            en: 'https://www.slovenia.info/en',
            de: 'https://www.slovenia.info/de'
        }
    },
    {
        id: 2,
        icon: 'links/logo_visit_pomurje.png',
        logoBg: 'rgba(255, 255, 255, 1.0)',
        title: {
            sl: 'Visit Pomurje - dogajanja v naši regiji',
            en: 'Visit Pomurje - events in our region',
            de: 'Visit Pomurje - Veranstaltungen in unserer Region'
        },
        description: {
            sl: 'Turistični portal je namenjen odkrivanju Pomurja, njegovih naravnih in kulturnih znamenitosti, lokalnih doživetij ter kulinarične ponudbe. Na njem najdete ideje za izlete, kolesarske in pohodniške poti, zanimive kraje, lokalne ponudnike ter aktualne prireditve in dogodke. Je odlično izhodišče za načrtovanje izletov in spoznavanje vsega, kar ponujata Prekmurje in Prlekija.',
            en: 'The tourist portal is dedicated to exploring Pomurje, its natural and cultural attractions, local experiences, and culinary offerings. You will find ideas for trips, cycling and hiking trails, interesting places, local providers, and current events and activities. It is an excellent starting point for planning trips and discovering everything that Prekmurje and Prlekija have to offer.',
            de: 'Das Tourismusportal widmet sich der Erkundung von Pomurje, seinen natürlichen und kulturellen Sehenswürdigkeiten, lokalen Erlebnissen und kulinarischen Angeboten. Sie finden Ideen für Ausflüge, Rad- und Wanderwege, interessante Orte, lokale Anbieter sowie aktuelle Veranstaltungen und Aktivitäten. Es ist ein ausgezeichneter Ausgangspunkt für die Planung von Ausflügen und die Entdeckung all dessen, was Prekmurje und Prlekija zu bieten haben.'
        },
        url: {
            sl: 'https://visitpomurje.eu/',
            en: 'https://visitpomurje.eu/en/',
            de: 'https://visitpomurje.eu/de/'
        }
    },
    {
        id: 3,
        icon: 'links/KP_goricko_logo.png',
        logoBg: 'rgba(255, 255, 255, 1.0)',
        title: {
            sl: 'Krajinski park Goričko',
            en: 'Natural Park Goričko',
            de: 'Naturpark Goričko'
        },
        description: {
            sl: 'Krajinski park Goričko je zavarovano naravno območje z razgibano gričevnato pokrajino, izjemno naravno pestrostjo in bogato kulturno dediščino, kjer lahko odkrijete lepote Goričkega.',
            en: 'Goričko Nature Park is a protected natural area with a diverse hilly landscape, exceptional biodiversity and rich cultural heritage, where you can discover the beauty of the Goričko region.',
            de: 'Der Naturpark Goričko ist ein geschütztes Naturgebiet mit einer abwechslungsreichen Hügellandschaft, einer außergewöhnlichen Artenvielfalt und einem reichen Kulturerbe, in dem Sie die Schönheit der Region Goričko entdecken können.'
        },
        url: {
            sl: 'https://www.park-goricko.org/?lang=SI',
            en: 'https://www.park-goricko.org/?lang=GB',
            de: 'https://www.park-goricko.org/?lang=DE'
        }
    },
    {
        id: 4,
        icon: 'links/TIClogo.png',
        logoBg: 'rgba(255, 255, 255, 1.00)',
        title: {
            sl: 'Turistično informacijski center, TIC Moravske Toplice',
            en: 'Tourist Information Center, TIC Moravske Toplice',
            de: 'Touristisches Informationszentrum, TIC Moravske Toplice'
        },
        description: {
            sl: 'Lokalne turistične informacije: dogodki, novice, doživetja, termalna voda, pohodne poti, gastronomija, informacije, ...',
            en: 'Local tourist information: events, news, experiences, thermal water, hiking trails, gastronomy, information, ...',
            de: 'Lokale Touristeninformationen: Veranstaltungen, Neuigkeiten, Erlebnisse, Thermalwasser, Wanderwege, Gastronomie, Informationen, ...'
        },
        url: {
            sl: 'https://www.visitmoravsketoplice.com/si',
            en: 'https://www.visitmoravsketoplice.com/en',
            de: 'https://www.visitmoravsketoplice.com/de'
        }
    },
    {
        id: 5,
        icon: 'links/logo_EXPANO.png',
        logoBg: 'rgba(255, 255, 255, 1.0)',
        title: {
            sl: 'EXPANO - Vrata v Pomurje',
            en: 'EXPANO - Gates to Pomurje',
            de: 'EXPANO - Tore in Pomurje'
        },
        description: {
            sl: 'Expano – Vrata v Pomurje je sodoben turistični paviljon, kjer lahko na interaktiven in zabaven način spoznate Pomurje, njegovo naravo, zgodovino, kulturo in posebnosti. S pomočjo 3D-projekcij, virtualne resničnosti in interaktivnih vsebin ponuja edinstveno doživetje regije za vse generacije. V neposredni bližini lahko raziščete tudi Soboško jezero, ki ponuja številne možnosti za šport, rekreacijo in sprostitev.',
            en: 'EXPANO - Gates to Pomurje is a modern tourist pavilion where you can discover Pomurje in an interactive and entertaining way, its nature, history, culture and specialties. With the help of 3D projections, virtual reality and interactive content, it offers a unique experience of the region for all generations. In the immediate vicinity you can also explore the Soboško jezero, which offers many options for sports, recreation and relaxation.',
            de: 'EXPANO - Tore in Pomurje ist ein modernes touristisches Pavillon, in dem Sie Pomurje auf eine interaktive und unterhaltsame Art und Weise entdecken können, seine Natur, Geschichte, Kultur und Besonderheiten. Mit Hilfe von 3D-Projektionen, Virtual Reality und interaktiven Inhalten bietet es eine einzigartige Erfahrung der Region für alle Generationen. In unmittelbarer Nähe können Sie auch das Soboško jezero erkunden, das viele Möglichkeiten für Sport, Freizeit und Entspannung bietet.'
        },
        url: {
            sl: 'https://www.expano.si/',
            en: 'https://www.expano.si/en/',
            de: 'https://www.expano.si/de/'
        }
    },
    {
        id: 6,
        icon: 'links/kolesarske.png',
        logoBg: 'rgba(255, 255, 255, 1.00)',
        title: {
            sl: 'Kolesarske poti in najem koles - TIC Moravske Toplice',
            en: 'Bike Trails and Bike Rental - TIC Moravske Toplice',
            de: 'Fahrradwege und Fahrradverleih - TIC Moravske Toplice'
        },
        description: {
            sl: 'Razvejano kolesarsko omrežje, ki nudi številne označene krožne poti v skupni dolžini 250 km. Najem: treking, e-kolo ali e-skiro. <a href="https://www.visitmoravsketoplice.com/pics/PDF/Poti_skozi_MT_KOL_WEB_OP.pdf" target="_blank" class="link-link">(kolesarske poti)</a>',
            en: 'An extensive cycling network offering numerous marked circular routes with a total length of 250 km. Rental: trekking, e-bike or e-scooter. <a href="https://www.visitmoravsketoplice.com/pics/PDF/Poti_skozi_MT_KOL_WEB_OP.pdf" target="_blank" class="link-link">(cycling routes)</a>',
            de: 'Ein weitverzweigtes Radwegenetz mit zahlreichen markierten Rundwegen von insgesamt 250 km Länge. Verleih: Trekking, E-Bike oder E-Scooter. <a href="https://www.visitmoravsketoplice.com/pics/PDF/Poti_skozi_MT_KOL_WEB_OP.pdf" target="_blank" class="link-link">(Radrouten)</a>'
        },
        url: {
            sl: 'https://www.visitmoravsketoplice.com/si/vsebina/522/Kolesarske-poti',
            en: 'https://www.visitmoravsketoplice.com/en/vsebina/522/Cycle-paths',
            de: 'https://www.visitmoravsketoplice.com/de/vsebina/522/Radwege'
        }
    },
    {
        id: 7,
        icon: 'links/logo_RIDE_Goricko.png',
        logoBg: 'rgba(255, 255, 255, 1.0)',
        title: {
            sl: 'Vodeni kolesarski izleti in najem e-koles - Ride Goričko',
            en: 'Guided Bike Tours and E-Bike Rental - Ride Goričko',
            de: 'Geführte Fahrradtouren und E-Bike-Verleih - Ride Goričko'
        },
        description: {
            sl: 'Vodeni enodnevni izleti, Team building in drugi izleti. Najem: e-MTB.',
            en: 'Guided day tours, Team building and other tours. Rental: e-MTB.',
            de: 'Geführte Tagestouren, Team Building und andere Touren. Verleih: E-MTB.'
        },
        url: {
            sl: 'https://ridegoricko.com/',
            en: 'https://ridegoricko.com/en/',
            de: 'https://ridegoricko.com/de/'
        }
    },
    {
        id: 8,
        icon: 'links/logo_murski_colnar.jpg',
        logoBg: 'rgba(255, 255, 255, 1.0)',
        title: {
            sl: 'Spust po reki Muri - Murski čolnar',
            en: 'Mura River Rafting - Murski čolnar',
            de: 'Mur-Fluss-Rafting - Murski čolnar'
        },
        description: {
            sl: 'Spust po reki Muri, eni zadnjih divjih rek v Evropi - prave evropske Amazonke, z izkušenimi vodniki',
            en: 'Rafting on the Mura River, one of Europe\'s last wild rivers - the real European Amazon, with experienced guides',
            de: 'Rafting auf der Mur, einem der letzten wilden Flüsse Europas - dem echten europäischen Amazonas, mit erfahrenen Führern'
        },
        url: {
            sl: 'https://www.murski-colnar.si/',
            en: 'https://www.murski-colnar.si/en/',
            de: 'https://www.murski-colnar.si/de/'
        }
    },
    {
        id: 9,
        icon: 'links/Aleksander_logotip.jpg',
        logoBg: 'rgba(255, 255, 255, 1.0)',
        title: {
            sl: 'Gostišče Aleksander - domača kulinarika',
            en: 'Aleksander Guesthouse - Local Cuisine',
            de: 'Aleksander Gästehaus - lokale Küche'
        },
        description: {
            sl: 'Samo 100 m od nastanitve, zajtrki po predhodnem dogovoru in večerje à la carte',
            en: 'Only 100 m from accommodation, breakfast by prior arrangement and à la carte dinners',
            de: 'Nur 100 m von der Unterkunft entfernt, Frühstück nach Vereinbarung und à la carte Abendessen'
        },
        url: {
            sl: 'https://gostisce-aleksander.net/kontakt.php',
            en: 'https://gostisce-aleksander.net/kontakt.php',
            de: 'https://gostisce-aleksander.net/kontakt-de.php'
        }
    },
    {
        id: 10,
        icon: 'links/Terme_3000_logo.jpg',
        logoBg: 'rgba(255, 255, 255, 1.0)',
        title: {
            sl: 'Terme 3000 - Moravske Toplice',
            en: 'Terme 3000 - Moravske Toplice, Spa',
            de: 'Terme 3000 - Moravske Toplice, Thermalquellen'
        },
        description: {
            sl: 'Termalni park s tobogani in wellnesson',
            en: 'Thermal park with slides and wellness',
            de: 'Thermalpark mit Rutschen und Wellnessbereich'
        },
        url: {
            sl: 'https://www.sava-hotels-resorts.com/sl/terme-3000/ponudba-in-dozivetja/termalni-park-in-hotelski-bazeni/',
            en: 'https://www.sava-hotels-resorts.com/en/terme-3000/services-and-experiences/thermal-park-and-hotel-pools/',
            de: 'https://www.sava-hotels-resorts.com/de/terme-3000/angebot-und-erlebnisse/thermalpark-und-hotelpools/'
        }
    },
    {
        id: 11,
        icon: 'links/Terme_Vivat_logo.jpg',
        logoBg: 'rgba(255, 255, 255, 1.0)',
        title: {
            sl: 'Terme Vivat - Moravske Toplice',
            en: 'Terme Vivat - Moravske Toplice, Spa',
            de: 'Terme Vivat - Moravske Toplice, Thermalquellen'
        },
        description: {
            sl: 'Termalni park z wellnesson',
            en: 'Thermal park with wellness',
            de: 'Thermalpark mit Wellnessbereich'
        },
        url: {
            sl: 'https://vivat.si/bazenski-kompleks',
            en: 'https://vivat.si/en/swimming-pool-complex',
            de: 'https://vivat.si/de/schwimmbad-komplex'
        }
    }

    /*    ,
        {
            id: 99,
            icon: 'links/logo.jpg',
            logoBg: 'rgba(255, 255, 255, 1.0)',
            title: {
                sl: '',
                en: '',
                de: ''
            },
            description: {
                sl: '',
                en: '',
                de: ''
            },
            url: {
                sl: '',
                en: '',
                de: ''
            }
        }
    */
];

function getLinksByLanguage(lang = 'sl') {
    return baseLinksData.map(link => ({
        id: link.id,
        icon: link.icon,
        logoBg: link.logoBg,
        title: link.title[lang] || link.title.sl,
        description: link.description[lang] || link.description.sl,
        url: link.url[lang] || link.url.sl
    }));
}

function linksEscHandler(e) {
    if (e.key === 'Escape') {
        hideLinksOverlay();
    }
}

function linksBodyClickHandler(e) {
    const isFlag = e.target.closest('.language-flag');
    if (isFlag) return;

    const isOverlayContent = e.target.closest('#links-overlay');
    if (!isOverlayContent && activeOverlayType === 'links') {
        hideLinksOverlay();
    }
}

function showLinksOverlay() {
    //console.log('showLinksOverlay called');

    // Zapremo druge overlaye
    if (activeOverlayType && activeOverlayType !== 'links') {
        if (typeof hideAllOverlays === 'function') {
            hideAllOverlays();
        }
    }

    activeOverlayType = 'links';

    const bg = document.getElementById('overlay-background');
    if (bg) bg.classList.add('active');

    const overlay = document.getElementById('links-overlay');
    const title = document.getElementById('links-title');

    if (overlay) overlay.classList.add('active');

    const currentLang = window.currentLanguage || 'sl';
    const navData = window.languageData?.[currentLang]?.nav;

    if (title && navData?.links) {
        title.textContent = navData.links;
    }

    loadLinks(currentLang);

    // POMEMBNO: Takoj nastavimo pozicijo in ponovno čez kratek čas
    if (typeof adjustOverlayPosition === 'function') {
        adjustOverlayPosition();
        // Ponovno pokličemo po kratkem zamiku, da se header višina pravilno izračuna
        setTimeout(adjustOverlayPosition, 50);
        setTimeout(adjustOverlayPosition, 150);
    }

    document.addEventListener('keydown', linksEscHandler);
    document.body.addEventListener('click', linksBodyClickHandler);

    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideLinksOverlay() {
    const overlay = document.getElementById('links-overlay');
    const bg = document.getElementById('overlay-background');

    if (bg && activeOverlayType === 'links') bg.classList.remove('active');
    if (overlay) overlay.classList.remove('active');

    document.body.style.overflow = '';

    if (activeOverlayType === 'links') {
        activeOverlayType = null;
    }

    document.removeEventListener('keydown', linksEscHandler);
    document.body.removeEventListener('click', linksBodyClickHandler);

    if (window.getSelection) window.getSelection().removeAllRanges();
}

function loadLinks(lang = 'sl') {
    const container = document.getElementById('links-container');
    if (!container) return;

    const links = getLinksByLanguage(lang);

    let html = '';
    links.forEach(link => {
        html += `
            <div class="link-item" data-id="${link.id}" data-url="${link.url}">
                <img src="${link.icon}" 
                    alt="${link.title}" 
                    class="link-icon contain"
                    style="background: ${link.logoBg};">
                <div class="link-text">
                    <h3 class="link-title">${link.title}</h3>
                    <p class="link-description">${link.description}</p>
                </div>
                <button class="link-arrow" aria-label="Odpiranje povezave">❯</button>
            </div>
        `;
    });

    container.innerHTML = html;

    // Klik na celotno kartico
    container.querySelectorAll('.link-item').forEach(item => {
        item.addEventListener('click', function (e) {
            // Preveri, ali je uporabnik kliknil na notranji link (npr. kolesarske poti)
            if (e.target.closest('.link-link')) {
                return; // Naj notranji link opravi svoje
            }

            e.preventDefault();
            const url = this.getAttribute('data-url');
            if (url) window.open(url, '_blank', 'noopener,noreferrer');
        });
    });

    // Klik na puščico
    container.querySelectorAll('.link-arrow').forEach(arrow => {
        arrow.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const linkItem = this.closest('.link-item');
            if (linkItem) {
                const url = linkItem.getAttribute('data-url');
                if (url) window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });
}

function updateLinksLanguage(lang) {
    const title = document.getElementById('links-title');
    const navData = window.languageData?.[lang]?.nav;
    if (title && navData?.links) {
        title.textContent = navData.links;
    }

    const overlay = document.getElementById('links-overlay');
    if (overlay && overlay.classList.contains('active')) {
        loadLinks(lang);
    }
}

window.showLinksOverlay = showLinksOverlay;
window.hideLinksOverlay = hideLinksOverlay;
window.updateLinksLanguage = updateLinksLanguage;

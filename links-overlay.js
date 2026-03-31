/* links-overlay.js */
/* 039 - UPRAVLJANJE POVEZAV - VSE NA ENEM MESTU */

const baseLinksData = [
    {
        id: 1,
        icon: 'links/logo_i_feel_slo.png',
        //logoBg: 'rgba(0, 0, 0, 1.0)', // ČRNO OZADJE
        //logoBg: 'rgba(255, 255, 255, 0.75)', // SIVO OZADJE
        logoBg: 'rgba(255, 255, 255, 1.00)', // BELO OZADJE
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
        icon: 'links/logo_TIC_MT.svg',
        //logoBg: 'rgba(0, 0, 0, 1.0)', // ČRNO OZADJE
        logoBg: 'rgba(255, 255, 255, 1.00)', // BELO OZADJE
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
        id: 3,
        icon: 'links/logo_TIC_MT.svg',
        //logoBg: 'rgba(0, 0, 0, 1.0)', // ČRNO OZADJE
        logoBg: 'rgba(255, 255, 255, 1.00)', // BELO OZADJE
        title: {
            sl: 'Kolesarske poti in najem koles - TIC Moravske Toplice',
            en: 'Bike Trails and Bike Rental - TIC Moravske Toplice',
            de: 'Fahrradwege und Fahrradverleih - TIC Moravske Toplice'
        },
        description: {
            sl: 'Razvejano kolesarsko omrežje, ki nudi številne označene krožne poti v skupni dolžini 250 km. Najem: treking, e-kolo ali e-skiro.',
            en: 'An extensive cycling network offering numerous marked circular routes with a total length of 250 km. Rental: trekking, e-bike or e-scooter.',
            de: 'Ein weitverzweigtes Radwegenetz mit zahlreichen markierten Rundwegen von insgesamt 250 km Länge. Verleih: Trekking, E-Bike oder E-Scooter.'
        },
        url: {
            sl: 'https://www.visitmoravsketoplice.com/si/vsebina/522/Kolesarske-poti',
            en: 'https://www.visitmoravsketoplice.com/en/vsebina/522/Cycle-paths',
            de: 'https://www.visitmoravsketoplice.com/de/vsebina/522/Radwege'
        }
    },
    {
        id: 4,
        icon: 'links/logo_RIDE_Goricko.png',
        logoBg: 'rgba(255, 255, 255, 1.0)', // BELO OZADJE
        //logoBg: 'rgba(255, 255, 255, 0.75)', // SVETLO OZADJE
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
        id: 5,
        icon: 'links/logo_murski_colnar.jpg',
        logoBg: 'rgba(255, 255, 255, 1.0)', // BELO OZADJE
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
    }
    // Dodaj več povezav tu
];

// ============================================
// 2. FUNKCIJA ZA PRIDOBIVANJE PODATKOV PO JEZIKU
// ============================================
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

// ============================================
// 3. HANDLERJI ZA ZAPIRANJE
// ============================================

// ESC handler za links
function linksEscHandler(e) {
    if (e.key === 'Escape') {
        hideLinksOverlay();
    }
}

// Body klik handler za zapiranje ob kliku na zeleno ozadje
function linksBodyClickHandler(e) {
    // Preveri, če je klik na overlay vsebino
    const isOverlayContent = e.target.closest('#links-overlay');
    
    // Če klik NI na overlay vsebino IN je overlay aktiven, zapri
    if (!isOverlayContent && window.activeOverlayType === 'links') {
        console.log('Click outside Links overlay, closing');
        hideLinksOverlay();
    }
}

// ============================================
// 4. GLAVNI FUNKCIJI
// ============================================

// Prikaži links overlay
function showLinksOverlay() {
    console.log('👁️ Showing Links overlay...');

    // Preveri če je že kak overlay aktiven
    if (window.activeOverlayType && window.activeOverlayType !== 'links') {
        console.log(`Cannot show Links, ${window.activeOverlayType} is active`);
        return;
    }

    // Skrij vse overlaye
    if (typeof hideAllOverlays === 'function') {
        hideAllOverlays();
    }

    // Nastavi da je links aktiven
    window.activeOverlayType = 'links';

    // Prikaži background
    const bg = document.getElementById('links-background');
    if (bg) bg.classList.add('active');

    // Prikaži overlay
    const overlay = document.getElementById('links-overlay');
    const title = document.getElementById('links-title');

    if (overlay) overlay.classList.add('active');

    // Nastavi naslov glede na jezik
    const currentLang = window.currentLanguage || 'sl';
    const navData = window.languageData?.[currentLang]?.nav;

    if (title && navData?.links) {
        title.textContent = navData.links;
    }

    // Naloži povezave
    loadLinks(currentLang);

    // Dodaj ESC handler
    document.addEventListener('keydown', linksEscHandler);
    
    // Dodaj body klik handler za zapiranje ob kliku na zeleno ozadje
    document.body.addEventListener('click', linksBodyClickHandler);

    // Onemogoči skrolanje
    document.body.style.overflow = 'hidden';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Skrij links overlay
function hideLinksOverlay() {
    console.log('👁️‍🗨️ Hiding Links overlay...');

    // Skrij overlay
    const overlay = document.getElementById('links-overlay');
    if (overlay) overlay.classList.remove('active');

    // Skrij background
    const bg = document.getElementById('links-background');
    if (bg) bg.classList.remove('active');

    // Omogoči scroll
    document.body.style.overflow = '';

    // Reset aktivnega overlayja
    if (window.activeOverlayType === 'links') {
        window.activeOverlayType = null;
    }

    // Odstrani ESC handler
    document.removeEventListener('keydown', linksEscHandler);
    
    // Odstrani body klik handler
    document.body.removeEventListener('click', linksBodyClickHandler);

    // Deselect vse selektirano besedilo
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
}

// Naloži in prikaži povezave
function loadLinks(lang = 'sl') {
    const container = document.getElementById('links-container');
    if (!container) return;

    const links = getLinksByLanguage(lang);

    let html = '';
    links.forEach(link => {
        html += `
            <a href="${link.url}" class="link-item" data-id="${link.id}">
                <img src="${link.icon}" 
                    alt="${link.title}" 
                    class="link-icon contain"
                    style="background: ${link.logoBg};">
                <div class="link-text">
                    <h3 class="link-title">${link.title}</h3>
                    <p class="link-description">${link.description}</p>
                </div>
                <button class="link-arrow" aria-label="Odpiranje povezave">❯</button>
            </a>
        `;
    });

    container.innerHTML = html;

    // Event listenerji za odpiranje povezav
    container.querySelectorAll('.link-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });

    // Puščice tudi odprejo povezavo
    container.querySelectorAll('.link-arrow').forEach(arrow => {
        arrow.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const linkItem = this.closest('.link-item');
            if (linkItem) {
                const url = linkItem.getAttribute('href');
                if (url) {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            }
        });
    });
}

// Posodobi jezik povezav
function updateLinksLanguage(lang) {
    // Posodobi naslov
    const title = document.getElementById('links-title');
    const navData = window.languageData?.[lang]?.nav;

    if (title && navData?.links) {
        title.textContent = navData.links;
    }

    // Posodobi povezave
    loadLinks(lang);
}

// Inicializacija - samo za background klik (brez body handlerja, ker ga dodamo v show)
document.addEventListener('DOMContentLoaded', function () {
    // Klik na background (links-background) zapre overlay
    const bg = document.getElementById('links-background');
    if (bg) {
        bg.addEventListener('click', function (e) {
            if (e.target === this) {
                hideLinksOverlay();
            }
        });
    }
});

// Eksport funkcij za globalno uporabo
window.showLinksOverlay = showLinksOverlay;
window.hideLinksOverlay = hideLinksOverlay;
window.updateLinksLanguage = updateLinksLanguage;

/* links-overlay.js */
/* 036 - UPRAVLJANJE POVEZAV - ENAK KOT HOSTEX */

// Podatki o povezavah
const linksData = {
    sl: [
        {
            id: 1,
            icon: 'links/logo_i_feel_slo.png',
            title: 'Slovenska turistična organizacija',
            description: 'Uradni portal slovenskega turizma z informacijami o destinacijah, dogodkih in turističnih ponudbah po vsej Sloveniji.',
            url: 'https://www.slovenia.info/sl'
        },
        {
            id: 2,
            icon: 'links/logo_TIC_MT.svg',
            title: 'Turistično informacijski center, TIC Moravske Toplice',
            description: 'Lokalne turistične informacije: dogodki, novice, doživetja, termalna voda, pohodne poti, gastronomija, informacije, ...',
            url: 'https://www.visitmoravsketoplice.com/si'
        },
        {
            id: 3,
            icon: 'links/logo_TIC_MT.svg',
            title: 'Kolesarske poti in najem koles - TIC Moravske Toplice',
            description: 'Razvejano kolesarsko omrežje, ki nudi številne označene krožne poti v skupni dolžini 250 km. Najem: treking, e-kolo ali e-skiro.',
            url: 'https://www.visitmoravsketoplice.com/si/vsebina/522/Kolesarske-poti'
        },
        {
            id: 4,
            icon: 'links/logo_RIDE_Goricko.png',
            title: 'Vodeni kolesarski izleti in najem e-koles - Ride Goričko',
            description: 'Vodeni enodnevni izleti, Team building in drugi izleti. Najem: e-MTB.',
            url: 'https://ridegoricko.com/'
        },
        {
            id: 5,
            icon: 'links/logo_murski_colnar.jpg',
            title: 'Spust po reki Muri - Murski čolnar',
            description: 'Spust po reki Muri, eni zadnjih divjih rek v Evropi - prave evropske Amazonke, z izkušenimi vodniki',
            url: 'https://www.murski-colnar.si/'
        }
        // Dodaj več povezav tu
    ],

    en: [
        {
            id: 1,
            icon: 'links/logo_i_feel_slo.png',
            title: 'Slovenian Tourist Board',
            description: 'Official portal of Slovenian tourism with information about destinations, events, and tourist offers throughout Slovenia.',
            url: 'https://www.slovenia.info/en'
        },
        {
            id: 2,
            icon: 'links/logo_TIC_MT.svg',
            title: 'Tourist Information Center, TIC Moravske Toplice',
            description: 'Local tourist information: events, news, experiences, thermal water, hiking trails, gastronomy, information, ...',
            url: 'https://www.visitmoravsketoplice.com/en'
        },
        {
            id: 3,
            icon: 'links/logo_TIC_MT.svg',
            title: 'Bike Trails and Bike Rental - TIC Moravske Toplice',
            description: 'An extensive cycling network offering numerous marked circular routes with a total length of 250 km. Rental: trekking, e-bike or e-scooter.',
            url: 'https://www.visitmoravsketoplice.com/en/vsebina/522/Cycle-paths'
        },
        {
            id: 4,
            icon: 'links/logo_RIDE_Goricko.png',
            title: 'Guided Bike Tours and E-Bike Rental - Ride Goričko',
            description: 'Guided day tours, Team building and other tours. Rental: e-MTB.',
            url: 'https://ridegoricko.com/en/'
        },
        {
            id: 5,
            icon: 'links/logo_murski_colnar.jpg',
            title: 'Mura River Rafting - Murski čolnar',
            description: 'Rafting on the Mura River, one of Europe\'s last wild rivers - the real European Amazon, with experienced guides',
            url: 'https://www.murski-colnar.si/'
        }
    ],

    de: [
        {
            id: 1,
            icon: 'links/logo_i_feel_slo.png',
            title: 'Slowenisches Tourismusamt',
            description: 'Offizielles Portal des slowenischen Tourismus mit Informationen zu Destinationen, Veranstaltungen und touristischen Angeboten in ganz Slowenien.',
            url: 'https://www.slovenia.info/de'
        },
        {
            id: 2,
            icon: 'links/logo_TIC_MT.svg',
            title: 'Touristisches Informationszentrum, TIC Moravske Toplice',
            description: 'Lokale Touristeninformationen: Veranstaltungen, Neuigkeiten, Erlebnisse, Thermalwasser, Wanderwege, Gastronomie, Informationen, ...',
            url: 'https://www.visitmoravsketoplice.com/de'
        },
        {
            id: 3,
            icon: 'links/logo_TIC_MT.svg',
            title: 'Fahrradwege und Fahrradverleih - TIC Moravske Toplice',
            description: 'Ein weitverzweigtes Radwegenetz mit zahlreichen markierten Rundwegen von insgesamt 250 km Länge. Verleih: Trekking, E-Bike oder E-Scooter.',
            url: 'https://www.visitmoravsketoplice.com/de/vsebina/522/Radwege'
        },
        {
            id: 4,
            icon: 'links/logo_RIDE_Goricko.png',
            title: 'Geführte Fahrradtouren und E-Bike-Verleih - Ride Goričko',
            description: 'Geführte Tagestouren, Team Building und andere Touren. Verleih: E-MTB.',
            url: 'https://ridegoricko.com/en/de'
        },
        {
            id: 5,
            icon: 'links/logo_murski_colnar.jpg',
            title: 'Mur-Fluss-Rafting - Murski čolnar',
            description: 'Rafting auf der Mur, einem der letzten wilden Flüsse Europas - dem echten europäischen Amazonas, mit erfahrenen Führern',
            url: 'https://www.murski-colnar.si/'
        }
    ]
};


// Naloži links overlay
function loadLinks(lang = 'sl') {
    const container = document.getElementById('links-container');
    if (!container) return;

    const links = linksData[lang] || linksData.sl;

    let html = '';
    links.forEach(link => {
        // Enostavnejša koda brez rdečih atributov
        html += `
            <a href="${link.url}" class="link-item" data-id="${link.id}">
                <img src="${link.icon}" alt="${link.title}" class="link-icon contain">
                <div class="link-text">
                    <h3 class="link-title">${link.title}</h3>
                    <p class="link-description">${link.description}</p>
                </div>
                <button class="link-arrow" aria-label="Odpiranje povezave">❯</button>
            </a>
        `;
    });

    container.innerHTML = html;

    // Dodaj event listenerje za odpiranje povezav
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

    const links = linksData[lang] || linksData.sl;

    let html = '';
    links.forEach(link => {
        // Enostavna koda
        html += `
            <a href="${link.url}" class="link-item" data-id="${link.id}">
                <img src="${link.icon}" alt="${link.title}" class="link-icon contain">
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
    if (!linksData[lang]) return;

    // Posodobi naslov
    const title = document.getElementById('links-title');
    const navData = window.languageData?.[lang]?.nav;

    if (title && navData?.links) {
        title.textContent = navData.links;
    }

    // Posodobi povezave
    loadLinks(lang);
}

// ESC handler za links
function linksEscHandler(e) {
    if (e.key === 'Escape') {
        hideLinksOverlay();
    }
}

// Inicializacija
document.addEventListener('DOMContentLoaded', function () {
    // Klik na background zapre overlay
    const bg = document.getElementById('links-background');
    if (bg) {
        bg.addEventListener('click', function (e) {
            if (e.target === this) {
                hideLinksOverlay();
            }
        });
    }

    // Zapri z ESC tipko
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('links-overlay');
            if (overlay && overlay.classList.contains('active')) {
                hideLinksOverlay();
            }
        }
    });
});

// Eksport funkcij za globalno uporabo
window.showLinksOverlay = showLinksOverlay;
window.hideLinksOverlay = hideLinksOverlay;
window.updateLinksLanguage = updateLinksLanguage;
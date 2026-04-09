/* 043 */
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
        icon: 'links/logo_TIC_MT.svg',
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
        id: 3,
        icon: 'links/logo_TIC_MT.svg',
        logoBg: 'rgba(255, 255, 255, 1.00)',
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
        id: 5,
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
    }
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
    // Preveri, če je klik na zastavo - ne zapri overlayja
    const isFlag = e.target.closest('.language-flag');
    if (isFlag) {
        return;
    }

    const isOverlayContent = e.target.closest('#links-overlay');
    if (!isOverlayContent && window.activeOverlayType === 'links') {
        hideLinksOverlay();
    }
}

function showLinksOverlay() {
    if (window.activeOverlayType && window.activeOverlayType !== 'links') {
        return;
    }

    window.activeOverlayType = 'links';

    const bg = document.getElementById('links-background');
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

    document.addEventListener('keydown', linksEscHandler);
    document.body.addEventListener('click', linksBodyClickHandler);

    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideLinksOverlay() {
    const overlay = document.getElementById('links-overlay');
    const bg = document.getElementById('links-background');

    if (overlay) overlay.classList.remove('active');
    if (bg) bg.classList.remove('active');

    document.body.style.overflow = '';

    if (window.activeOverlayType === 'links') {
        window.activeOverlayType = null;
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

    container.querySelectorAll('.link-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            if (url) window.open(url, '_blank', 'noopener,noreferrer');
        });
    });

    container.querySelectorAll('.link-arrow').forEach(arrow => {
        arrow.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const linkItem = this.closest('.link-item');
            if (linkItem) {
                const url = linkItem.getAttribute('href');
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

document.addEventListener('DOMContentLoaded', function () {
    const bg = document.getElementById('links-background');
    if (bg) {
        bg.addEventListener('click', function (e) {
            if (e.target === this) hideLinksOverlay();
        });
    }
});

window.showLinksOverlay = showLinksOverlay;
window.hideLinksOverlay = hideLinksOverlay;
window.updateLinksLanguage = updateLinksLanguage;
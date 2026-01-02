/* 032 */
/* map-overlay.js v6 - z jezikovno podporo */
// Osnovni URL z parametri za jezik
const MAPS_BASE_URL = `https://maps.google.com/maps?width=1060&height=800&q=Rumičev%20breg%2071%20Moravske%20Toplice+(Iža%20na%20brejgi)&t=&z=12&ie=UTF8&iwloc=B&output=embed`;

// Jezikovne nastavitve
const MAPS_LANGUAGE_SETTINGS = {
    'sl': {
        hl: 'sl', // Slovensko
        hl_param: 'sl',
        title: "Iža na brejgi"
    },
    'en': {
        hl: 'en', // Angleško
        hl_param: 'en',
        title: "Iža na brejgi"
    },
    'de': {
        hl: 'de', // Nemško
        hl_param: 'de',
        title: "Iža na brejgi"
    }
};

// Funkcija za pridobitev URL glede na jezik
function getMapsUrl(lang = 'sl') {
    const settings = MAPS_LANGUAGE_SETTINGS[lang] || MAPS_LANGUAGE_SETTINGS['sl'];

    // Ustvari URL s pravilnimi parametri za jezik
    let url = `https://maps.google.com/maps?`;
    url += `width=1060&height=800`;
    url += `&hl=${settings.hl}`; // glavni jezik
    url += `&q=Rumičev%20breg%2071%20Moravske%20Toplice+(Iža%20na%20brejgi)`;
    url += `&t=`;
    url += `&z=12`;
    url += `&ie=UTF8`;
    url += `&iwloc=B`;
    url += `&output=embed`;

    return url;
}

function showMapWidget() {
    console.log('🗺️ Showing Map widget...');

    // Preveri če je že kak overlay aktiven
    if (window.activeOverlayType) {
        console.log(`Cannot show Map, ${window.activeOverlayType} is active`);
        return;
    }

    // Določi jezik (uporabi trenutni jezik strani)
    const currentLang = window.currentLanguage || 'sl';
    console.log('Current language for map:', currentLang);

    // Nastavi aktivni overlay
    window.activeOverlayType = 'map';

    // Pridobi višine
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const headerHeight = header ? header.offsetHeight : 80;
    const footerHeight = footer ? footer.offsetHeight : 60;
    const topOffset = 50;

    // Blur overlay (uporabi isti kot Hostex)
    const blurOverlay = document.getElementById('full-page-blur');
    if (blurOverlay) {
        blurOverlay.style.cssText = `
            position: fixed !important;
            top: ${headerHeight}px !important;
            left: 0 !important;
            width: 100% !important;
            height: calc(100vh - ${headerHeight + footerHeight}px) !important;
            background: rgba(0, 0, 0, 0.85) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            z-index: 1999 !important;
            opacity: 1 !important;
            pointer-events: all !important;
            cursor: pointer !important;
        `;
        blurOverlay.classList.add('active');

        // Dodaj event listener za klik na blur
        blurOverlay.addEventListener('click', function (e) {
            if (e.target === this) {
                hideMapWidget();
            }
        });
    }

    // Ustvari iframe če ne obstaja ali posodobi URL glede na jezik
    let mapsIframe = document.getElementById('map-iframe');
    const mapsUrl = getMapsUrl(currentLang);

    if (!mapsIframe) {
        mapsIframe = document.createElement('iframe');
        mapsIframe.id = 'map-iframe';
        mapsIframe.src = mapsUrl;
        mapsIframe.title = MAPS_LANGUAGE_SETTINGS[currentLang]?.title || "Iža na brejgi";
        mapsIframe.allowFullscreen = true;
        mapsIframe.loading = "lazy";
        mapsIframe.referrerPolicy = "no-referrer-when-downgrade";
        mapsIframe.style.cssText = `
            width: 100% !important;
            height: 100% !important;
            border: none !important;
            display: none !important;
        `;
        document.body.appendChild(mapsIframe);
    } else {
        // Posodobi URL in title glede na jezik
        mapsIframe.src = mapsUrl;
        mapsIframe.title = MAPS_LANGUAGE_SETTINGS[currentLang]?.title || "Iža na brejgi";
    }

    // Prikaži iframe
    mapsIframe.style.cssText = `
        position: fixed !important;
        top: ${headerHeight + topOffset}px !important;
        left: 0 !important;
        width: 100% !important;
        height: calc(100vh - ${headerHeight + footerHeight + topOffset}px) !important;
        z-index: 2000 !important;
        display: block !important;
        background: #156857 !important;
        overflow: hidden !important;
        border: none !important;
    `;

    // X gumb
    let closeButton = document.getElementById('close-map-widget');
    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.id = 'close-map-widget';
        closeButton.innerHTML = '×';
        closeButton.title = getCloseButtonTitle(currentLang);
        closeButton.setAttribute('aria-label', getCloseButtonTitle(currentLang));
        closeButton.addEventListener('click', hideMapWidget);
        document.body.appendChild(closeButton);
    } else {
        // Posodobi title gumba glede na jezik
        closeButton.title = getCloseButtonTitle(currentLang);
        closeButton.setAttribute('aria-label', getCloseButtonTitle(currentLang));
    }

    // Gumb naj bo identičen hostex gumbu
    closeButton.style.cssText = `
        position: fixed !important;
        top: ${headerHeight + 10}px !important;
        right: 10px !important;
        width: 35px !important;
        height: 35px !important;
        background: transparent !important;
        border: none !important;
        color: var(--font-color) !important;
        font-size: 2.2rem !important;
        font-weight: normal !important;
        cursor: pointer !important;
        z-index: 2001 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        padding: 0 !important;
        margin: 0 !important;
        line-height: 1 !important;
        opacity: 1 !important;
        text-shadow: var(--font-shadow) !important;
        transition: all 0.3s ease !important;
    `;

    // ESC tipka
    function escHandler(e) {
        if (e.key === 'Escape') {
            hideMapWidget();
            // Deselect vse selektirano besedilo
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document.selection) {
                document.selection.empty();
            }
        }
    }
    document.addEventListener('keydown', escHandler);

    // Shrani handler za poznejše brisanje
    mapsIframe._escHandler = escHandler;

    document.body.style.overflow = 'hidden';
}

// Funkcija za title gumba glede na jezik
function getCloseButtonTitle(lang) {
    const titles = {
        'sl': 'Zapri zemljevid',
        'en': 'Close map',
        'de': 'Karte schließen'
    };
    return titles[lang] || titles['sl'];
}

function hideMapWidget() {
    console.log('Hiding Map widget');

    const mapsIframe = document.getElementById('map-iframe');
    const closeButton = document.getElementById('close-map-widget');
    const blurOverlay = document.getElementById('full-page-blur');

    if (mapsIframe) {
        mapsIframe.style.cssText = `
            display: none !important;
        `;
        // Odstrani ESC handler
        if (mapsIframe._escHandler) {
            document.removeEventListener('keydown', mapsIframe._escHandler);
        }
    }

    if (closeButton) {
        closeButton.style.cssText = `
            display: none !important;
        `;
    }

    if (blurOverlay) {
        blurOverlay.style.opacity = '0';
        blurOverlay.style.pointerEvents = 'none';
        // Odstrani event listener
        blurOverlay.removeEventListener('click', hideMapWidget);
        setTimeout(() => blurOverlay.classList.remove('active'), 300);
    }

    // Reset aktivnega overlayja
    if (window.activeOverlayType === 'map') {
        window.activeOverlayType = null;
    }

    // Deselect vse selektirano besedilo
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }

    document.body.style.overflow = '';
}

// Funkcija za osvežitev zemljevida ob spremembi jezika
function refreshMapLanguage(lang) {
    console.log('Refreshing map language to:', lang);

    const mapsIframe = document.getElementById('map-iframe');
    if (mapsIframe && window.activeOverlayType === 'map') {
        // Če je zemljevid trenutno odprt, osveži z novim jezikom
        const mapsUrl = getMapsUrl(lang);
        mapsIframe.src = mapsUrl;
        mapsIframe.title = MAPS_LANGUAGE_SETTINGS[lang]?.title || "Iža na brejgi";

        // Posodobi tudi title zapiralnega gumba
        const closeButton = document.getElementById('close-map-widget');
        if (closeButton) {
            closeButton.title = getCloseButtonTitle(lang);
            closeButton.setAttribute('aria-label', getCloseButtonTitle(lang));
        }
    }
}

// Dodaj v global scope
if (typeof window !== 'undefined') {
    window.showMapWidget = showMapWidget;
    window.hideMapWidget = hideMapWidget;
    window.refreshMapLanguage = refreshMapLanguage;
}

// Poveži z language-manager.js
document.addEventListener('DOMContentLoaded', function () {
    // Če language-manager.js definira switchLanguage, dodaj listener
    if (typeof switchLanguage === 'function') {
        // Shrani originalno funkcijo
        const originalSwitchLanguage = switchLanguage;

        // Override funkcijo
        window.switchLanguage = function (lang) {
            // Pokliči originalno funkcijo
            originalSwitchLanguage(lang);

            // Osveži zemljevid če je odprt
            setTimeout(() => {
                if (typeof refreshMapLanguage === 'function') {
                    refreshMapLanguage(lang);
                }
            }, 100);
        };
    }
});
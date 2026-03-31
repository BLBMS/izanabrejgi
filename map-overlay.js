/* 033 */
/* map-overlay.js v7 - z detekcijo platforme (Apple Maps za iOS/macOS) */

// ============================================
// 1. DETEKCIJA PLATFORME
// ============================================
function detectPlatform() {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform?.toLowerCase() || '';
    
    // iOS (iPhone, iPad, iPod)
    if (/iphone|ipad|ipod/.test(userAgent)) {
        return 'ios';
    }
    
    // macOS
    if (/mac/.test(platform) && !/iphone|ipad|ipod/.test(userAgent)) {
        return 'macos';
    }
    
    // Android
    if (/android/.test(userAgent)) {
        return 'android';
    }
    
    // Windows
    if (/win/.test(platform)) {
        return 'windows';
    }
    
    // Linux in ostalo
    return 'other';
}

// ============================================
// 2. JEZIKOVNE NASTAVITVE (tvoje obstoječe)
// ============================================
const MAPS_LANGUAGE_SETTINGS = {
    'sl': {
        hl: 'sl',
        title: "Iža na brejgi"
    },
    'en': {
        hl: 'en',
        title: "Iža na brejgi"
    },
    'de': {
        hl: 'de',
        title: "Iža na brejgi"
    }
};

// Funkcija za pridobitev Google Maps URL (brez API ključa)
function getGoogleMapsUrl(lang = 'sl') {
    const settings = MAPS_LANGUAGE_SETTINGS[lang] || MAPS_LANGUAGE_SETTINGS['sl'];
    return `https://maps.google.com/maps?q=Rumičev%20breg%2071%20Moravske%20Toplice&output=embed&hl=${settings.hl}&z=12`;
}

// Funkcija za pridobitev Apple Maps URL
function getAppleMapsUrl(lang = 'sl') {
    const address = encodeURIComponent("Rumičev breg 71, 9226 Moravske Toplice");
    const lat = 46.709083;
    const lng = 16.246525;
    
    // Za iOS uporabimo maps:// (odpre aplikacijo)
    // Za macOS uporabimo https:// (odpre v brskalniku)
    const platform = detectPlatform();
    if (platform === 'ios') {
        return `maps://maps.apple.com/?q=${address}&ll=${lat},${lng}`;
    } else {
        return `https://maps.apple.com/?q=${address}&ll=${lat},${lng}`;
    }
}

// Funkcija za title zapiralnega gumba (tvoja obstoječa)
function getCloseButtonTitle(lang) {
    const titles = {
        'sl': 'Zapri zemljevid',
        'en': 'Close map',
        'de': 'Karte schließen'
    };
    return titles[lang] || titles['sl'];
}

// ============================================
// 3. GLAVNA FUNKCIJA ZA PRIKAZ ZEMLJEVIDA
// ============================================
function showMapWidget() {
    console.log('🗺️ Showing Map widget...');

    if (window.activeOverlayType) {
        console.log(`Cannot show Map, ${window.activeOverlayType} is active`);
        return;
    }

    const currentLang = window.currentLanguage || 'sl';
    const platform = detectPlatform();
    console.log('Platform:', platform, 'Language:', currentLang);

    // Za iOS in macOS odpremo Apple Maps v novem oknu/zavihku
    if (platform === 'ios' || platform === 'macos') {
        console.log('Opening Apple Maps for', platform);
        const appleMapsUrl = getAppleMapsUrl(currentLang);
        window.open(appleMapsUrl, '_blank');
        
        // Ne prikazujemo iframe, samo odpremo zunanjo aplikacijo
        return;
    }

    // Za ostale platforme (Windows, Android, Linux) uporabimo Google Maps iframe
    window.activeOverlayType = 'map';

    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const headerHeight = header ? header.offsetHeight : 80;
    const footerHeight = footer ? footer.offsetHeight : 60;
    const topOffset = 50;

    // BLUR OZADJE (tvoje obstoječe)
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

        blurOverlay.addEventListener('click', function (e) {
            if (e.target === this) hideMapWidget();
        });
    }

    // Ustvari iframe (tvoje obstoječe)
    let mapsIframe = document.getElementById('map-iframe');
    const mapsUrl = getGoogleMapsUrl(currentLang);

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
        mapsIframe.src = mapsUrl;
        mapsIframe.title = MAPS_LANGUAGE_SETTINGS[currentLang]?.title || "Iža na brejgi";
    }

    // Prikaži iframe (tvoje obstoječe)
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

    // X GUMB (tvoje obstoječe)
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
        closeButton.title = getCloseButtonTitle(currentLang);
        closeButton.setAttribute('aria-label', getCloseButtonTitle(currentLang));
    }

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

    // ESC handler (tvoje obstoječe)
    function escHandler(e) {
        if (e.key === 'Escape') {
            hideMapWidget();
            if (window.getSelection) window.getSelection().removeAllRanges();
        }
    }
    document.addEventListener('keydown', escHandler);
    mapsIframe._escHandler = escHandler;

    document.body.style.overflow = 'hidden';
}

// ============================================
// 4. FUNKCIJA ZA SKRIVANJE (tvoja obstoječa)
// ============================================
function hideMapWidget() {
    console.log('Hiding Map widget');

    const mapsIframe = document.getElementById('map-iframe');
    const closeButton = document.getElementById('close-map-widget');
    const blurOverlay = document.getElementById('full-page-blur');

    if (mapsIframe) {
        mapsIframe.style.cssText = `display: none !important;`;
        if (mapsIframe._escHandler) {
            document.removeEventListener('keydown', mapsIframe._escHandler);
        }
    }

    if (closeButton) {
        closeButton.style.cssText = `display: none !important;`;
    }

    if (blurOverlay) {
        blurOverlay.style.opacity = '0';
        blurOverlay.style.pointerEvents = 'none';
        blurOverlay.removeEventListener('click', hideMapWidget);
        setTimeout(() => blurOverlay.classList.remove('active'), 300);
    }

    if (window.activeOverlayType === 'map') {
        window.activeOverlayType = null;
    }

    if (window.getSelection) window.getSelection().removeAllRanges();
    document.body.style.overflow = '';
}

// ============================================
// 5. OSVEŽITEV OB SPREMEMBI JEZIKA (tvoja obstoječa)
// ============================================
function refreshMapLanguage(lang) {
    console.log('Refreshing map language to:', lang);

    const mapsIframe = document.getElementById('map-iframe');
    if (mapsIframe && window.activeOverlayType === 'map') {
        const mapsUrl = getGoogleMapsUrl(lang);
        mapsIframe.src = mapsUrl;
        mapsIframe.title = MAPS_LANGUAGE_SETTINGS[lang]?.title || "Iža na brejgi";

        const closeButton = document.getElementById('close-map-widget');
        if (closeButton) {
            closeButton.title = getCloseButtonTitle(lang);
            closeButton.setAttribute('aria-label', getCloseButtonTitle(lang));
        }
    }
}

// ============================================
// 6. EKSPORT V GLOBAL SCOPE
// ============================================
if (typeof window !== 'undefined') {
    window.showMapWidget = showMapWidget;
    window.hideMapWidget = hideMapWidget;
    window.refreshMapLanguage = refreshMapLanguage;
    window.detectPlatform = detectPlatform;
}

// Poveži z language-manager.js (tvoje obstoječe)
document.addEventListener('DOMContentLoaded', function () {
    if (typeof switchLanguage === 'function') {
        const originalSwitchLanguage = switchLanguage;
        window.switchLanguage = function (lang) {
            originalSwitchLanguage(lang);
            setTimeout(() => {
                if (typeof refreshMapLanguage === 'function') {
                    refreshMapLanguage(lang);
                }
            }, 100);
        };
    }
});

/* 034 */
/* map-overlay.js v8 - odpre aplikacijo na vseh platformah */

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
// 2. PRAVILNE KOORDINATE
// ============================================
const LAT = 46.709083;
const LNG = 16.246525;
const ADDRESS = "Rumičev breg 71, 9226 Moravske Toplice";
const ENCODED_ADDRESS = encodeURIComponent(ADDRESS);

// ============================================
// 3. FUNKCIJE ZA PRIDOBITEV URL PO PLATFORMI
// ============================================

function getMapsUrl(platform, lang = 'sl') {
    switch (platform) {
        case 'ios':
            // Apple Maps aplikacija
            return `maps://maps.apple.com/?q=${ENCODED_ADDRESS}&ll=${LAT},${LNG}`;

        case 'macos':
            // Apple Maps v brskalniku
            return `https://maps.apple.com/?q=${ENCODED_ADDRESS}&ll=${LAT},${LNG}`;

        case 'android':
            // Google Maps aplikacija (odpre v aplikaciji)
            // Uporabi geo: URI za odpiranje v aplikaciji
            return `geo:${LAT},${LNG}?q=${ENCODED_ADDRESS}`;

        case 'windows':
            // Windows - Google Maps v brskalniku (ker ni native aplikacije)
            return `https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}`;

        default:
            // Linux in ostalo - Google Maps v brskalniku
            return `https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}`;
    }
}

// ============================================
// 4. GLAVNA FUNKCIJA ZA PRIKAZ ZEMLJEVIDA
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

    // Za VSE platforme odpremo native aplikacijo ali brskalnik
    // Ne uporabljamo iframe, ker je boljša izkušnja v aplikaciji
    const mapsUrl = getMapsUrl(platform, currentLang);
    console.log('Opening maps URL:', mapsUrl);

    window.open(mapsUrl, '_blank');

    // Če je bil kak overlay aktiven, ga zapremo
    if (window.activeOverlayType) {
        // Samo sprostimo, ker smo odprli zunanjo aplikacijo
        window.activeOverlayType = null;
    }
}

// ============================================
// 5. FUNKCIJA ZA SKRIVANJE (za kompatibilnost)
// ============================================
function hideMapWidget() {
    console.log('Hiding Map widget (nothing to hide)');
    // Ničesar ne skrivamo, ker ne uporabljamo iframe

    if (window.activeOverlayType === 'map') {
        window.activeOverlayType = null;
    }
}

// ============================================
// 6. OSVEŽITEV OB SPREMEMBI JEZIKA
// ============================================
function refreshMapLanguage(lang) {
    console.log('Map language refresh (not needed for native apps):', lang);
    // Ni potrebno, ker ne uporabljamo iframe
}

// ============================================
// 7. EKSPORT V GLOBAL SCOPE
// ============================================
if (typeof window !== 'undefined') {
    window.showMapWidget = showMapWidget;
    window.hideMapWidget = hideMapWidget;
    window.refreshMapLanguage = refreshMapLanguage;
    window.detectPlatform = detectPlatform;
}

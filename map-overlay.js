// 050
// map-overlay.js

const LAT = 46.70913;
const LNG = 16.24649;
const PLACE_NAME = "Iža na brejgi";
const FULL_ADDRESS = "Iža na brejgi, Rumičev breg 71, 9226 Moravske Toplice, Slovenija";
const ENCODED_FULL_ADDRESS = encodeURIComponent(FULL_ADDRESS);
const ENCODED_PLACE_NAME = encodeURIComponent(PLACE_NAME);
const GOOGLE_PLACE_ID = "ChIJycPmd9A7b0cRx8FU_SUyL5M";
const APPLE_PLACE_ID = "I10C98484AA979597";
const PLUGSHARE_URL = "https://www.plugshare.com/location/564262";
const CHARGEMAP_URL = "https://chargemap.com/en-gb/megatel-moravske-toplice-83-rumicev-breg.html";

function detectPlatform() {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform?.toLowerCase() || '';
    if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
    if (/mac/.test(platform) && !/iphone|ipad|ipod/.test(userAgent)) return 'macos';
    if (/android/.test(userAgent)) return 'android';
    if (/win/.test(platform)) return 'windows';
    return 'other';
}

function getGoogleViewUrl() {
    return `https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}&query_place_id=${GOOGLE_PLACE_ID}`;
}

function getGoogleNavUrl() {
    return `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}&destination_place_id=${GOOGLE_PLACE_ID}`;
}

function getAppleViewUrl(platform) {
    const appleUrl = `https://maps.apple.com/place?place-id=${APPLE_PLACE_ID}&address=${encodeURIComponent("Rumičev breg 71, 9226 Moravske Toplice")}&coordinate=${LAT},${LNG}&name=${ENCODED_PLACE_NAME}&_provider=9902`;
    if (platform === 'ios') {
        return `maps://maps.apple.com/place?place-id=${APPLE_PLACE_ID}&address=${encodeURIComponent("Rumičev breg 71, 9226 Moravske Toplice")}&coordinate=${LAT},${LNG}&name=${ENCODED_PLACE_NAME}&_provider=9902`;
    } else {
        return appleUrl;
    }
}

function getAppleNavUrl(platform) {
    const destination = encodeURIComponent("Iža na brejgi, Rumičev breg 71, 9226 Moravske Toplice, Slovenija");
    const appleUrl = `https://maps.apple.com/directions?destination=${destination}&destination-place-id=${APPLE_PLACE_ID}&mode=driving`;
    if (platform === 'ios') {
        return `maps://maps.apple.com/directions?destination=${destination}&destination-place-id=${APPLE_PLACE_ID}&mode=driving`;
    } else {
        return appleUrl;
    }
}

function getMapText(lang, key) {
    const texts = window.languageData?.[lang]?.map;
    const defaults = {
        'viewLabel': 'Prikaži na zemljevidu',
        'navLabel': 'Navigacija / Izračun poti',
        'googleMaps': 'Google Maps',
        'appleMaps': 'Apple Maps',
        'evLabel': 'Polnilnica za EV',
        'plugShare': 'PlugShare'
    };
    return texts?.[key] || defaults[key] || '';
}

function showMapWidget() {
    if (typeof hideAllOverlays === 'function') {
        hideAllOverlays();
    }

    activeOverlayType = 'map';

    const currentLang = window.currentLanguage || 'sl';
    const platform = detectPlatform();

    const blurOverlay = document.getElementById('overlay-background');
    if (blurOverlay) {
        blurOverlay.classList.add('active');
        blurOverlay.style.display = 'block';
    }

    let mapContainer = document.getElementById('map-container');
    if (mapContainer) mapContainer.remove();

    mapContainer = document.createElement('div');
    mapContainer.id = 'map-container';
    document.body.appendChild(mapContainer);

    const viewLabel = getMapText(currentLang, 'viewLabel');
    const navLabel = getMapText(currentLang, 'navLabel');
    const googleText = getMapText(currentLang, 'googleMaps');
    const appleText = getMapText(currentLang, 'appleMaps');
    const evLabel = getMapText(currentLang, 'evLabel');
    const plugShareText = getMapText(currentLang, 'plugShare');

    // VEDNO ustvarimo OBE postavitvi. CSS odloči, katera je vidna.
    let buttonsLayout = `
        <!-- ZGORNJI GUMBI (Vidno v Portrait) -->
        <div class="map-buttons-container">
            <div class="map-button-group">
                <div class="map-button-label">${viewLabel}</div>
                <button class="map-btn google-view" data-type="google-view">
                    <img src="logos/google72.png" alt="Google Maps" class="map-btn-icon"> ${googleText}
                </button>
                <button class="map-btn apple-view" data-type="apple-view">
                    <img src="logos/apple72.png" alt="Apple Maps" class="map-btn-icon"> ${appleText}
                </button>
            </div>
            <div class="map-button-group">
                <div class="map-button-label">${navLabel}</div>
                <button class="map-btn google-nav" data-type="google-nav">
                    <img src="logos/google72.png" alt="Google Maps" class="map-btn-icon"> ${googleText}
                </button>
                <button class="map-btn apple-nav" data-type="apple-nav">
                    <img src="logos/apple72.png" alt="Apple Maps" class="map-btn-icon"> ${appleText}
                </button>
            </div>
            <div class="map-button-group">
                <div class="map-button-label ev-title">${evLabel}</div>
                <button class="map-btn plugshare-btn" data-type="plugshare">
                    <img src="logos/echarge-g.png" alt="PlugShare" class="map-btn-icon"> ${plugShareText}
                </button>
                <button class="map-btn chargemap-btn" data-type="chargemap">
                    <img src="logos/echarge-b.png" alt="Chargemap" class="map-btn-icon">
                    Chargemap
                </button>
            </div>
        </div>

        <!-- ZEMLJEVID (Vidno v Portrait) -->
        <div class="map-embed-container">
            <iframe id="map-iframe" 
                src="https://maps.google.com/maps?output=embed&hl=${currentLang}&z=15&q=${LAT}%2C${LNG}" 
                title="${PLACE_NAME}" 
                allowfullscreen 
                loading="lazy"
                style="width: 100%; height: 100%; min-height: 250px; border: none; border-radius: 8px;">
            </iframe>
        </div>

        <!-- STRANSKI GUMBI (Vidno v Landscape) -->
        <div class="map-buttons-sidebar">
            <div class="map-button-group">
                <div class="map-button-label">${viewLabel}</div>
                <button class="map-btn google-view" data-type="google-view">
                    <img src="logos/google72.png" alt="Google Maps" class="map-btn-icon"> ${googleText}
                </button>
                <button class="map-btn apple-view" data-type="apple-view">
                    <img src="logos/apple72.png" alt="Apple Maps" class="map-btn-icon"> ${appleText}
                </button>
            </div>
            <div class="map-button-group">
                <div class="map-button-label">${navLabel}</div>
                <button class="map-btn google-nav" data-type="google-nav">
                    <img src="logos/google72.png" alt="Google Maps" class="map-btn-icon"> ${googleText}
                </button>
                <button class="map-btn apple-nav" data-type="apple-nav">
                    <img src="logos/apple72.png" alt="Apple Maps" class="map-btn-icon"> ${appleText}
                </button>
            </div>
            <div class="map-button-group">
                <div class="map-button-label ev-title">${evLabel}</div>
                <button class="map-btn plugshare-btn" data-type="plugshare">
                    <img src="logos/echarge-g.png" alt="PlugShare" class="map-btn-icon"> ${plugShareText}
                </button>
                <button class="map-btn chargemap-btn" data-type="chargemap">
                    <img src="logos/echarge-b.png" alt="Chargemap" class="map-btn-icon">
                    Chargemap
                </button>
            </div>
        </div>

        <!-- ZEMLJEVID (Vidno v Landscape) -->
        <div class="map-embed-sidebar">
            <iframe id="map-iframe-sidebar" 
                src="https://maps.google.com/maps?output=embed&hl=${currentLang}&z=15&q=${LAT}%2C${LNG}" 
                title="${PLACE_NAME}" 
                allowfullscreen 
                loading="lazy"
                style="width: 100%; height: 100%; min-height: 250px; border: none; border-radius: 8px;">
            </iframe>
        </div>
    `;

    mapContainer.innerHTML = buttonsLayout;
    mapContainer.className = 'map-overlay';

    // Poveži gumbe
    document.querySelectorAll('.map-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const type = btn.getAttribute('data-type');
            let url = '';
            switch (type) {
                case 'google-view': url = getGoogleViewUrl(); break;
                case 'google-nav': url = getGoogleNavUrl(); break;
                case 'apple-view': url = getAppleViewUrl(platform); break;
                case 'apple-nav': url = getAppleNavUrl(platform); break;
                case 'plugshare': url = PLUGSHARE_URL; break;
                case 'chargemap': url = CHARGEMAP_URL; break;
            }
            if (url) window.open(url, '_blank');
        });
    });

    if (typeof adjustOverlayPosition === 'function') {
        adjustOverlayPosition();
        setTimeout(adjustOverlayPosition, 50);
        setTimeout(adjustOverlayPosition, 150);
    }

    document.body.style.overflow = 'hidden';
}

function hideMapWidget() {
    const mapContainer = document.getElementById('map-container');
    const blurOverlay = document.getElementById('overlay-background');

    if (mapContainer) mapContainer.remove();

    if (blurOverlay) {
        blurOverlay.classList.remove('active');
        blurOverlay.style.display = '';
    }

    if (activeOverlayType === 'map') {
        activeOverlayType = null;
    }

    document.body.style.overflow = '';
}

function refreshMapLanguage(lang) {
    const mapContainer = document.getElementById('map-container');
    if (mapContainer && activeOverlayType === 'map') {
        // 1. Posodobi iframe-a
        const iframe1 = document.getElementById('map-iframe');
        if (iframe1) iframe1.src = `https://maps.google.com/maps?output=embed&hl=${lang}&z=15&q=${LAT}%2C${LNG}`;

        const iframe2 = document.getElementById('map-iframe-sidebar');
        if (iframe2) iframe2.src = `https://maps.google.com/maps?output=embed&hl=${lang}&z=15&q=${LAT}%2C${LNG}`;

        // 2. Pridobi prevedene tekste
        const viewLabel = getMapText(lang, 'viewLabel');
        const navLabel = getMapText(lang, 'navLabel');
        const googleText = getMapText(lang, 'googleMaps');
        const appleText = getMapText(lang, 'appleMaps');
        const evLabel = getMapText(lang, 'evLabel');
        const plugShareText = getMapText(lang, 'plugShare');

        // 3. Posodobi VSE naslove (zgornje in stranske)
        //    .map-button-label je za "Prikaži na zemljevidu" in "Navigacija"
        //    .ev-title je za "Polnilnica za EV"
        const allLabels = document.querySelectorAll('.map-button-label');
        allLabels.forEach(label => {
            const text = label.textContent.trim();
            if (text === getMapText('sl', 'viewLabel') || text === getMapText('en', 'viewLabel') || text === getMapText('de', 'viewLabel')) {
                label.textContent = viewLabel;
            } else if (text === getMapText('sl', 'navLabel') || text === getMapText('en', 'navLabel') || text === getMapText('de', 'navLabel')) {
                label.textContent = navLabel;
            }
        });

        // .ev-title je za "Polnilnica za EV"
        const allEvTitles = document.querySelectorAll('.ev-title');
        allEvTitles.forEach(title => {
            title.textContent = evLabel;
        });

        // 4. Posodobi gumbe
        const btns = document.querySelectorAll('.map-btn');
        btns.forEach(btn => {
            if (btn.classList.contains('google-view') || btn.classList.contains('google-nav')) {
                btn.innerHTML = `<img src="logos/google72.png" alt="Google Maps" class="map-btn-icon"> ${googleText}`;
            } else if (btn.classList.contains('apple-view') || btn.classList.contains('apple-nav')) {
                btn.innerHTML = `<img src="logos/apple72.png" alt="Apple Maps" class="map-btn-icon"> ${appleText}`;
            } else if (btn.classList.contains('plugshare-btn')) {
                btn.innerHTML = `<img src="logos/echarge-g.png" alt="PlugShare" class="map-btn-icon"> ${plugShareText}`;
            }
        });
    }
}

// Ker CSS zdaj upravlja z orientacijo, ne potrebujemo več poslušalcev na orientacijo.

if (typeof window !== 'undefined') {
    window.showMapWidget = showMapWidget;
    window.hideMapWidget = hideMapWidget;
    window.refreshMapLanguage = refreshMapLanguage;
}
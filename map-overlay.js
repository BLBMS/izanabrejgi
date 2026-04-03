/* 033 */
/* map-overlay.js v17 - z ikonami za Google in Apple Maps */

// ============================================
// 1. KOORDINATE IN PODATKI
// ============================================
const LAT = 46.709083;
const LNG = 16.246525;
const PLACE_NAME = "Iža na brejgi";
const FULL_ADDRESS = "Iža na brejgi, Rumičev breg 71, 9226 Moravske Toplice, Slovenija";
const ENCODED_FULL_ADDRESS = encodeURIComponent(FULL_ADDRESS);
const ENCODED_PLACE_NAME = encodeURIComponent(PLACE_NAME);

// Apple Maps place ID
const APPLE_PLACE_ID = "I10C98484AA979597";

// ============================================
// 2. DETEKCIJA PLATFORME
// ============================================
function detectPlatform() {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform?.toLowerCase() || '';

    if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
    if (/mac/.test(platform) && !/iphone|ipad|ipod/.test(userAgent)) return 'macos';
    if (/android/.test(userAgent)) return 'android';
    if (/win/.test(platform)) return 'windows';
    return 'other';
}

// ============================================
// 3. FUNKCIJE ZA URL
// ============================================

// Google Maps - prikaži lokacijo (iskanje po imenu)
function getGoogleViewUrl() {
    return `https://www.google.com/maps/search/?api=1&query=${ENCODED_PLACE_NAME}`;
}

// Google Maps - navigacija
function getGoogleNavUrl() {
    return `https://www.google.com/maps/dir/?api=1&origin=&destination=${ENCODED_PLACE_NAME}`;
}

// Apple Maps - prikaži lokacijo
function getAppleViewUrl(platform) {
    const appleUrl = `https://maps.apple.com/place?place-id=${APPLE_PLACE_ID}&address=${encodeURIComponent("Rumičev breg 71, 9226 Moravske Toplice")}&coordinate=${LAT},${LNG}&name=${ENCODED_PLACE_NAME}&_provider=9902`;

    if (platform === 'ios') {
        return `maps://maps.apple.com/place?place-id=${APPLE_PLACE_ID}&address=${encodeURIComponent("Rumičev breg 71, 9226 Moravske Toplice")}&coordinate=${LAT},${LNG}&name=${ENCODED_PLACE_NAME}&_provider=9902`;
    } else {
        return appleUrl;
    }
}

// Apple Maps - navigacija
function getAppleNavUrl(platform) {
    const destination = encodeURIComponent("Iža na brejgi, Rumičev breg 71, 9226 Moravske Toplice, Slovenija");
    const appleUrl = `https://maps.apple.com/directions?destination=${destination}&destination-place-id=${APPLE_PLACE_ID}&mode=driving`;

    if (platform === 'ios') {
        return `maps://maps.apple.com/directions?destination=${destination}&destination-place-id=${APPLE_PLACE_ID}&mode=driving`;
    } else {
        return appleUrl;
    }
}

// ============================================
// 4. POMOŽNE FUNKCIJE
// ============================================
function getMapText(lang, key) {
    const texts = window.languageData?.[lang]?.map;
    const defaults = {
        'viewLabel': 'Prikaži na zemljevidu',
        'navLabel': 'Navigacija / Izračun poti',
        'googleMaps': 'Google Maps',
        'appleMaps': 'Apple Maps'
    };
    return texts?.[key] || defaults[key] || '';
}

// ============================================
// 5. GLAVNA FUNKCIJA ZA PRIKAZ
// ============================================
function showMapWidget() {
    console.log('🗺️ Showing Map widget...');

    if (typeof hideAllOverlays === 'function') {
        hideAllOverlays();
    }

    window.activeOverlayType = 'map';

    const currentLang = window.currentLanguage || 'sl';
    const platform = detectPlatform();
    console.log('Platform:', platform, 'Language:', currentLang);

    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const headerHeight = header ? header.offsetHeight : 80;
    const footerHeight = footer ? footer.offsetHeight : 60;

    const blurOverlay = document.getElementById('overlay-background');
    if (blurOverlay) {
        blurOverlay.classList.add('active');
        blurOverlay.style.display = 'block';
        blurOverlay.onclick = function (e) {
            if (e.target === this) hideMapWidget();
        };
    }

    const existingCloseBtn = document.getElementById('close-map-widget');
    if (existingCloseBtn) existingCloseBtn.remove();

    let mapContainer = document.getElementById('map-container');
    if (mapContainer) mapContainer.remove();

    mapContainer = document.createElement('div');
    mapContainer.id = 'map-container';
    document.body.appendChild(mapContainer);

    const viewLabel = getMapText(currentLang, 'viewLabel');
    const navLabel = getMapText(currentLang, 'navLabel');
    const googleText = getMapText(currentLang, 'googleMaps');
    const appleText = getMapText(currentLang, 'appleMaps');

    // Ustvari vsebino z ikonami (72x72, zmanjšane na velikost besedila)
    mapContainer.innerHTML = `
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
        </div>
        <div class="map-embed-container">
            <iframe id="map-iframe" src="https://maps.google.com/maps?q=${ENCODED_PLACE_NAME}&output=embed&hl=${currentLang}&z=15" title="${PLACE_NAME}" allowfullscreen loading="lazy"></iframe>
        </div>
    `;

    function positionMapContainer() {
        const headerHeight = header ? header.offsetHeight : 80;
        const footerHeight = footer ? footer.offsetHeight : 60;
        const topOffset = 5;

        mapContainer.style.cssText = `
            position: fixed !important;
            top: ${headerHeight + topOffset}px !important;
            left: 0 !important;
            right: 0 !important;
            width: 90% !important;
            max-width: 1000px !important;
            margin: 0 auto !important;
            height: calc(100vh - ${headerHeight + footerHeight + topOffset * 2}px) !important;
            min-height: 400px !important;
            z-index: 100 !important;
            display: flex !important;
            flex-direction: column !important;
            padding: 10px 15px !important;
            background: rgba(0, 0, 0, 0.7) !important;
            backdrop-filter: blur(5px) !important;
            -webkit-backdrop-filter: blur(5px) !important;
            border-radius: 8px !important;
            border: 1px solid rgba(208, 255, 0, 0.2) !important;
            overflow-y: auto !important;
            box-sizing: border-box !important;
        `;
    }

    positionMapContainer();

    if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => {
            positionMapContainer();
            positionCloseButton();
        });
        resizeObserver.observe(mapContainer);
        window.mapResizeObserver = resizeObserver;
    }

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
            }

            if (url) {
                console.log('Opening URL:', url);
                window.open(url, '_blank');
            }
        });
    });

    const closeButton = document.createElement('button');
    closeButton.id = 'close-map-widget';
    closeButton.innerHTML = '×';
    closeButton.title = 'Zapri zemljevid';
    document.body.appendChild(closeButton);

    closeButton.onmouseenter = function () {
        this.style.transform = 'scale(1.2)';
        this.style.color = 'var(--hover-color)';
    };
    closeButton.onmouseleave = function () {
        this.style.transform = 'scale(1)';
        this.style.color = 'var(--font-color)';
    };
    closeButton.onclick = hideMapWidget;

    function positionCloseButton() {
        const headerHeight = header ? header.offsetHeight : 80;
        const topOffset = 5;
        const containerTop = headerHeight + topOffset;

        closeButton.style.cssText = `
            position: fixed !important;
            top: ${containerTop + 8}px !important;
            right: calc(50% - min(500px, 45vw) + 10px) !important;
            width: 32px !important;
            height: 32px !important;
            background: transparent !important;
            border: none !important;
            color: var(--font-color) !important;
            font-size: 2rem !important;
            cursor: pointer !important;
            z-index: 101 !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 0 !important;
            text-shadow: var(--font-shadow) !important;
            transition: all 0.2s ease !important;
        `;
        closeButton.style.display = 'flex';
    }

    positionCloseButton();

    const closeObserver = new ResizeObserver(() => positionCloseButton());
    if (mapContainer) closeObserver.observe(mapContainer);
    window.mapCloseObserver = closeObserver;

    function escHandler(e) {
        if (e.key === 'Escape') hideMapWidget();
    }
    document.addEventListener('keydown', escHandler);
    window.mapEscHandler = escHandler;

    document.body.style.overflow = 'hidden';
}

// ============================================
// 6. SKRIJ ZEMLJEVID
// ============================================
function hideMapWidget() {
    console.log('Hiding Map widget');

    const mapContainer = document.getElementById('map-container');
    const closeButton = document.getElementById('close-map-widget');
    const blurOverlay = document.getElementById('overlay-background');

    if (mapContainer) mapContainer.remove();
    if (closeButton) closeButton.remove();

    if (blurOverlay) {
        blurOverlay.classList.remove('active');
        blurOverlay.style.display = '';
        blurOverlay.onclick = null;
    }

    if (window.mapResizeObserver) {
        window.mapResizeObserver.disconnect();
        window.mapResizeObserver = null;
    }
    if (window.mapCloseObserver) {
        window.mapCloseObserver.disconnect();
        window.mapCloseObserver = null;
    }
    if (window.mapEscHandler) {
        document.removeEventListener('keydown', window.mapEscHandler);
        window.mapEscHandler = null;
    }

    if (window.activeOverlayType === 'map') {
        window.activeOverlayType = null;
    }

    document.body.style.overflow = '';
}

// ============================================
// 7. OSVEŽITEV OB SPREMEMBI JEZIKA
// ============================================
function refreshMapLanguage(lang) {
    console.log('Refreshing map language to:', lang);

    const mapContainer = document.getElementById('map-container');
    if (mapContainer && window.activeOverlayType === 'map') {
        const iframe = document.getElementById('map-iframe');
        if (iframe) {
            iframe.src = `https://maps.google.com/maps?q=${ENCODED_PLACE_NAME}&output=embed&hl=${lang}&z=15`;
        }

        const viewLabel = getMapText(lang, 'viewLabel');
        const navLabel = getMapText(lang, 'navLabel');
        const googleText = getMapText(lang, 'googleMaps');
        const appleText = getMapText(lang, 'appleMaps');

        const labels = document.querySelectorAll('.map-button-label');
        if (labels[0]) labels[0].textContent = viewLabel;
        if (labels[1]) labels[1].textContent = navLabel;

        const btns = document.querySelectorAll('.map-btn');
        btns.forEach(btn => {
            const isGoogle = btn.classList.contains('google-view') || btn.classList.contains('google-nav');
            const isApple = btn.classList.contains('apple-view') || btn.classList.contains('apple-nav');

            if (isGoogle) {
                btn.innerHTML = `<img src="logos/google72.png" alt="Google Maps" class="map-btn-icon"> ${googleText}`;
            } else if (isApple) {
                btn.innerHTML = `<img src="logos/apple72.png" alt="Apple Maps" class="map-btn-icon"> ${appleText}`;
            }
        });
    }
}

// ============================================
// 8. EKSPORT
// ============================================
if (typeof window !== 'undefined') {
    window.showMapWidget = showMapWidget;
    window.hideMapWidget = hideMapWidget;
    window.refreshMapLanguage = refreshMapLanguage;
} []

// 045
// map-overlay.js

//const LAT = 46.709083;
//const LNG = 16.246525;
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
    console.log('🗺️ Showing Map widget...');

    if (typeof hideAllOverlays === 'function') {
        hideAllOverlays();
    }

    activeOverlayType = 'map';

    const currentLang = window.currentLanguage || 'sl';
    const platform = detectPlatform();

    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const headerHeight = header ? header.offsetHeight : 80;
    const footerHeight = footer ? footer.offsetHeight : 60;

    // Preveri ali je landscape na mobitelu
    const isLandscapeView = window.innerWidth > window.innerHeight;
    const isMobileView = window.innerWidth <= 933;

    // V landscape načinu zmanjšamo odmik na 2px
    let topOffset;
    if (isMobileView && isLandscapeView) {
        topOffset = headerHeight + 2;
    } else {
        topOffset = headerHeight + 20;
    }

    const bottomOffset = footerHeight + 20;

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
    const evLabel = getMapText(currentLang, 'evLabel');
    const plugShareText = getMapText(currentLang, 'plugShare');

    // Ugotovimo ali je landscape
    const isLandscape = window.innerWidth > window.innerHeight;
    const isMobile = window.innerWidth <= 933;

    let buttonsLayout = '';

    if (isMobile && isLandscape) {
        // Landscape način - gumbi levo, mapa desno
        buttonsLayout = `
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
            <div class="map-embed-sidebar">
                <iframe id="map-iframe" 
                    src="https://maps.google.com/maps?output=embed&hl=${currentLang}&z=15&q=${LAT}%2C${LNG}" 
                    title="${PLACE_NAME}" 
                    allowfullscreen 
                    loading="lazy"
                    style="width: 100%; height: 100%; border: none; border-radius: 8px;">
                </iframe>
            </div>
        `;
    } else {
        // Portret ali desktop - standardni prikaz
        buttonsLayout = `
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
            <div class="map-embed-container">
                <iframe id="map-iframe" 
                    src="https://maps.google.com/maps?output=embed&hl=${currentLang}&z=15&q=${LAT}%2C${LNG}" 
                    title="${PLACE_NAME}" 
                    allowfullscreen 
                    loading="lazy"
                    style="width: 100%; height: 100%; min-height: 300px; border: none; border-radius: 8px;">
                </iframe>
            </div>
        `;
    }

    mapContainer.innerHTML = buttonsLayout;

    mapContainer.style.cssText = `
    position: fixed !important;
    top: ${topOffset}px !important;
    left: 0 !important;
    right: 0 !important;
    width: 90% !important;
    max-width: 1000px !important;
    margin: 0 auto !important;
    /* IZBRISAN height in max-height - naj CSS določi */
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
    overflow-x: hidden !important;
    -webkit-overflow-scrolling: touch !important;
    box-sizing: border-box !important;
`;

    // Če je landscape in mobile, spremenimo flex smer
    if (isMobile && isLandscape) {
        mapContainer.style.flexDirection = 'row';
        mapContainer.style.alignItems = 'stretch';
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
                case 'plugshare': url = PLUGSHARE_URL; break;
                case 'chargemap': url = CHARGEMAP_URL; break;
            }
            if (url) window.open(url, '_blank');
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

    closeButton.style.cssText = `
        position: fixed !important;
        top: ${topOffset + 10}px !important;
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

    function escHandler(e) {
        if (e.key === 'Escape') hideMapWidget();
    }
    document.addEventListener('keydown', escHandler);
    window.mapEscHandler = escHandler;

    document.body.style.overflow = 'hidden';
}

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

    if (window.mapEscHandler) {
        document.removeEventListener('keydown', window.mapEscHandler);
        window.mapEscHandler = null;
    }

    if (activeOverlayType === 'map') {
        activeOverlayType = null;
    }

    document.body.style.overflow = '';
}

function refreshMapLanguage(lang) {
    console.log('Refreshing map language to:', lang);
    const mapContainer = document.getElementById('map-container');
    if (mapContainer && activeOverlayType === 'map') {
        const iframe = document.getElementById('map-iframe');
        if (iframe) {
            iframe.src = `https://maps.google.com/maps?output=embed&hl=${lang}&z=15&q=${LAT}%2C${LNG}`;
        }
        const viewLabel = getMapText(lang, 'viewLabel');
        const navLabel = getMapText(lang, 'navLabel');
        const googleText = getMapText(lang, 'googleMaps');
        const appleText = getMapText(lang, 'appleMaps');
        const evLabel = getMapText(lang, 'evLabel');
        const labels = document.querySelectorAll('.map-button-label');
        if (labels[0]) labels[0].textContent = viewLabel;
        if (labels[1]) labels[1].textContent = navLabel;
        const btns = document.querySelectorAll('.map-btn');
        const evTitles = document.querySelectorAll('.ev-title');
        evTitles.forEach(title => {
            title.textContent = evLabel;
        });
        btns.forEach(btn => {
            if (btn.classList.contains('google-view') || btn.classList.contains('google-nav')) {
                btn.innerHTML = `<img src="logos/google72.png" alt="Google Maps" class="map-btn-icon"> ${googleText}`;
            } else if (btn.classList.contains('apple-view') || btn.classList.contains('apple-nav')) {
                btn.innerHTML = `<img src="logos/apple72.png" alt="Apple Maps" class="map-btn-icon"> ${appleText}`;
            }
        });
    }
}

function refreshMapLayout() {
    const mapContainer = document.getElementById('map-container');
    if (mapContainer && activeOverlayType === 'map') {
        const wasActive = mapContainer && mapContainer.parentNode;
        if (wasActive) {
            hideMapWidget();
            setTimeout(() => {
                showMapWidget();
            }, 50);
        }
    }
}

// Opazujemo spremembo orientacije
window.addEventListener('orientationchange', function () {
    setTimeout(refreshMapLayout, 100);
});

window.addEventListener('resize', function () {
    const isLandscapeNow = window.innerWidth > window.innerHeight;
    const wasLandscape = window._wasLandscape;
    if (isLandscapeNow !== wasLandscape && activeOverlayType === 'map') {
        refreshMapLayout();
    }
    window._wasLandscape = isLandscapeNow;
});

if (typeof window !== 'undefined') {
    window.showMapWidget = showMapWidget;
    window.hideMapWidget = hideMapWidget;
    window.refreshMapLanguage = refreshMapLanguage;
}

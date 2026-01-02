/* 031 */
/* map-overlay.js v2 */
const LOCATION_COORDINATES = '46.70896220,16.24640130';
const MAPS_EMBED_URL = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2762.1234567890!2d16.24640130!3d46.70896220!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d123456789abc%3A0x1234567890abcdef!2zNDbCsDQyJzMyLjMiTiAxNsKwMTQnNDcuMCJF!5e0!3m2!1ssl!2ssi!4v1700000000000!5m2!1ssl!2ssi`;

function showMapWidget() {
    console.log('🗺️ Showing Map widget...');

    // Preveri če je že kak overlay aktiven
    if (window.activeOverlayType) {
        console.log(`Cannot show Map, ${window.activeOverlayType} is active`);
        return;
    }

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
        `;
        blurOverlay.classList.add('active');
    }

    // Ustvari iframe če ne obstaja
    let mapsIframe = document.getElementById('map-iframe');
    if (!mapsIframe) {
        mapsIframe = document.createElement('iframe');
        mapsIframe.id = 'map-iframe';
        mapsIframe.src = MAPS_EMBED_URL;
        mapsIframe.title = "Lokacija Iža na brejgi";
        mapsIframe.allowFullscreen = true;
        mapsIframe.loading = "lazy";
        mapsIframe.referrerPolicy = "no-referrer-when-downgrade";
        document.body.appendChild(mapsIframe);
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
        overflow-y: auto !important;
        border: none !important;
    `;

    // X gumb (isti kot Hostex)
    let closeButton = document.getElementById('close-map-widget');
    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.id = 'close-map-widget';
        closeButton.innerHTML = '×';
        closeButton.title = 'Zapri zemljevid';
        closeButton.setAttribute('aria-label', 'Zapri zemljevid');
        closeButton.addEventListener('click', hideMapWidget);
        document.body.appendChild(closeButton);
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
        transition: all 0.2s ease !important;
    `;
    closeButton.style.display = 'block';

    // ESC tipka
    function escHandler(e) {
        if (e.key === 'Escape') hideMapWidget();
    }
    document.addEventListener('keydown', escHandler);

    // Shrani handler za poznejše brisanje
    mapsIframe._escHandler = escHandler;

    document.body.style.overflow = 'hidden';
}

function hideMapWidget() {
    console.log('Hiding Map widget');

    const mapsIframe = document.getElementById('map-iframe');
    const closeButton = document.getElementById('close-map-widget');
    const blurOverlay = document.getElementById('full-page-blur');

    if (mapsIframe) {
        mapsIframe.style.display = 'none';
        // Odstrani ESC handler
        if (mapsIframe._escHandler) {
            document.removeEventListener('keydown', mapsIframe._escHandler);
        }
    }

    if (closeButton) closeButton.style.display = 'none';

    if (blurOverlay) {
        blurOverlay.style.opacity = '0';
        blurOverlay.style.pointerEvents = 'none';
        setTimeout(() => blurOverlay.classList.remove('active'), 300);
    }

    // Reset aktivnega overlayja
    if (window.activeOverlayType === 'map') {
        window.activeOverlayType = null;
    }

    document.body.style.overflow = '';
}

// Dodaj v global scope
if (typeof window !== 'undefined') {
    window.showMapWidget = showMapWidget;
    window.hideMapWidget = hideMapWidget;
}
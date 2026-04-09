// 043a
// hostex.js - CELOZASLONSKI WIDGET

if (!window.activeOverlayType) window.activeOverlayType = null;
if (!window.hostexScriptLoaded) window.hostexScriptLoaded = false;

function loadHostexScript() {
    return new Promise((resolve, reject) => {
        if (window.hostexScriptLoaded) {
            resolve();
            return;
        }
        if (document.querySelector('script[src*="hostex-widget.js"]')) {
            window.hostexScriptLoaded = true;
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://hostex.io/app/assets/js/hostex-widget.js?version=20260211115522';
        script.type = 'module';
        script.onload = () => {
            console.log('Hostex script loaded');
            window.hostexScriptLoaded = true;
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function createHostexWidget() {
    let widget = document.querySelector('hostex-booking-widget');
    if (widget) return widget;
    widget = document.createElement('hostex-booking-widget');
    widget.setAttribute('listing-id', '115139');
    widget.setAttribute('id', 'eyJob3N0X2lkIjoiMTAzNzI3Iiwid2lkZ2V0X2hvc3QiOiJodHRwczovL3cuaG9zdGV4Ym9va2luZy5zaXRlIn0=');
    widget.style.display = 'none';
    document.body.appendChild(widget);
    return widget;
}

async function showHostexWidget() {
    console.log('👁️ Showing Hostex widget (fullscreen)...');

    if (typeof hideAllOverlays === 'function') {
        hideAllOverlays();
    }

    try {
        await loadHostexScript();
    } catch (error) {
        console.error('Failed to load Hostex script:', error);
        return;
    }

    window.activeOverlayType = 'hostex';

    const widget = createHostexWidget();
    if (!widget) {
        console.error('Failed to create Hostex widget');
        return;
    }

    // CELOZASLONSKI WIDGET - čez vse
    widget.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 10000 !important;
        display: block !important;
        background: rgba(0, 0, 0, 0.95) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        -webkit-overflow-scrolling: touch !important;
        padding: 10px !important;
        box-sizing: border-box !important;
    `;

    // X GUMB - desno zgoraj
    let closeButton = document.getElementById('global-hostex-close');
    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.id = 'global-hostex-close';
        closeButton.innerHTML = '×';
        closeButton.title = 'Zapri rezervacije';
        document.body.appendChild(closeButton);
        closeButton.onclick = hideHostexWidget;
        closeButton.onmouseenter = function () {
            this.style.transform = 'scale(1.2)';
            this.style.color = 'var(--hover-color)';
        };
        closeButton.onmouseleave = function () {
            this.style.transform = 'scale(1)';
            this.style.color = 'var(--font-color)';
        };
    }
/*
    closeButton.style.cssText = `
        position: fixed !important;
        top: 15px !important;
        right: 15px !important;
        width: 45px !important;
        height: 45px !important;
        background: rgba(0, 0, 0, 0.7) !important;
        border: 2px solid var(--font-color) !important;
        border-radius: 50% !important;
        color: var(--font-color) !important;
        font-size: 2.5rem !important;
        cursor: pointer !important;
        z-index: 10001 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        padding: 0 !important;
        margin: 0 !important;
        line-height: 1 !important;
        transition: all 0.2s ease !important;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3) !important;
    `;
*/
    closeButton.style.display = 'flex';

    // Blur ozadje (ne rabimo, ker je widget sam čez vse)
    const blurOverlay = document.getElementById('full-page-blur');
    if (blurOverlay) {
        blurOverlay.classList.remove('active');
    }

    document.body.style.overflow = 'hidden';
}

function hideHostexWidget() {
    console.log('👁️‍🗨️ Hiding Hostex widget...');

    const widget = document.querySelector('hostex-booking-widget');
    if (widget) widget.style.display = 'none';

    const closeButton = document.getElementById('global-hostex-close');
    if (closeButton) closeButton.style.display = 'none';

    document.body.style.overflow = '';

    if (window.activeOverlayType === 'hostex') {
        window.activeOverlayType = null;
    }
}

// ESC KEY
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideHostexWidget();
});

window.showHostexWidget = showHostexWidget;
window.hideHostexWidget = hideHostexWidget;

// 043
// hostex.js

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
    widget.style.position = 'fixed';
    widget.style.zIndex = '2000';
    widget.style.background = 'transparent';
    widget.style.overflowY = 'auto';
    widget.style.WebkitOverflowScrolling = 'touch';
    document.body.appendChild(widget);
    return widget;
}

async function showHostexWidget() {
    console.log('👁️ Showing Hostex widget...');

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

    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const headerHeight = header ? header.offsetHeight : 80;
    const footerHeight = footer ? footer.offsetHeight : 60;
    const topOffset = headerHeight + 20;
    const bottomOffset = footerHeight + 20;

    widget.style.cssText = `
        position: fixed !important;
        top: ${topOffset}px !important;
        left: 0 !important;
        right: 0 !important;
        width: 90% !important;
        max-width: 1000px !important;
        margin: 0 auto !important;
        height: calc(100vh - ${topOffset + bottomOffset}px) !important;
        min-height: 400px !important;
        z-index: 2000 !important;
        display: block !important;
        background: rgba(0, 0, 0, 0.7) !important;
        backdrop-filter: blur(5px) !important;
        -webkit-backdrop-filter: blur(5px) !important;
        border-radius: 8px !important;
        border: 1px solid rgba(208, 255, 0, 0.2) !important;
        overflow-y: auto !important;
        box-sizing: border-box !important;
    `;

    let closeButton = document.getElementById('global-hostex-close');
    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.id = 'global-hostex-close';
        closeButton.innerHTML = '×';
        closeButton.title = 'Zapri rezervacije';
        document.body.appendChild(closeButton);
        closeButton.onmouseenter = function () {
            this.style.transform = 'scale(1.2)';
            this.style.color = 'var(--hover-color)';
        };
        closeButton.onmouseleave = function () {
            this.style.transform = 'scale(1)';
            this.style.color = 'var(--font-color)';
        };
        closeButton.onclick = hideHostexWidget;
    }

    closeButton.style.cssText = `
        position: fixed !important;
        top: ${topOffset + 2}px !important;
        right: calc(50% - min(500px, 45vw) + 2px) !important;
        width: 35px !important;
        height: 35px !important;
        background: transparent !important;
        border: none !important;
        color: var(--font-color) !important;
        font-size: 2.2rem !important;
        cursor: pointer !important;
        z-index: 2001 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        padding: 0 !important;
        text-shadow: var(--font-shadow) !important;
        transition: all 0.2s ease !important;
    `;
    closeButton.style.display = 'flex';

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

    document.body.style.overflow = 'hidden';
}

function hideHostexWidget() {
    console.log('👁️‍🗨️ Hiding Hostex widget...');

    const widget = document.querySelector('hostex-booking-widget');
    if (widget) widget.style.display = 'none';

    const blurOverlay = document.getElementById('full-page-blur');
    if (blurOverlay) {
        blurOverlay.style.cssText = '';
        blurOverlay.classList.remove('active');
    }

    const closeButton = document.getElementById('global-hostex-close');
    if (closeButton) closeButton.style.display = 'none';

    document.body.style.overflow = '';

    if (window.activeOverlayType === 'hostex') {
        window.activeOverlayType = null;
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideHostexWidget();
});

document.addEventListener('DOMContentLoaded', function () {
    const blurOverlay = document.getElementById('full-page-blur');
    if (blurOverlay) {
        blurOverlay.addEventListener('click', function (e) {
            if (e.target === this) hideHostexWidget();
        });
    }
});

window.showHostexWidget = showHostexWidget;
window.hideHostexWidget = hideHostexWidget;
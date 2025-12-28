/* 027 */
// HOSTEX WIDGET - PREPROSTO

function showHostexWidget() {
    console.log('👁️ Showing Hostex widget...');

    // Skrij druge overlaye
    if (typeof hideAllOverlays === 'function') {
        hideAllOverlays();
    }

    // Ustvari widget če še ne obstaja - this is copy from Hostex.io
    let widget = document.querySelector('hostex-booking-widget');
    if (!widget) {
        widget = document.createElement('hostex-booking-widget');
        widget.setAttribute('listing-id', '115139');
        widget.setAttribute('id', 'eyJob3N0X2lkIjoiMTAzNzI3Iiwid2lkZ2V0X2hvc3QiOiJodHRwczovL3cuaG9zdGV4Ym9va2luZy5zaXRlIn0=');
        document.body.appendChild(widget);
    }

    // Pridobi višine
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const headerHeight = header ? header.offsetHeight : 80;
    const footerHeight = footer ? footer.offsetHeight : 60;

    // OMIK OD ZGORNJEGA ROBA (za X)
    const topOffset = 50; // px odmika od roba

    // POSTAVI WIDGET
    widget.style.cssText = `
        position: fixed !important;
        top: ${headerHeight + topOffset}px !important;
        left: 0 !important;
        width: 100% !important;
        height: calc(100vh - ${headerHeight + footerHeight + topOffset}px) !important;
        z-index: 2000 !important;
        display: block !important;
        background: transparent !important;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch !important;

    `;

    // BLUR OZADJE
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

    // X GUMB - PREPROST, SAMO X, BREZ OZADJA
    let closeButton = document.getElementById('global-hostex-close');
    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.id = 'global-hostex-close';
        closeButton.innerHTML = '×';
        closeButton.title = 'Zapri rezervacije';
        closeButton.setAttribute('aria-label', 'Zapri rezervacije');
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

    // Event listener
    closeButton.onclick = hideHostexWidget;

    // Hover efekt
    closeButton.onmouseenter = function () {
        this.style.transform = 'scale(1.2)';
        this.style.color = 'var(--hover-color)';
    };
    closeButton.onmouseleave = function () {
        this.style.transform = 'scale(1)';
        this.style.color = 'var(--font-color)';
    };

    // Onemogoči scroll
    document.body.style.overflow = 'hidden';
}

function hideHostexWidget() {
    console.log('👁️‍🗨️ Hiding Hostex widget...');

    // Skrij widget
    const widget = document.querySelector('hostex-booking-widget');
    if (widget) widget.style.display = 'none';

    // Skrij blur
    const blurOverlay = document.getElementById('full-page-blur');
    if (blurOverlay) {
        blurOverlay.style.cssText = '';
        blurOverlay.classList.remove('active');
    }

    // Skrij X
    const closeButton = document.getElementById('global-hostex-close');
    if (closeButton) closeButton.style.display = 'none';

    // Omogoči scroll
    document.body.style.overflow = '';
}

// ESC KEY
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideHostexWidget();
});

// Klik na blur
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
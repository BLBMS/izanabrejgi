// 035
// HOSTEX WIDGET - USTVARJANJE V JS

// Inicializiraj globalno spremenljivko če ne obstaja
if (!window.activeOverlayType) window.activeOverlayType = null;
if (!window.hostexScriptLoaded) window.hostexScriptLoaded = false;

// Funkcija za pridobitev Hostex teksta v trenutnem jeziku
function getHostexText() {
    const lang = window.currentLanguage || 'sl';
    const hostexData = window.languageData?.[lang]?.hostex;

    if (hostexData && hostexData.items) {
        return hostexData;
    }

    // Fallback za slovenščino
    return {
        items: [
            "Ponujamo direktno rezervacijo brez provizije preko lastnega portala spodaj. Plačilo s kreditno kartico.",
            "Check-in se izvede preko on-line portala na dan prihoda v nastanitev. Takrat se preko istega portala plača tudi turistična taksa. Plačilo s kreditno kartico."
        ]
    };
}

// Funkcija za posodobitev ali ustvarjanje header teksta
function updateHostexHeader() {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 80;
    const text = getHostexText();

    let headerDiv = document.getElementById('hostex-header-text');

    if (!headerDiv) {
        headerDiv = document.createElement('div');
        headerDiv.id = 'hostex-header-text';
        headerDiv.className = 'hostex-header-text';
        document.body.appendChild(headerDiv);
    }

    // Postavi header tekst takoj pod header
    headerDiv.style.top = `${headerHeight}px`;

    // Generiraj seznam s pikami
    let itemsHtml = '';
    if (text.items && text.items.length > 0) {
        itemsHtml = '<ul class="hostex-info-list">';
        text.items.forEach(item => {
            const cleanItem = item.replace(/^•\s*/, '');
            itemsHtml += `<li>${cleanItem}</li>`;
        });
        itemsHtml += '</ul>';
    }

    headerDiv.innerHTML = itemsHtml;
}
    
// Funkcija za skrivanje header teksta
function hideHostexHeader() {
    const headerDiv = document.getElementById('hostex-header-text');
    if (headerDiv) {
        headerDiv.remove();
    }
}

// Funkcija za nalaganje Hostex skripte
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

// Funkcija za ustvarjanje widgeta
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

    // ========== DODANO: ZAPRI VSE OVERLAYE PREDEN ODPREŠ HOSTEX ==========
    if (typeof hideAllOverlays === 'function') {
        hideAllOverlays();
    }
    // ======================================================================

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

    // Ustvari ali posodobi header tekst
    // updateHostexHeader();

    // Funkcija za pozicioniranje vseh elementov
    function positionAllElements() {
        // Pridobi header tekst div in njegovo višino
        const headerTextDiv = document.getElementById('hostex-header-text');
        let headerTextHeight = 0;

        if (headerTextDiv) {
            headerTextHeight = headerTextDiv.offsetHeight;
            // Zagotovi, da je header tekst pod headerjem
            headerTextDiv.style.top = `${headerHeight}px`;
        }

        // Izračunaj top offset za widget (header + header tekst)
        const topOffset = headerHeight + headerTextHeight;

        // POSTAVI WIDGET pod header tekst
        widget.style.cssText = `
            position: fixed !important;
            top: ${topOffset}px !important;
            left: 0 !important;
            width: 100% !important;
            height: calc(100vh - ${topOffset + footerHeight}px) !important;
            z-index: 2000 !important;
            display: block !important;
            background: transparent !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
        `;

        // X GUMB - postavi ga pod header tekst, desno zgoraj nad widgetom
        let closeButton = document.getElementById('global-hostex-close');
        if (!closeButton) {
            closeButton = document.createElement('button');
            closeButton.id = 'global-hostex-close';
            closeButton.innerHTML = '×';
            closeButton.title = 'Zapri rezervacije';
            closeButton.setAttribute('aria-label', 'Zapri rezervacije');
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

        // Postavi X gumb
        closeButton.style.cssText = `
            position: fixed !important;
            top: ${topOffset + 10}px !important;
            right: 20px !important;
            width: 40px !important;
            height: 40px !important;
            background: transparent !important;
            border: none !important;
            color: var(--font-color) !important;
            font-size: 2.5rem !important;
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
        closeButton.style.display = 'flex';
    }

    // Takoj pozicioniraj
    positionAllElements();

    // Uporabi ResizeObserver za spremljanje sprememb višine header teksta
    /*
    const headerTextDiv = document.getElementById('hostex-header-text');
    if (headerTextDiv && window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => {
            positionAllElements();
        });
        resizeObserver.observe(headerTextDiv);
        // Shrani observer za kasnejše čiščenje
        window.hostexResizeObserver = resizeObserver;
    }
*/
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

    document.body.style.overflow = 'hidden';
}

function hideHostexWidget() {
    console.log('👁️‍🗨️ Hiding Hostex widget...');

    // Počisti ResizeObserver
    if (window.hostexResizeObserver) {
        window.hostexResizeObserver.disconnect();
        window.hostexResizeObserver = null;
    }

    const widget = document.querySelector('hostex-booking-widget');
    if (widget) widget.style.display = 'none';

    // Skrij header tekst
    hideHostexHeader();

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

// Poslušaj spremembe jezika
if (typeof window.switchLanguage === 'function') {
    const originalSwitchLanguage = window.switchLanguage;
    window.switchLanguage = function (lang) {
        originalSwitchLanguage(lang);
        // Če je hostex odprt, posodobi tekst
        if (window.activeOverlayType === 'hostex') {
            updateHostexHeader();
        }
    };
}

// Dodaj na konec hostex.js

// Poslušalec za spremembo velikosti okna
window.addEventListener('resize', function () {
    if (window.activeOverlayType === 'hostex') {
        // Ponovno pozicioniraj vse elemente
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80;

        const headerTextDiv = document.getElementById('hostex-header-text');
        if (headerTextDiv) {
            headerTextDiv.style.top = `${headerHeight}px`;
            const headerTextHeight = headerTextDiv.offsetHeight;

            // Posodobi X gumb
            const closeButton = document.getElementById('global-hostex-close');
            if (closeButton && closeButton.style.display === 'flex') {
                closeButton.style.top = `${headerHeight + headerTextHeight + 5}px`;
            }

            // Posodobi widget
            const widget = document.querySelector('hostex-booking-widget');
            const footer = document.querySelector('footer');
            const footerHeight = footer ? footer.offsetHeight : 60;

            if (widget && widget.style.display === 'block') {
                const topOffset = headerHeight + headerTextHeight;
                widget.style.top = `${topOffset}px`;
                widget.style.height = `calc(100vh - ${topOffset + footerHeight}px)`;
            }
        }
    }
});

// ============================================
// POSLUŠALEC ZA SPREMEMBO JEZIKA
// ============================================

// Funkcija za posodobitev Hostexa ob spremembi jezika
function updateHostexOnLanguageChange() {
    // Preveri, če je Hostex widget odprt
    const widget = document.querySelector('hostex-booking-widget');
    if (widget && widget.style.display === 'block') {
        console.log('Language changed while Hostex is open, updating header...');

        // Posodobi header tekst
        updateHostexHeader();

        // Počakaj, da se nov tekst renderira, nato ponovno pozicioniraj
        setTimeout(() => {
            // Ponovno pozicioniraj widget in X gumb
            const header = document.querySelector('header');
            const footer = document.querySelector('footer');
            const headerHeight = header ? header.offsetHeight : 80;
            const footerHeight = footer ? footer.offsetHeight : 60;

            const headerTextDiv = document.getElementById('hostex-header-text');
            const headerTextHeight = headerTextDiv ? headerTextDiv.offsetHeight : 0;
            const topOffset = headerHeight + headerTextHeight;

            // Posodobi widget
            widget.style.top = `${topOffset}px`;
            widget.style.height = `calc(100vh - ${topOffset + footerHeight}px)`;

            // Posodobi X gumb
            const closeButton = document.getElementById('global-hostex-close');
            if (closeButton && closeButton.style.display === 'flex') {
                closeButton.style.top = `${topOffset + 10}px`;
            }
        }, 50);
    }
}

// Poslušaj na spremembo jezika preko switchLanguage
if (typeof window.switchLanguage === 'function') {
    const originalSwitchLanguage = window.switchLanguage;
    window.switchLanguage = function (lang) {
        // Pokliči originalno funkcijo
        const result = originalSwitchLanguage(lang);
        // Posodobi Hostex
        updateHostexOnLanguageChange();
        return result;
    };
}

// Tudi poslušaj na spremembo preko applyLanguage (za vsak slučaj)
if (typeof window.applyLanguage === 'function') {
    const originalApplyLanguage = window.applyLanguage;
    window.applyLanguage = function (lang) {
        const result = originalApplyLanguage(lang);
        updateHostexOnLanguageChange();
        return result;
    };
}

window.showHostexWidget = showHostexWidget;
window.hideHostexWidget = hideHostexWidget;

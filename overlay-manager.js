// 044
// overlay-manager.js

let activeOverlayType = null;

function isTextOverlay(type) {
    return ['description', 'about', 'contact', 'reserve'].includes(type);
}

function isWidgetOverlay(type) {
    return ['map', 'hostex'].includes(type);
}

function deselectAllText() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
}

// ============================================
// DINAMIČNO POZICIONIRANJE
// ============================================
function adjustOverlayPosition() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const headerHeight = header ? header.offsetHeight : 80;
    const footerHeight = footer ? footer.offsetHeight : 60;

    // Uporabi pravo višino iz spremenljivke
    const viewportHeight = window.innerHeight;
    const topOffset = headerHeight + 20;
    const bottomOffset = footerHeight + 20;
    //const maxHeight = viewportHeight - topOffset - bottomOffset;
    const maxHeight = `calc(100vh - ${topOffset + bottomOffset}px)`;

    // 1. TEXT OVERLAYI
    const textOverlays = document.querySelectorAll('.text-overlay, .contact-overlay');
    textOverlays.forEach(overlay => {
        overlay.style.top = `${topOffset}px`;
        overlay.style.transform = 'translateX(-50%)';
        overlay.style.maxHeight = maxHeight;
        overlay.style.position = 'fixed';
        overlay.style.marginTop = '0';
    });

    // 2. LINKS OVERLAY
    const linksOverlay = document.getElementById('links-overlay');
    if (linksOverlay) {
        linksOverlay.style.top = `${topOffset}px`;
        linksOverlay.style.transform = 'translateX(-50%)';
        linksOverlay.style.maxHeight = maxHeight;
        linksOverlay.style.position = 'fixed';
        linksOverlay.style.marginTop = '0';
    }

    // 3. MAP OVERLAY
    const mapContainer = document.getElementById('map-container');
    if (mapContainer && window.activeOverlayType === 'map') {
        mapContainer.style.top = `${topOffset}px`;
        mapContainer.style.height = `calc(100vh - ${topOffset + bottomOffset}px)`;
    }
    const mapCloseBtn = document.getElementById('close-map-widget');
    if (mapCloseBtn && mapCloseBtn.style.display === 'flex') {
        mapCloseBtn.style.top = `${topOffset + 10}px`;
    }

    // 4. HOSTEX OVERLAY
    const hostexWidget = document.querySelector('hostex-booking-widget');
    if (hostexWidget && hostexWidget.style.display === 'block') {
        hostexWidget.style.top = `${topOffset}px`;
        hostexWidget.style.height = `calc(100vh - ${topOffset + bottomOffset}px)`;
    }
    const hostexCloseBtn = document.getElementById('global-hostex-close');
    if (hostexCloseBtn && hostexCloseBtn.style.display === 'flex') {
        hostexCloseBtn.style.top = `${topOffset + 10}px`;
        hostexCloseBtn.style.right = '5px';
    }

    // 5. BLUR - PRAVILNA VIŠINA (ne čez footer)
    const blurOverlay = document.getElementById('full-page-blur');
    if (blurOverlay && blurOverlay.classList.contains('active')) {
        blurOverlay.style.top = `${headerHeight}px`;
        blurOverlay.style.height = `calc(100vh - ${headerHeight + footerHeight}px)`;
    }
}

window.addEventListener('resize', () => {
    if (activeOverlayType) setTimeout(adjustOverlayPosition, 50);
});
window.addEventListener('orientationchange', () => {
    setTimeout(adjustOverlayPosition, 100);
});

// ============================================
// SKRIJ VSE
// ============================================
function hideAllOverlays() {
    console.log('Hiding all overlays, current active:', activeOverlayType);

    const bg = document.getElementById('overlay-background');
    if (bg) bg.classList.remove('active');

    const linksBg = document.getElementById('links-background');
    if (linksBg) linksBg.classList.remove('active');

    const allOverlayElements = document.querySelectorAll(
        '.text-overlay, .contact-overlay, .links-overlay, #description-overlay, #about-overlay, #contact-overlay, #links-overlay, #reserve-overlay'
    );

    allOverlayElements.forEach(overlay => {
        overlay.classList.remove('active');
    });

    if (typeof hideMapWidget === 'function') hideMapWidget();
    if (typeof hideHostexWidget === 'function') hideHostexWidget();

    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });

    document.removeEventListener('keydown', escHandler);
    document.body.removeEventListener('click', bodyClickHandler);

    const blurOverlay = document.getElementById('full-page-blur');
    if (blurOverlay) {
        blurOverlay.style.cssText = '';
        blurOverlay.classList.remove('active');
    }

    activeOverlayType = null;
    deselectAllText();
    document.body.style.overflow = '';
}

let clickTimeout = null;

function bodyClickHandler(e) {
    const isNavButton = e.target.closest('.nav-links a, .language-flag, .logo-section');
    if (isNavButton) return;

    const isOverlayContent = e.target.closest('.text-overlay, .contact-overlay, .links-overlay, hostex-booking-widget, #map-container, #reserve-overlay');
    if (!isOverlayContent && activeOverlayType) {
        if (clickTimeout) clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
            hideAllOverlays();
            clickTimeout = null;
        }, 10);
    }
}

function escHandler(e) {
    if (e.key === 'Escape') hideAllOverlays();
}

// ============================================
// PRIKAZ OVERLAYEV
// ============================================
function showDescription() {
    if (activeOverlayType && isWidgetOverlay(activeOverlayType)) return;
    hideAllOverlays();
    activeOverlayType = 'description';
    document.getElementById('overlay-background')?.classList.add('active');
    document.getElementById('description-overlay')?.classList.add('active');
    setTimeout(adjustOverlayPosition, 10);
    document.addEventListener('keydown', escHandler);
    document.body.addEventListener('click', bodyClickHandler);
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAbout() {
    if (activeOverlayType && isWidgetOverlay(activeOverlayType)) return;
    hideAllOverlays();
    activeOverlayType = 'about';
    document.getElementById('overlay-background')?.classList.add('active');
    document.getElementById('about-overlay')?.classList.add('active');
    setTimeout(adjustOverlayPosition, 10);
    document.addEventListener('keydown', escHandler);
    document.body.addEventListener('click', bodyClickHandler);
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showContact() {
    if (activeOverlayType && isWidgetOverlay(activeOverlayType)) return;
    hideAllOverlays();
    activeOverlayType = 'contact';
    document.getElementById('overlay-background')?.classList.add('active');
    document.getElementById('contact-overlay')?.classList.add('active');
    setTimeout(adjustOverlayPosition, 10);
    document.addEventListener('keydown', escHandler);
    document.body.addEventListener('click', bodyClickHandler);
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHome() {
    hideAllOverlays();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showReserveOverlay() {
    if (activeOverlayType && isWidgetOverlay(activeOverlayType)) return;
    hideAllOverlays();
    activeOverlayType = 'reserve';
    document.getElementById('overlay-background')?.classList.add('active');
    document.getElementById('reserve-overlay')?.classList.add('active');
    updateReserveContent(window.currentLanguage || 'sl');
    setTimeout(adjustOverlayPosition, 10);
    document.addEventListener('keydown', escHandler);
    document.body.addEventListener('click', bodyClickHandler);
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateReserveContent(lang) {
    const reserveData = window.languageData?.[lang]?.reserve;
    if (!reserveData) return;

    const title = document.getElementById('reserve-title');
    const content = document.getElementById('reserve-content');
    const button = document.getElementById('reserve-open-widget');

    if (title) title.textContent = reserveData.title;
    if (button) button.textContent = reserveData.button;

    if (content && reserveData.items) {
        let html = '';
        if (reserveData.intro) html += `<p class="reserve-intro">${reserveData.intro}</p>`;
        html += '<ul class="reserve-list">';
        reserveData.items.forEach(item => {
            const cleanItem = item.replace(/^•\s*/, '');
            html += `<li>${cleanItem}</li>`;
        });
        html += '</ul>';
        content.innerHTML = html;
    }

    if (button) {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        newButton.onclick = () => {
            hideAllOverlays();
            setTimeout(() => {
                if (typeof showHostexWidget === 'function') showHostexWidget();
            }, 100);
        };
    }
}

function updateOverlayContent(lang) {
    const data = languageData[lang];
    if (!data) return;
    updateDescriptionContent(data.overlays.description);
    updateAboutContent(data.overlays.about);
    updateContactContent(data.overlays.contact);
}

// Eksport
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        hideAllOverlays, showDescription, showAbout, showContact, showHome,
        showReserveOverlay, updateReserveContent, activeOverlayType,
        isTextOverlay, isWidgetOverlay, deselectAllText, updateOverlayContent,
        adjustOverlayPosition
    };
}
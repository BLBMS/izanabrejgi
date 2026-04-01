// 038
// Upravljanje overlayev

// Globalna spremenljivka za sledenje aktivnemu overlayju
let activeOverlayType = null; // 'description', 'about', 'contact', 'map', 'hostex'

// Funkcije za preverjanje tipa
function isTextOverlay(type) {
    return ['description', 'about', 'contact'].includes(type);
}

function isWidgetOverlay(type) {
    return ['map', 'hostex'].includes(type);
}

// Deselect vse selektirano besedilo
function deselectAllText() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
}

// Skrij vse overlaye
function hideAllOverlays() {
    console.log('Hiding all overlays, current active:', activeOverlayType);

    const bg = document.getElementById('overlay-background');
    if (bg) bg.classList.remove('active');

    // SKRIJ LINKS BACKGROUND
    const linksBg = document.getElementById('links-background');
    if (linksBg) linksBg.classList.remove('active');

    const allOverlayElements = document.querySelectorAll(
        '.text-overlay, .contact-overlay, .links-overlay, #description-overlay, #about-overlay, #contact-overlay, #links-overlay'
    );

    allOverlayElements.forEach(overlay => {
        overlay.classList.remove('active');
    });

    // Skrij tudi widgete če so prikazani
    if (typeof hideMapWidget === 'function') {
        hideMapWidget();
    }

    if (typeof hideHostexWidget === 'function') {
        hideHostexWidget();
    }

    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });

    // Odstrani ESC handler
    document.removeEventListener('keydown', escHandler);

    // Odstrani klik handler za celotno ozadje
    document.body.removeEventListener('click', bodyClickHandler);

    // Reset aktivnega overlayja
    activeOverlayType = null;

    // Deselect vse selektirano besedilo
    deselectAllText();

    // Omogoči skrolanje
    document.body.style.overflow = '';
}

// Handler za klik na body (zeleno ozadje)
let clickTimeout = null;

function bodyClickHandler(e) {
    // Preveri, če je klik na gumb za odpiranje overlayja
    const isNavButton = e.target.closest('.nav-links a, .language-flag, .logo-section');

    // Če je klik na navigacijski gumb, ne zapri overlayja
    if (isNavButton) {
        console.log('Click on nav button, ignoring');
        return;
    }

    // Preveri, če je klik na overlay vsebino
    const isOverlayContent = e.target.closest('.text-overlay, .contact-overlay, .links-overlay, hostex-booking-widget, #map-iframe');

    // Če klik NI na overlay vsebino IN je overlay aktiven, zapri
    if (!isOverlayContent && activeOverlayType) {
        console.log('Click outside overlay, closing');

        // Majhna zakasnitev, da se izognemo takojšnjemu zapiranju
        if (clickTimeout) clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
            hideAllOverlays();
            clickTimeout = null;
        }, 10);
    }
}

// ESC handler
function escHandler(e) {
    if (e.key === 'Escape') {
        console.log('ESC pressed, closing overlay');
        hideAllOverlays();
    }
}

// Prikaži opis overlay
function showDescription() {
    console.log('Showing Description overlay');

    // Če je aktiven widget, ga blokiram
    if (activeOverlayType && isWidgetOverlay(activeOverlayType)) {
        console.log(`Cannot show Description, ${activeOverlayType} widget is active`);
        return;
    }

    // Skrij vse overlaye
    hideAllOverlays();
    activeOverlayType = 'description';

    const bg = document.getElementById('overlay-background');
    const desc = document.getElementById('description-overlay');
    if (bg) bg.classList.add('active');
    if (desc) desc.classList.add('active');

    // Dodaj ESC handler
    document.addEventListener('keydown', escHandler);

    // Dodaj klik handler za zapiranje ob kliku na ozadje
    document.body.addEventListener('click', bodyClickHandler);

    // Onemogoči skrolanje
    document.body.style.overflow = 'hidden';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Prikaži "ponujamo" overlay
function showAbout() {
    console.log('Showing About overlay');

    // Če je aktiven widget, ga blokiram
    if (activeOverlayType && isWidgetOverlay(activeOverlayType)) {
        console.log(`Cannot show About, ${activeOverlayType} widget is active`);
        return;
    }

    // Skrij vse overlaye
    hideAllOverlays();
    activeOverlayType = 'about';

    const bg = document.getElementById('overlay-background');
    const about = document.getElementById('about-overlay');
    if (bg) bg.classList.add('active');
    if (about) about.classList.add('active');

    // Dodaj ESC handler
    document.addEventListener('keydown', escHandler);

    // Dodaj klik handler za zapiranje ob kliku na ozadje
    document.body.addEventListener('click', bodyClickHandler);

    // Onemogoči skrolanje
    document.body.style.overflow = 'hidden';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Prikaži kontakt overlay
function showContact() {
    console.log('Showing Contact overlay');

    // Če je aktiven widget, ga blokiram
    if (activeOverlayType && isWidgetOverlay(activeOverlayType)) {
        console.log(`Cannot show Contact, ${activeOverlayType} widget is active`);
        return;
    }

    // Skrij vse overlaye
    hideAllOverlays();
    activeOverlayType = 'contact';

    const bg = document.getElementById('overlay-background');
    const contact = document.getElementById('contact-overlay');
    if (bg) bg.classList.add('active');
    if (contact) contact.classList.add('active');

    // Dodaj ESC handler
    document.addEventListener('keydown', escHandler);

    // Dodaj klik handler za zapiranje ob kliku na ozadje
    document.body.addEventListener('click', bodyClickHandler);

    // Onemogoči skrolanje
    document.body.style.overflow = 'hidden';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Prikaži domov (skrij vse overlaye)
function showHome() {
    hideAllOverlays();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Eksport funkcij
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        hideAllOverlays,
        showDescription,
        showAbout,
        showContact,
        showHome,
        activeOverlayType,
        isTextOverlay,
        isWidgetOverlay,
        deselectAllText
    };
}

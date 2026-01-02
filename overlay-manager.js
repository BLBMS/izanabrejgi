/* 032 */
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

    const allOverlayElements = document.querySelectorAll(
        '.text-overlay, .contact-overlay, #description-overlay, #about-overlay, #contact-overlay'
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

    // Reset aktivnega overlayja
    activeOverlayType = null;

    // Deselect vse selektirano besedilo
    deselectAllText();

    // Omogoči skrolanje
    document.body.style.overflow = '';
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

    // Onemogoči skrolanje
    document.body.style.overflow = 'hidden';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Prikaži "ponujamo" overlay
function showAbout() {
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

    // Onemogoči skrolanje
    document.body.style.overflow = 'hidden';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Prikaži kontakt overlay
function showContact() {
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
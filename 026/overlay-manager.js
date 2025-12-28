/* 026 */
// Upravljanje overlayev

// Skrij vse overlaye
function hideAllOverlays() {
    const bg = document.getElementById('overlay-background');
    if (bg) bg.classList.remove('active');

    const allOverlayElements = document.querySelectorAll(
        '.text-overlay, .contact-overlay, #description-overlay, #about-overlay, #contact-overlay'
    );

    allOverlayElements.forEach(overlay => {
        overlay.classList.remove('active');
    });

    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

// Prikaži opis overlay
function showDescription() {
    hideAllOverlays();
    const bg = document.getElementById('overlay-background');
    const desc = document.getElementById('description-overlay');
    if (bg) bg.classList.add('active');
    if (desc) desc.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Prikaži "ponujamo" overlay
function showAbout() {
    hideAllOverlays();
    const bg = document.getElementById('overlay-background');
    const about = document.getElementById('about-overlay');
    if (bg) bg.classList.add('active');
    if (about) about.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Prikaži kontakt overlay
function showContact() {
    hideAllOverlays();
    const bg = document.getElementById('overlay-background');
    const contact = document.getElementById('contact-overlay');
    if (bg) bg.classList.add('active');
    if (contact) contact.classList.add('active');
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
        showHome
    };

}

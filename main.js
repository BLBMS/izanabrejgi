// 046
// main.js

function initDOMElements() {
    aboutOverlay = document.getElementById('about-overlay');
    contactOverlay = document.getElementById('contact-overlay');
    descriptionOverlay = document.getElementById('description-overlay');
    overlayBackground = document.getElementById('overlay-background');
    slideshowTrack = document.getElementById('slideshow-track');
}

// ============================================
// DINAMIČNO ZMANJŠEVANJE VELIKOSTI ČRK NASLOVA
// ============================================
function adjustLogoTextSize() {
    const logoText = document.querySelector('.logo-text');
    const logoSection = document.querySelector('.logo-section');
    const languageFlags = document.querySelector('.language-flags');

    if (!logoText || !logoSection || !languageFlags) return;

    let fontSize = 1.6;
    const minFontSize = 0.9;
    const step = 0.05;

    logoText.style.fontSize = `${fontSize}rem`;
    logoText.style.whiteSpace = 'nowrap';

    const containerWidth = logoSection.parentElement.offsetWidth;
    const flagsWidth = languageFlags.offsetWidth;
    const logoImgWidth = document.querySelector('.logo-img')?.offsetWidth || 40;
    const textWidth = logoText.scrollWidth;
    const availableWidth = containerWidth - logoImgWidth - flagsWidth - 30;

    if (textWidth > availableWidth && fontSize > minFontSize) {
        while (textWidth > availableWidth && fontSize > minFontSize) {
            fontSize -= step;
            logoText.style.fontSize = `${fontSize}rem`;
            logoText.style.whiteSpace = 'nowrap';
            const newTextWidth = logoText.scrollWidth;
            if (newTextWidth <= availableWidth || fontSize <= minFontSize) break;
        }
    }

    if (logoText.scrollWidth > availableWidth && fontSize <= minFontSize + 0.1) {
        logoText.style.whiteSpace = 'normal';
        logoText.style.wordBreak = 'keep-all';
    }
}

// Glavna inicializacija
function init() {
    initDOMElements();

    if (typeof loadLanguageData === 'function') loadLanguageData();

    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLanguage) {
        setTimeout(() => {
            if (languageData[savedLang] && typeof applyLanguage === 'function') {
                applyLanguage(savedLang);
            }
        }, 100);
    }

    if (typeof setupOverlayClickHandlers === 'function') setupOverlayClickHandlers();
    if (typeof setupOverlayBackgroundClick === 'function') setupOverlayBackgroundClick();
    if (typeof setupResizeHandlers === 'function') setupResizeHandlers();

    // Naloži slike - slideshow-manager.js poskrbi za timer
    if (typeof loadSlides === 'function') loadSlides();

    // ODSTRANJENO: setInterval(showNextSlide, 4000) - timer je v slideshow-manager.js

    // Dinamično prilagajanje velikosti črk
    setTimeout(adjustLogoTextSize, 100);
    window.addEventListener('resize', () => setTimeout(adjustLogoTextSize, 50));
    window.addEventListener('orientationchange', () => setTimeout(adjustLogoTextSize, 100));

    // Opazovanje sprememb višine headerja in footerja
    if (typeof observeHeaderChanges === 'function') {
        setTimeout(observeHeaderChanges, 100);
    }

    // Začetna prilagoditev višine slideshow
    setTimeout(() => {
        if (typeof adjustSlideshowHeight === 'function') {
            adjustSlideshowHeight();
        }
    }, 150);

    // Preveri URL parameter za rezervacijo
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('action') === 'rezerviraj') {
        setTimeout(() => {
            if (typeof showReserveOverlay === 'function') showReserveOverlay();
        }, 800);
    }
}

document.addEventListener('DOMContentLoaded', init);

window.showDescription = showDescription || function () { };
window.showAbout = showAbout || function () { };
window.showContact = showContact || function () { };
window.showHome = showHome || function () { };
window.prevSlide = prevSlide || function () { };
window.nextSlide = nextSlide || function () { };
window.switchLanguage = switchLanguage || function () { };

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { init, initDOMElements };
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        const logoSection = document.querySelector('.logo-section');
        if (logoSection) {
            logoSection.addEventListener('click', function (e) {
                if (!e.target.closest('.language-flag')) {
                    e.preventDefault();
                    window.location.href = '#domov';
                    if (typeof hideAllOverlays === 'function') hideAllOverlays();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
            logoSection.style.cursor = 'pointer';
        }
    }, 100);
});
// 043
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

    // Začetna velikost
    let fontSize = 1.6; // rem
    const minFontSize = 0.9; // rem
    const step = 0.05; // rem

    // Ponastavi velikost
    logoText.style.fontSize = `${fontSize}rem`;
    logoText.style.whiteSpace = 'nowrap';

    // Preveri, če je premalo prostora
    const containerWidth = logoSection.parentElement.offsetWidth;
    const flagsWidth = languageFlags.offsetWidth;
    const logoImgWidth = document.querySelector('.logo-img')?.offsetWidth || 40;
    const textWidth = logoText.scrollWidth;
    const availableWidth = containerWidth - logoImgWidth - flagsWidth - 30; // 30 za gap

    if (textWidth > availableWidth && fontSize > minFontSize) {
        // Zmanjšuj, dokler ne gre
        while (textWidth > availableWidth && fontSize > minFontSize) {
            fontSize -= step;
            logoText.style.fontSize = `${fontSize}rem`;
            logoText.style.whiteSpace = 'nowrap';
            // Ponovno izračunaj širino
            const newTextWidth = logoText.scrollWidth;
            if (newTextWidth <= availableWidth || fontSize <= minFontSize) break;
        }
    }

    // Če je še vedno prevelik, dovoli prelom
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

    if (typeof createSlideshowDots === 'function') {
        setTimeout(() => createSlideshowDots(), 500);
    }

    if (typeof setupOverlayClickHandlers === 'function') setupOverlayClickHandlers();
    if (typeof setupOverlayBackgroundClick === 'function') setupOverlayBackgroundClick();
    if (typeof setupResizeHandlers === 'function') setupResizeHandlers();

    if (typeof loadSlides === 'function') loadSlides();

    if (typeof showNextSlide === 'function') setInterval(showNextSlide, 4000);

    // Dinamično prilagajanje velikosti črk
    setTimeout(adjustLogoTextSize, 100);
    window.addEventListener('resize', () => setTimeout(adjustLogoTextSize, 50));
    window.addEventListener('orientationchange', () => setTimeout(adjustLogoTextSize, 100));
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
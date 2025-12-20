// Glavna inicializacija

// Inicializacija DOM elementov
function initDOMElements() {
    aboutOverlay = document.getElementById('about-overlay');
    contactOverlay = document.getElementById('contact-overlay');
    descriptionOverlay = document.getElementById('description-overlay');
    overlayBackground = document.getElementById('overlay-background');
    slideshowTrack = document.getElementById('slideshow-track');
}

// Glavna inicializacijska funkcija
function init() {
    // Inicializiraj DOM elemente
    initDOMElements();
    
    // Naloži jezikovne podatke
    if (typeof loadLanguageData === 'function') {
        loadLanguageData();
    }
    
    // Preveri localStorage za shranjen jezik
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLanguage) {
        setTimeout(() => {
            if (languageData[savedLang] && typeof applyLanguage === 'function') {
                applyLanguage(savedLang);
            }
        }, 100);
    }
    
    // Inicializiraj dropdown menije
    if (typeof initDropdowns === 'function') {
        initDropdowns();
    }
    
    // Inicializiraj slideshow dots
    if (typeof createSlideshowDots === 'function') {
        setTimeout(() => {
            createSlideshowDots();
        }, 500);
    }
    
    // Nastavi event handlerje
    if (typeof setupOverlayClickHandlers === 'function') {
        setupOverlayClickHandlers();
    }
    
    if (typeof setupOverlayBackgroundClick === 'function') {
        setupOverlayBackgroundClick();
    }
    
    if (typeof setupResizeHandlers === 'function') {
        setupResizeHandlers();
    }
    
    // Naloži slike
    if (typeof loadSlides === 'function') {
        loadSlides();
    }
    
    // Začni avtomatsko menjavo slik
    if (typeof showNextSlide === 'function') {
        setInterval(showNextSlide, 4000);
    }
}

// Zaženi inicializacijo ko se stran naloži
document.addEventListener('DOMContentLoaded', init);

// Eksponiraj globalne funkcije za uporabo v HTML
window.showDescription = showDescription || function() {};
window.showAbout = showAbout || function() {};
window.showContact = showContact || function() {};
window.showPricing = showPricing || function() {};
window.showHome = showHome || function() {};
window.prevSlide = prevSlide || function() {};
window.nextSlide = nextSlide || function() {};
window.switchLanguage = switchLanguage || function() {};

// Eksport za modulno uporabo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        initDOMElements
    };
}
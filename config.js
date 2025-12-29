// 027 - Konfiguracija

// Seznam slik za slideshow - GLOBALNA SPREMENLJIVKA
window.imageFiles = [
    "images/dnevna1.jpg",
    "images/dnevna1.jpg",
    "images/dnevna3.jpg",
    "images/dvor-poletje.jpg",
    "images/dvor-pozimi.jpg",
    "images/jedilnica1.jpg",
    "images/kopalnica1.jpg",
    "images/pogled-jed-sever.jpg",
    "images/pogled-sp-jug.jpg",
    "images/pogled-sp-vzhod.jpg",
    "images/sceste-bozic.jpg",
    "images/sceste-pozimi.jpg",
    "images/spalnica1.jpg",
    "images/spalnica2.jpg",
    "images/wc1.jpg",
    "images/zunaj-lagev1.jpg",
    "images/zunaj-mici1.jpg",
    "images/klobuka.jpg"
];

// Globalne spremenljivke
window.currentSlide = 0;
window.currentLanguage = 'sl';
window.languageData = {};

// DOM elementi - bodo inicializirani v main.js
let aboutOverlay, contactOverlay, descriptionOverlay, overlayBackground, slideshowTrack;

// Eksport za uporabo v drugih datotekah
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        imageFiles: window.imageFiles,
        currentSlide: window.currentSlide,
        currentLanguage: window.currentLanguage,
        languageData: window.languageData
    };

}

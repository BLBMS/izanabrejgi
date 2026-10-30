// 048
// config.js
// Konfiguracija

// Seznam slik za slideshow.
// Za vsako fotografijo sta izrecno navedeni namizna in mobilna različica.
// Namizne slike: images_d/d_ime.webp
// Mobilne slike:  images_m/m_ime.webp
window.imageFiles = [
    { desktop: "images_d/d_balkon1.webp", mobile: "images_m/m_balkon1.webp" },
    { desktop: "images_d/d_dnevna1.webp", mobile: "images_m/m_dnevna1.webp" },
    { desktop: "images_d/d_dnevna2.webp", mobile: "images_m/m_dnevna2.webp" },
    { desktop: "images_d/d_dnevna3.webp", mobile: "images_m/m_dnevna3.webp" },
    { desktop: "images_d/d_dnevna4.webp", mobile: "images_m/m_dnevna4.webp" },
    { desktop: "images_d/d_dvor-poletje.webp", mobile: "images_m/m_dvor-poletje.webp" },
    { desktop: "images_d/d_dvor-pozimi.webp", mobile: "images_m/m_dvor-pozimi.webp" },
    { desktop: "images_d/d_jedilnica1.webp", mobile: "images_m/m_jedilnica1.webp" },
    { desktop: "images_d/d_klobuka.webp", mobile: "images_m/m_klobuka.webp" },
    { desktop: "images_d/d_kopalnica1.webp", mobile: "images_m/m_kopalnica1.webp" },
    { desktop: "images_d/d_kuhinja1.webp", mobile: "images_m/m_kuhinja1.webp" },
    { desktop: "images_d/d_pogled-jed-sever.webp", mobile: "images_m/m_pogled-jed-sever.webp" },
    { desktop: "images_d/d_pogled-sp-jug.webp", mobile: "images_m/m_pogled-sp-jug.webp" },
    { desktop: "images_d/d_pogled-sp-vzhod.webp", mobile: "images_m/m_pogled-sp-vzhod.webp" },
    { desktop: "images_d/d_sceste-bozic.webp", mobile: "images_m/m_sceste-bozic.webp" },
    { desktop: "images_d/d_sceste-pozimi.webp", mobile: "images_m/m_sceste-pozimi.webp" },
    { desktop: "images_d/d_sceste-srcek.webp", mobile: "images_m/m_sceste-srcek.webp" },
    { desktop: "images_d/d_sceste-srcek-jesen.webp", mobile: "images_m/m_sceste-srcek-jesen.webp" },
    { desktop: "images_d/d_spalnica1.webp", mobile: "images_m/m_spalnica1.webp" },
    { desktop: "images_d/d_spalnica2.webp", mobile: "images_m/m_spalnica2.webp" },
    { desktop: "images_d/d_terasa1.webp", mobile: "images_m/m_terasa1.webp" },
    { desktop: "images_d/d_terasa2.webp", mobile: "images_m/m_terasa2.webp" },
    { desktop: "images_d/d_terasa3.webp", mobile: "images_m/m_terasa3.webp" },
    { desktop: "images_d/d_wc1.webp", mobile: "images_m/m_wc1.webp" },
    { desktop: "images_d/d_zunaj-gobe1.webp", mobile: "images_m/m_zunaj-gobe1.webp" },
    { desktop: "images_d/d_zunaj-lagev1.webp", mobile: "images_m/m_zunaj-lagev1.webp" },
    { desktop: "images_d/d_zunaj-mici1.webp", mobile: "images_m/m_zunaj-mici1.webp" }
];

// Globalne spremenljivke
window.currentSlide = 0;
window.currentLanguage = 'en';
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

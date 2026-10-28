// 047
// config.js
// Konfiguracija

// Seznam slik za slideshow.
// Za vsako fotografijo sta izrecno navedeni namizna in mobilna različica.
// Namizne slike: d_images/d_ime.webp
// Mobilne slike:  m_images/m_ime.webp
window.imageFiles = [
    { desktop: "d_images/d_balkon1.webp", mobile: "m_images/m_balkon1.webp" },
    { desktop: "d_images/d_dnevna1.webp", mobile: "m_images/m_dnevna1.webp" },
    { desktop: "d_images/d_dnevna2.webp", mobile: "m_images/m_dnevna2.webp" },
    { desktop: "d_images/d_dnevna3.webp", mobile: "m_images/m_dnevna3.webp" },
    { desktop: "d_images/d_dnevna4.webp", mobile: "m_images/m_dnevna4.webp" },
    { desktop: "d_images/d_dvor-poletje.webp", mobile: "m_images/m_dvor-poletje.webp" },
    { desktop: "d_images/d_dvor-pozimi.webp", mobile: "m_images/m_dvor-pozimi.webp" },
    { desktop: "d_images/d_jedilnica1.webp", mobile: "m_images/m_jedilnica1.webp" },
    { desktop: "d_images/d_klobuka.webp", mobile: "m_images/m_klobuka.webp" },
    { desktop: "d_images/d_kopalnica1.webp", mobile: "m_images/m_kopalnica1.webp" },
    { desktop: "d_images/d_kuhinja1.webp", mobile: "m_images/m_kuhinja1.webp" },
    { desktop: "d_images/d_pogled-jed-sever.webp", mobile: "m_images/m_pogled-jed-sever.webp" },
    { desktop: "d_images/d_pogled-sp-jug.webp", mobile: "m_images/m_pogled-sp-jug.webp" },
    { desktop: "d_images/d_pogled-sp-vzhod.webp", mobile: "m_images/m_pogled-sp-vzhod.webp" },
    { desktop: "d_images/d_sceste-bozic.webp", mobile: "m_images/m_sceste-bozic.webp" },
    { desktop: "d_images/d_sceste-pozimi.webp", mobile: "m_images/m_sceste-pozimi.webp" },
    { desktop: "d_images/d_sceste-srcek.webp", mobile: "m_images/m_sceste-srcek.webp" },
    { desktop: "d_images/d_sceste-srcek-jesen.webp", mobile: "m_images/m_sceste-srcek-jesen.webp" },
    { desktop: "d_images/d_spalnica1.webp", mobile: "m_images/m_spalnica1.webp" },
    { desktop: "d_images/d_spalnica2.webp", mobile: "m_images/m_spalnica2.webp" },
    { desktop: "d_images/d_terasa1.webp", mobile: "m_images/m_terasa1.webp" },
    { desktop: "d_images/d_terasa2.webp", mobile: "m_images/m_terasa2.webp" },
    { desktop: "d_images/d_terasa3.webp", mobile: "m_images/m_terasa3.webp" },
    { desktop: "d_images/d_wc1.webp", mobile: "m_images/m_wc1.webp" },
    { desktop: "d_images/d_zunaj-gobe1.webp", mobile: "m_images/m_zunaj-gobe1.webp" },
    { desktop: "d_images/d_zunaj-lagev1.webp", mobile: "m_images/m_zunaj-lagev1.webp" },
    { desktop: "d_images/d_zunaj-mici1.webp", mobile: "m_images/m_zunaj-mici1.webp" }
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

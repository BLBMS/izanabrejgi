// Upravljanje jezikov

// Naloži jezikovne podatke
async function loadLanguageData() {
    try {
        const response = await fetch('./languages.json');
        const data = await response.json();
        languageData = data.languages;

        // Nastavi privzeti jezik glede na lokacijo/brskalnik
        currentLanguage = detectLanguageByLocation();

        // Uporabi jezik
        applyLanguage(currentLanguage);

        // Inicializiraj zastavice
        initLanguageFlags();

    } catch (error) {
        console.error('Napaka pri nalaganju jezikovnih podatkov:', error);
        currentLanguage = 'sl';
    }
}

// Določi jezik glede na lokacijo
function detectLanguageByLocation() {
    // Preveri URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');

    if (langParam && ['sl', 'en', 'de'].includes(langParam)) {
        return langParam;
    }

    // Preveri glede na jezik brskalnika
    const userLang = navigator.language || navigator.userLanguage;

    if (userLang.startsWith('sl')) {
        return 'sl';
    } else if (userLang.startsWith('de')) {
        return 'de';
    } else {
        return 'en';
    }
}

// Uporabi jezik
function applyLanguage(lang) {
    if (!languageData[lang]) return;

    const data = languageData[lang];
    currentLanguage = lang;

    // Posodobi naslov strani
    document.title = data.meta.title;
    document.documentElement.lang = lang;

    // Posodobi navigacijo
    updateNavigation(data.nav);
    
    // Posodobi naslove overlayev
    updateOverlayTitles(data.overlays);
    
    // Posodobi vsebino overlayev
    updateOverlayContent(lang);

    // Posodobi footer
    updateFooter(data.footer);

    // Posodobi aktivno zastavo
    updateActiveFlag(lang);

    // Shrani jezik v localStorage
    localStorage.setItem('preferredLanguage', lang);

    // Če je odprt cenik, posodobi tudi cenik
    if (window.pricingData) {
        renderPricingTable(window.pricingData, lang);
    }
}

// Posodobi navigacijo
function updateNavigation(navData) {
    const navIds = {
        'nav-home': 'home',
        'nav-description': 'description',
        'nav-about': 'about',
        'nav-pricing': 'pricing',
        'nav-reserve': 'reserve',
        'nav-airbnb': 'airbnb',
        'nav-booking': 'booking',
        'nav-contact': 'contact'
    };

    for (const [elementId, dataKey] of Object.entries(navIds)) {
        const element = document.getElementById(elementId);
        if (element && navData[dataKey]) {
            element.textContent = navData[dataKey];
        }
    }
}

// Posodobi naslove overlayev
function updateOverlayTitles(overlaysData) {
    const titleIds = {
        'description-title': 'description.title',
        'about-title': 'about.title',
        'contact-title': 'contact.title',
        'pricing-title': 'pricing.title',
        'pricing-notes-title': 'pricing.additionalInfo'
    };

    for (const [elementId, dataPath] of Object.entries(titleIds)) {
        const element = document.getElementById(elementId);
        if (element) {
            const value = getValueByPath(overlaysData, dataPath);
            if (value) {
                element.textContent = value;
            }
        }
    }
}

// Pomožna funkcija za dostop do nested objektov
function getValueByPath(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Posodobi vsebino overlayev
function updateOverlayContent(lang) {
    const data = languageData[lang];
    if (!data) return;

    updateDescriptionContent(data.overlays.description);
    updateAboutContent(data.overlays.about);
    updateContactContent(data.overlays.contact);
}

// Posodobi opis overlay
function updateDescriptionContent(descriptionData) {
    const descriptionContent = document.getElementById('description-content');
    if (descriptionContent && descriptionData.content) {
        let html = '';
        descriptionData.content.forEach(paragraph => {
            html += `<p>${paragraph}</p>`;
        });
        descriptionContent.innerHTML = html;
    }
}

// Posodobi "ponujamo" overlay
function updateAboutContent(aboutData) {
    const aboutContent = document.getElementById('about-content');
    if (aboutContent && aboutData) {
        let html = `<p>${aboutData.intro}</p><ul>`;
        aboutData.items.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
        aboutContent.innerHTML = html;
    }
}

// Posodobi kontakt overlay
function updateContactContent(contactData) {
    const contactContent = document.getElementById('contact-content');
    if (contactContent && contactData) {
        let html = `
            <div class="contact-item">
                <span class="contact-label">${contactData.phone}</span>
                <span class="contact-value">${contactData.phoneValue}</span>
            </div>
            <div class="contact-item">
                <span class="contact-label">${contactData.email}</span>
                <span class="contact-value">${contactData.emailValue}</span>
            </div>
            <div class="contact-item">
                <span class="contact-label">${contactData.address}</span>
                <div class="contact-value address">
        `;
        contactData.addressLines.forEach(line => {
            html += `<div>${line}</div>`;
        });
        html += `</div></div>`;
        contactContent.innerHTML = html;
    }
}

// Posodobi footer
function updateFooter(footerData) {
    const footerText = document.getElementById('footer-text');
    if (footerText && footerData.copyright) {
        footerText.innerHTML = footerData.copyright;
    }
}

// Inicializiraj zastavice
function initLanguageFlags() {
    const flagElements = document.querySelectorAll('.language-flag');

    flagElements.forEach(flag => {
        flag.addEventListener('click', function (e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

// Posodobi aktivno zastavo
function updateActiveFlag(lang) {
    const flagElements = document.querySelectorAll('.language-flag');

    flagElements.forEach(flag => {
        const flagLang = flag.getAttribute('data-lang');
        if (flagLang === lang) {
            flag.classList.add('active-flag');
        } else {
            flag.classList.remove('active-flag');
        }
    });
}

// Zamenjaj jezik
function switchLanguage(lang) {
    if (languageData[lang]) {
        applyLanguage(lang);
        // Posodobi URL brez osveževanja strani
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.pushState({}, '', url);
    }
}

// Eksport funkcij
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadLanguageData,
        applyLanguage,
        switchLanguage,
        detectLanguageByLocation
    };
}
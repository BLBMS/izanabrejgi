// 023 - Multijezicna verzija

const imageFiles = [
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
    "images/zunaj-mici1.jpg"
];

let currentSlide = 0;
let currentLanguage = 'sl';
let languageData = {};

// DOM elementi
const aboutOverlay = document.getElementById('about-overlay');
const contactOverlay = document.getElementById('contact-overlay');
const descriptionOverlay = document.getElementById('description-overlay');
const overlayBackground = document.getElementById('overlay-background');
const slideshowTrack = document.getElementById('slideshow-track');

// FUNKCIJE ZA JEZIK -----------------------------------------------------------------

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
    document.getElementById('nav-home').textContent = data.nav.home;
    document.getElementById('nav-description').textContent = data.nav.description;
    document.getElementById('nav-about').textContent = data.nav.about;
    document.getElementById('nav-pricing').textContent = data.nav.pricing;
    document.getElementById('nav-reserve').textContent = data.nav.reserve;
    document.getElementById('nav-airbnb').textContent = data.nav.airbnb;
    document.getElementById('nav-booking').textContent = data.nav.booking;
    document.getElementById('nav-contact').textContent = data.nav.contact;

    // Posodobi naslove overlayev
    document.getElementById('description-title').textContent = data.overlays.description.title;
    document.getElementById('about-title').textContent = data.overlays.about.title;
    document.getElementById('contact-title').textContent = data.overlays.contact.title;
    document.getElementById('pricing-title').textContent = data.overlays.pricing.title;
    document.getElementById('pricing-notes-title').textContent = data.overlays.pricing.additionalInfo;

    // Posodobi vsebino overlayev
    updateOverlayContent(lang);

    // Posodobi footer
    document.getElementById('footer-text').innerHTML = data.footer.copyright;

    // Posodobi aktivno zastavo
    updateActiveFlag(lang);

    // Shrani jezik v localStorage
    localStorage.setItem('preferredLanguage', lang);

    // Če je odprt cenik, posodobi tudi cenik
    if (window.pricingData) {
        renderPricingTable(window.pricingData, lang);
    }
}

// Posodobi vsebino overlayev
function updateOverlayContent(lang) {
    const data = languageData[lang];
    if (!data) return;

    // Opis overlay
    const descriptionContent = document.getElementById('description-content');
    if (descriptionContent && data.overlays.description.content) {
        let html = '';
        data.overlays.description.content.forEach(paragraph => {
            html += `<p>${paragraph}</p>`;
        });
        descriptionContent.innerHTML = html;
    }

    // Ponujamo overlay
    const aboutContent = document.getElementById('about-content');
    if (aboutContent && data.overlays.about) {
        let html = `<p>${data.overlays.about.intro}</p><ul>`;
        data.overlays.about.items.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
        aboutContent.innerHTML = html;
    }

    // Kontakt overlay
    const contactContent = document.getElementById('contact-content');
    if (contactContent && data.overlays.contact) {
        let html = `
            <div class="contact-item">
                <span class="contact-label">${data.overlays.contact.phone}</span>
                <span class="contact-value">${data.overlays.contact.phoneValue}</span>
            </div>
            <div class="contact-item">
                <span class="contact-label">${data.overlays.contact.email}</span>
                <span class="contact-value">${data.overlays.contact.emailValue}</span>
            </div>
            <div class="contact-item">
                <span class="contact-label">${data.overlays.contact.address}</span>
                <div class="contact-value address">
        `;
        data.overlays.contact.addressLines.forEach(line => {
            html += `<div>${line}</div>`;
        });
        html += `</div></div>`;
        contactContent.innerHTML = html;
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

// FUNKCIJE ZA SLIDESHOW -------------------------------------------------------------

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadSlides() {
    const shuffledImages = shuffleArray([...imageFiles]);

    shuffledImages.forEach((imageSrc, index) => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Iža ${index + 1}`;
        img.className = 'slide';
        img.onload = function () {
            if (index === shuffledImages.length - 1) {
                setTimeout(() => {
                    initSlideshowControls();
                }, 300);
            }
        };
        slideshowTrack.appendChild(img);
    });

    // Dodaj prvo sliko na konec za neskončni efekt
    const firstSlide = slideshowTrack.children[0].cloneNode(true);
    slideshowTrack.appendChild(firstSlide);
}

// Inicializacija slideshow controls
function initSlideshowControls() {
    setTimeout(() => {
        createSlideshowDots();
        updateDots();
    }, 1000);
}

// Funkcija za naslednji slide
function showNextSlide() {
    currentSlide++;
    const track = document.getElementById('slideshow-track');
    if (!track || !track.children[0]) return;

    const slideWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    if (currentSlide >= imageFiles.length) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentSlide = 0;
            track.style.transform = `translateX(0)`;
            setTimeout(() => {
                track.style.transition = 'transform 0.75s ease-in-out';
            }, 50);
        }, 500);
    }
    updateDots();
}

// Funkcija za ustvarjanje dots
function createSlideshowDots() {
    const dotsContainer = document.getElementById('slideshow-dots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';

    for (let i = 0; i < imageFiles.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'slideshow-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dot.setAttribute('aria-label', `Pojdi na sliko ${i + 1}`);
        dotsContainer.appendChild(dot);
    }
}

// Funkcija za premikanje na določen slide
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    const track = document.getElementById('slideshow-track');
    if (!track || !track.children[0]) return;

    const slideWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateDots();
}

function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = imageFiles.length - 1;
    }

    const track = document.getElementById('slideshow-track');
    if (!track || !track.children[0]) return;

    const slideWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateDots();
}

function nextSlide() {
    currentSlide++;
    const track = document.getElementById('slideshow-track');
    if (!track || !track.children[0]) return;

    const slideWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    // Neskončni efekt
    if (currentSlide >= imageFiles.length) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentSlide = 0;
            track.style.transform = `translateX(0)`;
            setTimeout(() => {
                track.style.transition = 'transform 0.75s ease-in-out';
            }, 50);
        }, 500);
    }
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.slideshow-dot');
    const actualSlide = currentSlide % imageFiles.length;

    dots.forEach((dot, index) => {
        if (index === actualSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// FUNKCIJE ZA OVERLAYE --------------------------------------------------------------

function hideAllOverlays() {
    const bg = document.getElementById('overlay-background');
    if (bg) bg.classList.remove('active');

    const allOverlayElements = document.querySelectorAll(
        '.text-overlay, .contact-overlay, #pricing-overlay, #description-overlay, #about-overlay, #contact-overlay'
    );

    allOverlayElements.forEach(overlay => {
        overlay.classList.remove('active');
    });

    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

function showDescription() {
    hideAllOverlays();
    const bg = document.getElementById('overlay-background');
    const desc = document.getElementById('description-overlay');
    if (bg) bg.classList.add('active');
    if (desc) desc.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAbout() {
    hideAllOverlays();
    const bg = document.getElementById('overlay-background');
    const about = document.getElementById('about-overlay');
    if (bg) bg.classList.add('active');
    if (about) about.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showContact() {
    hideAllOverlays();
    const bg = document.getElementById('overlay-background');
    const contact = document.getElementById('contact-overlay');
    if (bg) bg.classList.add('active');
    if (contact) contact.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPricing() {
    hideAllOverlays();
    const bg = document.getElementById('overlay-background');
    const pricing = document.getElementById('pricing-overlay');
    if (bg) bg.classList.add('active');
    if (pricing) pricing.classList.add('active');

    if (!window.pricingData) {
        loadPricingData();
    } else {
        renderPricingTable(window.pricingData, currentLanguage);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHome() {
    hideAllOverlays();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// CENIK FUNKCIJE --------------------------------------------------------------------

async function loadPricingData() {
    try {
        const response = await fetch('./pricing.json');
        const data = await response.json();
        window.pricingData = data;
        renderPricingTable(data, currentLanguage);
    } catch (error) {
        console.error('Napaka pri nalaganju cenika:', error);
        const tableContainer = document.getElementById('pricing-table');
        if (tableContainer) {
            const loadingTexts = {
                'sl': 'Cenik trenutno ni na voljo. Prosimo, poskusite kasneje.',
                'en': 'Price list is currently unavailable. Please try again later.',
                'de': 'Preisliste ist derzeit nicht verfügbar. Bitte versuchen Sie es später noch einmal.'
            };
            tableContainer.innerHTML = `<tr><td colspan="4" style="color: var(--font-color); text-align: center; padding: 40px;">${loadingTexts[currentLanguage] || loadingTexts.sl}</td></tr>`;
        }
    }
}

function renderPricingTable(data, lang = 'sl') {
    const tableElement = document.getElementById('pricing-table');
    const notesContainer = document.getElementById('pricing-notes-content');

    if (!tableElement) return;

    // Posodobi naslov cenika
    const pricingTitle = document.getElementById('pricing-title');
    if (pricingTitle && data.translations) {
        pricingTitle.textContent = data.translations.price_table_title[lang] || 'Cenik';
    }

    let tableHTML = `
        <thead>
            <tr>
                <th>${data.translations.period[lang] || 'obdobje'}</th>
                <th>${data.translations.min_nights[lang] || 'min. nočitev'}</th>
                <th>${data.translations.mon_fri[lang] || 'pon-pet'}</th>
                <th>${data.translations.sat_sun[lang] || 'sob-ned'}</th>
            </tr>
        </thead>
        <tbody>
    `;

    data.pricing.forEach(item => {
        tableHTML += `
            <tr>
                <td>${item[`period-${lang}`] || item.period}</td>
                <td>${item[`min_nights-${lang}`] || item.min_nights}</td>
                <td>${item.price_mon_fri}</td>
                <td>${item.price_sat_sun}</td>
            </tr>
        `;
    });

    tableHTML += '</tbody>';
    tableElement.innerHTML = tableHTML;

    // Ustvari HTML za opombe
    if (notesContainer) {
        const notesTitle = document.getElementById('pricing-notes-title');
        if (notesTitle && data.translations) {
            notesTitle.textContent = data.translations.additional_info_title[lang] || 'Dodatne informacije';
        }

        const notes = data.notes[lang] || data.notes['sl'] || [];
        if (notes.length > 0) {
            let notesHTML = `<ul>`;
            notes.forEach(note => {
                notesHTML += `<li>${note}</li>`;
            });
            notesHTML += '</ul>';
            notesContainer.innerHTML = notesHTML;
        } else {
            notesContainer.innerHTML = '';
        }
    }
}

// OSTALE FUNKCIJE -------------------------------------------------------------------

// Funkcija za prilagajanje višine glede na orientacijo
function adjustSlideshowHeight() {
    const slideshow = document.getElementById('slideshow-container');
    const isPortrait = window.innerHeight > window.innerWidth;
    const isMobile = window.innerWidth <= 768;

    if (isMobile && isPortrait) {
        slideshow.style.height = '50vh';
    } else if (isMobile && !isPortrait) {
        slideshow.style.height = '60vh';
    } else {
        slideshow.style.height = '70vh';
    }
}

// Funkcija za prilagajanje velikosti slik
function adjustImageSizes() {
    const slides = document.querySelectorAll('.slide');
    const isPortrait = window.innerHeight > window.innerWidth;
    const isMobile = window.innerWidth <= 768;

    slides.forEach(slide => {
        if (isMobile && isPortrait) {
            slide.style.maxHeight = '95%';
            slide.style.maxWidth = '95%';
            slide.style.height = 'auto';
        } else {
            slide.style.maxHeight = '100%';
            slide.style.maxWidth = '100%';
            slide.style.height = '100%';
        }
    });
}

// Funkcija za dinamično prilagajanje višine containerja
function adjustContainerHeight() {
    const header = document.querySelector('header');
    const container = document.querySelector('.container');
    const headerHeight = header.offsetHeight;
    container.style.minHeight = `calc(100vh - ${headerHeight}px)`;
}

// INICIALIZACIJA --------------------------------------------------------------------
// V funkciji DOMContentLoaded dodaj initDropdowns()
document.addEventListener('DOMContentLoaded', function() {
    // Naloži jezikovne podatke
    loadLanguageData();
    
    // Preveri localStorage za shranjen jezik
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLanguage) {
        setTimeout(() => {
            if (languageData[savedLang]) {
                applyLanguage(savedLang);
            }
        }, 100);
    }
    
    // Inicializiraj dropdown menije
    initDropdowns();
    
    // Inicializiraj slideshow
    setTimeout(() => {
        createSlideshowDots();
    }, 500);
    
    // Blokiraj event propagation znotraj overlayjev
    document.querySelectorAll('.text-overlay, .contact-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});

// Event listener za klik na background
document.addEventListener('click', function (event) {
    if (event.target.id === 'overlay-background') {
        hideAllOverlays();
    }
});

// Event listenerji za spremembe velikosti
window.addEventListener('load', function () {
    adjustSlideshowHeight();
    adjustImageSizes();
    adjustContainerHeight();
});

window.addEventListener('resize', function () {
    adjustSlideshowHeight();
    adjustImageSizes();
    adjustContainerHeight();
});

window.addEventListener('orientationchange', function () {
    setTimeout(function () {
        adjustSlideshowHeight();
        adjustImageSizes();
        adjustContainerHeight();
    }, 100);
});

// Začni avtomatsko menjavo
loadSlides();
setInterval(showNextSlide, 4000);

// Funkcija za inicializacijo spustnega menija
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!toggle || !menu) return;
        
        // Zapri vse ostale dropdown menije
        function closeOtherDropdowns() {
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                    otherDropdown.classList.remove('active');
                }
            });
        }
        
        // Event listener za desktop (hover) in mobile (click)
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                e.stopPropagation();
                
                // Zapri ostale dropdown menije
                closeOtherDropdowns();
                
                // Preklapi trenutni dropdown
                dropdown.classList.toggle('active');
            }
        });
        
        // Prepreči zaprtje dropdowna ob kliku znotraj menija
        menu.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                e.stopPropagation();
            }
        });
    });
    
    // Zapri dropdown menije ob kliku kjerkoli drugje
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
            const isDropdown = e.target.closest('.dropdown');
            if (!isDropdown) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
    
    // Zapri dropdown menije ob tapu kjerkoli drugje (za touch devices)
    document.addEventListener('touchstart', function(e) {
        if (window.innerWidth <= 900) {
            const isDropdown = e.target.closest('.dropdown');
            if (!isDropdown) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
}

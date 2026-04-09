// 043
// cookies.js

const cookieTranslations = {
    sl: {
        basicText: "Ta spletna stran uporablja piškotke za izboljšanje uporabniške izkušnje.",
        readMore: "Preberite več",
        showLess: "Prikaži manj",
        detailsTitle1: "Kaj so piškotki?",
        detailsText1: "Piškotki so majhne datoteke, ki jih spletna stran shrani na vašo napravo.",
        detailsTitle2: "Katere piškotke uporabljamo?",
        detailsList: [
            "<strong>Nujno potrebni piškotki:</strong> Omogočajo osnovno delovanje strani",
            "<strong>Funkcionalni piškotki:</strong> Zapomnijo vaše nastavitve in izbire",
            "<strong>Analitični piškotki:</strong> Pomagajo nam razumeti, kako uporabljate stran"
        ],
        detailsTitle3: "Kako lahko upravljate s piškotki?",
        detailsText3: "Večino brskalnikov lahko nastavite tako, da blokirajo piškotke.",
        detailsTitle4: "Vaša zasebnost",
        detailsText4: "Vaši osebni podatki so nam dragi. Ne delimo jih s tretjimi osebami.",
        declineBtn: "Zavrni piškotke",
        acceptBtn: "Sprejmi vse piškotke",
        toastAccepted: "Hvala! Piškotki so sprejeti.",
        toastDeclined: "Piškotki so zavrnjeni.",
        sessionInfo: "Vaša izbira je shranjena.",
        statusAccepted: "✅ Piškotki so sprejeti",
        statusDeclined: "❌ Piškotki so zavrnjeni",
        statusUnknown: "❓ Piškotki še niso izbrani",
        settingsTitle: "Nastavitve piškotkov",
        settingsInfo: "Sprememba bo shranjena.",
        cookieLink: "Piškotki"
    },
    en: {
        basicText: "This website uses cookies to improve your user experience.",
        readMore: "Read more",
        showLess: "Show less",
        detailsTitle1: "What are cookies?",
        detailsText1: "Cookies are small files that a website stores on your device.",
        detailsTitle2: "Which cookies do we use?",
        detailsList: [
            "<strong>Essential cookies:</strong> Enable basic functionality",
            "<strong>Functional cookies:</strong> Remember your settings",
            "<strong>Analytical cookies:</strong> Help us understand usage"
        ],
        detailsTitle3: "How can you manage cookies?",
        detailsText3: "Most browsers can be set to block cookies.",
        detailsTitle4: "Your privacy",
        detailsText4: "Your personal data is important to us.",
        declineBtn: "Decline cookies",
        acceptBtn: "Accept all cookies",
        toastAccepted: "Thank you! Cookies accepted.",
        toastDeclined: "Cookies declined.",
        sessionInfo: "Your choice is saved.",
        statusAccepted: "✅ Cookies accepted",
        statusDeclined: "❌ Cookies declined",
        statusUnknown: "❓ Not yet chosen",
        settingsTitle: "Cookie settings",
        settingsInfo: "Changes will be saved.",
        cookieLink: "Cookies"
    },
    de: {
        basicText: "Diese Website verwendet Cookies, um Ihre Benutzererfahrung zu verbessern.",
        readMore: "Mehr lesen",
        showLess: "Weniger anzeigen",
        detailsTitle1: "Was sind Cookies?",
        detailsText1: "Cookies sind kleine Dateien, die eine Website auf Ihrem Gerät speichert.",
        detailsTitle2: "Welche Cookies verwenden wir?",
        detailsList: [
            "<strong>Notwendige Cookies:</strong> Grundlegende Funktionalität",
            "<strong>Funktionale Cookies:</strong> Speichern Ihre Einstellungen",
            "<strong>Analytische Cookies:</strong> Helfen uns zu verstehen"
        ],
        detailsTitle3: "Wie können Sie Cookies verwalten?",
        detailsText3: "Die meisten Browser können so eingestellt werden.",
        detailsTitle4: "Ihre Privatsphäre",
        detailsText4: "Ihre persönlichen Daten sind uns wichtig.",
        declineBtn: "Cookies ablehnen",
        acceptBtn: "Alle Cookies akzeptieren",
        toastAccepted: "Danke! Cookies akzeptiert.",
        toastDeclined: "Cookies abgelehnt.",
        sessionInfo: "Ihre Auswahl wird gespeichert.",
        statusAccepted: "✅ Cookies akzeptiert",
        statusDeclined: "❌ Cookies abgelehnt",
        statusUnknown: "❓ Noch nicht ausgewählt",
        settingsTitle: "Cookie-Einstellungen",
        settingsInfo: "Änderungen werden gespeichert.",
        cookieLink: "Cookies"
    }
};

let cookieExpanded = false;
let currentLang = 'sl';

function setCookieLanguage(lang) {
    if (cookieTranslations[lang]) {
        currentLang = lang;
        updateCookieTexts();
    }
}

function updateCookieTexts() {
    const lang = cookieTranslations[currentLang];
    if (!lang) return;

    const basicText = document.querySelector('.cookie-basic-text p');
    if (basicText) {
        basicText.innerHTML = lang.basicText + ` <button class="read-more-link">${lang.readMore}</button>`;
        const newReadMoreLink = document.querySelector('.read-more-link');
        if (newReadMoreLink) {
            newReadMoreLink.removeEventListener('click', toggleCookieDetails);
            newReadMoreLink.addEventListener('click', toggleCookieDetails);
        }
        if (cookieExpanded) {
            const readMoreLink = document.querySelector('.read-more-link');
            if (readMoreLink) readMoreLink.textContent = lang.showLess;
        }
    }

    const detailsSection = document.querySelector('.cookie-details');
    if (detailsSection) {
        detailsSection.innerHTML = `
            <h3>${lang.detailsTitle1}</h3>
            <p>${lang.detailsText1}</p>
            <h3>${lang.detailsTitle2}</h3>
            <ul>${lang.detailsList.map(item => `<li>${item}</li>`).join('')}</ul>
            <h3>${lang.detailsTitle3}</h3>
            <p>${lang.detailsText3}</p>
            <h3>${lang.detailsTitle4}</h3>
            <p>${lang.detailsText4}</p>
            <p><em>${lang.sessionInfo}</em></p>
        `;
    }

    const declineBtn = document.querySelector('.cookie-btn.decline');
    const acceptBtn = document.querySelector('.cookie-btn.accept');
    if (declineBtn) declineBtn.textContent = lang.declineBtn;
    if (acceptBtn) acceptBtn.textContent = lang.acceptBtn;

    const footerCookieLink = document.getElementById('footer-cookie-link');
    if (footerCookieLink) footerCookieLink.textContent = lang.cookieLink;
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.removeItem('cookiesDeclined');
    hideCookieNotice();
    showToast(cookieTranslations[currentLang].toastAccepted);
}

function declineCookies() {
    localStorage.setItem('cookiesDeclined', 'true');
    localStorage.removeItem('cookiesAccepted');
    hideCookieNotice();
    showToast(cookieTranslations[currentLang].toastDeclined);
}

function toggleCookieDetails() {
    const notice = document.getElementById('cookie-notice');
    const readMoreLink = document.querySelector('.read-more-link');
    cookieExpanded = !cookieExpanded;
    if (cookieExpanded) {
        notice.classList.add('expanded');
        if (readMoreLink) readMoreLink.textContent = cookieTranslations[currentLang].showLess;
    } else {
        notice.classList.remove('expanded');
        if (readMoreLink) readMoreLink.textContent = cookieTranslations[currentLang].readMore;
    }
}

function hideCookieNotice() {
    const notice = document.getElementById('cookie-notice');
    if (notice) notice.style.display = 'none';
}

function showCookieNotice() {
    updateCookieTexts();
    const notice = document.getElementById('cookie-notice');
    if (notice) notice.style.display = 'block';
}

function showToast(message) {
    const toast = document.getElementById('cookie-toast');
    if (toast) {
        toast.textContent = message;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }
}

function showCookieSettingsDialog() {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const cookiesDeclined = localStorage.getItem('cookiesDeclined');
    const lang = cookieTranslations[currentLang];
    
    let statusText = '';
    let statusClass = '';
    if (cookiesAccepted) {
        statusText = lang.statusAccepted;
        statusClass = 'cookie-status-accepted';
    } else if (cookiesDeclined) {
        statusText = lang.statusDeclined;
        statusClass = 'cookie-status-declined';
    } else {
        statusText = lang.statusUnknown;
        statusClass = 'cookie-status-unknown';
    }
    
    let dialog = document.getElementById('cookie-settings-dialog');
    if (!dialog) {
        dialog = document.createElement('div');
        dialog.id = 'cookie-settings-dialog';
        dialog.className = 'cookie-settings-dialog';
        document.body.appendChild(dialog);
    }
    
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 80;
    
    dialog.innerHTML = `
        <div class="cookie-settings-content" style="top: ${headerHeight + 20}px;">
            <button class="cookie-settings-close" id="cookie-settings-close">×</button>
            <h3>${lang.settingsTitle}</h3>
            <div class="cookie-status ${statusClass}">${statusText}</div>
            <div class="cookie-settings-buttons">
                <button id="cookie-settings-accept" class="cookie-btn accept">${lang.acceptBtn}</button>
                <button id="cookie-settings-decline" class="cookie-btn decline">${lang.declineBtn}</button>
            </div>
            <p class="cookie-settings-info">${lang.settingsInfo}</p>
        </div>
    `;
    
    dialog.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    const closeBtn = document.getElementById('cookie-settings-close');
    if (closeBtn) closeBtn.onclick = closeCookieSettingsDialog;
    dialog.onclick = (e) => { if (e.target === dialog) closeCookieSettingsDialog(); };
    
    const acceptBtn = document.getElementById('cookie-settings-accept');
    const declineBtn = document.getElementById('cookie-settings-decline');
    if (acceptBtn) acceptBtn.onclick = () => { acceptCookies(); closeCookieSettingsDialog(); };
    if (declineBtn) declineBtn.onclick = () => { declineCookies(); closeCookieSettingsDialog(); };
    
    const escHandler = (e) => { if (e.key === 'Escape') closeCookieSettingsDialog(); };
    document.addEventListener('keydown', escHandler);
    dialog._escHandler = escHandler;
}

function closeCookieSettingsDialog() {
    const dialog = document.getElementById('cookie-settings-dialog');
    if (dialog) {
        if (dialog._escHandler) document.removeEventListener('keydown', dialog._escHandler);
        dialog.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateCookieLanguageFromManager(lang) {
    if (cookieTranslations[lang]) setCookieLanguage(lang);
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        const savedLang = localStorage.getItem('selectedLanguage') || 'sl';
        if (cookieTranslations[savedLang]) currentLang = savedLang;
    } catch(e) {}
    
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const cookiesDeclined = localStorage.getItem('cookiesDeclined');
    
    if (!cookiesAccepted && !cookiesDeclined) {
        setTimeout(() => {
            updateCookieTexts();
            showCookieNotice();
            
            // Pozicioniraj cookie notice nad footer
            const footer = document.querySelector('footer');
            const notice = document.getElementById('cookie-notice');
            if (footer && notice) {
                notice.style.bottom = `${footer.offsetHeight + 10}px`;
            }
        }, 1500);
    }
    
    const acceptBtn = document.querySelector('.cookie-btn.accept');
    const declineBtn = document.querySelector('.cookie-btn.decline');
    if (acceptBtn) acceptBtn.addEventListener('click', acceptCookies);
    if (declineBtn) declineBtn.addEventListener('click', declineCookies);
    
    const footerCookieLink = document.getElementById('footer-cookie-link');
    if (footerCookieLink) {
        footerCookieLink.addEventListener('click', (e) => {
            e.preventDefault();
            showCookieSettingsDialog();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cookieExpanded) toggleCookieDetails();
    });
    
    // Posodobi pozicijo ob spremembi višine footerja
    window.addEventListener('resize', () => {
        const footer = document.querySelector('footer');
        const notice = document.getElementById('cookie-notice');
        if (footer && notice && notice.style.display === 'block') {
            notice.style.bottom = `${footer.offsetHeight + 10}px`;
        }
    });
});

window.setCookieNoticeLanguage = updateCookieLanguageFromManager;
window.showCookieSettingsDialog = showCookieSettingsDialog;
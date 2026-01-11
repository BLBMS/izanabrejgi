/* 034 */
/* PŠIŠKOTKOVNO OBVESTILO - VEČJEZIČNA VERZIJA */

// Prevodi za piškotke
const cookieTranslations = {
    sl: {
        // Osnovno besedilo
        basicText: "Ta spletna stran uporablja piškotke za izboljšanje uporabniške izkušnje.",
        readMore: "Preberite več",
        showLess: "Prikaži manj",

        // Podrobnosti
        detailsTitle1: "Kaj so piškotki?",
        detailsText1: "Piškotki so majhne datoteke, ki jih spletna stran shrani na vašo napravo. Omogočajo spletni strani, da si zapomni vaše dejanja in nastavitve (npr. prijavo, jezik in druge nastavitve prikaza), tako da jih ni treba nanovo vnašati ob vsakem obisku strani.",

        detailsTitle2: "Katere piškotke uporabljamo?",
        detailsList: [
            "<strong>Nujno potrebni piškotki:</strong> Omogočajo osnovno delovanje strani",
            "<strong>Funkcionalni piškotki:</strong> Zapomnijo vaše nastavitve in izbire",
            "<strong>Analitični piškotki:</strong> Pomagajo nam razumeti, kako uporabljate stran"
        ],

        detailsTitle3: "Kako lahko upravljate s piškotki?",
        detailsText3: "Večino brskalnikov lahko nastavite tako, da blokirajo piškotke ali vas opozorijo, ko so piškotki nameščeni. Če piškotke onemogočite, nekatere funkcije spletne strani morda ne bodo delovale pravilno.",

        detailsTitle4: "Vaša zasebnost",
        detailsText4: "Vaši osebni podatki so nam dragi. Piškotki, ki jih uporabljamo, so namenjeni izključno izboljšanju delovanja spletne strani in analitičnim namenom. Ne delimo vaših podatkov s tretjimi osebami v komercialne namene.",

        // Gumbi
        declineBtn: "Zavrni piškotke",
        acceptBtn: "Sprejmi vse piškotke",

        // Toast sporočila
        toastAccepted: "Hvala za soglasje! Piškotki so sprejeti.",
        toastDeclined: "Piškotki so zavrnjeni.",

        // Session specific
        sessionInfo: "Vaša izbira je shranjena za to sejo (dokler ne zaprete brskalnika)."
    },

    en: {
        basicText: "This website uses cookies to improve your user experience.",
        readMore: "Read more",
        showLess: "Show less",

        detailsTitle1: "What are cookies?",
        detailsText1: "Cookies are small files that a website stores on your device. They allow the website to remember your actions and settings (e.g., login, language, and other display settings), so you don't have to re-enter them each time you visit the site.",

        detailsTitle2: "Which cookies do we use?",
        detailsList: [
            "<strong>Essential cookies:</strong> Enable basic website functionality",
            "<strong>Functional cookies:</strong> Remember your settings and choices",
            "<strong>Analytical cookies:</strong> Help us understand how you use the site"
        ],

        detailsTitle3: "How can you manage cookies?",
        detailsText3: "Most browsers can be set to block cookies or alert you when cookies are being placed. If you disable cookies, some features of the website may not function properly.",

        detailsTitle4: "Your privacy",
        detailsText4: "Your personal data is important to us. The cookies we use are solely for improving website functionality and analytical purposes. We do not share your data with third parties for commercial purposes.",

        declineBtn: "Decline cookies",
        acceptBtn: "Accept all cookies",

        toastAccepted: "Thank you for your consent! Cookies have been accepted.",
        toastDeclined: "Cookies have been declined.",

        sessionInfo: "Your choice is saved for this session (until you close the browser)."
    },

    de: {
        basicText: "Diese Website verwendet Cookies, um Ihre Benutzererfahrung zu verbessern.",
        readMore: "Mehr lesen",
        showLess: "Weniger anzeigen",

        detailsTitle1: "Was sind Cookies?",
        detailsText1: "Cookies sind kleine Dateien, die eine Website auf Ihrem Gerät speichert. Sie ermöglichen es der Website, Ihre Aktionen und Einstellungen (z.B. Login, Sprache und andere Anzeigeeinstellungen) zu speichern, sodass Sie sie nicht bei jedem Besuch der Seite erneut eingeben müssen.",

        detailsTitle2: "Welche Cookies verwenden wir?",
        detailsList: [
            "<strong>Notwendige Cookies:</strong> Ermöglichen die grundlegende Funktionalität der Website",
            "<strong>Funktionale Cookies:</strong> Merken sich Ihre Einstellungen und Auswahl",
            "<strong>Analytische Cookies:</strong> Helfen uns zu verstehen, wie Sie die Website nutzen"
        ],

        detailsTitle3: "Wie können Sie Cookies verwalten?",
        detailsText3: "Die meisten Browser können so eingestellt werden, dass sie Cookies blockieren oder Sie benachrichtigen, wenn Cookies gesetzt werden. Wenn Sie Cookies deaktivieren, funktionieren einige Funktionen der Website möglicherweise nicht richtig.",

        detailsTitle4: "Ihre Privatsphäre",
        detailsText4: "Ihre persönlichen Daten sind uns wichtig. Die von uns verwendeten Cookies dienen ausschließlich der Verbesserung der Website-Funktionalität und analytischen Zwecken. Wir geben Ihre Daten nicht an Dritte zu kommerziellen Zwecken weiter.",

        declineBtn: "Cookies ablehnen",
        acceptBtn: "Alle Cookies akzeptieren",

        toastAccepted: "Vielen Dank für Ihre Zustimmung! Cookies wurden akzeptiert.",
        toastDeclined: "Cookies wurden abgelehnt.",

        sessionInfo: "Ihre Auswahl wird für diese Sitzung gespeichert (bis Sie den Browser schließen)."
    }
};

// Shrani trenutno stanje
let cookieExpanded = false;
let currentLang = 'sl'; // Privzeti jezik

// Funkcija za nastavitev jezika piškotkov
function setCookieLanguage(lang) {
    currentLang = lang || 'sl';
    updateCookieTexts();
}

// Posodobi vsa besedila piškotkov
function updateCookieTexts() {
    const lang = cookieTranslations[currentLang];
    if (!lang) return;

    // Osnovno besedilo
    const basicText = document.querySelector('.cookie-basic-text p');
    if (basicText) {
        const readMoreLink = document.querySelector('.read-more-link');
        basicText.innerHTML = lang.basicText + ` <button class="read-more-link">${lang.readMore}</button>`;

        // Ponovno dodaj event listener na nov gumb
        const newReadMoreLink = document.querySelector('.read-more-link');
        if (newReadMoreLink) {
            newReadMoreLink.removeEventListener('click', toggleCookieDetails);
            newReadMoreLink.addEventListener('click', toggleCookieDetails);
        }

        // Posodobi tekst gumba, če je razširjeno
        if (cookieExpanded) {
            newReadMoreLink.textContent = lang.showLess;
        }
    }

    // Podrobnosti
    const detailsSection = document.querySelector('.cookie-details');
    if (detailsSection) {
        detailsSection.innerHTML = `
            <h3>${lang.detailsTitle1}</h3>
            <p>${lang.detailsText1}</p>
            
            <h3>${lang.detailsTitle2}</h3>
            <ul>
                ${lang.detailsList.map(item => `<li>${item}</li>`).join('')}
            </ul>
            
            <h3>${lang.detailsTitle3}</h3>
            <p>${lang.detailsText3}</p>
            
            <h3>${lang.detailsTitle4}</h3>
            <p>${lang.detailsText4}</p>
            
            <p><em>${lang.sessionInfo}</em></p>
        `;
    }

    // Gumbi
    const declineBtn = document.querySelector('.cookie-btn.decline');
    const acceptBtn = document.querySelector('.cookie-btn.accept');

    if (declineBtn) declineBtn.textContent = lang.declineBtn;
    if (acceptBtn) acceptBtn.textContent = lang.acceptBtn;
}

// Funkcije za delo s piškotki
function acceptCookies() {
    // Shrani v sessionStorage (dela v inkognito)
    sessionStorage.setItem('cookiesAccepted', 'true');
    // Shrani tudi v localStorage za redne obiske
    try {
        localStorage.setItem('cookiesAccepted', 'true');
        localStorage.removeItem('cookiesDeclined');
    } catch (e) {
        console.log('LocalStorage ni na voljo');
    }
    sessionStorage.removeItem('cookiesDeclined');

    hideCookieNotice();
    showToast(cookieTranslations[currentLang].toastAccepted);
}

function declineCookies() {
    // Shrani v sessionStorage (dela v inkognito)
    sessionStorage.setItem('cookiesDeclined', 'true');
    // Shrani tudi v localStorage za redne obiske
    try {
        localStorage.setItem('cookiesDeclined', 'true');
        localStorage.removeItem('cookiesAccepted');
    } catch (e) {
        console.log('LocalStorage ni na voljo');
    }
    sessionStorage.removeItem('cookiesAccepted');

    hideCookieNotice();
    showToast(cookieTranslations[currentLang].toastDeclined);
}

function toggleCookieDetails() {
    const notice = document.getElementById('cookie-notice');
    const readMoreLink = document.querySelector('.read-more-link');

    cookieExpanded = !cookieExpanded;

    if (cookieExpanded) {
        notice.classList.add('expanded');
        readMoreLink.textContent = cookieTranslations[currentLang].showLess;
        notice.scrollTop = 0;
    } else {
        notice.classList.remove('expanded');
        readMoreLink.textContent = cookieTranslations[currentLang].readMore;
    }
}

function hideCookieNotice() {
    const notice = document.getElementById('cookie-notice');
    if (notice) {
        notice.style.display = 'none';
    }
}

function showToast(message) {
    const toast = document.getElementById('cookie-toast');
    if (toast) {
        toast.textContent = message;
        toast.style.display = 'block';

        setTimeout(function () {
            toast.style.display = 'none';
        }, 3000);
    }
}

// Poslušaj spremembe jezika
function listenForLanguageChanges() {
    // Poslušaj klik na zastavice (če uporabljaš tvoj obstoječi sistem)
    document.querySelectorAll('.language-flag').forEach(flag => {
        flag.addEventListener('click', function (e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            if (lang && cookieTranslations[lang]) {
                setCookieLanguage(lang);
            }
        });
    });

    // Poslušaj spremembe v localStorage (če tvoj language-manager.js shranjuje tam)
    window.addEventListener('storage', function (e) {
        if (e.key === 'selectedLanguage' && cookieTranslations[e.newValue]) {
            setCookieLanguage(e.newValue);
        }
    });
}

// Glavna inicializacija
document.addEventListener('DOMContentLoaded', function () {
    // Pridobi trenutni jezik iz localStorage ali privzeto sl
    try {
        const savedLang = localStorage.getItem('selectedLanguage') || 'sl';
        if (cookieTranslations[savedLang]) {
            currentLang = savedLang;
        }
    } catch (e) {
        console.log('Ne morem prebrati localStorage');
    }

    // Preveri, če je uporabnik že odločil o piškotkih
    const cookiesAccepted = sessionStorage.getItem('cookiesAccepted') ||
        localStorage.getItem('cookiesAccepted');
    const cookiesDeclined = sessionStorage.getItem('cookiesDeclined') ||
        localStorage.getItem('cookiesDeclined');

    // Če še ni odločeno o piškotkih
    if (!cookiesAccepted && !cookiesDeclined) {
        setTimeout(function () {
            const notice = document.getElementById('cookie-notice');
            if (notice) {
                // Nastavi jezik pred prikazom
                updateCookieTexts();
                notice.style.display = 'block';

                // Samodejno skrij čez 30 sekund, če uporabnik ne odgovori
                setTimeout(function () {
                    if (notice.style.display === 'block') {
                        hideCookieNotice();
                        showToast(cookieTranslations[currentLang].toastDeclined + ' (samodejno)');
                        sessionStorage.setItem('cookiesDeclined', 'true');
                    }
                }, 30000);
            }
        }, 1500);
    }

    // Dodaj event listenerje
    const acceptBtn = document.querySelector('.cookie-btn.accept');
    const declineBtn = document.querySelector('.cookie-btn.decline');

    if (acceptBtn) {
        acceptBtn.removeEventListener('click', acceptCookies);
        acceptBtn.addEventListener('click', acceptCookies);
    }

    if (declineBtn) {
        declineBtn.removeEventListener('click', declineCookies);
        declineBtn.addEventListener('click', declineCookies);
    }

    // Dodaj event listener za "Preberite več" link (dodan kasneje z updateCookieTexts)
    setTimeout(() => {
        const readMoreLink = document.querySelector('.read-more-link');
        if (readMoreLink) {
            readMoreLink.addEventListener('click', toggleCookieDetails);
        }
    }, 100);

    // Poslušaj spremembe jezika
    listenForLanguageChanges();

    // Dodaj tudi ESC tipko za skrivanje razširjenega pogleda
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && cookieExpanded) {
            toggleCookieDetails();
        }
    });
});

// Funkcija za ročno nastavitev jezika (lahko kličeš iz language-manager.js)
window.setCookieNoticeLanguage = function (lang) {
    if (cookieTranslations[lang]) {
        setCookieLanguage(lang);
    }
};

// Funkcija za prikaz piškotkov (če jih želiš ročno pokazati)
window.showCookieNotice = function () {
    updateCookieTexts();
    const notice = document.getElementById('cookie-notice');
    if (notice) {
        notice.style.display = 'block';
    }
};

// Funkcija za resetiranje (za testiranje)
window.resetCookieSettings = function () {
    sessionStorage.removeItem('cookiesAccepted');
    sessionStorage.removeItem('cookiesDeclined');
    localStorage.removeItem('cookiesAccepted');
    localStorage.removeItem('cookiesDeclined');
    const notice = document.getElementById('cookie-notice');
    if (notice) {
        notice.style.display = 'block';
    }
    showToast('Cookie nastavitve so ponastavljene.');
};
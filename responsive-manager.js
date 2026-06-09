/* 045 */
/* responsive-manager.js */
// Responsivne funkcije

// Funkcija za prilagajanje višine glede na orientacijo in header
function adjustSlideshowHeight() {
    const slideshow = document.getElementById('slideshow-container');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    if (!slideshow) return;

    // Počakamo na naslednji cikel, da se header pravilno izračuna
    setTimeout(() => {
        const headerHeight = header ? header.offsetHeight : 80;
        const footerHeight = footer ? footer.offsetHeight : 60;

        // Izračunamo razpoložljivo višino
        const availableHeight = window.innerHeight - headerHeight - footerHeight;

        console.log('📐 adjustSlideshowHeight - Header:', headerHeight, 'Footer:', footerHeight, 'Available:', availableHeight);

        // Nastavimo višino
        slideshow.style.height = availableHeight + 'px';
        slideshow.style.minHeight = '200px';
        slideshow.style.maxHeight = availableHeight + 'px';

        // Force reflow - ponovno izračunaj
        slideshow.offsetHeight;
    }, 10);
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

    if (!header || !container) return;

    const headerHeight = header.offsetHeight;
    container.style.minHeight = `calc(100vh - ${headerHeight}px)`;
}

// Nova funkcija: Opazuje spremembe višine headerja
function observeHeaderChanges() {
    const header = document.querySelector('header');
    if (!header) return;

    // Opazujemo spremembe velikosti headerja
    const resizeObserver = new ResizeObserver(() => {
        console.log('📐 Header size changed, adjusting...');
        adjustSlideshowHeight();
        adjustContainerHeight();
    });

    resizeObserver.observe(header);

    // Opazujemo tudi footer
    const footer = document.querySelector('footer');
    if (footer) {
        resizeObserver.observe(footer);
    }
}

// Funkcija za prilagajanje višine zemljevida
function adjustMapHeight() {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;

    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const headerHeight = header ? header.offsetHeight : 80;
    const footerHeight = footer ? footer.offsetHeight : 60;

    const topOffset = headerHeight + 20;
    const bottomOffset = footerHeight + 20;

    // Izračunamo višino
    let mapHeight = window.innerHeight - topOffset - bottomOffset;

    // Če je premalo prostora (landscape), zmanjšamo gumba in povečamo zemljevid
    const isLandscape = window.innerWidth > window.innerHeight;
    const isMobile = window.innerWidth <= 768;

    if (isMobile && isLandscape && mapHeight < 350) {
        // Zmanjšamo padding in gumba
        mapContainer.style.padding = '5px 10px !important';
        mapContainer.style.height = `calc(100vh - ${topOffset + bottomOffset - 20}px) !important`;

        // Zmanjšamo gumbe
        const buttons = document.querySelectorAll('.map-btn');
        buttons.forEach(btn => {
            btn.style.padding = '3px 6px';
            btn.style.fontSize = '0.65rem';
        });

        const buttonGroups = document.querySelectorAll('.map-button-group');
        buttonGroups.forEach(group => {
            group.style.padding = '2px';
        });

        const iframe = document.getElementById('map-iframe');
        if (iframe) {
            iframe.style.minHeight = '200px';
        }
    } else {
        // Ponastavimo
        mapContainer.style.padding = '10px 15px !important';
        mapContainer.style.height = `calc(100vh - ${topOffset + bottomOffset}px) !important`;

        const buttons = document.querySelectorAll('.map-btn');
        buttons.forEach(btn => {
            btn.style.padding = '';
            btn.style.fontSize = '';
        });

        const iframe = document.getElementById('map-iframe');
        if (iframe) {
            iframe.style.minHeight = '300px';
        }
    }
}

// Nastavi event listenerje za orientacijo in velikost
function adjustMapOrientation() {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;

    const isLandscape = window.innerWidth > window.innerHeight;
    const isMobile = window.innerWidth <= 932;

    if (isMobile && isLandscape) {
        mapContainer.style.flexDirection = 'row';
        mapContainer.style.alignItems = 'stretch';
    } else {
        mapContainer.style.flexDirection = 'column';
    }
}

// Klici ob različnih dogodkih
window.addEventListener('load', function () {
    setTimeout(adjustSlideshowHeight, 50);
    setTimeout(adjustSlideshowHeight, 200);
    setTimeout(adjustSlideshowHeight, 500);
    adjustImageSizes();
    adjustContainerHeight();
});

window.addEventListener('resize', function () {
    setTimeout(adjustSlideshowHeight, 30);
    setTimeout(adjustImageSizes, 50);
    setTimeout(adjustContainerHeight, 50);
    setTimeout(adjustMapHeight, 50);
    setTimeout(adjustMapOrientation, 50);
});

window.addEventListener('orientationchange', function () {
    setTimeout(adjustSlideshowHeight, 100);
    setTimeout(adjustImageSizes, 100);
    setTimeout(adjustContainerHeight, 100);
    setTimeout(adjustMapHeight, 100);
    setTimeout(adjustMapOrientation, 100);
});

// Eksport funkcij
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        adjustSlideshowHeight,
        adjustImageSizes,
        adjustContainerHeight,
        observeHeaderChanges,
        adjustMapHeight,
        adjustMapOrientation
    };
}
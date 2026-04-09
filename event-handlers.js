/* 043 */
/* event-handlers.js */
// Event handlerji

// Event listener za klik na background
function setupOverlayBackgroundClick() {
    document.addEventListener('click', function (event) {
        if (event.target.id === 'overlay-background') {
            if (typeof hideAllOverlays === 'function') {
                hideAllOverlays();
            }
        }
    });
}

// Blokiraj event propagation znotraj overlayjev
function setupOverlayClickHandlers() {
    document.querySelectorAll('.text-overlay, .contact-overlay').forEach(overlay => {
        overlay.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });
}

// Nastavi event listenerje za spremembe velikosti
function setupResizeHandlers() {
    window.addEventListener('load', function () {
        if (typeof adjustSlideshowHeight === 'function') adjustSlideshowHeight();
        if (typeof adjustImageSizes === 'function') adjustImageSizes();
        if (typeof adjustContainerHeight === 'function') adjustContainerHeight();
    });

    window.addEventListener('resize', function () {
        if (typeof adjustSlideshowHeight === 'function') adjustSlideshowHeight();
        if (typeof adjustImageSizes === 'function') adjustImageSizes();
        if (typeof adjustContainerHeight === 'function') adjustContainerHeight();
    });

    window.addEventListener('orientationchange', function () {
        setTimeout(function () {
            if (typeof adjustSlideshowHeight === 'function') adjustSlideshowHeight();
            if (typeof adjustImageSizes === 'function') adjustImageSizes();
            if (typeof adjustContainerHeight === 'function') adjustContainerHeight();
        }, 100);
    });
}

// Prepreči, da bi klik na gumb sprožil bodyClickHandler
function setupNavHandlers() {
    const navHome = document.getElementById('nav-home');
    const navDescription = document.getElementById('nav-description');
    const navAbout = document.getElementById('nav-about');
    const navContact = document.getElementById('nav-contact');
    const navMap = document.getElementById('nav-map');
    const navReserve = document.getElementById('nav-reserve');
    const navLinks = document.getElementById('nav-links');

    if (navHome) {
        navHome.addEventListener('click', function (e) {
            e.stopPropagation(); // PREPREČI PROPAGACIJO
            showHome();
        });
    }

    if (navDescription) {
        navDescription.addEventListener('click', function (e) {
            e.stopPropagation(); // PREPREČI PROPAGACIJO
            showDescription();
        });
    }

    if (navAbout) {
        navAbout.addEventListener('click', function (e) {
            e.stopPropagation(); // PREPREČI PROPAGACIJO
            showAbout();
        });
    }

    if (navContact) {
        navContact.addEventListener('click', function (e) {
            e.stopPropagation(); // PREPREČI PROPAGACIJO
            showContact();
        });
    }

    if (navMap) {
        navMap.addEventListener('click', function (e) {
            e.stopPropagation(); // PREPREČI PROPAGACIJO
            showMapWidget();
        });
    }

    if (navReserve) {
        navReserve.addEventListener('click', function (e) {
            e.stopPropagation(); // PREPREČI PROPAGACIJO
            showReserveOverlay();
        });
    }

    if (navLinks) {
        navLinks.addEventListener('click', function (e) {
            e.stopPropagation(); // PREPREČI PROPAGACIJO
            showLinksOverlay();
        });
    }
}

// Pokliči ob nalaganju
document.addEventListener('DOMContentLoaded', setupNavHandlers);

// Eksport funkcij
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupOverlayBackgroundClick,
        setupOverlayClickHandlers,
        setupResizeHandlers
    };
}
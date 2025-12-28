/* 027 */
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
        overlay.addEventListener('click', function(e) {
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

// Eksport funkcij
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupOverlayBackgroundClick,
        setupOverlayClickHandlers,
        setupResizeHandlers
    };
}
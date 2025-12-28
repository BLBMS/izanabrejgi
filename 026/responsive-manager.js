/* 026 */
// Responsivne funkcije

// Funkcija za prilagajanje višine glede na orientacijo
function adjustSlideshowHeight() {
    const slideshow = document.getElementById('slideshow-container');
    if (!slideshow) return;
    
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
    
    if (!header || !container) return;
    
    const headerHeight = header.offsetHeight;
    container.style.minHeight = `calc(100vh - ${headerHeight}px)`;
}

// Eksport funkcij
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        adjustSlideshowHeight,
        adjustImageSizes,
        adjustContainerHeight
    };
}

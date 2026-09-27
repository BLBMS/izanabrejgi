/* 046 */
/* slideshow-manager.js - s podaljšanjem timera ob kliku na sliko */

// Premeša array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Globalne spremenljivke
let slideshowTimer = null;
let slideshowStartTime = null;   // Kdaj se je trenutni timer začel
let slideshowDuration = null;    // Trajanje trenutnega timerja
const BASE_INTERVAL = 3000;
const USER_INTERVAL = 6000;

// ============================================
// TIMER FUNKCIJE
// ============================================

function stopSlideshow() {
    if (slideshowTimer) {
        clearTimeout(slideshowTimer);
        slideshowTimer = null;
    }
    slideshowStartTime = null;
    slideshowDuration = null;
}

function startSlideshow(delay) {
    stopSlideshow();
    const interval = (typeof delay === 'number') ? delay : BASE_INTERVAL;
    
    slideshowStartTime = Date.now();
    slideshowDuration = interval;
    
    slideshowTimer = setTimeout(function () {
        slideshowTimer = null;
        slideshowStartTime = null;
        slideshowDuration = null;
        advanceSlide();
        startSlideshow(BASE_INTERVAL);
    }, interval);
}

// Resetiraj timer na USER_INTERVAL (6s) - za puščice in pike
function resetSlideshowTimer() {
    startSlideshow(USER_INTERVAL);
}

// PODALJŠAJ timer - doda USER_INTERVAL - BASE_INTERVAL (3s) k preostalemu času
function extendSlideshowTimer() {
    if (!slideshowTimer || !slideshowStartTime || !slideshowDuration) {
        // Če timer ni aktiven, ga zaženi normalno
        startSlideshow(USER_INTERVAL);
        return;
    }
    
    const now = Date.now();
    const elapsed = now - slideshowStartTime;
    const remaining = Math.max(0, slideshowDuration - elapsed);
    
    // Dodaj RAZLIKO med USER_INTERVAL (6s) in BASE_INTERVAL (3s) = 3s
    const extension = USER_INTERVAL - BASE_INTERVAL; // 3000ms
    const newRemaining = remaining + extension;
    
    console.log('⏱️ Timer extended:',
        'elapsed:', elapsed + 'ms',
        'remaining:', remaining + 'ms',
        'newRemaining:', newRemaining + 'ms (podaljšano za ' + extension + 'ms)');
    
    // Počisti stari timer
    clearTimeout(slideshowTimer);
    
    // Nastavi novega z novim časom
    slideshowStartTime = now;
    slideshowDuration = newRemaining;
    
    slideshowTimer = setTimeout(function () {
        slideshowTimer = null;
        slideshowStartTime = null;
        slideshowDuration = null;
        advanceSlide();
        startSlideshow(BASE_INTERVAL);
    }, newRemaining);
}

// ============================================
// NAPREDOVANJE
// ============================================

function advanceSlide() {
    if (typeof window.currentSlide === 'undefined') window.currentSlide = 0;
    if (!window.imageFiles || window.imageFiles.length === 0) return;
    
    window.currentSlide++;
    const track = document.getElementById('slideshow-track');
    if (!track || !track.children[0]) return;

    const slideWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${window.currentSlide * slideWidth}px)`;

    if (window.currentSlide >= window.imageFiles.length) {
        setTimeout(function () {
            track.style.transition = 'none';
            window.currentSlide = 0;
            track.style.transform = `translateX(0)`;
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    track.style.transition = 'transform 1.25s ease-in-out';
                });
            });
        }, 1300);
    }
    updateDots();
}

// ============================================
// NALAGANJE SLIK
// ============================================

function loadSlides() {
    const slideshowTrack = document.getElementById('slideshow-track');
    if (!slideshowTrack) {
        console.error('❌ slideshow-track not found');
        return;
    }

    if (!window.imageFiles || !Array.isArray(window.imageFiles)) {
        console.error('❌ imageFiles ni definiran ali ni array');
        return;
    }

    const shuffledImages = shuffleArray([...window.imageFiles]);

    shuffledImages.forEach(function (imageSrc, index) {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Iža ' + (index + 1);
        img.className = 'slide';
        img.onload = function () {
            if (index === shuffledImages.length - 1) {
                setTimeout(function () {
                    initSlideshowControls();
                }, 500);
            }
        };
        img.onerror = function () {
            console.error('❌ Ne morem naložiti slike: ' + imageSrc);
        };
        slideshowTrack.appendChild(img);
    });

    if (slideshowTrack.children.length > 0) {
        const firstSlide = slideshowTrack.children[0].cloneNode(true);
        slideshowTrack.appendChild(firstSlide);
    }
}

function initSlideshowControls() {
    createSlideshowDots();
    updateDots();
    startSlideshow(BASE_INTERVAL);
    
    // DODAJ: Klik na sliko podaljša timer
    setupSlideshowClickHandler();
}

// ============================================
// KLIK NA SLIKO - PODALJŠA TIMER
// ============================================

function setupSlideshowClickHandler() {
    const slideshow = document.querySelector('.slideshow');
    if (!slideshow) return;
    
    // Odstrani stare listenerje (če obstajajo)
    if (window._slideshowClickHandler) {
        slideshow.removeEventListener('click', window._slideshowClickHandler);
    }
    
    // Ustvari nov handler
    window._slideshowClickHandler = function(e) {
        // Preveri, da klik NI na puščico ali piko
        if (e.target.closest('.slideshow-arrow') || 
            e.target.closest('.slideshow-dot')) {
            return;
        }
        
        // Klik na sliko - podaljšaj timer
        extendSlideshowTimer();
    };
    
    slideshow.addEventListener('click', window._slideshowClickHandler);
}

// ============================================
// ROČNI PREMIKI (puščice in pike - resetirajo na 6s)
// ============================================

function nextSlide() {
    if (typeof window.currentSlide === 'undefined') window.currentSlide = 0;
    if (!window.imageFiles) return;

    window.currentSlide++;
    const track = document.getElementById('slideshow-track');
    if (!track || !track.children[0]) return;

    const slideWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${window.currentSlide * slideWidth}px)`;

    if (window.currentSlide >= window.imageFiles.length) {
        setTimeout(function () {
            track.style.transition = 'none';
            window.currentSlide = 0;
            track.style.transform = `translateX(0)`;
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    track.style.transition = 'transform 1.25s ease-in-out';
                });
            });
        }, 1300);
    }
    updateDots();
    resetSlideshowTimer();
}

function prevSlide() {
    if (typeof window.currentSlide === 'undefined') window.currentSlide = 0;
    if (!window.imageFiles) return;

    const track = document.getElementById('slideshow-track');
    if (!track || !track.children[0]) return;

    if (window.currentSlide >= window.imageFiles.length) {
        track.style.transition = 'none';
        window.currentSlide = window.imageFiles.length - 1;
        const slideWidth = track.children[0].offsetWidth;
        track.style.transform = `translateX(-${window.currentSlide * slideWidth}px)`;
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                track.style.transition = 'transform 1.25s ease-in-out';
            });
        });
        updateDots();
        resetSlideshowTimer();
        return;
    }

    window.currentSlide--;
    if (window.currentSlide < 0) {
        window.currentSlide = window.imageFiles.length - 1;
    }

    const slideWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${window.currentSlide * slideWidth}px)`;
    updateDots();
    resetSlideshowTimer();
}

function goToSlide(slideIndex) {
    if (typeof window.currentSlide === 'undefined') window.currentSlide = 0;
    if (!window.imageFiles) return;

    const track = document.getElementById('slideshow-track');
    if (!track || !track.children[0]) return;

    if (window.currentSlide >= window.imageFiles.length) {
        track.style.transition = 'none';
        window.currentSlide = slideIndex;
        const slideWidth = track.children[0].offsetWidth;
        track.style.transform = `translateX(-${window.currentSlide * slideWidth}px)`;
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                track.style.transition = 'transform 1.25s ease-in-out';
            });
        });
        updateDots();
        resetSlideshowTimer();
        return;
    }

    window.currentSlide = slideIndex;
    const slideWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${window.currentSlide * slideWidth}px)`;
    updateDots();
    resetSlideshowTimer();
}

// ============================================
// DOTS
// ============================================

function createSlideshowDots() {
    const dotsContainer = document.getElementById('slideshow-dots');
    if (!dotsContainer || !window.imageFiles) return;

    dotsContainer.innerHTML = '';

    for (let i = 0; i < window.imageFiles.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'slideshow-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', (function (index) {
            return function () { goToSlide(index); };
        })(i));
        dot.setAttribute('aria-label', 'Pojdi na sliko ' + (i + 1));
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.slideshow-dot');
    if (typeof window.currentSlide === 'undefined') window.currentSlide = 0;
    if (!window.imageFiles) return;

    const actualSlide = window.currentSlide % window.imageFiles.length;

    dots.forEach(function (dot, index) {
        if (index === actualSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// ============================================
// ZAUSTAVITEV OB ZAPUSTITVI STRANI
// ============================================
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        stopSlideshow();
    } else {
        startSlideshow(BASE_INTERVAL);
    }
});

// Eksport
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadSlides, prevSlide, nextSlide, goToSlide,
        createSlideshowDots, updateDots, startSlideshow,
        stopSlideshow, resetSlideshowTimer, extendSlideshowTimer, advanceSlide
    };
}
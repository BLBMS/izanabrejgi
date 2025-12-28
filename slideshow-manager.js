/* 027 */
// Upravljanje slideshow

// Premeša array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Naloži slike v slideshow
function loadSlides() {
    const slideshowTrack = document.getElementById('slideshow-track');
    if (!slideshowTrack) return;

    // Preveri če imageFiles obstaja
    if (!window.imageFiles || !Array.isArray(window.imageFiles)) {
        console.error('❌ imageFiles ni definiran ali ni array');
        return;
    }

    const shuffledImages = shuffleArray([...window.imageFiles]);

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
        img.onerror = function() {
            console.error(`❌ Ne morem naložiti slike: ${imageSrc}`);
        };
        slideshowTrack.appendChild(img);
    });

    // Dodaj prvo sliko na konec za neskončni efekt
    if (slideshowTrack.children.length > 0) {
        const firstSlide = slideshowTrack.children[0].cloneNode(true);
        slideshowTrack.appendChild(firstSlide);
    }
}

// Inicializacija slideshow controls
function initSlideshowControls() {
    setTimeout(() => {
        createSlideshowDots();
        updateDots();
    }, 1000);
}

// Funkcija za naslednji slide (avtomatsko menjavanje)
function showNextSlide() {
    if (typeof window.currentSlide === 'undefined') window.currentSlide = 0;
    
    window.currentSlide++;
    const track = document.getElementById('slideshow-track');
    if (!track || !track.children[0]) return;

    const slideWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${window.currentSlide * slideWidth}px)`;

    if (window.currentSlide >= window.imageFiles.length) {
        setTimeout(() => {
            track.style.transition = 'none';
            window.currentSlide = 0;
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
    if (!dotsContainer || !window.imageFiles) return;

    dotsContainer.innerHTML = '';

    for (let i = 0; i < window.imageFiles.length; i++) {
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
    if (typeof window.currentSlide === 'undefined') window.currentSlide = 0;
    
    window.currentSlide = slideIndex;
    const track = document.getElementById('slideshow-track');
    if (!track || !track.children[0]) return;

    const slideWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${window.currentSlide * slideWidth}px)`;
    updateDots();
}

// Funkcija za prejšnji slide (ročno)
function prevSlide() {
    if (typeof window.currentSlide === 'undefined') window.currentSlide = 0;
    
    window.currentSlide--;
    if (window.currentSlide < 0) {
        window.currentSlide = window.imageFiles.length - 1;
    }

    const track = document.getElementById('slideshow-track');
    if (!track || !track.children[0]) return;

    const slideWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${window.currentSlide * slideWidth}px)`;
    updateDots();
}

// Funkcija za naslednji slide (ročno)
function nextSlide() {
    if (typeof window.currentSlide === 'undefined') window.currentSlide = 0;
    
    window.currentSlide++;
    const track = document.getElementById('slideshow-track');
    if (!track || !track.children[0]) return;

    const slideWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${window.currentSlide * slideWidth}px)`;

    // Neskončni efekt
    if (window.currentSlide >= window.imageFiles.length) {
        setTimeout(() => {
            track.style.transition = 'none';
            window.currentSlide = 0;
            track.style.transform = `translateX(0)`;
            setTimeout(() => {
                track.style.transition = 'transform 0.75s ease-in-out';
            }, 50);
        }, 500);
    }
    updateDots();
}

// Posodobi aktivne dots
function updateDots() {
    const dots = document.querySelectorAll('.slideshow-dot');
    if (typeof window.currentSlide === 'undefined') window.currentSlide = 0;
    if (!window.imageFiles) return;
    
    const actualSlide = window.currentSlide % window.imageFiles.length;

    dots.forEach((dot, index) => {
        if (index === actualSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Eksport funkcij
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadSlides,
        prevSlide,
        nextSlide,
        goToSlide,
        showNextSlide,
        createSlideshowDots,
        updateDots
    };
}
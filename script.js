// 019
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
    "images/spalnica.jpg",
    "images/wc1.jpg",
    "images/zunaj-lagev1.jpg",
    "images/zunaj-mici1.jpg"
];

let currentSlide = 0;
const slideshowTrack = document.getElementById('slideshow-track');
const aboutOverlay = document.getElementById('about-overlay');
const contactOverlay = document.getElementById('contact-overlay');
const descriptionOverlay = document.getElementById('description-overlay');
const overlayBackground = document.getElementById('overlay-background');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showNextSlide() {
    currentSlide++;
    const track = document.getElementById('slideshow-track');
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
}

function hideAllOverlays() {
    aboutOverlay.classList.remove('active');
    contactOverlay.classList.remove('active');
    descriptionOverlay.classList.remove('active');
    overlayBackground.classList.remove('active');
}

function showHome() {
    hideAllOverlays();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showDescription() {
    hideAllOverlays();
    overlayBackground.classList.add('active');
    descriptionOverlay.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAbout() {
    hideAllOverlays();
    overlayBackground.classList.add('active');
    aboutOverlay.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showContact() {
    hideAllOverlays();
    overlayBackground.classList.add('active');
    contactOverlay.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

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

window.addEventListener('load', function () {
    adjustSlideshowHeight();
    adjustImageSizes();
});

window.addEventListener('resize', function () {
    adjustSlideshowHeight();
    adjustImageSizes();
});

window.addEventListener('orientationchange', function () {
    setTimeout(function () {
        adjustSlideshowHeight();
        adjustImageSizes();
    }, 100);
});

function loadSlides() {
    const shuffledImages = shuffleArray([...imageFiles]);

    shuffledImages.forEach((imageSrc, index) => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Iža na brejgi ${index + 1}`;
        img.className = 'slide';
        slideshowTrack.appendChild(img);
    });

    const firstSlide = slideshowTrack.children[0].cloneNode(true);
    slideshowTrack.appendChild(firstSlide);

    setTimeout(function () {
        adjustImageSizes();
    }, 500);
}

loadSlides();

setInterval(showNextSlide, 4000);

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('slideshow') || event.target.classList.contains('overlay-background')) {
        hideAllOverlays();
    }
});

function adjustContainerHeight() {
    const header = document.querySelector('header');
    const container = document.querySelector('.container');
    const headerHeight = header.offsetHeight;

    container.style.minHeight = `calc(100vh - ${headerHeight}px)`;
}

window.addEventListener('load', adjustContainerHeight);
window.addEventListener('resize', adjustContainerHeight);
window.addEventListener('orientationchange', function () {
    setTimeout(adjustContainerHeight, 100);
});

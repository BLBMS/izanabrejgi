/* 045 */
/* reviews-overlay.js - s paginacijo in samodejnim pomikanjem (brez zvezdic) */

const baseReviewsData = [
    {
        id: 1,
        platform: 'Google',
        rating: 5,
        ratingMax: 5,
        reviewer: 'Tadej (SI)',
        review: {
            sl: 'Zelo lepo in čisto, na idilični lokaciji med vinogradi, prijazno osebje. Z veseljem se bomo vrnili.',
            en: 'Very nice and clean, in an idyllic location among the vineyards, with friendly hosts. We will gladly return.',
            de: 'Sehr schön und sauber, in idyllischer Lage zwischen den Weinbergen, mit freundlichen Gastgebern. Wir kommen gerne wieder.'
        },
    },
    {
        id: 2,
        platform: 'Booking',
        rating: 10,
        ratingMax: 10,
        reviewer: 'Milan (SI)',
        review: {
            sl: 'Enkratno, toplo priporočam. Mir in tišina zagotovljena hiška pa opremljena z vsem kar potrebujete na dopustu in še več. Okolica lepo urejena, tako, da je užitek posedati na terasi. Takoj se boste počutili kot doma. Gostitelja presenetita z majhnimi malenkostmi, ki ogromno pomenijo. Toplo priporočam😄',
            en: 'Exceptional, highly recommended. Peace and quiet are guaranteed, and the cottage is equipped with everything you need for your holiday and more. The surroundings are beautifully maintained, making it a pleasure to relax on the terrace. You will feel at home immediately. The hosts surprise you with small touches that mean a lot. Highly recommended 😄',
            de: 'Einfach hervorragend, sehr empfehlenswert. Ruhe und Erholung sind garantiert, und das Häuschen ist mit allem ausgestattet, was man für den Urlaub braucht – und noch mehr. Die Umgebung ist wunderschön gepflegt, sodass man die Zeit auf der Terrasse besonders genießen kann. Man fühlt sich sofort wie zu Hause. Die Gastgeber überraschen mit kleinen Aufmerksamkeiten, die viel bedeuten. Sehr zu empfehlen 😄'
        },
    },
    {
        id: 3,
        platform: 'Booking',
        rating: 10,
        ratingMax: 10,
        reviewer: 'David (SI)',
        review: {
            sl: 'Prijetno in mirno bivanje. Mirno in udobno.',
            en: 'Cozy and peaceful stay. Peaceful and comfortable.',
            de: 'Gemütlicher und ruhiger Aufenthalt. Ruhig und komfortabel.'
        }
    }
    /*,
    {
        id: 4,
        platform: 'Vrbo',
        rating: 5,
        ratingMax: 5,
        reviewer: 'Name (country)',
        review: {
            sl: '',
            en: '',
            de: ''
        }
    },
    {
        id: 5,
        platform: 'Expedia',
        rating: 10,
        ratingMax: 10,
        reviewer: 'Name (country)',
        review: {
            sl: '',
            en: '',
            de: ''
        }
    },
    {
        id: 6,
        platform: 'Hostex',
        rating: 10,
        ratingMax: 10,
        reviewer: 'Name (country)',
        review: {
            sl: '',
            en: '',
            de: ''
        }
    },
    {
        id: 7,
        platform: 'Airbnb',
        rating: 10,
        ratingMax: 10,
        reviewer: 'Name (country)',
        review: {
            sl: '',
            en: '',
            de: ''
        }
    }
*/
];

const REVIEWS_PER_PAGE = 5;
let currentReviewsPage = 0;
let autoSlideInterval = null;

function getReviewsByLanguage(lang = 'sl') {
    return baseReviewsData.map(review => ({
        id: review.id,
        platform: review.platform,
        rating: review.rating,
        ratingMax: review.ratingMax,
        reviewer: review.reviewer,
        review: review.review[lang] || review.review.sl
    }));
}

function getTotalPages() {
    return Math.ceil(baseReviewsData.length / REVIEWS_PER_PAGE);
}

function getCurrentPageReviews(lang = 'sl') {
    const allReviews = getReviewsByLanguage(lang);
    const start = currentReviewsPage * REVIEWS_PER_PAGE;
    const end = start + REVIEWS_PER_PAGE;
    return allReviews.slice(start, end);
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
        const overlay = document.getElementById('reviews-overlay');
        if (overlay && overlay.classList.contains('active')) {
            const hovered = overlay.matches(':hover');
            if (!hovered) {
                nextReviewsPage();
            }
        }
    }, 15000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function resetAutoSlideTimer() {
    if (autoSlideInterval) {
        stopAutoSlide();
        startAutoSlide();
    }
}

function updateReviewsPaginationButtons() {
    const totalPages = getTotalPages();
    const prevBtn = document.getElementById('reviews-prev');
    const nextBtn = document.getElementById('reviews-next');
    const pageInfo = document.getElementById('reviews-page-info');

    if (prevBtn) {
        if (currentReviewsPage > 0) {
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        } else {
            prevBtn.style.opacity = '0.3';
            prevBtn.style.pointerEvents = 'none';
        }
    }

    if (nextBtn) {
        if (currentReviewsPage < totalPages - 1) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        } else {
            nextBtn.style.opacity = '0.3';
            nextBtn.style.pointerEvents = 'none';
        }
    }

    if (pageInfo) {
        pageInfo.textContent = `${currentReviewsPage + 1} / ${totalPages}`;
    }
}

function loadReviewsPage(lang = 'sl') {
    const containerDiv = document.getElementById('reviews-container');
    if (!containerDiv) return;

    const pageReviews = getCurrentPageReviews(lang);
    let html = '';

    pageReviews.forEach(review => {
        let logoFile = '';
        if (review.platform === 'Booking') logoFile = 'logo_booking.png';
        else if (review.platform === 'Airbnb') logoFile = 'logo_airbnb.png';
        else if (review.platform === 'Expedia') logoFile = 'logo_expedia.png';
        else if (review.platform === 'Vrbo') logoFile = 'logo_vrbo.png';
        else if (review.platform === 'Google') logoFile = 'logo_google_maps.png';
        else logoFile = 'logo_hostex.png';

        html += `
            <div class="review-item">
                <div class="review-left">
                    <div class="review-rating">
                        ${review.rating}/${review.ratingMax}
                    </div>
                    <div class="review-reviewer">
                        ${review.reviewer}
                    </div>
                    <img src="logos/${logoFile}" alt="${review.platform}" class="review-platform-logo" onerror="this.style.display='none'">
                </div>
                <div class="review-text">
                    <p>${review.review}</p>
                </div>
            </div>
        `;
    });

    containerDiv.innerHTML = html;
    updateReviewsPaginationButtons();
}

function nextReviewsPage() {
    const totalPages = getTotalPages();
    if (currentReviewsPage < totalPages - 1) {
        currentReviewsPage++;
        const lang = window.currentLanguage || 'sl';
        loadReviewsPage(lang);
        resetAutoSlideTimer();
    }
}

function prevReviewsPage() {
    if (currentReviewsPage > 0) {
        currentReviewsPage--;
        const lang = window.currentLanguage || 'sl';
        loadReviewsPage(lang);
        resetAutoSlideTimer();
    }
}

function showReviewsOverlay() {
    console.log('showReviewsOverlay called');

    currentReviewsPage = 0;

    if (typeof hideAllOverlays === 'function') {
        hideAllOverlays();
    }

    activeOverlayType = 'reviews';

    const bg = document.getElementById('overlay-background');
    if (bg) bg.classList.add('active');

    const currentLang = window.currentLanguage || 'sl';
    const overlay = document.getElementById('reviews-overlay');

    loadReviewsPage(currentLang);

    if (overlay) {
        overlay.classList.add('active');
    }

    const title = document.getElementById('reviews-title');
    const navData = window.languageData?.[currentLang]?.nav;

    if (title && navData?.reviews) {
        title.textContent = navData.reviews;
    } else if (title) {
        title.textContent = 'Mnenja gostov';
    }

    startAutoSlide();

    setTimeout(() => {
        if (typeof adjustOverlayPosition === 'function') {
            adjustOverlayPosition();
        }
    }, 10);

    document.addEventListener('keydown', reviewsEscHandler);
    document.body.addEventListener('click', reviewsBodyClickHandler);

    if (overlay) {
        overlay.addEventListener('mouseenter', stopAutoSlide);
        overlay.addEventListener('mouseleave', startAutoSlide);
    }

    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideReviewsOverlay() {
    console.log('hideReviewsOverlay called');

    stopAutoSlide();

    const overlay = document.getElementById('reviews-overlay');
    const bg = document.getElementById('overlay-background');

    if (overlay) {
        overlay.removeEventListener('mouseenter', stopAutoSlide);
        overlay.removeEventListener('mouseleave', startAutoSlide);
    }

    if (overlay) overlay.classList.remove('active');
    if (bg && activeOverlayType === 'reviews') bg.classList.remove('active');

    document.body.style.overflow = '';

    if (activeOverlayType === 'reviews') {
        activeOverlayType = null;
    }

    document.removeEventListener('keydown', reviewsEscHandler);
    document.body.removeEventListener('click', reviewsBodyClickHandler);
}

function reviewsEscHandler(e) {
    if (e.key === 'Escape') {
        hideReviewsOverlay();
    }
}

function reviewsBodyClickHandler(e) {
    const isFlag = e.target.closest('.language-flag');
    if (isFlag) return;

    const isArrow = e.target.closest('.reviews-arrow');
    if (isArrow) return;

    const isOverlayContent = e.target.closest('#reviews-overlay');
    if (!isOverlayContent && activeOverlayType === 'reviews') {
        hideReviewsOverlay();
    }
}

function updateReviewsLanguage(lang) {
    const title = document.getElementById('reviews-title');
    const navData = window.languageData?.[lang]?.nav;

    if (title && navData?.reviews) {
        title.textContent = navData.reviews;
    }

    const overlay = document.getElementById('reviews-overlay');
    if (overlay && overlay.classList.contains('active')) {
        currentReviewsPage = 0;
        loadReviewsPage(lang);
        resetAutoSlideTimer();
    }
}

window.showReviewsOverlay = showReviewsOverlay;
window.hideReviewsOverlay = hideReviewsOverlay;
window.updateReviewsLanguage = updateReviewsLanguage;
window.nextReviewsPage = nextReviewsPage;
window.prevReviewsPage = prevReviewsPage;
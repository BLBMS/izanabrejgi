/* 045c */
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
    },
    {
        id: 4,
        platform: 'Airbnb',
        rating: 5,
        ratingMax: 5,
        reviewer: 'Jiří (CZ)',
        review: {
            sl: 'Neverjetno bivališče, res nam je bilo všeč. Bilo je tako tiho, uživali smo v zajtrkih na terasi. Bivališče je blizu termalnih kopališč, 5 minut vožnje z avtomobilom. Hiša je zelo čista, elegantna in lepa. Tanja je odlična gostiteljica. Po dolgi vožnji smo prejeli osvežitev v obliki lokalne hrane. Najlepša hvala. Zagotovo se bomo vrnili.',
            en: 'Amazing place, we just loved it. It was so quiet, we enjoyed breakfasts on the terrace. The place is close to the thermals, 5 minutes by car. The house is super clean, stylish  and beautiful. Tanja is a great host, after long drive we have received refreshment of local food. Thank you very much. We will come back for sure.',
            de: 'Ein traumhafter Ort, wir waren total begeistert. Es war so ruhig, wir haben das Frühstück auf der Terrasse sehr genossen. Die Thermalquellen sind nur 5 Autominuten entfernt. Das Haus ist blitzsauber, stilvoll und wunderschön. Tanja ist eine großartige Gastgeberin; nach der langen Fahrt wurden wir mit lokalen Spezialitäten verwöhnt. Vielen Dank! Wir kommen ganz bestimmt wieder.'
        }
    },
    {
        id: 5,
        platform: 'Google',
        rating: 5,
        ratingMax: 5,
        reviewer: 'Kelly (DE)',
        review: {
            sl: 'Imeli smo veliko srečo, da smo lahko teden dni preživeli v tej čudoviti hiši Tanje in Marka. Že ob prihodu sva se počutila dobrodošla in kot doma. Hiša čudovito združuje zgodovino in sodobno udobje, opremljena je z veliko okusa in v njej res ničesar ne manjka. Posebej naju je navdušila izjemna gostoljubnost gostiteljev in njuna prijazna dobrodošlica z domačimi dobrotami. Med vinogradi vladata popoln mir in čudovita narava - idealen kraj za sprostitev. Z veseljem se bova vrnila in to posebno hišo iskreno priporočava vsakomur, ki išče mir, naravo in pristno gostoljubje. <a href="https://www.google.com/maps/place/I%C5%BEa+na+brejgi/@46.7074027,16.249707,3747m/data=!3m1!1e3!4m6!3m5!1s0x476f3bd077e6c3c9:0x932f3225fd54c1c7!8m2!3d46.7091187!4d16.2464831!16s%2Fg%2F11yv74df35?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="review-link">(celotno mnenje)</a>',
            en: 'We were lucky to spend a wonderful week in Tanja and Marko\'s beautiful house. From the moment we arrived, we felt warmly welcomed and immediately at home. The lovingly restored house combines history with modern comfort in a truly special way. It is tastefully furnished and equipped with everything you could possibly need for a relaxing stay. One of the highlights was Tanja and Marko\'s warm hospitality and the thoughtful welcome with delicious local specialties. Surrounded by vineyards, it is the perfect place to unwind, enjoy nature, and leave everyday life behind. We would gladly return and wholeheartedly recommend this unique house to anyone looking for peace, nature, and genuine hospitality. <a href="https://www.google.com/maps/place/I%C5%BEa+na+brejgi/@46.7074027,16.249707,3747m/data=!3m1!1e3!4m6!3m5!1s0x476f3bd077e6c3c9:0x932f3225fd54c1c7!8m2!3d46.7091187!4d16.2464831!16s%2Fg%2F11yv74df35?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="review-link">(Full review)</a>',
            de: 'Wir hatten das große Glück, eine Woche in diesem wunderschönen Haus von Tanja und Marko verbringen zu dürfen. Schon bei unserer Ankunft haben wir uns sofort willkommen und wie zu Hause gefühlt. Das liebevoll restaurierte Haus verbindet Geschichte und modernen Komfort auf eine ganz besondere Weise. Es ist mit viel Geschmack eingerichtet und bietet wirklich alles, was man für einen entspannten Aufenthalt braucht. Ein Highlight war die herzliche Gastfreundschaft von Tanja und Marko und die liebevolle Begrüßung mit regionalen Spezialitäten. Mitten in den Weinbergen kann man wunderbar abschalten, die Natur genießen und einfach den Alltag hinter sich lassen. Wir kommen sehr gerne wieder und können dieses besondere Haus von Herzen weiterempfehlen. <a href="https://www.google.com/maps/place/I%C5%BEa+na+brejgi/@46.7074027,16.249707,3747m/data=!3m1!1e3!4m6!3m5!1s0x476f3bd077e6c3c9:0x932f3225fd54c1c7!8m2!3d46.7091187!4d16.2464831!16s%2Fg%2F11yv74df35?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="review-link">(Vollständige Bewertung)</a>'
        }
    },
    {
        id: 6,
        platform: 'Airbnb',
        rating: 5,
        ratingMax: 5,
        reviewer: 'Matthias (DE)',
        review: {
            sl: 'Preprosto popolno! Hiša je čudovita. Mirna, z velikim vrtom in čudovitim razgledom na vinograde. Opremljena je z odličnim okusom in veliko pozornosti do detajlov. Postelja je izjemno udobna, tuš pa pravi užitek! Tanja in Marko sta najboljša gostitelja, kar si jih lahko predstavljate. Ustrežljiva, prijazna in vedno dosegljiva.',
            en: 'Simply perfect! The house is beautiful. Peaceful, with a large garden and a fantastic view of the vineyards. The furnishings are beautifully tasteful, with great attention to detail. The bed is incredibly comfortable and the shower is a dream! Tanja and Marko are the best hosts you could imagine. Attentive, friendly and always available.',
            de: 'Einfach perfekt! Das Haus ist wunderschön. Ruhig mit einem großen Garten und einem fantastischen Blick in die Weinreben. Die Ausstattung ist super geschmackvoll und mit Liebe zum Detail. Das Bett ist super bequem und die Dusche ein Traum! Tanja und Marko sind die besten Gastgeber, die man sich vorstellen kann. Zuvorkommend und freundlich und immer erreichbar.'
        }
    },
    {
        id: 7,
        platform: 'Booking',
        rating: 10,
        ratingMax: 10,
        reviewer: 'Marcell (HU)',
        review: {
            sl: 'Izjemno dobro opremljena, udobna in prostorna hiška. Komunikacija je potekala tekoče in pisno v angleškem jeziku. Ob prihodu smo ključ vzeli iz škatlice. Zelo prijetna in mirna okolica. V hiši je bilo na voljo vse, kar smo potrebovali. Obe sobi sta klimatizirani. Pričakale so nas lokalne dobrote, ki so jih pripravili gostitelji (pecivo, hladni narezek, sirup, pivo ...). Namestitev je popolnoma presegla naša pričakovanja, glede na razmerje med ceno in kakovostjo je odlična in jo lahko samo priporočam.',
            en: 'Extremely well equipped, comfortable, spacious cottage. Communication was smooth and in writing, in English. We took the key out of a box upon arrival. Very cozy, quiet neighborhood. The house had everything we needed. Both rooms are air-conditioned. Local delicacies prepared by the hosts awaited us (cakes, cold dishes, syrup, beer...). It absolutely exceeded our expectations, excellent value for money accommodation, I can only recommend it.',
            de: 'Äußerst gut ausgestattetes, komfortables und geräumiges Häuschen. Die Kommunikation verlief reibungslos und schriftlich auf Englisch. Bei unserer Ankunft haben wir den Schlüssel aus einer Schlüsselbox genommen. Eine sehr gemütliche und ruhige Umgebung. Im Haus war alles vorhanden, was wir benötigten. Beide Zimmer sind klimatisiert. Es erwarteten uns lokale Köstlichkeiten, die von den Gastgebern vorbereitet wurden (Gebäck, kalte Platte, Sirup, Bier ...). Die Unterkunft hat unsere Erwartungen absolut übertroffen. Ein hervorragendes Preis-Leistungs-Verhältnis – ich kann sie nur empfehlen.'
        }
    }
    /*,
{
    id: 99,
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

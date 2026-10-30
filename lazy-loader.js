/* lazy-loader.js
/* 049
 * Nalaga 4 skupine CSS/JS v ozadju (requestIdleCallback), šele po prvem prikazu.
 * Ob kliku na menu preveri, ali je skupina že naložena; če ni, jo naloži sinhrono in počaka.
 */

(function () {
    'use strict';

    // ============================================
    // KONFIGURACIJA SKUPIN
    // ============================================
    const GROUPS = {
        hostex: {
            css: ['hostex.css'],
            js: ['hostex.js']
        },
        links: {
            css: ['links-overlay.css'],
            js: ['links-overlay.js?v=2']
        },
        map: {
            css: ['map-overlay.css'],
            js: ['map-overlay.js']
        },
        reviews: {
            css: ['reviews-overlay.css'],
            js: ['reviews-overlay.js']
        }
    };

    // Stanje nalaganja: 'idle' | 'loading' | 'loaded' | 'error'
    const state = {};
    const pending = {}; // Promise za vsako skupino

    Object.keys(GROUPS).forEach(name => { state[name] = 'idle'; });

    // ============================================
    // POMOŽNE FUNKCIJE
    // ============================================
    function loadCSS(href) {
        return new Promise((resolve, reject) => {
            const existing = document.querySelector(`link[rel="stylesheet"][href="${href}"]`);
            if (existing) { resolve(); return; }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = () => resolve();
            link.onerror = () => reject(new Error('CSS ni naložen: ' + href));
            document.head.appendChild(link);
        });
    }

    function loadJS(src) {
        return new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src="${src}"]`);
            if (existing) { resolve(); return; }

            const script = document.createElement('script');
            script.src = src;
            script.async = false; // ohrani vrstni red znotraj skupine
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('JS ni naložen: ' + src));
            document.head.appendChild(script);
        });
    }

    // ============================================
    // JAVNO API
    // ============================================
    function isLoaded(name) {
        return state[name] === 'loaded';
    }

    /**
     * Naloži skupino (CSS + JS). Vrne Promise, ki se reši, ko je vse pripravljeno.
     * Če je skupina že naložena, takoj reši. Če se nalaga, vrne obstoječi Promise.
     */
    function loadGroup(name) {
        if (!GROUPS[name]) {
            return Promise.reject(new Error('Neznana skupina: ' + name));
        }
        if (state[name] === 'loaded') {
            return Promise.resolve();
        }
        if (pending[name]) {
            return pending[name];
        }

        state[name] = 'loading';
        const g = GROUPS[name];

        // Najprej CSS, nato JS (JS potrebuje CSS za inicializacijo)
        pending[name] = Promise.all(g.css.map(loadCSS))
            .then(() => Promise.all(g.js.map(loadJS)))
            .then(() => {
                state[name] = 'loaded';
                console.log('[lazy-loader] Skupina naložena:', name);
            })
            .catch(err => {
                state[name] = 'error';
                pending[name] = null;
                console.error('[lazy-loader] Napaka pri skupini', name, err);
                throw err;
            });

        return pending[name];
    }

    /**
     * Prefetch – samo sproži nalaganje v ozadju, ne čaka.
     */
    function prefetchGroup(name) {
        if (state[name] === 'loaded' || state[name] === 'loading') return;
        // Uporabi requestIdleCallback, da ne tekmuje z animacijami
        scheduleIdle(() => loadGroup(name).catch(() => {}));
    }

    // ============================================
    // IDLE PREFETCH
    // ============================================
    function scheduleIdle(fn) {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(fn, { timeout: 3000 });
        } else {
            setTimeout(fn, 1500);
        }
    }

    function startIdlePrefetch() {
        // Spoštuj saveData (varčevanje s podatki)
        if (navigator.connection && navigator.connection.saveData) {
            console.log('[lazy-loader] saveData aktiven – preskočim prefetch');
            return;
        }

        // Zaporedoma, z idle callback med skupinami, da ne blokira
        const queue = Object.keys(GROUPS);
        let i = 0;

        function next() {
            if (i >= queue.length) return;
            const name = queue[i++];
            if (state[name] === 'loaded' || state[name] === 'loading') {
                scheduleIdle(next);
                return;
            }
            loadGroup(name)
                .catch(() => {})
                .finally(() => scheduleIdle(next));
        }

        scheduleIdle(next);
    }

    // ============================================
    // INIT – zaženi po prvem prikazu strani
    // ============================================
    function init() {
        // window.load se sproži, ko so slike in fonti naloženi (slideshow že teče)
        if (document.readyState === 'complete') {
            startIdlePrefetch();
        } else {
            window.addEventListener('load', () => {
                // Rahlo zakasnimo, da slideshow dobi prvi frame
                setTimeout(startIdlePrefetch, 500);
            });
        }
    }

    // ============================================
    // EKSPORT
    // ============================================
    window.LazyLoader = {
        loadGroup,
        prefetchGroup,
        isLoaded,
        getState: () => ({ ...state })
    };

    init();
})();
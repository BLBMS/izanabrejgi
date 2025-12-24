// Upravljanje cenika

// Naloži podatke cenika
async function loadPricingData() {
    try {
        const response = await fetch('./pricing.json');
        const data = await response.json();
        window.pricingData = data;
        renderPricingTable(data, currentLanguage);
    } catch (error) {
        console.error('Napaka pri nalaganju cenika:', error);
        const tableContainer = document.getElementById('pricing-table');
        if (tableContainer) {
            const loadingTexts = {
                'sl': 'Cenik trenutno ni na voljo. Prosimo, poskusite kasneje.',
                'en': 'Price list is currently unavailable. Please try again later.',
                'de': 'Preisliste ist derzeit nicht verfügbar. Bitte versuchen Sie es später noch einmal.'
            };
            tableContainer.innerHTML = `<tr><td colspan="4" style="color: var(--font-color); text-align: center; padding: 40px;">${loadingTexts[currentLanguage] || loadingTexts.sl}</td></tr>`;
        }
    }
}

// Render cenik tabele
function renderPricingTable(data, lang = 'sl') {
    const tableElement = document.getElementById('pricing-table');
    const notesContainer = document.getElementById('pricing-notes-content');

    if (!tableElement) return;

    // Posodobi naslov cenika
    const pricingTitle = document.getElementById('pricing-title');
    if (pricingTitle && data.translations) {
        pricingTitle.textContent = data.translations.price_table_title[lang] || 'Cenik';
    }

    let tableHTML = `
        <thead>
            <tr>
                <th>${data.translations.period[lang] || 'obdobje'}</th>
                <th>${data.translations.min_nights[lang] || 'min. nočitev'}</th>
                <th>${data.translations.mon_fri[lang] || 'pon-pet'}</th>
                <th>${data.translations.sat_sun[lang] || 'sob-ned'}</th>
            </tr>
        </thead>
        <tbody>
    `;

    data.pricing.forEach(item => {
        tableHTML += `
            <tr>
                <td>${item[`period-${lang}`] || item.period}</td>
                <td>${item[`min_nights-${lang}`] || item.min_nights}</td>
                <td>${item.price_mon_fri}</td>
                <td>${item.price_sat_sun}</td>
            </tr>
        `;
    });

    tableHTML += '</tbody>';
    tableElement.innerHTML = tableHTML;

    // Ustvari HTML za opombe
    if (notesContainer) {
        const notesTitle = document.getElementById('pricing-notes-title');
        if (notesTitle && data.translations) {
            notesTitle.textContent = data.translations.additional_info_title[lang] || 'Dodatne informacije';
        }

        const notes = data.notes[lang] || data.notes['sl'] || [];
        if (notes.length > 0) {
            let notesHTML = `<ul>`;
            notes.forEach(note => {
                notesHTML += `<li>${note}</li>`;
            });
            notesHTML += '</ul>';
            notesContainer.innerHTML = notesHTML;
        } else {
            notesContainer.innerHTML = '';
        }
    }
}

// Eksport funkcij
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadPricingData,
        renderPricingTable
    };
}

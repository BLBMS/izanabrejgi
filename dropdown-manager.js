// Upravljanje spustnih menijev

// Inicializacija spustnih menijev
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!toggle || !menu) return;
        
        // Zapri vse ostale dropdown menije
        function closeOtherDropdowns() {
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                    otherDropdown.classList.remove('active');
                }
            });
        }
        
        // Event listener za desktop (hover) in mobile (click)
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                e.stopPropagation();
                
                // Zapri ostale dropdown menije
                closeOtherDropdowns();
                
                // Preklapi trenutni dropdown
                dropdown.classList.toggle('active');
            }
        });
        
        // Prepreči zaprtje dropdowna ob kliku znotraj menija
        menu.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                e.stopPropagation();
            }
        });
    });
    
    // Zapri dropdown menije ob kliku kjerkoli drugje
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
            const isDropdown = e.target.closest('.dropdown');
            if (!isDropdown) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
    
    // Zapri dropdown menije ob tapu kjerkoli drugje (za touch devices)
    document.addEventListener('touchstart', function(e) {
        if (window.innerWidth <= 900) {
            const isDropdown = e.target.closest('.dropdown');
            if (!isDropdown) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
}

// Eksport funkcij
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initDropdowns
    };
}
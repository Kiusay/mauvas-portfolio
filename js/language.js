/**
 * Language Toggle - Internationalization
 * Switches between Spanish (ES) and English (EN)
 */

class LanguageToggle {
    constructor() {
        this.currentLang = 'es';
        this.toggle = document.getElementById('lang-toggle');
        this.init();
    }

    init() {
        if (!this.toggle) return;

        // Load saved language preference
        const savedLang = localStorage.getItem('mauvas-lang');
        if (savedLang) {
            this.currentLang = savedLang;
            this.updateUI();
        }

        // Add click handler
        this.toggle.addEventListener('click', () => this.switchLanguage());
    }

    switchLanguage() {
        this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('mauvas-lang', this.currentLang);
        this.updateUI();
    }

    updateUI() {
        // Update toggle button appearance
        const options = this.toggle.querySelectorAll('.lang-option');
        options.forEach(option => {
            if (option.dataset.lang === this.currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });

        // Update all translatable elements
        const translatables = document.querySelectorAll('[data-es][data-en]');
        translatables.forEach(el => {
            const text = el.dataset[this.currentLang];
            if (text) {
                el.textContent = text;
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;

        // Dispatch custom event for other components (like keyboard)
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { lang: this.currentLang }
        }));

        console.log(`Language switched to: ${this.currentLang.toUpperCase()}`);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LanguageToggle();
});

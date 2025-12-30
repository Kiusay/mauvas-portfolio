/**
 * Interactive Keyboard - Skills Section
 * Mechanical keyboard-style UI for showcasing skills
 */

class InteractiveKeyboard {
    constructor() {
        this.container = null;
        this.screen = null;
        this.selectedKey = null;
        this.currentFilter = 'all';
        this.currentLang = 'es';
        this.isInitialized = false;
    }

    init() {
        // Wait for DOM and data
        if (typeof KEYBOARD_DATA === 'undefined') {
            console.error('KEYBOARD_DATA not loaded');
            return;
        }

        this.container = document.querySelector('.keyboard');
        this.screen = document.querySelector('.keyboard-screen');

        if (!this.container || !this.screen) {
            console.error('Keyboard container or screen not found');
            return;
        }

        // Get current language
        this.currentLang = localStorage.getItem('mauvas-lang') || 'es';

        this.renderKeyboard();
        this.renderFilters();
        this.bindEvents();
        this.showDefaultScreen();
        this.isInitialized = true;

        console.log('InteractiveKeyboard initialized');
    }

    renderKeyboard() {
        this.container.innerHTML = '';

        KEYBOARD_DATA.rows.forEach((row, rowIndex) => {
            const rowEl = document.createElement('div');
            rowEl.className = `keyboard-row keyboard-row-${rowIndex}`;
            rowEl.dataset.rowId = row.id;

            row.keys.forEach(keyId => {
                const keyData = KEYBOARD_DATA.keys[keyId];
                if (!keyData) {
                    console.warn(`Key data not found for: ${keyId}`);
                    return;
                }

                const keyEl = this.createKeyElement(keyId, keyData);
                rowEl.appendChild(keyEl);
            });

            this.container.appendChild(rowEl);
        });
    }

    createKeyElement(keyId, keyData) {
        const key = document.createElement('button');
        key.className = 'keyboard-key';
        key.dataset.keyId = keyId;
        key.dataset.category = keyData.category;

        // Add size class for special keys
        if (keyData.size) {
            key.classList.add(`key-${keyData.size}`);
        }

        // Add special key class
        if (keyData.isSpecial) {
            key.classList.add('key-special');
        }

        // Add category-specific styling
        key.classList.add(`key-cat-${keyData.category}`);

        // Key content - use icon if available, otherwise text
        if (keyData.icon && !keyData.isSpecial) {
            const iconImg = document.createElement('img');
            iconImg.className = 'key-icon';
            iconImg.src = keyData.icon;
            iconImg.alt = keyData.label;
            iconImg.loading = 'lazy';
            key.appendChild(iconImg);
        } else {
            const labelSpan = document.createElement('span');
            labelSpan.className = 'key-label';
            labelSpan.textContent = keyData.label;
            key.appendChild(labelSpan);
        }

        // Add level indicator for skill keys (only if no icon to save space)
        if (keyData.level && !keyData.isSpecial && !keyData.icon) {
            const levelIndicator = document.createElement('div');
            levelIndicator.className = 'key-level';
            levelIndicator.innerHTML = this.getLevelDots(keyData.level);
            key.appendChild(levelIndicator);
        }

        // Accessibility
        key.setAttribute('aria-label', keyData.fullName[this.currentLang]);
        key.setAttribute('role', 'button');
        key.setAttribute('tabindex', '0');

        return key;
    }

    getLevelDots(level) {
        let dots = '';
        for (let i = 0; i < 5; i++) {
            dots += `<span class="level-dot ${i < level ? 'active' : ''}"></span>`;
        }
        return dots;
    }

    renderFilters() {
        const filtersContainer = document.querySelector('.keyboard-filters');
        if (!filtersContainer) return;

        filtersContainer.innerHTML = '';

        KEYBOARD_DATA.categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.filter = cat.id;
            btn.textContent = cat.label[this.currentLang];

            if (cat.id === this.currentFilter) {
                btn.classList.add('active');
            }

            // Add category color indicator
            if (cat.color) {
                btn.style.setProperty('--filter-color', cat.color);
            }

            filtersContainer.appendChild(btn);
        });
    }

    bindEvents() {
        // Key interactions
        this.container.addEventListener('mouseenter', (e) => {
            const key = e.target.closest('.keyboard-key');
            if (key && !this.selectedKey) {
                this.highlightKey(key);
                this.updateScreen(key.dataset.keyId);
            }
        }, true);

        this.container.addEventListener('mouseleave', (e) => {
            const key = e.target.closest('.keyboard-key');
            if (key && !this.selectedKey) {
                this.unhighlightKey(key);
                this.showDefaultScreen();
            }
        }, true);

        this.container.addEventListener('click', (e) => {
            const key = e.target.closest('.keyboard-key');
            if (key) {
                this.selectKey(key);
            }
        });

        // Touch support for mobile
        this.container.addEventListener('touchstart', (e) => {
            const key = e.target.closest('.keyboard-key');
            if (key) {
                e.preventDefault();
                this.selectKey(key);
            }
        }, { passive: false });

        // Filter buttons
        const filtersContainer = document.querySelector('.keyboard-filters');
        if (filtersContainer) {
            filtersContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.filter-btn');
                if (btn) {
                    this.filterByCategory(btn.dataset.filter);
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isKeyboardSectionVisible()) return;

            switch (e.key) {
                case 'Escape':
                    this.resetSelection();
                    break;
                case 'Tab':
                    if (e.target.closest('.keyboard')) {
                        // Let natural tab navigation work
                    }
                    break;
            }
        });

        // Listen for language changes
        document.addEventListener('languageChanged', (e) => {
            this.currentLang = e.detail.lang;
            this.renderFilters();
            if (this.selectedKey) {
                this.updateScreen(this.selectedKey.dataset.keyId);
            } else {
                this.showDefaultScreen();
            }
        });
    }

    isKeyboardSectionVisible() {
        const section = document.querySelector('.skills-section');
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    highlightKey(keyEl) {
        keyEl.classList.add('key-hover');
    }

    unhighlightKey(keyEl) {
        keyEl.classList.remove('key-hover');
    }

    selectKey(keyEl) {
        const keyId = keyEl.dataset.keyId;
        const keyData = KEYBOARD_DATA.keys[keyId];

        // Handle special key actions
        if (keyData.isSpecial && keyData.action) {
            this.handleSpecialAction(keyData.action, keyId);
            return;
        }

        // Deselect previous key
        if (this.selectedKey) {
            this.selectedKey.classList.remove('key-selected');
        }

        // Select new key
        if (this.selectedKey === keyEl) {
            // Toggle off if same key clicked
            this.selectedKey = null;
            this.showDefaultScreen();
        } else {
            this.selectedKey = keyEl;
            keyEl.classList.add('key-selected');
            this.updateScreen(keyId);
        }
    }

    handleSpecialAction(action, keyId) {
        switch (action) {
            case 'reset':
            case 'resetAll':
                this.resetSelection();
                this.filterByCategory('all');
                break;
            case 'toggleLang':
                // Trigger language toggle
                const langToggle = document.getElementById('lang-toggle');
                if (langToggle) langToggle.click();
                break;
            case 'cycleFilter':
                this.cycleFilter();
                break;
            case 'openCV':
                // TODO: Add CV link
                window.open('#cv', '_blank');
                break;
            case 'goProjects':
                window.location.href = '#proyectos';
                break;
            case 'goContact':
                window.location.href = '#contacto';
                break;
            case 'showAbout':
                this.updateScreen(keyId);
                break;
            case 'toggleTheme':
                // TODO: Implement theme toggle
                console.log('Theme toggle - coming soon');
                break;
        }
    }

    cycleFilter() {
        const categories = KEYBOARD_DATA.categories.map(c => c.id);
        const currentIndex = categories.indexOf(this.currentFilter);
        const nextIndex = (currentIndex + 1) % categories.length;
        this.filterByCategory(categories[nextIndex]);
    }

    filterByCategory(category) {
        this.currentFilter = category;

        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === category);
        });

        // Filter keys
        document.querySelectorAll('.keyboard-key').forEach(key => {
            const keyCategory = key.dataset.category;
            const isSpecial = key.classList.contains('key-special');

            if (category === 'all' || keyCategory === category || isSpecial) {
                key.classList.remove('key-filtered');
                key.removeAttribute('disabled');
            } else {
                key.classList.add('key-filtered');
                key.setAttribute('disabled', 'true');
            }
        });
    }

    updateScreen(keyId) {
        const keyData = KEYBOARD_DATA.keys[keyId];
        if (!keyData) return;

        const lang = this.currentLang;

        // Animate screen update
        this.screen.classList.add('screen-updating');

        setTimeout(() => {
            // Update screen content
            const titleEl = this.screen.querySelector('.screen-title');
            const categoryEl = this.screen.querySelector('.screen-category');
            const descriptionEl = this.screen.querySelector('.screen-description');
            const levelEl = this.screen.querySelector('.screen-level');
            const projectsEl = this.screen.querySelector('.screen-projects');

            if (titleEl) {
                titleEl.textContent = keyData.fullName[lang];
            }

            if (categoryEl) {
                const catData = KEYBOARD_DATA.categories.find(c => c.id === keyData.category);
                if (catData && !keyData.isSpecial) {
                    categoryEl.textContent = catData.label[lang];
                    categoryEl.className = 'screen-category';
                    categoryEl.classList.add(`cat-${keyData.category}`);
                    categoryEl.style.display = 'block';
                } else {
                    categoryEl.style.display = 'none';
                }
            }

            if (descriptionEl) {
                descriptionEl.textContent = keyData.description[lang];
            }

            if (levelEl) {
                if (keyData.level && !keyData.isSpecial) {
                    const levelText = lang === 'es' ? 'Nivel' : 'Level';
                    const yearsText = keyData.years
                        ? (lang === 'es' ? ` • ${keyData.years} años` : ` • ${keyData.years} years`)
                        : '';
                    levelEl.innerHTML = `
            <span class="level-label">${levelText}: </span>
            <span class="level-bars">${this.getLevelBars(keyData.level)}</span>
            <span class="level-years">${yearsText}</span>
          `;
                    levelEl.style.display = 'flex';
                } else {
                    levelEl.style.display = 'none';
                }
            }

            if (projectsEl) {
                if (keyData.projects && keyData.projects.length > 0 && !keyData.isSpecial) {
                    const projectsLabel = lang === 'es' ? 'Proyectos: ' : 'Projects: ';
                    projectsEl.innerHTML = `<span class="projects-label">${projectsLabel}</span>${keyData.projects.join(', ')}`;
                    projectsEl.style.display = 'block';
                } else {
                    projectsEl.style.display = 'none';
                }
            }

            this.screen.classList.remove('screen-updating');
        }, 150);
    }

    getLevelBars(level) {
        let bars = '';
        for (let i = 0; i < 5; i++) {
            bars += `<span class="level-bar ${i < level ? 'active' : ''}"></span>`;
        }
        return bars;
    }

    showDefaultScreen() {
        const lang = this.currentLang;
        const defaultData = KEYBOARD_DATA.defaultScreen;

        const titleEl = this.screen.querySelector('.screen-title');
        const categoryEl = this.screen.querySelector('.screen-category');
        const descriptionEl = this.screen.querySelector('.screen-description');
        const levelEl = this.screen.querySelector('.screen-level');
        const projectsEl = this.screen.querySelector('.screen-projects');

        if (titleEl) titleEl.textContent = defaultData.title[lang];
        if (categoryEl) {
            categoryEl.style.display = 'none';
        }
        if (descriptionEl) descriptionEl.textContent = defaultData.description[lang];
        if (levelEl) levelEl.style.display = 'none';
        if (projectsEl) projectsEl.style.display = 'none';
    }

    resetSelection() {
        if (this.selectedKey) {
            this.selectedKey.classList.remove('key-selected');
            this.selectedKey = null;
        }
        this.showDefaultScreen();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure data is loaded
    setTimeout(() => {
        window.interactiveKeyboard = new InteractiveKeyboard();
        window.interactiveKeyboard.init();
    }, 100);
});

// Scroll Zoom Animation (Apple-style)
// Animates service cards with zoom effect when they enter viewport

class ScrollZoomAnimation {
    constructor() {
        this.cards = document.querySelectorAll('.service-card, .additional-tag');
        this.init();
    }

    init() {
        // Set initial state for all cards
        this.cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        // Create intersection observer
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay for sequential animation
                    const delay = entry.target.dataset.animationDelay || 0;

                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, delay);

                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all cards with staggered delays
        this.cards.forEach((card, index) => {
            card.dataset.animationDelay = index * 100; // 100ms delay between each
            observer.observe(card);
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ScrollZoomAnimation();
});

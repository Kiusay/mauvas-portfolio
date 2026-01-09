// Labs Manager - Controls all interactive lab animations
// Handles hover activation, canvas resizing, and performance optimization

class LabsManager {
    constructor() {
        this.labs = new Map();
        this.activelab = null;
        this.init();
    }

    init() {
        // Get all lab cards
        const labCards = document.querySelectorAll('.lab-card');

        // Get modal elements
        this.modal = document.getElementById('lab-modal');
        this.modalCanvas = document.getElementById('lab-modal-canvas');
        this.modalTitle = document.querySelector('.lab-modal-title');
        this.modalClose = document.querySelector('.lab-modal-close');
        this.modalBackdrop = document.querySelector('.lab-modal-backdrop');

        labCards.forEach(card => {
            const labType = card.dataset.lab;
            const canvas = card.querySelector('.lab-canvas');

            if (canvas) {
                // Set canvas size to match card
                this.resizeCanvas(canvas);

                // Store lab info
                this.labs.set(labType, {
                    card,
                    canvas,
                    ctx: canvas.getContext('2d'),
                    isActive: false,
                    instance: null
                });

                // Detect if device supports touch or is mobile width
                const isMobile = window.innerWidth <= 768;
                const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

                if (isMobile || isTouchDevice) {
                    // Mobile: open modal on click
                    card.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.openModal(labType);
                    });
                } else {
                    // Desktop: use hover events on card
                    card.addEventListener('mouseenter', () => this.activateLab(labType));
                    card.addEventListener('mouseleave', () => this.deactivateLab(labType));
                }
            }
        });

        // Modal close handlers
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }
        if (this.modalBackdrop) {
            this.modalBackdrop.addEventListener('click', () => this.closeModal());
        }

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    resizeCanvas(canvas) {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    handleResize() {
        this.labs.forEach((lab, type) => {
            this.resizeCanvas(lab.canvas);
            if (lab.isActive && lab.instance && lab.instance.resize) {
                lab.instance.resize();
            }
        });
    }

    activateLab(labType) {
        const lab = this.labs.get(labType);
        if (!lab) return;

        lab.isActive = true;
        lab.card.classList.add('active'); // Add active class for mobile CSS

        // Initialize lab if not already done
        if (!lab.instance) {
            try {
                lab.instance = this.createLabInstance(labType, lab.canvas, lab.ctx);
            } catch (error) {
                console.error(`Error creating lab ${labType}:`, error);
                return;
            }
        }

        // Start animation
        if (lab.instance && lab.instance.start) {
            lab.instance.start();
        }
    }

    deactivateLab(labType) {
        const lab = this.labs.get(labType);
        if (!lab) return;

        lab.isActive = false;
        lab.card.classList.remove('active'); // Remove active class

        // Stop animation
        if (lab.instance && lab.instance.stop) {
            lab.instance.stop();
        }

        // Clear canvas
        lab.ctx.clearRect(0, 0, lab.canvas.width, lab.canvas.height);
    }

    createLabInstance(labType, canvas, ctx) {
        // Create appropriate lab instance based on type
        switch (labType) {
            case 'react':
                return new ReactParticlesLab(canvas, ctx);
            case 'vue':
                return new VueMatrixLab(canvas, ctx);
            case 'svelte':
                return new SvelteWavesLab(canvas, ctx);
            case 'threejs':
                return new ThreeJSCubeLab(canvas, ctx);
            case 'webgl':
                return new WebGLShaderLab(canvas, ctx);
            case 'p5js':
                return new P5GenerativeLab(canvas, ctx);
            case 'gsap':
                return new GSAPTextLab(canvas, ctx);
            case 'animejs':
                return new AnimeGridLab(canvas, ctx);
            case 'framer':
                return new FramerMorphLab(canvas, ctx);
            case 'canvas':
                return new CanvasRippleLab(canvas, ctx);
            case 'particles':
                return new ParticlesNetworkLab(canvas, ctx);
            case 'd3js':
                return new D3ChartLab(canvas, ctx);
            default:
                console.warn(`Unknown lab type: ${labType}`);
                return null;
        }
    }

    openModal(labType) {
        if (!this.modal || !this.modalCanvas) return;

        // Get lab data
        const lab = this.labs.get(labType);
        if (!lab) return;

        // Set title
        const labTitles = {
            'react': 'React',
            'vue': 'Vue.js',
            'svelte': 'Svelte',
            'threejs': 'Three.js',
            'webgl': 'WebGL',
            'p5js': 'P5.js',
            'gsap': 'GSAP',
            'animejs': 'Anime.js',
            'framer': 'Framer Motion',
            'canvas': 'Canvas API',
            'particles': 'Particles.js',
            'd3js': 'D3.js'
        };

        if (this.modalTitle) {
            this.modalTitle.textContent = labTitles[labType] || labType;
        }

        // Resize modal canvas
        this.resizeCanvas(this.modalCanvas);

        // Create modal context
        const modalCtx = this.modalCanvas.getContext('2d');

        // Create lab instance for modal
        try {
            this.currentModalLab = {
                type: labType,
                instance: this.createLabInstance(labType, this.modalCanvas, modalCtx)
            };

            // Start animation in modal
            if (this.currentModalLab.instance && this.currentModalLab.instance.start) {
                this.currentModalLab.instance.start();
            }
        } catch (error) {
            console.error(`Error creating modal lab ${labType}:`, error);
            return;
        }

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    closeModal() {
        if (!this.modal) return;

        // Stop and cleanup current lab
        if (this.currentModalLab) {
            if (this.currentModalLab.instance && this.currentModalLab.instance.stop) {
                this.currentModalLab.instance.stop();
            }

            // Clear canvas
            const ctx = this.modalCanvas.getContext('2d');
            ctx.clearRect(0, 0, this.modalCanvas.width, this.modalCanvas.height);

            this.currentModalLab = null;
        }

        // Hide modal
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.labsManager = new LabsManager();
});

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

                // Detect if device supports touch
                const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

                if (isTouchDevice) {
                    // Mobile: toggle activation on click/touch
                    card.addEventListener('click', (e) => {
                        e.preventDefault();
                        const lab = this.labs.get(labType);
                        if (lab.isActive) {
                            this.deactivateLab(labType);
                        } else {
                            // Deactivate any other active lab first
                            this.labs.forEach((otherLab, otherType) => {
                                if (otherLab.isActive && otherType !== labType) {
                                    this.deactivateLab(otherType);
                                }
                            });
                            this.activateLab(labType);
                        }
                    });
                } else {
                    // Desktop: use hover events
                    card.addEventListener('mouseenter', () => this.activateLab(labType));
                    card.addEventListener('mouseleave', () => this.deactivateLab(labType));
                }
            }
        });

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
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.labsManager = new LabsManager();
});

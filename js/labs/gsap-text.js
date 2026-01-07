// GSAP Text Lab - Explosive text effect

class GSAPTextLab {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particles = [];
        this.text = 'GSAP';
        this.time = 0;
        this.animationId = null;
        this.animate = this.animate.bind(this);
        this.initParticles();
    }

    initParticles() {
        this.particles = [];
        this.ctx.font = 'bold 60px Arial';
        const textWidth = this.ctx.measureText(this.text).width;
        const startX = (this.canvas.width - textWidth) / 2;
        const startY = this.canvas.height / 2;

        // Sample pixels from text
        this.ctx.fillStyle = '#88CE02';
        this.ctx.fillText(this.text, startX, startY);
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < imageData.height; y += 3) {
            for (let x = 0; x < imageData.width; x += 3) {
                const i = (y * imageData.width + x) * 4;
                if (imageData.data[i + 3] > 128) {
                    this.particles.push({
                        homeX: x,
                        homeY: y,
                        x: x,
                        y: y,
                        vx: 0,
                        vy: 0
                    });
                }
            }
        }
    }

    start() {
        // Explode particles
        this.particles.forEach(p => {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            p.vx = Math.cos(angle) * speed;
            p.vy = Math.sin(angle) * speed;
        });
        this.animate();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            // Return to home position
            const dx = p.homeX - p.x;
            const dy = p.homeY - p.y;
            p.vx += dx * 0.01;
            p.vy += dy * 0.01;
            p.vx *= 0.95;
            p.vy *= 0.95;

            p.x += p.vx;
            p.y += p.vy;

            this.ctx.fillStyle = '#88CE02';
            this.ctx.fillRect(p.x, p.y, 2, 2);
        });

        this.animationId = requestAnimationFrame(this.animate);
    }

    resize() {
        this.initParticles();
    }
}

// React Particles Lab - Particles that avoid the mouse cursor

class ReactParticlesLab {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particles = [];
        this.particleCount = 30;
        this.mouseX = -1000;
        this.mouseY = -1000;
        this.animationId = null;

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.animate = this.animate.bind(this);

        this.initParticles();
    }

    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 12 + 12 // Tripled: 12-24px
            });
        }
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }

    start() {
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.animate();
    }

    stop() {
        this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            // Calculate distance from mouse
            const dx = p.x - this.mouseX;
            const dy = p.y - this.mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = 80;

            // Avoid mouse
            if (dist < minDist) {
                const angle = Math.atan2(dy, dx);
                const force = (minDist - dist) / minDist;
                p.vx += Math.cos(angle) * force * 0.5;
                p.vy += Math.sin(angle) * force * 0.5;
            }

            // Apply velocity
            p.x += p.vx;
            p.y += p.vy;

            // Damping
            p.vx *= 0.95;
            p.vy *= 0.95;

            // Bounce off walls
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Keep in bounds
            p.x = Math.max(0, Math.min(this.canvas.width, p.x));
            p.y = Math.max(0, Math.min(this.canvas.height, p.y));

            // Draw
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#61DAFB';
            this.ctx.fill();
        });

        this.animationId = requestAnimationFrame(this.animate);
    }

    resize() {
        this.initParticles();
    }
}

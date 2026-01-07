// Svelte Waves Lab - Sound wave visualization

class SvelteWavesLab {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.waves = [];
        this.time = 0;
        this.animationId = null;
        this.animate = this.animate.bind(this);

        // Create 3 waves
        for (let i = 0; i < 3; i++) {
            this.waves.push({
                amplitude: 20 + i * 10,
                frequency: 0.02 + i * 0.01,
                speed: 0.02 + i * 0.01,
                phase: i * Math.PI / 3
            });
        }
    }

    start() {
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

        const centerY = this.canvas.height / 2;

        this.waves.forEach((wave, index) => {
            this.ctx.beginPath();
            this.ctx.moveTo(0, centerY);

            for (let x = 0; x < this.canvas.width; x++) {
                const y = centerY + Math.sin(x * wave.frequency + this.time * wave.speed + wave.phase) * wave.amplitude;
                this.ctx.lineTo(x, y);
            }

            const opacity = 0.7 - index * 0.2;
            this.ctx.strokeStyle = `rgba(255, 62, 0, ${opacity})`;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });

        this.time++;
        this.animationId = requestAnimationFrame(this.animate);
    }

    resize() {
        // No special resize needed
    }
}

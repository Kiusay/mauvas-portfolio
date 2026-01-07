// D3.js-inspired Chart Lab - Animated bar chart

class D3ChartLab {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.bars = [];
        this.barCount = 8;
        this.time = 0;
        this.animationId = null;
        this.animate = this.animate.bind(this);
        this.initBars();
    }

    initBars() {
        this.bars = [];
        for (let i = 0; i < this.barCount; i++) {
            this.bars.push({
                value: Math.random() * 0.8 + 0.2,
                targetValue: Math.random() * 0.8 + 0.2,
                color: '#F9A03C'
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

        const barWidth = (this.canvas.width / this.barCount) * 0.8;
        const gap = (this.canvas.width / this.barCount) * 0.2;
        const maxHeight = this.canvas.height * 0.8;
        const baseY = this.canvas.height * 0.9;

        this.bars.forEach((bar, i) => {
            // Smooth transition to target
            bar.value += (bar.targetValue - bar.value) * 0.05;

            const x = i * (barWidth + gap) + gap;
            const height = bar.value * maxHeight;
            const y = baseY - height;

            // Draw bar
            this.ctx.fillStyle = bar.color;
            this.ctx.fillRect(x, y, barWidth, height);

            // Draw outline
            this.ctx.strokeStyle = '#F9A03C';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, y, barWidth, height);
        });

        // Change targets occasionally
        if (this.time % 90 === 0) {
            this.bars.forEach(bar => {
                bar.targetValue = Math.random() * 0.8 + 0.2;
            });
        }

        this.time++;
        this.animationId = requestAnimationFrame(this.animate);
    }

    resize() {
        // No special resize needed
    }
}

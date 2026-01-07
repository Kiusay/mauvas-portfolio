// Vue Matrix Lab - Matrix-style falling code rain

class VueMatrixLab {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.columns = [];
        this.fontSize = 14;
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.animationId = null;
        this.animate = this.animate.bind(this);
        this.initColumns();
    }

    initColumns() {
        const columnCount = Math.floor(this.canvas.width / this.fontSize);
        this.columns = Array(columnCount).fill(0).map(() => ({
            y: Math.random() * this.canvas.height,
            speed: Math.random() * 3 + 2
        }));
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
        // Fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#42B883';
        this.ctx.font = `${this.fontSize}px monospace`;

        this.columns.forEach((col, i) => {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;

            this.ctx.fillText(char, x, col.y);

            col.y += col.speed;
            if (col.y > this.canvas.height && Math.random() > 0.98) {
                col.y = 0;
            }
        });

        this.animationId = requestAnimationFrame(this.animate);
    }

    resize() {
        this.initColumns();
    }
}

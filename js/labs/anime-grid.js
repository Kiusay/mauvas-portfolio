// Anime.js Grid Lab - Dancing grid animation

class AnimeGridLab {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.grid = [];
        this.cols = 8;
        this.rows = 6;
        this.time = 0;
        this.animationId = null;
        this.animate = this.animate.bind(this);
        this.initGrid();
    }

    initGrid() {
        this.grid = [];
        const cellWidth = this.canvas.width / this.cols;
        const cellHeight = this.canvas.height / this.rows;

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.grid.push({
                    x: x * cellWidth + cellWidth / 2,
                    y: y * cellHeight + cellHeight / 2,
                    size: Math.min(cellWidth, cellHeight) * 0.4,
                    phase: (x + y) * 0.5
                });
            }
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

        this.grid.forEach(cell => {
            const scale = 0.5 + Math.sin(this.time * 0.05 + cell.phase) * 0.5;
            const rotation = this.time * 0.02 + cell.phase;

            this.ctx.save();
            this.ctx.translate(cell.x, cell.y);
            this.ctx.rotate(rotation);
            this.ctx.scale(scale, scale);

            this.ctx.fillStyle = '#FF4B4B';
            this.ctx.fillRect(-cell.size / 2, -cell.size / 2, cell.size, cell.size);

            this.ctx.restore();
        });

        this.time++;
        this.animationId = requestAnimationFrame(this.animate);
    }

    resize() {
        this.initGrid();
    }
}

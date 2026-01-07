// Framer Motion Lab - Morphing shapes

class FramerMorphLab {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.shapes = [];
        this.time = 0;
        this.animationId = null;
        this.animate = this.animate.bind(this);

        // Create morphing shapes
        this.shapes = [
            { x: this.canvas.width * 0.3, y: this.canvas.height * 0.5, vertices: 3, size: 40, speed: 0.02 },
            { x: this.canvas.width * 0.5, y: this.canvas.height * 0.5, vertices: 4, size: 45, speed: 0.015 },
            { x: this.canvas.width * 0.7, y: this.canvas.height * 0.5, vertices: 6, size: 35, speed: 0.025 }
        ];
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

    drawPolygon(x, y, vertices, size, rotation) {
        this.ctx.beginPath();
        for (let i = 0; i < vertices; i++) {
            const angle = (Math.PI * 2 / vertices) * i + rotation;
            const px = x + Math.cos(angle) * size;
            const py = y + Math.sin(angle) * size;
            if (i === 0) this.ctx.moveTo(px, py);
            else this.ctx.lineTo(px, py);
        }
        this.ctx.closePath();
        this.ctx.fillStyle = 'rgba(0, 85, 255, 0.7)';
        this.ctx.fill();
        this.ctx.strokeStyle = '#0055FF';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.shapes.forEach(shape => {
            const scale = 1 + Math.sin(this.time * shape.speed) * 0.3;
            this.drawPolygon(shape.x, shape.y, shape.vertices, shape.size * scale, this.time * shape.speed);
        });

        this.time++;
        this.animationId = requestAnimationFrame(this.animate);
    }

    resize() {
        this.shapes[0].x = this.canvas.width * 0.3;
        this.shapes[1].x = this.canvas.width * 0.5;
        this.shapes[2].x = this.canvas.width * 0.7;
        this.shapes.forEach(s => s.y = this.canvas.height * 0.5);
    }
}

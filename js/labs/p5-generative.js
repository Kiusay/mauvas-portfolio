// P5.js-inspired Generative Art Lab - Random geometric patterns

class P5GenerativeLab {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.shapes = [];
        this.time = 0;
        this.animationId = null;
        this.animate = this.animate.bind(this);
        this.generateShapes();
    }

    generateShapes() {
        this.shapes = [];
        for (let i = 0; i < 20; i++) {
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 40 + 10,
                type: Math.floor(Math.random() * 3), // 0: circle, 1: square, 2: triangle
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                color: `rgba(237, 34, 93, ${Math.random() * 0.5 + 0.3})`
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

    drawShape(shape) {
        this.ctx.save();
        this.ctx.translate(shape.x, shape.y);
        this.ctx.rotate(shape.rotation);
        this.ctx.fillStyle = shape.color;
        this.ctx.strokeStyle = '#ED225D';
        this.ctx.lineWidth = 2;

        switch (shape.type) {
            case 0: // Circle
                this.ctx.beginPath();
                this.ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.stroke();
                break;
            case 1: // Square
                this.ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
                this.ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
                break;
            case 2: // Triangle
                this.ctx.beginPath();
                this.ctx.moveTo(0, -shape.size / 2);
                this.ctx.lineTo(shape.size / 2, shape.size / 2);
                this.ctx.lineTo(-shape.size / 2, shape.size / 2);
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.stroke();
                break;
        }

        this.ctx.restore();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.shapes.forEach(shape => {
            shape.rotation += shape.rotationSpeed;
            this.drawShape(shape);
        });

        // Regenerate occasionally
        if (this.time % 120 === 0) {
            this.generateShapes();
        }

        this.time++;
        this.animationId = requestAnimationFrame(this.animate);
    }

    resize() {
        this.generateShapes();
    }
}

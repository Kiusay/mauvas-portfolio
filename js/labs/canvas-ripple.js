// Canvas Ripple Lab - Water ripple effect on mouse movement

class CanvasRippleLab {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.ripples = [];
        this.animationId = null;
        this.mouseX = 0;
        this.mouseY = 0;

        // Bind methods
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.animate = this.animate.bind(this);
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;

        this.ripples.push({
            x: this.mouseX,
            y: this.mouseY,
            radius: 0,
            maxRadius: 100,
            speed: 2,
            opacity: 1
        });
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
        this.ripples = [];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw ripples
        this.ripples = this.ripples.filter(ripple => {
            ripple.radius += ripple.speed;
            ripple.opacity = 1 - (ripple.radius / ripple.maxRadius);

            if (ripple.radius < ripple.maxRadius) {
                this.ctx.beginPath();
                this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(228, 77, 38, ${ripple.opacity})`;
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                return true;
            }
            return false;
        });

        this.animationId = requestAnimationFrame(this.animate);
    }

    resize() {
        this.stop();
        this.start();
    }
}

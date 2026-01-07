// WebGL-inspired Shader Lab - Fluid gradient effect

class WebGLShaderLab {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.time = 0;
        this.animationId = null;
        this.animate = this.animate.bind(this);
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
        const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        const data = imageData.data;

        for (let y = 0; y < this.canvas.height; y++) {
            for (let x = 0; x < this.canvas.width; x++) {
                const i = (y * this.canvas.width + x) * 4;

                // Normalized coordinates
                const nx = x / this.canvas.width;
                const ny = y / this.canvas.height;

                // Fluid shader effect
                const r = Math.sin(nx * 5 + this.time * 0.02) * 127 + 128;
                const g = Math.sin(ny * 5 + this.time * 0.03) * 127 + 128;
                const b = Math.sin((nx + ny) * 5 + this.time * 0.01) * 127 + 128;

                // Dark red theme
                data[i] = Math.min(r * 0.6, 153);     // R
                data[i + 1] = 0;                       // G
                data[i + 2] = 0;                       // B
                data[i + 3] = 255;                     // A
            }
        }

        this.ctx.putImageData(imageData, 0, 0);

        this.time++;
        this.animationId = requestAnimationFrame(this.animate);
    }

    resize() {
        // Canvas will be resized by manager
    }
}

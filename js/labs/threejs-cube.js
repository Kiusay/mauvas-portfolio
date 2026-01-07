// Three.js inspired Cube Lab - Rotating 3D wireframe cube

class ThreeJSCubeLab {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        this.animationId = null;
        this.animate = this.animate.bind(this);

        // Cube vertices
        this.vertices = [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ];

        // Cube edges
        this.edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7]
        ];
    }

    project(vertex) {
        const scale = 80; // Increased from 50 to 80
        const distance = 4;
        const z = vertex[2] + distance;
        const factor = scale / z;
        return [
            vertex[0] * factor + this.canvas.width / 2,
            vertex[1] * factor + this.canvas.height / 2
        ];
    }

    rotateX(vertex, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return [
            vertex[0],
            vertex[1] * cos - vertex[2] * sin,
            vertex[1] * sin + vertex[2] * cos
        ];
    }

    rotateY(vertex, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return [
            vertex[0] * cos + vertex[2] * sin,
            vertex[1],
            -vertex[0] * sin + vertex[2] * cos
        ];
    }

    rotateZ(vertex, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return [
            vertex[0] * cos - vertex[1] * sin,
            vertex[0] * sin + vertex[1] * cos,
            vertex[2]
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

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Rotate cube
        const rotatedVertices = this.vertices.map(v => {
            let vertex = this.rotateX(v, this.rotationX);
            vertex = this.rotateY(vertex, this.rotationY);
            vertex = this.rotateZ(vertex, this.rotationZ);
            return vertex;
        });

        // Draw edges
        this.ctx.strokeStyle = '#049EF4';
        this.ctx.lineWidth = 2;

        this.edges.forEach(edge => {
            const v1 = this.project(rotatedVertices[edge[0]]);
            const v2 = this.project(rotatedVertices[edge[1]]);

            this.ctx.beginPath();
            this.ctx.moveTo(v1[0], v1[1]);
            this.ctx.lineTo(v2[0], v2[1]);
            this.ctx.stroke();
        });

        // Draw vertices
        rotatedVertices.forEach(v => {
            const projected = this.project(v);
            this.ctx.beginPath();
            this.ctx.arc(projected[0], projected[1], 3, 0, Math.PI * 2);
            this.ctx.fillStyle = '#049EF4';
            this.ctx.fill();
        });

        this.rotationX += 0.01;
        this.rotationY += 0.015;
        this.rotationZ += 0.005;

        this.animationId = requestAnimationFrame(this.animate);
    }

    resize() {
        // No special resize needed
    }
}

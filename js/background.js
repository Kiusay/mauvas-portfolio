/**
 * MAUVAS Portfolio - PCB Circuit Background
 * 
 * Futuristic digital circuit board background with:
 * - PCB-style traces and nodes
 * - Light pulses traveling along lines
 * - Subtle node sparkles
 * - Slow, elegant, non-distracting animation
 * - No mouse/scroll interaction
 * - High performance
 */

class CircuitBackground {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.time = 0;
        this.nodes = [];
        this.traces = [];
        this.pulses = [];

        this.colors = {
            background: '#050505',
            traceBase: 'rgba(0, 255, 100, 0.08)',
            traceHighlight: 'rgba(0, 255, 100, 0.25)',
            nodeBase: 'rgba(0, 255, 100, 0.15)',
            nodeGlow: 'rgba(0, 255, 100, 0.8)',
            pulse: 'rgba(0, 255, 150, 0.9)',
            pulseGlow: 'rgba(0, 255, 150, 0.4)'
        };

        this.init();
        this.generateCircuit();
        this.animate();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Regenerate circuit on resize
        this.generateCircuit();
    }

    generateCircuit() {
        this.nodes = [];
        this.traces = [];
        this.pulses = [];

        // Grid parameters
        const gridSize = Math.max(60, Math.min(this.width, this.height) / 15);
        const cols = Math.ceil(this.width / gridSize) + 2;
        const rows = Math.ceil(this.height / gridSize) + 2;
        const offsetX = -gridSize;
        const offsetY = -gridSize;

        // Create node grid with some randomness
        const nodeGrid = [];
        for (let row = 0; row < rows; row++) {
            nodeGrid[row] = [];
            for (let col = 0; col < cols; col++) {
                // Random chance to place a node (30%)
                if (Math.random() < 0.3) {
                    const node = {
                        x: offsetX + col * gridSize + (Math.random() - 0.5) * gridSize * 0.3,
                        y: offsetY + row * gridSize + (Math.random() - 0.5) * gridSize * 0.3,
                        size: 2 + Math.random() * 3,
                        type: Math.random() < 0.2 ? 'large' : 'small',
                        phase: Math.random() * Math.PI * 2,
                        pulseSpeed: 0.5 + Math.random() * 1.5,
                        baseOpacity: 0.3 + Math.random() * 0.4
                    };
                    nodeGrid[row][col] = node;
                    this.nodes.push(node);
                } else {
                    nodeGrid[row][col] = null;
                }
            }
        }

        // Create traces connecting nearby nodes
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const node = nodeGrid[row][col];
                if (!node) continue;

                // Connect to right neighbor
                if (col < cols - 1) {
                    for (let c = col + 1; c < Math.min(col + 4, cols); c++) {
                        if (nodeGrid[row][c] && Math.random() < 0.5) {
                            this.createTrace(node, nodeGrid[row][c]);
                            break;
                        }
                    }
                }

                // Connect to bottom neighbor
                if (row < rows - 1) {
                    for (let r = row + 1; r < Math.min(row + 4, rows); r++) {
                        if (nodeGrid[r][col] && Math.random() < 0.5) {
                            this.createTrace(node, nodeGrid[r][col]);
                            break;
                        }
                    }
                }

                // Occasional diagonal connection
                if (Math.random() < 0.15 && row < rows - 1 && col < cols - 1) {
                    if (nodeGrid[row + 1][col + 1]) {
                        this.createTrace(node, nodeGrid[row + 1][col + 1]);
                    }
                }
            }
        }

        // Create initial pulses
        this.createPulses();
    }

    createTrace(nodeA, nodeB) {
        // Create PCB-style trace (horizontal then vertical, or with corner)
        const trace = {
            start: nodeA,
            end: nodeB,
            points: [],
            opacity: 0.6 + Math.random() * 0.4
        };

        // Decide trace style
        const style = Math.random();

        if (style < 0.4) {
            // Direct line
            trace.points = [
                { x: nodeA.x, y: nodeA.y },
                { x: nodeB.x, y: nodeB.y }
            ];
        } else if (style < 0.7) {
            // Horizontal then vertical
            trace.points = [
                { x: nodeA.x, y: nodeA.y },
                { x: nodeB.x, y: nodeA.y },
                { x: nodeB.x, y: nodeB.y }
            ];
        } else {
            // Vertical then horizontal
            trace.points = [
                { x: nodeA.x, y: nodeA.y },
                { x: nodeA.x, y: nodeB.y },
                { x: nodeB.x, y: nodeB.y }
            ];
        }

        // Calculate total length for pulse animation
        trace.length = this.calculateTraceLength(trace.points);

        this.traces.push(trace);
    }

    calculateTraceLength(points) {
        let length = 0;
        for (let i = 1; i < points.length; i++) {
            const dx = points[i].x - points[i - 1].x;
            const dy = points[i].y - points[i - 1].y;
            length += Math.sqrt(dx * dx + dy * dy);
        }
        return length;
    }

    createPulses() {
        // Create pulses on random traces
        const pulseCount = Math.floor(this.traces.length * 0.15);

        for (let i = 0; i < pulseCount; i++) {
            this.addPulse();
        }
    }

    addPulse() {
        if (this.traces.length === 0) return;

        const trace = this.traces[Math.floor(Math.random() * this.traces.length)];
        const pulse = {
            trace,
            progress: 0,
            speed: 0.003 + Math.random() * 0.004,
            size: 3 + Math.random() * 2,
            intensity: 0.7 + Math.random() * 0.3
        };
        this.pulses.push(pulse);
    }

    getPointOnTrace(trace, progress) {
        const totalLength = trace.length;
        let targetDistance = progress * totalLength;

        for (let i = 1; i < trace.points.length; i++) {
            const p1 = trace.points[i - 1];
            const p2 = trace.points[i];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const segmentLength = Math.sqrt(dx * dx + dy * dy);

            if (targetDistance <= segmentLength) {
                const t = targetDistance / segmentLength;
                return {
                    x: p1.x + dx * t,
                    y: p1.y + dy * t
                };
            }
            targetDistance -= segmentLength;
        }

        return trace.points[trace.points.length - 1];
    }

    update() {
        this.time += 0.016;

        // Update pulses
        for (let i = this.pulses.length - 1; i >= 0; i--) {
            const pulse = this.pulses[i];
            pulse.progress += pulse.speed;

            if (pulse.progress >= 1) {
                this.pulses.splice(i, 1);
                // Add new pulse to maintain count
                if (Math.random() < 0.7) {
                    this.addPulse();
                }
            }
        }

        // Occasionally add new pulses
        if (Math.random() < 0.02 && this.pulses.length < this.traces.length * 0.2) {
            this.addPulse();
        }
    }

    draw() {
        const ctx = this.ctx;

        // Clear with background color
        ctx.fillStyle = this.colors.background;
        ctx.fillRect(0, 0, this.width, this.height);

        // Draw traces
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        this.traces.forEach(trace => {
            ctx.beginPath();
            ctx.moveTo(trace.points[0].x, trace.points[0].y);

            for (let i = 1; i < trace.points.length; i++) {
                ctx.lineTo(trace.points[i].x, trace.points[i].y);
            }

            ctx.strokeStyle = this.colors.traceBase;
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        // Draw nodes
        this.nodes.forEach(node => {
            const pulse = Math.sin(this.time * node.pulseSpeed + node.phase) * 0.5 + 0.5;
            const opacity = node.baseOpacity * (0.5 + pulse * 0.5);
            const glowSize = node.size * (1 + pulse * 0.3);

            // Outer glow
            const gradient = ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, glowSize * 3
            );
            gradient.addColorStop(0, `rgba(0, 255, 100, ${opacity * 0.5})`);
            gradient.addColorStop(1, 'rgba(0, 255, 100, 0)');

            ctx.beginPath();
            ctx.arc(node.x, node.y, glowSize * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Core
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 100, ${opacity})`;
            ctx.fill();

            // Bright center for large nodes
            if (node.type === 'large') {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 255, 200, ${opacity * 0.8})`;
                ctx.fill();
            }
        });

        // Draw pulses
        this.pulses.forEach(pulse => {
            const pos = this.getPointOnTrace(pulse.trace, pulse.progress);

            // Pulse glow
            const gradient = ctx.createRadialGradient(
                pos.x, pos.y, 0,
                pos.x, pos.y, pulse.size * 4
            );
            gradient.addColorStop(0, `rgba(0, 255, 150, ${pulse.intensity * 0.8})`);
            gradient.addColorStop(0.3, `rgba(0, 255, 150, ${pulse.intensity * 0.3})`);
            gradient.addColorStop(1, 'rgba(0, 255, 150, 0)');

            ctx.beginPath();
            ctx.arc(pos.x, pos.y, pulse.size * 4, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Pulse core
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, pulse.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 255, 220, ${pulse.intensity})`;
            ctx.fill();
        });

        // Draw subtle vignette
        const vignette = ctx.createRadialGradient(
            this.width / 2, this.height / 2, 0,
            this.width / 2, this.height / 2, Math.max(this.width, this.height) * 0.7
        );
        vignette.addColorStop(0, 'rgba(5, 5, 5, 0)');
        vignette.addColorStop(1, 'rgba(5, 5, 5, 0.4)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, this.width, this.height);
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CircuitBackground();
});

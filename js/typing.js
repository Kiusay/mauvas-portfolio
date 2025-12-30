/**
 * MAUVAS Portfolio - Parallel Typing Effect
 * 
 * Animated typing effect for multiple lines simultaneously with:
 * - All lines type at the same time
 * - Character by character reveal
 * - Natural typing speed with variation
 * - Subtle cursor indicator
 */

class ParallelTyping {
    constructor(container, options = {}) {
        this.container = container;
        this.speed = options.speed || 80;
        this.variation = options.variation || 30;
        this.startDelay = options.startDelay || 500;
        this.showCursor = options.showCursor !== false;

        this.lines = [];
        this.maxLength = 0;
        this.currentIndex = 0;
        this.isComplete = false;

        this.init();
    }

    init() {
        // Find all typing elements within container
        const elements = this.container.querySelectorAll('[data-typing-line]');

        elements.forEach(el => {
            const text = el.dataset.typingLine;
            const line = {
                element: el,
                text: text,
                currentIndex: 0
            };

            // Clear element and set up structure
            el.innerHTML = '';
            el.classList.add('typing-line');

            // Text container
            const textSpan = document.createElement('span');
            textSpan.className = 'typing-text';
            el.appendChild(textSpan);
            line.textSpan = textSpan;

            // Cursor (only on last line)
            if (this.showCursor) {
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                cursor.textContent = '|';
                el.appendChild(cursor);
                line.cursor = cursor;
            }

            this.lines.push(line);
            this.maxLength = Math.max(this.maxLength, text.length);
        });

        // Start typing after delay
        setTimeout(() => this.type(), this.startDelay);
    }

    type() {
        let allComplete = true;

        // Type one character on each line simultaneously
        this.lines.forEach(line => {
            if (line.currentIndex < line.text.length) {
                const char = line.text[line.currentIndex];
                line.textSpan.textContent += char;
                line.currentIndex++;

                if (line.currentIndex < line.text.length) {
                    allComplete = false;
                }
            }
        });

        if (!allComplete) {
            // Calculate next delay with natural variation
            const delay = this.speed + (Math.random() - 0.5) * this.variation * 2;
            setTimeout(() => this.type(), delay);
        } else {
            this.complete();
        }
    }

    complete() {
        this.isComplete = true;
        this.container.classList.add('typing-complete');

        // Fade out all cursors except keep the last one briefly
        this.lines.forEach((line, index) => {
            if (line.cursor) {
                if (index < this.lines.length - 1) {
                    // Hide cursors on non-last lines immediately
                    line.cursor.style.display = 'none';
                } else {
                    // Fade out last cursor after delay
                    setTimeout(() => {
                        line.cursor.classList.add('fade-out');
                    }, 1000);
                }
            }
        });
    }
}

// Auto-initialize on elements with data-parallel-typing attribute
document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('[data-parallel-typing]');

    containers.forEach(container => {
        new ParallelTyping(container, {
            speed: parseInt(container.dataset.speed) || 80,
            startDelay: parseInt(container.dataset.delay) || 500
        });
    });
});

window.ParallelTyping = ParallelTyping;

// Demos Modal System
// Controls opening/closing of fullscreen demo modals

let currentDemo = null;

// Open demo modal
function openDemo(demoName) {
    const modal = document.getElementById(`${demoName}-modal`);
    if (!modal) {
        console.error(`Modal ${demoName} not found`);
        return;
    }

    currentDemo = demoName;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Initialize demo-specific features
    if (demoName === 'nexus') {
        initNexusDemo();
    }
}

// Close demo modal
function closeDemo() {
    if (!currentDemo) return;

    const modal = document.getElementById(`${currentDemo}-modal`);
    if (modal) {
        modal.classList.remove('active');
    }

    document.body.style.overflow = '';
    currentDemo = null;
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentDemo) {
        closeDemo();
    }
});

// Close on backdrop click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('demo-modal')) {
        closeDemo();
    }
});

// NEXUS Demo Specific Functions
function initNexusDemo() {
    // Animate balance counter
    animateCounter('nexus-balance', 24567.89, 2000);

    // Start transaction animations
    animateTransactions();

    // Initialize tab switching
    setupNexusTabs();
}

function animateCounter(elementId, targetValue, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const start = 0;
    const startTime = Date.now();

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (targetValue - start) * eased;

        element.textContent = `$${current.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    update();
}

function animateTransactions() {
    const transactions = document.querySelectorAll('.nexus-transaction');
    transactions.forEach((transaction, index) => {
        transaction.style.opacity = '0';
        transaction.style.transform = 'translateY(20px)';

        setTimeout(() => {
            transaction.style.transition = 'all 0.4s ease';
            transaction.style.opacity = '1';
            transaction.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function setupNexusTabs() {
    const tabs = document.querySelectorAll('.nexus-tab');
    const screens = document.querySelectorAll('.nexus-screen');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetScreen = tab.dataset.screen;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active screen
            screens.forEach(screen => {
                if (screen.id === `nexus-${targetScreen}`) {
                    screen.classList.add('active');
                } else {
                    screen.classList.remove('active');
                }
            });
        });
    });
}

// Quick actions for NEXUS
function nexusSendMoney() {
    alert('Send Money feature - In production this would open a transfer modal');
}

function nexusRequestMoney() {
    alert('Request Money feature - In production this would open a request modal');
}

function nexusViewCards() {
    const cardsTab = document.querySelector('.nexus-tab[data-screen="cards"]');
    if (cardsTab) {
        cardsTab.click();
    }
}

function nexusMoreOptions() {
    alert('More Options - In production this would show additional features');
}

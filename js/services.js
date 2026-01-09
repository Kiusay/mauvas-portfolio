// Services Section Interactive Features

// Toggle service details (mobile only)
function toggleServiceDetails(button) {
    const card = button.closest('.service-card');
    const details = card.querySelector('.service-features');
    const arrow = button.querySelector('.toggle-arrow');

    card.classList.toggle('expanded');

    // Rotate arrow
    if (card.classList.contains('expanded')) {
        arrow.style.transform = 'rotate(180deg)';
    } else {
        arrow.style.transform = 'rotate(0deg)';
    }
}

// Toggle additional services visibility
function toggleAdditionalServices() {
    const wrapper = document.querySelector('.additional-services-wrapper');
    const toggleBtn = document.querySelector('.additional-services-toggle');

    wrapper.classList.toggle('visible');

    // Scroll to section when opening
    if (wrapper.classList.contains('visible')) {
        setTimeout(() => {
            wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// Close additional services (from sticky button)
function closeAdditionalServices() {
    const wrapper = document.querySelector('.additional-services-wrapper');
    const section = document.querySelector('.services-section');

    wrapper.classList.remove('visible');

    // Scroll back to main services
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

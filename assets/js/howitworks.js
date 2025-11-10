// howitworks.js - How It Works page interactions
document.addEventListener('DOMContentLoaded', function() {
    console.log('[HOW IT WORKS] Script loaded');

    /* ===== CHIPS GROUP (Ingredient & Diet Chips) ===== */
    const chips = document.querySelectorAll('.hiw-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            const isPressed = this.getAttribute('aria-pressed') === 'true';
            this.setAttribute('aria-pressed', !isPressed);
        });
    });
    /* ===== END CHIPS GROUP ===== */

    /* ===== FAQ ACCORDION ===== */
    const faqItems = document.querySelectorAll('.hiw-acc-item');
    
    faqItems.forEach((item, index) => {
        const questionButton = item.querySelector('.hiw-acc-btn');

        if (questionButton) {
            questionButton.addEventListener('click', () => {
                const isExpanded = item.getAttribute('aria-expanded') === 'true';
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current item
                item.setAttribute('aria-expanded', !isExpanded);
                
                // Track event
                trackEvent('howitworks_faq_toggle', { index: index });
            });
        }
    });
    /* ===== END FAQ ACCORDION ===== */

    /* ===== ANALYTICS EVENTS ===== */
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('[data-ev="howitworks_hero_cta_click"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ctaType = this.getAttribute('data-cta') || 'unknown';
            trackEvent('howitworks_hero_cta_click', { cta: ctaType });
        });
    });
    /* ===== END ANALYTICS EVENTS ===== */
});

/* ===== HELPER FUNCTION: Track Events ===== */
function trackEvent(eventName, data = {}) {
    // Basic event tracking - can be extended with actual analytics service
    console.log('[HOW IT WORKS EVENT]', eventName, data);
    
    // If you have an analytics service, integrate it here
    // Example: gtag('event', eventName, data);
    // Example: analytics.track(eventName, data);
}

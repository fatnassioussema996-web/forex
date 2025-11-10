document.addEventListener('DOMContentLoaded', () => {
    const track = (eventName, detail = {}) => {
        if (typeof window.console !== 'undefined') {
            console.log('[ABOUT EVENT]', eventName, detail);
        }
        // Hook for future analytics integration e.g., gtag/Segment/etc.
    };

    document.querySelectorAll('[data-ev="about_cta_click"]').forEach((btn) => {
        btn.addEventListener('click', () => {
            track('about_cta_click', { cta: btn.getAttribute('data-cta') });
        });
    });

    document.querySelectorAll('[data-ev="about_read_more_click"]').forEach((link) => {
        link.addEventListener('click', () => {
            track('about_read_more_click', { link: link.getAttribute('data-link') });
        });
    });
});


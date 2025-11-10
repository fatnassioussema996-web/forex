// ui-script.js - Main script for User Interface interactions
document.addEventListener('DOMContentLoaded', function() {
    console.log('[UI SCRIPT] DOM Loaded. Script starting.');
    /* ===== MOBILE MENU TOGGLE ===== */
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
  // Диагностика
    if (menuButton) {
        console.log('[UI SCRIPT] Menu button FOUND.');
    } else {
        console.error('[UI SCRIPT] ERROR: Menu button with id "mobile-menu-button" NOT FOUND.');
    }

    if (mobileMenu) {
        console.log('[UI SCRIPT] Mobile menu panel FOUND.');
    } else {
        console.error('[UI SCRIPT] ERROR: Mobile menu panel with id "mobile-menu" NOT FOUND.');
    }

    if (menuButton && mobileMenu) {
        const burgerIcon = document.getElementById('menu-icon-burger');
        const closeIcon = document.getElementById('menu-icon-close');
        if (!burgerIcon || !closeIcon) {
            console.error('[UI SCRIPT] ERROR: Burger or Close icon NOT FOUND inside the button.');
        }

        console.log('[UI SCRIPT] Attaching click listener to menu button.');
        menuButton.addEventListener('click', () => {
            console.log('[UI SCRIPT] Menu button CLICKED!'); // <-- Самый важный лог
            mobileMenu.classList.toggle('hidden');
            burgerIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }

     /* ===== PRICING CARD TOGGLE ===== */
    const customPricingCard = document.getElementById('custom-pricing-card');
    if (customPricingCard) {
        const selectButton = customPricingCard.querySelector('.select-custom-btn');
        const inputForm = customPricingCard.querySelector('.custom-amount-form');

        selectButton.addEventListener('click', () => {
            // Hide the button's parent div and show the form
            selectButton.parentElement.classList.add('hidden');
            inputForm.classList.remove('hidden');
        });
    }
    /* ===== END PRICING CARD TOGGLE ===== */

    /* ===== FAQ ACCORDION ===== */
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerContent = item.querySelector('.faq-answer-content');

        if (questionButton && answerContent) {
            questionButton.addEventListener('click', () => {
                // Toggle the 'active' class on the PARENT item
                const isActive = item.classList.contains('active');

                // Optional: Close all other items for a classic accordion feel
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer-content').style.maxHeight = null;
                });
                
                // If it wasn't active, open it now
                if (!isActive) {
                    item.classList.add('active');
                    answerContent.style.maxHeight = answerContent.scrollHeight + "px";
                }
            });
        }
    });
    /* ===== END FAQ ACCORDION ===== */

    // БЛОК ДЛЯ TOP-UP БЫЛ ЗДЕСЬ И ТЕПЕРЬ ОН УДАЛЕН

});
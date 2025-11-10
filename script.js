// This event listener waits for the entire HTML document to be loaded and ready.
// It is the single, main wrapper for ALL our JavaScript code.
document.addEventListener('DOMContentLoaded', function() {

    // ===== 1. AOS (Animate on Scroll) Initialization =====
    // We initialize the library only ONCE with all desired settings.
    AOS.init({
        duration: 800, // Animation duration in milliseconds
        once: true,    // Animation should happen only once - while scrolling down
        offset: 50     // Offset (in px) from the original trigger point
    });


    // ===== 2. Smooth scrolling for the MAIN navigation menu =====
    // This targets a specific class `.main-nav` which should only exist on the homepage header.
    const mainNavLinks = document.querySelectorAll('.main-nav a[href^="#"]');

    mainNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent the default instant jump
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // If the target section exists, scroll to it smoothly
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // ===== 3. Logic for "Order Now" buttons =====
    const orderButtons = document.querySelectorAll('.order-button');

    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Now, all "Order Now" buttons simply redirect to the top-up page.
            window.location.href = 'top-up.php';
        });
    });

    // ===== 4. Mobile Navigation Toggle Logic =====
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const header = document.querySelector('header'); // Find the header

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            // This line will add/remove a class 'mobile-nav-active' to the header
            // We will use this class in CSS to show the menu
            header.classList.toggle('mobile-nav-active'); 
        });
    }

    // ===== 5. Top-Up Page Logic (FINAL - SIMPLE TEXT INPUT) =====
    const topUpForm = document.getElementById('top-up-form');

    if (topUpForm) {
        const amountInput = document.getElementById('topup-amount');
        const inputWrapper = amountInput.parentElement;
        const presetButtons = topUpForm.querySelectorAll('.preset-amount-btn');
        const customButton = topUpForm.querySelector('.preset-amount-btn[data-amount="custom"]');
        const tokenEquivalentSpan = document.getElementById('token-equivalent');

        // --- Helper Functions ---
        const setActiveButton = (activeButton) => {
            presetButtons.forEach(btn => btn.classList.remove('active'));
            if (activeButton) activeButton.classList.add('active');
        };

        const checkInputValue = () => {
            if (amountInput.value.trim() !== '') {
                inputWrapper.classList.add('has-value');
            } else {
                inputWrapper.classList.remove('has-value');
            }
        };
        
        // Calculates and displays the number of tokens the user will receive, including bonuses.
        const updateTokenEquivalent = () => {
            if (!tokenEquivalentSpan) return; // Exit if the element doesn't exist
            
            const value = parseFloat(amountInput.value);
            if (!isNaN(value) && value > 0) {
                let tokens = value * 100;
                // Apply bonuses based on GBP amount
                if (value >= 50) {
                    tokens = tokens * 1.20; // +20%
                } else if (value >= 25) {
                    tokens = tokens * 1.10; // +10%
                }
                tokenEquivalentSpan.textContent = `You will receive ${Math.floor(tokens).toLocaleString()} Tokens.`;
            } else {
                tokenEquivalentSpan.textContent = 'You will be charged in GBP. This amount equals the number of Tokens.';
            }
        };

        // --- Event Listeners ---
        presetButtons.forEach(button => {
            button.addEventListener('click', function() {
                setActiveButton(this);
                const amountValue = this.dataset.amount;
                
                // THE FIX: Correctly update the input field's value.
                if (amountValue === 'custom') {
                    amountInput.value = '';
                } else {
                    amountInput.value = parseFloat(amountValue).toFixed(2);
                }
                
                checkInputValue();       // Update the currency symbol visibility
                updateTokenEquivalent(); // Update the "You will receive..." text
            });
        });

        amountInput.addEventListener('input', function() {
            // ... (код для валидации инпута остается тем же)
            checkInputValue();
            updateTokenEquivalent();
            setActiveButton(customButton);
        });

        topUpForm.addEventListener('submit', function(event) {
            // ... (код для проверки перед отправкой)
        });
        
        // Initial check when the page loads
        checkInputValue();
        updateTokenEquivalent();
    }
    // ===== END: Top-Up Logic =====

}); // This single closing bracket closes our one and only DOMContentLoaded listener.
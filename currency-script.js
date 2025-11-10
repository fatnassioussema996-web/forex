// currency-script.js - Handle currency switching on frontend

document.addEventListener('DOMContentLoaded', () => {
    const currencyButton = document.getElementById('currency-button');
    const currencyDropdown = document.getElementById('currency-dropdown');
    const currencyLinks = document.querySelectorAll('[data-currency]');
    
    // Toggle dropdown
    if (currencyButton && currencyDropdown) {
        currencyButton.addEventListener('click', (e) => {
            e.stopPropagation();
            currencyDropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            currencyDropdown.classList.add('hidden');
        });
        
        currencyDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Handle currency change
    currencyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const currency = link.dataset.currency;
            
            // Show loading state
            if (currencyButton) {
                currencyButton.disabled = true;
                currencyButton.style.opacity = '0.6';
            }
            
            // Send request to change currency
            fetch('set_currency.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `currency=${currency}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Reload page to update all prices
                    window.location.reload();
                } else {
                    console.error('Failed to change currency:', data.message);
                    if (currencyButton) {
                        currencyButton.disabled = false;
                        currencyButton.style.opacity = '1';
                    }
                }
            })
            .catch(error => {
                console.error('Error changing currency:', error);
                if (currencyButton) {
                    currencyButton.disabled = false;
                    currencyButton.style.opacity = '1';
                }
            });
        });
    });
});




// generation-script.js - v5 - Displays BOTH recipe text and the DALL-E image

document.addEventListener('DOMContentLoaded', () => {
    console.log('[DEBUG] DOM Content Loaded. Script starting.');
    
    const generationForm = document.getElementById('generation-form');
    if (!generationForm) {
        console.log('[DEBUG] Generation form NOT FOUND on this page. Script stopped.');
        return;
    }


    const formMode = generationForm.getAttribute('data-mode');
    console.log(`[DEBUG] Form found. Mode: ${formMode}`);

    if (formMode === 'demo') {
        console.log('[DEBUG] Demo mode detected. Attaching redirect listener.');
        const signUpLink = generationForm.querySelector('a');
        const redirectUrl = signUpLink ? signUpLink.href : 'register';
        generationForm.addEventListener('submit', (e) => { e.preventDefault(); 
        console.log('[DEBUG] Demo form submission intercepted. Redirecting...');
        window.location.href = redirectUrl; });
        
    } else if (formMode === 'real') {
        console.log('[DEBUG] Real mode detected. Setting up generation logic.');
        const generateButton = document.getElementById('generate-button');
        const resultArea = document.getElementById('generation-result-area');
        if (!generateButton || !resultArea) {
            console.error('[DEBUG] CRITICAL: Real mode detected, but generate-button or result-area NOT FOUND.');
            return;
        }
        console.log('[DEBUG] Button and result area found. Attaching submit listener.');

        const btnText = generateButton.querySelector('.btn-text');
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        generateButton.appendChild(spinner);

        
        generationForm.addEventListener('submit', (event) => {
            console.log('[DEBUG] REAL FORM SUBMIT EVENT INTERCEPTED!');
            event.preventDefault();

            console.log('[DEBUG] Starting loading state...');
            if(btnText) btnText.style.visibility = 'hidden';
            generateButton.classList.add('is-loading');
            generateButton.disabled = true;

            resultArea.innerHTML = `
                <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center" data-aos="fade-up">
                    <p class="text-sm font-medium text-blue-800">The AI is creating your recipe... This includes generating a custom image and can take up to a minute.</p>
                </div>`;
            
            // --- REAL Fetch API Call to the Backend ---
            console.log('[DEBUG] Sending fetch request to handle_generation.php...');
            fetch('handle_generation.php', {
                method: 'POST',
                body: new FormData(generationForm)
            })
            .then(response => response.json())
            .then(data => {
                console.log('[DEBUG] Received response from server:', data);
                if (data.status === 'success') {
                    // The backend now sends 'recipe_title' and 'pdf_url'
                    resultArea.innerHTML = `
                        <div class="p-6 bg-white rounded-lg shadow-lg text-center" data-aos="fade-up">
                            <svg class="mx-auto h-12 w-auto text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 class="mt-4 text-xl font-bold text-primary">Recipe Ready!</h3>
                            <p class="mt-2 text-text-secondary">Your recipe for "${data.recipe_title}" has been successfully created.</p>
                            <a href="${data.pdf_url}" download target="_blank" class="mt-6 inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover">
                                Download PDF
                            </a>
                        </div>`;
                } else {
                    // If the backend returned an error (e.g., PDF creation failed), show it
                    throw new Error(data.message || 'An unknown error occurred.');
                }
            })
            .catch(error => {
                console.error('[DEBUG] Fetch error:', error);
                resultArea.innerHTML = `
                    <div class="p-4 bg-red-50 border border-red-200 rounded-lg text-center" data-aos="fade-up">
                        <p class="text-sm font-medium text-red-800"><strong>Error:</strong> ${error.message}</p>
                    </div>`;
            })
            .finally(() => {
                console.log('[DEBUG] Ending loading state.');
                if(btnText) btnText.style.visibility = 'visible';
                generateButton.classList.remove('is-loading');
                generateButton.disabled = false;
            });
        });
    }
});
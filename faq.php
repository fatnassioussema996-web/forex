<?php
// faq.php - v2 - Redesigned with Tailwind CSS

// --- Basic Setup ---
require_once __DIR__ . '/config.php';
$page_title = 'Frequently Asked Questions';
$base_path = '/'; 

// --- Session and User Data ---
$current_user_data = null; 
$is_logged_in = false;
if (session_status() === PHP_SESSION_NONE) { session_start(); }
if (isset($_SESSION['user_id'])) {
    // Standard user data fetch for header consistency
    $stmt = $connection->prepare("SELECT id, first_name, balance FROM users WHERE id = ?");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $current_user_data = $result->fetch_assoc();
        $is_logged_in = true;
    }
    $stmt->close();
}

// --- Include Header ---
include __DIR__ . '/templates/header.php';
?>

<main class="bg-white">
    <!-- Centered Header -->
    <div class="bg-gray-50 py-20 sm:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <h1 class="text-4xl font-extrabold text-text-main sm:text-5xl lg:text-6xl">Frequently Asked Questions</h1>
            <p class="mt-4 max-w-2xl mx-auto text-xl text-text-secondary">
                Have a question? We've got answers. If you don't see what you're looking for, feel free to <a href="<?php echo $base_path; ?>contact" class="text-primary hover:underline">contact us</a>.
            </p>
        </div>
    </div>
    
    <!-- FAQ Accordion Section -->
    <section class="py-16 sm:py-20">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="divide-y-2 divide-border" data-aos="fade-up" data-aos-delay="100">

                <!-- Question 1 -->
                <div class="faq-item py-6">
                    <button class="faq-question flex justify-between items-center w-full text-left">
                        <span class="text-lg font-medium text-text-main">What is the AI Recipe Generator?</span>
                        <span class="faq-icon ml-6 h-7 flex items-center">
                            <svg class="h-6 w-6 transform transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                        </span>
                    </button>
                    <div class="faq-answer-content overflow-hidden max-h-0 transition-all duration-500 ease-in-out">
                        <div class="faq-answer pt-4 pr-12 text-base text-text-secondary">
                            <p>It's a smart tool that creates new, custom recipes based on the ingredients you provide. Simply tell it what's in your fridge, and our AI will invent a delicious meal for you, complete with instructions and a photo.</p>
                        </div>
                    </div>
                </div>

                <!-- Question 2 -->
                <div class="faq-item py-6">
                     <button class="faq-question flex justify-between items-center w-full text-left">
                        <span class="text-lg font-medium text-text-main">How does the Token system work?</span>
                        <span class="faq-icon ml-6 h-7 flex items-center">
                             <svg class="h-6 w-6 transform transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                        </span>
                    </button>
                    <div class="faq-answer-content overflow-hidden max-h-0 transition-all duration-500 ease-in-out">
                        <div class="faq-answer pt-4 pr-12 text-base text-text-secondary">
                            <p>Tokens are our "pay-as-you-go" currency. You buy a package of Tokens, and each recipe generation deducts a small amount from your balance. There are no monthly subscriptions. Larger Token packages come with bonus Tokens, giving you better value.</p>
                        </div>
                    </div>
                </div>

                 <!-- Question 3 -->
                <div class="faq-item py-6">
                     <button class="faq-question flex justify-between items-center w-full text-left">
                        <span class="text-lg font-medium text-text-main">Can I specify dietary requirements?</span>
                        <span class="faq-icon ml-6 h-7 flex items-center">
                             <svg class="h-6 w-6 transform transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                        </span>
                    </button>
                    <div class="faq-answer-content overflow-hidden max-h-0 transition-all duration-500 ease-in-out">
                        <div class="faq-answer pt-4 pr-12 text-base text-text-secondary">
                            <p>Yes! Our generator allows you to specify various preferences, including dietary needs (like vegan, gluten-free), cuisine type (like Italian or Asian), and maximum cooking time to ensure the recipe fits your lifestyle.</p>
                        </div>
                    </div>
                </div>
                
                 <!-- Question 4 -->
                <div class="faq-item py-6">
                     <button class="faq-question flex justify-between items-center w-full text-left">
                        <span class="text-lg font-medium text-text-main">What do I get after generating a recipe?</span>
                        <span class="faq-icon ml-6 h-7 flex items-center">
                             <svg class="h-6 w-6 transform transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                        </span>
                    </button>
                    <div class="faq-answer-content overflow-hidden max-h-0 transition-all duration-500 ease-in-out">
                        <div class="faq-answer pt-4 pr-12 text-base text-text-secondary">
                            <p>You will receive a beautifully formatted PDF file. It includes a unique, AI-generated photo of the dish, a complete list of ingredients, and clear, step-by-step cooking instructions. All your generated recipes are also saved in your "My Recipes" library in your account.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</main>


<?php 
// --- Include Footer ---
include __DIR__ . '/templates/footer.php'; 
?>
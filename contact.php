<?php
// contact.php - v2 - Redesigned with Tailwind CSS

// --- Basic Setup ---
require_once __DIR__ . '/config.php';
$page_title = 'Contact Us';
$base_path = '/'; 

// --- Session and User Data ---
$current_user_data = null; 
$is_logged_in = false;
if (session_status() === PHP_SESSION_NONE) { session_start(); }
if (isset($_SESSION['user_id'])) {
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
            <h1 class="text-4xl font-extrabold text-text-main sm:text-5xl lg:text-6xl">Contact Us</h1>
            <p class="mt-4 max-w-2xl mx-auto text-xl text-text-secondary">
                We're here to help. Reach out to us with your questions, feedback, or inquiries.
            </p>
        </div>
    </div>
    
    <!-- Contact Details Grid -->
    <section class="py-16 sm:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-none mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

                <!-- Card 1: Email -->
                <div class="p-8 bg-white rounded-2xl shadow-lg transition transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="100">
                    <div class="inline-block bg-primary/20 text-primary p-3 rounded-xl">
                        <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <h3 class="mt-6 text-xl font-bold text-text-main">Email Support</h3>
                    <p class="mt-2 text-base text-text-secondary">For general questions and support, please send us an email.</p>
                    <a href="mailto:support@airecipegenerator.com" class="mt-4 inline-block font-semibold text-primary hover:underline">support@airecipegenerator.com</a>
                </div>

                <!-- Card 2: Social Media (Example) -->
                <div class="p-8 bg-white rounded-2xl shadow-lg transition transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="200">
                    <div class="inline-block bg-primary/20 text-primary p-3 rounded-xl">
                         <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h3 class="mt-6 text-xl font-bold text-text-main">Social Media</h3>
                    <p class="mt-2 text-base text-text-secondary">Follow us and send us a message on our social channels.</p>
                    <a href="#" class="mt-4 inline-block font-semibold text-primary hover:underline">@RecipeGenAI</a>
                </div>
                
                <!-- Card 3: Feedback (Example) -->
                <div class="p-8 bg-white rounded-2xl shadow-lg transition transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="300">
                     <div class="inline-block bg-primary/20 text-primary p-3 rounded-xl">
                        <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
                    </div>
                    <h3 class="mt-6 text-xl font-bold text-text-main">Feedback & Ideas</h3>
                    <p class="mt-2 text-base text-text-secondary">Have an idea for a new feature? We're all ears.</p>
                    <a href="mailto:feedback@airecipegenerator.com" class="mt-4 inline-block font-semibold text-primary hover:underline">feedback@airecipegenerator.com</a>
                </div>
            </div>
        </div>
    </section>

    <!-- === BOTTOM SECTION: Contact Form === -->
    <?php 
    // We simply include the component we already styled.
    include __DIR__ . '/templates/contact_form_section.php';
    ?>
</main>


<?php 
// --- Include Footer ---
include __DIR__ . '/templates/footer.php'; 
?>
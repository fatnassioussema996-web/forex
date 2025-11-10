<?php
// about.php - v2 - Redesigned with Tailwind CSS

// --- Basic Setup ---
require_once __DIR__ . '/config.php';
$page_title = 'About Us';
$base_path = '/'; 

// --- Session and User Data (good practice for header) ---
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
    <div class="bg-gray-50 py-20 sm:py-24" data-aos="fade-in">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-4xl font-extrabold text-text-main sm:text-5xl lg:text-6xl">Our Mission</h1>
            <p class="mt-4 max-w-2xl mx-auto text-xl text-text-secondary">
                To help you rediscover the joy of cooking and put an end to food waste, one delicious recipe at a time.
            </p>
        </div>
    </div>

    <!-- Main Content Area -->
    <div class="py-16 sm:py-20">
        <div class="max-w-prose mx-auto px-4 sm:px-6 lg:px-8">
            <div class="prose prose-lg prose-green mx-auto text-text-secondary">
                
                <p data-aos="fade-up">
                    Welcome to AI Recipe Generator, your new digital kitchen assistant. We started this project with a simple, yet powerful idea: what if you could create amazing meals from the random assortment of ingredients you already have in your fridge?
                </p>
                
                <h2 data-aos="fade-up">The Problem of "What's for Dinner?"</h2>
                
                <p data-aos="fade-up">
                    We've all been there. Staring into a refrigerator full of food, but with no inspiration. You have chicken, some broccoli, a lone onion, and a can of tomatoes. What can you possibly make? This daily dilemma often leads to ordering expensive takeout or, worse, letting good food go to waste. It's a problem of creativity, not of scarcity.
                </p>
                
                <h2 data-aos="fade-up">Our Solution: AI-Powered Culinary Creativity</h2>
                
                <p data-aos="fade-up">
                    We harness the power of advanced Artificial Intelligence to bridge the gap between your ingredients and your next meal. Our system doesn't just search for existing recipes; it <strong class="text-text-main">invents</strong> new ones on the fly, tailored specifically to your needs.
                </p>
                
                <ul data-aos="fade-up">
                    <li><strong>Smart Ingredient Recognition:</strong> Tell us what you have, and our AI understands.</li>
                    <li><strong>Dietary & Cuisine Control:</strong> Whether you're vegan, need a quick 30-minute meal, or are craving Italian, we've got you covered.</li>
                    <li><strong>Beautiful, Printable Guides:</strong> Every recipe is delivered as a professional, easy-to-follow PDF, complete with an AI-generated photo of your potential dish.</li>
                </ul>

                <p data-aos="fade-up">
                    Our goal is to empower home cooks everywhere, reduce food waste, and make the daily act of cooking exciting again. Thank you for joining us on this flavorful journey!
                </p>

            </div>
        </div>
    </div>
</main>


<?php 
// --- Include Footer ---
include __DIR__ . '/templates/footer.php'; 
?>
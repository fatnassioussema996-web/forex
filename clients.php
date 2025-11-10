<?php
// clients.php - v2 - Redesigned with Tailwind CSS

// --- Basic Setup ---
require_once __DIR__ . '/config.php';
$page_title = 'Trusted By The Best';
// Base path is set by config.php/config.local.php
if (!isset($base_path)) {
    $base_path = '/';
} 

// --- Data for Logos (Update paths as needed) ---
$logos = [
    ['name' => 'Gourmet Magazine', 'logo' => 'gourmet-magazine.svg'],
    ['name' => 'The Food Network', 'logo' => 'food-network.svg'],
    ['name' => 'Bon Appetit', 'logo' => 'bon-appetit.svg'],
    ['name' => 'Epicurious', 'logo' => 'epicurious.svg'],
    ['name' => 'Allrecipes', 'logo' => 'allrecipes.svg'],
    ['name' => 'HelloFresh', 'logo' => 'hellofresh.svg'],
    ['name' => 'Blue Apron', 'logo' => 'blue-apron.svg'],
    ['name' => 'Good Morning America', 'logo' => 'gma.svg'],
    ['name' => 'TechCrunch', 'logo' => 'techcrunch.svg'],
    ['name' => 'Wired', 'logo' => 'wired.svg'],
    ['name' => 'The Verge', 'logo' => 'the-verge.svg'],
    ['name' => 'Product Hunt', 'logo' => 'product-hunt.svg'],
];


// --- Session and User Data ---
$current_user_data = null; 
$is_logged_in = false;
if (session_status() === PHP_SESSION_NONE) { session_start(); }
if (isset($_SESSION['user_id'])) {
    // Standard user data fetch
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
            <h1 class="text-4xl font-extrabold text-text-main sm:text-5xl lg:text-6xl">As Featured In</h1>
            <p class="mt-4 max-w-2xl mx-auto text-xl text-text-secondary">
                Our innovative approach to cooking has been recognized by leading food and technology publications.
            </p>
        </div>
    </div>
    
    <!-- Logos Section -->
    <section class="py-16 sm:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6" data-aos="fade-up" data-aos-delay="100">
                <?php foreach($logos as $brand): ?>
                    <div class="col-span-1 flex justify-center items-center py-8 px-8">
                        <img class="max-h-12 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition duration-300 ease-in-out" 
                             src="<?php echo $base_path; ?>images/clients/<?php echo htmlspecialchars($brand['logo']); ?>" 
                             alt="<?php echo htmlspecialchars($brand['name']); ?> Logo">
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

</main>

<?php 
// --- Include Footer ---
include __DIR__ . '/templates/footer.php'; 
?>
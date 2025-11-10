<?php

// index.php - v2 - Redesigned with Tailwind CSS

// Step 1: Config is always first.
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/currency-utils.php';
$page_title = 'AI Recipe Generator | Turn Ingredients into Meals';

// Step 2: Define base path for clean URLs (only if not set by config.php/config.local.php).
if (!isset($base_path)) {
    $base_path = '/';
}

$additional_css = $additional_css ?? [];
$additional_css[] = 'assets/css/home.css';
$additional_js = $additional_js ?? [];
$additional_js[] = 'assets/js/home.js';

// Get current currency for pricing
$current_currency = get_user_currency();
$currency_config = get_currency_config($current_currency); 

// Step 3: Start session and fetch data if user is logged in.
$current_user_data = null; 
$is_logged_in = false;
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
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

// Step 4: Now that data is ready, include the header.
include __DIR__ . '/templates/header.php';
?>

<main>
    <?php if (!$is_logged_in): ?>
        
        <!-- ============================================= -->
        <!--      LANDING PAGE VIEW (NOT LOGGED-IN)        -->
        <!-- ============================================= -->
        <?php
            require_once __DIR__ . '/content/samples.php';
            $homeSamples = array_slice($samplesData, 0, 8);
            $sampleFallbackImage = $base_path . 'assets/images/samples/sample-chicken-broccoli-bowl.webp';
            $homeAllergens = [
                'Gluten', 'Crustaceans', 'Eggs', 'Fish', 'Peanuts', 'Soybeans', 'Milk',
                'Tree Nuts', 'Celery', 'Mustard', 'Sesame', 'Sulphites', 'Lupin', 'Molluscs'
            ];
        ?>
        
        <!-- ===== HERO SECTION ===== -->
        <section class="relative bg-white overflow-hidden">
            <div class="max-w-7xl mx-auto">
                <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <!-- This is a decorative shape -->
                    <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>

                    <div class="relative pt-6 px-4 sm:px-6 lg:px-8"></div><!-- Spacer for header -->

                    <div class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div class="sm:text-center lg:text-left">
                            <h1 class="text-4xl tracking-tight font-extrabold text-text-main sm:text-5xl md:text-6xl">
                                <span class="block xl:inline">Don't know what to cook?</span>
                                <span class="block text-primary xl:inline">Ask our AI.</span>
                            </h1>
                            <p class="mt-3 text-base text-text-secondary sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                Stop wasting food. Just list the ingredients you have, and our smart AI will generate a custom, delicious recipe for you in seconds. Complete with photos and step-by-step instructions.
                            </p>
                            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div class="rounded-md shadow">
                                    <a href="<?php echo $base_path; ?>register" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover md:py-4 md:text-lg md:px-10">
                                        Get Started
                                    </a>
                                </div>
                                <div class="mt-3 sm:mt-0 sm:ml-3">
                                    <a href="#features" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10">
                                        How it Works
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="<?php echo $base_path; ?>images/hero_background.webp" alt="A beautiful display of fresh ingredients for cooking">
            </div>
        </section>

        <!-- ===== HOME SAMPLES PREVIEW ===== -->
        <?php if (!empty($homeSamples)): ?>
        <section id="home-samples" class="home-section home-samples" aria-labelledby="home-samples-heading">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header class="home-section__header" data-aos="fade-up">
                    <h2 id="home-samples-heading">Real examples — ready to cook</h2>
                    <p>See what you’ll get as a clean, printable PDF — then generate a similar one.</p>
                </header>
                <div class="home-samples-grid">
                    <?php foreach ($homeSamples as $sample): ?>
                        <?php
                            $coverSrc = $sample['image']['src'] ?? '';
                            $coverPath = $coverSrc
                                ? $base_path . ltrim($coverSrc, '/')
                                : $sampleFallbackImage;
                            $coverAlt = $sample['image']['alt'] ?? 'Recipe preview';
                            $payload = [
                                'next' => 'generator',
                                'pref' => json_encode($sample['generatorPayload'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                            ];
                            $generateUrl = $base_path . 'register.php?' . http_build_query($payload);
                            $sampleId = htmlspecialchars($sample['id']);
                        ?>
                        <article class="home-sample-card" data-id="<?php echo $sampleId; ?>" data-aos="fade-up">
                            <figure class="home-sample-card__cover">
                                <img src="<?php echo htmlspecialchars($coverPath); ?>"
                                     alt="<?php echo htmlspecialchars($coverAlt); ?>"
                                     width="480"
                                     height="320"
                                     loading="lazy"
                                     decoding="async">
                            </figure>
                            <div class="home-sample-card__body">
                                <h3><?php echo htmlspecialchars($sample['title']); ?></h3>
                                <p class="home-sample-card__description"><?php echo htmlspecialchars($sample['description']); ?></p>
                                <div class="home-sample-card__details">
                                    <span>⏱️ <?php echo (int) ($sample['time'] ?? 0); ?> min</span>
                                    <span>🍽️ <?php echo (int) ($sample['servings'] ?? 0); ?> servings</span>
                                    <span>🧑‍🍳 <?php echo htmlspecialchars($sample['skill'] ?? 'Easy'); ?></span>
                                </div>
                                <div class="home-sample-card__cta">
                                    <a href="<?php echo $base_path; ?>samples.php#<?php echo $sampleId; ?>"
                                       class="home-btn home-btn--secondary"
                                       data-ev="home_sample_view"
                                       data-id="<?php echo $sampleId; ?>">
                                        View details
                                    </a>
                                    <a href="<?php echo htmlspecialchars($generateUrl); ?>"
                                       class="home-btn home-btn--primary"
                                       data-ev="home_sample_generate"
                                       data-id="<?php echo $sampleId; ?>">
                                        Generate similar
                                    </a>
                                </div>
                            </div>
                        </article>
                    <?php endforeach; ?>
                </div>
                <div class="home-section__footer" data-aos="fade-up" data-aos-delay="100">
                    <a class="home-btn-link" href="<?php echo $base_path; ?>samples.php">
                        See all samples
                    </a>
                </div>
            </div>
        </section>
        <?php endif; ?>
        
        <!-- ===== FEATURES SECTION ===== -->
        <section id="features" class="py-20 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="relative z-10 lg:text-center" data-aos="fade-up">
                    <h2 class="text-base text-primary font-semibold tracking-wide uppercase">Our Features</h2>
                    <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-main sm:text-4xl">
                        Everything you need to fight food waste
                    </p>
                    <p class="mt-4 max-w-2xl text-xl text-text-secondary lg:mx-auto">
                        We give you the tools to turn random leftovers into culinary masterpieces.
                    </p>
                </div>

                <div class="mt-10">
                    <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        <!-- Я добавлю data-aos в каждый блок <div class="relative"> -->
                        <div class="relative" data-aos="fade-up" data-aos-delay="100">
                            <dt>
                                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                                </div>
                                <p class="ml-16 text-lg leading-6 font-medium text-text-main">Generate from Ingredients</p>
                            </dt>
                            <dd class="mt-2 ml-16 text-base text-text-secondary">
                                Simply type, paste, or even upload a photo of your ingredients. Our AI will identify them and create a recipe.
                            </dd>
                        </div>
                        <!-- и так далее для остальных... -->
                        <div class="relative" data-aos="fade-up" data-aos-delay="150">
                            <dt>
                                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <p class="ml-16 text-lg leading-6 font-medium text-text-main">Customize Your Meal</p>
                            </dt>
                            <dd class="mt-2 ml-16 text-base text-text-secondary">
                                Need a vegan breakfast? A gluten-free Italian dinner? Specify your dietary needs, cuisine type, and cooking time.
                            </dd>
                        </div>
                        <div class="relative" data-aos="fade-up" data-aos-delay="200">
                            <dt>
                                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                </div>
                                <p class="ml-16 text-lg leading-6 font-medium text-text-main">Downloadable PDF Recipes</p>
                            </dt>
                            <dd class="mt-2 ml-16 text-base text-text-secondary">
                                Every recipe you generate comes as a beautifully formatted PDF file, complete with a photo, ingredient list, and step-by-step instructions.
                            </dd>
                        </div>
                        <div class="relative" data-aos="fade-up" data-aos-delay="250">
                            <dt>
                                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                                </div>
                                <p class="ml-16 text-lg leading-6 font-medium text-text-main">Personal Recipe Library</p>
                            </dt>
                            <dd class="mt-2 ml-16 text-base text-text-secondary">
                                All your generated recipes are automatically saved to your personal account. Access your creations anytime, anywhere.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>

        <!-- ===== HOME ALLERGENS MICRO SECTION ===== -->
        <section id="home-allergens" class="home-section home-allergens" aria-labelledby="home-allergens-heading">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="home-card" data-aos="fade-up">
                    <div class="home-allergens__header">
                        <h2 id="home-allergens-heading">Allergens &amp; Safety — built-in filters</h2>
                        <p>Flag allergens once, and we’ll do the filtering every time.</p>
                    </div>
                    <ul class="home-allergens__list">
                        <li><strong>14 EU allergens</strong> — gluten, crustaceans, eggs, fish, peanuts, soy, milk, tree nuts, celery, mustard, sesame, sulphites, lupin, molluscs.</li>
                        <li><strong>Exclude &amp; swap</strong> — we avoid flagged ingredients and propose alternatives.</li>
                        <li><strong>No medical advice</strong> — always verify labels; traces can’t be guaranteed.</li>
                    </ul>
                    <div class="home-allergens__chips" role="list" aria-label="Supported allergens">
                        <?php foreach ($homeAllergens as $chip): ?>
                            <span class="home-chip" role="listitem"><?php echo htmlspecialchars($chip); ?></span>
                        <?php endforeach; ?>
                    </div>
                    <a href="<?php echo $base_path; ?>allergens.php"
                       class="home-btn home-btn--primary"
                       data-ev="home_allergens_click">
                        Learn more
                    </a>
                </div>
            </div>
        </section>

        <!-- PRICING SECTION -->
        <section id="pricing" class="relative py-20 bg-white overflow-hidden">
            <!-- Animated Background -->
            <div class="animated-bg-container">
                <span class="bg-icon" style="background-image: url('<?php echo $base_path; ?>images/food-icon-1.png');"></span>
                <span class="bg-icon" style="background-image: url('<?php echo $base_path; ?>images/food-icon-2.png');"></span>
                <span class="bg-icon" style="background-image: url('<?php echo $base_path; ?>images/food-icon-3.png');"></span>
                <span class="bg-icon" style="background-image: url('<?php echo $base_path; ?>images/food-icon-4.png');"></span>
                <span class="bg-icon" style="background-image: url('<?php echo $base_path; ?>images/food-icon-5.png');"></span>
                <span class="bg-icon" style="background-image: url('<?php echo $base_path; ?>images/food-icon-6.png');"></span>
                <span class="bg-icon" style="background-image: url('<?php echo $base_path; ?>images/food-icon-7.webp');"></span>
            </div>
             <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="lg:text-center" data-aos="fade-up">
                    <h2 class="text-base text-primary font-semibold tracking-wide uppercase">Pricing</h2>
                    <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-main sm:text-4xl">
                        Simple, Pay-As-You-Go Pricing
                    </p>
                    <p class="mt-4 max-w-2xl text-xl text-text-secondary lg:mx-auto">
                        No subscriptions. Just buy Tokens and use them whenever you need. Get more value with larger packs.
                    </p>
                </div>
                
                <div class="relative z-10 mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
                    <!-- Pricing Plan 1 -->
                    <div class="bg-surface border border-border rounded-lg shadow-sm divide-y divide-border transition transform hover:-translate-y-2 hover:shadow-xl hover:border-primary" data-aos="fade-up" data-aos-delay="100">
                        <div class="p-6">
                            <h2 class="text-lg leading-6 font-medium text-text-main">Taster</h2>
                            <p class="mt-2 text-sm text-text-secondary">For a quick start.</p>
                            <p class="mt-4 text-4xl font-extrabold text-text-main"><?php echo format_price(calculate_price_for_tokens(1000, $current_currency), $current_currency); ?></p>
                            <p class="mt-4 text-lg font-medium text-primary">1,000 Tokens</p>
                            <a href="<?php echo $base_path; ?>register" class="mt-6 block w-full bg-primary border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-primary-hover">Get Started</a>
                        </div>
                        <div class="pt-6 pb-8 px-6">
                            <h3 class="text-xs font-medium text-text-main tracking-wide uppercase">What's included</h3>
                            <ul class="mt-4 space-y-2">
                                <li class="flex items-start"><span class="h-6 flex items-center sm:h-7"><svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></span><span class="ml-3 text-sm text-text-secondary">~20 Recipe Generations</span></li>
                                <li class="flex items-start"><span class="h-6 flex items-center sm:h-7"><svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></span><span class="ml-3 text-sm text-text-secondary">PDF Downloads</span></li>
                            </ul>
                        </div>
                    </div>
                    <!-- Pricing Plan 2 (Popular) -->
                    <div class="relative bg-surface border-2 border-primary rounded-lg shadow-xl divide-y divide-border transition transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="150">
                        <div class="absolute top-0 right-0">
                            <div class="w-32 h-32 flex items-start justify-end">
                                <div class="absolute transform rotate-45 bg-primary text-center text-white font-semibold py-1 right-[-34px] top-[32px] w-[170px]">Popular</div>
                            </div>
                        </div>
                        <div class="p-6">
                            <h2 class="text-lg leading-6 font-medium text-text-main">Home Chef</h2>
                            <p class="mt-2 text-sm text-text-secondary">Best value for regular use.</p>
                            <p class="mt-4 text-4xl font-extrabold text-text-main"><?php echo format_price(calculate_price_for_tokens(2750, $current_currency), $current_currency); ?></p>
                            <p class="mt-4 text-lg font-medium text-primary">2,750 Tokens <span class="text-sm font-normal text-primary-hover">(+10% Bonus)</span></p>
                            <a href="<?php echo $base_path; ?>register" class="mt-6 block w-full bg-primary border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-primary-hover">Get Started</a>
                        </div>
                        <div class="pt-6 pb-8 px-6">
                            <h3 class="text-xs font-medium text-text-main tracking-wide uppercase">What's included</h3>
                            <ul class="mt-4 space-y-2">
                                <li class="flex items-start"><span class="h-6 flex items-center sm:h-7"><svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></span><span class="ml-3 text-sm text-text-secondary">~55 Recipe Generations</span></li>
                                <li class="flex items-start"><span class="h-6 flex items-center sm:h-7"><svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></span><span class="ml-3 text-sm text-text-secondary">PDF Downloads</span></li>
                            </ul>
                        </div>
                    </div>
                    <!-- Pricing Plan 3 -->
                    <div class="bg-surface border border-border rounded-lg shadow-sm divide-y divide-border transition transform hover:-translate-y-2 hover:shadow-xl hover:border-primary" data-aos="fade-up" data-aos-delay="200">
                        <div class="p-6">
                            <h2 class="text-lg leading-6 font-medium text-text-main">Gourmet</h2>
                            <p class="mt-2 text-sm text-text-secondary">For the avid home cook.</p>
                            <p class="mt-4 text-4xl font-extrabold text-text-main"><?php echo format_price(calculate_price_for_tokens(6000, $current_currency), $current_currency); ?></p>
                            <p class="mt-4 text-lg font-medium text-primary">6,000 Tokens <span class="text-sm font-normal text-primary-hover">(+20% Bonus)</span></p>
                            <a href="<?php echo $base_path; ?>register" class="mt-6 block w-full bg-primary border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-primary-hover">Get Started</a>
                        </div>
                        <div class="pt-6 pb-8 px-6">
                            <h3 class="text-xs font-medium text-text-main tracking-wide uppercase">What's included</h3>
                            <ul class="mt-4 space-y-2">
                                <li class="flex items-start"><span class="h-6 flex items-center sm:h-7"><svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></span><span class="ml-3 text-sm text-text-secondary">~120 Recipe Generations</span></li>
                                <li class="flex items-start"><span class="h-6 flex items-center sm:h-7"><svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></span><span class="ml-3 text-sm text-text-secondary">PDF Downloads</span></li>
                            </ul>
                        </div>
                    </div>
                    <!-- Pricing Plan 4 -->
                     <div id="custom-pricing-card" class="bg-surface border border-dashed border-border rounded-lg shadow-sm flex flex-col transition transform hover:-translate-y-2 hover:shadow-xl hover:border-primary" data-aos="fade-up" data-aos-delay="250">
                        <div class="p-6 flex-grow">
                            <h2 class="text-lg leading-6 font-medium text-text-main">Custom Amount</h2>
                            <p class="mt-2 text-sm text-text-secondary">Perfect for your specific needs.</p>

                            <!-- This block is shown by default -->
                            <div class="mt-8 text-center">
                                <button type="button" class="select-custom-btn w-full bg-surface border border-border rounded-md py-2 text-sm font-semibold text-primary text-center hover:border-primary">
                                    Choose Amount
                                </button>
                            </div>

                            <!-- This form is hidden by default and shown on click -->
                            <form action="<?php echo $base_path; ?>top-up" method="POST" class="custom-amount-form hidden mt-6">
                                <label for="custom-amount" class="block text-sm font-medium text-text-secondary">Amount in <?php echo $current_currency; ?> (<?php echo $currency_config['symbol']; ?>)</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span class="text-text-secondary sm:text-sm"><?php echo $currency_config['symbol']; ?></span>
                                    </div>
                                    <input type="text" name="amount" id="custom-amount" class="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-border rounded-md" placeholder="15.00" inputmode="decimal">
                                </div>
                                
                                <button type="submit" name="lucky_bonus" value="true" class="mt-4 w-full bg-amber-400 border border-transparent rounded-md py-2 text-sm font-semibold text-black text-center hover:bg-amber-500">
                                    I Feel Lucky (+10-25%)
                                </button>
                            </form>
                        </div>

                        <div class="pt-6 pb-8 px-6 bg-gray-50 rounded-b-lg">
                            <h3 class="text-xs font-medium text-text-main tracking-wide uppercase">What's included</h3>
                            <ul class="mt-4 space-y-2">
                                <li class="flex items-start">
                                    <span class="h-6 flex items-center sm:h-7"><svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></span>
                                    <span class="ml-3 text-sm text-text-secondary">Pay exactly what you want</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="h-6 flex items-center sm:h-7"><svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></span>
                                    <span class="ml-3 text-sm text-text-secondary">Bonuses apply for £25+</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="h-6 flex items-center sm:h-7"><svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></span>
                                    <span class="ml-3 text-sm text-text-secondary">Chance for a Lucky Bonus!</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
             </div>
        </section>

        <!-- ===== HOME MINI ESTIMATOR ===== -->
        <section id="home-estimator" class="home-section" aria-labelledby="home-estimator-heading">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="home-card home-estimator" data-aos="fade-up">
                    <div class="home-estimator__intro">
                        <h2 id="home-estimator-heading">Save money, waste less ♻️</h2>
                        <p>Estimate the impact of cutting food waste — then dive deeper in our sustainability guide.</p>
                    </div>
                    <form class="home-estimator__form" id="home-estimator-form" novalidate>
                        <div class="home-field">
                            <label class="sr-only" for="home-estimator-portions">Portions wasted per week</label>
                            <span class="home-field__label">Portions wasted/week</span>
                            <input type="number"
                                   id="home-estimator-portions"
                                   name="portions"
                                   min="0"
                                   step="0.1"
                                   value="5.5"
                                   data-ev="home_estimator_change"
                                   inputmode="decimal">
                        </div>
                        <div class="home-field">
                            <label class="sr-only" for="home-estimator-grams">Average portion weight (grams)</label>
                            <span class="home-field__label">Portion weight (g)</span>
                            <input type="number"
                                   id="home-estimator-grams"
                                   name="grams"
                                   min="0"
                                   step="10"
                                   value="250"
                                   data-ev="home_estimator_change"
                                   inputmode="decimal">
                        </div>
                        <div class="home-field">
                            <label class="sr-only" for="home-estimator-price">€ per kg (local)</label>
                            <span class="home-field__label">€ per kg (local)</span>
                            <input type="number"
                                   id="home-estimator-price"
                                   name="price"
                                   min="0"
                                   step="0.1"
                                   value="6"
                                   data-ev="home_estimator_change"
                                   inputmode="decimal">
                        </div>
                    </form>
                    <div class="home-estimator__results" role="group" aria-labelledby="home-estimator-heading">
                        <div class="home-estimator__kpi">
                            <span class="home-estimator__kpi-label">Yearly waste mass</span>
                            <span class="home-estimator__kpi-value" id="home-estimator-out-kg">—</span>
                        </div>
                        <div class="home-estimator__kpi">
                            <span class="home-estimator__kpi-label">Yearly savings</span>
                            <span class="home-estimator__kpi-value" id="home-estimator-out-money">—</span>
                        </div>
                        <div class="home-estimator__kpi">
                            <span class="home-estimator__kpi-label">CO₂e range</span>
                            <span class="home-estimator__kpi-value" id="home-estimator-out-co2">—</span>
                        </div>
                    </div>
                    <p class="home-estimator__live" id="home-estimator-live" aria-live="polite"></p>
                    <a href="<?php echo $base_path; ?>sustainability.php#estimator" class="home-btn-link">
                        Open full calculator
                    </a>
                </div>
            </div>
        </section>

        <!-- ============================================= -->
        <!--          GENERATOR PREVIEW SECTION          -->
        <!-- ============================================= -->
        <section class="py-20 bg-gray-50 border-t border-border">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="lg:text-center" data-aos="fade-up">
                    <h2 class="text-base text-primary font-semibold tracking-wide uppercase">Live Demo</h2>
                    <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-main sm:text-4xl">
                        See The Magic In Action
                    </p>
                    <p class="mt-4 max-w-2xl text-xl text-text-secondary lg:mx-auto">
                        This is the exact interface you'll use. The fields are disabled, but you can see how simple it is. Ready to try it for real?
                    </p>
                </div>
                
                <div class="mt-12">
                    <?php
                        // Set the form mode to 'demo'
                        $is_demo = true;
                        include __DIR__ . '/templates/_recipe_generator_form.php';
                    ?>
                </div>
            </div>
        </section>

        <!-- ===== HOME FAQ ===== -->
        <section id="home-faq" class="home-section" aria-labelledby="home-faq-heading">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="home-card home-faq" data-aos="fade-up">
                    <h2 id="home-faq-heading">Quick answers</h2>
                    <div class="home-faq__items" role="list">
                        <div class="home-faq__item" role="listitem">
                            <button class="home-faq__btn" type="button" aria-expanded="false" aria-controls="home-faq-panel-1" id="home-faq-1">
                                <span>Do I need a subscription?</span>
                                <svg class="home-faq__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </button>
                            <div class="home-faq__panel" id="home-faq-panel-1" role="region" aria-labelledby="home-faq-1" hidden>
                                No, tokens only. Top up whenever you need and pay per generation.
                            </div>
                        </div>
                        <div class="home-faq__item" role="listitem">
                            <button class="home-faq__btn" type="button" aria-expanded="false" aria-controls="home-faq-panel-2" id="home-faq-2">
                                <span>Can I export PDFs?</span>
                                <svg class="home-faq__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </button>
                            <div class="home-faq__panel" id="home-faq-panel-2" role="region" aria-labelledby="home-faq-2" hidden>
                                Yes, every recipe you generate is saved to your account and downloadable as a PDF.
                            </div>
                        </div>
                        <div class="home-faq__item" role="listitem">
                            <button class="home-faq__btn" type="button" aria-expanded="false" aria-controls="home-faq-panel-3" id="home-faq-3">
                                <span>Allergens covered?</span>
                                <svg class="home-faq__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </button>
                            <div class="home-faq__panel" id="home-faq-panel-3" role="region" aria-labelledby="home-faq-3" hidden>
                                Absolutely — we handle 14 EU allergens and highlight suggested swaps in every output.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===== HOME CTA FOOTER ===== -->
        <section id="home-cta" class="home-section home-cta" aria-labelledby="home-cta-heading">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="home-cta__inner" data-aos="fade-up">
                    <div>
                        <h2 id="home-cta-heading">Ready to cook smarter?</h2>
                        <p>Tell us what you’ve got — get a clean, printable PDF in minutes.</p>
                    </div>
                    <a href="<?php echo $base_path; ?>register" class="home-btn home-btn--primary" data-ev="home_cta_click">
                        Open generator
                    </a>
                </div>
            </div>
        </section>

    <?php else: ?>

    <!-- ============================================= -->
    <!--            APP VIEW (LOGGED-IN)               -->
    <!-- ============================================= -->
    <section class="relative py-12 bg-gray-50 min-h-screen overflow-hidden">
         <!-- Animated Background -->
        <div class="animated-bg-container">
            <span class="bg-icon" style="background-image: url('<?php echo $base_path; ?>images/food-icon-1.png');"></span>
            <span class="bg-icon" style="background-image: url('<?php echo $base_path; ?>images/food-icon-2.png');"></span>
            <span class="bg-icon" style="background-image: url('<?php echo $base_path; ?>images/food-icon-3.png');"></span>
            <span class="bg-icon" style="background-image: url('<?php echo $base_path; ?>images/food-icon-4.png');"></span>
            <span class="bg-icon" style="background-image: url('<?php echo $base_path; ?>images/food-icon-5.png');"></span>
            <span class="bg-icon" style="background-image: url('<?php echo $base_path; ?>images/food-icon-6.png');"></span>
            <span class="bg-icon" style="background-image: url('<?php echo $base_path; ?>images/food-icon-7.webp');"></span>
        </div>
        
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Welcome Header -->
            <div class="text-center" data-aos="fade-in">
                <h1 class="text-4xl font-extrabold text-text-main">Recipe Generator</h1>
                <p class="mt-2 text-lg text-text-secondary">Let's turn your ingredients into a meal, <?php echo htmlspecialchars($current_user_data['first_name']); ?>!</p>
            </div>

            <div class="mt-8">
                <?php
                    // Set the form mode to 'real' (not a demo)
                    $is_demo = false;
                    include __DIR__ . '/templates/_recipe_generator_form.php';
                ?>
            </div>

            <!-- Container for generation results -->
            <div id="generation-result-area" class="mt-8 max-w-3xl mx-auto"></div>
        </div>
    </section>

<?php endif; ?>

</main>

<?php
// Include the new footer
include __DIR__ . '/templates/footer.php';
?>
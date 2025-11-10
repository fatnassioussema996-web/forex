<?php
// how-it-works.php - How It Works page (Z-structure layout) - v2.0
// Updated: Z-structure layout with light theme adaptation

// --- Basic Setup ---
require_once __DIR__ . '/config.php';
$page_title = 'How It Works';
// Base path is set by config.php/config.local.php
if (!isset($base_path)) {
    $base_path = '/';
}

// --- Session and User Data ---
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

// --- Additional CSS for this page ---
$additional_css = ['assets/css/howitworks.css'];

// --- Content Array ---
$howItWorksContent = [
    "hero" => [
        "title" => "How RecipeGen works",
        "subtitle" => "Tell us what you've got, pick preferences, and get a clean, printable recipe PDF in minutes.",
        "ctaPrimary" => ["label" => "Generate a recipe", "href" => $base_path . ($is_logged_in ? "" : "register")],
        "ctaSecondary" => ["label" => "See pricing & tokens", "href" => $base_path . "#pricing"],
        "image" => [
            "src" => $base_path . "assets/images/howitworks/howitworks-hero.webp",
            "alt" => "Natural kitchen scene with ingredients and a laptop"
        ]
    ],
    "steps" => [
        [
            "key" => "step1",
            "title" => "Tell us what you have 🧺",
            "body" => "Add 2–4 ingredients (e.g., chicken, broccoli, rice). Exclude what you don't eat, set diet and time.",
            "chips" => ["chicken", "pasta", "tomatoes", "broccoli", "rice", "lemon", "garlic"],
            "diet" => ["vegan", "vegetarian", "gluten-free", "dairy-free", "low-carb"],
            "hint" => "Keep it short for focused results.",
            "image" => [
                "src" => $base_path . "assets/images/howitworks/howitworks-step1-input.webp",
                "alt" => "Selecting ingredient tags on a laptop screen"
            ]
        ],
        [
            "key" => "step2",
            "title" => "AI turns inputs into a recipe 🤖",
            "bullets" => [
                "We validate preferences (diet, allergens).",
                "AI drafts steps, tips, and timing.",
                "Tokens cover generation — pay only when you create."
            ],
            "note" => "No subscription. You're in control.",
            "flow" => ["Tokens", "AI", "Draft", "PDF"],
            "image" => [
                "src" => $base_path . "assets/images/howitworks/howitworks-step2-flow.webp",
                "alt" => "Paper cards showing Tokens, AI, Draft, PDF in a flow"
            ]
        ],
        [
            "key" => "step3",
            "title" => "What's inside your PDF 📄",
            "pdfStructure" => [
                "Title — your recipe name",
                "Description — a short intro",
                "Cover image — realistic dish photo",
                "Details: Skill Level • Servings • Cooking Time ⏱️",
                "Ingredients — exact measures",
                "Instructions — step-by-step, scannable"
            ],
            "microcopy" => "Print-ready, distraction-free, easy to follow.",
            "imagePrimary" => [
                "src" => $base_path . "assets/images/howitworks/howitworks-step3-pdf-structure.webp",
                "alt" => "Printed recipe layout with labeled sections"
            ]
        ]
    ],
    "miniDemo" => [
        "placeholder" => "e.g., chicken, broccoli, rice",
        "button" => "Try a mock recipe",
        "modalText" => "Create an account to save & export PDF",
        "mock" => [
            "title" => "Chicken & Broccoli Weeknight Bowl",
            "details" => ["skill" => "Easy", "servings" => 2, "time" => "25 min"],
            "steps" => [
                "Marinate chopped chicken with salt, pepper, and lemon.",
                "Stir-fry chicken until golden; set aside.",
                "Sauté broccoli and garlic; add a splash of water to steam.",
                "Combine with warm rice; toss everything and serve."
            ]
        ]
    ],
    "trust" => [
        "badges" => ["No subscription", "Private by default", "Cancel anytime"],
        "image" => [
            "src" => $base_path . "assets/images/howitworks/howitworks-badges.webp",
            "alt" => "Trust badges"
        ],
        "quotes" => [
            "Turned leftovers into dinner in minutes.",
            "Love the clean, printable PDF.",
            "Tokens are simple — no subscription traps."
        ]
    ],
    "faq" => [
        ["q" => "Do I need a subscription?", "a" => "No. You buy tokens and pay only when you generate. There's no monthly fee or recurring charges. Simply purchase tokens as needed, and they remain in your account until you use them. This gives you complete control over your spending."],
        ["q" => "How accurate is nutrition?", "a" => "Our nutrition estimates are based on standard ingredient databases and AI calculations. While we strive for accuracy, these are approximations and should be used as a guide rather than exact measurements. For precise nutritional information, especially for medical or dietary restrictions, we recommend consulting with a nutritionist or using verified nutrition databases. See our Nutrition Guide for more details and sources."],
        ["q" => "Can I exclude allergens?", "a" => "Yes, absolutely. You can add allergens to the Exclude section when generating a recipe. Our system will flag any potential conflicts and ensure the generated recipe avoids those ingredients. We support common allergens like nuts, dairy, gluten, shellfish, and more. The AI will automatically adjust the recipe to maintain flavor and nutrition while avoiding your specified allergens."],
        ["q" => "How do refunds work?", "a" => "Unused tokens remain on your balance indefinitely and never expire. If you need a refund for purchased tokens, please contact our support team. Refunds are processed according to our refund policy, typically within 5-7 business days. Tokens that have been used for recipe generation cannot be refunded, but any unused tokens in your account can be refunded upon request."]
    ],
    "ctaFooter" => [
        "title" => "Ready to cook smarter?",
        "subtitle" => "Tell us what you've got — get a clean, printable recipe PDF in minutes.",
        "cta" => ["label" => "Generate a recipe", "href" => $base_path . ($is_logged_in ? "" : "register")]
    ]
];

// --- Include Header ---
include __DIR__ . '/templates/header.php';
?>

<main class="bg-white">
    <!-- DEBUG: Page version v2.0 - Z-structure layout -->
    <!-- Hero Section -->
    <section class="py-12 sm:py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="hiw-hero" data-aos="fade-up">
                <div class="hiw-hero__body">
                    <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-text-secondary border border-border">
                        ℹ️ How it works
                    </span>
                    <h1 class="text-4xl font-extrabold text-text-main sm:text-5xl lg:text-6xl mt-3 mb-2">
                        <?php echo htmlspecialchars($howItWorksContent['hero']['title']); ?>
                    </h1>
                    <p class="text-lg text-text-secondary mb-6">
                        <?php echo htmlspecialchars($howItWorksContent['hero']['subtitle']); ?>
                    </p>
                    <div class="flex flex-wrap gap-3">
                        <a href="<?php echo htmlspecialchars($howItWorksContent['hero']['ctaPrimary']['href']); ?>" 
                           class="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-transparent text-base font-bold text-white bg-primary hover:bg-primary-hover transition"
                           data-ev="howitworks_hero_cta_click" data-cta="primary">
                            <?php echo htmlspecialchars($howItWorksContent['hero']['ctaPrimary']['label']); ?>
                        </a>
                        <a href="<?php echo htmlspecialchars($howItWorksContent['hero']['ctaSecondary']['href']); ?>" 
                           class="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-base font-bold text-text-main bg-white hover:bg-gray-50 transition"
                           data-ev="howitworks_hero_cta_click" data-cta="secondary">
                            <?php echo htmlspecialchars($howItWorksContent['hero']['ctaSecondary']['label']); ?>
                        </a>
                    </div>
                </div>
                <div class="hiw-hero__media mt-10 lg:mt-0" data-aos="fade-up" data-aos-delay="100">
                    <div class="hiw-image-container">
                        <img src="<?php echo htmlspecialchars($howItWorksContent['hero']['image']['src']); ?>" 
                             alt="<?php echo htmlspecialchars($howItWorksContent['hero']['image']['alt']); ?>"
                             class="hiw-image"
                             loading="lazy" decoding="async" width="600" height="400">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Steps Section (Z-structure) -->
    <section class="py-6 sm:py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <!-- Step 1: Text Left, Image Right -->
            <article class="hiw-step-card mb-6" data-aos="fade-up">
                <div class="hiw-step">
                    <div class="hiw-step__content">
                        <h2 class="hiw-step__title">
                            <?php echo htmlspecialchars($howItWorksContent['steps'][0]['title']); ?>
                        </h2>
                        <p class="text-text-secondary mb-4">
                            <?php echo htmlspecialchars($howItWorksContent['steps'][0]['body']); ?>
                        </p>
                        
                        <!-- Ingredient Chips -->
                        <div class="hiw-chips mb-4">
                            <?php foreach ($howItWorksContent['steps'][0]['chips'] as $chip): ?>
                                <button class="hiw-chip" aria-pressed="false">
                                    <?php echo htmlspecialchars($chip); ?>
                                </button>
                            <?php endforeach; ?>
                        </div>
                        
                        <!-- Diet Chips -->
                        <div class="hiw-chips mb-4">
                            <?php foreach ($howItWorksContent['steps'][0]['diet'] as $diet): ?>
                                <button class="hiw-chip" aria-pressed="false">
                                    <?php echo htmlspecialchars($diet); ?>
                                </button>
                            <?php endforeach; ?>
                        </div>
                        
                        <p class="text-sm text-text-secondary">
                            Hint: <?php echo htmlspecialchars($howItWorksContent['steps'][0]['hint']); ?>
                        </p>
                    </div>
                    <div class="hiw-step__media">
                        <div class="hiw-image-container">
                            <img src="<?php echo htmlspecialchars($howItWorksContent['steps'][0]['image']['src']); ?>" 
                                 alt="<?php echo htmlspecialchars($howItWorksContent['steps'][0]['image']['alt']); ?>"
                                 class="hiw-image"
                                 loading="lazy" decoding="async" width="600" height="400">
                        </div>
                    </div>
                </div>
            </article>

            <!-- Step 2: Image Left, Text Right (Z-structure) -->
            <article class="hiw-step-card mb-6" data-aos="fade-up" data-aos-delay="100">
                <div class="hiw-step hiw-step--reverse">
                    <div class="hiw-step__content">
                        <h2 class="hiw-step__title">
                            <?php echo htmlspecialchars($howItWorksContent['steps'][1]['title']); ?>
                        </h2>
                        <ul class="list-disc list-inside space-y-2 text-text-secondary mb-4 pl-4">
                            <?php foreach ($howItWorksContent['steps'][1]['bullets'] as $bullet): ?>
                                <li><?php echo htmlspecialchars($bullet); ?></li>
                            <?php endforeach; ?>
                        </ul>
                        
                        <!-- Progress Rail -->
                        <div class="hiw-progress-rail mb-4" aria-label="Flow">
                            <?php foreach ($howItWorksContent['steps'][1]['flow'] as $index => $step): ?>
                                <span class="hiw-pill-small"><?php echo htmlspecialchars($step); ?></span>
                                <?php if ($index < count($howItWorksContent['steps'][1]['flow']) - 1): ?>
                                    <span class="hiw-arrow">→</span>
                                <?php endif; ?>
                            <?php endforeach; ?>
                        </div>
                        
                        <p class="text-sm text-text-secondary">
                            <?php echo htmlspecialchars($howItWorksContent['steps'][1]['note']); ?>
                        </p>
                    </div>
                    <div class="hiw-step__media">
                        <div class="hiw-image-container">
                            <img src="<?php echo htmlspecialchars($howItWorksContent['steps'][1]['image']['src']); ?>" 
                                 alt="<?php echo htmlspecialchars($howItWorksContent['steps'][1]['image']['alt']); ?>"
                                 class="hiw-image"
                                 loading="lazy" decoding="async" width="600" height="400">
                        </div>
                    </div>
                </div>
            </article>

            <!-- Step 3: Text Left, Image Right (Z-structure) -->
            <article class="hiw-step-card mb-6" data-aos="fade-up" data-aos-delay="200">
                <div class="hiw-step">
                    <div class="hiw-step__content">
                        <h2 class="hiw-step__title">
                            <?php echo htmlspecialchars($howItWorksContent['steps'][2]['title']); ?>
                        </h2>
                        
                        <!-- PDF Structure List -->
                        <div class="hiw-pdf-structure mb-4">
                            <h3 class="font-semibold text-text-main mb-2">Structure</h3>
                            <ul class="space-y-1.5 text-sm text-text-secondary">
                                <?php foreach ($howItWorksContent['steps'][2]['pdfStructure'] as $item): ?>
                                    <?php 
                                    $parts = explode(' —', $item, 2);
                                    $title = $parts[0];
                                    $description = isset($parts[1]) ? ' —' . $parts[1] : '';
                                    ?>
                                    <li><strong class="text-text-main"><?php echo htmlspecialchars($title); ?></strong><?php echo htmlspecialchars($description); ?></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                        
                        <p class="text-sm text-text-secondary">
                            <?php echo htmlspecialchars($howItWorksContent['steps'][2]['microcopy']); ?>
                        </p>
                    </div>
                    <div class="hiw-step__media hiw-step__media--stacked">
                        <?php if (isset($howItWorksContent['steps'][2]['imagePrimary'])): ?>
                            <div class="hiw-image-container hiw-image-small">
                                <img src="<?php echo htmlspecialchars($howItWorksContent['steps'][2]['imagePrimary']['src']); ?>" 
                                     alt="<?php echo htmlspecialchars($howItWorksContent['steps'][2]['imagePrimary']['alt']); ?>"
                                     class="hiw-image"
                                     loading="lazy" decoding="async" width="600" height="300">
                            </div>
                        <?php endif; ?>
                        <?php if (isset($howItWorksContent['steps'][2]['imageDish'])): ?>
                            <div class="hiw-image-container hiw-image-small">
                                <img src="<?php echo htmlspecialchars($howItWorksContent['steps'][2]['imageDish']['src']); ?>" 
                                     alt="<?php echo htmlspecialchars($howItWorksContent['steps'][2]['imageDish']['alt']); ?>"
                                     class="hiw-image"
                                     loading="lazy" decoding="async" width="600" height="300">
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </article>
        </div>
    </section>

    <!-- CTA Footer -->
    <section class="py-6 sm:py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="hiw-cta-footer" data-aos="fade-up">
                <div>
                    <h3 class="text-xl font-bold text-text-main mb-1">
                        <?php echo htmlspecialchars($howItWorksContent['ctaFooter']['title']); ?>
                    </h3>
                    <p class="text-sm text-text-secondary">
                        <?php echo htmlspecialchars($howItWorksContent['ctaFooter']['subtitle']); ?>
                    </p>
                </div>
                <a href="<?php echo htmlspecialchars($howItWorksContent['ctaFooter']['cta']['href']); ?>" 
                   class="hiw-cta-btn">
                    <?php echo htmlspecialchars($howItWorksContent['ctaFooter']['cta']['label']); ?>
                </a>
            </div>
        </div>
    </section>

    <!-- Trust Section -->
    <section class="py-6 sm:py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="hiw-trust" data-aos="fade-up">
                <div class="hiw-trust__content">
                    <h3 class="text-xl font-bold text-text-main mb-2">Why people try RecipeGen</h3>
                    <div class="hiw-badges mb-4">
                        <?php foreach ($howItWorksContent['trust']['badges'] as $badge): ?>
                            <span class="hiw-badge"><?php echo htmlspecialchars($badge); ?></span>
                        <?php endforeach; ?>
                    </div>
                    <div class="hiw-trust-quotes">
                        <?php foreach ($howItWorksContent['trust']['quotes'] as $quote): ?>
                            <div class="hiw-trust-card">
                                "<?php echo htmlspecialchars($quote); ?>"
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
                <div class="hiw-trust__media mt-6 lg:mt-0">
                    <div class="hiw-image-container">
                        <img src="<?php echo htmlspecialchars($howItWorksContent['trust']['image']['src']); ?>" 
                             alt="<?php echo htmlspecialchars($howItWorksContent['trust']['image']['alt']); ?>"
                             class="hiw-image"
                             loading="lazy" decoding="async" width="600" height="400">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-8">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-text-main mb-4" data-aos="fade-up">FAQ</h2>
            <div class="hiw-accordion" id="faq" data-aos="fade-up" data-aos-delay="100">
                <?php foreach ($howItWorksContent['faq'] as $index => $faq): ?>
                    <div class="hiw-acc-item" aria-expanded="false">
                        <button class="hiw-acc-btn">
                            <?php echo htmlspecialchars($faq['q']); ?>
                            <span class="hiw-acc-icon">+</span>
                        </button>
                        <div class="hiw-acc-panel">
                            <?php echo htmlspecialchars($faq['a']); ?>
                        </div>
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

<!-- How It Works Script -->
<script src="<?php echo $base_path; ?>assets/js/howitworks.js?v=<?php echo time(); ?>" defer></script>

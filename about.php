<?php
// about.php - v3 - Extended About page aligned with new design system

// --- Basic Setup ---
require_once __DIR__ . '/config.php';
$page_title = 'About RecipeGen';
// Base path is set by config.php/config.local.php
if (!isset($base_path)) {
    $base_path = '/';
}

// --- Session and User Data (for CTA logic) ---
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

// --- Assets ---
$additional_css = ['assets/css/about.css'];
$additional_js = ['assets/js/about.js'];

// --- URLs ---
$generator_url = $is_logged_in ? $base_path : $base_path . 'register';
$pricing_url = $base_path . '#pricing';
$sustainability_url = $base_path . 'sustainability.php';
$sustainability_stats_url = $sustainability_url . '#estimator';
$nutrition_url = $base_path . 'nutrition.php';
$allergens_url = $base_path . 'allergens.php';

// --- Include Header ---
include __DIR__ . '/templates/header.php';
?>

<main class="about-page">
    <!-- Hero -->
    <section class="about-hero" data-aos="fade-up">
        <div class="about-hero__body">
            <span class="about-pill">ℹ️ About</span>
            <h1 class="about-hero__title">About RecipeGen</h1>
            <p class="about-hero__lead">
                We build an AI-assisted recipe generator that values clarity, accuracy, and real-world cooking. No subscriptions — just tokens.
            </p>
            <div class="about-hero__actions">
                <a href="<?php echo htmlspecialchars($generator_url); ?>"
                   class="about-btn about-btn--primary"
                   data-ev="about_cta_click"
                   data-cta="open_generator">
                    Open generator
                </a>
                <a href="<?php echo htmlspecialchars($pricing_url); ?>"
                   class="about-btn about-btn--secondary"
                   data-ev="about_cta_click"
                   data-cta="see_pricing">
                    See pricing &amp; tokens
                </a>
            </div>
        </div>
        <figure class="about-hero__media">
            <img
                src="<?php echo $base_path; ?>assets/images/about/about-hero.webp"
                alt="Ingredients arranged beside a laptop displaying a recipe workflow."
                width="720"
                height="520"
                loading="eager"
                fetchpriority="high"
                decoding="async"
            >
        </figure>
    </section>

    <!-- Proof Highlights -->
    <section class="about-section">
        <div class="about-grid about-grid--quarters" data-aos="fade-up">
            <article class="about-tile">
                <h3>🧭 Mission</h3>
                <p>Cook smarter with clear PDFs, practical steps, and honest nutrition estimates.</p>
            </article>
            <article class="about-tile">
                <h3>📊 EU Reality</h3>
                <div class="about-kpi">72 kg</div>
                <p>Average household food waste per person in EU‑27 (2022). We design to help you waste less.</p>
            </article>
            <article class="about-tile">
                <h3>⏱️ Minutes, not hours</h3>
                <p>Generate, tweak, export — clean PDFs in minutes.</p>
            </article>
            <article class="about-tile">
                <h3>🔍 Transparent</h3>
                <p>Nutrition estimates with sources and clear caveats. Guidance, not medical advice.</p>
            </article>
        </div>
    </section>

    <!-- How RecipeGen helps -->
    <section class="about-section" data-aos="fade-up">
        <div class="about-card">
            <h2>How RecipeGen helps</h2>
            <ul class="about-bullets">
                <li><strong>Portion scaling:</strong> set servings before you cook.</li>
                <li><strong>Smart substitutions:</strong> swap for what’s already in your fridge.</li>
                <li><strong>Use-it-up ideas:</strong> rescue leftovers with practical transformations.</li>
                <li><strong>Clear PDFs:</strong> ingredients, steps, details (skill/servings/time), storage tips.</li>
            </ul>
        </div>
    </section>

    <!-- Accuracy & Sources -->
    <section class="about-section" data-aos="fade-up">
        <div class="about-card">
            <h2>Accuracy &amp; Sources</h2>
            <p class="about-muted">
                We estimate nutrition from reference databases and scale by your inputs. Brands differ and cooking changes weight — treat numbers as guidance. For allergies/intolerances, consult a clinician.
            </p>
            <div class="about-grid about-grid--halves about-grid--inner">
                <div class="about-tile">
                    <h3>Sources</h3>
                    <ul class="about-bullets">
                        <li>USDA FoodData Central</li>
                        <li>McCance &amp; Widdowson</li>
                        <li>EFSA (where available)</li>
                    </ul>
                </div>
                <div class="about-tile">
                    <h3>Read more</h3>
                    <ul class="about-bullets">
                        <li>
                            <a href="<?php echo htmlspecialchars($nutrition_url); ?>" data-ev="about_read_more_click" data-link="nutrition">
                                Nutrition Guide
                            </a> — how we count kcal &amp; macros
                        </li>
                        <li>
                            <a href="<?php echo htmlspecialchars($allergens_url); ?>" data-ev="about_read_more_click" data-link="allergens">
                                Allergens &amp; Safety
                            </a> — 14 allergens &amp; filters
                        </li>
                        <li>
                            <a href="<?php echo htmlspecialchars($sustainability_url); ?>" data-ev="about_read_more_click" data-link="sustainability">
                                Food Waste &amp; Sustainability
                            </a> — EU data &amp; tips
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Team & Principles -->
    <section class="about-section" data-aos="fade-up">
        <div class="about-grid about-grid--halves">
            <article class="about-card">
                <h3 class="about-card__title">Who we are</h3>
                <p class="about-muted">
                    A small, focused team of food optimists and engineers. We obsess over craftsmanship and the small details that make cooking smoother.
                </p>
                <figure class="about-card__media">
                    <img
                        src="<?php echo $base_path; ?>assets/images/about/about-team.webp"
                        alt="Nutrition-focused workspace with fresh produce and planning tools."
                        width="520"
                        height="320"
                        loading="lazy"
                        decoding="async"
                    >
                </figure>
            </article>
            <article class="about-card">
                <h3 class="about-card__title">Principles</h3>
                <ul class="about-bullets">
                    <li><strong>Clarity over hype.</strong> Keep UI simple, copy honest, choices explicit.</li>
                    <li><strong>Accuracy with caveats.</strong> Estimates, sources, and limits are visible.</li>
                    <li><strong>Realistic visuals.</strong> Natural, unbranded food images; no glossy bait.</li>
                </ul>
                <figure class="about-card__media">
                    <img
                        src="<?php echo $base_path; ?>assets/images/about/about-proof.webp"
                        alt="Desk with planning notes about EU food waste and reusable containers."
                        width="520"
                        height="320"
                        loading="lazy"
                        decoding="async"
                    >
                </figure>
            </article>
        </div>
    </section>

    <!-- Sustainability Note -->
    <section class="about-section" data-aos="fade-up">
        <div class="about-card about-card--accent">
            <div>
                <h2>Sustainability note</h2>
                <p class="about-muted">
                    We care about food waste. Check our EU figures and practical tips to plan, store, and cook with less waste.
                </p>
            </div>
            <div class="about-card__actions">
                <a href="<?php echo htmlspecialchars($sustainability_url); ?>"
                   class="about-btn about-btn--primary"
                   data-ev="about_cta_click"
                   data-cta="open_sustainability">
                    Open Sustainability page
                </a>
                <a href="<?php echo htmlspecialchars($sustainability_stats_url); ?>"
                   class="about-btn about-btn--secondary"
                   data-ev="about_cta_click"
                   data-cta="see_eu_stats">
                    See EU at-a-glance
                </a>
            </div>
        </div>
    </section>

    <!-- Privacy & Data -->
    <section class="about-section" data-aos="fade-up">
        <div class="about-grid about-grid--thirds">
            <article class="about-tile">
                <h3>🔒 Private by default</h3>
                <p>We don’t sell your data. Your recipes live in your account.</p>
            </article>
            <article class="about-tile">
                <h3>🗑️ You control</h3>
                <p>Delete recipes and PDFs anytime from the dashboard.</p>
            </article>
            <article class="about-tile">
                <h3>🧾 Invoices &amp; VAT</h3>
                <p>Invoices are emailed after purchase and stored in Billing.</p>
            </article>
        </div>
    </section>

    <!-- CTA Footer -->
    <section class="about-cta" data-aos="fade-up">
        <div class="about-cta__copy">
            <h3>Ready to cook smarter?</h3>
            <p>Tell us what you’ve got — get a clean, printable PDF in minutes.</p>
        </div>
        <a href="<?php echo htmlspecialchars($generator_url); ?>"
           class="about-btn about-btn--primary"
           data-ev="about_cta_click"
           data-cta="footer_open_generator">
            Open generator
        </a>
    </section>
</main>

<?php include __DIR__ . '/templates/footer.php'; ?>
<?php
// allergens.php - Allergens & Safety page

require_once __DIR__ . '/config.php';
$page_title = 'Allergens & Safety';
if (!isset($base_path)) {
    $base_path = '/';
}

$additional_css = ['assets/css/allergens.css'];

require_once __DIR__ . '/content/allergens.php';

$generator_url = (!empty($is_logged_in) && $is_logged_in) ? $base_path : $base_path . 'login';

include __DIR__ . '/templates/header.php';
?>

<main class="alg-page">
    <section class="alg-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 alg-hero" data-aos="fade-up">
            <div class="alg-hero__body">
                <span class="alg-pill">🛡️ Allergens &amp; Safety</span>
                <h1 class="alg-hero__title">Tell us what to avoid. We’ll filter risks for you.</h1>
                <p class="alg-hero__subtitle">
                    Select allergens to avoid and we’ll remove high-risk matches while flagging potential traces. You can adjust this anytime.
                </p>
                <div class="alg-hero__actions">
                    <a href="<?php echo htmlspecialchars($generator_url); ?>" class="alg-btn alg-btn--primary" data-ev="allergens_back_to_generator_click">
                        Back to generator
                    </a>
                    <a href="<?php echo $base_path; ?>#pricing" class="alg-btn alg-btn--secondary">
                        See pricing &amp; tokens
                    </a>
                </div>
            </div>
            <figure class="alg-hero__media" data-aos="fade-up" data-aos-delay="120">
                <img src="<?php echo $base_path; ?>assets/images/allergens/allergens-hero.webp"
                     alt="Allergen ingredients and safety notes on a counter"
                     width="1200"
                     height="675"
                     loading="eager"
                     decoding="async">
            </figure>
        </div>
    </section>

    <section class="alg-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 alg-layout">
            <section class="alg-card" data-aos="fade-up">
                <h2>Quick allergen setup</h2>
                <p class="muted">Pick allergens to avoid. Generator and samples will apply these filters automatically.</p>

                <div class="alg-grid" id="algGrid" aria-live="polite">
                    <?php foreach ($ALLERGENS as $item): ?>
                        <article class="alg-item" data-key="<?php echo htmlspecialchars($item['key']); ?>">
                            <div class="alg-item__img">
                                <img src="<?php echo $base_path . ltrim($item['img'], '/'); ?>"
                                     alt=""
                                     width="168"
                                     height="112"
                                     loading="lazy"
                                     decoding="async">
                            </div>
                            <div>
                                <div class="alg-item__label"><?php echo htmlspecialchars($item['label']); ?></div>
                                <div class="alg-item__examples"><?php echo htmlspecialchars($item['examples']); ?></div>
                            </div>
                            <label class="alg-switch" aria-label="Toggle <?php echo htmlspecialchars($item['label']); ?>">
                                <input type="checkbox" data-key="<?php echo htmlspecialchars($item['key']); ?>">
                                <span class="alg-switch__track">
                                    <span class="alg-switch__thumb"></span>
                                </span>
                            </label>
                        </article>
                    <?php endforeach; ?>
                </div>
            </section>

            <aside class="alg-card" data-aos="fade-up" data-aos-delay="100">
                <h3>Allergen info</h3>
                <p class="alg-summary__empty" id="summaryEmpty">Toggle any allergen to see details, common sources, and practical tips.</p>
                <div class="alg-summary__badges" id="summaryList" hidden></div>
                <div id="infoPanel" hidden></div>
                <div class="alg-summary__actions">
                    <button type="button" class="alg-btn alg-btn--secondary" id="clearBtn">Clear selection</button>
                    <a href="<?php echo htmlspecialchars($generator_url); ?>" class="alg-btn alg-btn--primary" id="toGenBtn">
                        Back to generator
                    </a>
                </div>
                <div class="alg-summary__note">
                    <strong>Medical disclaimer:</strong> This information is educational only and does not replace professional medical advice. Always consult your healthcare provider.
                </div>
            </aside>
        </div>
    </section>

    <section class="alg-section">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 alg-card alg-card--center" data-aos="fade-up">
            <h3>How filtering works</h3>
            <p class="muted">We scan ingredient names and descriptions for direct matches and common synonyms to reduce risk.</p>
            <div class="alg-flow" aria-label="Filtering process">
                <span class="alg-flow__pill">1. Your preferences</span>
                <span class="alg-flow__arrow">→</span>
                <span class="alg-flow__pill">2. AI scanning</span>
                <span class="alg-flow__arrow">→</span>
                <span class="alg-flow__pill">3. Filtering &amp; flags</span>
            </div>
        </div>
    </section>

    <section class="alg-section">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 alg-note alg-note--warn alg-note--center" data-aos="fade-up">
            <h3 style="margin-top:0;">Cross-contamination notes</h3>
            <ul style="margin:0.75rem 0 0; padding-left:1.25rem;">
                <li>Even when ingredients look safe, manufacturing or kitchens may introduce traces.</li>
                <li>Always check product labels and cross-contact warnings before cooking.</li>
                <li>If you’re uncertain, consult a healthcare professional and choose safer alternatives.</li>
            </ul>
        </div>
    </section>

    <section class="alg-section">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 alg-note alg-note--danger alg-note--center" data-aos="fade-up">
            <h3 style="margin-top:0;">Accuracy &amp; limitations</h3>
            <ul style="margin:0.75rem 0 0; padding-left:1.25rem;">
                <li><strong>Not medical advice.</strong> RecipeGen is for general information only and cannot replace professional guidance.</li>
                <li><strong>Ingredient data varies.</strong> Brand formulations and user inputs differ; we cannot guarantee completeness.</li>
                <li><strong>AI may miss or over-flag.</strong> False negatives/positives are possible—always double-check.</li>
                <li><strong>Kitchen differences.</strong> Times, equipment and yields vary; adjust to your context.</li>
                <li><strong>Nutrition is estimated.</strong> See our Nutrition Guide for methodology and sources.</li>
                <li><strong>You’re in control.</strong> Review ingredients and steps before cooking.</li>
            </ul>
        </div>
    </section>

    <section class="alg-section">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="alg-card alg-faq alg-card--center" data-aos="fade-up">
                <div>
                    <h3 class="text-xl font-bold text-text-main mb-1">
                        Ready to cook smarter?
                    </h3>
                    <p class="text-sm text-text-secondary">
                        Tell us what you’ve got — get a clean, printable recipe PDF in minutes.
                    </p>
                </div>
                <a href="<?php echo htmlspecialchars($generator_url); ?>" class="alg-btn alg-btn--primary">
                    Generate a recipe
                </a>
            </div>
        </div>
    </section>
</main>

<?php include __DIR__ . '/templates/footer.php'; ?>

<script>
    window.__ALLERGENS__ = <?php
        $exposedAllergens = array_map(static function ($item) use ($base_path) {
            $item['img'] = $base_path . ltrim($item['img'], '/');
            return $item;
        }, $ALLERGENS);
        echo json_encode($exposedAllergens, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    ?>;
</script>
<script src="<?php echo $base_path; ?>assets/js/allergens.js?v=<?php echo time(); ?>" defer></script>


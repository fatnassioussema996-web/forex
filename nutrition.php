<?php
// nutrition.php - Nutrition Guide page

require_once __DIR__ . '/config.php';
$page_title = 'Nutrition Guide';
if (!isset($base_path)) {
    $base_path = '/';
}

$additional_css = ['assets/css/nutrition.css'];

$generator_url = (!empty($is_logged_in) && $is_logged_in) ? $base_path : $base_path . 'login';

include __DIR__ . '/templates/header.php';
?>

<main class="nut-page">
    <section class="nut-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 nut-hero" data-aos="fade-up">
            <div class="nut-hero__body">
                <span class="nut-pill">📏 Nutrition</span>
                <h1 class="nut-hero__title">Nutrition Guide — calories &amp; macros, explained</h1>
                <p class="nut-hero__subtitle">
                    How we estimate calories (kcal) and macronutrients (protein, fats, carbs), what affects accuracy, and where the data comes from. Transparent and straightforward.
                </p>
                <div class="nut-hero__actions">
                    <a href="#nutCalc" class="nut-btn nut-btn--primary">Try mini-calculator</a>
                    <a href="#nutSources" class="nut-btn nut-btn--secondary">See sources</a>
                </div>
            </div>
            <figure class="nut-hero__media" data-aos="fade-up" data-aos-delay="100">
                <img src="<?php echo $base_path; ?>assets/images/nutrition/nutrition-hero.webp"
                     alt="Nutrition illustration with macros and measuring spoons"
                     width="1200"
                     height="675"
                     loading="eager"
                     decoding="async">
            </figure>
        </div>
    </section>

    <section class="nut-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="nut-grid nut-grid--cols-4">
                <article class="nut-tile" data-aos="fade-up">
                    <div class="nut-tile__header">
                        <div class="nut-tile__img">
                            <img src="<?php echo $base_path; ?>assets/images/nutrition/method-accuracy.webp"
                                 alt=""
                                 width="96"
                                 height="64"
                                 loading="lazy"
                                 decoding="async">
                        </div>
                        <h3>🔥 Calories</h3>
                    </div>
                    <div class="nut-kpi">Energy estimate</div>
                    <p>Calculated from protein, fat, and carbohydrate values mapped per ingredient.</p>
                </article>

                <article class="nut-tile" data-aos="fade-up" data-aos-delay="50">
                    <div class="nut-tile__header">
                        <div class="nut-tile__img">
                            <img src="<?php echo $base_path; ?>assets/images/nutrition/protein.webp"
                                 alt=""
                                 width="96"
                                 height="64"
                                 loading="lazy"
                                 decoding="async">
                        </div>
                        <h3>🥩 Protein</h3>
                    </div>
                    <div class="nut-kpi">4 kcal/g</div>
                    <p>Supports growth and satiety. Derived from per-ingredient protein values.</p>
                </article>

                <article class="nut-tile" data-aos="fade-up" data-aos-delay="100">
                    <div class="nut-tile__header">
                        <div class="nut-tile__img">
                            <img src="<?php echo $base_path; ?>assets/images/nutrition/carbs.webp"
                                 alt=""
                                 width="96"
                                 height="64"
                                 loading="lazy"
                                 decoding="async">
                        </div>
                        <h3>🥖 Carbs</h3>
                    </div>
                    <div class="nut-kpi">4 kcal/g</div>
                    <p>Sugars, starches, fiber (see notes). Tracked per 100 g and per serving.</p>
                </article>

                <article class="nut-tile" data-aos="fade-up" data-aos-delay="150">
                    <div class="nut-tile__header">
                        <div class="nut-tile__img">
                            <img src="<?php echo $base_path; ?>assets/images/nutrition/fats.webp"
                                 alt=""
                                 width="96"
                                 height="64"
                                 loading="lazy"
                                 decoding="async">
                        </div>
                        <h3>🧈 Fats</h3>
                    </div>
                    <div class="nut-kpi">9 kcal/g</div>
                    <p>Total fat; subtypes (sat/mono/poly) shown when available.</p>
                </article>
            </div>
        </div>
    </section>

    <section class="nut-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="nut-card" data-aos="fade-up">
                <h2>How we calculate</h2>
                <p>
                    Ingredient data is mapped to nutrition databases. We scale values by the raw quantity, then aggregate totals and split per serving.
                </p>
                <div class="nut-flow" aria-label="Calculation process">
                    <span class="nut-flow__pill">1. Ingredients &amp; amounts</span>
                    <span class="nut-flow__arrow">→</span>
                    <span class="nut-flow__pill">2. Match database item</span>
                    <span class="nut-flow__arrow">→</span>
                    <span class="nut-flow__pill">3. Scale by quantity</span>
                    <span class="nut-flow__arrow">→</span>
                    <span class="nut-flow__pill">4. Sum &amp; divide by servings</span>
                </div>
                <div class="nut-equation">
                    <strong>Energy (kcal)</strong> ≈ (Protein_g × 4) + (Carbs_g × 4) + (Fat_g × 9)<br>
                    <span class="nut-small">Alcohol, polyols, and fiber adjustments are not included unless explicitly enabled.</span>
                </div>
            </div>
        </div>
    </section>

    <section class="nut-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="nut-grid nut-grid--cols-2">
                <div class="nut-card" data-aos="fade-up">
                    <h3>Example — per serving</h3>
                    <table class="nut-table" aria-label="Example macro table">
                        <thead>
                            <tr>
                                <th>Macro</th>
                                <th class="nut-table__cell--right">Grams</th>
                                <th class="nut-table__cell--right">kcal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Protein</td>
                                <td class="nut-table__cell--right">28 g</td>
                                <td class="nut-table__cell--right">112</td>
                            </tr>
                            <tr>
                                <td>Carbs</td>
                                <td class="nut-table__cell--right">52 g</td>
                                <td class="nut-table__cell--right">208</td>
                            </tr>
                            <tr>
                                <td>Fat</td>
                                <td class="nut-table__cell--right">18 g</td>
                                <td class="nut-table__cell--right">162</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th></th>
                                <th class="nut-table__cell--right">482 kcal</th>
                            </tr>
                        </tfoot>
                    </table>
                    <div class="nut-bar" role="presentation">
                        <span id="nutExampleProtein" style="width:23%;background:#62d487;"></span>
                        <span id="nutExampleCarb" style="width:43%;background:#7cc7ff;"></span>
                        <span id="nutExampleFat" style="width:34%;background:#ffd27e;"></span>
                    </div>
                    <p class="nut-small">Distribution by calories: Protein 23% • Carbs 43% • Fat 34%</p>
                </div>
                <div class="nut-card" data-aos="fade-up" data-aos-delay="80">
                    <h3>Serving sizes &amp; yield</h3>
                    <p>Totals are divided by the number of servings you set. Adjust servings if cooked yield changes or additional liquid is drained.</p>
                    <ul class="nut-list">
                        <li>Raw ↔ cooked weights vary; pasta, rice and legumes absorb water.</li>
                        <li>Oil left in the pan vs. absorbed changes fat totals per serving.</li>
                        <li>Season-to-taste items (salt, spices) add minimal calories.</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section id="nutCalc" class="nut-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="nut-card" data-aos="fade-up">
                <h2>Mini calorie &amp; macro calculator</h2>
                <p class="nut-small">Enter grams per serving. We’ll estimate calories and macro split.</p>
                <form id="nutCalcForm" class="nut-calculator__grid" novalidate>
                    <div>
                        <label class="nut-small" for="nutProtein">Protein (g)</label>
                        <input type="number" min="0" step="0.1" value="28" id="nutProtein" class="nut-input">
                    </div>
                    <div>
                        <label class="nut-small" for="nutCarbs">Carbs (g)</label>
                        <input type="number" min="0" step="0.1" value="52" id="nutCarbs" class="nut-input">
                    </div>
                    <div>
                        <label class="nut-small" for="nutFat">Fat (g)</label>
                        <input type="number" min="0" step="0.1" value="18" id="nutFat" class="nut-input">
                    </div>
                    <div>
                        <label class="nut-small" for="nutFiber">Fiber (g) <span class="nut-small">(optional)</span></label>
                        <input type="number" min="0" step="0.1" value="6" id="nutFiber" class="nut-input">
                    </div>
                    <div>
                        <button id="nutCalcBtn" class="nut-btn nut-btn--primary" type="submit">Calculate</button>
                    </div>
                    <div>
                        <div class="nut-small">Result</div>
                        <div class="nut-result" id="nutResTotal">—</div>
                    </div>
                </form>

                <div class="nut-grid nut-grid--cols-3" style="margin-top:1.25rem;">
                    <div class="nut-tile">
                        <div class="nut-small">Protein kcal</div>
                        <div class="nut-result" id="nutResProtein">—</div>
                    </div>
                    <div class="nut-tile">
                        <div class="nut-small">Carb kcal</div>
                        <div class="nut-result" id="nutResCarbs">—</div>
                    </div>
                    <div class="nut-tile">
                        <div class="nut-small">Fat kcal</div>
                        <div class="nut-result" id="nutResFat">—</div>
                    </div>
                </div>
                <div class="nut-bar" role="progressbar" aria-label="Protein calorie share">
                    <span id="nutBarProtein" style="width:0;background:#62d487;" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></span>
                    <span id="nutBarCarb" style="width:0;background:#7cc7ff;" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></span>
                    <span id="nutBarFat" style="width:0;background:#ffd27e;" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></span>
                </div>
                <p class="nut-small" id="nutResSplit">—</p>
                <div class="sr-only" aria-live="polite" id="nutResLive">Calculator results will appear here.</div>
            </div>
        </div>
    </section>

    <section class="nut-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="nut-card" data-aos="fade-up">
                <h2>Accuracy &amp; limitations</h2>
                <ul class="nut-list">
                    <li><strong>Databases differ.</strong> Foods vary by brand/region; we map to the closest match.</li>
                    <li><strong>Cooking changes weight.</strong> Water loss/gain shifts per-100g values; defaults use raw reference unless specified.</li>
                    <li><strong>Oil &amp; draining.</strong> Oil left in the pan or drained liquid alters per-serving totals.</li>
                    <li><strong>Fiber &amp; sugar alcohols.</strong> Net-carb adjustments are not applied unless explicitly enabled.</li>
                    <li><strong>Roundings.</strong> The UI rounds grams/kcal; sums may differ by 1–2 units.</li>
                </ul>
                <div class="nut-muted-box">
                    <strong>Not medical advice.</strong> Nutrition info is an estimate for general guidance only. Consult a healthcare professional for personalised advice.
                </div>
            </div>
        </div>
    </section>

    <section id="nutSources" class="nut-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="nut-grid nut-grid--cols-2">
                <div class="nut-card" data-aos="fade-up">
                    <h3>Primary data sources</h3>
                    <ul class="nut-list">
                        <li>USDA FoodData Central</li>
                        <li>McCance &amp; Widdowson’s Composition of Foods</li>
                        <li>EFSA consolidated nutrition info (where available)</li>
                    </ul>
                </div>
                <div class="nut-card" data-aos="fade-up" data-aos-delay="80">
                    <h3>Method notes</h3>
                    <ul class="nut-list">
                        <li>Per-ingredient mapping → scaled by raw amount → summed → divided by servings.</li>
                        <li>When multiple matches exist, we choose the most generic/common item.</li>
                        <li>Optional moisture or fry-oil adjustments may be available in advanced settings.</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="nut-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="nut-card" data-aos="fade-up">
                <h3>FAQ</h3>
                <div class="nut-accordion" id="nutFaq">
                    <?php
                    $nutFaq = [
                        ['q' => 'Why don’t my numbers match the package label?', 'a' => 'Labels vary by brand, moisture, and serving definition. Choose a closer match or adjust servings to reflect your product.'],
                        ['q' => 'Do you subtract fiber from carbs?', 'a' => 'We show total carbohydrates by default. Net-carb subtraction is not applied unless you explicitly enable it.'],
                        ['q' => 'How do you handle cooked vs raw weights?', 'a' => 'Use the format you select (raw or cooked). If unspecified, we default to raw references and divide by servings.'],
                    ];
                    foreach ($nutFaq as $item): ?>
                        <div class="nut-acc-item" aria-expanded="false">
                            <button class="nut-acc-btn" type="button">
                                <?php echo htmlspecialchars($item['q']); ?>
                                <span>+</span>
                            </button>
                            <div class="nut-acc-panel">
                                <?php echo htmlspecialchars($item['a']); ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>

    <section class="nut-section nut-section--tight">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 nut-cta" data-aos="fade-up">
            <div>
                <h3>Ready to generate transparent recipe PDFs?</h3>
                <p>Set servings, pick ingredients, and get a clean macro &amp; calorie breakdown in minutes.</p>
            </div>
            <a href="<?php echo htmlspecialchars($generator_url); ?>" class="nut-btn nut-btn--primary">
                Open generator
            </a>
        </div>
    </section>
</main>

<?php include __DIR__ . '/templates/footer.php'; ?>

<script src="<?php echo $base_path; ?>assets/js/nutrition.js?v=<?php echo time(); ?>" defer></script>


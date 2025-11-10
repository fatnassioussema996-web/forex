<?php
// sustainability.php - Food Waste & Sustainability page

require_once __DIR__ . '/config.php';
$page_title = 'Food Waste & Sustainability';
if (!isset($base_path)) {
    $base_path = '/';
}

$additional_css = ['assets/css/sustainability.css'];

$generator_url = (!empty($is_logged_in) && $is_logged_in) ? $base_path : $base_path . 'login';

include __DIR__ . '/templates/header.php';
?>

<main class="sus-page">
    <section class="sus-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sus-hero" data-aos="fade-up">
            <div>
                <span class="sus-pill">🌍 Sustainability</span>
                <h1 class="sus-hero__title">Food Waste &amp; Sustainability — small habits, big impact</h1>
                <p class="sus-hero__subtitle">Our mission is simple: help you plan, cook and store food smarter, so less ends up in the bin. That saves money, time — and the planet a little breathing room.</p>
                <div class="sus-hero__actions">
                    <a href="#susEstimator" class="sus-btn sus-btn--primary">Estimate your impact</a>
                    <a href="#susTips" class="sus-btn sus-btn--secondary">Quick tips</a>
                </div>
            </div>
            <figure class="sus-hero__media" data-aos="fade-up" data-aos-delay="120">
                <img src="<?php echo $base_path; ?>assets/images/sustainability/sustainability-hero.webp"
                     alt="Reusable containers with labeled leftovers on a kitchen counter; notebook with plan, portion, store."
                     width="1200"
                     height="675"
                     loading="eager"
                     decoding="async">
            </figure>
        </div>
    </section>

    <section class="sus-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sus-grid sus-grid--cols-3">
            <div class="sus-tile" data-aos="fade-up">
                <h3>🎯 Mission</h3>
                <p>Plan with purpose, portion with care, store with confidence. RecipeGen bakes waste-smart choices into your cooking flow.</p>
            </div>
            <div class="sus-tile" data-aos="fade-up" data-aos-delay="80">
                <h3>📊 Why it matters</h3>
                <p>Households are a major source of avoidable food waste. Even modest cuts at home add up across a year.</p>
            </div>
            <div class="sus-tile" data-aos="fade-up" data-aos-delay="140">
                <h3>💶 Your wallet</h3>
                <p>Wasting less means buying less — and stretching each shop further with leftovers and freezer-friendly ideas.</p>
            </div>
        </div>
    </section>

    <section class="sus-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sus-card" data-aos="fade-up">
            <h2>At a glance (EU)</h2>
            <p>EU-27 household averages (2022). Actual impact varies by country, diet and method.</p>
            <p class="sus-small"><strong>Notes (EU, 2022):</strong> Average across EU-27 ≈ <strong>~132 kg</strong> food waste per person across all sectors; households ≈ <strong>~72 kg</strong> (~54%). Country results vary by method and year.</p>
            <div class="sus-grid sus-grid--cols-4" style="margin-top:1.1rem;">
                <article class="sus-tile">
                    <div class="sus-small">Weekly waste (households)</div>
                    <div class="sus-kpi">~5–6 portions/week</div>
                    <div class="sus-small">Portion ≈ 250 g</div>
                </article>
                <article class="sus-tile">
                    <div class="sus-small">Annual waste mass</div>
                    <div class="sus-kpi">~72 kg per person</div>
                    <div class="sus-small">Households, EU-27, 2022 (Eurostat/UNEP)</div>
                </article>
                <article class="sus-tile">
                    <div class="sus-small">CO₂e footprint</div>
                    <div class="sus-kpi">~1–4 kg CO₂e per kg</div>
                    <div class="sus-small">Food types differ widely</div>
                </article>
                <article class="sus-tile">
                    <div class="sus-small">Money saved</div>
                    <div class="sus-kpi">Calculator below</div>
                    <div class="sus-small">Set your local prices</div>
                </article>
            </div>
        </div>
    </section>

    <section id="susEstimator" class="sus-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sus-card" data-aos="fade-up">
            <div class="sus-grid sus-grid--cols-2" style="align-items:center;">
                <div>
                    <h2>Personal impact estimator</h2>
                    <p>A rough guide. Enter your typical leftovers to see what reducing waste could mean across a year.</p>
                    <form class="sus-estimator__grid" novalidate>
                        <div>
                            <label class="sus-small" for="susPortions">Avoidable portions wasted per week</label>
                            <input id="susPortions" class="sus-input" type="number" min="0" step="0.1" value="5.5">
                            <div class="sus-small">One portion ≈ 250 g</div>
                        </div>
                        <div>
                            <label class="sus-small" for="susGrams">Avg portion weight (g)</label>
                            <input id="susGrams" class="sus-input" type="number" min="50" step="10" value="250">
                            <div class="sus-small">Cooked food varies; this is a proxy</div>
                        </div>
                        <div>
                            <label class="sus-small" for="susPrice">€ per kg (local)</label>
                            <input id="susPrice" class="sus-input" type="number" min="0" step="0.1" value="6">
                            <div class="sus-small">Optional — for savings estimate</div>
                        </div>
                        <div>
                            <button id="susCalcBtn" class="sus-btn sus-btn--primary" type="button">Calculate</button>
                        </div>
                    </form>
                    <p class="sus-estimator-note">CO₂e varies widely by food type. We show an indicative range of ~1–4 kg CO₂e per kg of food waste.</p>
                </div>
                <div>
                    <div class="sus-grid sus-grid--cols-3">
                        <article class="sus-tile">
                            <div class="sus-small">Yearly waste mass</div>
                            <div class="sus-result" id="susOutKg">—</div>
                        </article>
                        <article class="sus-tile">
                            <div class="sus-small">Yearly savings (€)</div>
                            <div class="sus-result" id="susOutMoney">—</div>
                        </article>
                        <article class="sus-tile">
                            <div class="sus-small">Indicative CO₂e range</div>
                            <div class="sus-result" id="susOutCo2">—</div>
                        </article>
                    </div>
                    <p class="sus-small" id="susCalcLive" class="sus-live" aria-live="polite">Calculator results will appear here.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="susTips" class="sus-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sus-grid sus-grid--cols-2">
            <article class="sus-tip-card" data-aos="fade-up">
                <div class="sus-tip-card__img">
                    <img src="<?php echo $base_path; ?>assets/images/sustainability/tips-planning.webp"
                         alt="Fridge shelf with labeled containers arranged first-in first-out."
                         width="600"
                         height="400"
                         loading="lazy"
                         decoding="async">
                </div>
                <h3>Plan &amp; shop</h3>
                <div class="sus-tip"><b>📝</b><div><strong>List it.</strong> Plan meals around what you already have. Buy for the servings you’ll actually cook.</div></div>
                <div class="sus-tip"><b>📦</b><div><strong>First in, first out.</strong> Rotate pantry & fridge; put older items in front.</div></div>
                <div class="sus-tip"><b>🏷️</b><div><strong>Date labels.</strong> “Use by” is safety; “Best before” is quality. Trust senses, not panic.</div></div>
            </article>

            <article class="sus-tip-card" data-aos="fade-up" data-aos-delay="70">
                <div class="sus-tip-card__img">
                    <img src="<?php echo $base_path; ?>assets/images/sustainability/tips-storage.webp"
                         alt="Containers, date stickers, vacuum bags, herbs stored in water."
                         width="600"
                         height="400"
                         loading="lazy"
                         decoding="async">
                </div>
                <h3>Store smart</h3>
                <div class="sus-tip"><b>❄️</b><div><strong>Freeze portions.</strong> Label dates; cool leftovers quickly and freeze flat.</div></div>
                <div class="sus-tip"><b>🥶</b><div><strong>Zones matter.</strong> Keep fridge 0–5°C; seal leafy greens; store herbs in a jar with water.</div></div>
                <div class="sus-tip"><b>🧴</b><div><strong>Containers.</strong> Clear boxes help you see &amp; use food before it spoils.</div></div>
            </article>

            <article class="sus-tip-card" data-aos="fade-up" data-aos-delay="140">
                <div class="sus-tip-card__img">
                    <img src="<?php echo $base_path; ?>assets/images/sustainability/estimator-desk.webp"
                         alt="Notebook with formula converting portions to yearly kilograms and euros saved."
                         width="600"
                         height="400"
                         loading="lazy"
                         decoding="async">
                </div>
                <h3>Cook &amp; portion</h3>
                <div class="sus-tip"><b>⚖️</b><div><strong>Scale recipes.</strong> In RecipeGen, set servings realistically; avoid huge batches you won’t eat.</div></div>
                <div class="sus-tip"><b>🥘</b><div><strong>One-pot wins.</strong> Soups, stews, frittatas rescue odd veggies & scraps.</div></div>
                <div class="sus-tip"><b>🍝</b><div><strong>Leftover-first meals.</strong> Start dinner by checking last night’s fridge row.</div></div>
            </article>

            <article class="sus-tip-card" data-aos="fade-up" data-aos-delay="210">
                <div class="sus-tip-card__img">
                    <img src="<?php echo $base_path; ?>assets/images/sustainability/tips-leftovers.webp"
                         alt="Stale bread converted into croutons, leftover proteins repurposed."
                         width="600"
                         height="400"
                         loading="lazy"
                         decoding="async">
                </div>
                <h3>Leftovers ideas</h3>
                <div class="sus-tip"><b>🍚</b><div><strong>Rice → fried rice.</strong> Add eggs/veg; reheat thoroughly.</div></div>
                <div class="sus-tip"><b>🍗</b><div><strong>Roast chicken → tacos/salad.</strong> Shred with spices, add fresh toppings.</div></div>
                <div class="sus-tip"><b>🍞</b><div><strong>Stale bread → croutons/crumbs.</strong> Oven-dry; store airtight.</div></div>
            </article>
        </div>
    </section>

    <section class="sus-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sus-card sus-card--center" data-aos="fade-up">
            <div class="sus-reduce">
                <div class="sus-reduce__content">
                    <h2>How RecipeGen reduces waste</h2>
                    <ul class="sus-list">
                        <li><strong>Portion scaling:</strong> set servings before you cook to match your household.</li>
                        <li><strong>Smart substitutions:</strong> swap ingredients you don’t have for ones in your fridge.</li>
                        <li><strong>Use-it-up suggestions:</strong> generate ideas based on what’s left.</li>
                        <li><strong>PDF clarity:</strong> clear storage &amp; reheating notes help you use leftovers safely.</li>
                    </ul>
                </div>
                <figure class="sus-reduce__img">
                    <img src="<?php echo $base_path; ?>assets/images/sustainability/community-donate-compost.webp"
                         alt="Crate labeled donate and kitchen compost caddy filled with peels and coffee grounds."
                         width="400"
                         height="320"
                         loading="lazy"
                         decoding="async">
                </figure>
            </div>
        </div>
    </section>

    <section class="sus-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sus-grid sus-grid--cols-2">
            <div class="sus-card" data-aos="fade-up">
                <h3>FAQ</h3>
                <div class="sus-accordion" id="susFaq">
                    <?php
                    $faqItems = [
                        ['q' => 'Is freezing always safe?', 'a' => 'Freeze promptly, label dates, and reheat thoroughly. Some textures change (e.g., leafy greens), but safety comes first.'],
                        ['q' => 'Do “Best before” foods have to be binned?', 'a' => 'Not necessarily. It’s about quality, not safety. Assess smell/texture/appearance and follow local guidance.'],
                        ['q' => 'Will recipe scaling change taste?', 'a' => 'Seasoning scales non-linearly; taste and adjust. We keep instructions clear to help you balance flavors.'],
                    ];
                    foreach ($faqItems as $item): ?>
                        <div class="sus-acc-item" aria-expanded="false">
                            <button class="sus-acc-btn" type="button">
                                <?php echo htmlspecialchars($item['q']); ?>
                                <span>+</span>
                            </button>
                            <div class="sus-acc-panel">
                                <?php echo htmlspecialchars($item['a']); ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="sus-sources" data-aos="fade-up" data-aos-delay="100">
                <h3>Sources &amp; further reading</h3>
                <div class="sus-source-item">Eurostat — EU food waste statistics (EU-27, 2022): ~132 kg/person total; households ~72 kg (~54%).</div>
                <div class="sus-source-item">UNEP — Food Waste Index Report 2024: global &amp; national estimates, methodology.</div>
                <div class="sus-source-item">Malefors et al., 2025 (ScienceDirect): indicative carbon footprint ≈ ~1.3 kg CO₂e/kg; category differences are large.</div>
                <div class="sus-source-item">Liu et al., 2023 (MDPI Foods): household food-waste carbon footprints by category and region; wide variability.</div>
            </div>
        </div>
    </section>

    <section class="sus-section sus-section--tight">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 sus-cta" data-aos="fade-up">
            <div>
                <h3>Turn leftovers into your next meal</h3>
                <p>Scale servings, swap smart, and keep a tidy fridge. RecipeGen can help at each step.</p>
            </div>
            <a href="<?php echo htmlspecialchars($generator_url); ?>" class="sus-btn sus-btn--primary">
                Open generator
            </a>
        </div>
    </section>
</main>

<?php include __DIR__ . '/templates/footer.php'; ?>

<script src="<?php echo $base_path; ?>assets/js/sustainability.js?v=<?php echo time(); ?>" defer></script>


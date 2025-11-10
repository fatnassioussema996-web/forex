<?php
// faq.php - v3 - Extended FAQ with structured categories

// --- Basic Setup ---
require_once __DIR__ . '/config.php';
$page_title = 'Frequently Asked Questions';
// Base path is set by config.php/config.local.php
if (!isset($base_path)) {
    $base_path = '/';
} 

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

$additional_css = ['assets/css/faq.css'];
$additional_js = ['assets/js/faq.js'];

// Related links for cross-navigation
$pricing_url = $base_path . '#pricing';
$allergens_url = $base_path . 'allergens.php';
$payment_policy_url = $base_path . 'pages/payment-policy';
$refund_policy_url = $base_path . 'pages/refund-policy';
$privacy_policy_url = $base_path . 'pages/privacy-policy';
$contact_url = $base_path . 'contact';

// --- Include Header ---
include __DIR__ . '/templates/header.php';
?>

<main class="faq-page">
    <section class="faq-hero" data-aos="fade-up">
        <div class="faq-hero__body">
            <span class="faq-pill">❓ FAQ</span>
            <h1 class="faq-hero__title">FAQ — Accuracy, Allergens, Tokens &amp; Refunds</h1>
            <p class="faq-hero__lead">
                Clear answers to the most common questions about how our recipes are generated, how accurate nutrition is, how allergen filters work, and how tokens, cancellations and refunds are handled.
            </p>

            <div class="faq-hero__search" role="search">
                <label class="sr-only" for="faqSearch">Search questions</label>
                <input
                    id="faqSearch"
                    type="search"
                    class="faq-input"
                    placeholder="Search questions… (e.g., ‘allergens’, ‘accuracy’, ‘refund’)"
                    autocomplete="off"
                    data-ev="faq_search_input"
                >
                <label class="sr-only" for="faqCategory">Filter by category</label>
                <select id="faqCategory" class="faq-select" data-ev="faq_category_change" aria-label="Filter questions by category">
                    <option value="all">All categories</option>
                    <option value="accuracy">Accuracy</option>
                    <option value="allergens">Allergens &amp; Safety</option>
                    <option value="payments">Payments, Tokens &amp; Refunds</option>
                    <option value="account">Account &amp; Data</option>
                    <option value="troubleshoot">Troubleshooting</option>
                    <option value="legal">Legal</option>
                </select>
            </div>
            <p id="faqResultsCount" class="faq-hero__results" aria-live="polite">Showing 24 questions</p>
            <p class="faq-hero__meta">
                Quick links:
                <a href="<?php echo htmlspecialchars($allergens_url); ?>">Allergens &amp; Safety</a>,
                <a href="<?php echo htmlspecialchars($pricing_url); ?>">Pricing &amp; Tokens</a>,
                <a href="<?php echo htmlspecialchars($payment_policy_url); ?>">Payment Policy</a>,
                <a href="<?php echo htmlspecialchars($refund_policy_url); ?>">Refund Policy</a>,
                <a href="<?php echo htmlspecialchars($privacy_policy_url); ?>">Privacy</a>
            </p>
        </div>
        <figure class="faq-hero__media">
            <img
                src="<?php echo $base_path; ?>assets/images/faq/faq-hero.webp"
                alt="Clean help-center illustration with search bar and category cards."
                width="720"
                height="520"
                loading="eager"
                fetchpriority="high"
                decoding="async"
            >
        </figure>
    </section>

    <section class="faq-grid-section">
        <div class="faq-grid" id="faqGrid">
            <article class="faq-card" data-cat="accuracy" data-aos="fade-up">
                <figure class="faq-card__media">
                    <img src="<?php echo $base_path; ?>assets/images/faq/faq-accuracy.webp"
                         alt="Charts and a nutrition table on a screen with a checkmark."
                         width="480"
                         height="320"
                         loading="lazy"
                         decoding="async">
                </figure>
                <div class="faq-card__body">
                    <h2 class="faq-card__title">Accuracy &amp; Method</h2>
                    <p class="faq-card__summary">How we calculate nutrition, what affects accuracy, and how to interpret totals.</p>
                </div>
                <div class="faq-accordion" data-cat="accuracy">
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-accuracy-1" id="faq-accordion-accuracy-1">
                            <span>How accurate is nutrition info?</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-accuracy-1" role="region" aria-labelledby="faq-accordion-accuracy-1" hidden>
                            <p>We estimate using standard factors and reference databases. Brands differ and cooking changes weight, so expect small deviations. Use as guidance, not medical advice.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-accuracy-2" id="faq-accordion-accuracy-2">
                            <span>Why don’t numbers match my package label?</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-accuracy-2" role="region" aria-labelledby="faq-accordion-accuracy-2" hidden>
                            <p>Labels vary by brand, country and serving basis. Pick a closer ingredient match or adjust servings. Minor rounding differences are normal.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-accuracy-3" id="faq-accordion-accuracy-3">
                            <span>Do you subtract fiber/net carbs?</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-accuracy-3" role="region" aria-labelledby="faq-accordion-accuracy-3" hidden>
                            <p>By default we show total carbs. Net-carb subtraction (fiber/sugar alcohols) appears only when explicitly enabled in settings.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-accuracy-4" id="faq-accordion-accuracy-4">
                            <span>Raw vs. cooked weights?</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-accuracy-4" role="region" aria-labelledby="faq-accordion-accuracy-4" hidden>
                            <p>We scale values based on the form you select (raw/cooked). If unspecified, we default to raw references and divide totals by the servings you set.</p>
                        </div>
                    </div>
                </div>
            </article>

            <article class="faq-card" data-cat="allergens" data-aos="fade-up" data-aos-delay="50">
                <figure class="faq-card__media">
                    <img src="<?php echo $base_path; ?>assets/images/faq/faq-allergens.webp"
                         alt="Allergen icons grid (14 EU allergens) with a safety shield."
                         width="480"
                         height="320"
                         loading="lazy"
                         decoding="async">
                </figure>
                <div class="faq-card__body">
                    <h2 class="faq-card__title">Allergens &amp; Safety</h2>
                    <p class="faq-card__summary">Understand our allergen coverage and how to use filters responsibly.</p>
                </div>
                <div class="faq-accordion" data-cat="allergens">
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-allergens-1" id="faq-accordion-allergens-1">
                            <span>How do allergen filters work?</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-allergens-1" role="region" aria-labelledby="faq-accordion-allergens-1" hidden>
                            <p>Select allergens to exclude. We avoid ingredients tagged with those allergens and suggest swaps where possible. Always verify labels for cross-contact.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-allergens-2" id="faq-accordion-allergens-2">
                            <span>Which allergens do you support?</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-allergens-2" role="region" aria-labelledby="faq-accordion-allergens-2" hidden>
                            <p>We cover the 14 EU allergens (gluten, crustaceans, eggs, fish, peanuts, soybeans, milk, tree nuts, celery, mustard, sesame, sulphites, lupin, molluscs). See the Allergens &amp; Safety page for details.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-allergens-3" id="faq-accordion-allergens-3">
                            <span>Is this medical or dietetic advice?</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-allergens-3" role="region" aria-labelledby="faq-accordion-allergens-3" hidden>
                            <p>No. Information is general guidance only. For diagnoses, intolerances, or therapeutic diets, consult a qualified clinician or dietitian.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-allergens-4" id="faq-accordion-allergens-4">
                            <span>Can you guarantee no traces?</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-allergens-4" role="region" aria-labelledby="faq-accordion-allergens-4" hidden>
                            <p>We cannot guarantee absence of traces due to supply chains and kitchens. Always check product labels and follow your doctor’s advice.</p>
                        </div>
                    </div>
                </div>
            </article>

            <article class="faq-card" data-cat="payments" data-aos="fade-up" data-aos-delay="100">
                <figure class="faq-card__media">
                    <img src="<?php echo $base_path; ?>assets/images/faq/faq-tokens.webp"
                         alt="Wallet with tokens and a confirmation dialog."
                         width="480"
                         height="320"
                         loading="lazy"
                         decoding="async">
                </figure>
                <div class="faq-card__body">
                    <h2 class="faq-card__title">Payments, Tokens &amp; Refunds</h2>
                    <p class="faq-card__summary">How tokens work, when cancellations are possible, and how we handle refunds.</p>
                </div>
                <div class="faq-card__note">No subscription. You top up tokens and spend them on generations. Transparent pricing lives on the pricing page.</div>
                <div class="faq-accordion" data-cat="payments">
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-payments-1" id="faq-accordion-payments-1">
                            <span>How do tokens work?</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-payments-1" role="region" aria-labelledby="faq-accordion-payments-1" hidden>
                            <p>Buy tokens in packs. Each generation costs a small token amount shown before you confirm. Unused tokens remain on your balance.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-payments-2" id="faq-accordion-payments-2">
                            <span>Can I cancel an order?</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-payments-2" role="region" aria-labelledby="faq-accordion-payments-2" hidden>
                            <p>If a generation hasn’t started yet, you can cancel from the queue and tokens are not deducted. Once generation begins, tokens are consumed.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-payments-3" id="faq-accordion-payments-3">
                            <span>Refund policy (tokens)</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-payments-3" role="region" aria-labelledby="faq-accordion-payments-3" hidden>
                            <p><strong>Eligible:</strong> duplicate purchases, technical failure on our side, or unauthorized charge (once verified). In such cases we restore tokens or refund the payment method.</p>
                            <p><strong>Not eligible:</strong> subjective dissatisfaction with taste/photos where the generator functioned as designed. You can regenerate with different inputs.</p>
                            <p class="faq-panel-note">To request a review, contact support with your email, payment ID, and a brief description. We respond within 2 business days.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-payments-4" id="faq-accordion-payments-4">
                            <span>Chargebacks &amp; disputes</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-payments-4" role="region" aria-labelledby="faq-accordion-payments-4" hidden>
                            <p>We’ll work with you to resolve issues quickly. Filing a chargeback pauses your account while we investigate. Provide context to accelerate resolution.</p>
                        </div>
                    </div>
                </div>
            </article>

            <article class="faq-card" data-cat="account" data-aos="fade-up" data-aos-delay="150">
                <figure class="faq-card__media">
                    <img src="<?php echo $base_path; ?>assets/images/faq/faq-account.webp"
                         alt="User profile panel and a privacy toggle."
                         width="480"
                         height="320"
                         loading="lazy"
                         decoding="async">
                </figure>
                <div class="faq-card__body">
                    <h2 class="faq-card__title">Account, Data &amp; Privacy</h2>
                    <p class="faq-card__summary">Learn why you need an account, what we store, and how to handle invoices or data deletion.</p>
                </div>
                <div class="faq-accordion" data-cat="account">
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-account-1" id="faq-accordion-account-1">
                            <span>Do I need an account?</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-account-1" role="region" aria-labelledby="faq-accordion-account-1" hidden>
                            <p>Yes, to save recipes, track tokens, and export PDFs. Email sign-in; no social login required.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-account-2" id="faq-accordion-account-2">
                            <span>Do you store my ingredients or PDFs?</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-account-2" role="region" aria-labelledby="faq-accordion-account-2" hidden>
                            <p>We store your generated results in your account for convenience. You can delete them anytime from the dashboard.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-account-3" id="faq-accordion-account-3">
                            <span>How do I delete my data?</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-account-3" role="region" aria-labelledby="faq-accordion-account-3" hidden>
                            <p>Go to <span class="faq-kbd">Account → Privacy</span> and request deletion. We’ll confirm by email when it’s complete.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-account-4" id="faq-accordion-account-4">
                            <span>Invoices &amp; VAT?</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-account-4" role="region" aria-labelledby="faq-accordion-account-4" hidden>
                            <p>Invoices are emailed after purchase and available in <span class="faq-kbd">Account → Billing</span>. VAT handling follows your billing country rules.</p>
                        </div>
                    </div>
                </div>
            </article>

            <article class="faq-card" data-cat="troubleshoot" data-aos="fade-up" data-aos-delay="200">
                <figure class="faq-card__media">
                    <img src="<?php echo $base_path; ?>assets/images/faq/faq-troubleshoot.webp"
                         alt="Wrench and document next to a laptop with a warning badge."
                         width="480"
                         height="320"
                         loading="lazy"
                         decoding="async">
                </figure>
                <div class="faq-card__body">
                    <h2 class="faq-card__title">Troubleshooting</h2>
                    <p class="faq-card__summary">Get unstuck quickly with practical tips and quick fixes for common hiccups.</p>
                </div>
                <div class="faq-accordion" data-cat="troubleshoot">
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-troubleshoot-1" id="faq-accordion-troubleshoot-1">
                            <span>Recipe looks off / wrong style</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-troubleshoot-1" role="region" aria-labelledby="faq-accordion-troubleshoot-1" hidden>
                            <p>Use <em>Generate similar</em> with clearer goals (diet, cuisine, time). Add or exclude ingredients. Small changes improve results a lot.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-troubleshoot-2" id="faq-accordion-troubleshoot-2">
                            <span>Image didn’t load in PDF</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-troubleshoot-2" role="region" aria-labelledby="faq-accordion-troubleshoot-2" hidden>
                            <p>Check your connection and re-download. If it persists, regenerate; tokens are adjusted if our service was at fault.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-troubleshoot-3" id="faq-accordion-troubleshoot-3">
                            <span>Payment went through but tokens not added</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-troubleshoot-3" role="region" aria-labelledby="faq-accordion-troubleshoot-3" hidden>
                            <p>Wait 1–2 minutes. If still missing, refresh and check <span class="faq-kbd">Account → Billing</span>. Contact support with your payment ID if unresolved.</p>
                        </div>
                    </div>
                </div>
            </article>

            <article class="faq-card" data-cat="legal" data-aos="fade-up" data-aos-delay="250">
                <figure class="faq-card__media">
                    <img src="<?php echo $base_path; ?>assets/images/faq/faq-legal.webp"
                         alt="Scales of justice beside a document with a disclaimer ribbon."
                         width="480"
                         height="320"
                         loading="lazy"
                         decoding="async">
                </figure>
                <div class="faq-card__body">
                    <h2 class="faq-card__title">Legal &amp; Disclaimers</h2>
                    <p class="faq-card__summary">Our policy on medical advice, ownership, and acceptable use of RecipeGen.</p>
                </div>
                <div class="faq-accordion" data-cat="legal">
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-legal-1" id="faq-accordion-legal-1">
                            <span>Medical disclaimer</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-legal-1" role="region" aria-labelledby="faq-accordion-legal-1" hidden>
                            <p>Not medical advice. For allergies, intolerances, or medical conditions, consult a qualified clinician. Use allergen filters as a helper, not a guarantee.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-legal-2" id="faq-accordion-legal-2">
                            <span>Content ownership</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-legal-2" role="region" aria-labelledby="faq-accordion-legal-2" hidden>
                            <p>You own your generated recipes and PDFs. You grant us a limited license to host them in your account. Delete anytime from the dashboard.</p>
                        </div>
                    </div>
                    <div class="faq-acc-item">
                        <button class="faq-acc-btn" type="button" aria-expanded="false" aria-controls="faq-panel-legal-3" id="faq-accordion-legal-3">
                            <span>Acceptable use</span>
                            <svg class="faq-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="faq-acc-panel" id="faq-panel-legal-3" role="region" aria-labelledby="faq-accordion-legal-3" hidden>
                            <p>Don’t upload illegal content or violate third-party rights. We may limit accounts that abuse the service.</p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
        <div id="faqEmpty" class="faq-empty" hidden>
            <h3>No questions match your filters 🤔</h3>
            <p>Try adjusting the category or search term, or explore our <a href="<?php echo htmlspecialchars($pricing_url); ?>">pricing</a> and <a href="<?php echo htmlspecialchars($allergens_url); ?>">allergen</a> guides.</p>
        </div>
    </section>

    <section class="faq-cta" data-aos="fade-up">
        <div class="faq-cta__body">
            <h3>Didn’t find your answer?</h3>
            <p>Contact us and we’ll help. Most tickets are resolved within 48 hours.</p>
        </div>
        <a class="faq-cta__button" href="<?php echo htmlspecialchars($contact_url); ?>" data-ev="faq_contact_support_click">Contact support</a>
    </section>
</main>

<?php include __DIR__ . '/templates/footer.php'; ?>
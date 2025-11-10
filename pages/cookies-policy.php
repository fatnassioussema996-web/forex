<?php
// pages/cookies-policy.php - v3 - Redesigned with Tailwind CSS

$page_title = 'Cookies Policy';

// For files in subdirectories, the base path MUST point to the root.
$base_path = '/';

// --- Session and User Data (good practice for header) ---
$current_user_data = null;
$is_logged_in = false;
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (isset($_SESSION['user_id'])) {
    // Note: No need to fetch user data for public policy pages,
    // but the logic is kept for header consistency.
    $is_logged_in = true;
}

// --- Include Header ---
require_once __DIR__ . '/../currency-utils.php';
require_once __DIR__ . '/../policy_helpers.php';
include __DIR__ . '/../templates/header.php';
?>

<main class="bg-white">
    <!-- Main Content Area -->
    <div class="py-16 sm:py-20">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center" data-aos="fade-up">
                <h1 class="text-3xl font-extrabold text-text-main sm:text-4xl lg:text-5xl">Cookies Policy</h1>
                <p class="mt-3 text-base text-text-secondary">Effective date: 18 September 2025</p>
            </div>

            <div class="mt-10 space-y-10 text-text-secondary" data-aos="fade-up" data-aos-delay="100">
                <section>
                    <h2 class="text-xl font-semibold text-text-main">1. Overview</h2>
                    <p class="mt-3">This Cookies Policy explains how RecipeGen (“we”, “us”, “our”) uses cookies and similar technologies (including localStorage, sessionStorage, pixels, and SDKs) on recipegen.co.uk and related services (the “Service”). It complements our Privacy Policy.</p>
                    <p class="mt-2">By interacting with our cookie banner or the preferences center, you can manage consent to non-essential cookies as described below.</p>
                    <p class="mt-2"><strong>Controller:</strong> WINTER WORLD LIMITED (Company No. 16133390), 16 Tiller Road, London, England, E14 8PX.<br>
                    <strong>Contact:</strong> <a class="text-primary hover:underline" href="mailto:info@recipegen.co.uk">info@recipegen.co.uk</a></p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">2. What are cookies (and similar technologies)?</h2>
                    <p class="mt-3">Cookies are small files placed on your device by a website. They help the site:</p>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>run essential functions (e.g., login sessions, CSRF protection),</li>
                        <li>remember preferences (e.g., language),</li>
                        <li>measure performance and reliability, and — where you consent —</li>
                        <li>enable analytics and marketing/attribution.</li>
                    </ul>
                    <p class="mt-2">Similar technologies (treated similarly for consent) include: localStorage/sessionStorage keys, SDK identifiers, tracking pixels, and device/browser identifiers.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">3. Categories we use</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li><strong>Necessary / Essential</strong> – required for core functionality (authentication, security, session management, load balancing, consent logging). These do not require consent.</li>
                        <li><strong>Functional</strong> – remember choices (language, UI layout, saved generator inputs where you opt in).</li>
                        <li><strong>Performance / Analytics</strong> – help us understand usage, errors, and page speed so we can improve reliability. Depending on the tool, we rely on consent or legitimate interests (with strict configuration) where appropriate.</li>
                        <li><strong>Marketing / Advertising</strong> – set only if you enable them; used for campaign attribution, remarketing, and measuring the effectiveness of our ads.</li>
                        <li><strong>Security / Anti-abuse</strong> – detect unusual activity, mitigate fraud and bot traffic.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">4. Typical cookies & storage keys (examples)</h2>
                    <p class="mt-3">Names and lifetimes can vary by release and provider. The current, authoritative list appears in the Cookie Settings panel.</p>
                    <div class="mt-4 overflow-x-auto">
                        <table class="min-w-full border border-border text-sm">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-3 py-2 text-left font-semibold text-text-main border-b border-border">Name (example)</th>
                                    <th class="px-3 py-2 text-left font-semibold text-text-main border-b border-border">Purpose</th>
                                    <th class="px-3 py-2 text-left font-semibold text-text-main border-b border-border">Category</th>
                                    <th class="px-3 py-2 text-left font-semibold text-text-main border-b border-border">Typical lifetime</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="px-3 py-2 border-b border-border">session_id</td>
                                    <td class="px-3 py-2 border-b border-border">Maintains authenticated session</td>
                                    <td class="px-3 py-2 border-b border-border">Necessary</td>
                                    <td class="px-3 py-2 border-b border-border">Session</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2 border-b border-border">csrf_token</td>
                                    <td class="px-3 py-2 border-b border-border">CSRF protection</td>
                                    <td class="px-3 py-2 border-b border-border">Necessary</td>
                                    <td class="px-3 py-2 border-b border-border">Session</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2 border-b border-border">consent_state</td>
                                    <td class="px-3 py-2 border-b border-border">Stores your banner/settings choices</td>
                                    <td class="px-3 py-2 border-b border-border">Necessary/Functional</td>
                                    <td class="px-3 py-2 border-b border-border">6–12 months</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2 border-b border-border">ui_prefs</td>
                                    <td class="px-3 py-2 border-b border-border">Language, theme, layout</td>
                                    <td class="px-3 py-2 border-b border-border">Functional</td>
                                    <td class="px-3 py-2 border-b border-border">~6 months</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2 border-b border-border">perf_metrics</td>
                                    <td class="px-3 py-2 border-b border-border">Page performance & errors</td>
                                    <td class="px-3 py-2 border-b border-border">Analytics</td>
                                    <td class="px-3 py-2 border-b border-border">1–3 months</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2 border-b border-border">campaign_src</td>
                                    <td class="px-3 py-2 border-b border-border">UTM/campaign attribution</td>
                                    <td class="px-3 py-2 border-b border-border">Marketing</td>
                                    <td class="px-3 py-2 border-b border-border">1–3 months</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2 border-b border-border">rg_token_hint (localStorage)</td>
                                    <td class="px-3 py-2 border-b border-border">Optional: remembers last token pack view</td>
                                    <td class="px-3 py-2 border-b border-border">Functional</td>
                                    <td class="px-3 py-2 border-b border-border">Until cleared</td>
                                </tr>
                                <tr>
                                    <td class="px-3 py-2 border-b border-border">rg_generator_prefs (localStorage)</td>
                                    <td class="px-3 py-2 border-b border-border">Optional: saves generator form preferences</td>
                                    <td class="px-3 py-2 border-b border-border">Functional</td>
                                    <td class="px-3 py-2 border-b border-border">Until cleared</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">5. Consent and lawful basis</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>Essential cookies are strictly necessary and do not require consent.</li>
                        <li>Non-essential cookies (Functional, Analytics, Marketing) are set only after you consent via the banner or preferences center, unless we use a tightly-scoped analytics configuration that relies on legitimate interests (no cross-site tracking, IP truncation, aggregated reports).</li>
                        <li>Our lawful bases may include performance of contract (to run the Service), consent, and legitimate interests (e.g., service improvement, fraud prevention). Details are in our Privacy Policy.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">6. How we record and retain consent</h2>
                    <p class="mt-3">When you save a choice, we record: the consent categories you selected, a policy/version reference, timestamp, IP and user-agent string (for evidential purposes). We retain this record for at least 24 months, and up to 6 years in case of disputes, in line with our Privacy Policy and data protection law.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">7. Third parties and international transfers</h2>
                    <p class="mt-3">We may use third-party providers (for example: payment processing, analytics, hosting/CDN, email delivery, marketing/attribution) that set or read cookies/identifiers. Some providers may process data outside the UK/EEA. Where transfers occur, we implement appropriate safeguards (e.g., UK adequacy decisions, Standard Contractual Clauses (SCCs), and supplementary measures as needed).</p>
                    <p class="mt-2">A current list of third-party providers and cookie details is available in the Cookie Settings panel on our site.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">8. Managing or withdrawing consent</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>Use the cookie banner or Cookie Settings link (site footer) to accept, decline, or customise non-essential categories.</li>
                        <li>You can withdraw consent at any time in Cookie Settings; your new choice applies going forward.</li>
                        <li>You can also clear cookies via your browser settings or use private/incognito mode.</li>
                    </ul>
                    <p class="mt-2">Note: disabling certain cookies may limit functionality (e.g., you may be logged out or preferences won’t persist).</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">9. Do Not Track / Global Privacy Controls</h2>
                    <p class="mt-3">If your browser sends Global Privacy Control (GPC) or similar signals, we will treat them as an opt-out from non-essential cookies where technically feasible and consistent with applicable law.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">10. Changes to this Policy</h2>
                    <p class="mt-3">We may update this Policy (for example, when we add or change integrations). Material changes will be announced by a prominent in-product notice or email to registered users. The Effective date above will always reflect the latest version. Changes operate prospectively.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">11. Contact</h2>
                    <p class="mt-3">Questions about cookies or this Policy:</p>
                    <address class="not-italic mt-2 leading-7">
                        Email: <a class="text-primary hover:underline" href="mailto:info@recipegen.co.uk">info@recipegen.co.uk</a><br>
                        Postal address: WINTER WORLD LIMITED, 16 Tiller Road, London, England, E14 8PX
                    </address>
                </section>
            </div>
        </div>
    </div>

    <?php
    // We can add a generic contact form component here later if needed.
    // For now, let's keep it simple.
    // include __DIR__ . '/../templates/contact_form_section.php';
    ?>
</main>


<?php
// --- Include Footer ---
include __DIR__ . '/../templates/footer.php';
?>

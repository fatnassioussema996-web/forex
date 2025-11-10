<?php
// pages/privacy-policy.php - v4 - Redesigned with Tailwind CSS

require_once __DIR__ . '/../config.php';

// --- NOTE: In our new structure, we will have a separate refund-policy.php ---
$page_title = 'Privacy Policy';

// --- Setup for Header ---
$current_user_data = null;
$is_logged_in = false;
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (isset($_SESSION['user_id'])) {
    $is_logged_in = true;
}

// --- Include Header ---
require_once __DIR__ . '/../currency-utils.php';
require_once __DIR__ . '/../policy_helpers.php';
$additional_css = $additional_css ?? [];
$additional_css[] = 'assets/css/policy.css';
include __DIR__ . '/../templates/header.php';
?>

<main class="policy-page">
    <div class="policy-wrapper">
        <div class="policy-container">
            <div class="policy-header" data-aos="fade-up">
                <span class="policy-pill">🛡️ Privacy</span>
                <h1 class="policy-title">Privacy Policy</h1>
                <p class="policy-meta">Effective date: 14 September 2025</p>
            </div>

            <div class="policy-stack" data-aos="fade-up" data-aos-delay="100">
                <section>
                    <h2 class="text-xl font-semibold text-text-main">1. Introduction</h2>
                    <p class="mt-3">We value and respect your privacy. This Privacy Policy explains what personal data we collect, why we use it, how long we retain it, and how you can exercise your rights when using recipegen.co.uk and related services (the “Service”).</p>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li><strong>Controller:</strong> WINTER WORLD LIMITED (Company No. 16133390), 16 Tiller Road, London, England, E14 8PX (“RecipeGen”, “we”, “us”, “our”).</li>
                        <li><strong>Contact:</strong> <a href="mailto:info@recipegen.co.uk" class="text-primary hover:underline">info@recipegen.co.uk</a></li>
                        <li><strong>Scope:</strong> This Policy applies to users of the Service. The Service is intended for individuals 18+.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">2. Data we collect</h2>
                    <p class="mt-3">We only collect the data needed to operate, secure, and improve the Service.</p>
                    <h3 class="mt-4 font-medium text-text-main">2.1. You provide directly</h3>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>Name and contact details (e.g., email).</li>
                        <li>Account credentials (stored securely in hashed form).</li>
                        <li>Billing details (billing address; optional VAT information for invoices).</li>
                        <li>Inputs for plan generation: ingredients, exclusions, allergens, dietary preferences, cuisines, goals, cooking equipment, and other free-form prompts.</li>
                        <li>Support requests and communications.</li>
                    </ul>
                    <h3 class="mt-4 font-medium text-text-main">2.2. Collected automatically</h3>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>IP address, device and browser information, timezone, access logs, security telemetry (e.g., failed logins).</li>
                        <li>Usage data: page views, clicks, token purchases/redemptions, generation attempts, error logs.</li>
                    </ul>
                    <h3 class="mt-4 font-medium text-text-main">2.3. From third parties (as needed)</h3>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>Payment processors (transaction references, status; never full card numbers).</li>
                        <li>Fraud-prevention/anti-abuse providers (risk signals).</li>
                    </ul>
                    <p class="mt-3"><strong>Special category data.</strong> Information about allergies, dietary restrictions, medical conditions or religious dietary choices may constitute special category data. We only process such data when you choose to provide it to personalise outputs. See §3.2 for the legal basis and your choices.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">3. Why we process your data & legal bases</h2>
                    <p class="mt-3">We process personal data under the UK GDPR and Data Protection Act 2018 on the following bases:</p>
                    <h3 class="mt-4 font-medium text-text-main">3.1. Performance of a contract</h3>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>To register and maintain your account;</li>
                        <li>To process token top-ups and deliver digital content (Meal Plans/PDFs);</li>
                        <li>To provide customer support and handle refunds/queries.</li>
                    </ul>
                    <h3 class="mt-4 font-medium text-text-main">3.2. Consent (including special category data)</h3>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>To use allergens/dietary details you input to tailor results;</li>
                        <li>To send marketing emails/newsletters where you opt-in;</li>
                        <li>To use your content/feedback for model improvement where you opt-in (we do not use your personal data for training/improvement unless you consent).</li>
                    </ul>
                    <p class="mt-2">You can withdraw consent at any time via account settings or by contacting us (see §10).</p>
                    <h3 class="mt-4 font-medium text-text-main">3.3. Legitimate interests</h3>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>To keep the Service secure (fraud detection, abuse prevention, logging);</li>
                        <li>To measure and improve Service performance and UX (aggregated analytics);</li>
                        <li>To communicate important, non-marketing updates about the Service.</li>
                    </ul>
                    <h3 class="mt-4 font-medium text-text-main">3.4. Legal obligation</h3>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>Tax, accounting, and compliance record-keeping;</li>
                        <li>Responding to lawful requests from authorities.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">4. AI, profiling and automated decisions</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>The Service uses AI to generate meal plans based on your inputs. This involves automated processing and limited “profiling” to match recipes to your stated preferences and exclusions.</li>
                        <li>We do not make legal or similarly significant decisions solely by automated means.</li>
                        <li>You can opt out of using allergens/dietary inputs (but results may be less relevant). You can also request human review of support outcomes at any time.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">5. Sharing and international transfers</h2>
                    <p class="mt-3">We share data only as necessary to operate the Service:</p>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>Payment processing: card acquirers/processors (e.g., Visa/Mastercard providers) – we receive transaction references/status, not full card details.</li>
                        <li>Hosting & IT: secure cloud infrastructure, content delivery, and backups.</li>
                        <li>Product & support tooling: analytics (in aggregated form), helpdesk, email delivery.</li>
                        <li>Professional advisers: legal, accounting, compliance, if required.</li>
                    </ul>
                    <p class="mt-2">Some providers may be located outside the UK/EEA. Where transfers occur, we implement appropriate safeguards (e.g., UK adequacy regulations, UK/EU Standard Contractual Clauses, and supplementary measures, as applicable).</p>
                    <p class="mt-2">We do not sell your personal data.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">6. Cookies</h2>
                    <p class="mt-3">We use cookies and similar technologies (e.g., localStorage) to run the Service, remember preferences, measure performance, and—where you consent—enable analytics/marketing. Essential cookies are required for basic functionality and security.</p>
                    <p class="mt-2">For details and controls, please see our Cookie Policy (link in the site footer).</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">7. Retention</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>Orders, tokens & transactions: retained for at least 24 months, and up to 6 years where disputes, tax or enterprise records require.</li>
                        <li>Account & profile data (incl. allergens/preferences): retained while your account is active and for a reasonable period after closure (typically up to 24 months) unless we need longer for legal or security reasons.</li>
                        <li>Logs & security telemetry: typically 6–24 months, depending on purpose and risk.</li>
                    </ul>
                    <p class="mt-2">We minimise and anonymise where feasible, then securely delete.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">8. Your rights</h2>
                    <p class="mt-3">Subject to legal limits, you have the right to:</p>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>Access your data;</li>
                        <li>Rectification (correction) of inaccurate data;</li>
                        <li>Erasure (“right to be forgotten”);</li>
                        <li>Restriction of processing;</li>
                        <li>Data portability;</li>
                        <li>Object to processing based on legitimate interests;</li>
                        <li>Withdraw consent at any time (for marketing, allergens use, and model-improvement opt-ins).</li>
                    </ul>
                    <p class="mt-2">How to exercise: email <a href="mailto:info@recipegen.co.uk" class="text-primary hover:underline">info@recipegen.co.uk</a> from your account email. We may request proof of identity. We aim to respond within one month (extendable by two months for complex requests, with notice).</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">9. Security</h2>
                    <p class="mt-3">We implement appropriate technical and organisational measures, including:</p>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>Access controls, role-based permissions, MFA for admin interfaces;</li>
                        <li>Encryption in transit (HTTPS/TLS) and at rest where applicable;</li>
                        <li>Network segregation, firewalling, and regular backups;</li>
                        <li>Logging/monitoring and incident response procedures;</li>
                        <li>Vendor due diligence and contractual safeguards for processors.</li>
                    </ul>
                    <p class="mt-2">No system can be 100% secure; we continuously improve our controls and promptly investigate incidents.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">10. Children’s data</h2>
                    <p class="mt-3">The Service is for users 18+. We do not knowingly collect data from children. If you believe a child has provided data to us, contact <a href="mailto:info@recipegen.co.uk" class="text-primary hover:underline">info@recipegen.co.uk</a> so we can delete it.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">11. Changes</h2>
                    <p class="mt-3">We may update this Policy from time to time. Material changes will be notified by email and/or a prominent notice in the Service. Updates apply prospectively.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">12. Contact & complaints</h2>
                    <address class="not-italic mt-3 leading-7">
                        <strong>Controller:</strong> WINTER WORLD LIMITED<br>
                        <strong>Address:</strong> 16 Tiller Road, London, England, E14 8PX<br>
                        <strong>Email (privacy):</strong> <a href="mailto:info@recipegen.co.uk" class="text-primary hover:underline">info@recipegen.co.uk</a><br>
                        If you are not satisfied with our response, you can lodge a complaint with the UK Information Commissioner’s Office (ICO). You may also have the right to complain to your local supervisory authority within the EEA if you are an EU resident.
                    </address>
                </section>
            </div>

            <div class="policy-cta" data-aos="fade-up" data-aos-delay="150">
                <div>
                    <h3>Need clarity on privacy?</h3>
                    <p>Write to our privacy team for questions about data handling, GDPR rights, or deletion requests.</p>
                </div>
                <a href="<?php echo $base_path; ?>contact" class="policy-btn" data-ev="policy_contact_privacy">Contact privacy team</a>
            </div>
        </div>
    </div>
</main>

<?php
// --- Include Footer ---
include __DIR__ . '/../templates/footer.php';
?>

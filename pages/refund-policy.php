<?php
// pages/refund-policy.php - v3 - Redesigned with Tailwind CSS

require_once __DIR__ . '/../config.php';

$page_title = 'Refund / Return Policy';

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
                <span class="policy-pill">💰 Refunds</span>
                <h1 class="policy-title">Refund / Return Policy</h1>
                <p class="policy-meta">Effective date: 14 September 2025</p>
            </div>

            <div class="policy-stack" data-aos="fade-up" data-aos-delay="100">
                <section>
                    <h2 class="text-xl font-semibold text-text-main">1. Summary (customer-facing)</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-2">
                        <li>Refunds are assessed under this Policy and applicable consumer law.</li>
                        <li>Typical processing time: 5–10 business days after approval (payment provider timelines may vary).</li>
                        <li>Refunds will not exceed the amount originally paid for the relevant Token top-up or transaction.</li>
                        <li>Spent Tokens (i.e., redeemed for Meal Plans/Services) are non-refundable, except as set out in §4.2.</li>
                        <li>Tokens are account-bound, non-transferable, and cannot be exchanged for real currency.</li>
                        <li>Promotional/bonus Tokens are non-refundable in all circumstances.</li>
                        <li>Submit requests to <a class="text-primary hover:underline" href="mailto:info@recipegen.co.uk">info@recipegen.co.uk</a> with your order reference and details.</li>
                        <li>This Policy may be updated; material changes will be notified as described in §8.</li>
                        <li>If you consented to immediate supply and opened/downloaded the digital content, your statutory right to cancel may be lost (see §4.7).</li>
                        <li>Accepted currencies: GBP (<?php echo policy_currency_symbol('GBP'); ?>), EUR (<?php echo policy_currency_symbol('EUR'); ?>). Payment methods: Visa, Mastercard.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">2. Scope and legal note</h2>
                    <p class="mt-3">This Policy governs refunds for Tokens (internal credits) and digital Meal Plans/Services supplied by WINTER WORLD LIMITED via recipegen.co.uk. Nothing in this Policy overrides statutory consumer rights under UK law, including the Consumer Contracts Regulations 2013 and the Consumer Rights Act 2015.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">3. Definitions</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-2">
                        <li><strong>Tokens / Credits</strong> — internal prepaid credits used on the Service. The current purchase rate (e.g., an indicative example such as <?php echo policy_tokens_with_price_snippet(100); ?>) is displayed at the time of purchase and may change from time to time.</li>
                        <li><strong>Unused Tokens</strong> — Tokens credited to your Account but not yet redeemed.</li>
                        <li><strong>Redeemed / Spent Tokens</strong> — Tokens already used to access or generate a Meal Plan/Service.</li>
                        <li><strong>Promotional / Bonus Tokens</strong> — Tokens issued as part of a promotion, bonus, or incentive and marked as such.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">4. Refund principles (binding rules)</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li><strong>Refund amount cap.</strong> Any refund will not exceed the original amount paid for the relevant Token top-up or transaction, net of any non-refundable processor fees (where permitted by law and the provider’s rules).</li>
                        <li><strong>No refund for spent Tokens (exceptions).</strong> Redeemed Tokens are non-refundable, except where:
                            <ul class="mt-2 list-disc pl-5 space-y-1">
                                <li>(a) the Meal Plan or Service is defective or not as described;</li>
                                <li>(b) RecipeGen fails to supply the Service as contracted; or</li>
                                <li>(c) a refund is otherwise required by law.</li>
                            </ul>
                        </li>
                        <li><strong>Unused Tokens.</strong> Unused Tokens are generally refundable at the original purchase price if requested before any redemption from that top-up. Where applicable, non-recoverable payment processing fees may be deducted.</li>
                        <li><strong>Account-bound.</strong> Tokens are tied to your Account and cannot be transferred between accounts.</li>
                        <li><strong>No cash-out.</strong> Tokens cannot be exchanged for cash or other currencies, unless required by law.</li>
                        <li><strong>Promotional Tokens.</strong> Bonus/promotional Tokens are non-refundable under all circumstances.</li>
                        <li><strong>Immediate supply of digital content.</strong> If you consent to immediate delivery and then open/download the content (e.g., a generated PDF), you acknowledge your statutory right to cancel may not apply. In such cases, refunds are available only under §4.2 or as required by law.</li>
                        <li><strong>Bespoke/custom work.</strong> Custom or tailored Meal Plans are non-refundable once preparation has substantially begun, unless otherwise agreed in writing.</li>
                        <li><strong>Standard plan & add-ons (pricing clarity).</strong> A standard Meal Plan generation costs <?php echo policy_tokens_with_price_snippet(60); ?>. Optional add-ons carry separate token prices shown before confirmation and are redeemed in addition to the base 60 Tokens. Once redeemed, add-ons follow the same rules as in this section.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">5. How to request a refund (procedure)</h2>
                    <p class="mt-3">Please provide:</p>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>Order reference number;</li>
                        <li>Account email used for purchase;</li>
                        <li>Whether the request concerns Unused Tokens or a Redeemed item;</li>
                        <li>For redeemed items: a description of the issue and supporting evidence (e.g., screenshots, file details);</li>
                        <li>Preferred refund method (original payment method is standard).</li>
                    </ul>
                    <p class="mt-3">Upon receipt we will:</p>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>Acknowledge within 5 business days;</li>
                        <li>Investigate and, if needed, request additional information;</li>
                        <li>Provide a decision and, if approved, process the refund within 5–10 business days (subject to bank/payment provider timelines).</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">6. Investigation, evidence and decisions</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li>For claims involving redeemed content, we may review token transaction logs, checkout confirmations (token value, fiat equivalent, acceptance of terms), delivery logs (access/download events), and customer evidence.</li>
                        <li>Refunds are normally processed to the original payment method. If not possible, a reasonable alternative (e.g., bank transfer) may be offered subject to verification and compliance checks.</li>
                        <li>If a claim is rejected, we will provide reasons and inform you of your options to escalate or pursue legal remedies.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">7. Chargebacks, fraud and abuse</h2>
                    <p class="mt-3">If a chargeback is initiated while a refund request is pending, we treat it as a dispute and submit full transaction evidence to the payment provider. We may refuse refunds and suspend/close Accounts in cases of suspected fraud, abuse, or repeated chargebacks. Where funds are reversed, we may remove the equivalent Tokens and revoke access to associated generated content.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">8. Changes to this Policy</h2>
                    <p class="mt-3">We may update this Policy at any time. Material changes will be notified to registered users by email and/or prominent in-product notice. Changes apply prospectively and do not affect previously completed transactions, unless the law requires otherwise.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">9. Record keeping and retention</h2>
                    <p class="mt-3">We retain records relevant to refund requests and disputes — including order IDs, token purchase/redemption history, checkout acceptance, timestamps, IP, and device information — for at least 24 months, and up to 6 years for enterprise or disputed transactions, in line with our Privacy Policy and applicable data protection law.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">10. Escalation and disputes</h2>
                    <p class="mt-3">If you disagree with a decision, you may escalate by emailing <a class="text-primary hover:underline" href="mailto:info@recipegen.co.uk">info@recipegen.co.uk</a> with full reasons and your order reference. We will review within 10 business days. This Policy does not affect your statutory rights; you may pursue ADR or court proceedings as applicable.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">11. Examples (practical, illustrative)</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-2">
                        <li><strong>Unused Tokens (dynamic):</strong> Purchase 2,000 Tokens; spend 300; unused 1,700 → refund equals the pro-rata amount based on the original purchase price in your selected checkout currency (<?php echo policy_get_current_currency(); ?>). For reference, 100 Tokens ≈ <?php echo policy_format_price(policy_price_for_tokens(100)); ?>.</li>
                        <li><strong>Opened Meal Plan:</strong> If you consented to immediate supply and downloaded the PDF, refunds apply only if defective or not as described (§4.2).</li>
                        <li><strong>Promotional Tokens:</strong> 100 bonus Tokens awarded in a promotion → non-refundable.</li>
                        <li><strong>Add-ons:</strong> Base <?php echo policy_tokens_with_price_snippet(60); ?> + add-on token price(s) displayed before confirmation; once redeemed, non-refundable except under §4.2 or where required by law.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">12. Contact details</h2>
                    <address class="not-italic mt-3 leading-7">
                        WINTER WORLD LIMITED<br>
                        Registered office: 16 Tiller Road, London, England, E14 8PX<br>
                        Email (support): <a class="text-primary hover:underline" href="mailto:info@recipegen.co.uk">info@recipegen.co.uk</a><br>
                        Tel: +44 7874 493565<br>
                        Accepted currencies: GBP (<?php echo policy_currency_symbol('GBP'); ?>), EUR (<?php echo policy_currency_symbol('EUR'); ?>) · Payment methods: Visa, Mastercard
                    </address>
                </section>
            </div>

            <div class="policy-cta" data-aos="fade-up" data-aos-delay="150">
                <div>
                    <h3>Questions about refunds?</h3>
                    <p>Send your order reference and details to our support team — we’ll review requests within 2 business days.</p>
                </div>
                <a href="<?php echo $base_path; ?>contact" class="policy-btn" data-ev="policy_contact_refund">Submit a request</a>
            </div>
        </div>
    </div>
</main>

<?php
// --- Include Footer ---
include __DIR__ . '/../templates/footer.php';
?>

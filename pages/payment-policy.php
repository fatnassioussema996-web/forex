<?php
// pages/payment-policy.php - v3 - Redesigned with Tailwind CSS

$page_title = 'Payment Policy';
$base_path = '/';

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
include __DIR__ . '/../templates/header.php';
?>

<main class="bg-white">
    <!-- Main Content Area -->
    <div class="py-16 sm:py-20">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center" data-aos="fade-up">
                <h1 class="text-3xl font-extrabold text-text-main sm:text-4xl lg:text-5xl">Payment Policy</h1>
                <p class="mt-3 text-base text-text-secondary">Effective date: 18 September 2025</p>
                <p class="mt-2 text-sm text-text-secondary">Company: WINTER WORLD LIMITED (Company No. 16133390), 16 Tiller Road, London, England, E14 8PX · Website: recipegen.co.uk · Contact (billing/support): <a href="mailto:info@recipegen.co.uk" class="text-primary hover:underline">info@recipegen.co.uk</a></p>
            </div>

            <div class="mt-10 space-y-10 text-text-secondary" data-aos="fade-up" data-aos-delay="100">
                <section>
                    <h2 class="text-xl font-semibold text-text-main">1) Purpose & Scope</h2>
                    <p class="mt-3">This Policy explains how payments are accepted and processed on RecipeGen, including payment methods, currencies, security practices, and what happens in case of errors, disputes, or refunds. It complements our Terms & Conditions and Refund / Return Policy.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">2) What you pay for (Tokens only)</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>All payments on RecipeGen are for Tokens (prepaid credits).</li>
                        <li>Upon successful payment, Tokens are immediately credited to your account and become available for redemption (e.g., generating AI meal-plan PDFs).</li>
                        <li>The exact number of Tokens and the total amount payable are shown on the Top-Up page before you confirm payment.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">3) Accepted payment methods</h2>
                    <p class="mt-3">We accept the following, subject to device/issuer and regional availability:</p>
                    <ul class="mt-2 list-disc pl-5 space-y-1">
                        <li>Visa (credit/debit)</li>
                        <li>Mastercard (credit/debit)</li>
                    </ul>
                    <p class="mt-2">We do not accept cash, bank transfers, cheques, or cryptocurrency at this time.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">4) Currencies & pricing</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>We process transactions in Great British Pounds (GBP, <?php echo policy_currency_symbol('GBP'); ?>) and Euros (EUR, <?php echo policy_currency_symbol('EUR'); ?>).</li>
                        <li>You can select your checkout currency on the Top-Up page.</li>
                        <li>If your card/account is in another currency, your issuer may apply its own FX rate and fees.</li>
                        <li>The current Token rate (e.g., £/€ → Tokens) is displayed at the time of purchase and may change prospectively. For reference: 100 Tokens ≈ <?php echo policy_format_price(policy_price_for_tokens(100)); ?> in your selected currency.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">5) Security & compliance</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>Payments are processed via a PCI DSS–compliant payment gateway.</li>
                        <li>Card details are encrypted and sent directly to the payment processor; they do not pass through or get stored on our servers.</li>
                        <li>All data exchanged with our site uses TLS/HTTPS.</li>
                        <li>We support Strong Customer Authentication (SCA)/3-D Secure where required by law or the issuing bank.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">6) Authorisations, holds & settlement</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>Some issuers place a temporary authorisation (hold) to verify funds. If a payment fails or is reversed, any hold typically drops automatically per your bank’s timelines.</li>
                        <li>Tokens are credited only after we receive a successful confirmation from the processor.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">7) Payment failures & how to retry</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-1">
                        <li>Confirm card details, SCA/3-DS prompts, and available funds.</li>
                        <li>Try another supported method (e.g., a different card or Apple/Google Pay).</li>
                        <li>Contact your bank or card issuer to check restrictions.</li>
                        <li>If issues persist, write to <a href="mailto:info@recipegen.co.uk" class="text-primary hover:underline">info@recipegen.co.uk</a> with your email and time of attempted payment.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">8) Fraud checks, account safety & rate limits</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>To protect users and our platform, we may apply risk screening, velocity/rate limits, or require additional verification.</li>
                        <li>We may delay, decline, or refund a payment, and suspend an account where fraud or abuse is suspected (see also Terms §15).</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">9) Invoices, VAT & receipts</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>A payment confirmation/receipt is generated after a successful Top-Up and is available via email and/or your account.</li>
                        <li>VAT/consumption taxes may apply depending on your billing country and applicable rules; where required, we collect and remit.</li>
                        <li>Invoices/receipts are issued in the checkout currency (GBP or EUR). For business invoicing needs (e.g., VAT details), contact <a href="mailto:info@recipegen.co.uk" class="text-primary hover:underline">info@recipegen.co.uk</a>.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">10) Refunds & chargebacks (summary)</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>Unused Tokens may be refundable under the conditions in our Refund / Return Policy.</li>
                        <li>Spent Tokens (already redeemed for successful generations) are non-refundable, except where the content is defective/not as described or as required by law.</li>
                        <li>If you initiate a chargeback, we will provide transaction evidence to the payment provider. Repeated/wrongful chargebacks may lead to account suspension.</li>
                        <li>Full details, timelines, and examples are in the Refund / Return Policy.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">11) Billing descriptor</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>Your bank statement will show a descriptor identifying the charge as RecipeGen or our payment partner.</li>
                        <li>If you are unsure about a transaction, contact us at <a href="mailto:info@recipegen.co.uk" class="text-primary hover:underline">info@recipegen.co.uk</a> before raising a dispute—we’ll help verify the charge.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">12) Data handling & privacy</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>We retain only the information necessary to reconcile payments (e.g., transaction references, status).</li>
                        <li>We do not store full card numbers or CVV.</li>
                        <li>Please see our Privacy Policy for lawful bases, retention periods, and international transfer safeguards.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">13) Promotions, pricing changes & errors</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>Promotional pricing or bonus Tokens follow the specific promo terms shown at purchase.</li>
                        <li>We may update prices or Token rates prospectively; the rate shown at checkout controls for that transaction.</li>
                        <li>In case of a clear pricing or display error, we may cancel or reverse a transaction and will promptly notify you (see Terms §5.1).</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">14) Subscriptions & recurring payments</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-1">
                        <li>RecipeGen currently operates on one-off Top-Ups (no subscriptions).</li>
                        <li>If we later introduce recurring plans, we will provide clear terms and a cancellation mechanism before you opt in.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">15) Changes to this Policy</h2>
                    <p class="mt-3">We may amend this Payment Policy from time to time. Material changes will be announced by email and/or a prominent notice on the site. The Effective date above will always reflect the latest version. Changes apply prospectively.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">16) Contact</h2>
                    <address class="not-italic mt-3 leading-7">
                        Billing & support: <a href="mailto:info@recipegen.co.uk" class="text-primary hover:underline">info@recipegen.co.uk</a><br>
                        Postal address: WINTER WORLD LIMITED, 16 Tiller Road, London, England, E14 8PX
                    </address>
                </section>
            </div>
        </div>
    </div>

</main>


<?php
// --- Include Footer ---
include __DIR__ . '/../templates/footer.php';
?>

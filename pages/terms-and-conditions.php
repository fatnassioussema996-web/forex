<?php
// pages/terms-and-conditions.php - v3 - Redesigned with Tailwind CSS

$page_title = 'Terms & Conditions';
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
                <h1 class="text-3xl font-extrabold text-text-main sm:text-4xl lg:text-5xl">Terms and Conditions</h1>
                <p class="mt-3 text-base text-text-secondary">Effective date: 14 September 2025</p>
            </div>

            <div class="mt-10 space-y-10 text-text-secondary" data-aos="fade-up" data-aos-delay="100">
                <section>
                    <h2 class="text-xl font-semibold text-text-main">1. Introduction</h2>
                    <p class="mt-3">1.1. These Terms and Conditions (“Terms”) govern access to and use of recipegen.co.uk and any related services, apps and downloadable documents (the “Service”), operated by WINTER WORLD LIMITED (company number 16133390, registered office: 16 Tiller Road, London, England, E14 8PX) (“RecipeGen”, “we”, “us”, “our”). These Terms form a legally binding agreement between RecipeGen and each user of the Service (“you”, “User”, “Customer”).</p>
                    <p class="mt-3">1.2. By creating an account, purchasing tokens, or generating any meal plan or PDF through the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">2. Definitions</h2>
                    <ul class="mt-3 list-disc pl-5 space-y-2">
                        <li><strong>Account</strong> – your user profile on the Service.</li>
                        <li><strong>Tokens</strong> – our internal, prepaid digital credits that allow you to use specific Service features (e.g., generate plans, PDFs). Tokens are not money, e-money, or a financial instrument.</li>
                        <li><strong>Meal Plan / Plan</strong> – any personalised or template meal plan, recipe pack, shopping list, menu, nutrition guidance, and any related digital content generated or supplied via the Service.</li>
                        <li><strong>Order</strong> – a confirmed request to purchase Tokens and/or to redeem Tokens for Services.</li>
                        <li><strong>Services</strong> – the RecipeGen platform and features including intake forms, AI-assisted plan generation, PDF creation, and delivery of digital content.</li>
                        <li><strong>Checkout Currency</strong> – GBP (<?php echo policy_currency_symbol('GBP'); ?>) or EUR (<?php echo policy_currency_symbol('EUR'); ?>), as selected at checkout.</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">3. Eligibility & Account Registration</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li>You must be 18+ to use the Service. If you act on behalf of a company or organisation, you confirm you are authorised to bind that entity.</li>
                        <li>Provide accurate, current information and keep your credentials secure. You are responsible for all activity on your Account.</li>
                        <li>Notify us immediately of any suspected unauthorised access or security incident at <a href="mailto:info@recipegen.co.uk" class="text-primary hover:underline">info@recipegen.co.uk</a>.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">4. Tokens</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-3">
                        <li><strong>Nature.</strong> Tokens are a prepayment mechanism to access features. Tokens carry only the rights expressly set out in these Terms; they have no cash value, are non-transferable, and cannot be traded or resold.</li>
                        <li><strong>Issuance & Rate.</strong> Tokens are issued after successful payment. The current rate (e.g., a displayed example such as <?php echo '£1.00 = 100 Tokens'; ?> or <?php echo policy_format_price(1.00, 'EUR'); ?> . ' = 100 Tokens' ?>) is shown on the Top-Up page at the moment of purchase and may change from time to time. The interface shows the exact number of Tokens you will receive before you pay.</li>
                        <li><strong>Pricing in Tokens.</strong> Features and Plans are priced in Tokens; the interface shows the token cost before redemption. When a GBP/EUR amount is shown, it is an informational conversion derived from the then-current rate.</li>
                        <li><strong>Redemption.</strong> When you confirm a generation, the displayed token amount is deducted in real time. If a generation fails for technical reasons attributable to us and no content is delivered, the associated Tokens will be automatically returned or manually restored after support review.</li>
                        <li><strong>Expiry.</strong> Unless stated otherwise in a promotion, Tokens do not expire; however, dormant accounts (no login or activity for 24 months) may be archived and require support to reactivate.</li>
                        <li><strong>Promotions & Bonuses.</strong> Promotional bundles (including “I Feel Lucky” bonuses) are subject to specific terms shown at purchase. Bonus Tokens may have limits (e.g., non-refundable, not exchangeable, or time-limited).</li>
                        <li><strong>Token Pricing & What You Get.</strong>
                            <ul class="mt-2 list-disc pl-5 space-y-2">
                                <li><em>Standard generation price.</em> A standard Meal Plan generation costs <?php echo policy_tokens_with_price_snippet(60); ?>.</li>
                                <li><em>What a “standard Meal Plan” includes.</em> Unless otherwise specified on the Generator page at the time of purchase, a standard Plan typically includes: a complete AI-generated meal plan based on your inputs; a downloadable PDF; a recipes set appropriate to the selected scope; and, where available, a basic shopping list section.</li>
                                <li><em>Add-ons (“Extras”).</em> Optional add-ons are charged in addition to the 60-Token base price. Each add-on has its own token cost and a clear description of what it provides.</li>
                                <li><em>How pricing is presented.</em> The total token cost (base + add-ons) is displayed in the Generator/Checkout interface before you confirm redemption.</li>
                                <li><em>Changes to pricing.</em> We may update token prices for add-ons from time to time. The current prices and inclusions are those shown at the time of confirmation.</li>
                                <li><em>Currencies & payment methods (summary).</em> Purchases of Tokens can be made in GBP (<?php echo policy_currency_symbol('GBP'); ?>) or EUR (<?php echo policy_currency_symbol('EUR'); ?>) using Visa or Mastercard (see §5).</li>
                            </ul>
                        </li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">5. Ordering, Payment & Checkout</h2>
                    <p class="mt-3"><strong>Accepted payment methods:</strong> Visa, Mastercard · <strong>Accepted currencies:</strong> GBP (<?php echo policy_currency_symbol('GBP'); ?>), EUR (<?php echo policy_currency_symbol('EUR'); ?>)</p>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li><strong>Acceptance.</strong> All Orders are subject to acceptance. We may refuse or cancel an Order to prevent fraud/abuse, correct obvious errors, comply with law, or address technical issues.</li>
                        <li><strong>Payment Methods.</strong> We accept Visa and Mastercard. You confirm you are authorised to use the selected method.</li>
                        <li><strong>Currencies & Taxes.</strong> Prices are shown in GBP and EUR. You may choose your Checkout Currency. If your card is billed in another currency, your bank may apply its FX rate and fees. VAT/consumption taxes may apply depending on your billing country; where applicable, we collect/remit taxes and display them at checkout. Invoices/receipts are issued in the Checkout Currency.</li>
                        <li><strong>Delivery of Digital Content.</strong> Meal Plans and PDFs are delivered electronically (download link and/or email). Generation time can vary based on inputs, queue and system load.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">6. Cancellations, Refunds & Consumer Rights</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li><strong>Digital Content & Early Supply.</strong> When you request immediate generation, you acknowledge that supply begins immediately and that you may lose the statutory right to cancel once generation has started (Consumer Contracts Regulations).</li>
                        <li><strong>Unused Tokens (Cooling-off).</strong> If you are a consumer, you may cancel a Token top-up within 14 days of purchase provided no Tokens from that top-up have been spent. Refunds are made to the original payment method in the original currency (GBP/EUR). Non-recoverable payment processing fees may be deducted if permitted by law and the provider’s rules.</li>
                        <li><strong>Used Tokens / Completed Generations.</strong> Tokens redeemed for successful generations are non-refundable, except where required by law or where a verified technical failure attributable to us resulted in no usable delivery.</li>
                        <li><strong>Defective or Misdescribed Content.</strong> If a delivered Plan is corrupted, incomplete, or clearly not as described (e.g., the PDF fails to open), contact <a href="mailto:info@recipegen.co.uk" class="text-primary hover:underline">info@recipegen.co.uk</a> within 14 days with your Order ID. We may repair, replace, re-generate, or refund Tokens/amounts as appropriate under applicable law.</li>
                        <li><strong>Chargebacks & Abuse.</strong> Filing an unwarranted chargeback may lead to suspension while we investigate. If funds are reversed, we may remove the equivalent Tokens and any generated content from your Account.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">7. Health, Nutrition & Safety Disclaimer</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li>RecipeGen provides informational meal plans generated by AI based on your inputs. We do not provide medical, nutritional, or dietetic advice.</li>
                        <li>Always consult a qualified healthcare professional before making significant dietary changes, particularly if you have medical conditions, allergies, are pregnant/breastfeeding, or take medication.</li>
                        <li>You are responsible for verifying ingredients, allergens, and suitability for your circumstances. Where possible, we surface your stated allergens/exclusions, but we cannot guarantee that all outputs will be free from allergens or errors.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">8. Your Inputs & Acceptable Use</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li>You must provide lawful, accurate inputs and must not upload content that is infringing, harmful, or violates privacy or third-party rights.</li>
                        <li>You must not misuse the Service (e.g., attempt to reverse engineer, scrape, overburden, or circumvent limits). We may apply rate limits, usage caps, or security measures to maintain platform integrity.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">9. Intellectual Property & Licences</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li><strong>Platform IP.</strong> The Service, software, models, templates, and site content are owned by RecipeGen or our licensors and are protected by IP laws.</li>
                        <li><strong>Licence to Use Outputs.</strong> Upon valid redemption/purchase, we grant you a personal, non-exclusive, non-transferable licence to download and use generated Plans and PDFs for your own household/personal use. Commercial redistribution or resale of outputs is not permitted unless we agree in writing.</li>
                        <li><strong>Your Feedback & Inputs.</strong> You retain rights in your inputs. You grant us a worldwide, royalty-free licence to use your inputs and non-identifying usage data to operate, secure, and improve the Service. Where we rely on consent for model improvement using your content, we will ask for it and you can withdraw it at any time in your settings.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">10. Warranties & Disclaimers</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li>We warrant we are entitled to provide the Service as described.</li>
                        <li>Except as expressly stated, the Service and outputs are provided “as is” and “as available”, without warranties of accuracy, fitness for a particular purpose, or uninterrupted availability.</li>
                        <li>We do not guarantee any specific dietary or health outcome.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">11. Limitation of Liability</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li>Nothing in these Terms limits liability for death or personal injury caused by negligence, fraud, or any liability that cannot be limited by law.</li>
                        <li>Subject to 11.1, our total aggregate liability arising out of or in connection with the Service in any 12-month period shall not exceed the total amounts you paid to us for Tokens/Services in that period.</li>
                        <li>We shall not be liable for indirect or consequential losses, including loss of profits, business, goodwill, or data.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">12. Indemnity</h2>
                    <p class="mt-3">You agree to indemnify and hold harmless RecipeGen and our officers, employees and contractors from claims, damages, costs and expenses arising from your unlawful use of the Service, breach of these Terms, or infringement of third-party rights.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">13. Data Protection & Privacy</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li>We process personal data as a controller in line with the UK GDPR and Data Protection Act 2018, as set out in our Privacy Policy.</li>
                        <li>By using the Service, you acknowledge our privacy practices, including international transfers where applicable and your rights to access, erase, restrict, or object.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">14. Third-Party Services & Links</h2>
                    <p class="mt-3">The Service may include links to third-party sites or integrate third-party tools (e.g., payment processors, analytics). We are not responsible for their content or practices. Your use of such services is governed by their terms.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">15. Suspension & Termination</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li>We may suspend or terminate access if you breach these Terms, create security/fraud risks, or if required by law.</li>
                        <li>On termination, your licence to use the Service and outputs ceases. We may retain minimal records as required by law (e.g., tax, accounting, fraud prevention).</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">16. Changes to the Service or Terms</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li>We may update the Service and these Terms to reflect legal, technical or business changes.</li>
                        <li>We will notify you by email and/or an in-product notice for material changes. Continued use after the effective date constitutes acceptance.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">17. Notices</h2>
                    <p class="mt-3">Formal notices to us: <a href="mailto:info@recipegen.co.uk" class="text-primary hover:underline">info@recipegen.co.uk</a> or postal mail to the registered office. We may provide notices to you via email, in-product messages, or via your Account.</p>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">18. Governing Law & Jurisdiction</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li>These Terms are governed by the laws of England and Wales.</li>
                        <li>The courts of England and Wales have exclusive jurisdiction, except that consumers resident in Scotland, Northern Ireland, or an EU Member State may bring proceedings in their local courts.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">19. Miscellaneous</h2>
                    <ol class="mt-3 list-decimal pl-5 space-y-2">
                        <li>If any provision is held invalid or unenforceable, the remaining provisions remain in full force.</li>
                        <li>No failure or delay to enforce any provision constitutes a waiver.</li>
                        <li>You may not assign or transfer your rights without our prior written consent. We may assign to an affiliate or in connection with a merger, acquisition or asset transfer.</li>
                        <li>These Terms (together with policies referenced herein) form the entire agreement between you and RecipeGen regarding the Service.</li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl font-semibold text-text-main">20. Contact Details</h2>
                    <address class="not-italic mt-3 leading-7">
                        WINTER WORLD LIMITED<br>
                        Registered office: 16 Tiller Road, London, England, E14 8PX<br>
                        Company number: 16133390<br>
                        Email: <a href="mailto:info@recipegen.co.uk" class="text-primary hover:underline">info@recipegen.co.uk</a><br>
                        Tel: +44 7874 493565
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

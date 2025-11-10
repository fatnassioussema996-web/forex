<?php
// templates/footer.php - v4 - Added Payment Methods
?>
<!-- ===== FOOTER ===== -->
<footer class="bg-white border-t border-border">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8">

            <!-- Column 1: Company Info -->
            <div class="col-span-2 md:col-span-1" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                <img src="<?php echo $base_path; ?>images/logo.webp" alt="RecipeGen Logo" class="h-12 w-auto">
                <ul class="mt-4 space-y-1.5">
                    <li class="text-base font-semibold text-primary">WINTER WORLD LIMITED</li>
                    <li><span class="text-base text-text-secondary">Company number: 16133390</span></li>
                    <li><span class="text-base text-text-secondary">Address: 16 Tiller Road, London, England, E14 8PX</span></li>
                </ul>
            </div>

            <!-- Column 2: Navigate -->
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="100">
                <h4 class="text-sm font-semibold text-text-main tracking-wider uppercase">Navigate</h4>
                <ul class="mt-4 space-y-2">
                    <li><a href="<?php echo $base_path; ?>about" class="text-base text-text-secondary hover:text-primary">About Us</a></li>
                    <li><a href="<?php echo $base_path; ?>#pricing" class="text-base text-text-secondary hover:text-primary">Pricing</a></li>
                    <li><a href="<?php echo $base_path; ?>faq" class="text-base text-text-secondary hover:text-primary">FAQ</a></li>
                    <li><a href="<?php echo $base_path; ?>contact" class="text-base text-text-secondary hover:text-primary">Contact</a></li>
                </ul>
            </div>

            <!-- Column 3: Useful Links -->
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="150">
                <h4 class="text-sm font-semibold text-text-main tracking-wider uppercase">Useful Links</h4>
                <ul class="mt-4 space-y-2">
                    <li><a href="<?php echo $base_path; ?>how-it-works" class="text-base text-text-secondary hover:text-primary">How It Works</a></li>
                    <li><a href="<?php echo $base_path; ?>samples.php" class="text-base text-text-secondary hover:text-primary">Recipes</a></li>
                    <li><a href="<?php echo $base_path; ?>allergens.php" class="text-base text-text-secondary hover:text-primary">Allergens &amp; Safety</a></li>
                    <li><a href="<?php echo $base_path; ?>nutrition.php" class="text-base text-text-secondary hover:text-primary">Nutrition Guide</a></li>
                    <li><a href="<?php echo $base_path; ?>sustainability.php" class="text-base text-text-secondary hover:text-primary">Food Waste &amp; Sustainability</a></li>
                </ul>
            </div>

            <!-- Column 4: Legal -->
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="200">
                <h4 class="text-sm font-semibold text-text-main tracking-wider uppercase">Legal</h4>
                <ul class="mt-4 space-y-2">
                    <li><a href="<?php echo $base_path; ?>pages/privacy-policy" class="text-base text-text-secondary hover:text-primary">Privacy Policy</a></li>
                    <li><a href="<?php echo $base_path; ?>pages/terms-and-conditions" class="text-base text-text-secondary hover:text-primary">Terms & Conditions</a></li>
                    <li><a href="<?php echo $base_path; ?>pages/refund-policy" class="text-base text-text-secondary hover:text-primary">Refund Policy</a></li>
                    <li><a href="<?php echo $base_path; ?>pages/payment-policy" class="text-base text-text-secondary hover:text-primary">Payment Policy</a></li>
                    <li><a href="<?php echo $base_path; ?>pages/cookies-policy" class="text-base text-text-secondary hover:text-primary">Cookie Policy</a></li>
                </ul>
            </div>
            
            <!-- Column 5: Get in Touch -->
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="300">
                 <h4 class="text-sm font-semibold text-text-main tracking-wider uppercase">Get In Touch</h4>
                 <p class="mt-4 text-base text-text-secondary">Have questions or feedback? Reach out!</p>
                 <a href="mailto:info@recipegen.co.uk" class="text-base font-semibold text-primary hover:underline block">info@recipegen.co.uk</a>
                 <a href="tel:+447874493565" class="text-base font-semibold text-primary hover:underline block mt-2">+44 7874 493565</a>
            </div>
        </div>

        <div class="mt-8 border-t border-border pt-8 flex items-center justify-between">
            <p class="text-base text-text-secondary">© <?php echo date('Y'); ?> WINTER WORLD LIMITED. All Rights Reserved.</p>
            <div class="flex items-center gap-4">
                <img src="<?php echo $base_path; ?>images/visa-logo.svg" alt="Visa" class="h-6">
                <img src="<?php echo $base_path; ?>images/mastercard-logo.svg" alt="Mastercard" class="h-6">
            </div>
        </div>
    </div>
</footer>
<!-- ===== END FOOTER ===== -->

<!-- ===== SCRIPTS ===== -->
<script src="<?php echo $base_path; ?>ui-script.js?v=<?php echo time(); ?>" defer></script>
<script src="<?php echo $base_path; ?>generation-script.js?v=<?php echo time(); ?>" defer></script>
<script src="<?php echo $base_path; ?>currency-script.js?v=<?php echo time(); ?>" defer></script>
<?php if (isset($additional_js) && !empty($additional_js)): ?>
    <?php foreach ($additional_js as $js_file): ?>
        <script src="<?php echo $base_path . $js_file; ?>?v=<?php echo time(); ?>" defer></script>
    <?php endforeach; ?>
<?php endif; ?>
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>
    AOS.init({
        duration: 800,
        once: true,
    });
</script>
</body>
</html>
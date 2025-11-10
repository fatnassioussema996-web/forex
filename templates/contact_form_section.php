<?php
// templates/contact_form_section.php - v2 - Redesigned with Tailwind CSS
// This is a reusable component. The $base_path variable must be available
// from the parent page that includes this file.
?>
<!-- ===== CONTACT FORM SECTION ===== -->
<section class="bg-gray-50 border-t border-border">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-xl mx-auto text-center" data-aos="fade-up">
            <h2 class="text-3xl font-extrabold text-text-main sm:text-4xl">Get In Touch</h2>
            <p class="mt-4 text-lg text-text-secondary">Have a question or feedback? We'd love to hear from you.</p>
        </div>
        
        <!-- The form action is built using the $base_path from the parent page -->
        <form action="<?php echo rtrim($base_path, '/'); ?>/handle_contact_form.php" method="POST" class="mt-12 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                    <label for="first_name" class="block text-sm font-medium text-text-main">First name</label>
                    <div class="mt-1">
                        <!-- NOTE: Changed name attribute to 'first_name' for best practice -->
                        <input type="text" name="first_name" id="first_name" autocomplete="given-name" required class="py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-border rounded-md">
                    </div>
                </div>
                <div>
                    <label for="last_name" class="block text-sm font-medium text-text-main">Last name</label>
                    <div class="mt-1">
                        <input type="text" name="last_name" id="last_name" autocomplete="family-name" required class="py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-border rounded-md">
                    </div>
                </div>
                <div class="sm:col-span-2">
                    <label for="email" class="block text-sm font-medium text-text-main">Email</label>
                    <div class="mt-1">
                        <input id="email" name="email" type="email" autocomplete="email" required class="py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-border rounded-md">
                    </div>
                </div>
                <div class="sm:col-span-2">
                    <label for="message" class="block text-sm font-medium text-text-main">Message</label>
                    <div class="mt-1">
                        <textarea id="message" name="message" rows="4" required class="py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-border rounded-md"></textarea>
                    </div>
                </div>
                <div class="sm:col-span-2 text-center">
                    <button type="submit" class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition">
                        Send Message
                    </button>
                </div>
            </div>
        </form>
    </div>
</section>
<!-- ===== END CONTACT FORM SECTION ===== -->
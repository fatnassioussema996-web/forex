<?php
// thank_you.php (V2 - Redesigned, likely for contact form)

$page_title = 'Thank You';
include 'templates/header.php';
?>

<main>
    <div class="utility-page-wrapper">
        <section class="utility-section">
            <div class="utility-content-container" data-aos="fade-up">
                 <div class="utility-icon --success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <h1>Thank You!</h1>
                <p>Your message has been sent successfully. We will get back to you shortly.</p>
                <a href="index.php" class="cta-button">Return to Homepage</a>
            </div>
        </section>
    </div>
</main>

<?php
include 'templates/footer.php';
?>
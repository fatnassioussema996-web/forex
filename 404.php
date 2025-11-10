<?php
// 404.php (V2 - Redesigned)

// We set a 404 HTTP header, which is important for SEO and browsers.
header("HTTP/1.0 404 Not Found");

$page_title = 'Page Not Found';
include 'templates/header.php'; // Using our main, intelligent header
?>

<main>
    <div class="utility-page-wrapper">
        <section class="utility-section">
            <div class="utility-content-container" data-aos="fade-up">
                <div class="utility-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                </div>
                <h1>404 - Page Not Found</h1>
                <p>Oops! The page you are looking for doesn't exist or has been moved.</p>
                <a href="index.php" class="cta-button">Go Back to Homepage</a>
            </div>
        </section>
    </div>
</main>

<?php
include 'templates/footer.php';
?>
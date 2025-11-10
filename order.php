<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
// Get service details from the URL
$service_name = isset($_GET['service']) ? htmlspecialchars($_GET['service']) : 'Unknown Service';
$service_price = isset($_GET['price']) ? floatval($_GET['price']) : 0;

$page_title = 'Order: ' . $service_name; 
include 'templates/header.php'; 
?>
<main>
    <section id="order-section" class="auth-section">
        <div class="container" data-aos="fade-up">
            <div class="auth-form-container">
                <h2>Confirm Your Order</h2>
                <p>You are ordering: <strong><?php echo $service_name; ?></strong></p>
                <p>Cost: <strong>£<?php echo number_format($service_price, 2); ?> Coins</strong></p>
                
                <form action="handle_order.php" method="POST">
                    <!-- Hidden fields to pass service data -->
                    <input type="hidden" name="service_name" value="<?php echo $service_name; ?>">
                    <input type="hidden" name="service_price" value="<?php echo $service_price; ?>">
                    
                    <div class="form-group">
                        <label for="project_details">Please describe your project or what you need:</label>
                        <textarea id="project_details" name="project_details" rows="8" required></textarea>
                    </div>
                    
                    <button type="submit" class="cta-button">Submit Order</button>
                </form>
            </div>
        </div>
    </section>
</main>
<?php include 'templates/footer.php'; ?>
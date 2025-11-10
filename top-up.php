<?php
// top-up.php - v8 - Multi-currency support

if (session_status() === PHP_SESSION_NONE) { session_start(); }
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/currency-utils.php';

$page_title = 'Top-Up Balance';
// Base path is set by config.php/config.local.php
if (!isset($base_path)) {
    $base_path = '/';
}

// Get current currency
$current_currency = get_user_currency();
$currency_config = get_currency_config($current_currency); 
$current_user_data = null; 
$is_logged_in = false;
if (isset($_SESSION['user_id'])) {
    $stmt = $connection->prepare("SELECT id, first_name, balance FROM users WHERE id = ?");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $current_user_data = $result->fetch_assoc();
        $is_logged_in = true;
    }
    $stmt->close();
}


if (!$is_logged_in) {
    header("Location: /login");
    exit();
}


include __DIR__ . '/templates/header.php';
?>
<main class="bg-gray-50">
    <!-- ... (весь HTML-код формы остается без изменений) ... -->
    <div class="flex flex-col justify-center min-h-[80vh] py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md" data-aos="fade-up">
            <a href="<?php echo $base_path; ?>" class="flex justify-center text-4xl font-bold text-primary">🍳</a>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-text-main">Top-Up Your Account</h2>
            <p class="mt-2 text-center text-sm text-text-secondary">Add Tokens to your balance to continue creating.</p>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md" data-aos="fade-up" data-aos-delay="100">
            <div class="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
                <div class="mb-6 p-3 bg-green-50 border border-green-200 rounded-md text-center">
                    <p class="text-sm text-green-800">Rate: <strong><?php echo $currency_config['symbol']; ?>1.00 <?php echo $current_currency; ?> ≈ <?php echo floor(100 / $currency_config['rate']); ?> Tokens</strong></p>
                </div>
                <form id="topup-form" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-text-main">Choose a package</label>
                        <div id="preset-amounts" class="mt-2 grid grid-cols-2 gap-4">
                            <button type="button" class="preset-btn" data-amount="<?php echo number_format(calculate_price_for_tokens(1000, $current_currency), 2, '.', ''); ?>"><?php echo format_price(calculate_price_for_tokens(1000, $current_currency), $current_currency); ?> <span class="block text-xs font-normal">1,000 Tokens</span></button>
                            <button type="button" class="preset-btn" data-amount="<?php echo number_format(calculate_price_for_tokens(2750, $current_currency), 2, '.', ''); ?>"><?php echo format_price(calculate_price_for_tokens(2750, $current_currency), $current_currency); ?> <span class="block text-xs font-normal">2,750 Tokens</span></button>
                            <button type="button" class="preset-btn" data-amount="<?php echo number_format(calculate_price_for_tokens(6000, $current_currency), 2, '.', ''); ?>"><?php echo format_price(calculate_price_for_tokens(6000, $current_currency), $current_currency); ?> <span class="block text-xs font-normal">6,000 Tokens</span></button>
                            <button type="button" class="preset-btn" data-amount="custom">Custom</button>
                        </div>
                    </div>
                    <div>
                        <label for="topup-amount" class="block text-sm font-medium text-text-main">Or enter custom amount</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                             <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span class="text-text-secondary sm:text-sm"><?php echo $currency_config['symbol']; ?></span></div>
                             <input type="text" id="topup-amount" name="amount" required inputmode="decimal" placeholder="15.00" class="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-border rounded-md" data-currency="<?php echo $current_currency; ?>" data-rate="<?php echo $currency_config['rate']; ?>">
                        </div>
                        <p id="token-equivalent" class="mt-2 text-sm text-center text-text-secondary font-medium"></p>
                    </div>
                   

                    <div class="space-y-4">
                        <button type="submit" id="checkout-button" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">
                            Add Tokens
                        </button>
                        <button type="submit" id="lucky-button" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-black bg-amber-400 hover:bg-amber-500">
                            I Feel Lucky (+10% to 25% Bonus)
                        </button>
                    </div>
                </form>
                <div id="error-message" class="mt-4 text-center text-sm text-red-600"></div>
            </div>
        </div>
    </div>
</main>
<script src="/top-up-script.js?v=<?php echo time(); ?>"></script>
<?php include __DIR__ . '/templates/footer.php'; ?>
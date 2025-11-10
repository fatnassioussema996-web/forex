<?php
// handle_topup.php - Token top-up with multi-currency support

if (session_status() === PHP_SESSION_NONE) { session_start(); }
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/currency-utils.php';
header('Content-Type: application/json');

// Security check
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    exit(json_encode(['error' => 'Authentication required.']));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed.']));
}

$input = json_decode(file_get_contents('php://input'), true);
$amount = abs(floatval($input['amount'] ?? 0));
$is_lucky = !empty($input['lucky']); // Get lucky flag from frontend

// Get user's currency
$current_currency = get_user_currency();
$currency_config = get_currency_config($current_currency);

// Convert amount to GBP for token calculation
$gbp_amount = $amount / $currency_config['rate'];

if ($gbp_amount < 0.43) {  // Minimum ~0.50 EUR / 0.43 GBP
    http_response_code(400);
    exit(json_encode(['error' => 'Invalid amount. Minimum is ' . format_price(0.5, $current_currency) . '.']));
}

$user_id = $_SESSION['user_id'];

// --- TOKEN CALCULATION LOGIC (always based on GBP) ---
$tokens_to_add = $gbp_amount * 100;

if ($is_lucky) {
    // If this is a "lucky" top-up, give random bonus
    $random_bonus = mt_rand(10, 25) / 100; // from 0.10 to 0.25 (10% - 25%)
    $tokens_to_add *= (1 + $random_bonus);
} else {
    // Otherwise apply standard bonuses
    if ($gbp_amount >= 50) { $tokens_to_add *= 1.20; } 
    else if ($gbp_amount >= 25) { $tokens_to_add *= 1.10; }
}
    
$tokens_to_add = floor($tokens_to_add);

// --- Database Transaction ---
$connection->begin_transaction();
try {
    $stmt_update = $connection->prepare("UPDATE users SET balance = balance + ? WHERE id = ?");
    $stmt_update->bind_param("di", $tokens_to_add, $user_id);
    $stmt_update->execute();
        
    $stmt_insert = $connection->prepare("INSERT INTO topups (user_id, amount) VALUES (?, ?)");
    $stmt_insert->bind_param("id", $user_id, $tokens_to_add);
    $stmt_insert->execute();
        
    $connection->commit();
    
    // Get updated balance
    $stmt_balance = $connection->prepare("SELECT balance FROM users WHERE id = ?");
    $stmt_balance->bind_param("i", $user_id);
    $stmt_balance->execute();
    $new_balance = $stmt_balance->get_result()->fetch_assoc()['balance'];
    $stmt_balance->close();
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Tokens added successfully!',
        'tokens_added' => $tokens_to_add,
        'new_balance' => $new_balance,
        'is_lucky' => $is_lucky
    ]);
    
} catch (mysqli_sql_exception $exception) {
    $connection->rollback();
    error_log('Top-up Transaction Failed: ' . $exception->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Database error occurred while adding tokens.']);
}
?>


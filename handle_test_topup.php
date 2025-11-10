<?php
// handle_test_topup.php (FINAL LIVE - with 1=100 logic and bonuses)
if (session_status() === PHP_SESSION_NONE) { session_start(); }
require_once __DIR__ . '/config.php';

if (!isset($_SESSION['user_id'])) { /* ... redirect ... */ }

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['amount'])) {
    $user_id = $_SESSION['user_id'];
    $gbp_amount = abs(floatval($_POST['amount']));
    if ($gbp_amount <= 0) die("Invalid amount.");

    // --- NEW: TOKEN CALCULATION LOGIC ---
    $tokens_to_add = $gbp_amount * 100;
    // Apply bonuses
    if ($gbp_amount >= 50) {
        $tokens_to_add *= 1.20; // +20% bonus
    } else if ($gbp_amount >= 25) {
        $tokens_to_add *= 1.10; // +10% bonus
    }
    $tokens_to_add = floor($tokens_to_add); // Round down to nearest whole token

    // --- Database Transaction ---
    $connection->begin_transaction();
    try {
        // We add the CALCULATED tokens, not the GBP amount
        $stmt_update = $connection->prepare("UPDATE users SET balance = balance + ? WHERE id = ?");
        $stmt_update->bind_param("di", $tokens_to_add, $user_id);
        $stmt_update->execute();
        
        $stmt_insert = $connection->prepare("INSERT INTO topups (user_id, amount) VALUES (?, ?)");
        $stmt_insert->bind_param("id", $user_id, $tokens_to_add); // We log the TOKENS ADDED amount
        $stmt_insert->execute();

        $connection->commit();
        header("Location: top-up-success.php");
        exit();
    } catch (mysqli_sql_exception $exception) {
        $connection->rollback();
        die("Database error during top-up.");
    }
}
?>
<?php
// set_currency.php - Handle currency switching

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once __DIR__ . '/currency-utils.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $currency = $_POST['currency'] ?? 'GBP';
    
    if (set_user_currency($currency)) {
        echo json_encode([
            'success' => true,
            'currency' => $currency,
            'message' => 'Currency updated successfully'
        ]);
    } else {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid currency code'
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
}
?>




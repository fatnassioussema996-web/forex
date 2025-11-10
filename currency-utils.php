<?php
// currency-utils.php - Utility functions for multi-currency support

/**
 * Get all available currencies
 */
function get_available_currencies() {
    return require __DIR__ . '/currency-config.php';
}

/**
 * Get user's selected currency from session
 */
function get_user_currency() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    return $_SESSION['user_currency'] ?? 'GBP';
}

/**
 * Set user's selected currency in session
 */
function set_user_currency($currency_code) {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    $currencies = get_available_currencies();
    if (isset($currencies[$currency_code])) {
        $_SESSION['user_currency'] = $currency_code;
        return true;
    }
    return false;
}

/**
 * Get configuration for specific currency
 */
function get_currency_config($currency_code) {
    $currencies = get_available_currencies();
    return $currencies[$currency_code] ?? $currencies['GBP'];
}

/**
 * Convert amount from one currency to another
 */
function convert_amount($amount, $from_currency, $to_currency) {
    $currencies = get_available_currencies();
    $from_rate = $currencies[$from_currency]['rate'] ?? 1.00;
    $to_rate = $currencies[$to_currency]['rate'] ?? 1.00;
    
    // Convert through GBP (base currency)
    $gbp_amount = $amount / $from_rate;
    return $gbp_amount * $to_rate;
}

/**
 * Format price with currency symbol
 */
function format_price($amount, $currency_code = null) {
    if ($currency_code === null) {
        $currency_code = get_user_currency();
    }
    $currency = get_currency_config($currency_code);
    return $currency['symbol'] . number_format($amount, 2);
}

/**
 * Calculate tokens from amount in any currency
 * Always converts to GBP first for consistency
 */
function calculate_tokens($amount, $currency_code = null) {
    if ($currency_code === null) {
        $currency_code = get_user_currency();
    }
    $currency = get_currency_config($currency_code);
    
    // Convert to GBP first
    $gbp_amount = $amount / $currency['rate'];
    
    // Calculate tokens (100 tokens per 1 GBP)
    return $gbp_amount * 100;
}

/**
 * Calculate price for given number of tokens in specified currency
 */
function calculate_price_for_tokens($tokens, $currency_code = null) {
    if ($currency_code === null) {
        $currency_code = get_user_currency();
    }
    $currency = get_currency_config($currency_code);
    
    // Calculate price in GBP first
    $gbp_price = $tokens / 100;
    
    // Convert to target currency
    return $gbp_price * $currency['rate'];
}

/**
 * Get current currency symbol
 */
function get_currency_symbol($currency_code = null) {
    if ($currency_code === null) {
        $currency_code = get_user_currency();
    }
    $currency = get_currency_config($currency_code);
    return $currency['symbol'];
}
?>




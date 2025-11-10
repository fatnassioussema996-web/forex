<?php
// policy_helpers.php - Helpers for dynamic currency/token snippets in policy pages

require_once __DIR__ . '/currency-utils.php';

function policy_get_current_currency(): string {
    return get_user_currency();
}

function policy_currency_symbol(?string $currency = null): string {
    $cfg = get_currency_config($currency ?? policy_get_current_currency());
    return $cfg['symbol'];
}

function policy_format_price(float $amount, ?string $currency = null): string {
    return format_price($amount, $currency ?? policy_get_current_currency());
}

function policy_price_for_tokens(int $tokens, ?string $currency = null): float {
    return (float) calculate_price_for_tokens($tokens, $currency ?? policy_get_current_currency());
}

function policy_tokens_with_price_snippet(int $tokens, ?string $currency = null): string {
    $cur = $currency ?? policy_get_current_currency();
    $price = policy_price_for_tokens($tokens, $cur);
    return $tokens . ' Tokens (≈ ' . policy_format_price($price, $cur) . ')';
}

function policy_rate_example_snippet(?string $currency = null): string {
    // Base: 100 Tokens = £1.00
    $cur = $currency ?? policy_get_current_currency();
    $base = '£1.00 = 100 Tokens';
    if ($cur === 'GBP') {
        return $base . ' · 100 Tokens = ' . policy_format_price(policy_price_for_tokens(100, 'GBP'), 'GBP');
    }
    $converted = policy_format_price(policy_price_for_tokens(100, $cur), $cur);
    return $base . ' · 100 Tokens ≈ ' . $converted . ' in your selected currency (' . $cur . ')';
}
?>





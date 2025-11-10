<?php
// currency-config.php - Multi-currency configuration
// Easy to add new currencies in the future

return [
    'GBP' => [
        'code' => 'GBP',
        'symbol' => '£',
        'name' => 'British Pound',
        'flag' => '🇬🇧',
        'flag_icon' => '/images/flags/gb.svg',
        'rate' => 1.00, // Base currency
        'tokens_per_unit' => 100, // 100 tokens per 1 GBP
        'is_default' => true
    ],
    'EUR' => [
        'code' => 'EUR',
        'symbol' => '€',
        'name' => 'Euro',
        'flag' => '🇪🇺',
        'flag_icon' => '/images/flags/eu.svg',
        'rate' => 1.15, // 1 GBP = 1.15 EUR
        'tokens_per_unit' => 100, // 100 tokens still based on GBP equivalent
        'is_default' => false
    ]
];
?>


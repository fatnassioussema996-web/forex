<?php
// templates/header.php - v3 - With multi-currency support

// Global variables passed from the parent file
global $is_logged_in, $current_user_data, $base_path, $page_title;

// Fallback values to prevent errors
$is_logged_in = $is_logged_in ?? false;
$base_path = $base_path ?? '/'; // Default to root
$page_title = $page_title ?? 'AI Recipe Generator';

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Load currency utilities
require_once __DIR__ . '/../currency-utils.php';
$current_currency = get_user_currency();
$currency_config = get_currency_config($current_currency);
$all_currencies = get_available_currencies();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($page_title); ?></title>

    <!-- NEW: AOS Stylesheet for animations -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

    <!-- Linking to the generated style.css -->
    <link rel="stylesheet" href="<?php echo $base_path; ?>style.css?v=<?php echo time(); ?>">
    
    <!-- Additional page-specific CSS -->
    <?php if (isset($additional_css) && !empty($additional_css)): ?>
        <?php foreach ($additional_css as $css_file): ?>
            <link rel="stylesheet" href="<?php echo $base_path . $css_file; ?>?v=<?php echo time(); ?>" type="text/css">
        <?php endforeach; ?>
    <?php endif; ?>
    
    <!-- Temporary favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍳</text></svg>">

</head>
<body class="bg-background text-text-main antialiased font-sans <?php echo $is_logged_in ? 'logged-in' : 'guest'; ?>">

<!-- ===== HEADER ===== -->
<header class="bg-surface/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 gap-4">

            <!-- Site Logo -->
            <div class="flex-shrink-0">
                <a href="<?php echo $base_path; ?>">
                    <img class="h-10 w-auto" src="<?php echo $base_path; ?>images/logo.webp" alt="AI Recipe Generator Logo">
                </a>
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex md:items-center md:space-x-8 flex-1">
                <?php if ($is_logged_in): ?>
                    <a href="<?php echo $base_path; ?>" class="font-medium text-text-main hover:text-primary transition">Generator</a>
                    <a href="<?php echo $base_path; ?>samples.php" class="font-medium text-text-secondary hover:text-primary transition">Recipes</a>
                    <a href="<?php echo $base_path; ?>allergens.php" class="font-medium text-text-secondary hover:text-primary transition">Allergens &amp; Safety</a>
                    <a href="<?php echo $base_path; ?>nutrition.php" class="font-medium text-text-secondary hover:text-primary transition">Nutrition Guide</a>
                    <a href="<?php echo $base_path; ?>sustainability.php" class="font-medium text-text-secondary hover:text-primary transition">Food Waste &amp; Sustainability</a>
                    <a href="<?php echo $base_path; ?>faq" class="font-medium text-text-secondary hover:text-primary transition">FAQ</a>
                    <a href="<?php echo $base_path; ?>cabinet" class="font-medium text-text-secondary hover:text-primary transition">My Recipes</a>
                <?php else: ?>
                    <a href="<?php echo $base_path; ?>about" class="font-medium text-text-secondary hover:text-primary transition">About</a>
                    <a href="<?php echo $base_path; ?>samples.php" class="font-medium text-text-secondary hover:text-primary transition">Recipes</a>
                    <a href="<?php echo $base_path; ?>allergens.php" class="font-medium text-text-secondary hover:text-primary transition">Allergens &amp; Safety</a>
                    <a href="<?php echo $base_path; ?>sustainability.php" class="font-medium text-text-secondary hover:text-primary transition">Food Waste &amp; Sustainability</a>
                    <a href="<?php echo $base_path; ?>#pricing" class="font-medium text-text-secondary hover:text-primary transition">Pricing</a>
                    <a href="<?php echo $base_path; ?>faq" class="font-medium text-text-secondary hover:text-primary transition">FAQ</a>
                <?php endif; ?>
            </nav>

            

            <!-- Header Actions (Login/Register or User Info) -->
            <div class="hidden md:flex items-center space-x-4">
                <!-- Currency Selector (Desktop - moved inside actions to avoid layout overflow) -->
                <div class="relative">
                    <button id="currency-button" class="inline-flex items-center px-3 py-2 border border-border rounded-md text-sm font-medium text-text-secondary hover:text-text-main hover:bg-gray-50 transition">
                        <?php $__icon = $currency_config['flag_icon'] ?? ''; ?>
                        <?php if (!empty($__icon)): ?>
                            <img src="<?php echo $base_path . $__icon; ?>" alt="<?php echo $current_currency; ?>" class="h-4 w-4 mr-2 rounded-sm" />
                        <?php else: ?>
                            <span class="mr-1"><?php echo $currency_config['flag']; ?></span>
                        <?php endif; ?>
                        <span><?php echo $current_currency; ?></span>
                        <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="currency-dropdown" class="hidden absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-border z-50">
                        <?php foreach ($all_currencies as $code => $currency): ?>
                            <a href="#" data-currency="<?php echo $code; ?>" class="block px-4 py-2 text-sm text-text-secondary hover:bg-gray-50 hover:text-text-main <?php echo $code === $current_currency ? 'bg-gray-100 font-semibold' : ''; ?>">
                                <?php $__icon = $currency['flag_icon'] ?? ''; ?>
                                <?php if (!empty($__icon)): ?>
                                    <img src="<?php echo $base_path . $__icon; ?>" alt="<?php echo $code; ?>" class="h-4 w-4 mr-2 rounded-sm inline-block" />
                                <?php else: ?>
                                    <span class="mr-2"><?php echo $currency['flag']; ?></span>
                                <?php endif; ?>
                                <span><?php echo $code; ?> (<?php echo $currency['symbol']; ?>)</span>
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
                <?php if ($is_logged_in && isset($current_user_data)): ?>
                    <div class="text-sm text-text-secondary">
                        Balance: <strong class="font-semibold text-text-main"><?php echo number_format($current_user_data['balance'], 0); ?></strong> Tokens
                    </div>
                    <a href="<?php echo $base_path; ?>top-up" class="inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-primary bg-white hover:bg-gray-50 transition">
                        Top-Up
                    </a>
                    <a href="<?php echo $base_path; ?>cabinet" class="flex items-center justify-center h-9 w-9 bg-gray-200 rounded-full font-bold text-text-main hover:bg-gray-300 transition">
                        <?php echo htmlspecialchars(strtoupper(substr($current_user_data['first_name'], 0, 1))); ?>
                    </a>
                <?php else: ?>
                    <a href="<?php echo $base_path; ?>login" class="font-medium text-text-secondary hover:text-primary transition">Log In</a>
                    <a href="<?php echo $base_path; ?>register" class="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-hover">
                        Sign Up
                    </a>
                <?php endif; ?>
            </div>

            <!-- Mobile Menu Button -->
            <div class="md:hidden flex items-center">
                <button id="mobile-menu-button" class="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-main hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                    <span class="sr-only">Open main menu</span>
                    <svg class="h-6 w-6 block" id="menu-icon-burger" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    <svg class="h-6 w-6 hidden" id="menu-icon-close" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Navigation Panel -->
    <div id="mobile-menu" class="hidden md:hidden">
        <!-- Currency Selector (Mobile) -->
        <div class="px-2 pt-2 pb-2 border-b border-border">
            <label class="block text-xs font-medium text-text-secondary mb-2">Currency</label>
            <div class="flex gap-2">
                <?php foreach ($all_currencies as $code => $currency): ?>
                    <a href="#" data-currency="<?php echo $code; ?>" class="flex-1 flex items-center justify-center px-3 py-2 border rounded-md text-sm font-medium transition <?php echo $code === $current_currency ? 'border-primary bg-primary text-white' : 'border-border text-text-secondary hover:bg-gray-50'; ?>">
                        <?php $__icon = $currency['flag_icon'] ?? ''; ?>
                        <?php if (!empty($__icon)): ?>
                            <img src="<?php echo $base_path . $__icon; ?>" alt="<?php echo $code; ?>" class="h-5 w-5 mr-2 rounded-sm" />
                        <?php else: ?>
                            <span class="mr-1"><?php echo $currency['flag']; ?></span>
                        <?php endif; ?>
                        <span><?php echo $code; ?></span>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
        
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <?php if ($is_logged_in): ?>
                <a href="<?php echo $base_path; ?>" class="block px-3 py-2 rounded-md text-base font-medium text-text-main hover:bg-gray-50 hover:text-primary transition">Generator</a>
                <a href="<?php echo $base_path; ?>samples.php" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">Recipes</a>
                <a href="<?php echo $base_path; ?>cabinet" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">My Recipes</a>
                <a href="<?php echo $base_path; ?>allergens.php" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">Allergens &amp; Safety</a>
                <a href="<?php echo $base_path; ?>nutrition.php" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">Nutrition Guide</a>
                <a href="<?php echo $base_path; ?>sustainability.php" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">Food Waste &amp; Sustainability</a>
                <a href="<?php echo $base_path; ?>faq" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">FAQ</a>
            <?php else: ?>
                <a href="<?php echo $base_path; ?>about" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">About</a>
                <a href="<?php echo $base_path; ?>samples.php" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">Recipes</a>
                <a href="<?php echo $base_path; ?>allergens.php" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">Allergens &amp; Safety</a>
                <a href="<?php echo $base_path; ?>nutrition.php" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">Nutrition Guide</a>
                <a href="<?php echo $base_path; ?>sustainability.php" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">Food Waste &amp; Sustainability</a>
                <a href="<?php echo $base_path; ?>samples.php" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">Recipes</a>
                <a href="<?php echo $base_path; ?>allergens.php" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">Allergens &amp; Safety</a>
                <a href="<?php echo $base_path; ?>nutrition.php" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">Nutrition Guide</a>
                <a href="<?php echo $base_path; ?>#pricing" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">Pricing</a>
                <a href="<?php echo $base_path; ?>faq" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-gray-50 hover:text-primary transition">FAQ</a>
            <?php endif; ?>
        </div>
        <div class="pt-4 pb-3 border-t border-border">
            <?php if ($is_logged_in && isset($current_user_data)): ?>
                <div class="flex items-center px-5">
                    <div class="flex-shrink-0">
                         <div class="flex items-center justify-center h-10 w-10 bg-gray-200 rounded-full font-bold text-text-main"><?php echo htmlspecialchars(strtoupper(substr($current_user_data['first_name'], 0, 1))); ?></div>
                    </div>
                    <div class="ml-3">
                        <div class="text-base font-medium text-text-main"><?php echo htmlspecialchars($current_user_data['first_name']); ?></div>
                        <div class="text-sm font-medium text-text-secondary">Balance: <?php echo number_format($current_user_data['balance'], 0); ?> Tokens</div>
                    </div>
                </div>
                <div class="mt-3 px-2 space-y-1">
                    <a href="<?php echo $base_path; ?>top-up" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-main hover:bg-gray-50 transition">Top-Up Balance</a>
                    <a href="<?php echo $base_path; ?>logout" class="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-main hover:bg-gray-50 transition">Log Out</a>
                </div>
            <?php else: ?>
                <div class="px-5">
                     <a href="<?php echo $base_path; ?>register" class="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-hover">Sign Up</a>
                     <p class="mt-3 text-center text-base font-medium text-text-secondary">Already have an account? <a href="<?php echo $base_path; ?>login" class="text-primary hover:underline">Log In</a></p>
                </div>
            <?php endif; ?>
        </div>
    </div>
</header>
<!-- ===== END HEADER ===== -->
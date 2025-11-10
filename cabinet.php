<?php
// cabinet.php - v5 - Redesigned with Tailwind CSS

// --- Step 1: Preparation ---
if (session_status() === PHP_SESSION_NONE) { session_start(); }
require_once __DIR__ . '/config.php';
$page_title = 'My Account';

// --- Step 2: Prepare variables for header.php ---
// Base path is set by config.php/config.local.php
if (!isset($base_path)) {
    $base_path = '/';
} 
$current_user_data = null; 
$is_logged_in = false;

// --- Step 3: Check if user is logged in and get their data ---
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    
    // Get user's main data
    $stmt = $connection->prepare("SELECT id, first_name, last_name, email, company, balance FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $current_user_data = $result->fetch_assoc();
        $is_logged_in = true;
    }
    $stmt->close();
}

// --- Step 4: If user is NOT logged in, redirect them immediately ---
if (!$is_logged_in) {
    header("Location: " . rtrim($base_path, '/') . "/login");
    exit();
}

// --- Step 5: Get ADDITIONAL data needed only for this page ---
// 5a. Get user's recipe history (NEW LOGIC)
$user_recipes = [];
$stmt_recipes = $connection->prepare("SELECT id, recipe_title, created_at, pdf_file_path FROM user_recipes WHERE user_id = ? ORDER BY created_at DESC");
$stmt_recipes->bind_param("i", $user_id);
$stmt_recipes->execute();
$user_recipes = $stmt_recipes->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt_recipes->close();

// 5b. Get transaction history
$transaction_history = [];
$stmt_history = $connection->prepare(
    "SELECT type, amount, created_at, details FROM (
        SELECT 'credit' AS type, t.tokens AS amount, t.created_at, 'Top-Up' AS details
        FROM transfermit_topups t
        WHERE t.user_id = ? AND t.state = 'COMPLETED'
        UNION ALL
        SELECT 'decline' AS type, t.tokens AS amount, t.created_at, 'Top-Up Declined' AS details
        FROM transfermit_topups t
        WHERE t.user_id = ? AND t.state IN ('DECLINED','CANCELLED')
        UNION ALL
        SELECT 'debit' AS type, ur.cost AS amount, ur.created_at, ur.recipe_title AS details
        FROM user_recipes ur
        WHERE ur.user_id = ?
    ) x
    ORDER BY created_at DESC"
);
$stmt_history->bind_param("iii", $user_id, $user_id, $user_id);
$stmt_history->execute();
$transaction_history = $stmt_history->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt_history->close();


// --- Step 6: Now that ALL data is ready, include the header ---
include __DIR__ . '/templates/header.php';
?>

<main class="bg-gray-50 py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Page Header -->
        <div class="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h1 class="text-3xl font-extrabold text-text-main sm:text-4xl">My Account</h1>
            <p class="mt-2 text-base text-text-secondary">Manage your profile, view your recipes, and track your balance.</p>
        </div>

        <!-- Balance Widget -->
        <div class="mt-10 max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg flex items-center justify-between" data-aos="fade-up" data-aos-delay="100">
            <div>
                <p class="text-sm font-medium text-text-secondary">Current Balance</p>
                <p class="text-3xl font-bold text-primary"><?php echo number_format($current_user_data['balance'], 0); ?> Tokens</p>
            </div>
            <a href="<?php echo $base_path; ?>top-up" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover">
                Top-Up Now
            </a>
        </div>
        
        <!-- Main Content Area -->
        <div class="mt-10 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <div class="divide-y divide-border">
                    <!-- Section 1: My Recipes -->
                    <div class="p-6">
                        <h2 class="text-lg font-medium text-text-main">My Recipes</h2>
                        <div class="mt-4 flow-root">
                             <?php if (!empty($user_recipes)): ?>
                                <ul class="-my-5 divide-y divide-border">
                                    <?php foreach($user_recipes as $recipe): ?>
                                    <li class="py-4">
                                        <div class="flex items-center space-x-4">
                                            <div class="flex-shrink-0">
                                                <div class="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">🍳</div>
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-medium text-text-main truncate"><?php echo htmlspecialchars($recipe['recipe_title']); ?></p>
                                                <p class="text-sm text-text-secondary truncate">Created on <?php echo date("d M Y", strtotime($recipe['created_at'])); ?></p>
                                            </div>
                                            <div>
                                                <a href="<?php echo htmlspecialchars($base_path . $recipe['pdf_file_path']); ?>" download class="inline-flex items-center shadow-sm px-2.5 py-1.5 border border-border text-sm leading-5 font-medium rounded-md text-text-secondary bg-white hover:bg-gray-50">
                                                    Download PDF
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php else: ?>
                                <div class="text-center py-8 px-4 border-2 border-dashed border-border rounded-lg">
                                    <p class="text-sm text-text-secondary">You haven't created any recipes yet.</p>
                                    <a href="<?php echo $base_path; ?>" class="mt-2 inline-block text-sm font-medium text-primary hover:underline">Generate your first recipe!</a>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                     <!-- Section 2: Account Details -->
                    <div class="p-6">
                        <h2 class="text-lg font-medium text-text-main">Account Details</h2>
                        <dl class="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-text-secondary">First Name</dt>
                                <dd class="mt-1 text-sm text-text-main"><?php echo htmlspecialchars($current_user_data['first_name']); ?></dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-text-secondary">Last Name</dt>
                                <dd class="mt-1 text-sm text-text-main"><?php echo htmlspecialchars($current_user_data['last_name']); ?></dd>
                            </div>
                             <div class="sm:col-span-2">
                                <dt class="text-sm font-medium text-text-secondary">Email</dt>
                                <dd class="mt-1 text-sm text-text-main"><?php echo htmlspecialchars($current_user_data['email']); ?></dd>
                            </div>
                             <div class="sm:col-span-2">
                                <dt class="text-sm font-medium text-text-secondary">Company</dt>
                                <dd class="mt-1 text-sm text-text-main"><?php echo htmlspecialchars($current_user_data['company'] ?: 'Not specified'); ?></dd>
                            </div>
                        </dl>
                    </div>
                    <!-- Section 3: Transaction History -->
                    <div class="p-6">
                        <h2 class="text-lg font-medium text-text-main">Transaction History</h2>
                         <div class="mt-4 flow-root">
                             <?php if (!empty($transaction_history)): ?>
                                <ul class="-my-5 divide-y divide-border">
                                    <?php foreach($transaction_history as $transaction): ?>
                                    <li class="py-4">
                                        <div class="flex items-center space-x-4">
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-medium text-text-main truncate"><?php echo htmlspecialchars($transaction['details']); ?></p>
                                                <p class="text-sm text-text-secondary truncate"><?php echo date("d M Y, H:i", strtotime($transaction['created_at'])); ?></p>
                                            </div>
                                            <div class="inline-flex items-center text-sm font-semibold">
                                                <?php if ($transaction['type'] === 'credit'): ?>
                                                    <span class="text-green-600">+ <?= number_format((int)$transaction['amount'], 0) ?> Tokens</span>
                                                <?php elseif ($transaction['type'] === 'decline'): ?>
                                                    <span class="text-red-600">Declined (<?= number_format((int)$transaction['amount'], 0) ?> Tokens)</span>
                                                <?php else: ?>
                                                    <span class="text-red-600">- <?= number_format((int)$transaction['amount'], 0) ?> Tokens</span>
                                                <?php endif; ?>
                                            </div>


                                        </div>
                                    </li>
                                     <?php endforeach; ?>
                                </ul>
                             <?php else: ?>
                                <p class="text-center py-4 text-sm text-text-secondary">No transactions recorded yet.</p>
                             <?php endif; ?>
                         </div>
                    </div>
                </div>
            </div>
             <!-- Logout Button -->
            <div class="mt-8 text-center" data-aos="fade-up">
                <a href="<?php echo $base_path; ?>logout" class="text-sm font-medium text-text-secondary hover:text-primary hover:underline">Log Out</a>
            </div>
        </div>
    </div>
</main>

<?php 
include __DIR__ . '/templates/footer.php'; 
?>
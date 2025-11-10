<?php
if (session_status() === PHP_SESSION_NONE) { session_start(); }
require_once __DIR__ . '/config.php';
$page_title = 'Payment Successful';
// Base path is set by config.php/config.local.php
if (!isset($base_path)) {
    $base_path = '/';
}

$current_user_data = null;
$is_logged_in = false;
if (isset($_SESSION['user_id'])) {
    $stmt = $connection->prepare("SELECT id, first_name, balance FROM users WHERE id = ?");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) { $current_user_data = $result->fetch_assoc(); $is_logged_in = true; }
    $stmt->close();
}
if (!$is_logged_in) { header("Location: " . rtrim($base_path, '/') . "/login"); exit(); }

$pid = isset($_GET['pid']) ? preg_replace('/[^a-z0-9]/i','',$_GET['pid']) : '';
$stateParam = isset($_GET['state']) ? strtoupper($_GET['state']) : '';
$finalState = $stateParam;
$creditedTokens = 0;

if ($pid !== '') {
    $stmt = $connection->prepare("SELECT id,user_id,tokens,state FROM transfermit_topups WHERE user_id=? AND payment_id=? ORDER BY id DESC LIMIT 1");
    $stmt->bind_param("is", $_SESSION['user_id'], $pid);
    $stmt->execute();
    $res = $stmt->get_result();
    $row = $res ? $res->fetch_assoc() : null;
    $stmt->close();

    $ch = curl_init(TM_API_URL . '/payments/' . $pid);
    curl_setopt_array($ch, [
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . TM_API_KEY, 'Accept: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 25
    ]);
    $resp = curl_exec($ch);
    $http = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);

    if ($http >= 200 && $http < 300 && $resp) {
        $data = json_decode($resp, true);
        $r = $data['result'] ?? $data;
        $finalState = strtoupper($r['state'] ?? $finalState);

        if ($row && $finalState !== $row['state']) {
            $stmt = $connection->prepare("UPDATE transfermit_topups SET state=? WHERE id=?");
            $stmt->bind_param("si", $finalState, $row['id']);
            $stmt->execute();
            $stmt->close();

            if ($finalState === 'COMPLETED' && strtoupper($row['state']) !== 'COMPLETED') {
                $tokens = (int)$row['tokens'];
                if ($tokens > 0) {
                    $stmt = $connection->prepare("UPDATE users SET balance = balance + ? WHERE id=?");
                    $stmt->bind_param("ii", $tokens, $_SESSION['user_id']);
                    $stmt->execute();
                    $stmt->close();
                    $creditedTokens = $tokens;
                    if (isset($current_user_data['balance'])) { $current_user_data['balance'] += $tokens; }
                }
            }
        }
    }
}

include __DIR__ . '/templates/header.php';
?>

<main class="bg-gray-50">
    <div class="flex items-center justify-center min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 text-center" data-aos="fade-up">
            <div>
                <svg class="mx-auto h-12 w-auto text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 class="mt-6 text-3xl font-extrabold text-text-main">Payment Successful!</h2>
                <p class="mt-2 text-base text-text-secondary">
                    Your Tokens have been added to your account. You can now continue creating.
                </p>
            </div>
            <div>
                <a href="<?php echo $base_path; ?>" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover">
                    Start Generating
                </a>
            </div>
        </div>
    </div>
</main>

<?php include __DIR__ . '/templates/footer.php'; ?>
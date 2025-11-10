<?php
// google_auth_callback.php - Handles the response from Google after user authentication.

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/vendor/autoload.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$client = new Google_Client();
$client->setClientId(GOOGLE_CLIENT_ID);
$client->setClientSecret(GOOGLE_CLIENT_SECRET);
$client->setRedirectUri(GOOGLE_REDIRECT_URI);

// Check if we received an authorization code from Google
if (isset($_GET['code'])) {
    try {
        // Exchange the authorization code for an access token
        $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
        if (isset($token['error'])) {
            throw new Exception($token['error_description']);
        }
        $client->setAccessToken($token['access_token']);

        // Get user profile information from Google
        $google_oauth = new Google_Service_Oauth2($client);
        $google_account_info = $google_oauth->userinfo->get();
        
        $email = $google_account_info->email;
        $first_name = $google_account_info->givenName;
        $last_name = $google_account_info->familyName;
        
        // Now, check if this user already exists in our database
        $stmt_check = $connection->prepare("SELECT id, first_name FROM users WHERE email = ?");
        $stmt_check->bind_param("s", $email);
        $stmt_check->execute();
        $result = $stmt_check->get_result();
        
        if ($result->num_rows > 0) {
            // User exists! Log them in.
            $user = $result->fetch_assoc();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_first_name'] = $user['first_name'];
        } else {
            // User does not exist. Create a new account for them.
            // We generate a secure random password as it's required, but they'll never use it.
            $random_password = password_hash(bin2hex(random_bytes(16)), PASSWORD_DEFAULT);
            
            $stmt_insert = $connection->prepare("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
            $stmt_insert->bind_param("ssss", $first_name, $last_name, $email, $random_password);
            
            if ($stmt_insert->execute()) {
                // New user created. Now, log them in.
                $_SESSION['user_id'] = $stmt_insert->insert_id;
                $_SESSION['user_first_name'] = $first_name;
            } else {
                throw new Exception("Could not create a new user in the database.");
            }
        }

        // Redirect to the homepage after successful login/registration
        header('Location: index.php');
        exit();

    } catch (Exception $e) {
        // Handle any errors during the process
        // In a real app, you'd log this error and show a user-friendly message.
        die('Authentication failed: ' . $e->getMessage());
    }
} else {
    // No code received, redirect to login
    header('Location: login.php');
    exit();
}
?>
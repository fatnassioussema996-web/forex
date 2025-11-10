<?php
// handle_login.php (V3.1 - Redesigned with user-friendly error handling)

// We MUST start the session at the very beginning to access $_SESSION.
session_start();

// We MUST use the absolute path to find the config file for reliability.
require_once __DIR__ . '/config.php';

// Check if the form was actually submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Use prepared statements for security to prevent SQL injection
    $stmt = $connection->prepare("SELECT id, email, password, first_name FROM users WHERE email = ?");
    if ($stmt === false) {
        // This is a server error, not a user error.
        die("MySQL prepare error: " . $connection->error);
    }
    
    $stmt->bind_param("s", $_POST['email']);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if a user with that email exists
    if ($result && $result->num_rows == 1) {
        $user = $result->fetch_assoc();

        // Verify the submitted password against the hashed password in the database
        if (password_verify($_POST['password'], $user['password'])) {
            // ===================================
            // ===== SUCCESSFUL LOGIN BLOCK ======
            // ===================================
            // Password is correct! Log the user in.
            
            // 1. Store user's data in the session to keep them logged in
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_first_name'] = $user['first_name'];
            
            // 2. Clean up any leftover email from a previous failed attempt
            unset($_SESSION['login_attempt_email']);
            
            // 3. Redirect to the main page for logged-in users.
            header("Location: index.php");
            exit();
        }
    }
    
    // ===================================
    // ====== FAILED LOGIN BLOCK =========
    // ===================================
    // If the script reaches this point, it means:
    // 1. The email was not found, OR
    // 2. The password was incorrect.
    
    // 1. Save the email the user tried to log in with, so they don't have to re-type it.
    $_SESSION['login_attempt_email'] = $_POST['email'];
    
    // 2. Redirect back to the login page with an error message.
    header("Location: login.php?error=invalid_credentials");
    exit();

} else {
    // If someone tries to access this file directly without submitting the form,
    // just redirect them to the homepage.
    header("Location: index.php");
    exit();
}
?>
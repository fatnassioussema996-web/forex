<?php
// handle_contact_form.php - v2 - Updated for new form fields

// We require the send_email function, which likely uses PHPMailer
require_once __DIR__ . '/send_email.php';

// Best practice: start session for potential future use (e.g., flash messages)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if the form was submitted using the POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- 1. Get and sanitize form data ---
    // Using the NEW 'name' attributes from the redesigned form
    $first_name = trim($_POST['first_name'] ?? '');
    $last_name  = trim($_POST['last_name'] ?? '');
    $email_from = trim($_POST['email'] ?? '');
    $message    = trim($_POST['message'] ?? '');

    // --- 2. Basic Validation ---
    if (empty($first_name) || empty($last_name) || empty($email_from) || !filter_var($email_from, FILTER_VALIDATE_EMAIL) || empty($message)) {
        // TODO: In a future step, replace 'die' with a session-based error message
        die("Error: Please fill all required fields and provide a valid email address.");
    }

    // --- 3. Prepare Email Content ---
    $recipient_email = 'support@airecipegenerator.com'; // NEW: Your actual email address
    $subject         = "New Contact Form Message from " . htmlspecialchars($first_name);

    // Create a nicely formatted HTML body for the email
    $body = "
        <h2>New message from your website's contact form:</h2>
        <hr>
        <p><strong>From:</strong> " . htmlspecialchars($first_name) . " " . htmlspecialchars($last_name) . "</p>
        <p><strong>Email:</strong> <a href='mailto:" . htmlspecialchars($email_from) . "'>" . htmlspecialchars($email_from) . "</a></p>
        <br>
        <h3>Message:</h3>
        <p>" . nl2br(htmlspecialchars($message)) . "</p>
    ";

    // --- 4. Send the Email using our function ---
    // The sendEmail function is assumed to be working from 'send_email.php'
    if (sendEmail($recipient_email, $subject, $body, $email_from, $first_name)) {
        // --- 5. Redirect on Success ---
        // Redirect to a 'thank you' page.
        header("Location: thank_you.php");
        exit();
    } else {
        // --- 6. Handle Error ---
        // TODO: Replace 'die' with a session-based error message
        die("Sorry, there was an error sending your message. Please try again later.");
    }

} else {
    // If someone tries to access this file directly, redirect them to the homepage.
    header("Location: index.php");
    exit();
}
?>
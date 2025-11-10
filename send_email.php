<?php
// send_email.php
// This file will be used to send all our emails.

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include the PHPMailer files
require 'libs/PHPMailer.php';
require 'libs/SMTP.php';
require 'libs/Exception.php';

function sendEmail($to, $subject, $body) {
    $mail = new PHPMailer(true); // Passing `true` enables exceptions

    try {
        // --- SERVER SETTINGS (for your Namecheap private email) ---
        $mail->isSMTP();
        $mail->Host       = 'mail.privateemail.com'; // Namecheap Private Email SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@stargen.co.uk'; // Your full email address
        $mail->Password   = 'Delivery23!';       // The password for this email account
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        // --- RECIPIENTS ---
        $mail->setFrom('info@stargen.co.uk', 'StarGen Support'); // Set the sender's email and name
        $mail->addAddress($to); // Add a recipient

        // --- CONTENT ---
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;
        // Optional: a plain-text version for non-HTML mail clients
        $mail->AltBody = strip_tags($body);

        $mail->send();
        return true; // Return true if email was sent
        
    } catch (Exception $e) {
        // You can log the error for debugging, but don't show it to the user.
        // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        return false; // Return false if there was an error
    }
}
?>
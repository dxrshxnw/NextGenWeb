<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input data
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST["message"]));

    // Check that data was sent to the mailer.
    if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR empty($message) ) {
        echo "Please complete the form and try again.";
        exit;
    }

    // Recipient email
    $recipient = "your-email@example.com"; // Replace with your email

    // Email subject
    $subject = "New contact from $name";

    // Email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Email headers
    $email_headers = "From: $name <$email>";

    // Send the email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }

} else {
    // Not a POST request
    echo "There was a problem with your submission, please try again.";
}
?>

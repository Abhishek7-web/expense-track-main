<?php
include 'DBconnection.php'; // Include database connection

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve form data
    $email = isset($_POST['email2']) ? trim($_POST['email2']) : null;
    $password = isset($_POST['pass2']) ? $_POST['pass2'] : null;
    $confirm_password = isset($_POST['con_pass2']) ? $_POST['con_pass2'] : null;

    // Validate form data
    if (empty($email) || empty($password) || empty($confirm_password)) {
        die("All fields are required!");
    }

    if ($password !== $confirm_password) {
        die("Passwords do not match.");
    }

    // Hash the password for security
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    // Prepare and execute the SQL query
    try {
        $stmt = $conn->prepare("INSERT INTO Users (Email, PasswordHash) VALUES (?, ?)");
        $stmt->bind_param("ss", $email, $passwordHash);

        if ($stmt->execute()) {
            // Store success message in session
            $_SESSION['signup_success'] = "Thanks for signing up! ✅";
        
            // Redirect to home.html
            header("Location: home.html");
            exit();
        } else {
            echo "Error: " . $stmt->error;
        }        
    } catch (mysqli_sql_exception $e) {
        echo "Database error: " . $e->getMessage();
    }

    // Close the statement and connection
    $stmt->close();
    mysqli_close($conn);
}
?>

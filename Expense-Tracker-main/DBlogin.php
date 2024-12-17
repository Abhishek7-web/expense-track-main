<?php
// Start session
session_start();

// Include database connection
include 'DBconnection.php';

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data and sanitize inputs
    $email = trim($_POST['email1']);
    $password = trim($_POST['pass1']);

    // Check if email or password is empty
    if (empty($email) || empty($password)) {
        $_SESSION['login_error'] = "All fields are required!";
        header("Location: index.html");
        exit();
    }

    // Prepare SQL query
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    if (!$stmt) {
        die("Prepare failed: " . $conn->error); // Check for prepare error
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        // Verify password
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_id'] = $user['id'];

            header("Location: home.html");
            exit();
        } else {
            $_SESSION['login_error'] = "Invalid password!";
            header("Location: index.html");
            exit();
        }
    } else {
        $_SESSION['login_error'] = "No user found with this email!";
        header("Location: index.html");
        exit();
    }

    // Close the statement
    if (isset($stmt)) {
        $stmt->close();
    }
}

// Close the connection
if (isset($conn)) {
    mysqli_close($conn);
}
?>

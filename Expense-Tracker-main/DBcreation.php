<?php
$host = 'localhost'; // Database host
$user = 'root';      // Database username
$pass = '';          // Database password (default for XAMPP is empty)

// Create connection
$conn = mysqli_connect($host, $user, $pass);

// Check connection
if (!$conn) {
    die('Database connection failed: ' . mysqli_connect_error());
}

// SQL to create the database
$dbname = 'exptrackdb'; // Database name
$sql = "CREATE DATABASE IF NOT EXISTS $dbname"; // Use IF NOT EXISTS to avoid duplication errors

if (mysqli_query($conn, $sql)) {
    echo "Database '$dbname' created successfully or already exists.";
} else {
    echo "Error creating database '$dbname': " . mysqli_error($conn); // Improved error message
}

// Close the connection
mysqli_close($conn);
?>

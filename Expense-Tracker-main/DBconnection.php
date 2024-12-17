<?php
$host = 'localhost'; // Database host
$user = 'root';      // Database username
$pass = '';          // Database password (default for XAMPP is empty)
$dbname = 'exptrackdb'; // Database name

// Create connection
$conn = mysqli_connect($host, $user, $pass, $dbname);

// Check connection
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}
?>

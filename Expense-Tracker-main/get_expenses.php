<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "exptrackdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch recent transactions
$sql = "SELECT category, date, description, amount FROM expenses ORDER BY created_at DESC LIMIT 10";
$result = $conn->query($sql);

$transactions = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $transactions[] = $row;
    }
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($transactions);

$conn->close();
?>

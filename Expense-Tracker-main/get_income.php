<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "exptrackdb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch all income records
$sql = "SELECT * FROM income ORDER BY date DESC";
$result = $conn->query($sql);

$incomeData = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $incomeData[] = $row;
    }
}

echo json_encode($incomeData);
$conn->close();
?>

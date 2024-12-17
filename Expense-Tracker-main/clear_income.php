<?php
// Include database connection
include 'DBconnection.php';

// Clear all income records from the database
$sql = "DELETE FROM incomes";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "All income records cleared."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to clear income records."]);
}

// Close the database connection
$conn->close();
?>

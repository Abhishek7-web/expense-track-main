<?php
require 'DBconnection.php'; // Ensure this file contains the DB connection

header('Content-Type: application/json');

// Query to fetch all expenses
$sql = "SELECT * FROM expenses ORDER BY date DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $expenses = [];
    while ($row = $result->fetch_assoc()) {
        $expenses[] = [
            'id' => $row['id'],
            'category' => $row['category'],
            'date' => $row['date'],
            'description' => $row['description'],
            'amount' => (float) $row['amount']
        ];
    }
    echo json_encode(['success' => true, 'transactions' => $expenses]);
} else {
    echo json_encode(['success' => true, 'transactions' => []]); // No transactions found
}

$conn->close();
?>

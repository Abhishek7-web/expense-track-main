<?php
require 'DBconnection.php'; // Ensure this file contains the DB connection

header('Content-Type: application/json');

// Retrieve the data from the request body
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['category'], $data['date'], $data['description'], $data['amount'])) {
    $category = $data['category'];
    $date = $data['date'];
    $description = $data['description'];
    $amount = $data['amount'];

    // Prepare the SQL statement to insert data
    $sql = "INSERT INTO expenses (category, date, description, amount) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssd", $category, $date, $description, $amount);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Expense added successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add expense.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input data.']);
}

$conn->close();
?>

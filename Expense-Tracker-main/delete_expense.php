<?php
require 'DBconnection.php'; // Ensure this file contains the DB connection

header('Content-Type: application/json');

// Retrieve the data from the request body
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $id = $data['id'];

    // Prepare the SQL statement to delete the expense
    $sql = "DELETE FROM expenses WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Expense deleted successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete expense.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input data.']);
}

$conn->close();
?>

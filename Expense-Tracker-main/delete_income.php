<?php
// Include database connection
include 'DBconnection.php';

// Retrieve JSON data from the request body
$data = json_decode(file_get_contents("php://input"), true);

// Check if the income ID is present
if (isset($data['id'])) {
    $id = $data['id'];

    // Delete the income record from the database
    $sql = "DELETE FROM incomes WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Income deleted successfully!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to delete income."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid income ID."]);
}

// Close the database connection
$conn->close();
?>

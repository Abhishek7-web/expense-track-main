<?php
// Include database connection
include 'DBconnection.php';

// Retrieve JSON data from the request body
$data = json_decode(file_get_contents("php://input"), true);

// Check if all required fields are present
if (isset($data['category'], $data['date'], $data['description'], $data['amount'])) {
    $category = $data['category'];
    $date = $data['date'];
    $description = $data['description'];
    $amount = $data['amount'];

    // Insert the income data into the database
    $sql = "INSERT INTO incomes (category, date, description, amount) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssd", $category, $date, $description, $amount);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Income added successfully!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add income."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid data."]);
}

// Close the database connection
$conn->close();
?>

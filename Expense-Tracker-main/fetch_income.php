<?php
// Include database connection
include 'DBconnection.php';

// Fetch all incomes from the database
$sql = "SELECT * FROM incomes ORDER BY date DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $incomes = [];

    while ($row = $result->fetch_assoc()) {
        $incomes[] = [
            "id" => $row['id'],
            "category" => $row['category'],
            "date" => $row['date'],
            "description" => $row['description'],
            "amount" => $row['amount']
        ];
    }

    echo json_encode(["success" => true, "incomes" => $incomes]);
} else {
    echo json_encode(["success" => false, "message" => "No income records found."]);
}

// Close the database connection
$conn->close();
?>

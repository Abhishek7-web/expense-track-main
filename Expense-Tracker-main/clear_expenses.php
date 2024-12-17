<?php
// Connect to the database
require 'DBconnection.php';

$response = ['success' => false];

try {
    $query = "DELETE FROM expenses";
    if ($conn->query($query) === TRUE) {
        $response['success'] = true;
    } else {
        $response['error'] = "Failed to clear transactions.";
    }
} catch (Exception $e) {
    $response['error'] = $e->getMessage();
}

echo json_encode($response);
?>

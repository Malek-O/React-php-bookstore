<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once 'connection.php';

$sql = "SELECT * FROM book";
$result = mysqli_query($conn, $sql);
$resultCheck = mysqli_num_rows($result);
$data = array();
if ($resultCheck > 0) {
    // Convert data into JSON format
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
}
echo json_encode($data);
mysqli_close($conn);

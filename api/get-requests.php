<?php
$servername = "localhost";
$username = "username";
$password = "pw";
$dbname = "dbname";

if (isset($_SERVER["HTTP_ORIGIN"])) {
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
} else {
    //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");

header('Content-Type: application/json');

header('Access-Control-Allow-Methods: GET');

header("Access-Control-Allow-Headers: X-Requested-With");

// Create connection
// $conn = new mysqli($servername, $username, $password, $dbname);
// $conn = mysqli_connect($servername, $username, $password, $dbname);
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// $sql = "SELECT * FROM company";
// $sql = "SELECT visaMerchantName, merchantStreetAddress, offer FROM company where offer <> ''";
$sql = "SELECT visaMerchantName, merchantStreetAddress, request FROM company where request <> ''";
// 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();

    while ($row = $result->fetch_assoc()) {
        if (json_decode(json_encode($row)) != null) {
            $data[] = json_decode(json_encode($row));
        }

    }
    echo json_encode($data);
} else {
    echo "0 results";
}
$conn->close();

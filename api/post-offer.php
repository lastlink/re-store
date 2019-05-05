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

header('Access-Control-Allow-Methods: POST');

header("Access-Control-Allow-Headers: X-Requested-With");

// echo "test";

$request_method=$_SERVER["REQUEST_METHOD"];

if($request_method!="POST"){
    echo "bad method";
    exit();

}

try {
    //code...


// echo $_GET["visaMerchantName"];

$entityBody = file_get_contents('php://input');
$obj = json_decode($entityBody); 
// echo $obj->{"visaMerchantName"};
// echo json_encode($_POST["visaMerchantName"]);
// exit();
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
// $sql = "SELECT visaMerchantName, merchantStreetAddress, request FROM company where request <> ''";
// 

$sql = "INSERT INTO company (visaMerchantName, merchantStreetAddress, offer, merchantCategoryCodeDesc)
VALUES ('".$obj->{"visaMerchantName"} ."', '".$obj->{"merchantStreetAddress"} ."', '".$obj->{"offer"} ."', '".$obj->{"merchantCategoryCodeDesc"} ."')";

// $sql = mysqli_real_escape_string($sql);

// echo $sql;
// exit();

if ($conn->query($sql) === TRUE) {
    echo json_encode("New record created successfully");
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
} catch (\Throwable $th) {
    echo $th;
    echo json_encode("failed to insert");
}

// }
// $result = $conn->query($sql);

// if ($result->num_rows > 0) {
//     $data = array();

//     while ($row = $result->fetch_assoc()) {
//         if (json_decode(json_encode($row)) != null) {
//             $data[] = json_decode(json_encode($row));
//         }

//     }
//     echo json_encode($data);
// } else {
//     echo "0 results";
// }
// $conn->close();

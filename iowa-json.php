<?php
$servername = "localhost";
$username = "username";
$password = "pw";
$dbname = "dbname";
if(isset($_SERVER["HTTP_ORIGIN"]))
{
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
else
{
    //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");

header('Content-Type: application/json');


header('Access-Control-Allow-Methods: GET');

header("Access-Control-Allow-Headers: X-Requested-With");
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
//echo "Connected successfully"; 

$sql = "SELECT location, adddress, phone, website, email FROM resources";
$result = $conn->query($sql);

$result_json;

if ($result->num_rows > 0) {
    // output data of each row\
    // echo json_encode($result);
    header('Content-Type: application/json');

    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    print json_encode($rows);
    // while($row = $result->fetch_assoc()) {
    //     echo "location: " . $row["location"]."<br>";
	// echo "address: " . $row["adddress"]."<br>";
	// echo "phone: " . $row["phone"]."<br>";
	// echo "website: " . $row["website"]."<br>";
	// echo "email: " . $row["email"]."<br>";
	// echo "<br> <br>";
    // }
} else {
    echo "0 results";
}
$conn->close();


?>
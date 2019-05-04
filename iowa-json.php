<?php
$servername = "localhost";
$username = "username";
$password = "pw";
$dbname = "dbname";

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
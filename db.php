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
echo "Connected successfully";

$sql = "SELECT location FROM resources";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "location: " . $row["idresources"]."<br>";
    }
} else {
    echo "0 results";
}
$conn->close();


?>
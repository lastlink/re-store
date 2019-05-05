<h1>Iowa Resources </h1>
<a href="https://disasterloan.sba.gov/ela/Account/Login">Loans From SBA to Redbuild </a>
</br> </br>
<p> These organizations can help you recover documents and provide counciling. </p>

<?php
$servername = "localhost";
$username = "user";
$password = "password";
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

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "location: " . $row["location"]."<br>";
	echo "address: " . $row["adddress"]."<br>";
	echo "phone: " . $row["phone"]."<br>";
	echo "website: " . $row["website"]."<br>";
	echo "email: " . $row["email"]."<br>";
	echo "<br> <br>";
    }
} else {
    echo "0 results";
}
$conn->close();


?>
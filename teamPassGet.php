<?php

header('Content-Type: application/json');

//DEPRICATED________________________________________________
//$servername = "localhost";
//$username = "root";
//$password = "monopolysql";
//$dbname = "monopoly";

//$conn = new mysqli($servername, $username, $password, $dbname);

//if ($conn->connect_error){
	//die("Connection failed: " . $conn->connect_error);
//}
//DEPRICATED________________________________________________


//This is a more secure way to connect to the database.
require_once('sqliconnect.php');

$sql = "SELECT name, passone, passtwo FROM teams";
$result = $conn->query($sql);
$nameArray = array();
if ($result->num_rows > 0){
	while($row = $result->fetch_assoc()){
		$nameArray[] = $row;
	} 
} else {
	echo "0 results";
}

echo json_encode($nameArray, true);

$conn->close();
?>
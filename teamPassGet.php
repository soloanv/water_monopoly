<?php

header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "monopolysql";
$dbname = "monopoly";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error){
	die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT tName, tPassOne, tPassTwo FROM teams";
$result = $conn->query($sql);
$nameArray = array();
if ($result->num_rows > 0){
	while($row = $result->fetch_assoc()){
		//echo "tName: " . $row["tName"] . "<br>";
		$nameArray[] = $row;
	} 
} else {
	echo "0 results";
}

echo json_encode($nameArray, true);

$conn->close();
?>
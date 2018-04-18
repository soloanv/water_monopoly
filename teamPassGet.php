<?php

header('Content-Type: application/json');

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
<?php

header('Content-Type: application/json');
require_once('sqliconnect.php');


$sql = "SELECT * FROM teams";
$teamArray = array();
$result = $conn->query($sql);
if ($result->num_rows > 0){
	while($row = $result->fetch_assoc()){
		$teamArray[] = $row;
	}
} else {
	echo "0 results";
}

echo json_encode($teamArray);

$conn->close();

?>
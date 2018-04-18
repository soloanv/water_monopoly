<?php

header('Content-Type: application/json');
require_once('sqliconnect.php');

$sql = "SELECT * FROM properties WHERE type = 2";
$propertyArray = array();
$result = $conn->query($sql);
if ($result->num_rows > 0){
	while($row = $result->fetch_assoc()){
		$propertyArray[] = $row;
	}
} else {
	echo "0 results";
}

echo json_encode($propertyArray, true);

$conn->close();

?>
<?php

header('Content-Type: application/json');
require_once('sqliconnect.php');


$sql = "SELECT id FROM properties ORDER BY id DESC LIMIT 1";
$max = 0;
$result = $conn->query($sql);
if ($result->num_rows > 0){
	while($row = $result->fetch_assoc()){
		$max = $row['id'];
	}
} else {
	echo "0 results";
}

echo($max);
//echo json_encode($propertyArray, true);

$conn->close();

?>
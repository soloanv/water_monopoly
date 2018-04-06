<?php

header('Content-Type: application/json');
require_once('sqliconnect.php');

//you must send id=
$teamID = $_POST['id'];


$sql = "SELECT * FROM teams WHERE id = " . $teamID;
$teamArray = array();
$result = $conn->query($sql);
if ($result->num_rows > 0){
	while($row = $result->fetch_assoc()){
		$teamArray[] = $row;
	}
} else {
	echo "0 results";
}

echo json_encode($teamArray, true);

$conn->close();

?>
<?php
//header('Content-Type: application/json');

//you must send addbalance= and id=
$newQA = $_POST['qa'];
$teamID = $_POST['id'];




require_once('sqliconnect.php');
$query = "UPDATE teams SET QA = " . $newQA . " WHERE id =" . $teamID;

if ($conn->query($query) === TRUE) {
    echo "QA updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
	
?>
<?php
//header('Content-Type: application/json');

//you must send addbalance= and id=
$addBalance = $_POST['addbalance'];
$teamID = $_POST['id'];




require_once('sqliconnect.php');
$query = "UPDATE teams SET balance = balance + " . $addBalance . " WHERE id = (" . $teamID . ")";

if ($conn->query($query) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
	
	


?>
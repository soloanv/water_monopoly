<?php
//header('Content-Type: application/json');

//you must send addbalance= and id=
$newLoc = $_POST['location'];
$teamID = $_POST['id'];




require_once('sqliconnect.php');
$query = "UPDATE teams SET location = " . $newLoc . " WHERE id =" . $teamID;

if ($conn->query($query) === TRUE) {
    echo "Location updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
	
?>
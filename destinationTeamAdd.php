<?php
//header('Content-Type: application/json');

//you must send addbalance= and id=
$newDest = $_POST['destination'];
$teamID = $_POST['id'];




require_once('sqliconnect.php');
$query = "UPDATE teams SET destination = " . $newDest . " WHERE id =" . $teamID;

if ($conn->query($query) === TRUE) {
    echo "Destination updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
	
?>
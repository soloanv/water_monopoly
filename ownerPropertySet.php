<?php
//header('Content-Type: application/json');

//you must send newOwner= and id=
$newOwner = $_POST['newOwner'];
$propertyID = $_POST['id'];




require_once('sqliconnect.php');
$query = "UPDATE properties SET owner = " . $newOwner . " WHERE id = (" . $propertyID . ")";

if ($conn->query($query) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
	
	


?>
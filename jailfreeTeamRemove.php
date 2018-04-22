<?php
//header('Content-Type: application/json');

$teamID = $_POST['id'];


require_once('sqliconnect.php');
$query = "UPDATE teams SET jailfree = 1 WHERE id =" . $teamID;

if ($conn->query($query) === TRUE) {
    echo "Jailfree updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
	
?>
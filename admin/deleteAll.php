<html>
<head>
<title>Database Data Deleted</title>
</head>
<body>
<?php

if(isset($_POST['submit'])){
	require_once('../sqliconnect.php');

	$query = "DELETE FROM teams";

	if ($conn->query($query) === TRUE) {
		echo "Team Table Data Deleted</br>";
	} else {
		echo "Error updating teams: " . $conn->error . "</br>";
	}
	
	$query = "DELETE FROM properties";

	if ($conn->query($query) === TRUE) {
		echo "Properties Table Data Deleted</br>";
	} else {
		echo "Error updating properties: " . $conn->error . "</br>";
	}

$conn->close();	
	
}

?>

<p>
<input type="button" onclick="location.href='index.html'" value="Back" />
</p>
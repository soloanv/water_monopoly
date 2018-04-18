<html>
<head>
<title>Database Reset to Game Start</title>
</head>
<body>
<?php

if(isset($_POST['submit'])){
	require_once('../sqliconnect.php');

	$query = "UPDATE teams SET balance=1500,location=1,destination=1,QA=1,jailfree=1";

	if ($conn->query($query) === TRUE) {
		echo "Team Table Reset</br>";
	} else {
		echo "Error updating teams: " . $conn->error . "</br>";
	}
	
	$query = "UPDATE properties SET improvement=1,owner=-1";

	if ($conn->query($query) === TRUE) {
		echo "Properties Table Reset</br>";
	} else {
		echo "Error updating properties: " . $conn->error . "</br>";
	}

$conn->close();	
	
}

?>

<p>
<input type="button" onclick="location.href='index.html'" value="Back to Home" />
</p>
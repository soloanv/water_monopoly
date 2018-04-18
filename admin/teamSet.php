<html>
<head>
<title>Property Submitted</title>
</head>
<body>
<?php

if(isset($_POST['submit'])){
	$data_missing = array();
	
	if(empty($_POST['name'])){
		$data_missing[] = 'name';
	} else {
		$name = trim($_POST['name']);
	}
	if(empty($_POST['passone'])){
		$data_missing[] = 'passone';
	} else {
		$passone = trim($_POST['passone']);
	}
	if(empty($_POST['passtwo'])){
		$data_missing[] = 'passtwo';
	} else {
		$passtwo = trim($_POST['passtwo']);
	}
	if(empty($_POST['balance'])){
		$data_missing[] = 'balance';
	} else {
		$balance = trim($_POST['balance']);
	}
	if(empty($_POST['location'])){
		$data_missing[] = 'location';
	} else {
		$location = trim($_POST['location']);
	}
	if(empty($_POST['destination'])){
		$data_missing[] = 'destination';
	} else {
		$destination = trim($_POST['destination']);
	}
	
	
	if(empty($data_missing)){
		require_once('../sqliconnect.php');
		
		
		$query = "INSERT INTO teams (id, name, passone, passtwo, balance, location, destination) 
		VALUES (NULL, ?, ?, ?, ?, ?, ?)";
		
		$stmt = $conn->prepare($query);
		
		$stmt->bind_param("sssiii", $name, $passone, $passtwo, $balance, $location, $destination);
		$stmt->execute();
		
		$affected_rows  = mysqli_stmt_affected_rows($stmt);
		
		if($affected_rows == 1){
			echo "Team Added, No Issues.";
		} else {
			echo "Statement failed, No Rows Affected";
		}
		
		mysqli_stmt_close($stmt);
		$conn->close();
	
		
	} else {
		echo "Not all data required was entered. Retry and enter all data. Missing Data: <br />";
		
		foreach($data_missing as $missing){
			echo "$missing<br />";
		}
	}
}

?>

<p>
<input type="button" onclick="location.href='teamadmin.html'" value="Back to Data Entry" />
</p>
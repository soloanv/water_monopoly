<html>
<head>
<title>Chance Card Submitted</title>
</head>
<body>
<?php

if(isset($_POST['submit'])){
	$data_missing = array();
	
	if(empty($_POST['chance'])){
		$data_missing[] = 'chance';
	} else {
		$chance = trim($_POST['chance']);
	}
	if(empty($_POST['type'])){
		$data_missing[] = 'type';
	} else {
		$type = trim($_POST['type']);
	}
	if(empty($_POST['result'])){
		$data_missing[] = 'result';
	} else {
		$result = trim($_POST['result']);
	}
	
	
	
	
	if(empty($data_missing)){
		require_once('../sqliconnect.php');
		
		
		$query = "INSERT INTO chance (id, chance, type, result) 
		VALUES (NULL, ?, ?, ?)";
		
		$stmt = $conn->prepare($query);
		
		$stmt->bind_param("sii", $chance, $type, $result);
		$stmt->execute();
		
		$affected_rows  = mysqli_stmt_affected_rows($stmt);
		
		if($affected_rows == 1){
			echo "Chance Added, No Issues.";
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
<input type="button" onclick="location.href='chanceadmin.html'" value="Back to Data Entry" />
</p>
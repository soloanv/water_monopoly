<html>
<head>
<title>Question Submitted</title>
</head>
<body>
<?php

if(isset($_POST['submit'])){
	$data_missing = array();
	
	if(empty($_POST['question'])){
		$data_missing[] = 'question';
	} else {
		$question = trim($_POST['question']);
	}
	if(empty($_POST['correct'])){
		$data_missing[] = 'correct';
	} else {
		$correct = trim($_POST['correct']);
	}
	if(empty($_POST['wrongone'])){
		$data_missing[] = 'wrongone';
	} else {
		$wrongone = trim($_POST['wrongone']);
	}
	if(empty($_POST['wrongtwo'])){
		$data_missing[] = 'wrongtwo';
	} else {
		$wrongtwo = trim($_POST['wrongtwo']);
	}
	if(empty($_POST['wrongthree'])){
		$data_missing[] = 'wrongthree';
	} else {
		$wrongthree = trim($_POST['wrongthree']);
	}
	
	
	
	if(empty($data_missing)){
		require_once('../sqliconnect.php');
		
		
		$query = "INSERT INTO questions (id, question, correct, wrongone, wrongtwo, wrongthree) 
		VALUES (NULL, ?, ?, ?, ?, ?)";
		
		$stmt = $conn->prepare($query);
		
		$stmt->bind_param("sssss", $question, $correct, $wrongone, $wrongtwo, $wrongthree);
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
<input type="button" onclick="location.href='questionadmin.html'" value="Back to Data Entry" />
</p>
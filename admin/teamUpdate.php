<html>
<head>
<title>Property Updated</title>
</head>
<body>
<?php

if(isset($_POST['submit'])){
	$data_missing = array();
	if(empty($_POST['editid'])){
		$data_missing[] = 'editid';
	} else {
		$editid = trim($_POST['editid']);
	}
	if(empty($_POST['editname'])){
		$data_missing[] = 'editname';
	} else {
		$editname = trim($_POST['editname']);
	}
	if(empty($_POST['editpassone'])){
		$data_missing[] = 'editpassone';
	} else {
		$editpassone = trim($_POST['editpassone']);
	}
	if(empty($_POST['editpasstwo'])){
		$data_missing[] = 'editpasstwo';
	} else {
		$editpasstwo = trim($_POST['editpasstwo']);
	}
	if(empty($_POST['editbalance'])){
		$data_missing[] = 'editbalance';
	} else {
		$editbalance = trim($_POST['editbalance']);
	}
	if(empty($_POST['editlocation'])){
		$data_missing[] = 'editlocation';
	} else {
		$editlocation = trim($_POST['editlocation']);
	}
	if(empty($_POST['editdestination'])){
		$data_missing[] = 'editdestination';
	} else {
		$editdestination = trim($_POST['editdestination']);
	}
	
	
	if(empty($data_missing)){
		require_once('../sqliconnect.php');
		
		
		$query = "UPDATE teams 
				SET name=?,passone=?,passtwo=?,balance=?,location=?,destination=?
				WHERE id=?";
		
		$stmt = $conn->prepare($query);
		
		$stmt->bind_param("sssiiii", $editname, $editpassone, $editpasstwo, $editbalance, $editlocation, $editdestination, $editid);
		$stmt->execute();
		
		$affected_rows  = mysqli_stmt_affected_rows($stmt);
		
		if($affected_rows == 1){
			echo "Team Updated, No Issues.";
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
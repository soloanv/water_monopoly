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
	if(empty($_POST['type'])){
		$data_missing[] = 'type';
	} else {
		$type = trim($_POST['type']);
	}
	if(empty($_POST['value'])){
		$data_missing[] = 'value';
	} else {
		$value = trim($_POST['value']);
	}
	if(empty($_POST['owner'])){
		$data_missing[] = 'owner';
	} else {
		$owner = trim($_POST['owner']);
	}
	if(empty($_POST['improvement'])){
		$data_missing[] = 'improvement';
	} else {
		$improvement = trim($_POST['improvement']);
	}
	if(empty($_POST['lat'])){
		$data_missing[] = 'lat';
	} else {
		$lat = trim($_POST['lat']);
	}
	if(empty($_POST['lon'])){
		$data_missing[] = 'lon';
	} else {
		$lon = trim($_POST['lon']);
	}
	
	if(empty($data_missing)){
		require_once('../sqliconnect.php');
		
		
		$query = "INSERT INTO properties (id, name, type, val, owner, improvement, lat, lon) 
		VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)";
		
		$stmt = $conn->prepare($query);
		
		$stmt->bind_param("siiiidd", $name, $type, $value, $owner, $improvement, $lat, $lon);
		$stmt->execute();
		
		$affected_rows  = mysqli_stmt_affected_rows($stmt);
		
		if($affected_rows == 1){
			echo "Property Added, No Issues.";
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
<input type="button" onclick="location.href='propertyadmin.html'" value="Back to Data Entry" />
</p>
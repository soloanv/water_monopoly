<?php

//header('Content-Type: application/json');
require_once('../sqliconnect.php');


$sql = "SELECT * FROM teams";
$result = $conn->query($sql);
if ($result->num_rows > 0){
	
	echo '<table align="left"
	cellspacing="5" cellpadding="8">
	<tr>
	<td align="left"><b>ID</b></td>
	<td align="left"><b>Team Name</b></td>
	<td align="left"><b>Password One</b></td>
	<td align="left"><b>Password Two</b></td>
	<td align="left"><b>Balance</b></td>
	<td align="left"><b>Location</b></td>
	<td align="left"><b>Destination</b></td></tr>';
	
	while($row = $result->fetch_assoc()){
		
		echo '<tr><td align="left">' .
		$row['id'] . '</td><td align="left">' .
		$row['name'] . '</td><td align="left">' .
		$row['passone'] . '</td><td align="left">' .
		$row['passtwo'] . '</td><td align="left">' .
		$row['balance'] . '</td><td align="left">' .
		$row['location'] . '</td><td align="left">' .
		$row['destination'] . '</td><td align="left">';
		echo '</tr>';
		
	} 
	
	echo '</table>';
	echo '<p>
	<input type="button" onclick="location.href=\'teamadmin.html\'" value="Back" />
	</p>';
	
} else {
	echo "0 results";
	echo '<p>
	<input type="button" onclick="location.href=\'teamadmin.html\'" value="Back" />
	</p>';
}

//echo json_encode($nameArray, true);

$conn->close();
?>
<?php

//header('Content-Type: application/json');
require_once('../sqliconnect.php');


$sql = "SELECT * FROM chance";
$result = $conn->query($sql);
if ($result->num_rows > 0){
	
	echo '<table align="left"
	cellspacing="5" cellpadding="8">
	<tr>
	<td align="left"><b>ID</b></td>
	<td align="left"><b>Card Text</b></td>
	<td align="left"><b>Type</b></td>
	<td align="left"><b>Result</b></td>';
	
	while($row = $result->fetch_assoc()){
		
		echo '<tr><td align="left">' .
		$row['id'] . '</td><td align="left">' .
		$row['chance'] . '</td><td align="left">' .
		$row['type'] . '</td><td align="left">' .
		$row['result'] . '</td><td align="left">';
		echo '</tr>';
		
	} 
	
	echo '</table>';
	echo '<p>
	<input type="button" onclick="location.href=\'chanceadmin.html\'" value="Back" />
	</p>';
	
} else {
	echo "0 results";
	echo '<p>
	<input type="button" onclick="location.href=\'chanceadmin.html\'" value="Back" />
	</p>';
}

//echo json_encode($nameArray, true);

$conn->close();
?>
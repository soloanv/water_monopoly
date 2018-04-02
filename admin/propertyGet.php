<?php

//header('Content-Type: application/json');
require_once('../sqliconnect.php');


$sql = "SELECT * FROM properties";
$result = $conn->query($sql);
if ($result->num_rows > 0){
	
	echo '<table align="left"
	cellspacing="5" cellpadding="8">
	<tr>
	<td align="left"><b>ID</b></td>
	<td align="left"><b>Property Name</b></td>
	<td align="left"><b>Type</b></td>
	<td align="left"><b>Value</b></td>
	<td align="left"><b>Owner</b></td>
	<td align="left"><b>Improvement</b></td>
	<td align="left"><b>Latitude</b></td>
	<td align="left"><b>Longitude</b></td></tr>';
	
	while($row = $result->fetch_assoc()){
		
		echo '<tr><td align="left">' .
		$row['id'] . '</td><td align="left">' .
		$row['name'] . '</td><td align="left">' .
		$row['type'] . '</td><td align="left">' .
		$row['val'] . '</td><td align="left">' .
		$row['owner'] . '</td><td align="left">' .
		$row['improvement'] . '</td><td align="left">' .
		$row['lat'] . '</td><td align="left">' .
		$row['lon'] . '</td><td align="left">';
		echo '</tr>';
		
	} 
	
	echo '</table>';
	echo '<p>
	<input type="button" onclick="location.href=\'propertyadmin.html\'" value="Back" />
	</p>';
	
} else {
	echo "0 results";
	echo '<p>
	<input type="button" onclick="location.href=\'propertyadmin.html\'" value="Back" />
	</p>';
}

//echo json_encode($nameArray, true);

$conn->close();
?>
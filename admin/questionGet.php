<?php

//header('Content-Type: application/json');
require_once('../sqliconnect.php');


$sql = "SELECT * FROM questions";
$result = $conn->query($sql);
if ($result->num_rows > 0){
	
	echo '<table align="left"
	cellspacing="5" cellpadding="8">
	<tr>
	<td align="left"><b>ID</b></td>
	<td align="left"><b>Question</b></td>
	<td align="left"><b>Correct Answer</b></td>
	<td align="left"><b>Wrong Answer One</b></td>
	<td align="left"><b>Wrong Answer Two</b></td>
	<td align="left"><b>Wrong Answer Three</b></td>';
	
	while($row = $result->fetch_assoc()){
		
		echo '<tr><td align="left">' .
		$row['id'] . '</td><td align="left">' .
		$row['question'] . '</td><td align="left">' .
		$row['correct'] . '</td><td align="left">' .
		$row['wrongone'] . '</td><td align="left">' .
		$row['wrongtwo'] . '</td><td align="left">' .
		$row['wrongthree'] . '</td><td align="left">';
		echo '</tr>';
		
	} 
	
	echo '</table>';
	echo '<p>
	<input type="button" onclick="location.href=\'questionadmin.html\'" value="Back" />
	</p>';
	
} else {
	echo "0 results";
	echo '<p>
	<input type="button" onclick="location.href=\'questionadmin.html\'" value="Back" />
	</p>';
}

//echo json_encode($nameArray, true);

$conn->close();
?>
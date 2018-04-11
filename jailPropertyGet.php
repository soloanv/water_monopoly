<?php


header('Content-Type: application/json');

require_once('sqliconnect.php');


$sql = "SELECT id FROM properties WHERE type=5";


$result = $conn->query($sql);

//Creating an array to store all of our data.
$jailArray = array();

//This if/else makes sure that at least one row is returned.
if ($result->num_rows > 0){
	
	//fetch_assoc returns the key-value pairs instead of just data
	//This is much more useful when you are returning multiple columns
	//per row, instead of just one. But I am still using it here 
	
	while($row = $result->fetch_assoc()){
		//Here I am appending the "tName" value for each row.
		//Again, I do not need to put in the "tName" key to recieve the 
		//value. I am doing it only for practice and reference.
		$jailArray[] = $row;
	} 
} else {
	echo "0 results";
}

//Here I am sending back the array, encoded as JSON, to the client.
echo json_encode($jailArray, true);

//Close the connection.
$conn->close();
?>
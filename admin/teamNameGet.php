<?php

//This PHP file will query the database and return an array in JSON format
//that contains each team's name.

//I used the object oriented syntax for SQLi, there is procedural syntax
//but I prefer this.


//Set a header to ensure the response is treated as JSON
header('Content-Type: application/json');

//DEPRICATED______________________________________________
//Here is where I am storing all of the database details
//For security, this should all be done in a different php file
//in a different location from the actual website.
//$servername = "";
//$username = "";
//$password = "";
//$dbname = "";


//Creating a new SQLi object
//$conn = new mysqli($servername, $username, $password, $dbname);


//If the connection fails, this block of code will echo the error 
//if ($conn->connect_error){
	//die("Connection failed: " . $conn->connect_error);
//}
//DEPRICATED______________________________________________


//This is a more secure way to connect to the database.
require_once('../sqliconnect.php');

//This is the actual sql statement to be executed
$sql = "SELECT name FROM teams";

//Here is where the query is executed, and the response from the database is
//stored in $result
$result = $conn->query($sql);

//Creating an array to store all of our data.
$nameArray = array();

//This if/else makes sure that at least one row is returned.
if ($result->num_rows > 0){
	
	//fetch_assoc returns the key-value pairs instead of just data
	//This is much more useful when you are returning multiple columns
	//per row, instead of just one. But I am still using it here 
	
	while($row = $result->fetch_assoc()){
		//Here I am appending the "tName" value for each row.
		//Again, I do not need to put in the "tName" key to recieve the 
		//value. I am doing it only for practice and reference.
		$nameArray[] = $row["name"];
	} 
} else {
	echo "0 results";
}

//Here I am sending back the array, encoded as JSON, to the client.
echo json_encode($nameArray, true);

//Close the connection.
$conn->close();
?>
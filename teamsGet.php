<?php

header('Content-Type: application/json');
$teamData = json_decode(file_get_contents("teamData.json"), true);	
echo json_encode($teamData);

?>
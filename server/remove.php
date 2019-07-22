<?php

header("Content-Type: application/json");

include './config/connection.php'; 
include 'response.php';


session_start();

$id=$_POST["id"];
if(array_splice($_SESSION["productCollection"],$id,1))
{
    
$response_result=successResponse("success");
    echo(json_encode($response_result));
}
else{

    $response_result=errorResponse("success");
    echo(json_encode($response_result));
}

?>
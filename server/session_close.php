<?php

header("Content-Type: application/json");

include './config/connection.php'; 
include 'response.php';

session_start();
if(session_destroy())
{
 
$response_result=successResponse("success");
    echo(json_encode($response_result));
}
else
{
$response_result=errorResponse("success");
echo(json_encode($response_result));

}
<?php

header("Content-Type: application/json");

include './config/connection.php'; 
include 'response.php';


session_start();

if (!isset($_SESSION["productCollection"]))
{
    $_SESSION["productCollection"]=[];
}

$size=sizeof($_SESSION['productCollection']);


$success = [
    [
        "number" => $size,    
    ]
    ];

    
    $response_result=successResponse($success);
    echo(json_encode($response_result));

?>
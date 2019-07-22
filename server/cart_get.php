<?php
include './config/connection.php'; 
include 'response.php';


header("Content-Type: application/json");

session_start();

$success = [
    [
        "items" => $_SESSION["productCollection"]
    
    ]
    ];
    $response_result=successResponse($success);
    echo(json_encode($response_result));






?>
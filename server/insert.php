<?php

header("Content-Type: application/json");

include './config/connection.php'; 
include 'response.php';


session_start();

if (!isset($_SESSION["productCollection"]))
{
    $_SESSION["productCollection"]=[];
}
$product_name=$_POST["product_name"];
$id=$_POST["id"];



if(array_push($_SESSION['productCollection'],['product_name' => $product_name, 'id' => $id]))
{
    $success = [
    [
        "caption" => $product_name,
        "id" => $id,
        "items" => $_SESSION["productCollection"]
    
    ]
    ];
$response_result=successResponse($success);
    echo(json_encode($response_result));

}
else
{
    $success = [
    [
        "caption" => $product_name,
        "id" => $id,
        "error_type" => mysqli_error($conn),
    
    ]
];

$response_result=errorResponse($success);
    echo(json_encode($response_result));

 

}


?>
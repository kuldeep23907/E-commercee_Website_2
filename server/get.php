<?php
include './config/connection.php'; 
header("Content-Type: application/json");

$filter=$_GET["filter"];
$all_captions=[];
$i=0;

if($filter=="all")
{
$sql="select * from  `products` ";
$res=mysqli_query($conn,$sql);

while($row = mysqli_fetch_assoc($res))
{
$todo = [
    [
        "product_name" => $row["product_name"],
        "index" => $row["id"],
    ],
];
$all_captions[$i]=$todo;
$i++;
}

echo (json_encode($all_captions));

}


else
{
mysqli_error($conn);

}


?>
<?php 

include('../domain/Product.php');

$data = json_decode(file_get_contents("php://input")); 
$result = array();
if (!empty($data->user_id)) {
    $product = new Product(null, $data->user_id);
    $result = $product->getAllByUser();
} else if (!empty($data->id)) {
    $product = new Product($data->id);
    $product->getOneById();
    $result = array(
        'id' => $product->id,
        'name' => $product->name,
        'description' => $product->description,
        'price' => $product->price
    );
} else {
    $product = new Product();
    $result = $product->getAll();
}

echo '{"records":'.json_encode($result).'}';
?>
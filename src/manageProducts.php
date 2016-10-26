<?php
include('../domain/Product.php');

$data = json_decode(file_get_contents("php://input"));
$mProduct = new ManageProducts($data);

switch ($data->method) {
    case 'create':
        $mProduct->createProduct();
        break;
    case 'update':
        $mProduct->updateProduct();
        break;
    case 'delete':
        $mProduct->deleteProduct();
        break;
    default:
        break;
}

class ManageProducts {
    
    private $data;
    private $product;
    
    public function __construct($data) {
        $this->data = $data;
    }
    public function createProduct() {
        $this->product = new Product(
                    null,
                    $this->data->user_id,
                    $this->data->name,
                    $this->data->description,
                    $this->data->price
                );
        $this->product->createProduct();
    }
    
    public function deleteProduct() {
        $this->product = new Product($this->data->id);
        $this->product->deleteProduct();
    }
    
    public function updateProduct() {
        $this->product = new Product(
            $this->data->id,
            null,
            $this->data->name,
            $this->data->description,
            $this->data->price
        );
        $this->product->updateProduct();
    }
}
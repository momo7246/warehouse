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
    private $msg = 'OK';
    
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
        $status = $this->product->createProduct();
        $this->manageResponse($status, 'Cannot create product');
    }
    
    public function deleteProduct() {
        $this->product = new Product($this->data->id);
        $status = $this->product->deleteProduct();
        $this->manageResponse($status, 'Cannot delete product');
    }
    
    public function updateProduct() {
        $this->product = new Product(
            $this->data->id,
            null,
            $this->data->name,
            $this->data->description,
            $this->data->price
        );
        $status = $this->product->updateProduct();
        $this->manageResponse($status, 'Cannot update product');
    }

    private function manageResponse($status, $errMsg) {
        if (!$status) {
            $this->msg = $errMsg;
        }
        $response = array(
            "status" => $status,
            "message" => $this->msg
        );
        echo json_encode($response);
    }
}
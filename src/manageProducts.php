<?php
include('../domain/ProductDomain.php');
include('../model/Product.php');

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
    private $domain;
    private $msg = 'OK';
    
    public function __construct($data) {
        $this->data = $data;
	$this->domain = new ProductDomain();
    }

    public function createProduct() {
        $p = new Product(
                    null,
                    $this->data->userId,
                    $this->data->ccn,
                    $this->data->description,
                    $this->data->details,
		    $this->data->partNg,
		    $this->data->typeId,
		    $this->data->locationId,
		    $this->data->note,
		    $this->data->noteDetails,
		    $this->data->year,
		    $this->data->uslp,
		    $this->data->ndbp,
		    $this->data->other
                );
	$product = $p->getProduct();
        $status = $this->domain->createProduct($product);
        $this->manageResponse($status, 'Cannot create product');
    }
    
    public function deleteProduct() {
        $status = $this->domain->deleteProduct($this->data->id);
        $this->manageResponse($status, 'Cannot delete product');
    }
    
    public function updateProduct() {
        $p = new Product(
		    $this->data->id,
                    null,
                    $this->data->ccn,
                    $this->data->description,
                    $this->data->details,
		    $this->data->partNg,
		    $this->data->typeId,
		    $this->data->locationId,
		    $this->data->note,
		    $this->data->noteDetails,
		    $this->data->year,
		    $this->data->uslp,
		    $this->data->ndbp,
		    $this->data->other
        );
	$product = $p->getProduct();
        $status = $this->domain->updateProduct($product);
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
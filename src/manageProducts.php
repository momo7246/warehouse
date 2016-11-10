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
			$this->getParameter('user_id'),
			$this->getParameter('ccn'),
			$this->getParameter('description'),
			$this->getParameter('details'),
			$this->getParameter('part_ng'),
			$this->getParameter('type_id'),
			$this->getParameter('location_id'),
			$this->data->note,
			$this->getParameter('note_details'),
			$this->getParameter('year'),
			$this->getParameter('uslp'),
			$this->getParameter('ndbp'),
			$this->getParameter('other')
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
			$this->getParameter('id'),
			null,
			$this->getParameter('ccn'),
			$this->getParameter('description'),
			$this->getParameter('details'),
			$this->getParameter('part_ng'),
			$this->getParameter('type_id'),
			$this->getParameter('location_id'),
			$this->data->note,
			$this->getParameter('note_details'),
			$this->getParameter('year'),
			$this->getParameter('uslp'),
			$this->getParameter('ndbp'),
			$this->getParameter('other')
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
	
	private function getParameter($key) {
	    return (!empty($this->data->{$key})) ? $this->data->{$key} : null; 
	}
}
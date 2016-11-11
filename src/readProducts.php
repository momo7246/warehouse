<?php 

include_once '../domain/ProductDomain.php';
include_once '../model/Product.php';
include_once '../config/Security.php';

$s = new Security();
$s->authenticate();

$p = new ReadProducts($_GET);
$res = $p->process();
echo json_encode($res);

class ReadProducts
{
	private $data;
	private $domain;

	public function __construct($data) {
		$this->data = $data;
		$this->domain = new ProductDomain();
	}

	public function process() {
		switch (true) {
			case (!empty($this->data['id'])):
				$res = $this->readById();
				break;
			case (!empty($this->data['user_id'])):
				$res = $this->readByUserId();
				break;
			default:
				$res = $this->readAll();
				break;
		}

		return $res;
	}

	private function readAll() {
		return $this->domain->getAll();
	}

	private function readById() {
		$id = $this->data['id'];
		$product = $this->domain->getOneById($id);
//		return array(
//			'id' => $product->id,
//			'name' => $product->name,
//			'description' => $product->description,
//			'price' => $product->price
//		);
		return $product;
	}

	private function readByUserId() {
		$userId = $this->data['user_id'];
//		$product = new Product(null, $userId);
		return $this->domain->getAllByUser($userId);
	}
}

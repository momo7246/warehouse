<?php 

include('../domain/Product.php');

$p = new ReadProducts($_GET);
$res = $p->process();
echo json_encode($res);

class ReadProducts
{
	private $data;

	public function __construct($data) {
		$this->data = $data;
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
		$product = new Product();
		return $product->getAll();
	}

	private function readById() {
		$id = $this->data['id'];
		$product = new Product($id);
		$product->getOneById();
		return array(
			'id' => $product->id,
			'name' => $product->name,
			'description' => $product->description,
			'price' => $product->price
		);
	}

	private function readByUserId() {
		$userId = $this->data['user_id'];
		$product = new Product(null, $userId);
		return $product->getAllByUser();
	}
}

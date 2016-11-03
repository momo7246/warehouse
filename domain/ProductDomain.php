<?php
include_once 'modelAbstract.php';

class ProductDomain extends ModelAbstract
{
	private $tableName = 'products';
//
//	public $id;
//	public $ccn;
//	public $description;
//	public $details;
//	public $partNg;
//	public $typeId;
//	public $locationId;
//	public $note;
//	public $noteDetails;
//	public $year;
//	public $uslp;
//	public $ndbp;
//	public $other;
//	public $userId;
		
//	public function __construct(
//		$id = null,
//		$userId = null,
//		$ccn = null,
//		$description = null,
//		$details = null,
//		$partNg = null,
//		$typeId = null,
//		$locationId = null,
//		$note = null,
//		$noteDetails = null,
//		$year = null,
//		$uslp = null,
//		$ndbp = null,
//		$other = null
//	) {
//		$this->id = htmlspecialchars(strip_tags($id));
//		$this->ccn = htmlspecialchars(strip_tags($ccn));
//		$this->description = htmlspecialchars(strip_tags($description));
//		$this->details = htmlspecialchars(strip_tags($details));
//		$this->partNg = htmlspecialchars(strip_tags($partNg));
//		$this->typeId = htmlspecialchars(strip_tags($typeId));
//		$this->locationId = htmlspecialchars(strip_tags($locationId));
//		$this->note = htmlspecialchars(strip_tags($note));
//		$this->noteDetails = htmlspecialchars(strip_tags($noteDetails));
//		$this->year = htmlspecialchars(strip_tags($year));
//		$this->uslp = htmlspecialchars(strip_tags($uslp));
//		$this->ndbp = htmlspecialchars(strip_tags($ndbp));
//		$this->other = htmlspecialchars(strip_tags($other));
//		$this->userId = htmlspecialchars(strip_tags($userId));
//	}
	
//	public function getProduct() {
//	    return array(
//		'id' => $this->id,
//		'ccn' => $this->ccn,
//		'description' => $this->description,
//		'details' => $this->details,
//		'part_ng' => $this->partNg,
//		'type_id' => $this->typeId,
//		'location_id' => $this->locationId,
//		'note' => $this->note,
//		'note_details' => $this->noteDetails,
//		'year' => $this->year,
//		'uslp' => $this->uslp,
//		'ndbp' => $this->ndbp,
//		'other' => $this->other,
//		'user_id' => $this->user_id
//	    );
//	}
		
	public function createProduct($product) {
		$product = $this->cutObjectKeys($product);
		$columns = $this->getColumn($product);
		$values = $this->getColumnValues($product);
		
		$query = "INSERT INTO ".$this->tableName."(".$columns.") VALUES (".$values.")";
		$this->connect($query);
//		$params = array(
//			'name' => $this->name,
//			'description' => $this->description,
//			'price'	=> $this->price,
//			'user_id' => $this->user_id
//		);

		return $this->stmt->execute();
	}
		
	public function updateProduct($product) {
		$product = $this->cutObjectKeys($product);
		$id = $product['id'];
		unset($product['id']);
		$setStatement = $this->getSetStatement($product);
		$query = "UPDATE ".$this->tableName.$setStatement." WHERE id =".$id;
		$this->connect($query);
//		$params = array(
//			'name'	=> $this->name,
//			'description' => $this->description,
//			'price'	=> $this->price,
//			'id'	=> $this->id
//		);

		return $this->stmt->execute();
	}
		
	public function deleteProduct($id) {
		$query = "DELETE FROM ".$this->tableName." WHERE id = :id";
		$this->connect($query);
		
		return $this->stmt->execute(array('id' => $this->id));     
	}
		
	public function getAll() {
		$query = "SELECT * FROM ".$this->tableName;
		$this->connect($query);
		$this->stmt->execute();
		$num = $this->stmt->rowCount();
		$results = array();
		if ($num > 0) {
			while ($row = $this->stmt->fetch(PDO::FETCH_ASSOC)){
				array_push($results, $row);
			}
		}
		return $results;
	}
		
	public function getAllByUser($userId) {
		$query = "SELECT * FROM ".$this->tableName." WHERE user_id = :userId";
		$this->connect($query);
		$this->stmt->bindParam(":userId", $userId);
		$this->stmt->execute();
		$num = $this->stmt->rowCount();
		$results = array();
		if ($num > 0) {
			while ($row = $this->stmt->fetch(PDO::FETCH_ASSOC)){
				array_push($results, $row);
			}
		}
		return $results;
	}
		
	public function getOneById($id) {
		$query = "SELECT * FROM ".$this->tableName." WHERE id = :id LIMIT 0,1";
		$this->connect($query);
		$this->stmt->bindParam(":id", $id);
		$this->stmt->execute();
		$num = $this->stmt->rowCount();
		$result = array();
	   	if($num >= 1){
			$result = $this->stmt->fetch(PDO::FETCH_ASSOC);
//			$this->id = $row['id'];
//			$this->name = $row['name'];
//			$this->description = $row['description'];
//			$this->price = $row['price'];
		}
		return $result;
	}
		
	public function bindParams() {}
}
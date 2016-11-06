<?php
include_once 'Domain.php';

class ProductDomain extends Domain
{
	private $tableName = 'products';
	
	public function createProduct($product) {
	    
		$product = $this->cutObjectKeys($product);
		$columns = $this->getColumn($product);
		$values = $this->getColumnValues($product);
		$query = 'INSERT INTO '.$this->tableName.' ('.$columns.') VALUES ("'.$values.'")';
		$this->connect($query);

		return $this->stmt->execute();
	}
		
	public function updateProduct($product) {
		$product = $this->cutObjectKeys($product);
		$id = $product['id'];
		unset($product['id']);
		$setStatement = $this->getSetStatement($product);
		$query = "UPDATE ".$this->tableName.$setStatement." WHERE id =".$id;
		$this->connect($query);

		return $this->stmt->execute();
	}
		
	public function deleteProduct($id) {
		$query = "DELETE FROM ".$this->tableName." WHERE id = :id";
		$this->connect($query);
		
		return $this->stmt->execute(array('id' => $id));     
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
		}
		return $result;
	}
}
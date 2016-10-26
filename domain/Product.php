<?php
include_once 'modelAbstract.php';

class Product extends ModelAbstract
{
	private $tableName = 'products';

	public $id;
	public $name;
	public $description;
	public $price;
        public $user_id;
        
        public function __construct($id = null, $user_id = null, $name = null, $description = null, $price = null) {
            $this->id = htmlspecialchars(strip_tags($id));
            $this->name = htmlspecialchars(strip_tags($name));
            $this->description = htmlspecialchars(strip_tags($description));
            $this->price = htmlspecialchars(strip_tags($price));
            $this->user_id = htmlspecialchars(strip_tags($user_id));
	}
        
        public function createProduct() {
            $query = "INSERT INTO ".$this->tableName." SET name=:name, price=:price, description=:description, user_id=:user_id";
            $this->connect($query);
            $this->stmt->bindParam(":name", $this->name);
            $this->stmt->bindParam(":description", $this->description);
            $this->stmt->bindParam(":price", $this->price);
            $this->stmt->bindParam(":user_id", $this->user_id);
            $this->stmt->execute();
        }
        
        public function updateProduct() {
            $query = "UPDATE ".$this->tableName." SET name = :name, description = :description, price = :price WHERE id = :id";
            $this->connect($query);
            $this->stmt->bindParam(":name", $this->name);
            $this->stmt->bindParam(":description", $this->description);
            $this->stmt->bindParam(":price", $this->price);
            $this->stmt->bindParam(":id", $this->id);
            $this->stmt->execute();
        }
        
        public function deleteProduct() {
            $query = "DELETE FROM ".$this->tableName." WHERE id = :id";
            $this->connect($query);
            $this->stmt->bindParam(":id", $this->id);
            $this->stmt->execute();     
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
        
        public function getAllByUser() {
            $query = "SELECT * FROM ".$this->tableName." WHERE user_id = :user_id";
            $this->connect($query);
            $this->stmt->bindParam(":user_id", $this->user_id);
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
        
        public function getOneById() {
            $query = "SELECT * FROM ".$this->tableName." WHERE id = :id LIMIT 0,1";
            $this->connect($query);
            $this->stmt->bindParam(":id", $this->id);
            $this->stmt->execute();
            $num = $this->stmt->rowCount();
	    if($num >= 1){
                $row = $this->stmt->fetch(PDO::FETCH_ASSOC);
                $this->id = $row['id'];
                $this->name = $row['name'];
                $this->description = $row['description'];
                $this->price = $row['price'];
	    }
        }
        
        public function bindParams() {}
}
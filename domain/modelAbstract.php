<?php
include ('../config/database.php');

abstract class ModelAbstract
{
	public $conn;
	public $stmt;

	public function connect($query) {
            $database = new Database(); 
            $this->conn = $database->getConnection();
            $this->stmt = $this->conn->prepare($query);
            $this->bindParams();
	}

	abstract public function bindParams();
}
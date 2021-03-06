<?php
include ('../config/Database.php');

class Domain
{
	public $conn;
	public $stmt;

	public function connect($query) {
		$database = new Database(); 
		$this->conn = $database->getConnection();
		$this->stmt = $this->conn->prepare($query);
	}
	
	protected function cutObjectKeys($object){
		foreach($object as $key => $_) {
			if(!isset($object[$key]) || $object[$key] === '') {
				unset($object[$key]);
			}
		}
		return $object;
	}
	
	protected function getColumn($object) {
		return implode(",", array_keys($object));
	}
	
	protected function getColumnValues($object) {
		return implode('","', array_values($object));
	}
	
	protected function getSetStatement($object) {
		$set = array();
		foreach($object as $key => $value) {
			array_push($set, $key."='".$value."'");
		}
		return " SET ".implode(",", $set);
	}
}
<?php
include_once 'modelAbstract.php';

class LocationDomain extends ModelAbstract
{
	private $tableName = 'location';

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

	public function bindParams() {}
}
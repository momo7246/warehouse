<?php
include_once 'Domain.php';
include_once '../config/Security.php';

$s = new Security();
$s->authenticate();

class LocationDomain extends Domain
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
}
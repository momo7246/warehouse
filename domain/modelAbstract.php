<?php

abstract class ModelAbstract
{
	public $conn;
	public $stmt;

	public function __construct($db) {
		$this->conn = $db;
	}

	public function connect($query) {
		$this->stmt = $this->conn->prepare($query);
		$this->bindParams();
		$this->stmt->execute();
	}

	abstract public function bindParams();
}
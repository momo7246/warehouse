<?php

include_once 'Domain.php';
include_once '../config/Security.php';

$s = new Security();
$s->serverAuthenticate();

class UserDomain extends Domain
{
	private $tableName = 'user';

	public function login($username, $password) {
		$query = 'SELECT * FROM '.$this->tableName
					.' WHERE username = :username AND password = :password';
		$this->connect($query);
		$this->stmt->execute(array(
				'username' => $username,
				'password' => $password
			));
		$num = $this->stmt->rowCount();
		$result = array();
		if($num >= 1){
			$result = $this->stmt->fetch(PDO::FETCH_ASSOC);
		}

		return $result;
	}
	
	public function resetPassword($id, $password, $lastModified) {
		$query = "UPDATE ".$this->tableName." SET password = :password, last_modified = :lastModified WHERE id = :id";
		$this->connect($query);
		
		return $this->stmt->execute(array(
				'password' => $password,
				'lastModified' => $lastModified,
				'id' => $id
			));
	}
	
	public function emailExisted($email) {
		$query = "SELECT * FROM ".$this->tableName." WHERE email =:email LIMIT 0,1";
		$this->connect($query);
		$this->stmt->execute(array(
				'email' => $email
			));
		$num = $this->stmt->rowCount();
		$result = array();
		if($num >= 1){
			$result = $this->stmt->fetch(PDO::FETCH_ASSOC);
		}

		return $result;
	}
}
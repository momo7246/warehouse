<?php

include_once 'modelAbstract.php';

class User extends ModelAbstract
{
	private $tableName = 'user';

	public $id;
	public $username;
	public $password;
	public $name;
	public $surname;
	public $role;

	public function login() {
		$query = 'SELECT * FROM '.$this->tableName.' WHERE username = :username AND password = :password';
		$this->username = htmlspecialchars(strip_tags($this->username));
	    $this->password = htmlspecialchars(strip_tags($this->password));
	    $this->connect($query);
	    $num = $this->stmt->rowCount();
	    if($num >= 1){
		    $row = $this->stmt->fetch(PDO::FETCH_ASSOC);
	     
		    // set values to object properties
		    $this->name = $row['name'];
		    $this->surname = $row['surname'];
		    $this->role = $row['role'];

		    return true;
	    } else {
	    	return false;
	    }
	}

	public function bindParams() {
		$this->stmt->bindParam(":username", $this->username);
	    $this->stmt->bindParam(":password", $this->password);
	}
}
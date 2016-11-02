<?php

include_once 'modelAbstract.php';

class User extends ModelAbstract
{
	private $tableName = 'user';

	public $id;
	public $username;
	public $password;
	public $email;
	public $name;
	public $surname;
	public $role;
	public $lastModified;

	public function __construct($id = '', $username = '', $password = '', $email = '') {
		$this->id = htmlspecialchars(strip_tags($id));
		$this->username = htmlspecialchars(strip_tags($username));
		$this->password = htmlspecialchars(strip_tags($password));
		$this->email =  htmlspecialchars(strip_tags($email));
	}
	public function login() {
		$query = 'SELECT * FROM '.$this->tableName
					.' WHERE username = :username AND password = :password';
		$this->connect($query);
		$this->stmt->execute();
		$num = $this->stmt->rowCount();
		if($num >= 1){
			$row = $this->stmt->fetch(PDO::FETCH_ASSOC);
			$this->id = $row['id'];
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
	
	public function resetPassword() {
	    $query = "UPDATE ".$this->tableName." SET password = :password WHERE id = :id";
	    $this->connect($query);
	    
	    return $this->stmt->execute(array(
		'password' => $this->password,
		'id' => $this->id
	    ));
	}
	
	public function emailExisted() {
	    $query = "SELECT * FROM ".$this->tableName." WHERE email =:email LIMIT 0,1";
	    $this->connect($query);
	    $this->stmt->execute(array(
		'email' => $this->email
	    ));
	    $num = $this->stmt->rowCount();
	    if($num >= 1){
		    $row = $this->stmt->fetch(PDO::FETCH_ASSOC);
		    $this->id = $row['id'];
		    return true;
	    } else {
		    return false;
	    }
	}
}
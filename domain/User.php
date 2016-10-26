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

        public function __construct($username, $password) {
            $this->username = htmlspecialchars(strip_tags($username));
            $this->password = htmlspecialchars(strip_tags($password));
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
}
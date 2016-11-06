<?php

class User
{
	public $id;
	public $username;
	public $password;
	public $email;
	public $name;
	public $surname;
	public $role;
	public $lastModified;
		
	public function __construct(
		$id = null,
		$username = null,
		$password = null,
		$email = null,
		$name = null,
		$surname = null,
		$role = null,
		$lastModified = null
	) {
		$this->id = htmlspecialchars(strip_tags($id));
		$this->username = htmlspecialchars(strip_tags($username));
		$this->password = htmlspecialchars(strip_tags($password));
		$this->email = htmlspecialchars(strip_tags($email));
		$this->name = htmlspecialchars(strip_tags($name));
		$this->surname = htmlspecialchars(strip_tags($surname));
		$this->role = htmlspecialchars(strip_tags($role));
		$this->lastModified = htmlspecialchars(strip_tags($lastModified));
	}
	
	public function getUser() {
	    return array(
			'id' => $this->id,
			'username' => $this->username,
			'password' => $this->password,
			'email' => $this->email,
			'name' => $this->name,
			'surname' => $this->surname,
			'role' => $this->role,
			'last_modified' => $this->lastModified
	    );
	}
}
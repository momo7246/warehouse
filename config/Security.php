<?php

class Security
{
    private $cookie;
    private $authenticate;
    
    public function __construct() {
	$this->cookie = !empty($_COOKIE['globals']) ? $_COOKIE['globals'] : null;
    }
    
    public function authenticate() {
	$this->authenticate = $this->checkAuthentication();
	$this->redirect();
    }
    
    public function serverAuthenticate() {
	$this->authenticate = $this->checkServerAuthentication();
	$this->redirect();
    }
    
    private function redirect() {
	if (!$this->authenticate) {
	    header('HTTP/1.0 403 Forbidden');
	    exit('Forbidden');
	}
    }
    
    private function checkAuthentication() {
	$user = (object)array();
	if (!empty($this->cookie)) {
	    $user = json_decode($this->cookie);
	}
	return !empty($user->currentUser->authdata);
    }
    
    private function checkServerAuthentication() {
	switch ($_SERVER['REMOTE_ADDR']) {
	    case "127.0.0.1":
	    case "localhost":
	    case "27.254.41.195":
		$this->authenticate = true;
		break;
	    default:
		$this->authenticate = false;
		break;
	}
	
	return $this->authenticate;
    }
}

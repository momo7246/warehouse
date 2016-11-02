<?php
include('../domain/User.php');
//include('mailManager.php');

$m = new ManagePassword();
$response = $m->process();

echo json_encode($response);

class ManagePassword
{
    private $data;
    
    public function process() {
	switch ($_SERVER['REQUEST_METHOD']) {
	    case 'POST':
		$this->data = json_decode(file_get_contents("php://input"));
		$res = $this->resetPassword();
		break;
	    case 'GET':
		$this->data = $_GET;
		$res = $this->checkEmailExisted();
		break;
	    default:
		break;
	}
	
	return $res;
    }

    private function resetPassword() {
	$user = new User($this->data->id, '', $this->data->password);
	if ($user->resetPassword()) {
	    $res = array('status' => true);
	} else {
	    $res = array('status' => false);
	}
	
	return $res;
    }

    private function checkEmailExisted() {
	$user = new User('', '', '', $this->data['email']);
	if ($user->emailExisted()) {
	    $link = $this->data['link'] . "/" . $user->id;
	    //send email
	    $res = array('status' => true);
	} else {
	    $res = array('status' => false);
	}
	
	return $res;
    }
}

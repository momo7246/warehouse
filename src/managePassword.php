<?php
include('../domain/UserDomain.php');
include('../model/User.php');
include('manageEmail.php');

$m = new ManagePassword();
$response = $m->process();

echo json_encode($response);

class ManagePassword
{
	private $data;
	private $domain;

	public function __construct() {
		$this->domain = new UserDomain();
	}
	
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
		$res = $this->domain->resetPassword(
				$this->data->id,
				$this->data->password,
				$this->data->lastModified
			);
		if($res) {
			$res = array('status' => true);
		} else {
			$res = array('status' => false);
		}
		
		return $res;
	}

	private function checkEmailExisted() {
		$user = $this->domain->emailExisted($this->data['email']);
		if(!empty($user)) {
			$link = $this->data['link'] . "/" . $user['id'];
			$m = new ManageEmail($link);
			$emailRes = $m->sendEmail();
			$res = array('status' => $emailRes['status'], 'message' => $emailRes['message']);
		} else {
			$res = array('status' => false);
		}
		
		return $res;
	}
}

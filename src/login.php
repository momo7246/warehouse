<?php 

include('../domain/UserDomain.php');

$data = json_decode(file_get_contents("php://input"));
$u = new Login($data);
$res = $u->process();

echo json_encode($res);

class Login
{
	private $data;
	private $domain;

	public function __construct($data) {
		$this->data = $data;
		$this->domain = new UserDomain();
	}

	public function process() {
		$user = $this->domain->login($this->data->username, $this->data->password);
		if (!empty($user)) {
		    $res = array('status' => true, 'role' => $user['role'], 'id' => $user['id'], 'lastModified' => $user['last_modified']);
		} else {
		    $res = array('status' => false, 'message' => 'username or password is incorrect');
		}

		return $res;
	}
}
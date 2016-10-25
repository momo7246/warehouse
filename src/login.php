<?php 

include ('../config/database.php');
include('../domain/User.php');

$database = new Database(); 
$db = $database->getConnection();
$user = new User($db);
$data = json_decode(file_get_contents("php://input")); 
$user->username = $data->username;
$user->password = $data->password;

if ($user->login()) {
	$res = array('success' => true, 'role' => $user->role);
} else {
	$res = array('success' => false, 'message' => 'username or password is incorrect');
}

echo json_encode($res);

?>
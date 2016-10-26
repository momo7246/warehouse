<?php 

include('../domain/User.php');

$data = json_decode(file_get_contents("php://input")); 
$user = new User($data->username, $data->password);

if ($user->login()) {
    $res = array('success' => true, 'role' => $user->role, 'id' => $user->id);
} else {
    $res = array('success' => false, 'message' => 'username or password is incorrect');
}
echo json_encode($res);

?>
<?php

$user_command = $_GET['command']; 

require_once('log.php');

$result = array("command_result" => "");
if ($user_command) {
	$result['command_result'] = shell_exec("./do_command $user_command");
}

echo json_encode($result); 
?>

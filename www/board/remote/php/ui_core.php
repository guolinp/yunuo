<?php
$user_command = $_GET['command']; 

require_once('log.php');

$result = array("command_result" => "");
if ($user_command) {
	exec("./web_agent \"./yunuo_command $user_command\"", $output, $retval);
	$result['command_result'] = $output[0];
}

echo json_encode($result); 
?>

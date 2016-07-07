<?php
$user_command = $_GET['command']; 

require_once('log.php');

$result = array("command_result" => "");
if ($user_command) {
	exec("./web_agent \"./do_command $user_command\"", $output, $retval);
	foreach ($output as $line){ 
		$result['command_result'] = $result['command_result'].$line."\r\n";
	} 
}

echo json_encode($result); 
?>

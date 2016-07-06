<?php
    require_once('check_session.php');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
 <head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <title>yunuo board management system</title>
  <script src="js/jquery-1.11.0.min.js"></script>
  <script type="text/javascript">
	function send_command(){
		var obj_command_in  = document.getElementById("command_in");
		var obj_command_out = document.getElementById("command_out");
		var obj_auto_clear  = document.getElementById("auto_clear");
		var command_line = obj_command_in.value;	

		if (obj_auto_clear.checked == true)
			obj_command_out.value = "";

		obj_command_out.value += ">" + obj_command_in.value;

		$.get(	"shell_core.php",
			{command : command_line},
			function(data) {
				obj_command_out.value += data.command_result;
			},
			"json" );

		obj_command_out.value += "\r\n";
		obj_command_out.scrollTop = obj_command_out.scrollHeight;
		obj_command_in.value = "";
	}

	function OnCommandTextBoxChanged() {
		if (event.keyCode == 13) {
			event.keyCode = 0;
			event.returnvalue = false;
			send_command();
		}
	}
  </script>
 </head>

 <body>
	<br>
	Welcome to yunuo board management system.
	<p>
	<input type="button" value="  clear output " onclick="command_out.value = ''">
	<input type="checkbox" id="auto_clear"/>auto clear history
	<br>
	<textarea id="command_out" name="output" cols="128" rows="32" readonly></textarea>
	<p>
	<input type="input" id="command_in" size="96" onkeypress="OnCommandTextBoxChanged();">
	<input type="submit" value="  send command  " onclick="send_command()">
 </body>
</html>

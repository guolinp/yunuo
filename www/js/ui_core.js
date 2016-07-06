function ui_send_command(cmdline, cb_fun)
{
	$.get(
			"command.php",
			{
				command:cmdline
			},
			function(data) {
				cb_fun(data.command_result);
			},
			"json"
		);
}

function ui_get_object(objId)
{
	return document.getElementById(objId);
}

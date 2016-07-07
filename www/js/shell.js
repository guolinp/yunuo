var o_input = "INPUT_BOX";
var o_output = "OUTPUT_BOX";
var o_auto_clear = "AUTO_CLEAR";
var current_command_index = 0;
var command_list = new Array();

function history_init()
{
	current_command_index = 0;
}

function history_get_next()
{
	if (command_list.length == 0 || current_command_index <= 0)
		return;
	current_command_index--;
	ui_get_object(o_input).value = command_list[current_command_index];
}

function history_get_prev()
{
	if (command_list.length == 0 || current_command_index >= command_list.length)
		return;
	ui_get_object(o_input).value = command_list[current_command_index];
	current_command_index++;
}

function history_add(cmdline)
{
	command_list.unshift(cmdline);
	current_command_index = 0;
}

function shell_draw_ui()
{
	var line = '';

	line += '<p> Command Line Interface </p>';
	line += '<input type="button" value=" clear output " onclick="clear_output();">';
	line += '<input type="checkbox" id="' + o_auto_clear + '"/>auto clear last output';
	line += '<br>';
	line += '<textarea id="' + o_output + '" name="output" cols="128" rows="32" readonly></textarea>';
	line += '<p>';
	line += '<input type="input" id="' + o_input + '" size="96" onkeydown="on_press_key();">';
	line += '<input type="submit" value=" send command " onclick="submit_command();">';

	ui_get_object("ShellContainer").innerHTML = line;
	ui_get_object(o_auto_clear).checked = true;
}

function shell_update_ui(result)
{
	ui_get_object(o_output).value += result + "\r\n";
	ui_get_object(o_output).scrollTop = ui_get_object(o_output).scrollHeight;
	ui_get_object(o_input).value = "";
}

function shell_callback(result)
{
	shell_update_ui(result);
}

function shell_send_command(cmdline)
{
	ui_send_command(cmdline, shell_callback);
}

function clear_output()
{
	ui_get_object(o_output).value = "";
}

function submit_command()
{
	var cmdline = ui_get_object(o_input).value;

	if (ui_get_object(o_auto_clear).checked)
		clear_output();

	history_add(cmdline);

	ui_get_object(o_output).value += ">" + cmdline + "\r\n";
	shell_send_command(cmdline);
}

function on_press_key()
{
	switch (event.keyCode) {
	case 13:	//Enter
		submit_command();
		break;
	case 38:	//UP
		history_get_prev();
		break;
	case 40:	//Down
		history_get_next();
		break;
	default:
		break;
	}
}

function shell_init()
{
	shell_draw_ui();
}

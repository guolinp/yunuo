function light_draw_ui(n)
{
	var line = '';

	line += 'Lights';
	line += '<p>';
	line += '<table border=1>';
	line += '    <tr> <td>Light Device</td><td>Status</td><td>Operation</td> </tr>';

	for (var i = 0; i < n; i++) {
		line += '<tr>';
		line += '    <td>Light ' + i + '</td>';
		line += '    <td id="LIGHT' + i + '">on</td>';
		line += '    <td>';
		line += '        <input type="button" value="on" onclick="light_turn_on(' + i + ')">';
		line += '        <input type="button" value="off" onclick="light_turn_off(' + i + ')">';
		line += '    </td>';
		line += '</tr>';
	}
	line += '</table>';

	ui_get_object("LightContainer").innerHTML = line;
}

function light_get_object(devid)
{
	return ui_get_object('LIGHT' + devid);
}

/* Update the light state to UI
 *  state - all lights state string
 *          0-ON, 1-OFF
 * */
function light_update_ui(state)
{
	var s = state.split('');
	for (var i = 0; i < s.length; i++) {
		if (s[i] == "0") {
			light_get_object(i).innerHTML = "on";
			light_get_object(i).style.background = 'green';
		} else {
			light_get_object(i).innerHTML = "off";
			light_get_object(i).style.background = 'gray';
		}
	}
}

function light_callback(result)
{
	if (result.startsWith("light:")) {
		light_update_ui(result.split(':')[1]);
	}
}

function light_send_command(cmdline)
{
	ui_send_command(cmdline, light_callback);
}

/* Set light state
 *   devid - light device id
 *   state - 0|1 0-ON, 1-OFF
 */
function light_set(devid, state)
{
	var cmdline = "light set " + devid + " " + state;
	light_send_command(cmdline);
}

function light_turn_on(devid)
{
	light_set(devid, 0);
}

function light_turn_off(devid)
{
	light_set(devid, 1);
}

function light_init()
{
	light_draw_ui(8);
	light_send_command("light get");
}

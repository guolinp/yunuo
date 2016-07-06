var current_song_num = 0;

function music_draw_ui(n)
{
	var line = '';

	line += 'Music';
	line += '<p>';
	line += '<table border=1>';
	line += '    <tr> <td>ID</td><td>Name</td><td>Operation</td> </tr>';

	for (var i = 0; i < n; i++) {
		line += '<tr>';
		line += '    <td id="MUSIC_ID_' + i + '">xx</td>';
		line += '    <td id="MUSIC_NAME_' + i + '">xxxx</td>';
		line += '    <td>';
		line += '        <input type="button" value="play" onclick="music_play(' + i + ')">';
		line += '        <input type="button" value="stop" onclick="music_stop(' + i + ')">';
		line += '    </td>';
		line += '</tr>';
	}
	line += '</table>';

	ui_get_object("MusicContainer").innerHTML = line;
}

function music_update_ui(list)
{
	var song = list.split('|');
	var song_num = song.length;

	music_draw_ui(song_num);

	for (var i = 0; i < song_num; i++) {
		ui_get_object("MUSIC_ID_" + i).innerHTML = i;
		ui_get_object("MUSIC_NAME_" + i).innerHTML = song[i];
	}

	current_song_num = song_num;
}

function music_update_play_state(id)
{
	for (var i = 0; i < current_song_num; i++) {
		if (i == id)
			ui_get_object("MUSIC_NAME_" + i).style.background = 'green';
		else
			ui_get_object("MUSIC_NAME_" + i).style.background = 'white';
	}
}

function music_callback(result)
{
	if (!result.startsWith("music:"))
		return;

	var msg = result.split(':')[1].split('=');
	if (msg[0] == "error")
		alert("Error: " + msg[1]);
	else if (msg[0] == "info")
		alert("info: " + msg[1]);
	else if (msg[0] == "state")
		music_update_play_state(msg[1]);
	else if (msg[0] == "list")
		music_update_ui(msg[1]);
	else
		alert("Error: bad command, " + result);
}

function music_send_command(cmdline)
{
	ui_send_command(cmdline, music_callback);
}

function music_update_current()
{
	music_send_command("music get");
	setTimeout(music_update_current, 3000);
}

function music_play(musicid)
{
	var cmdline = "music play " + musicid;
	music_send_command(cmdline);
}

function music_stop(musicid)
{
	var cmdline = "music stop " + musicid;
	music_send_command(cmdline);
}

function music_init()
{
	var cmdline = "music list";
	music_send_command(cmdline);
	music_update_current();
}

<?php
$username=$_POST['username'];
$passowrd=$_POST['password'];

if ($username === "yunuo" && $passowrd === "yunuo") {
	require_once('make_session.php');
    echo "<p>login success<p>";
    echo "<li> <a href='shell.php'>goto shell page</a>";
    echo "<li> <a href='light.php'>goto light page</a>";
    echo "<li> <a href='music.php'>goto music page</a>";
}else {
    echo "<script language=javascript>alert('user name or password has error!'); history.back();</script>";
}
?>

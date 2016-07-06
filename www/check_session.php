<?php
$login = false;
session_start();
if (!isset($_SESSION["login"]) || $_SESSION["login"] === false) {
    $_SESSION["login"] = false;
    header("Location: login.html");
}
?>

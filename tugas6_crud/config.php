<?php
$servername = "localhost";
$username = "root"; // Sesuaikan dengan username DB Anda
$password = "basdat2023";     // Sesuaikan dengan password DB Anda
$dbname = "crud_app";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
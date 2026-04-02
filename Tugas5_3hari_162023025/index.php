<?php
require 'config.php';
$msg = '';
$msgType = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);

    if (empty($name) || empty($email)) {
        $msg = "Please fill out all fields.";
        $msgType = "error";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $msg = "Invalid email address.";
        $msgType = "error";
    } else {
        $stmt = $conn->prepare("SELECT id FROM users WHERE email=? OR name=?");
        $stmt->bind_param("ss", $email, $name);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $msg = "This email or name is already registered. Please try another.";
            $msgType = "error";
        } else {
            $stmt = $conn->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
            $stmt->bind_param("ss", $name, $email);
            if ($stmt->execute()) {
                $msg = "User has been successfully inserted.";
                $msgType = "success";
            } else {
                $msg = "Error inserting data.";
                $msgType = "error";
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Create Data</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2>Create Data</h2>
        <form method="POST" action="">
            <div class="form-group">
                <label>Name:</label>
                <input type="text" name="name" placeholder="Your name" value="<?= isset($name) ? htmlspecialchars($name) : '' ?>" required>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" name="email" placeholder="Your email" value="<?= isset($email) ? htmlspecialchars($email) : '' ?>" required>
            </div>
            
            <?php if ($msg != ''): ?>
                <div class="alert alert-<?= $msgType ?>"><?= $msg ?></div>
            <?php endif; ?>
            
            <button type="submit" class="btn-submit">Insert</button>
        </form>
        
        <div class="nav-buttons">
            <a href="index.php">CREATE</a>
            <a href="read.php">READ</a>
        </div>
    </div>
</body>
</html>
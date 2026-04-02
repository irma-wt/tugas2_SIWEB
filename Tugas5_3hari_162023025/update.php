<?php
require 'config.php';
$msg = '';
$msgType = '';

if (!isset($_GET['id'])) { header("Location: read.php"); exit; }
$id = $_GET['id'];

// Get User Data
$stmt = $conn->prepare("SELECT * FROM users WHERE id=?");
$stmt->bind_param("i", $id);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();

if (!$user) { header("Location: read.php"); exit; }

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);

    if (empty($name) || empty($email)) {
        $msg = "Please fill out all fields."; $msgType = "error";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $msg = "Invalid email address."; $msgType = "error";
    } else {
        // Cek duplikasi email pada user lain
        $stmt = $conn->prepare("SELECT id FROM users WHERE (email=? OR name=?) AND id != ?");
        $stmt->bind_param("ssi", $email, $name, $id);
        $stmt->execute();
        
        if ($stmt->get_result()->num_rows > 0) {
            $msg = "This email or name is already registered. Please try another."; $msgType = "error";
        } else {
            $stmt = $conn->prepare("UPDATE users SET name=?, email=? WHERE id=?");
            $stmt->bind_param("ssi", $name, $email, $id);
            if ($stmt->execute()) {
                $msg = "User has been successfully updated."; $msgType = "success";
                $user['name'] = $name; $user['email'] = $email; // Update variabel untuk tampilan
            } else {
                $msg = "Error updating data."; $msgType = "error";
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Update User</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2>Update User</h2>
        <form method="POST" action="">
            <div class="form-group">
                <label>Name:</label>
                <input type="text" name="name" value="<?= htmlspecialchars($user['name']) ?>" required>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" name="email" value="<?= htmlspecialchars($user['email']) ?>" required>
            </div>
            
            <?php if ($msg != ''): ?>
                <div class="alert alert-<?= $msgType ?>"><?= $msg ?></div>
            <?php endif; ?>
            
            <button type="submit" class="btn-submit">Update</button>
        </form>
        
        <div class="nav-buttons">
            <a href="index.php">CREATE</a>
            <a href="read.php">READ</a>
        </div>
    </div>
</body>
</html>
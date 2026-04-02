<?php require 'config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Read Data</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2>Read Data</h2>
        
        <?php
        $result = $conn->query("SELECT * FROM users ORDER BY id DESC");
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo '<div class="data-row">';
                echo '<div class="data-info">';
                echo '<p><strong>' . htmlspecialchars($row['name']) . '</strong></p>';
                echo '<p style="color:gray;">' . htmlspecialchars($row['email']) . '</p>';
                echo '</div>';
                echo '<div class="data-actions">';
                echo '<a href="update.php?id=' . $row['id'] . '" class="btn-edit">Edit</a> ';
                echo '<a href="delete.php?id=' . $row['id'] . '" class="btn-delete" onclick="return confirm(\'localhost \nAre you sure?\')">Delete</a>';
                echo '</div>';
                echo '</div>';
            }
        } else {
            echo "<p style='text-align:center;'>No data available.</p>";
        }
        ?>

        <div class="nav-buttons">
            <a href="index.php">CREATE</a>
            <a href="read.php">READ</a>
        </div>
    </div>
</body>
</html>
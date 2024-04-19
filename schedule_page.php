<?php
if (!isset($_GET['schedule_id'])) {
    echo "Schedule not found";
    exit;
}

$scheduleId = $_GET['schedule_id'];
// Database and schedule loading logic here
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Schedule Helper</title>
</head>
<body>
    <h1>Schedule Details</h1>
    <!-- Display schedule details here -->
</body>
</html>

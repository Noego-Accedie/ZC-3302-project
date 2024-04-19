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
    <link rel="stylesheet" href="template.css">
    <script src="https://kit.fontawesome.com/e008a59932.js" crossorigin="anonymous"></script>
</head>
<body>

    <div id="commentSection" class="comment-section hidden">
        <h3>Comments</h3>
        <div id="commentsList">
            <!-- Comments will be dynamically added here -->
        </div>
    </div>

    <div class="pre-content">
        <h1 id="Schedule_Name">Schedule Name(placeholder)</h1>
    </div>

    <section class="content">
        

        <div class="table-container">
            <table>
                <tr>
                    <th></th>
                    <th>7:50-9:40</th>
                    <th>9:50-11:40</th>
                    <th>11:50-1:40</th>
                    <th>2:10-4:00</th>
                </tr>
                <tr><th>Monday</th><td></td><td></td><td></td><td></td></tr>
                <tr><th>Tuesday</th><td></td><td></td><td></td><td></td></tr>
                <tr><th>Wednesday</th><td></td><td></td><td></td><td></td></tr>
                <tr><th>Thursday</th><td></td><td></td><td></td><td></td></tr>
                <tr><th>Friday</th><td></td><td></td><td></td><td></td></tr>
                <tr><th>Saturday</th><td></td><td></td><td></td><td></td></tr>
                <tr><th>Sunday</th><td></td><td></td><td></td><td></td></tr>
            </table>
        </div>
    </section>

    <section>Admin notes: </section>

    <section class="access_form disabled">
        <div class="overlay">
            <form id="participantForm" method="post">
                <input type="text" id="participant_username" name="participant_username" placeholder="Enter Username" required>
                <input type="password" id="participant_password" name="participant_password" placeholder="Enter Password" style="display: none;" required>
                <button type="button" onclick="checkUsername()">Access Schedule</button>
            </form>
        </div>
    </section>

    <script src="template.js"></script>
</body>
</html>

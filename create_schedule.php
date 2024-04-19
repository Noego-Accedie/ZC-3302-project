<?php
// Database connection setup
$host = 'localhost';
$dbname = 'ScheduleHelper';
$username = 'root';
$password = '';
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert lecturer into database
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lecturerName = $conn->real_escape_string($_POST['lecturer_name']);
    $scheduleName = $conn->real_escape_string($_POST['schedule_name']);
    $password = $conn->real_escape_string($_POST['password']);
    // Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO Lecturers (username, password) VALUES ('$lecturerName', '$hashedPassword')";

    if ($conn->query($sql) === TRUE) {
        $lecturerId = $conn->insert_id;
        // Insert schedule into database
        $sql = "INSERT INTO Schedules (lecturer_id, schedule_name) VALUES ('$lecturerId', '$scheduleName')";
        if ($conn->query($sql) === TRUE) {
            $scheduleId = $conn->insert_id;

            //insert timeslot into database
            $timeslots = [
                1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28
            ];
            $checkSql = "SELECT COUNT(*) FROM Timeslots WHERE schedule_id = ?";
            $stmt = $conn->prepare($checkSql);
            $stmt->bind_param("i", $scheduleId);
            $stmt->execute();
            $stmt->bind_result($count);
            $stmt->fetch();
            $stmt->close();

            if ($count == 0) {
                foreach ($timeslots as $timeslot) {
                    // Here you would insert your timeslots into the database
                    $insertSql = "INSERT INTO Timeslots (schedule_id, thumbs_up, thumbs_down, disabled) VALUES ($scheduleId, 0, 0, 0)";
                    $stmt = $conn->prepare($insertSql);
                    $stmt->execute();
                    $stmt->close();
                }
            }

            
            
            // Redirect to the new schedule page
            header("Location: schedule_page.php?schedule_id=$scheduleId");
            exit();
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}




$conn->close();


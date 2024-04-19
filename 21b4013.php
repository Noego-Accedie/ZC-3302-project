<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
// Database connection setup
$host = 'localhost';
$dbname = 'ScheduleHelper';
$username = 'root';
$password = '';
$conn = mysqli_connect($host, $username, $password, $dbname);

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


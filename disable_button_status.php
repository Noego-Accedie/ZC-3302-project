<?php
$host = 'localhost';
$dbname = 'ScheduleHelper';
$dbusername = 'root';
$dbpassword = '';
$conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    // Return JSON encoded error message
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

$timeslotId = $_GET['timeslotId']; //from parameter

$sql = "SELECT disabled FROM Timeslots WHERE timeslot_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $timeslotId);
$stmt->execute();
$stmt->bind_result($status);
$stmt->fetch();
$stmt->close();

// Return the thumbs up count as JSON
header('Content-Type: application/json');
echo json_encode(['status' => (bool)$status]);


<?php
ini_set('display_errors', 0);

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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $timeslotId = $data['timeslotId'];
    $response = ['success' => false];

    // Check the current state and toggle it
    $stmt = $conn->prepare("SELECT disabled FROM Timeslots WHERE timeslot_id = ?");
    $stmt->bind_param("i", $timeslotId);
    $stmt->execute();
    $result = $stmt->get_result();
    $currentStatus = $result->fetch_assoc();

    $newStatus = $currentStatus['disabled'] ? 0 : 1;

    $stmt = $conn->prepare("UPDATE Timeslots SET disabled = ? WHERE timeslot_id = ?");
    $stmt->bind_param("ii", $newStatus, $timeslotId);
    
    if ($stmt->execute()) {
        //$response['success'] = true;
        $response = ['success' => true, 'disabled' => (bool)$newStatus];

    }

    $stmt->close();
    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($response);
}
?>

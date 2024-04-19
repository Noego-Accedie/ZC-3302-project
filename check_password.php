<?php
ini_set('display_errors', 0);
// Start output buffering
ob_start();

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

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? null;
$password = $data['password'] ?? null;

if (!$username || !$password) {
    echo json_encode(['error' => 'No username or password provided']);
    exit;
}

$stmt = $conn->prepare("SELECT password FROM Participants WHERE username = ?");
if (!$stmt) {
    echo json_encode(['error' => 'Error preparing statement: ' . $conn->error]);
    exit;
}
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->bind_result($hashedPassword);
$stmt->fetch();
$stmt->close();

if (password_verify($password, $hashedPassword)) {
    // Password is correct
    $response['isPasswordCorrect'] = true;
} else {
    // Password is incorrect
    $response['isPasswordCorrect'] = false;
}

$conn->close();

// Clear the buffer to avoid any extra output
ob_end_clean();

header('Content-Type: application/json');
echo json_encode($response);

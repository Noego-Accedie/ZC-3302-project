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
$response = [];

if ($password != null){
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
}

else{
    if (!$username) {
        echo json_encode(['error' => 'No username provided']);
        exit;
    }
    
    $response = ['isLecturer' => false];
    
    $stmt = $conn->prepare("SELECT COUNT(*) FROM Lecturers WHERE username = ?");
    if (!$stmt) {
        echo json_encode(['error' => 'Error preparing statement: ' . $conn->error]);
        exit;
    }
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();
    
    if ($count > 0) {
        $response['isLecturer'] = true;
    } else {
        $stmt = $conn->prepare("INSERT INTO Participants (username) VALUES (?)");
        if (!$stmt) {
            echo json_encode(['error' => 'Error preparing statement: ' . $conn->error]);
            exit;
        }
        $stmt->bind_param("s", $username);
        if ($stmt->execute()) {
            $response['inserted'] = true;
        } else {
            echo json_encode(['error' => 'Error inserting data: ' . $stmt->error]);
            exit;
        }
        $stmt->close();
    }
}



$conn->close();

// Clear the buffer to avoid any extra output
ob_end_clean();

header('Content-Type: application/json');
echo json_encode($response);

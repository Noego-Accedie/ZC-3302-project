<?php

// Define your timeslots
$timeslots = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28
];

// Check if timeslots for this schedule are already initialized
$scheduleId = "SELECT schedule_id from Schedules where created_at = (SELECT MAX(created_at) FROM Schedules)";
$checkSql = "SELECT COUNT(*) FROM Timeslots WHERE schedule_id = ?";
$stmt = $conn->prepare($checkSql);
$stmt->bind_param("i", $scheduleId);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();

// If not, initialize them
if ($count == 0) {
    foreach ($timeslots as $timeslot) {
        // Here you would insert your timeslots into the database
        $insertSql = "INSERT INTO Timeslots (schedule_id, thumbs_up, thumbs_down, disabled) VALUES ($scheduleId, 0, 0, 0)";
        $stmt = $conn->prepare($insertSql);
        $stmt->bind_param("i", $scheduleId);
        $stmt->execute();
        $stmt->close();
    }
}

//not using anymore
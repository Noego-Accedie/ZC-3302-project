// const testButton = document.getElementById("testButton");

// onclick

// Function to toggle the visibility of the comment section
function toggleCommentSection() {
    var commentSection = document.getElementById("commentSection");
    var content = document.querySelector(".content");
    var preContent = document.querySelector(".pre-content");
    
    commentSection.classList.toggle("hidden");
    // Toggle 'shift-right' for the main content
    content.classList.toggle("shift-right");
    console.log("shift right");
    preContent.classList.toggle("shift-right");
}


// Add event listeners to each timeslot
document.querySelectorAll('table td').forEach(cell => {
    cell.addEventListener('click', toggleCommentSection);
});

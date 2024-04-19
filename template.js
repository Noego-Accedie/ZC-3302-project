//create the items inside each time slot
document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('table td');
    cells.forEach(cell => {
        // Create thumbs up icon
        const thumbsUpIcon = document.createElement('i');
        thumbsUpIcon.className = 'fa-regular fa-thumbs-up';
        thumbsUpIcon.onclick = function() { rateTimeslot('up', this); };

        // Create thumbs up counter
        const thumbsUpCounter = document.createElement('span');
        thumbsUpCounter.className = 'likes';
        thumbsUpCounter.innerText = '0';

        // Create thumbs down icon
        const thumbsDownIcon = document.createElement('i');
        thumbsDownIcon.className = 'fa-regular fa-thumbs-down';
        thumbsDownIcon.onclick = function() { rateTimeslot('down', this); };

        // Create thumbs down counter
        const thumbsDownCounter = document.createElement('span');
        thumbsDownCounter.className = 'dislikes';
        thumbsDownCounter.innerText = '0';

        // Append icons and counters to each cell
        cell.appendChild(thumbsUpIcon);
        cell.appendChild(thumbsUpCounter);
        cell.appendChild(thumbsDownIcon);
        cell.appendChild(thumbsDownCounter);
    });
});





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


document.querySelectorAll('table td').forEach((cell, index) => {
    cell.addEventListener('click', () => {
        toggleCommentSection(); // Opens the comment section
        loadCommentsForTimeslot(index); // Placeholder for loading comments
    });
});

function loadCommentsForTimeslot(timeslotIndex) {
    console.log("Loading comments for timeslot index: ", timeslotIndex);
    // Here you would typically make an API call to fetch comments for the given timeslot
    // For now, we'll just simulate with a placeholder
    document.getElementById("commentsList").innerHTML = `<p>Loading comments for timeslot ${timeslotIndex}...</p>`;
}

//TODO
//use this with the database
async function loadCommentsForTimeslot(timeslotIndex) {
    // Example URL structure, adjust based on your actual API
    const response = await fetch(`https://yourapi.com/comments/${timeslotIndex}`);
    const comments = await response.json();

    // Update the DOM with these comments
    const commentsHtml = comments.map(comment => `<p>${comment.text}</p>`).join('');
    document.getElementById("commentsList").innerHTML = commentsHtml;
}

function rateTimeslot(action, element) {
    let counterElement;
    if (action === 'up') {
        // The counter for the thumbs up is directly after the thumbs up icon
        counterElement = element.nextElementSibling;
    } else if (action === 'down') {
        // The counter for the thumbs down is directly after the thumbs down icon
        counterElement = element.nextElementSibling;
    }

    let currentCount = parseInt(counterElement.innerText);
    counterElement.innerText = currentCount + 1;

    console.log(`Rated ${action} for timeslot`); // Placeholder for server call
    updateTimeslotColor(element.parentNode);
}

function updateTimeslotColor(td) {
    const likes = parseInt(td.querySelector('.likes').innerText);
    const dislikes = parseInt(td.querySelector('.dislikes').innerText);

    if (likes > dislikes) {
        td.style.backgroundColor = '#d4edda'; // Light green
    } else if (likes < dislikes) {
        td.style.backgroundColor = '#f8d7da'; // Light red
    } else if (likes > 0 && dislikes == likes){
        td.style.backgroundColor = '#fff3cd'; // Light orange
    }
}

// function rateTimeslot(action, element) {
//     let counterElement = (action === 'up') ? element.nextElementSibling : element.previousElementSibling;
//     let currentCount = parseInt(counterElement.innerText);
//     counterElement.innerText = currentCount + 1;

//     // Example AJAX call
//     fetch('/rate-timeslot', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ action: action, count: currentCount + 1 })
//     }).then(response => response.json())
//       .then(data => console.log('Success:', data))
//       .catch((error) => console.error('Error:', error));
// }

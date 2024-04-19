let adminMode = false;

window.onload = function() {

    // Function to toggle access form display
    function toggleAccessForm() {
        const accessForm = document.querySelector('.access_form');
        accessForm.classList.toggle('disabled');
    }

    toggleAccessForm();
}

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

function checkUsername() {
    event.preventDefault();
    console.log('checkusername');
    const username = document.getElementById('participant_username').value;
    const passwordField = document.getElementById('participant_password');
    const password = document.getElementById('participant_password').value;
    console.log(password);
    
    // // Send an AJAX request to check if the username is a lecturer
    fetch('check_lecturer2.php', {
        method: 'POST',
        body: JSON.stringify({ username: username }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response error');
        }
        return response.json();
    })
    .then(data => {
        if (data.isLecturer) {
            passwordField.style.display = 'block';
            if(password != ""){
                console.log(password != "");
                adminMode = true;
                document.querySelector('.access_form').classList.toggle("disabled");
                // if (data.isPasswordCorrect) {
                //     // Password is correct
                //     document.querySelector('.access_form').classList.toggle("disabled");
                // } else if (data.isPasswordCorrect == false) {
                //     // Password is incorrect, show an error message or take appropriate action
                //     console.log('Incorrect password');
                //     console.log(data.isPasswordCorrect);
                //     window.alert("Wrong username/password");
                // }
                // else{
                //     window.alert("???");
                // }
        }
            
            // if(password != ""){
            //     console.log("check password");
            //     fetch('check_password.php', {
            //         method: 'POST',
            //         body: JSON.stringify({ username: username, password: password }),
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     })
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error('Network response error');
            //         }
            //         return response.json();
            //     })
            //     .then(data => {
            //         console.log(data.isPasswordCorrect);
            //         if (data.isPasswordCorrect) {
            //             // Password is correct
            //             document.querySelector('.access_form').classList.toggle("disabled");
            //         } else {
            //             // Password is incorrect, show an error message or take appropriate action
            //             console.log('Incorrect password');
            //             window.alert("Wrong username/password");
            //         }
            //     })
            //     .catch(error => console.error('Error:', error));
            // }

        } else {
            // If it's not a lecturer, submit the form using AJAX
            const form = document.getElementById('participantForm');
            const formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response error');
                }
                return response.text();
            })
            .then(data => {
                // Handle the form submission response data
                console.log(data);
                document.querySelector('.access_form').classList.toggle("disabled");
            })
            .catch(error => console.error('Error:', error));
        } 
    })
    .catch(error => console.error('Error:', error));
    
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
    if (likes > 0 && dislikes == likes){
        td.style.backgroundColor = '#fff3cd'; // Light orange
    }
    else if (dislikes > 0) {
        td.style.backgroundColor = '#f8d7da'; // Light red
    }
    else if (likes > 0) {
        td.style.backgroundColor = '#d4edda'; // Light green
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

window.onload = function() {

    // Function to toggle access form display
    function toggleAccessForm() {
        const accessForm = document.querySelector('.access_form');
        accessForm.classList.toggle('notshow');
    }

    toggleAccessForm();
}

//create the items inside each time slot
document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('table td');
    cells.forEach((cell, index) => {

        // Create thumbs up icon
        const thumbsUpIcon = document.createElement('i');
        thumbsUpIcon.className = 'fa-regular fa-thumbs-up';
        thumbsUpIcon.onclick = function() { 
            event.stopPropagation();
            rateTimeslot('up', this); 
        };

        // Create thumbs up counter
        const thumbsUpCounter = document.createElement('span');
        thumbsUpCounter.className = 'likes';
        fetchThumbsUp(index + 1).then(countData => {
            thumbsUpCounter.innerText = countData.thumbsUpCount;
        });

        // Create thumbs down icon
        const thumbsDownIcon = document.createElement('i');
        thumbsDownIcon.className = 'fa-regular fa-thumbs-down';
        thumbsDownIcon.onclick = function() { 
            event.stopPropagation();
            rateTimeslot('down', this); 
        };

        // Create thumbs down counter
        const thumbsDownCounter = document.createElement('span');
        thumbsDownCounter.className = 'dislikes';
        fetchThumbsDown(index + 1).then(countData => {
            thumbsDownCounter.innerText = countData.thumbsDownCount;
        });

        //create disable button for admin
        const disableButton = document.createElement('button');
        disableButton.className = 'disableButton';
        disableButton.classList.add("notshow");
        fetchDisableButton(index + 1).then(status => {
            console.log(status);
            disableButton.innerText = status.status ? "Enable" : "Disable";
            if (status.status){
                disableButton.parentNode.classList.add("disabled");
            }
        });
        disableButton.setAttribute('data-timeslot-id', index + 1);
        

        // Append icons and counters to each cell
        cell.appendChild(thumbsUpIcon);
        cell.appendChild(thumbsUpCounter);
        cell.appendChild(thumbsDownIcon);
        cell.appendChild(thumbsDownCounter);
        cell.appendChild(disableButton);
    });

    const disableButtons = document.querySelectorAll('.disableButton');
    console.log(disableButtons);
    
    disableButtons.forEach(button => {
        button.addEventListener('click', function() {
            event.stopPropagation();
            const timeslotId = this.getAttribute('data-timeslot-id');
            toggleTimeslot(this, timeslotId);
        });
    });

});

function fetchThumbsUp(timeslotId){
    return fetch(`thumbsup_count.php?timeslotId=${timeslotId}`)
        .then(response => response.json())
        .catch(error => console.error('error fetching thumbs up count', error));
}

function fetchThumbsDown(timeslotId){
    return fetch(`thumbsdown_count.php?timeslotId=${timeslotId}`)
        .then(response => response.json())
        .catch(error => console.error('error fetching thumbs down count', error));
}

function fetchDisableButton(timeslotId){
    return fetch(`disable_button_status.php?timeslotId=${timeslotId}`)
        .then(response => response.json())
        .catch(error => console.error('error fetching disable button status', error));
}

function adminMode(){
    const disableButtons = document.querySelectorAll('.disableButton');

    disableButtons.forEach(button => {
       button.classList.remove("notshow");
    });
}

function toggleTimeslot(buttonElement, timeslotId) {
    buttonElement.textContent = buttonElement.textContent.includes('Disable') ? 'Enable' : 'Disable';
    console.log("toggletimeslot");


    fetch('toggle_timeslot.php', {
        method: 'POST',
        body: JSON.stringify({ timeslotId: timeslotId }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => { 
    if (data.success) {
        buttonElement.parentNode.classList.toggle('disabled');
    } else {
        buttonElement.textContent = buttonElement.textContent.includes('Disable') ? 'Enable' : 'Disable';
        console.error('Toggle request failed:', data.error);
        alert('Failed to toggle timeslot. Please try again.');
    }
        
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
    });
}


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
                adminMode();
                document.querySelector('.access_form').classList.toggle("notshow");
                // if (data.isPasswordCorrect) {
                //     // Password is correct
                //     document.querySelector('.access_form').classList.toggle("notshow");
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
            //             document.querySelector('.access_form').classList.toggle("notshow");
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
                document.querySelector('.access_form').classList.toggle("notshow");
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
    if (dislikes > likes/5) {
        td.style.backgroundColor = '#f8d7da'; // Light red
    }
    else if (likes > dislikes/2) {
        td.style.backgroundColor = '#d4edda'; // Light green
    } else{
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

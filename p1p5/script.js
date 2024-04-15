// Define the first name
const firstName = "Carl";

// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    
    // Get the button element by its ID
    const button = document.getElementById("welcomeButton");
    
    // Get the div element where the welcome message will be displayed
    const messageDiv = document.getElementById("welcomeMessage");
    
    // Add a click event listener to the button
    button.addEventListener("click", function() {
        
        // Update the content of the message div with the "Welcome!" message
        // Displaying the welcome message along with the first name
        messageDiv.textContent = "Welcome, " + firstName + "!";
    });
});


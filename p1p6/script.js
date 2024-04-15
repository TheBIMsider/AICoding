// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    
  // Get the RSVP form element
  const rsvpForm = document.getElementById("rsvpForm");

  // Add event listener for form submission
  rsvpForm.addEventListener("submit", function(event) {
      
      // Prevent the default form submission
      event.preventDefault();

      // Get the value of the attendance select field
      const attendance = document.getElementById("attendance").value;

      // Get the confirmation message element
      const confirmationMessage = document.getElementById("confirmationMessage");

      // Get the body element
      const body = document.body;

      // Check if the user selected 'attending'
      if (attendance === "yes") {
          
          // Display a positive message and set the background image
          confirmationMessage.innerHTML = "🎉 Thank you for RSVPing to the GIF Gala! We can't wait to see you there!";
          confirmationMessage.style.backgroundColor = "#4CAF50"; // Change background color to vibrant green
          confirmationMessage.style.display = "block"; // Show the confirmation message

          // Set the attending background image
          body.style.backgroundImage = 'url("https://media.giphy.com/media/l2JHPB58MjfV8W3K0/giphy.gif")';
          body.style.backgroundRepeat = 'no-repeat';
          body.style.backgroundSize = 'cover';

      } else {

          // Display a different message and set a different background image
          confirmationMessage.innerHTML = "😔 We will miss you at the GIF Gala! We hope to see you at our next event.";
          confirmationMessage.style.backgroundColor = "#FF5733"; // Change background color to vibrant orange
          confirmationMessage.style.display = "block"; // Show the confirmation message

          // Set the not attending background image
          body.style.backgroundImage = 'url("https://media.giphy.com/media/JER2en0ZRiGUE/giphy.gif")';
          body.style.backgroundRepeat = 'no-repeat';
          body.style.backgroundSize = 'cover';
      }
  });
});

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Initialize Firebase app with your settings
const appSettings = {
  databaseURL: "${{ env.GIF_GALA_FB }}"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const messagesInDB = ref(database, "messages");

// Get DOM elements
const rsvpForm = document.getElementById('rsvp-form');
const email = document.getElementById('email');
const confirmationMessage = document.getElementById('confirmation-message');
const showList = document.getElementById('show-list');
const messageList = document.querySelector(".messages");
const attendanceDropdown = document.getElementById('attendance');
const messageField = document.getElementById('message-field');
const body = document.body;

// Event listener for attendance dropdown change
attendanceDropdown.addEventListener('change', (event) => {
  if (event.target.value === 'yes') {
    messageField.style.display = 'block';
  } else {
    messageField.style.display = 'none';
  }
});

// Event listener for form submission
rsvpForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const attendance = document.getElementById('attendance').value;
  const message = document.getElementById('message').value;

  if (attendance === 'yes') {
    confirmationMessage.innerHTML = `🎉 Party on! We look forward to seeing you at the GIF Gala!`;
    body.style.backgroundImage = 'url("https://media.giphy.com/media/l2JHPB58MjfV8W3K0/giphy.gif")';
    
    // Save message to Firebase only if attendance is 'yes'
    if (message.trim() !== '') {
      push(messagesInDB, {
        message: message,
        timestamp: new Date().toISOString()
      });
    }
  } else if (attendance === 'no') {
    confirmationMessage.innerHTML = '😔 We will miss you at the GIF Gala!';
    body.style.backgroundImage = 'url("https://media.giphy.com/media/JER2en0ZRiGUE/giphy.gif")';
  }

  confirmationMessage.style.display = 'block';
  rsvpForm.reset();
});

// Event listener to show/hide messages
showList.addEventListener('click', showMessages);

function showMessages() {
  if (messageList.style.display === 'none') {
    messageList.style.display = 'flex';
    showList.textContent = 'Hide Messages';
  } else {
    messageList.style.display = 'none';
    showList.textContent = 'Show Messages';
  }
}

// Function to display messages from Firebase
onValue(messagesInDB, (snapshot) => {
  messageList.innerHTML = ''; // Clear existing messages
  
  snapshot.forEach((childSnapshot) => {
    const messageData = childSnapshot.val();
    const messageItem = document.createElement('li');
    messageItem.textContent = `${messageData.message} - ${new Date(messageData.timestamp).toLocaleString()}`;
    messageList.appendChild(messageItem);
  });
});

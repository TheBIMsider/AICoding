import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  databaseURL: "Your Firebase Key here"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Create a reference to the 'compliments' collection
const complimentsRef = ref(database, "compliments");

// Verify if complimentsRef is correctly initialized
console.log("Compliments reference:", complimentsRef);

// Select page elements
const generateButton = document.getElementById('generateButton');
const complimentDisplay = document.getElementById('compliment-display');
const complimentForm = document.getElementById('complimentForm');
const complimentInput = document.getElementById('complimentInput');
const toggleFormButton = document.getElementById('toggleFormButton');
const successMessage = document.getElementById('successMessage');

// Toggle form visibility event listener
toggleFormButton.addEventListener('click', () => {
  complimentForm.classList.toggle('hidden');
  complimentForm.classList.contains('hidden') ? toggleFormButton.textContent = 'Add Kudos' : toggleFormButton.textContent = 'Hide Form';
});

// Form submission event listener
complimentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const complimentText = complimentInput.value;

  if (complimentText.trim() !== '') {
    push(complimentsRef, {
      text: complimentText
    })
    .then(() => {
      complimentInput.value = '';
      successMessage.style.display = 'block'; // Display the success message
      setTimeout(() => {
        successMessage.style.display = 'none'; // Hide the success message after 3 seconds
      }, 3000);
    })
    .catch((error) => {
      console.error("Error adding compliment: ", error);
      alert('An error occurred while adding the compliment. Please try again.');
    });
  } else {
    alert('Please enter a compliment before submitting.');
  }
});


// Retrieve compliments and display a random compliment
generateButton.addEventListener('click', () => {
  // Get the data from the 'compliments' collection
  get(complimentsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const compliments = []; // Array to store compliments

        // Iterate through the snapshot and push compliments to the array
        snapshot.forEach((childSnapshot) => {
          compliments.push(childSnapshot.val().text);
        });

        // Generate a random index to select a random compliment from the array
        const randomIndex = Math.floor(Math.random() * compliments.length);

        // Display the random compliment
        complimentDisplay.textContent = compliments[randomIndex];
      } else {
        // Display a message if no compliments are available
        complimentDisplay.textContent = 'No kudos available.';
      }
    })
    .catch((error) => {
      console.error("Error retrieving compliments: ", error);
      alert('An error occurred while retrieving compliments. Please try again.');
    });
});

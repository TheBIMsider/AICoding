document.addEventListener('DOMContentLoaded', function() {
  // Initialize participants array to store participant names
  let participants = [];

  // Get DOM elements
  const form = document.getElementById('raffle-form');
  const participantsDiv = document.getElementById('participants');
  const drawBtn = document.getElementById('draw-btn');
  const winnerDiv = document.getElementById('winner');
  const resetBtn = document.getElementById('reset-btn');

  // Attach event listeners
  form.addEventListener('submit', handleFormSubmit);
  drawBtn.addEventListener('click', handleDrawButtonClick);
  resetBtn.addEventListener('click', handleResetButtonClick);

  // Function to handle form submission
  function handleFormSubmit(event) {
      event.preventDefault();

      // Get participant name from input field
      const nameInput = document.getElementById('name');
      const name = nameInput.value.trim();

      // Check if the name is not empty
      if (name !== '') {
          // Add the name to participants array
          participants.push(name);

          // Display the participant name in the participants list
          participantsDiv.innerHTML += `<p>${name}</p>`;

          // Clear the input field
          nameInput.value = '';

          // Clear the winner display after adding a new participant
          winnerDiv.innerHTML = '';

          // Hide the winner display by removing the 'visible' class
          winnerDiv.classList.remove('visible');

          // Enable the draw button
          drawBtn.disabled = false;
      }
  }

  // Function to handle draw button click
  function handleDrawButtonClick() {
      if (participants.length > 0) {
          // Generate a random index to pick a winner from participants array
          const randomIndex = Math.floor(Math.random() * participants.length);
          const winner = participants[randomIndex];

          // Display the winner with cake and party emojis
          winnerDiv.innerHTML = `<h2>🍰 Winner: ${winner} 🎉</h2>`;

          // Show the winner display by adding the 'visible' class
          winnerDiv.classList.add('visible');

          // Disable the draw button after displaying the winner
          drawBtn.disabled = true;
      }
  }

  // Function to handle Reset button click
  function handleResetButtonClick() {
      // Clear the participants array
      participants = [];

      // Clear the participants list
      participantsDiv.innerHTML = '';

      // Clear the winner display
      winnerDiv.innerHTML = '';

      // Hide the winner display by removing the 'visible' class
      winnerDiv.classList.remove('visible');

      // Enable the draw button
      drawBtn.disabled = false;
  }
});

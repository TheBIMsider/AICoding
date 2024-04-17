// Variables to store game elements
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("time");
const gameBoard = document.getElementById("gameBoard");
const finalMessage = document.getElementById("finalMessage");
const bompSound = document.getElementById("bompSound");
const gameEndSound = document.getElementById("gameEndSound");
const gameEndHighSound = document.getElementById("gameEndHighSound");

let score = 0;
let timeLeft = 30;
let timerId;
let isGameActive = false;

// Function to update the score display
function updateScore() {
    scoreDisplay.textContent = score;
}

// Function to update the timer display
function updateTimer() {
    timerDisplay.textContent = timeLeft;
}

// Function to play bomp sound
function playBompSound() {
    bompSound.currentTime = 0; // Reset sound to the beginning
    bompSound.play();
}

// Function to play game end sound
function playGameEndSound(highScore) {
    if (highScore) {
        gameEndHighSound.currentTime = 0; // Reset sound to the beginning
        gameEndHighSound.play();
    } else {
        gameEndSound.currentTime = 0; // Reset sound to the beginning
        gameEndSound.play();
    }
}

// Function to handle image click event
function handleImageClick(event) {
    if (!isGameActive) return;

    const clickedImage = event.target;

    // Check if the clicked element is an image
    if (clickedImage.tagName === "IMG" && clickedImage.style.transform === "scale(1)") {
        // Increase score
        score++;
        updateScore();

        // Play bomp sound
        playBompSound();

        // Apply 4px red border to the clicked image
        clickedImage.style.border = "4px solid red";

        // Reset image visibility after a short delay
        setTimeout(() => {
            clickedImage.style.transform = "scale(0)";
            clickedImage.style.border = "none"; // Remove the red border
        }, 500); // Delay of 500 milliseconds
    }
}

// Function to handle game end
function endGame() {
    isGameActive = false;

    // Stop the timer
    clearInterval(timerId);

    // Update start button text
    startBtn.textContent = "Start Game";

    // Display final message
    if (score === 0) {
      finalMessage.textContent = "Well that was embarrassing";
      playGameEndSound(false); // Play regular end sound
    } else if (score > 0 && score < 11) {
        finalMessage.textContent = "Not bad, but you can do better! Try again!"; 
        playGameEndSound(false); // Play regular end sound
    } else {
        finalMessage.textContent = "Wow! You are a FaceBomp Master!";
        playGameEndSound(true); // Play high score sound
    }
}

// Function to start the game
function startGame() {
    // Reset game variables
    score = 0;
    timeLeft = 30;
    updateScore();
    updateTimer();
    finalMessage.textContent = "";
    isGameActive = true;

    // Update start button text
    startBtn.textContent = "Playing...";

    // Clear any existing timer
    clearInterval(timerId);

    // Start countdown timer
    timerId = setInterval(() => {
        timeLeft--;
        updateTimer();

        // Check if time has run out
        if (timeLeft === 0) {
            endGame();
        }
    }, 1000);

    // Randomly show images
    showRandomImage();
}

// Function to randomly show an image
function showRandomImage() {
    // Pick a random image
    const images = document.querySelectorAll(".hole img");
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];

    // Show the image
    randomImage.style.transform = "scale(1)";

    // Randomly show another image after a delay
    setTimeout(() => {
        randomImage.style.transform = "scale(0)";

        // Check if game is still active
        if (isGameActive) {
            showRandomImage();
        }
    }, Math.random() * 2000 + 1000); // Random delay between 1 to 3 seconds
}

// Event listener for image click
gameBoard.addEventListener("click", handleImageClick);

// Event listener for start button click
startBtn.addEventListener("click", startGame);

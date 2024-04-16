// Drum buttons and audio elements
const drumButtons = [
  { id: 'kickButton', key: 'a', soundId: 'kickSound' },
  { id: 'rideButton', key: 's', soundId: 'rideSound' },
  { id: 'boomButton', key: 'd', soundId: 'boomSound' },
  { id: 'clapButton', key: 'q', soundId: 'clapSound' },
  { id: 'hihatButton', key: 'w', soundId: 'hihatSound' },
  { id: 'openhatButton', key: 'e', soundId: 'openhatSound' },
  { id: 'snareButton', key: 'z', soundId: 'snareSound' },
  { id: 'tinkButton', key: 'x', soundId: 'tinkSound' },
  { id: 'tomButton', key: 'c', soundId: 'tomSound' },
];

// Function to play sound
function playSound(soundId) {
  const audio = document.getElementById(soundId);
  audio.currentTime = 0; // Rewind to the start
  audio.play();
}

// Add event listeners to drum buttons
drumButtons.forEach(({ id, soundId }) => {
  const buttonElement = document.getElementById(id);

  buttonElement.addEventListener('click', () => playSound(soundId));
});

// Add keyboard event listener
document.addEventListener('keydown', ({ key }) => {
  const button = drumButtons.find(btn => btn.key === key.toLowerCase());
  if (button) playSound(button.soundId);
});

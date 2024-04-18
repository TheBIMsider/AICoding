let currentTemp = 78; // Initial temperature

document.getElementById('increase-temp').addEventListener('click', function() {
    currentTemp++;
    document.getElementById('current-temp').textContent = `${currentTemp}°F`;
});

document.getElementById('decrease-temp').addEventListener('click', function() {
    currentTemp--;
    document.getElementById('current-temp').textContent = `${currentTemp}°F`;
});

const songs = [
  "Never Gonna Give You Up",
  "Ice Ice Baby",
  "Bohemian Rhapsody",
  "Baby Shark",
  "Friday",
  "Gangnam Style",
  "Chocolate Rain",
  "All Star",
  "What Does The Fox Say?",
  "Numa Numa"
];

let currentSongIndex = -1;
let isPlaying = false;

function playSong() {
  if (!isPlaying) {
      currentSongIndex = Math.floor(Math.random() * songs.length);
      document.getElementById('song-name').textContent = songs[currentSongIndex];
      isPlaying = true;
  }
}

function stopSong() {
  document.getElementById('song-name').textContent = "Music Stopped";
  isPlaying = false;
}

function nextSong() {
  if (isPlaying) {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      document.getElementById('song-name').textContent = songs[currentSongIndex];
  }
}

document.getElementById('play-pause-music').addEventListener('click', playSong);
document.getElementById('stop-music').addEventListener('click', stopSong);
document.getElementById('next-track').addEventListener('click', nextSong);


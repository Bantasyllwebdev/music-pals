
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist =  document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: '   Mercy Chinwo  Excess Love remx ',
        displayName: 'Excess Love Remix',
        artist: 'Mercy Chinwo',
    },
    {
        name: 'Moses Bliss  -Bigger Everday ',
        displayName: 'Bigger Everday',
        artist: 'Moses Bliss',
    },
    {
        name: 'Francesca Battistelli  - Theres No Other Name   Starlight',
        displayName: 'Theres No Other Name Starlight',
        artist: 'Francesca Battistelli',
    },
    {
        name: 'Defender  - UpperRoom',
        displayName: 'Defender',
        artist: 'UpperRoom',
    },
    {
        name: 'Josh Baldwin',
        displayName: 'I Love Your Presence',
        artist: 'Josh Baldwin',
    },
    {
        name: ' Jenn Johnson',
        displayName: 'God I Look To You ',
        artist: 'Jenn Johnson',
    },
    {
        name: ' Kari Jobe - Holy Spirit Live ',
        displayName: 'Holy Spirit Live',
        artist: 'Kari Jobe',
    },
    {
        name: ' Kari Jobe Majesty',
        displayName: 'Majesty',
        artist: 'Kari Jobe',
    },
]

// Check if playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause event listern
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--; 
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar and Time
function updateProgressBar(e) {
    if (isPlaying) {
       const { duration, currentTime } = e.srcElement;
    //    Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration 
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
   
    // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
      }
     
          // Calculate display for current 
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width =  this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
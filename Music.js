const playlist = [
    {
      title: "Naa Ready(Leo)",
      artist: "(Aniruth Ravichandran, Thalaphathy vijay)",
      audioSource: "Song1.mp4",
      albumArt: "leo.jpg",
      liked: false,
    },
    {
      title: "Darshana (Hridayam)",
      artist: "(Hesham Abdul Wahab, Darshana Rajendran)",
      audioSource: "Song3.mp3",
      albumArt: "Darshana.jpg",
      liked: false,
    },
    {
      title: "Hukum (Jailer)",
      artist: "(Aniruth Ravichandran, Nelson)",
      audioSource: "Song2.mp3",
      albumArt: "jailer.jpg",
      liked: false,
    },
    // Add more songs as needed
  ];
  
  let currentSongIndex = 0;
  const audio = new Audio();
  
  function loadSong(index) {
    const song = playlist[index];
    audio.src = song.audioSource;
    audio.load();
  
    // Update the player's UI with the song information
    document.querySelector(".album-art img").src = song.albumArt;
    document.querySelector(".song-info h2").textContent = song.title;
    document.querySelector(".song-info p").textContent = song.artist;
  
    // Update the "like" button based on the song's liked status
    const likeButton = document.getElementById("like-btn");
    if (song.liked) {
      likeButton.classList.add("liked");
    } else {
      likeButton.classList.remove("liked");
    }
  }
  
  loadSong(currentSongIndex);
  
  const playPauseButton = document.getElementById("play-pause-btn");
  const previousButton = document.getElementById("previous-btn");
  const nextButton = document.getElementById("next-btn");
  
  playPauseButton.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    updatePlayPauseIcon();
  });
  
  previousButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    audio.play(); // Auto-play next song
    updatePlayPauseIcon();
  });
  
  nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audio.play(); // Auto-play next song
    updatePlayPauseIcon();
  });
  
  audio.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audio.play(); // Auto-play next song
    updatePlayPauseIcon();
  });
  
  function updatePlayPauseIcon() {
    if (audio.paused) {
      playPauseButton.classList.remove("fa-pause");
      playPauseButton.classList.add("fa-play");
    } else {
      playPauseButton.classList.remove("fa-play");
      playPauseButton.classList.add("fa-pause");
    }
  }
  
  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    const progressBar = document.querySelector(".progress-bar .progress");
    progressBar.style.width = `${progress}%`;
    const currentTimeElement = document.getElementById("current-time");
    const totalTimeElement = document.getElementById("total-time");
  
    const currentTimeMinutes = Math.floor(audio.currentTime / 60);
    const currentTimeSeconds = Math.floor(audio.currentTime % 60);
    const totalTimeMinutes = Math.floor(audio.duration / 60);
    const totalTimeSeconds = Math.floor(audio.duration % 60);
  
    currentTimeElement.textContent = `${currentTimeMinutes}:${currentTimeSeconds < 10 ? '0' : ''}${currentTimeSeconds}`;
    totalTimeElement.textContent = `${totalTimeMinutes}:${totalTimeSeconds < 10 ? '0' : ''}${totalTimeSeconds}`;
  });
  
  // Add an event listener to allow users to seek within the song by clicking on the progress bar
  const progressBar = document.querySelector(".progress-bar");
  progressBar.addEventListener("click", (event) => {
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const seekTime = (clickX / progressBarWidth) * audio.duration;
    audio.currentTime = seekTime;
  });
  
  document.getElementById('previous-icon').addEventListener('click', () => {
    // Implement logic to play the previous song
    console.log('Playing the previous song');
  });
  
  document.getElementById('next-icon').addEventListener('click', () => {
    // Implement logic to play the next song
    console.log('Playing the next song');
  });
  
  document.getElementById('like-icon').addEventListener('click', () => {
    // Implement logic to like/unlike the current song
    console.log('Liking/Unliking the song');
  });
  
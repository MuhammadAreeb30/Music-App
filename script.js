const songs = [
    {
        name: "AP Dhillon and Gurinder Gill",
        artist: "Excuses"
    },
    {
        name: "INDERPAL MOGA",
        artist: "Daku"
    },
    {
        name: "Shubh",
        artist: "No Love"
    },
];

const img = document.getElementById('img');
const musicName = document.getElementById('music');
const artistName = document.getElementById('name');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
const audio = document.querySelector('audio');

let progress_div = document.getElementById('progress_div');
let total_duration = document.getElementById('duration');
let curr_time = document.getElementById('curr_time');
let progressBar = document.getElementById('progressbar');
let toggle = true;

const musicplay = () => {
    if (toggle) {
        audio.play();
        play.src = 'images/pause.png';
        img.classList.add('anime');
    }
    else {
        audio.pause();
        play.src = 'images/play.png';
        img.classList.remove('anime');
    }

    toggle = !toggle;
};

play.addEventListener('click', musicplay);


const loadSong = (songs) => {
    musicName.textContent = songs.artist;
    artistName.textContent = songs.name;
    audio.src = "audio/" + songs.artist + ".mp3";
    img.src = "images/" + songs.artist + ".jpg";
}

// next & prev js work 

songIndex = 0;

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    musicplay();
}

const backSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    musicplay();
}

// progress js

audio.addEventListener('timeupdate', (event) => {
    const { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progressBar.style.width = `${progress_time}%`;

    // music duration update 

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    let totl_duration = `${min_duration}:${sec_duration}`;
    if (duration) {
        total_duration.textContent = `${totl_duration}`
    }

    // current duration update 

    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);
    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`
    }
    let totl_currentTime = `${min_currentTime}:${sec_currentTime}`;
    curr_time.textContent = `${totl_currentTime}`

});

// progress on click 

progress_div.addEventListener('click', (event) => {
    const { duration } = audio;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    audio.currentTime = move_progress;
});

// if music end next song start
audio.addEventListener('ended', nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', backSong);
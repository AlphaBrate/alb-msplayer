// This Open-sourced player by AlphaBrate is under the APEL License.
// As this project is done by individual from AlphaBrate, the terms, naming may not be professional.
// © AlphaBrate 2022 - 2024
// File: controls.js
// Play song

function playSong() {
    var audio = document.getElementById('audio');
    audio.play();
    // Change button#toggle 's data-playing to true
    var toggle = document.getElementById('toggle');
    toggle.setAttribute('data-playing', 'true');
    // Change button#toggle 's innerHTML to 'pause.svg'
    var toggleIcon = document.getElementById('toggleIcon');
    toggleIcon.src = 'assets/icons/controls/pause.svg';
}

if (localStorage.getItem('autoplay') === 'true') {
    playSong();
}

var toggleIcons = ['assets/icons/controls/play.svg', 'assets/icons/controls/pause.svg']

// On click button#toggle
function toggleSong() {
    var audio = document.getElementById('audio');
    var toggle = document.getElementById('toggle');
    var toggleIcon = document.getElementById('toggleIcon');
    if (toggle.getAttribute('data-playing') === 'true') {
        audio.pause();
        toggle.setAttribute('data-playing', 'false');
        toggleIcon.src = toggleIcons[0];
    } else {
        audio.play();
        toggle.setAttribute('data-playing', 'true');
        toggleIcon.src = toggleIcons[1];
    }
    setTimeCursor();
}
document.getElementById('toggle').addEventListener('click', toggleSong);

// Check if song is playing every 100ms
function checkPlaying() {
    var audio = document.getElementById('audio');
    var toggle = document.getElementById('toggle');
    var toggleIcon = document.getElementById('toggleIcon');
    // update #duration
    var duration = document.getElementById('duration');
    // show CURRENT:TIME/TOTAL:DURATION
    var currentTime = audio.currentTime;
    var totalDuration = audio.duration;
    var currentMinute = Math.floor(currentTime / 60);
    var currentSecond = Math.floor(currentTime % 60);
    var totalMinute = Math.floor(totalDuration / 60);
    var totalSecond = Math.floor(totalDuration % 60);
    if (currentSecond < 10) {
        currentSecond = '0' + currentSecond;
    }
    if (totalSecond < 10) {
        totalSecond = '0' + totalSecond;
    }
    duration.innerHTML = currentMinute + ':' + currentSecond + '/' + totalMinute + ':' + totalSecond;
    
    if (audio.paused) {
        toggle.setAttribute('data-playing', 'false');
        toggleIcon.src = toggleIcons[0];
        // Check if song is ended
        if (audio.currentTime === audio.duration) {
            audio.currentTime = 0;
            if (localStorage.getItem('loop') === 'true') {
                audio.play();
            } else {
                songEnded();
            }
        }
    } else {
        toggle.setAttribute('data-playing', 'true');
        toggleIcon.src = toggleIcons[1];
    }
}
setInterval(() => {
    checkPlaying();
    setTimeCursor();
}, 100);

// Set time cursor
function setTimeCursor() {
    var audio = document.getElementById('audio');
    var currentTime = audio.currentTime;
    var duration = audio.duration;
    var percentage = currentTime / duration * 100;
    document.getElementById('tc').value = percentage;
    // Set time
    var time = document.getElementById('time');
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    if (minute < 10) {
        minute = '0' + minute;
    }
    time.innerHTML = hour + ':' + minute;
}

// On input time cursor
document.getElementById('tc').addEventListener('input', function () {
    var audio = document.getElementById('audio');
    var percentage = document.getElementById('tc').value;
    var duration = audio.duration;
    var currentTime = duration * percentage / 100;
    audio.currentTime = currentTime;
});

function next() {
    // five seconds forward
    var audio = document.getElementById('audio');
    audio.currentTime += 5;
    // Update time cursor
    setTimeCursor();
}
document.getElementById('next').addEventListener('click', next);

var songEnded = () => {
    // What to do when song ended
};

// On click button#previous
function previous() {
    // all the way back
    var audio = document.getElementById('audio');
    audio.currentTime = 0;
    // Update time cursor
    setTimeCursor();
}
document.getElementById('prev').addEventListener('click', previous);

document.body.addEventListener('keydown', function (e) {
    // Spacebar
    if (e.which === 32) {
        toggleSong();
    }
    // Left arrow, go five seconds back
    if (e.which === 37) {
        var audio = document.getElementById('audio');
        audio.currentTime -= 5;
        // Update time cursor
        setTimeCursor();
    }
    // Right arrow, go five seconds forward
    if (e.which === 39) {
        var audio = document.getElementById('audio');
        audio.currentTime += 5;
        // Update time cursor
        setTimeCursor();
    }
});


let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('time');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startPauseTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        startPauseButton.innerHTML = 'Pause';
        running = true;
        lapButton.disabled = false;
    } else {
        clearInterval(tInterval);
        startPauseButton.innerHTML = 'Start';
        running = false;
        lapButton.disabled = true;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    lapCounter = 0;
    timeDisplay.innerHTML = '00:00:00:00';
    startPauseButton.innerHTML = 'Start';
    lapsContainer.innerHTML = '';
    lapButton.disabled = true;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let centiseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    centiseconds = (centiseconds < 10) ? '0' + centiseconds : centiseconds;

    timeDisplay.innerHTML = `${hours}:${minutes}:${seconds}:${centiseconds}`;
}

function recordLap() {
    lapCounter++;
    const lapTime = timeDisplay.innerHTML;
    const lapElement = document.createElement('div');
    lapElement.classList.add('lap');
    lapElement.innerHTML = `<span>Lap ${lapCounter}</span><span>${lapTime}</span>`;
    lapsContainer.appendChild(lapElement);
    lapsContainer.scrollTop = lapsContainer.scrollHeight;
}

startPauseButton.addEventListener('click', startPauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

// Initially disable the Lap button until the timer starts
lapButton.disabled = true;

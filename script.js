const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");
const historyList = document.getElementById("historyList");

let timer;
let elapsedTime = 0;
let isRunning = false;

function updateTimer() {
    let hours = Math.floor(elapsedTime / 3600000);
    let minutes = Math.floor((elapsedTime % 3600000) / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = elapsedTime % 1000;

    let hoursDisplay = hours.toString();
    if (hours < 10) {
        hoursDisplay = "0" + hours;
    }

    let minutesDisplay = minutes.toString();
    if (minutes < 10) {
        minutesDisplay = "0" + minutes;
    }

    let secondsDisplay = seconds.toString();
    if (seconds < 10) {
        secondsDisplay = "0" + seconds;
    }

    let millisecondsDisplay = Math.floor(milliseconds / 10).toString();
    if (milliseconds < 100) {
        millisecondsDisplay = "0" + millisecondsDisplay;
    }

    // Update the timer display
    timerDisplay.textContent = hoursDisplay + ":" + minutesDisplay + ":" + secondsDisplay + ":" + millisecondsDisplay;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            elapsedTime += 10;  // Increment by 10 ms for finer precision
            updateTimer();
        }, 10);  // Update every 10 ms
    }
}

function stopTimer() {
    if (isRunning) {
        addHistory();  // Log the current time to the history
        isRunning = false;
        clearInterval(timer);
    }
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    updateTimer();
    clearHistory();  // Clear the history log
}

// Add the current time to the history log
function addHistory() {
    const listItem = document.createElement("li");
    listItem.textContent = timerDisplay.textContent;
    historyList.appendChild(listItem);
}

// Clear the history log
function clearHistory() {
    historyList.innerHTML = "";  // Clear all entries from the list
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
updateTimer();

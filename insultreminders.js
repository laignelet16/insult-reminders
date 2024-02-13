var id = "unassigned id";

var toggleButton = document.getElementById("toggleButton");
toggleButton.addEventListener("click", toggleTimer);

var snoozeButton = document.getElementById("snoozeButton");
snoozeButton.addEventListener("click", snoozeTimer);

var resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetTimer);

var timerRunning = false;
var timeRemaining = document.getElementById("timeRemaining");

function toggleTimer() {
    console.log("Toggle")
    if (!timerRunning) {
        startTimer();
        toggleButton.innerHTML = "Stop";
    } else {
        stopTimer();
        toggleButton.innerHTML = "Start";
    }
    timerRunning = !timerRunning; // Toggle the timerRunning variable
}

function startTimer() {
    console.log("start timer");
    //Display elements that are initially and hide start button
    timeRemaining.style.visibility = "visible";
    document.getElementById("currentTime").style.visibility = "visible";
    document.getElementById("timerUp").innerHTML = ""; // Clear timer is done/insult text
    if (id == "") { // Conditional determines whether to count down from textbox or paused value
        updateClock(document.getElementById("currentTime").innerHTML);
    } else {
        updateClock(startTime.value); // Calls only when the clock is starting from textbox/not paused
    }
}

// Recursive function to count down the clock every second
function updateClock(currentCount) {
    if (currentCount > 0) {
        document.getElementById("currentTime").innerHTML = currentCount; // Update on screen value
        currentCount--;
        id = setTimeout(updateClock, 1000, currentCount); // Update timeout id, call method again until timer is up
    } else if (currentCount == 0) {
        snoozeButton.style.visibility = "visible";
        document.getElementById("currentTime").innerHTML = currentCount;
        timerUp();
        resetTimer.getElementById("timerUp").style.visibility = "visible";
    }
}

function stopTimer() {
    console.log("stop timer");
    clearTimeout(id); // Ends timer
    id = ""; // When counter is stopped, clear the counter's id (indicates to startTimer the clock is paused)

}
function resetTimer(){
    console.log("reset timer");
    timeRemaining.style.visibility = "hidden";
    document.getElementById("currentTime").style.visibility = "hidden";
    snoozeButton.style.visibility = "hidden";
    clearTimeout(id);
    id = "unassigned id";
    document.getElementById("timerUp").style.visibility = "hidden";
    toggleButton.innerHTML = "Start";
}
function snoozeTimer() {
    document.getElementById("timerUp").style.visibility = "visible";
    switch (currentInsultCategory) {
        case "category1":
            currentInsultCategory = "category2";
            break;
        case "category2":
            currentInsultCategory = "category3";
            break;
        case "category3":
            currentInsultCategory = "category1";
            break;
        default:
            currentInsultCategory = "category1";
    }

    const insult = getRandomInsult(currentInsultCategory);
    document.getElementById("timerUp").innerHTML = insult;

    stopTimer();
    updateClock(startTime.value);
}

// Function to play timer sound
function playTimerSound() {
    var audio = document.getElementById("timerSound");
    audio.play();
}

const insults = {
    category1: ["You're so lazy, you'd rather count sand than get up.", "You're like a sloth on a caffeine rush.", "You procrastinate so much, you'll finish that task in your next life."],
    category2: ["You're the epitome of laziness; even gravity doesn't work on you.", "If laziness were an Olympic sport, you'd win gold for eternity.", "You're so lazy, you make a snail look like it's on speed."],
    category3: ["You're a black hole of productivity, sucking in ambition and emitting nothing.", "Your laziness is so legendary, it has its own theme song.", "If there were a Nobel Prize for idleness, you'd win it by doing absolutely nothing."]
};

let currentInsultCategory = "category1"; // Default insult category

function getRandomInsult(category) {
    const insultsArray = insults[category];
    const randomIndex = Math.floor(Math.random() * insultsArray.length);
    return insultsArray[randomIndex];
}

function timerUp() {
    document.getElementById("timerUp").innerHTML = "Your timer is done!";
    stopTimer();
    playTimerSound();
}

const phoneticAlphabet = {

    c1: ["aaa"],
    a: ["alpha", "alfa"],
    b: ["bravo"],
    c: ["charlie"],
    d: ["delta"],
    e: ["echo"],
    f: ["foxtrot"],
    g: ["golf"],
    h: ["hotel"],
    i: ["india"],
    j: ["juliet", "juliette"],
    k: ["kilo"],
    l: ["lima"],
    m: ["mike"],
    n: ["november"],
    o: ["oscar"],
    p: ["papa"],
    q: ["quebec"],
    r: ["romeo"],
    s: ["sierra"],
    t: ["tango"],
    u: ["uniform"],
    v: ["victor"],
    w: ["whiskey", "whisky"],
    x: ["xray", "x-ray"],
    y: ["yankee"],
    z: ["zulu"],
    0: ["zero"],
    1: ["wun"],
    2: ["too"],
    3: ["tree"],
    4: ["fower"],
    5: ["fiver"],
    6: ["six"],
    7: ["seven"],
    8: ["ait"],
    9: ["niner"]
};

let characterCounter = 0;

let input = "";
let elapsed, minutes, seconds;
let runningTimer = false;
let timerInterval = null;
let totalTime = "";


window.phonetics = function () {
    if (document.getElementById("mainInput").value === ' ') {
        document.getElementById("mainInput").value = null;
    }

    input = document.getElementById("mainInput").value.trim();

    input = checkPhoneticMatch(input);
    if (input !== null) {
        document.getElementById("Results").innerHTML += input;
        document.getElementById("mainInput").value = null;
        console.log(characterCounter);
    }

}

window.timerfunction = function () {

}


function checkPhoneticMatch(param) {
    const input = param.toLowerCase().replace(/\s|-/g, "");

    for (let key in phoneticAlphabet) {
        const variants = phoneticAlphabet[key].map(variant =>
            variant.toLowerCase().replace(/\s|-/g, "")
        );

        if (variants.includes(input)) {
            characterCounter++;
            document.getElementById("stats").innerHTML = "Characters: " + characterCounter +
                "<br>Characters per second: " + calculateCPS(characterCounter).toFixed(2);
            return key;
        }
    }
    return null;
}

document.body.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        restartTimer();
        document.getElementById("mainInput").value = null;
    } if (e.key === "Backspace") {
        document.getElementById("mainInput").value = null;
    } if (e.key === " ") {
        document.getElementById("Results").innerHTML += ' ';

    }



    else if (!runningTimer) {
        document.getElementById("timer").innerHTML = "0:60";
        const display = document.getElementById('timer');
        startStopwatch(display);
    }
});

function restartTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);  // Clear the previous interval if any
    }
    runningTimer = false;
    characterCounter = 0;
    totalTime = 60;
    document.getElementById("Results").innerHTML = "";
    document.getElementById("stats").innerHTML = "Reset";
    document.getElementById("timer").innerHTML = "click to Start";// Reset stats
    console.log("Timer restarted");
}

function startStopwatch(display) {
    if (runningTimer) {

    } else {
        runningTimer = true;
        totalTime = 60;  // Set total time to 60 seconds for a 1-minute timer

        timerInterval = setInterval(function () {
            console.log(totalTime--);  // Decrease the time by 1 second each time the interval runs

            // Calculate minutes and seconds
            let minutes = Math.floor(totalTime / 60);
            let seconds = totalTime % 60;

            //If seconds are less than 10, add a leading zero
            seconds = seconds < 10 ? '0' + seconds : seconds;

            // Display the countdown time in the desired element
            display.innerHTML = minutes + ":" + seconds;

            // Stop the timer when it reaches 0
            if (totalTime <= 0) {
                clearInterval(timerInterval);
                runningTimer = false;
                display.innerHTML = "Time's up!";// Optionally display a message
                alert("your cpm is: " + calculateCPS(characterCounter).toFixed(2));
            }
        }, 1000);  // Update every second (1000 ms)
    }
}


function calculateCPS(characters) {
    return characters / 60;
}
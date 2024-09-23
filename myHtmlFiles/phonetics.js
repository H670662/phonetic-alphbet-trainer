const phoneticAlphabet = {
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



window.phonetics = function() {

    input = document.getElementById("mainInput").value.trim();
    if (input === ' ') {
        document.getElementById("Results").innerHTML += input
        document.getElementById("mainInput").value = null;
    }
    input = checkPhoneticMatch(input);
    if (!(input === null)) {
        document.getElementById("Results").innerHTML += input
        document.getElementById("mainInput").value = null;
        console.log(characterCounter);
    }

}

window.timerfunction = function() {

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
                "<br>Characters per minute: " + calculateCPS(characterCounter).toFixed(2);
            return key;
        }
    }
    return null;
}



function startStopwatch(display) {
    if (runningTimer) {
        return;

    } else {
        runningTimer = true;
        let startTime = Date.now(); // Capture the starting time

        const interval = setInterval(function () {
            // Calculate total elapsed time in seconds
            elapsed = Math.floor((Date.now() - startTime) / 1000);

            let minutes = Math.floor(elapsed / 60);
            let seconds = elapsed % 60;

            // If seconds are less than 10, add a leading zero
            seconds = seconds < 10 ? '0' + seconds : seconds;

            // Display the stopwatch time in the desired element
            display.innerHTML = minutes + ":" + seconds;
        }, 1000);  // Update every second (1000 ms)

        return interval; // Return the interval ID so it can be stopped if needed
    }
}

// Example usage: Start the stopwatch and display it in an element with id="timer"
window.onclick = function () {
    const display = document.getElementById('timer'); // Get the element to display the stopwatch
    startStopwatch(display); // Start the stopwatch
};

function calculateCPS(characters) {
    if (elapsed > 0) {
        return characters / elapsed * 60;
    } else {
        return 0; // Avoid division by zero
    }
}
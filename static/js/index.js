// Add our button listener
window.addEventListener('load', function(ign) {
    var clicker = document.getElementById('clicker');
    clicker.addEventListener('mouseup', function(event) {
        clickSpeedTest();
    });

    document.getElementById('reset').addEventListener('click', function(event) {
        resetClickSpeedTest();
    });
});

// Denotes if the test is running
var running = false;
var count = 0;
var start;

function clickSpeedTest() {
    // Init the test
    initClickSpeedTest();
    count += 1;
}

function initClickSpeedTest() {
    if (!running) {
        // Set running
        running = true;
        start = Date.now();

        var intervalID = setInterval(function() {
            var countDiv = document.getElementById('count');
            var timeDiv = document.getElementById('time');
            countDiv.innerHTML = "Clicks: " + count;
            timeDiv.innerHTML = "Elapsed: " + ((Date.now() - Math.ceil(start)) / 1000) + "s";
        }, 50);

        // Set the task ID, and call the function endClickSpeedTest()
        var timeoutID;
        return (taskID = setTimeout(endClickSpeedTest, 10000, timeoutID, intervalID));
    }
    return -1;
}

function endClickSpeedTest(timeoutID, intervalID) {
    running = false;
    if (timeoutID != -1) {
        clearTimeout(timeoutID);
    }

    if (intervalID != -1) {
        clearInterval(intervalID);
    }

    document.getElementById('count').innerHTML = '';
    document.getElementById('time').innerHTML = '';
    document.getElementById('clicker').classList.add('hidden');
    document.getElementById('reset').classList.remove('hidden');
    var elapsed = ((start - Date.now()) / 1000);
    document.getElementById('average').innerHTML = Math.abs((count / 10)) + ' clicks per second';
}

function resetClickSpeedTest() {
    start = -1;
    count = 0;
    document.getElementById('count').innerHTML = 'Clicks: 0';
    document.getElementById('time').innerHTML = 'Elapsed: 0.0s';
    document.getElementById('clicker').classList.remove('hidden');
    document.getElementById('reset').classList.add('hidden');
    document.getElementById('average').innerHTML = '';
}

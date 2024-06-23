var startTime, lastTimestamp;
function handleFirstFrame(timestamp) {
    startTime = timestamp;
    lastTimestamp = timestamp;
    requestAnimationFrame(gameLoop);
}
function gameLoop(timestamp) {
    if (startTime === undefined) {
        handleFirstFrame(timestamp);
        return;
    }
    var delta = (timestamp - lastTimestamp) * 0.001;
    lastTimestamp = timestamp;
    console.log("Delta: ".concat(delta, "s"));
    requestAnimationFrame(gameLoop);
}
window.onload = function () {
    requestAnimationFrame(gameLoop);
};

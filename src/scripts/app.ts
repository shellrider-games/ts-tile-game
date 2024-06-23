let startTime: number, lastTimestamp: number;

function handleFirstFrame(timestamp: number) {
    startTime = timestamp;
    lastTimestamp = timestamp;
    requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp: number) {
    if (startTime === undefined){
        handleFirstFrame(timestamp);
        return;
    }
    const delta: number = (timestamp - lastTimestamp) * 0.001;
    lastTimestamp = timestamp;
    console.log(`Delta: ${delta}s`);
    requestAnimationFrame(gameLoop);
}

window.onload = () => {
    requestAnimationFrame(gameLoop);
}
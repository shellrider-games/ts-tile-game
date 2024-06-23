var startTime, lastTimestamp;
var ctx;
var display;
function loadTileSet() {
    var tileSetImg = new Image();
    tileSetImg.src = './images/city_tileset.png';
    return tileSetImg;
}
var tileDisplay = {
    extent: [15, 10],
    tileSet: loadTileSet(),
    cellSize: 64,
    tileSetTileSize: 16,
    cells: [
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
        6, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 6,
        6, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 6,
        6, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 6,
        6, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 6,
        6, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 6,
        6, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 6,
        6, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 6,
        6, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 6,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    ]
};
function setup() {
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    display = {
        width: canvas.width,
        height: canvas.height
    };
    ctx.imageSmoothingEnabled = false;
}
function clearCanvas() {
    if (ctx != undefined && display != undefined) {
        ctx.clearRect(0, 0, display.width, display.height);
    }
}
function drawMap() {
    for (var row = 0; row < tileDisplay.extent[1]; row++) {
        for (var col = 0; col < tileDisplay.extent[0]; col++) {
            var cellIdx = tileDisplay.cells[col + row * tileDisplay.extent[0]];
            console.log(cellIdx);
            var srcCols = tileDisplay.tileSet.width / tileDisplay.tileSetTileSize;
            ctx.drawImage(tileDisplay.tileSet, (tileDisplay.tileSetTileSize * cellIdx) % tileDisplay.tileSet.width, (tileDisplay.tileSetTileSize * (Math.floor(cellIdx / srcCols))), tileDisplay.tileSetTileSize, tileDisplay.tileSetTileSize, col * tileDisplay.cellSize, row * tileDisplay.cellSize, tileDisplay.cellSize, tileDisplay.cellSize);
        }
    }
}
function update(delta) {
}
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
    update(delta);
    clearCanvas();
    drawMap();
    requestAnimationFrame(gameLoop);
}
window.onload = function () {
    setup();
    requestAnimationFrame(gameLoop);
};

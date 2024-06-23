let startTime: number, lastTimestamp: number;
let ctx: CanvasRenderingContext2D;
let display;

function loadTileSet(): HTMLImageElement
{
    let tileSetImg = new Image();
    tileSetImg.src = './images/city_tileset.png';
    return tileSetImg;
}

const tileDisplay = {
    extent : [15,10],
    tileSet : loadTileSet(),
    cellSize : 64,
    tileSetTileSize : 16,
    cells : [
        6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,
        6 ,14,14,14,14,14,14,14,14,14,14,14,14,14,6 ,
        6 ,14,14,14,14,14,14,14,14,14,14,14,14,14,6 ,
        6 ,14,14,14,14,14,14,14,14,14,14,14,14,14,6 ,
        6 ,14,14,14,14,14,14,14,14,14,14,14,14,14,6 ,
        6 ,14,14,14,14,14,14,14,14,14,14,14,14,14,6 ,
        6 ,14,14,14,14,14,14,14,14,14,14,14,14,14,6 ,
        6 ,14,14,14,14,14,14,14,14,14,14,14,14,14,6 ,
        6 ,14,14,14,14,14,14,14,14,14,14,14,14,14,6 ,
        6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,6 ,
    ]
}

function setup() {
    const canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas"); 
    ctx = <CanvasRenderingContext2D> canvas.getContext("2d");
    display = {
        width: canvas.width,
        height: canvas.height
    };
    ctx.imageSmoothingEnabled = false;
}

function clearCanvas(){
    if(ctx != undefined && display != undefined){
        ctx.clearRect(0,0, display.width, display.height);
    }
}

function drawMap() {
    for(let row = 0; row < tileDisplay.extent[1]; row++){
        for(let col = 0; col < tileDisplay.extent[0]; col++){
            let cellIdx: number = tileDisplay.cells[col + row * tileDisplay.extent[0]];
            console.log(cellIdx);
            let srcCols = tileDisplay.tileSet.width / tileDisplay.tileSetTileSize;

            ctx.drawImage(
                tileDisplay.tileSet,
                (tileDisplay.tileSetTileSize * cellIdx) % tileDisplay.tileSet.width,
                (tileDisplay.tileSetTileSize * (Math.floor(cellIdx / srcCols))),
                tileDisplay.tileSetTileSize,
                tileDisplay.tileSetTileSize,
                col * tileDisplay.cellSize,
                row * tileDisplay.cellSize,
                tileDisplay.cellSize,
                tileDisplay.cellSize
            );
        }
    }
}

function update(delta :number){
}

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

    update(delta);
    clearCanvas();
    drawMap();

    requestAnimationFrame(gameLoop);
}

window.onload = () => {
    setup();
    requestAnimationFrame(gameLoop);
}
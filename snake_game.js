
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var snakeLength = 5;
var initialX = canvas.width / 2;
var initialY = canvas.height/2;
var finalX, finalY;
var unit = 10;
var dx = 10;
var dy = 10;
var pos = [];
var prevKey, currKey;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler (e) {
    prevKey = currKey;
    if(e.key == "Right" || e.key == "ArrowRight") {
        currKey = "R";
        initialX += dx;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        currKey = "L";
        initialX -= dx;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        currKey = "U";
        initialY -= dy;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        currKey = "D";
        initialY += dy;
    }
    console.log(prevKey, currKey);
}

function initPosition () {
    for (var i=0; i<snakeLength; i++){
        pos.push({x : initialX + (i*unit), y: initialY})
    }
    finalX = pos[snakeLength - 1].x;
    finalY = pos[snakeLength - 1].y;
}

function drawSnake () {
    for (var i=0; i<snakeLength; i++) {
        ctx.beginPath();
        ctx.rect(pos[i].x, pos[i].y, unit, unit);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    requestAnimationFrame(draw);
}

initPosition();
draw();
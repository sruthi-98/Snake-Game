
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var snakeLength = 5;
var initialX = canvas.width / 2;
var initialY = canvas.height/2;
var unit = 10;
var dx = 10;
var dy = 10;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler (e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        console.log("right");
        initialX += dx;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        console.log("left");
        initialX -= dx;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        console.log("top");
        initialY -= dy;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        console.log("down");
        initialY += dy;
    }
}

function drawSnake () {
    for(var i=0; i<snakeLength; i++) {
        ctx.beginPath();
        ctx.rect(initialX + (i*unit), initialY, unit, unit);
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

draw();
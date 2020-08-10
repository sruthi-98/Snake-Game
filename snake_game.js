
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
var xPos = Math.floor(Math.random() * canvas.width) - unit;
var yPos = Math.floor(Math.random() * canvas.height) - unit;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler (e) {
    prevKey = currKey;
    if(e.key == "Right" || e.key == "ArrowRight") {
        if(prevKey == "L") {
            currKey == "L";
        }
        else {
            currKey = "R";
        }
        calculateNewPosition();
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        if(prevKey == "R") {
            currKey == "R";
        }
        else {
            currKey = "L";
        }
        calculateNewPosition();
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        if(prevKey == "D") {
            currKey == "D";
        }
        else {
            currKey = "U";
        }
        calculateNewPosition();
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        if(prevKey == "U") {
            currKey == "U";
        }
        else {
            currKey = "D";
        }
        calculateNewPosition();
    }
}

function initPosition () {
    for (var i=0; i<snakeLength; i++){
        pos.push({x : initialX + (i*unit), y: initialY})
    }

    finalX = pos[snakeLength - 1].x;
    finalY = pos[snakeLength - 1].y;
}

function calculateNewPosition () { 

    var lastUnit = snakeLength - 1;

    if (currKey != null) {
        for (var i=0; i<snakeLength-1; i++) {
            pos[i].x = pos[i+1].x;
            pos[i].y = pos[i+1].y;
        }
    }

    if (currKey == "R") {
        pos[lastUnit].x += unit;
    }

    if (currKey == "L") {
        pos[lastUnit].x -= unit;
    }

    if (currKey == "U") {
        pos[lastUnit].y -= unit;
    }

    if (currKey == "D") {
        pos[lastUnit].y += unit;
    }

    initialX = pos[0].x;
    initialY = pos[0].y;
    finalX = pos[lastUnit].x;
    finalY = pos[lastUnit].y;

    // console.log(pos);
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

function collisionDetection () {
    if(finalX >= canvas.width ||  finalX + unit <= 0 || initialX + unit <= 0 || finalY + unit <= 0 || finalY >= canvas.height) {
        // console.log("COLLISION");
        // console.log(finalX, finalY, initialX, initialY);
        initialX = canvas.width / 2;
        initialY = canvas.height/2;
        for (var i=0; i<snakeLength; i++){
            pos[i].x = initialX + (i*unit);
            pos[i].y = initialY;
        }
    }
}

// function drawSnack () {
//     ctx.beginPath();
//     ctx.rect(xPos, yPos, unit, unit);
//     ctx.fillStyle = "black";
//     ctx.fill();
//     ctx.strokeStyle = "black";
//     ctx.stroke();
//     ctx.closePath();
//     //console.log(xPos, yPos);
// }

// function eatSnack () {
//     if(finalX + unit <= xPos || finalY + unit <=yPos) {
//         ctx.beginPath();
//         ctx.rect(xPos, yPos, unit, unit);
//         ctx.fillStyle = "#bab3b3";
//         ctx.fill();
//         ctx.strokeStyle = "#bab3b3";
//         ctx.stroke();
//         ctx.closePath();
//     }
// }

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionDetection();
    drawSnake();
    //drawSnack();
    //eatSnack();
    calculateNewPosition();
    //requestAnimationFrame(draw);
}

initPosition();
setInterval(draw, 150);
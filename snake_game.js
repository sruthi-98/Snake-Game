
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
        calculateNewPosition();
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        currKey = "L";
        calculateNewPosition();
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        currKey = "U";
        calculateNewPosition();
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        currKey = "D";
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

function isHorizontal () {
    var valueY = pos[0].y;
    for (var i=1; i<snakeLength; i++) {
        if(valueY != pos[i].y) {
            return false;
        }
    }
    return true;
}

function isVertical () {
    var valueX = pos[0].x;
    for (var i=1; i<snakeLength; i++) {
        if(valueX != pos[i].x) {
            return false;
        }
    }
    return true;
}

function calculateNewPosition () { 

    var lastUnit = snakeLength - 1;
    var changedPosition = false;

    if(isHorizontal()){
        if (currKey == "R") {
            for (var i=0; i<snakeLength; i++) {
                pos[i].x += unit;
                changedPosition = true;
            }
        }

        if (currKey == "L") {
            for (var i=0; i<snakeLength; i++) {
                pos[i].x -= unit;
                changedPosition = true;
            }
        }
    }

    if(isVertical()){
        if (currKey == "D") {
            for (var i=0; i<snakeLength; i++) {
                pos[i].y += unit;
                changedPosition = true;
            }
        }

        if (currKey == "U") {
            for (var i=0; i<snakeLength; i++) {
                pos[i].y -= unit;
                changedPosition = true;
            }
        }
    }

    if(!changedPosition) {
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
    }

    initialX = pos[0].x;
    initialY = pos[0].y;
    finalX = pos[lastUnit].x;
    finalY = pos[lastUnit].y;

    console.log(pos);
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
    if(finalX >= canvas.width || finalX <= 0 || finalY <= 0 || finalY >= canvas.height) {
        console.log("COLLISION");
        initialX = canvas.width / 2;
        initialY = canvas.height/2;
        for (var i=0; i<snakeLength; i++){
            pos[i].x = initialX + (i*unit);
            pos[i].y = initialY;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionDetection();
    drawSnake();
    requestAnimationFrame(draw);
}

initPosition();
draw();

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var snakeLength = 15;
var initialX = canvas.width / 2;
var initialY = canvas.height/2;
var finalX, finalY;
var unit = 10;
var dx = 10;
var dy = 10;
var pos = [];
var prevKey, currKey;
// var prevKey = "R";
// var currKey = "R";
var xPos, yPos;
var score = 0;

document.addEventListener("keydown", keyDownHandler, false);

/*
    Key Handler for snake movement
*/

function keyDownHandler (e) {
    prevKey = currKey;

    if(!e.repeat) {
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

}

/*
    Sets the initial position for snake
*/

function initPosition () {
    for (var i=0; i<snakeLength; i++){
        pos.push({x : initialX + (i*unit), y: initialY})
    }

    finalX = pos[snakeLength - 1].x;
    finalY = pos[snakeLength - 1].y;
}

/*
    Calculates new position of snake with key press
*/

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

}

/*
    Draw snake unit by unit
*/

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

/*
    Restart game function
*/

function restartGame () {
    initialX = canvas.width / 2;
    initialY = canvas.height/2;
    for (var i=0; i<snakeLength; i++){
        pos[i].x = initialX + (i*unit);
        pos[i].y = initialY;
    }
    prevKey = currKey = "R";
}

/*
    Checks if snake collides with the boundary
*/

function collisionDetection () {
    if(finalX >= canvas.width ||  finalX + unit <= 0 || finalY + unit <= 0 || finalY >= canvas.height) {
        restartGame();
    }
}

function ifSnackCollidesSnake () {
    for (var i=0; i<snakeLength; i++) {
        if(pos[i].x == xPos && pos[i].y == yPos) {
            return true;
        }
    }
    return false;
}

/*
    Calculates random position for snack
*/

function calculateRandomPosition (limit) {
    var pos = Math.floor(Math.random() * limit);
    var mod = pos % unit;
    if (mod != 0) {
        pos += (10 - mod);
    }
    return pos - unit;
}

/*
    Set position for snack
*/

function setSnackPosition () {
    do {
        xPos = calculateRandomPosition(canvas.width);
        yPos = calculateRandomPosition(canvas.height);
    } while (ifSnackCollidesSnake());
}

/*
    Draws snack for the snake
*/

function drawSnack () {
    ctx.beginPath();
    ctx.rect(xPos, yPos, unit, unit);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

/*
    Eat snack function
*/

function eatSnack () {
    if(finalX == xPos && finalY == yPos) {
        score += 1;
        ctx.clearRect(xPos, yPos, unit + 1, unit + 1);

        drawSnake();
        setSnackPosition();
        addNewUnit();
    }
}

/*
    Increases the length of snake
*/

function addNewUnit () {
    snakeLength += 1;

    if (currKey == "R") {
        pos.push({
            x : finalX + unit,
            y : finalY
        });
    }

    if (currKey == "L") {
        pos.push({
            x : finalX - unit,
            y : finalY
        });
    }

    if (currKey == "U") {
        pos.push({
            x : finalX,
            y : finalY - unit
        });
    }

    if (currKey == "D") {
        pos.push({
            x : finalX,
            y : finalY + unit
        });
    }
}

/*
    Check if snake collides with itself
*/

function selfCollisionDetection () {
    for (var i=0; i<snakeLength-1; i++) {
        if (finalX == pos[i].x && finalY == pos[i].y) {
            restartGame();
        }
    }
}

/*
    Display score
*/

function drawScore () {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 20);
}

/*
    Main function
*/

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionDetection();
    drawSnake();
    selfCollisionDetection();
    drawSnack();
    eatSnack();
    drawScore();
    calculateNewPosition();
}

initPosition();
setSnackPosition();
setInterval(draw, 150);
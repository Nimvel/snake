// const canvas = document.createElement('canvas');
// const ctx = canvas.getContext('2d');
// document.body.appendChild(canvas);

const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "images/background.jpg";

canvas.width = background.width;
canvas.height = background.height;

const apple = new Image();
apple.src = "images/apple.png"

const fireworks = new Image();
fireworks.src = "images/fireworks.png"

let foodSize = 25;
let food = {
    x: Math.floor(Math.random() * (canvas.width - 100)) + 50,
    y: 0
    // y: Math.floor(Math.random() * (canvas.height - 100)) + 50
};

let dangerSize = 35;
let danger = {
    x: Math.floor(Math.random() * (canvas.width - 100)) + 50,
    y: canvas.height
};

let snakePartR = 10;
let snake = [];
snake[0] = {
    x: canvas.width / 2,
    y: canvas.height / 2
};
let snakeX = snake[0].x;
let snakeY = snake[0].y;

let score = 0;
let lives = 3;

let speed = 3;
let speedFoodAndDanger = 1;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let isMoving = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = true;
    }
    else if (e.keyCode == 38 || e.keyCode == 87) {
        upPressed = true;
    }
    else if (e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = true;
    }
    else if (e.keyCode == 40 || e.keyCode == 83) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    isMoving = false;
    if (e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = false;
        isMoving = false;
    }
    else if (e.keyCode == 38 || e.keyCode == 87) {
        upPressed = false;
        isMoving = false;
    }
    else if (e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = false;
        isMoving = false;
    }
    else if (e.keyCode == 40 || e.keyCode == 83) {
        downPressed = false;
        isMoving = false;
    }
}

function traffic() {
    if (rightPressed) {
        snakeX += speed;
        if (snakeX + snakePartR > canvas.width) {
            snakeX = canvas.width - snakePartR;
        }
    }
    else if (leftPressed) {
        snakeX -= speed;
        if (snakeX < 0) {
            snakeX = 0;
        }
    }
    else if (upPressed) {
        snakeY -= speed;
        if (snakeY < 0) {
            snakeY = 0;
        }
    }
    else if (downPressed) {
        snakeY += speed;
        if (snakeY + snakePartR > canvas.height) {
            snakeY = canvas.height - snakePartR;
        }
    }
    food.y += speedFoodAndDanger;
    danger.y -= speedFoodAndDanger;

    if (food.y + speedFoodAndDanger > canvas.height) {
        food = {
            x: Math.floor(Math.random() * (canvas.width - 100) + 50),
            y: 0
        };
    }

    if (danger.y - speedFoodAndDanger < 0) {
        danger = {
            x: Math.floor(Math.random() * (canvas.width - 100) + 50),
            y: canvas.height
        };
    }
}

// function mouseMoveHandler(e) {
//     let relativeX = e.clientX - canvas.offsetLeft; //e.clientX - горизонтальное положение мыши в окне просмотра, canvas.offsetLeft - расстояние между левым краем холста и левым краем окна просмотра
//     let relativeY = e.clientY - canvas.offsetTop; 
//     if (relativeX > 0 && relativeX < canvas.width) {
//         snakeX = relativeX - snakePartR / 2;
//     }
//     if (relativeY > 0 && relativeY < canvas.height) {
//         snakeY = relativeY - snakePartR / 2;
//     }
// }

// function foodDrop() {
//     ctx.drawImage(apple, food.x, food.y, foodSize, foodSize);
//     // if (food.y + fy < canvas.height) {
//     //     fy += fy;
//     // }
// }

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawSnake(i) {
    ctx.beginPath();
    ctx.arc(snake[i].x, snake[i].y, snakePartR, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
};

function collision(head, arr) {
    let tail = arr.slice(3);

    if (snakeX >= food.x && snakeX <= food.x + foodSize
        && snakeY >= food.y && snakeY <= food.y + foodSize
        || snakeX + snakePartR >= food.x && snakeX + snakePartR <= food.x + foodSize
        && snakeY + snakePartR >= food.y && snakeY + snakePartR <= food.y + foodSize) {
        score++;
        if (score === 5) {
            speed++;
            speedFoodAndDanger++;
        }
        food = {
            x: Math.floor(Math.random() * (canvas.width - 100) + 50),
            y: 0
        };
    }
    else {
        snake.shift();
    }

    if (snakeX >= danger.x && snakeX <= danger.x + foodSize
        && snakeY >= danger.y && snakeY <= danger.y + foodSize
        || snakeX + snakePartR >= danger.x && snakeX + snakePartR <= danger.x + foodSize
        && snakeY + snakePartR >= danger.y && snakeY + snakePartR <= danger.y + foodSize) {
        lives--;
        if (!lives) {
            alert("GAME OVER");
            document.location.reload();
        }
        danger = {
            x: Math.floor(Math.random() * (canvas.width - 100) + 50),
            y: 0
        };
    }

    for (let i = 0; i < tail.length; i++) {
        let scoreLoss = arr.splice(i, tail.length - 1).length;
        // let scoreLoss = arr.splice(i, tail.length - 1).length;
        //  if (head.x === tail[i].x && head.y === tail[i].y) {
        // tailLoss(i, arr);
        // }
        if (tail[i].x >= danger.x && tail[i].x <= danger.x + foodSize
            && tail[i].y >= danger.y && tail[i].y <= danger.y + foodSize
            || tail[i].x + snakePartR >= danger.x && tail[i].x + snakePartR <= danger.x + foodSize
            && tail[i].y + snakePartR >= danger.y && tail[i].y + snakePartR <= danger.y + foodSize) {
                arr.splice(3, tail.length - 1);
                score -= scoreLoss;
            // arr.splice(3, tail.length - 1);
            // score -= scoreLoss;

            danger = {
                x: Math.floor(Math.random() * (canvas.width - 100) + 50),
                y: 0
            }
        }
    }
};

function update() {
    let newsnakeHeadC = {
        x: snakeX,
        y: snakeY
    };
    snake.push(newsnakeHeadC);

    traffic();
    collision(newsnakeHeadC, snake);
};

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(apple, food.x, food.y, foodSize, foodSize);
    ctx.drawImage(fireworks, danger.x, danger.y, dangerSize, dangerSize);

    drawScore();
    drawLives();
    for (let i = 0; i < snake.length; i++) {
        drawSnake(i);
    }
};

function drawGame() {
    update();
    render();
    requestAnimationFrame(drawGame);
}

// let interval = setInterval(drawGame, 100)
drawGame();
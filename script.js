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

let appleHeight = 25;
let appleWidth = 25;
let food = {
    x: Math.floor(Math.random() * (canvas.width - 100)) + 50,
    y: 0
    // y: Math.floor(Math.random() * (canvas.height - 100)) + 50
};

// let dangerSize = 35;
let dangerHeight = 45;
let dangerWidth = 15;
let danger = {
    x: Math.floor(Math.random() * (canvas.width - 100)) + 50,
    y: canvas.height
};

let snake = [];
snake[0] = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 15
};
let snakeX = snake[0].x;
let snakeY = snake[0].y;
let snakeR = snake[0].r;

let startOfTail = 5;
let tail = [];

let score = 0;
let lives = 3;

let direction = "stop";
let speed = 6;
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
        upPressed = false;
        rightPressed = false;
        downPressed = false;
    }
    else if (e.keyCode == 38 || e.keyCode == 87) {
        leftPressed = false;
        upPressed = true;
        rightPressed = false;
        downPressed = false;
    }
    else if (e.keyCode == 39 || e.keyCode == 68) {
        leftPressed = false;
        upPressed = false;
        rightPressed = true;
        downPressed = false;
    }
    else if (e.keyCode == 40 || e.keyCode == 83) {
        leftPressed = false;
        upPressed = false;
        rightPressed = false;
        downPressed = true;
    }
}

function keyUpHandler(e) {
    // if (e.keyCode == 37 || e.keyCode == 65) {
    //     leftPressed = false;
    //     isMoving = false;
    // }
    // else if (e.keyCode == 38 || e.keyCode == 87) {
    //     upPressed = false;
    //     isMoving = false;
    // }
    // else if (e.keyCode == 39 || e.keyCode == 68) {
    //     rightPressed = false;
    //     isMoving = false;
    // }
    // else if (e.keyCode == 40 || e.keyCode == 83) {
    //     downPressed = false;
    //     isMoving = false;
    // }
}

function traffic() {

    upPressed ? direction = "up" : downPressed ? direction = "down" : rightPressed ? direction = "right" : leftPressed ? direction = "left" : direction = "stop";

    switch (direction) {
        case "right":
            snakeX += speed;
            snakeY += Math.sin(snakeX);
            if (snakeX > canvas.width) {
                snakeX = 0;
            }
            break;

        case "left":
            snakeX -= speed;
            snakeY += Math.sin(snakeX);
            if (snakeX < 0) {
                snakeX = canvas.width;
            }
            break;

        case "up":
            snakeY -= speed;
            snakeX += Math.sin(snakeY);
            if (snakeY < 0) {
                snakeY = canvas.height;
            }
            break;

        case "down":
            snakeY += speed;
            snakeX += Math.sin(snakeY);
            if (snakeY > canvas.height) {
                snakeY = 0;
            }
            break;
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
//         snakeX = relativeX - snakeR / 2;
//     }
//     if (relativeY > 0 && relativeY < canvas.height) {
//         snakeY = relativeY - snakeR / 2;
//     }
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

function initSnake() {
    for (i = 0; i < 5; i++) {
        snake.push()
    }
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        // if (i >= snake.length - 6 && i < snake.length) {
        //     // if (i > snake.length - 6 && i < snake.length) {
        //     ctx.beginPath();
        //     ctx.arc(snake[i].x, snake[i].y, snake[i].r, 0, Math.PI * 2, false)
        //     ctx.fillStyle = "white";
        //     ctx.srtokeStyle = "black";
        //     ctx.fill();
        //     ctx.stroke();
        //     ctx.closePath();
                
        // }
        // else {
            ctx.beginPath();
                ctx.arc(snake[i].x, snake[i].y, snake[i].r, 0, Math.PI * 2, false)
                ctx.fillStyle = "white";
                ctx.srtokeStyle = "black";
                ctx.fill();
                // ctx.stroke();
                ctx.closePath();
        // }
    }
};

function collision(head, arr) {

    let tail = arr.slice(startOfTail);

    if (snakeX >= food.x && snakeX <= food.x + appleWidth
        && snakeY >= food.y && snakeY <= food.y + appleHeight
        || snakeX + snakeR >= food.x && snakeX + snakeR <= food.x + appleWidth
        && snakeY + snakeR >= food.y && snakeY + snakeR <= food.y + appleHeight) {
        score++;
        snakeR += 5;
        if (score / 5 === 0) {
            speed++;
            speedFoodAndDanger++;
        }
        food = {
            x: Math.floor(Math.random() * (canvas.width - 100) + 50),
            y: 0
        };
    }
    else {
        snakeR = 15;
        snake.pop();
    }

    if (snakeX >= danger.x && snakeX <= danger.x + dangerWidth
        && snakeY >= danger.y && snakeY <= danger.y + dangerHeight
        || snakeX + snakeR >= danger.x && snakeX + snakeR <= danger.x + dangerWidth
        && snakeY + snakeR >= danger.y && snakeY + snakeR <= danger.y + dangerHeight) {
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
        // if (head.x === tail[i].x && head.y === tail[i].y) {
        //     arr.splice(arr[i + startOfTail], arr.length - 1)
        // }
        if (tail[i].x >= danger.x && tail[i].x <= danger.x + dangerWidth
            && tail[i].y >= danger.y && tail[i].y <= danger.y + dangerHeight
            || tail[i].x + snakeR >= danger.x && tail[i].x + snakeR <= danger.x + dangerWidth
            && tail[i].y + snakeR >= danger.y && tail[i].y + snakeR <= danger.y + dangerHeight) {
            arr.splice(arr[i], arr.length - 1);
            score -= arr.splice(arr[i], arr.length - 1).length;
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
        y: snakeY,
        r: snakeR
    };
    snake.unshift(newsnakeHeadC);

    traffic();

    collision(newsnakeHeadC, snake);
};

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(apple, food.x, food.y, appleWidth, appleHeight);
    ctx.drawImage(fireworks, danger.x, danger.y, dangerWidth, dangerHeight);

    drawScore();
    drawLives();
    drawSnake();
};

function drawGame() {
    update();
    render();
    requestAnimationFrame(drawGame);
}

drawGame();
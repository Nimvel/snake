const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "images/ground.jpg";

const apple = new Image();
apple.src = "images/apple.png"

let foodSize = 25;
let food = {
    x: Math.floor(Math.random() * 750 + 50),
    y: Math.floor(Math.random() * 550 + 50)
};

let score = 0;
let lives = 3;

let snakeHead = 15;
let snake = [];
snake[0] = {
    x: (canvas.width - snakeHead) / 2,
    y: (canvas.height - snakeHead) / 2
};
let snakeX = snake[0].x;
let snakeY = snake[0].y;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    // switch (e.key) {
    //     case 'ArrowUp':
    //         upPressed = true;
    //         break;
    //     case 'ArrowDown':
    //         downPressed = true;
    //         break;
    //     case 'ArrowLeft':
    //         leftPressed = true;
    //         break;
    //     case 'ArrowRight':
    //         rightPressed = true;
    // }
    console.log(e.keyCode);

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
    if (e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = false;
    }
    else if (e.keyCode == 38 || e.keyCode == 87) {
        upPressed = false;
    }
    else if (e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = false;
    }
    else if (e.keyCode == 40 || e.keyCode == 83) {
        downPressed = false;
    }
    // switch (e.key) {
    //     case 'ArrowUp':
    //         upPressed = false;
    //         break;
    //     case 'ArrowDown':
    //         downPressed = false;
    //         break;
    //     case 'ArrowLeft':
    //         leftPressed = false;
    //         break;
    //     case 'ArrowRight':
    //         rightPressed = false;
    // }
}

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
        ctx.rect(snake[i].x, snake[i].y, snakeHead, snakeHead);
        ctx.fillStyle = i % 2 ? "black" : "white";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 1)";
        ctx.stroke();
    ctx.closePath();
}

// function eatTail(head, arr) {
// 	for(let i = 0; i < arr.length; i++) {
// 		if(head.x == arr[i].x && head.y == arr[i].y)
//             alert("game over");
//             document.location.reload();

// 			clearInterval(draw);

// 	}
// }

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(apple, food.x, food.y, foodSize, foodSize);
    drawScore();
    drawLives();

    for (let i = 0; i < snake.length; i++) {
        drawSnake(i);
    }
    
    // let snakeX = snake[0].x;
    // let snakeY = snake[0].y;

    if (snakeX >= food.x && snakeX <= food.x + foodSize 
        && snakeY >= food.y && snakeY <= food.y + foodSize 
        || snakeX + snakeHead >= food.x && snakeX + snakeHead <= food.x + foodSize 
        && snakeY + snakeHead >= food.y && snakeY + snakeHead <= food.y + foodSize) {
        score++;
        food = {
            x: Math.floor(Math.random() * 750 + 50),
            y: Math.floor(Math.random() * 550 + 50)
        };
    }
    else {
        snake.pop();
    }

    if (rightPressed) {
        snakeX += 5;
        if (snakeX + snakeHead > canvas.width) {
            snakeX = canvas.width - snakeHead;
        }
    }
    else if (leftPressed) {
        snakeX -= 5;
        if (snakeX < 0) {
            snakeX = 0;
        }
    }
    else if (upPressed) {
        snakeY -= 5;
        if (snakeY < 0) {
            snakeY = 0;
        }
    }
    else if (downPressed) {
        snakeY += 5;
        if (snakeY + snakeHead > canvas.height) {
            snakeY = canvas.height - snakeHead;
        }
    }

    let newSnakeHead = {
        x: snakeX,
        y: snakeY
    };

    // eatTail(newSnakeHead, snake);

    snake.unshift(newSnakeHead);
    requestAnimationFrame(draw);
}

// let interval = setInterval(draw, 100);

draw();

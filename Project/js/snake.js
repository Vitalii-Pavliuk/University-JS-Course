const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");
const startGameBtn = document.getElementById("startGameBtn");

const scale = window.devicePixelRatio || 1;
const isMobile = window.innerWidth < 768;
const blockSize = isMobile ? 20 : 10;

let gameActive = false;

canvas.width = Math.min(600, Math.floor(window.innerWidth / blockSize) * blockSize) * scale;
canvas.height = Math.min(400, Math.floor(window.innerHeight / blockSize) * blockSize) * scale;
canvas.style.width = `${canvas.width / scale}px`;
canvas.style.height = `${canvas.height / scale}px`;
ctx.scale(scale, scale);

const width = canvas.width / scale;
const height = canvas.height / scale;
const widthInBlocks = width / blockSize;
const heightInBlocks = height / blockSize;

const colors = ["green", "lightblue", "limegreen"];
let score, speed, intervalId, highScore, snake, apple;

document.addEventListener('DOMContentLoaded', () => {
    initializeCanvas();
    
    setupEventListeners();
    
    highScore = parseInt(localStorage.getItem("snakeHighScore")) || 0;
    
    startGameBtn.style.display = "inline-block";
    restartBtn.style.display = "none";
});

function initializeCanvas() {
    ctx.clearRect(0, 0, width, height);
    drawBorder();
    
    ctx.font = "30px Pixelify Sans";
    ctx.fillStyle = "#4caf50";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SNAKE GAME", width / 2, height / 2 - 40);
    
    ctx.font = "16px Roboto";
    ctx.fillStyle = "black";
    ctx.fillText("Натисніть 'Почати гру' щоб грати", width / 2, height / 2 + 10);
}

function setupEventListeners() {
    startGameBtn.addEventListener("click", startGame);
    
    restartBtn.addEventListener("click", startGame);
    
    document.addEventListener("keydown", (e) => {
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
        
        if (gameActive) {
            const newDirection = directions[e.keyCode];
            if (newDirection) {
                snake.setDirection(newDirection);
            }
        }
    });
    
    let touchStartX = 0;
    let touchStartY = 0;
    
    canvas.addEventListener("touchstart", e => {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        e.preventDefault();
    }, { passive: false });
    
    canvas.addEventListener("touchend", e => {
        if (!gameActive) return;
        
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;
    
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) snake.setDirection("right");
            else snake.setDirection("left");
        } else {
            if (dy > 0) snake.setDirection("down");
            else snake.setDirection("up");
        }
        
        e.preventDefault();
    }, { passive: false });
}

const drawBorder = () => {
    ctx.fillStyle = "Grey";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};

const drawScore = () => {
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, blockSize, blockSize);
    ctx.fillText("Record: " + highScore, blockSize, blockSize + 22);
};

const gameOver = () => {
    gameActive = false;
    clearInterval(intervalId);
    ctx.font = "60px Courier";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", width / 2, height / 2);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("snakeHighScore", highScore);
        
        if (window.updateScore) {
            window.updateScore(score);
        }
    }

    restartBtn.style.display = "inline-block";
    startGameBtn.style.display = "none";
};

const circle = (x, y, radius, fillCircle, color) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    fillCircle ? ctx.fill() : ctx.stroke();
};

function Block(col, row) {
    this.col = col;
    this.row = row;
}

Block.prototype.drawSquare = function (color) {
    const x = this.col * blockSize;
    const y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
};

Block.prototype.drawCircle = function (color) {
    const centerX = this.col * blockSize + blockSize / 2;
    const centerY = this.row * blockSize + blockSize / 2;
    circle(centerX, centerY, blockSize / 2, true, color);
};

Block.prototype.equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
};

function Snake() {
    this.segments = [
        new Block(7, 5),
        new Block(6, 5),
        new Block(5, 5)
    ];
    this.direction = "right";
    this.nextDirection = "right";
}

Snake.prototype.draw = function () {
    for (let i = 0; i < this.segments.length; i++) {
        const colorIndex = i % colors.length;
        this.segments[i].drawSquare(colors[colorIndex]);
    }
};

Snake.prototype.move = function () {
    const head = this.segments[0];
    let newHead;

    this.direction = this.nextDirection;

    if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
    }

    if (this.checkCollision(newHead)) {
        gameOver();
        return;
    }

    this.segments.unshift(newHead);

    if (newHead.equal(apple.position)) {
        score++;
        
        if (window.updateScore) {
            window.updateScore(score);
        }
        apple.move();
        speed = Math.max(speed - 5, 50);
        clearInterval(intervalId);
        intervalId = setInterval(gameLoop, speed);
    } else {
        this.segments.pop();
    }
};

Snake.prototype.checkCollision = function (head) {
    const wallCollision = head.col === 0 || head.row === 0 ||
        head.col === widthInBlocks - 1 || head.row === heightInBlocks - 1;

    const selfCollision = this.segments.some(segment => head.equal(segment));
    return wallCollision || selfCollision;
};

Snake.prototype.setDirection = function (newDirection) {
    const oppositeDirections = {
        up: "down",
        down: "up",
        left: "right",
        right: "left"
    };
    if (oppositeDirections[this.direction] !== newDirection) {
        this.nextDirection = newDirection;
    }
};

function Apple() {
    this.position = new Block(10, 10);
}

Apple.prototype.draw = function () {
    this.position.drawCircle("LimeGreen");
};

Apple.prototype.move = function () {
    const randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
    const randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.position = new Block(randomCol, randomRow);
};

const gameLoop = () => {
    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
};

const startGame = () => {
    gameActive = true;
    
    score = 0;
    speed = 100;
    
    if (window.updateScore) {
        window.updateScore(0);
    }
    
    snake = new Snake();
    apple = new Apple();
    
    startGameBtn.style.display = "none";
    restartBtn.style.display = "none";
    
    clearInterval(intervalId);
    intervalId = setInterval(gameLoop, speed);
};

const directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};
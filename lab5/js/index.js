const startBtn = document.querySelector(".startButton")
const restartBtn = document.querySelector(".restartButton")
const difficultySelect = document.getElementById("difficulty")
const colorSelect = document.getElementById("color")
const gameContainer = document.querySelector(".game-container")
const menuContainer = document.querySelector(".menu-container")
const gameMap = document.querySelector(".game-map")
const gameOverScreen = document.querySelector(".game-over")
const scoreDisplay = document.getElementById("score")
const timeDisplay = document.getElementById("time")
const finalScoreDisplay = document.getElementById("final-score")

let score = 0
let timeLeft = 5
let pixel = null
let gameTimer = null
let pixelTimer = null

let getRandomNumber = function (size) {
  return Math.floor(Math.random() * size)
}

function start() {
  menuContainer.style.display = "none"
  gameContainer.style.display = "contents"

  const width = gameMap.clientWidth - 20
  const height = gameMap.clientHeight - 20


  pixel = document.createElement("div")
  pixel.style.backgroundColor = "orange"
  pixel.style.left = `${getRandomNumber(width)}px`
  pixel.style.top = `${getRandomNumber(height)}px`
  pixel.style.width = "20px"
  pixel.style.height = "20px"
  pixel.style.position = "absolute"
  gameMap.appendChild(pixel)

  pixel.addEventListener("click", function () {
    pixel.style.left = `${getRandomNumber(width)}px`
    pixel.style.top = `${getRandomNumber(height)}px`

    score += 1
    pixelTimer()
    scoreDisplay.textContent = score

    console.log("клік по пікселю")
  })

  function pixelTimer () {
  gameTimer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(gameTimer);
        console.log("Гра закінчена");
    }
}, timeLeft * 1000);
} 
}

startBtn.addEventListener("click", function () {
  start()
})

const gameBoard = document.querySelector(".gameBoard")
const scoreDisplay = document.querySelector(".scoreDisplay")
const highScoreDisplay = document.querySelector(".highScoreDisplay")
const logo = document.querySelector(".logo")
const msgDisplay  = document.querySelector(".msgDisplay")

const generateFood = () => {
	return {
		x: Math.floor(Math.random() * 30) +1,
	 	y: Math.floor(Math.random() * 30) +1,
 	}
}

const clearGameBoard = () => {
	gameBoard.innerHTML = ""
}

const drawFood = () => {
	const foodElement = document.createElement("div")
	foodElement.className = "food"
	foodElement.style.gridColumn = food.x
	foodElement.style.gridRow = food.y
	gameBoard.appendChild(foodElement)
}

const drawSnake = () => {
	snake.forEach((segment) => {
		const snakeElement = document.createElement("div")
		snakeElement.className = "snake"
		snakeElement.style.gridColumn = segment.x
		snakeElement.style.gridRow = segment.y
		gameBoard.appendChild(snakeElement)
	})
}

const draw = () => {
	clearGameBoard()
	drawFood()
	drawSnake()
}

const updateHighScore = () => {
	if (score > highScore) {
		highScore = score
		highScoreDisplay.textContent = "HIGH SCORE: " + highScore.toString().padStart(3, '0')
		msgDisplay.textContent = "NEW HIGH SCORE! PRESS SPACE TO PLAY AGAIN!"
	} else {
		msgDisplay.textContent = "GAME OVER! PRESS SPACE TO PLAY AGAIN!"
	}
}

const checkCollision = () => {
	const head = snake[0]

	if (head.x < 1 || head.x > 30 || head.y > 30 || head.y < 1) {
		clearInterval(gameInterval)
		clearGameBoard()
		gameBoard.classList.remove("gameBoard-game")
		gameBoard.classList.add("gameBoard-logo")
		logo.style.display="block"
		updateHighScore()
		gameStarted = false
	}

	for (let i = 1; i < snake.length; i++) {
		const segment = snake[i]
		if (head.x === segment.x && head.y === segment.y) {
			clearInterval(gameInterval)
			clearGameBoard()
			gameBoard.classList.remove("gameBoard-game")
			gameBoard.classList.add("gameBoard-logo")
			logo.style.display="block"
			updateHighScore()
			gameStarted = false
		}
	}
}

let direction = "down"
let food = generateFood()
let snake = [
	{x: 15, y: 15},
]

let score = 0
let highScore = 0

let gameStarted = false
let gameSpeedDelay = 200
let gameInterval

const move = () => {
	const head = {
		x: snake[0].x,
		y: snake[0].y,
	}

	if (direction === "up") {
		head.y--
	} else if (direction === "down") {
		head.y++
	} else if (direction === "left") {
		head.x--
	} else if (direction === "right") {
		head.x++
	}

	snake.unshift(head)

	if (head.x === food.x && head.y === food.y) {
		score++
		scoreDisplay.textContent = "SCORE: " + score.toString().padStart(3, '0')

		food = generateFood()

		if (gameSpeedDelay > 150) {
			gameSpeedDelay -= 10
		} else if (gameSpeedDelay > 100) {
			gameSpeedDelay -= 5
		} else if (gameSpeedDelay > 50) {
			gameSpeedDelay -=3
		} 

		clearInterval(gameInterval)
		gameInterval = setInterval(() => {
		move()
		draw()
		checkCollision()
	}, 	gameSpeedDelay)



	} else {
		snake.pop()
	}
}

const startGame = () => {
	gameInterval = setInterval(() => {
		move()
		draw()
		checkCollision()
	}, 	gameSpeedDelay)
}


document.addEventListener("keydown", (event) => {
	if (gameStarted === false && event.key === " ") {
		direction = "down"
		score = 0
		snake = [{x: 15, y: 15},]
		food = generateFood()
		gameSpeedDelay = 200
		gameStarted = true
		gameBoard.classList.remove("gameBoard-logo")
		gameBoard.classList.add("gameBoard-game")
		logo.style.display="none"
		startGame()
		msgDisplay.textContent = ""
	}

	if (event.key === "ArrowUp") {
		direction = "up"
	} else if (event.key === "ArrowDown") {
		direction = "down"
	} else if (event.key === "ArrowLeft") {
		direction = "left"
	} else if (event.key === "ArrowRight") {
		direction = "right"
	}
})



















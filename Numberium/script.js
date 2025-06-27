const board = document.querySelector(".board")
const resetBtn = document.querySelector(".resetBtn")
const currLevelDisplay = document.querySelector(".currLevelDisplay")
const numLevelsDisplay = document.querySelector(".numLevelsDisplay")
const winDisplay = document.querySelector(".winDisplay")
const timeDisplay = document.querySelector(".timeDisplay")


const s1 = new Audio('s1.mp3') //win
const s2 = new Audio('s2.mp3') // move
const s3 = new Audio('s3.wav') // weird move
// const lowBoingSound = new Audio('lowBoing.wav') // block move

let currLevel = 1
currLevelDisplay.textContent = currLevel
let numLevels = levels.length - 1
numLevelsDisplay.textContent = numLevels


let numRows
let numCols
let startRow
let startCol
let endRow
let endCol
let startVal
let endVal
let currRow
let currCol
let currVal
let prevCol
let prevRow
let gameOver
let time
let timer

let grid
let operations
let values

const updateTime = () => {
	time += 0.01
	timeDisplay.textContent = time.toFixed(2)
}

const startTimer = () => {
	time = 0
	timer = setInterval(updateTime, 10)
}

const stopTimer = () => {
	clearInterval(timer)
}

const updateCells = () => {
		// change the prev cell to be light blue #81CFE0 and text to be gray #666666
		document.querySelector(`div[data-rc="${prevRow}${prevCol}"]`).style.backgroundColor = "#81CFE0"
		document.querySelector(`div[data-rc="${prevRow}${prevCol}"]`).style.color = "#666666"

		// change the curr cell be green #00B16A if you won or orange #F06A23 otherwise
		const color = gameOver === true ? "#00B16A" : "#F06A23"
		document.querySelector(`div[data-rc="${currRow}${currCol}"]`).style.backgroundColor = color
		document.querySelector(`div[data-rc="${currRow}${currCol}"]`).textContent = currVal
}

const updateCurrVal = () => {
	//update the currVal using the operation value
	if (operations[currRow][currCol] === "+") {
			currVal += values[currRow][currCol]
		} else if (operations[currRow][currCol] === "-") {
			currVal -= values[currRow][currCol]
		} else if (operations[currRow][currCol] === "x") {
			currVal *= values[currRow][currCol]
		} else if (operations[currRow][currCol] === "/") {
			currVal = Math.floor(currVal / values[currRow][currCol])
		} else if (operations[currRow][currCol] === "%") {
			currVal %= values[currRow][currCol]
		} else if (operations[currRow][currCol] === "^") {
			currVal **= values[currRow][currCol]
		}

		grid[currRow][currCol] = currVal

		// check if the player finish the level
		if (currRow === endRow && currCol === endCol) {
			gameOver = true
			resetBtn.disabled = true
			if (currLevel !== numLevels) {
				setTimeout(() => {
					currLevel++
					currLevelDisplay.textContent = currLevel
					resetGame()
				}, 500)
			} else {
					winDisplay.style.display = "block"
					stopTimer()
				}
		}
		updateCells()
}

const moveUp = () => {
		if (currRow == 0) return
		if (grid[currRow - 1][currCol] !== null) return
		if (currRow === endRow + 1 && currCol === endCol && currVal !== endVal - 1) return

		prevRow = currRow
		prevCol = currCol
		currRow--
		updateCurrVal()
}

const moveDown = () => {
		if (currRow === numRows - 1) return
		if (grid[currRow + 1][currCol] !== null) return
		if (currRow === endRow - 1 && currCol === endCol && currVal !== endVal - 1) return

		prevRow = currRow
		prevCol = currCol
		currRow++
		updateCurrVal()
}

const moveLeft = () => {
		if (currCol === 0) return
		if (grid[currRow][currCol - 1] !== null) return
		if (currRow === endRow && currCol === endCol + 1 && currVal !== endVal - 1) return

		prevRow = currRow
		prevCol = currCol
		currCol--
		updateCurrVal()
}

const moveRight = () => {
		if (currCol === numCols -1) return
		if (grid[currRow][currCol + 1] !== null) return
		if (currRow === endRow && currCol === endCol - 1 && currVal !== endVal - 1) return

		prevRow = currRow
		prevCol = currCol
		currCol++
		updateCurrVal()
}

const resetGame = () => {
	board.textContent = ""
	numRows = levels[currLevel].numRows
	numCols = levels[currLevel].numCols
	board.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`
	startRow = levels[currLevel].startRow
	startCol = levels[currLevel].startCol
	endRow = levels[currLevel].endRow
	endCol = levels[currLevel].endCol
	startVal = levels[currLevel].startVal
	endVal = levels[currLevel].endVal
	currRow = startRow
	currCol = startCol
	currVal = startVal
	gameOver = false
	resetBtn.disabled = false

	grid = []
	for (let r = 0; r < numRows; r++) {
			const row = []
			for (let c = 0; c < numCols; c++) {
				row.push(null)
			}
			grid.push(row)
	}

	operations = []
	for (let r = 0; r < numRows; r++) {
			const row = []
			for (let c = 0; c < numCols; c++) {
				row.push("+")
			}
			operations.push(row)
	}
	values = []
	for (let r = 0; r < numRows; r++) {
			const row = []
			for (let c = 0; c < numCols; c++) {
				row.push(1)
			}
			values.push(row)
	}

	levels[currLevel].operations.forEach((ob) => {
		const row = ob.row
		const col = ob.col
		const op = ob.op
		const val = ob.val

		operations[row][col] = op
		values[row][col] = val
	})

	for (let r = 0; r < numRows; r++) {
		for (let c = 0; c < numCols; c++) {
			const cell = document.createElement("div")
			cell.classList.add("cell")
			cell.setAttribute("data-rc", r + "" + c)

			if (r === startRow && c === startCol) {
				cell.style.backgroundColor = "#F06A23"
				cell.textContent = startVal
				grid[r][c] = startVal
			}

			if (r === endRow && c === endCol) {
				cell.style.backgroundColor = "#136C7E"
				cell.textContent = endVal
			}

			if (values[r][c] !== 1 || operations[r][c] !== "+") {
				cell.textContent = operations[r][c] + values[r][c]
			}

			board.appendChild(cell)
		}
	}
}

document.addEventListener("keydown", (event) => {
	if (gameOver === true) return

	const key = event.key

	if (key === "ArrowUp") moveUp()
	if (key === "ArrowDown") moveDown()
	if (key === "ArrowLeft") moveLeft()
	if (key === "ArrowRight") moveRight()
})

resetBtn.addEventListener("click", () => {
	resetGame()
})

resetGame()
startTimer()












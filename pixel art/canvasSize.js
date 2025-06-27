addRowBottomBtn.addEventListener("click", () => {
	const row = []
	for(let c = 0; c < numCols; c++) {
		row.push("")
	}
	undoActions.push(deepCopy(pixelGrid))
	pixelGrid.push(row)
	redoActions = []
	numRows++
	resetCanvas()
})

addRowTopBtn.addEventListener("click", () => {
	const row = []
	for(let c = 0; c < numCols; c++) {
		row.push("")
	}
	undoActions.push(deepCopy(pixelGrid))
	pixelGrid.unshift(row)
	redoActions = []
	numRows++
	resetCanvas()
})

addColumnLeftBtn.addEventListener("click", () => {
	undoActions.push(deepCopy(pixelGrid))
	for(let r = 0; r < numRows; r++) {
		pixelGrid[r].unshift("")
	}
	redoActions = []
	numCols++
	resetCanvas()
})

addColumnRightBtn.addEventListener("click", () => {
	undoActions.push(deepCopy(pixelGrid))
	for(let r = 0; r < numRows; r++) {
		pixelGrid[r].push("")
	}
	redoActions = []
	numCols++
	resetCanvas()
})

delRowBottomBtn.addEventListener("click", () => {
	if (numRows < 1) return
	undoActions.push(deepCopy(pixelGrid))
	pixelGrid.pop()
	redoActions = []
	numRows--
	resetCanvas()
})

delRowTopBtn.addEventListener("click", () => {
	if (numRows < 1) return
	undoActions.push(deepCopy(pixelGrid))
	pixelGrid.shift()
	redoActions = []
	numRows--
	resetCanvas()
})

delColumnLeftBtn.addEventListener("click", () => {
	if (numCols < 1) return
	undoActions.push(deepCopy(pixelGrid))
	for(let r = 0; r < numRows; r++) {
		pixelGrid[r].shift()
	}
	redoActions = []
	numCols--
	resetCanvas()
})

delColumnRightBtn.addEventListener("click", () => {
	if (numCols < 1) return
	undoActions.push(deepCopy(pixelGrid))
	for(let r = 0; r < numRows; r++) {
		pixelGrid[r].pop()
	}
	redoActions = []
	numCols--
	resetCanvas()
})

eyeDropperBtn.addEventListener("click", () => {
	eyeDropperMode = true
})
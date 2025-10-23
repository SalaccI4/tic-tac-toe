function Gameboard(){

    let board = []
    const row = 3
    const col = 3

    for (i = 0; i < row; i++){
        board[i] = []
        for (j = 0; j < col; j++) {
            board[i].push(Cell())
        }
    }

    const getRow = () => row
    const getCol = () => col

    const getBoard = () => board

    const getBoardValueMap = () => {
        const tiled = board.map(
            (cellRow) => cellRow.map(
                (cell) => (cell.getValue())
            )
        )
        return tiled
    }

    const changeTileValue = (cellRow, cellCol, tile) => {
        board[cellRow][cellCol].changeValue(tile)
    }

    const printValueMap = () => {
        console.log(getBoardValueMap())
    }

    const resetBoardValue = () => {
        for (i = 0; i < row; i++) {
            for (j = 0; j < col; j++) {
                changeTileValue(i, j, 0)
            }
        }
    }

    return{
        getRow,
        getCol,
        getBoard,
        getBoardValueMap,
        changeTileValue,
        printValueMap,
        resetBoardValue
    }
}

function Cell(){
    let value = 0
    const changeValue = (changed) => value = changed
    const getValue = () => value
    return{
        getValue, 
        changeValue
    }
}

function UserInterface(gameboard){
    const container = document.querySelector(".container")
    const start = document.querySelector("#start")
    const restart = document.querySelector("#restart")


    const implementCells = () => {
        for (i = 0; i < gameboard.getRow(); i++) {
            for (j = 0; j < gameboard.getCol(); j++) {
                let cell = document.createElement("div")
                container.append(cell)
                cell.classList.add("cell", `r${i}`, `c${j}`)
            }
        }
    }

    const fillTile = (getType, callback) => {
        container.addEventListener("click", (e) => {
            const type = getType()
            const cellRow = e.target.classList[1].substring(1, 2)
            const cellCol = e.target.classList[2].substring(1, 2)

            if (e.target.classList.contains("cell")) {
                if (e.target.textContent == ""){
                    e.target.textContent = (type == 1) ? "X" : "O"
                    gameboard.changeTileValue(cellRow, cellCol, type)
                    console.log(e.target.textContent)
                    callback()
                }
                else{
                    console.log("Pick Another Tile!")
                }
            }
        })
    }

    const eraseBoard = () => {
        const cells = document.querySelectorAll(".cell")
        cells.forEach((cell) => {
            cell.textContent = ""
        })
        gameboard.resetBoardValue()
    }

    const startButton = () => {
        start.addEventListener("click", () => 
            console.log("Quack"))      
    }

    const restartButton = () => {
        restart.addEventListener("click", () =>
            console.log("Quock"))
    }

    return{
        implementCells,
        fillTile,
        eraseBoard,
        startButton,
        restartButton
    }
}

function controlGameFlow(){
    const player = [
    {
        name: "john", 
        value: 1
    },
    {
        name: "Dpe",
        value: 2
    }]

    const gameboard = Gameboard()
    const user = UserInterface(gameboard)

    let activePlayer = player[0]

    const switchTurns = () => {
        activePlayer = (activePlayer == player[0]) ? player[1] : player[0]
    }

    const detectWinner = () =>{
        const flatCellValues = gameboard.getBoardValueMap().flat()
        const winningCombo = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 4, 6],
            [2, 5, 8],
            [3, 4, 5],
            [6, 7, 8]
        ]
        let threeinRow = []
        for (i = 0; i < player.length; i++){
            for (j = 0; j < winningCombo.length; j++) {
                for (k = 0; k < winningCombo[j].length; k++) {
                    threeinRow.push(flatCellValues[winningCombo[j][k]] == player[i].value)
                }
                if (!threeinRow.includes(false)) {
                    return player[i].name + " Wins!"
                }
                threeinRow = []
            }
        }
        if (flatCellValues.filter((value) => value == 0).length == 0){
            return "It's a Draw!"
        }
        else{
            return "N/A"
        }
    }
    
    user.implementCells()
    user.fillTile(() => activePlayer.value, () => {
        if (detectWinner() === "N/A"){
            switchTurns()
            console.log("poo" + detectWinner())
        }
        else{
            console.log("whoa" + detectWinner())
            user.eraseBoard()
        }
    })
    
    return{
        switchTurns,
        detectWinner,
    }
}

const other = controlGameFlow()
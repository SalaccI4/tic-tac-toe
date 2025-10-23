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

    const resetBoard = () => {
        for (i = 0; i < row; i++) {
            for (j = 0; j < col; j++) {
                changeTileValue(i, j, 0)
            }
        }
    }

    return{
        getRow,
        getCol,
        getBoardValueMap,
        changeTileValue,
        printValueMap,
        resetBoard
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

    const fillTile = (type) => {
        container.addEventListener("click", (e) => {
            console.log(e.target.classList)
            if (e.target.classList.contains("cell")) {
                if (e.target.textContent !== ""){
                    e.target.textContent = type
                }
            }
        })
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
        startButton,
        restartButton
    }
}

function controlGameFlow(gameboard){
    const player = [
    {
        name: "", 
        value: 1
    },
    {
        name: "",
        value: 2
    }]

    let activePlayer = player[0]

    const switchTurns = () => {
        (activePlayer == player[0]) ? activePlayer = player[1] : activePlayer = player[0]
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
                    return player[i].name
                }
                threeinRow = []
            }
        }
        return "N/A"
    }

    return{
        switchTurns,
        detectWinner,
    }
}

const thing = Gameboard()
const other = controlGameFlow(thing)
const dis = UserInterface(thing)

dis.implementCells()

thing.printValueMap()
thing.changeTileValue(0, 0, 1)
thing.changeTileValue(1, 1, 1)
thing.changeTileValue(2, 2, 1)
thing.printValueMap()
console.log(other.detectWinner())
thing.resetBoard()
thing.printValueMap()

dis.startButton()
dis.restartButton()
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


    return{
        getBoardValueMap,
        changeTileValue,
        printValueMap
    }

    // const container = document.querySelector(".container")

    // container.addEventListener("click", (e) => {
    //     console.log(e.target.classList)
    //     if (e.target.classList.contains("cell")) {
    //         e.target.style.backgroundColor = "red";
    //         console.log()
    //     }
    // })
    
    // let board = []
    // const row = 3
    // const col = 3

    // const implementCell = (rowNum, colNum) => {
    //     let cell = document.createElement("div")
    //     cell.classList.add("cell", `r${rowNum}`, `c${colNum}`)
    //     container.append(cell)
    // }

    // for (i = 0; i < row; i++){
    //     board[i] = []
    //     for (j = 0; j < col; j++) {
    //         implementCell(i, j)
    //     }
    // }
    // console.log(board)
}

function Cell(){
    let value = 0
    const changeValue = (changed) => value = changed
    const getValue = () => value
    return{
        getValue, changeValue
    }
}

function controlGameFlow(gameboard){
    const player = [
    {
        name: "e", 
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
        detectWinner
    }
}

function controlDisplay(){
    
}

const thing = Gameboard()
const other = controlGameFlow(thing)

thing.printValueMap()
other.detectWinner()
thing.changeTileValue(0, 0, 1)
thing.changeTileValue(1, 1, 1)
thing.changeTileValue(2, 2, 1)
thing.printValueMap()
console.log(other.detectWinner())
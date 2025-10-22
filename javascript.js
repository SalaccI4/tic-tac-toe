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

    const getBoard = () => board

    const createValueMap = () => {
        const whoa = board.map(
            (cellRow) => cellRow.map(
                (cell) => cell.getValue()
            )
        )
    }

    const changeTileValue = (cellRow, cellCol, tile) => {
        board[cellRow][cellCol].changeValue(tile)
    }

    const printValueMap = () => {
        const whoa = board.map(
            (cellRow) => cellRow.map(
                (cell) => console.log(cell.getValue())
            )
        )
    }


    return{
        getBoard,
        createValueMap,
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

function controlGameFlow(){
    //create player objects, 
    const player1 = {
        name: "", 
        value: 1
    }
    const player2 = {
        name: "",
        value: 2
    }


}

function controlDisplay(){
    
}

const thing = Gameboard()
thing.changeTileValue(0, 2, 2)
thing.printValueMap()
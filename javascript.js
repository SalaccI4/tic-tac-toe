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

    const input1 = document.querySelector("#p1name")
    const input2 = document.querySelector("#p2name")
    const display1 = document.querySelector("#p1text")
    const display2 = document.querySelector("#p2text")
    const bottomDisplay = document.querySelector("#display")

    const updateDisplayText = (text) => bottomDisplay.textContent = text

    const implementCells = () => {
        for (i = 0; i < gameboard.getRow(); i++) {
            for (j = 0; j < gameboard.getCol(); j++) {
                let cell = document.createElement("div")
                container.append(cell)
                cell.classList.add("cell", `r${i}`, `c${j}`)
            }
        }
    }

    const fillTile = (getType) => {
        return new Promise((resolve) => {
            const handleClick = (e) => {
                const cellRow = e.target.classList[1].substring(1, 2)
                const cellCol = e.target.classList[2].substring(1, 2)

                if (e.target.classList.contains("cell")) {
                    if (e.target.textContent === "") {
                        e.target.textContent = (getType == 1) ? "X" : "O"
                        gameboard.changeTileValue(cellRow, cellCol, getType)
                        container.removeEventListener("click", handleClick)
                        resolve()
                    } else {
                        updateDisplayText("Choose Another Tile!")
                    }
                }

            };

            container.addEventListener("click", handleClick);
        });
    };

    const eraseBoard = () => {
        const cells = document.querySelectorAll(".cell")
        cells.forEach((cell) => {
            cell.textContent = ""
        })
        gameboard.resetBoardValue()
    }

    const startButton = () => {
        return new Promise((resolve) => {
            const handleClick = () => {
                if (display1.textContent !== "[P1]" && display2.textContent !== "[P2]") {
                    start.removeEventListener("click", handleClick)
                    resolve()
                } else {
                    bottomDisplay.textContent = "Please Enter Your Names!"
                }
            }
            start.addEventListener("click", handleClick)
        })
    }

    const restartButton = () => {
        restart.addEventListener("click", () =>
            console.log("Quock"))
    }

    const getNames = (player) => {
        return new Promise((resolve) => {
            if (player == 1) {
                input1.addEventListener("keydown", (e) => {
                    if (e.key == "Enter") {
                        display1.textContent = input1.value
                        resolve(input1.value)
                    }
                })
            }
            else if (player == 2) {
                input2.addEventListener("keydown", (e) => {
                    if (e.key == "Enter") {
                        display2.textContent = input2.value
                        resolve(input2.value)
                    }
                })
            }
        })
    }

    return{
        implementCells,
        updateDisplayText,
        fillTile,
        eraseBoard,
        startButton,
        restartButton,
        getNames
    }
}

function controlGameFlow(){
    const player = [
    {
        name: "", 
        value: 1
    },
    {
        name: "",
        value: 2
    }]

    const gameboard = Gameboard()
    const user = UserInterface(gameboard)

    let activePlayer = player[0]
    const getActivePlayerValue = () => activePlayer.value

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
    
    async function runShit() {
        user.implementCells()
        player[0].name = await user.getNames(player[0].value)
        player[1].name = await user.getNames(player[1].value)
        
        // await user.startButton()

        while (true) {
            user.updateDisplayText(`${activePlayer.name}'s Turn`)
            await user.fillTile(getActivePlayerValue())
            if (detectWinner() !== "N/A") {
                break
            }
            switchTurns()
        }
        user.updateDisplayText(`${activePlayer.name} is the winner!`)

    }


    runShit()
    
    return{
        switchTurns,
        detectWinner,
    }
}

const other = controlGameFlow()
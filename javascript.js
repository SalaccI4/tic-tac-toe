const gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""]

    const getBoard = () => board

    const changeMark = (pos, mark) => {
        board[pos] = mark
    }
    
    const resetBoard = () =>  {
        board = ["", "", "", "", "", "", "", "", ""]
    }

    return {
        getBoard,
        changeMark,
        resetBoard
    }
})()

const DOM = (() => {
    const container = document.querySelector(".container")
    const text1 = document.querySelector("#p1text")
    const text2 = document.querySelector("#p2text")
    const name1 = document.querySelector("#p1name")
    const name2 = document.querySelector("#p2name")
    const score1 = document.querySelector("#p1score")
    const score2 = document.querySelector("#p2score")
    const bottomDisplay = document.querySelector("#display")
    const newGame = document.querySelector("#newgame")

    const getContainer = () => container
    const getNewGame = () => newGame
    const getText1 = () => text1
    const getText2 = () => text2
    const getName1 = () => name1
    const getName2 = () => name2

    //adds 9 cells as children of container
    const addCells = () => {
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement("div")
            cell.classList.add("cell")
            cell.id = `${i}`
            container.append(cell)
        }
    }

    const changeName = (player, text) => {
        (player == 0)
            ? text1.textContent = text
            : text2.textContent = text
    }

    const changeScore = (player, score) => {
        (player == 0) 
        ? score1.textContent = `Score: ${score}` 
        : score2.textContent = `Score: ${score}`
    }

    const changeBottomDisplay = (text) => {
        bottomDisplay.textContent = text
    }

    return {
        getContainer,
        getNewGame,
        getText1,
        getText2,
        getName1,
        getName2,
        addCells,
        changeName,
        changeScore,
        changeBottomDisplay
    }
})()

const controller = (() => {
    const player = [
        {
            name: "",
            mark: "X",
            score: 0
        },
        {
            name: "",
            mark: "O",
            score: 0
        }
    ]

    let activePlayer = player[0]

    const swapActivePlayer = () => {
        activePlayer == player[0] ? activePlayer = player[1] : activePlayer = player[0]
    }

    const addScore = (player) => {
        player.score++
    }

    const decideWinner = () => {
        //all possible combinations in array that lead to 3 in a row
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

        //looks through each combo in the 3D array
        for (j = 0; j < winningCombo.length; j++) {
            let threeInRow = []
            //looks through each index in each combo of the array
            for (k = 0; k < winningCombo[j].length; k++) {
                //adds false if board doesn't have same marks as active player in the given index of combo
                threeInRow.push(gameboard.getBoard()[winningCombo[j][k]] == activePlayer.mark)
            }
            //if there is 3 in a row (no false in combo)
            if (!threeInRow.includes(false)) {
                return true
            }
            //if all tiles are occupied and there isn't 3 in a row
            else if (!gameboard.getBoard().includes("") && threeInRow.includes(false)){
                return false
            }
        }
    }

    const playGame = () => {
        
        DOM.addCells()

        //confirms names are added before new game can start
        const confirmNames = () => {
            DOM.getName1().addEventListener("keyup", (e) => {
                DOM.changeName(0, DOM.getName1().value)
                player[0].name = DOM.getText1().textContent
                if (player[0].name !== "" && player[1].name !== "") {
                    DOM.getNewGame().addEventListener("click", newGame)
                }
            })
            DOM.getName2().addEventListener("keyup", (e) => {
                DOM.changeName(1, DOM.getName2().value)
                player[1].name = DOM.getText2().textContent
                if (player[0].name !== "" && player[1].name !== "") {
                    DOM.getNewGame().addEventListener("click", newGame)
                }
            })
        }
        
        //resets marks, board state, activePlayer, bottom display respectively
        const newGame = () => {
            const list = DOM.getContainer().querySelectorAll(".cell")
            list.forEach((cell) => {
                cell.textContent = " "
            })
            gameboard.resetBoard()
            activePlayer = player[0]
            DOM.changeBottomDisplay(`${activePlayer.name}'s Turn (${activePlayer.mark})`)
            DOM.getContainer().addEventListener("click", playTurn)
        }

        confirmNames()

        //runs through an entire turn of the game
        const playTurn = (e) => {
            //only runs on empty (unoccupied) tile
            if (gameboard.getBoard()[e.target.id] == "") {
                gameboard.changeMark(e.target.id, activePlayer.mark)
                e.target.textContent = activePlayer.mark
                //if someone wins
                if (decideWinner() == true) {
                    DOM.getContainer().removeEventListener("click", playTurn)
                    addScore(activePlayer)
                    DOM.changeBottomDisplay(`${activePlayer.name} Wins! (${activePlayer.mark})`)
                    DOM.changeScore(player.indexOf(activePlayer), activePlayer.score)
                }
                //if both players draw
                else if (decideWinner() == false) {
                    DOM.getContainer().removeEventListener("click", playTurn)
                    addScore(activePlayer)
                    DOM.changeBottomDisplay("Draw!")
                }
                //moves to next turn otherwise
                else{
                    swapActivePlayer()
                    DOM.changeBottomDisplay(`${activePlayer.name}'s Turn (${activePlayer.mark})`)
                }
            }
        }

    }

    return{
        playGame
    }
})()

controller.playGame()
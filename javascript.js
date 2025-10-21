function Gameboard(){
    
    const container = document.querySelector(".container")

    container.addEventListener("click", (e) => {
        if (e.target.className === "cell") {
            e.target.style.backgroundColor = "red";
        }
    })
    
    let board = []
    const row = 3
    const col = 3

    const implementCell = () => {
        let cell = document.createElement("div")
        cell.classList.add("cell")
        container.append(cell)
    }

    for (i = 0; i < row; i++){
        board[i] = []
        for (j = 0; j < col; j++) {
            board[i].push(Cell())
            implementCell()
        }
    }
    

    // const findEmptyTile = board
    //     .filter((row) => row[column].getValue == 0)
    //     .map((row) => row[column])

}

function Cell(){
    let value = 0
    const getValue = () => value

    return{
        getValue
    }
}

const thing = Gameboard()
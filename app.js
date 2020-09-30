const status = document.querySelector('.game--status')

let gameActive = true
let currentPlayer = 'X'

let gameState = ["","","","","","","","",""]
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// winning message
const winningMessage = () => `${currentPlayer} Won`
// drawmessage
const drawMessage = () => `game tied!!`
// currentplayer turn
const currentPlayerTurn = () => `${currentPlayer} turn`
// at each move we will display the next player turn
status.innerHTML = currentPlayerTurn()

// cell played
const handleCellPlayed = (clickedCell,clickedCellIndex) => {
    gameState[clickedCellIndex] = currentPlayer
    clickedCell.innerHTML = currentPlayer
    let player = clickedCell.innerHTML
    //player.style.display = "none"
    console.log(player)
}
//player change
const handlePlayerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    status.innerHTML = currentPlayerTurn()
}
// result
const handleResult = () => {
    let won = false
    for(let i = 0; i < winningConditions.length; i++) {
        const winningCondition = winningConditions[i]
        let a = gameState[winningCondition[0]]
        let b = gameState[winningCondition[1]]
        let c = gameState[winningCondition[2]]
        if(a === '' || b === '' || c === '') {
            continue
        }
        if(a === b && b === c) {
            won = true
            break
        }
    }
    if(won) {
        status.innerHTML =  winningMessage()
        gameActive = false
        return
    }
    // checking the draw
    let draw = !gameState.includes("")
    if(draw) {
        status.innerHTML = drawMessage()
        gameActive = false
        return
    }
    // playerchange
    handlePlayerChange()  
}
//cell click
const handleCellClick = (clickedCellEvent) => {
    // storing the html element in a variable
    const clickedCell = clickedCellEvent.target
    // data cell index returns the string value so we are convrt into int using parseint
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'))
    // here are checking whether the cell has been already played or not or checking the gameactivity either
    // one of them are true simply it ignores the click by return
    if(gameState[clickedCellIndex]!=="" || !gameActive) {
        return
    }
    handleCellPlayed(clickedCell,clickedCellIndex)
    handleResult()
}
// restart
const handleReset = () => {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    status.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click',handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleReset);
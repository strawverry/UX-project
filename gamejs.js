
const cells = document.querySelectorAll('.cell')
const titleHeader = document.querySelector('#titleHeader')
const xPlayerDisplay = document.querySelector('#x')
const oPlayerDisplay = document.querySelector('#o')
const restartBtn = document.querySelector('#startAgainbtn')
const winSound = new Audio('win.wav');
const tapSound = new Audio('tap.wav');
const drawSound = new Audio('draw.wav');
const loseSound = new Audio('lose.mp3');
const clickSound = new Audio('click.wav');

// Initialize variables for the game
let computerPlayer = 'X'
let player = 'X'
let isPauseGame = false
let isGameStart = false
let isPlayerSelected=false
tapSound.volume=1;
winSound.volume = 0.5;
loseSound.volume=0.5;
drawSound.volume=0.7;
clickSound.volume=0.5;

// Array of win conditions
const inputCells = ['', '', '',
                    '', '', '',
                    '', '', '']

// Array of win conditions
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] 
]


cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (isPlayerSelected) {
            tapCell(cell, index)

            
        } else {
            titleHeader.textContent = 'Select X or O';
            titleHeader.style.color = '#FF0000';
        }
    });
});

function tapCell(cell, index) {
    if (cell.textContent == '' &&
        !isPauseGame
    ) {
        tapSound.play()
        isGameStart = true
        updateCell(cell, index)

        if (!checkWinner()) {
            changePlayer()
            randomPick()
        }
    }
}


function updateCell(cell, index) {
    cell.textContent = player
    inputCells[index] = player
    cell.style.color = (player == 'X') ? '#FFFFFF' : '#ffea00'
   
}

function changePlayer() {
    player = (player == 'X') ? 'O' : 'X'
}

function randomPick() {
    isPauseGame = true

    setTimeout(() => {
        let randomIndex
        do {
            randomIndex = Math.floor(Math.random() * inputCells.length)
        } while (
            inputCells[randomIndex] != ''
        )

        updateCell(cells[randomIndex], randomIndex, player)
        if (!checkWinner()) {
            changePlayer()
            isPauseGame = false
            return
        }
        player = (player == 'X') ? 'O' : 'X'
    }, 500) 
}

function checkWinner() {
    for (const [a, b, c] of winConditions) {
        if (inputCells[a] == player &&
            inputCells[b] == player &&
            inputCells[c] == player
        ) {
            declareWinner([a, b, c])
            return true
        }
    }
    
    if (inputCells.every(cell => cell != '')) {
        declareDraw()
        return true
    }
}


function declareWinner(winningIndices) {
    if (player === computerPlayer) {
        winSound.play()
        titleHeader.style.fontSize = '2rem';
        titleHeader.textContent = `${player} Wins`;
        titleHeader.style.color = '#92ea18';
        restartBtn.style.backgroundColor = '#035609';
        restartBtn.textContent = 'Play Again!';
       
       
    } else {
        loseSound.play()
        titleHeader.style.fontSize = '2rem';
        titleHeader.textContent = `${computerPlayer} Loses`;
        titleHeader.style.color = '#FF0000';
        restartBtn.style.backgroundColor = '#FF0000';
        restartBtn.textContent = 'Try Again!';
    }

    isPauseGame = true;

    winningIndices.forEach((index) =>
        cells[index].style.background = '#32246a'
    );

    restartBtn.style.visibility = 'visible';
}

function declareDraw() {
    drawSound.play()
    titleHeader.textContent = 'Draw!';
    titleHeader.style.color = '#FFA500';
    restartBtn.style.backgroundColor = '#FFA500';
    restartBtn.textContent = 'Try Again!';
    titleHeader.style.fontSize = '2rem';
    isPauseGame = true;
    restartBtn.style.visibility = 'visible';
}


function choosePlayer(selectedPlayer) {
    if (!isGameStart) {
        tapSound.play()
        computerPlayer = selectedPlayer; 
        player = selectedPlayer
        isPlayerSelected = true
        titleHeader.textContent=player
        titleHeader.style.fontSize = '3rem'

        if (player == 'X') {

            titleHeader.style.color = '#FFFFFF'; 
            xPlayerDisplay.classList.add('player-active');
            xPlayerDisplay.style.backgroundColor='#32246a'
            oPlayerDisplay.style.backgroundColor='#5b44b9'         

            oPlayerDisplay.classList.remove('player-active');
        } else {
            titleHeader.style.color = '#ffea00';
            xPlayerDisplay.classList.remove('player-active');
            oPlayerDisplay.classList.add('player-active');
            oPlayerDisplay.style.backgroundColor='#32246a'
            xPlayerDisplay.style.backgroundColor='#5b44b9'         
        }
    }
}

restartBtn.addEventListener('click', () => {
    clickSound.play()
    restartBtn.style.visibility = 'hidden';
    inputCells.fill('')
    cells.forEach(cell => {
        cell.textContent = ''
        cell.style.background = ''
    })
    isPauseGame = false
    isGameStart = false
    isPlayerSelected = false;
    titleHeader.textContent = 'X or O'
    titleHeader.style.color = '#ffffff';
    oPlayerDisplay.style.backgroundColor='#5b44b9'
    xPlayerDisplay.style.backgroundColor='#5b44b9'
})

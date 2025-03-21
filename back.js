const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetButton = document.querySelector(".reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]  
];

// Handle Player Move
function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    checkWinner();

    if (gameActive) {
        currentPlayer = "O"; 
        setTimeout(computerMove, 900); 
    }
}

// Computer Move (Random)
function computerMove() {
    let emptyCells = board.map((value, index) => (value === "" ? index : null)).filter(index => index !== null);

    if (emptyCells.length === 0 || !gameActive) return;

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = "O";
    cells[randomIndex].textContent = "O";

    checkWinner();
    currentPlayer = "X"; // Switch back to Player
}

// Check Winner
function checkWinner() {
    let roundWon = false;

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            highlightWinningCells([a, b, c]);
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        gameActive = false;
    } else if (!board.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
    }
}

// Highlight Winning Cells
function highlightWinningCells(cellsToHighlight) {
    cellsToHighlight.forEach(index => {
        cells[index].style.backgroundColor = "#2ecc71"; // Green highlight
    });
}

// Reset Game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "white";
    });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

statusText.textContent = "Player X's turn";

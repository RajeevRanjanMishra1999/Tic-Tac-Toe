let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const statusDiv = document.getElementById("status");
const board = document.getElementById("board");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle player turn
function handleClick(index) {
    if (gameBoard[index] !== "" || !gameActive) return;

    gameBoard[index] = currentPlayer;
    document.getElementById(index).textContent = currentPlayer;

    if (checkWinner()) {
        statusDiv.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameBoard.every(cell => cell !== "")) {
        statusDiv.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check for a winner
function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

// Reset game function
function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusDiv.textContent = "Player X's turn";
    Array.from(board.children).forEach(square => square.textContent = "");
}

// Set up the squares on the board
Array.from(board.children).forEach(square => {
    square.addEventListener("click", () => {
        handleClick(square.id);
    });
});
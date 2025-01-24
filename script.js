const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset-btn");
const newGameBtn = document.getElementById("new-btn");
const msgContainer = document.getElementById("msg-container");
const msgText = document.getElementById("msg");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Function to handle a move
function makeMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

// Add event listeners to all boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => makeMove(index));
});

// Function to check for a winner
function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combo of winningCombos) {
        let [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            msgText.innerText = `Player ${board[a]} Wins! 🎉`;
            msgContainer.classList.remove("hide");
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        msgText.innerText = "It's a Draw! 😐";
        msgContainer.classList.remove("hide");
    }
}

// Function to reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    boxes.forEach(box => (box.innerText = ""));
    msgContainer.classList.add("hide");
}

// Event listeners for reset and new game buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

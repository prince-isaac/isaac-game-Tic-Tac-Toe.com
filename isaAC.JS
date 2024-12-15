const cells = document.querySelectorAll(".cell");
const statustext = document.querySelector("#statustext");
const restartBtn = document.querySelector("#Restart");
const winconditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "x";
let running = false;
let playerXWins = 0;
let playerOWins = 0;
let playerXDraws = 0;
let playerODraws = 0;
let draws = 0;

initializeGame();

function initializeGame() {
    cells.forEach((cell, index) => {
        cell.setAttribute("cellIndex", index); // Set cellIndex dynamically
        cell.addEventListener("click", cellClicked);
    });
    restartBtn.addEventListener("click", restartGame);
    statustext.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === "x") ? "o" : "x";
    statustext.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    let winningCondition = null;

    for (let i = 0; i < winconditions.length; i++) {
        const condition = winconditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            winningCondition = condition;
            break;
        }
    }

    if (roundWon) {
        statustext.textContent = `${currentPlayer} wins!`;
        highlightWinningLine(winningCondition);
        updateScore();
        running = false;
        return;
    }

    if (!options.includes("")) {
        statustext.textContent = "It's a draw!";
        draws++;
        updateDraws();
        cells.forEach(cell => cell.classList.add('draw-cell')); // Highlight draw
        running = false;
    } else {
        changePlayer();
    }
}

function highlightWinningLine(winningCondition) {
    winningCondition.forEach(index => {
        cells[index].classList.add('winning-cell'); // Add CSS class for winning cells
    });
}

function updateScore() {
    if (currentPlayer === "x") {
        playerXWins++;
        playerOWins++;  // Player O loses
        document.getElementById('player-x-wins').textContent = playerXWins;
        document.getElementById('player-o-losses').textContent = playerOWins;
    } else {
        playerOWins++;
        playerXWins++;  // Player X loses
        document.getElementById('player-o-wins').textContent = playerOWins;
        document.getElementById('player-x-losses').textContent = playerXWins;
    }
}

function updateDraws() {
    if (currentPlayer === "x") {
        playerXDraws++;
        document.getElementById('player-x-draws').textContent = playerXDraws;
    } else {
        playerODraws++;
        document.getElementById('player-o-draws').textContent = playerODraws;
    }
    document.getElementById('total-draws').textContent = draws;
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "x";
    running = true;
    statustext.textContent = `${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('winning-cell'); // Remove winning class
        cell.classList.remove('draw-cell');   // Remove draw class
        cell.style.backgroundColor = "#e0e0e0"; // Reset color
    });
}

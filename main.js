document.addEventListener("DOMContentLoaded", function () {

    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector(".status-text");
    const restartBtn = document.querySelector("#restart-btn");

    const winCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let options = ["", "", "", "", "", "", "", "", ""];

    let currentPlayer = "X";
    let running = false;

    const game = (function () {
        const initializeGame = () => {
            cells.forEach(cell => cell.addEventListener("click", cellClicked));
            restartBtn.addEventListener("click", restartGame);
            statusText.textContent = `${currentPlayer}'s turn`;
            running = true
        }

        const cellClicked = function() {
            const cellIndex = this.getAttribute("cellIndex");

            if (options[cellIndex] != "" || !running) {
                return;
            }
            
            updateCell(this, cellIndex);
            checkWinner();
        }

        const updateCell = function(cell, index) {
            options[index] = currentPlayer;

            cell.textContent = currentPlayer;
        }

        const changePlayer = function() {
            currentPlayer = (currentPlayer == "X") ? "O" : "X";
            statusText.textContent = `${currentPlayer}'s turn`
        }

        const checkWinner = function() {
            let roundWon = false;

            for(let i = 0; i < winCondition.length; i++) {
                const condition = winCondition[i];
                const cellA = options[condition[0]];
                const cellB = options[condition[1]];
                const cellC = options[condition[2]];

                if (cellA == "" || cellB == "" || cellC == "") {
                    continue;
                }
                if (cellA == cellB && cellB == cellC) {
                    roundWon = true;
                    break;
                }

            }

            if (roundWon) {
                statusText.textContent = `${currentPlayer} won!`;
            }
            
            else if (!options.includes("")) {
                statusText.textContent = `It's a Draw!`;
                running = false;
            }
            else {
                changePlayer();
            }
        }

        const restartGame = function() {
            currentPlayer = "X";
            options = ["", "", "", "", "", "", "", "", ""];
            statusText.textContent = `${currentPlayer}'s turn`;
            cells.forEach(cell => cell.textContent = "");
            running = true;
        }

        return { initializeGame, cellClicked, updateCell, changePlayer, checkWinner }
    })();

    game.initializeGame();
});
let title = document.querySelector(".title");
const RestartButton = document.querySelector(".Restart_button");
let boxes = Array.from(document.getElementsByClassName("square"));
let indicator = getComputedStyle(document.body).getPropertyValue('--winning-squares');
let newgameBtn = document.getElementById("new-game");
let msg = document.getElementById("message");
let popupRef = document.querySelector(".popup");
let isHumanPlayerButton = document.getElementById("human");
let isComputerPlayerButton = document.getElementById("computer");


let isHumanPlayer="true";

const O_Input = "O";
const X_Input = "X";
let currentPlayer = O_Input;
const WinningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let spaces = Array(9).fill(null);

const disableButtons = () => {
    boxes.forEach((element) => (element.disabled = true));
    popupRef.classList.remove("hide");
};

function Won() {
    for (const value of WinningCombos) {
        let [a, b, c] = value;
        if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
            return [a, b, c];
        }
    }
    return false;
}

function hideOptions() {
    isHumanPlayerButton.style.display = "none";
    isComputerPlayerButton.style.display = "none";
}

function showOptions() {
    isHumanPlayerButton.style.display = "block";
    isComputerPlayerButton.style.display = "block";
}

const enableButtons = () => {
    boxes.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.classList.add("hide");
};

function isDraw() {
    return spaces.every((space) => space !== null) && !Won();
}

const Start = () => {
    isHumanPlayer = true;
    disableButtons();
    hideOptions();
    boxes.forEach(square => square.addEventListener("click", boxclicked));
};

const Startnow = () => {
    isHumanPlayer = false;
    disableButtons();
    hideOptions();
    boxes.forEach(square => square.addEventListener("click", makeComputerMove));
};

function makeComputerMove() {
    if (!isHumanPlayer) {
        const emptySquares = spaces.reduce(
            (acc, val, index) => (val === null ? acc.concat(index) : acc),
            []
        );

        if (emptySquares.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptySquares.length);
            const computerMoveIndex = emptySquares[randomIndex];

            spaces[computerMoveIndex] = X_Input;
            boxes[computerMoveIndex].innerHTML = X_Input;

            if (Won() !== false) {
                if(currentPlayer===X_Input){
                    title.textContent = `Computer has won!`; 
                }
                else if(currentPlayer=== O_Input){
                    title.textContent =`You have won!`;
                }
                
                let winning_blocks = Won();
                winning_blocks.map((square) => (boxes[square].style.backgroundColor = indicator));
            } else if (isDraw()) {
                title.innerHTML = "It's a draw!";
            } else {
                currentPlayer = O_Input;
            }
        }
    }
}

function boxclicked(event) {
    const id = event.target.id;

    console.log("Before:", currentPlayer);

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        event.target.innerHTML = currentPlayer;

        if (Won() !== false) {
            title.textContent = `${currentPlayer} has won!`;
            let winning_blocks = Won();
            winning_blocks.map(square => boxes[square].style.backgroundColor = indicator);
            return;
        } else if (isDraw()) {
            title.innerHTML = "It's a draw!";
        }

        currentPlayer = currentPlayer === O_Input ? X_Input : O_Input;
        console.log("After:", currentPlayer);
    }
}

function restart() {
    spaces.fill(null);
    boxes.forEach(square => {
        square.innerHTML = " ";
        square.style.backgroundColor = '';
    });
    title.innerHTML = "Tic Tac Toe!";
    currentPlayer = O_Input;
    showOptions(); 
}

Start();
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons(); 
});
RestartButton.addEventListener("click", restart);
isHumanPlayerButton.addEventListener("click", Start);
isComputerPlayerButton.addEventListener("click", Startnow);


// scripts.js
const choices = ["rock", "paper", "scissors"];
const messages = {
    win: "You win!",
    lose: "You lose!",
    draw: "It's a draw!"
};

const choiceImages = {
    rock: "rock.png",
    paper: "paper.png",
    scissors: "scissors.png"
};

let userScore = 0;
let computerScore = 0;

const userChoiceElement = document.getElementById("userChoice");
const computerChoiceElement = document.getElementById("computerChoice");
const resultMessageElement = document.getElementById("resultMessage");
const playAgainButton = document.getElementById("playAgain");
const startGameButton = document.getElementById("startGame");
const userScoreElement = document.getElementById("userScore");
const computerScoreElement = document.getElementById("computerScore");
const choicesElements = document.querySelectorAll('.choice');
const selectSound = document.getElementById("selectSound");
const resultSound = document.getElementById("resultSound");
const sadSound = document.getElementById("sadSound");
const countdownSound = document.getElementById("countdownSound");
const buttonClickSound = new Audio("click.mp3"); // Sound for button clicks

document.querySelectorAll('.choice').forEach(choice => {
    choice.addEventListener('click', function () {
        if (choice.classList.contains('disabled')) return;

        // Play selection sound
        selectSound.play();
        
        const userChoice = this.id;
        const computerChoice = getComputerChoice();
        const result = determineWinner(userChoice, computerChoice);

        userChoiceElement.innerHTML = `<img src="${choiceImages[userChoice]}" alt="${userChoice}">`;
        computerChoiceElement.innerHTML = `<img src="${choiceImages[computerChoice]}" alt="${computerChoice}">`;
        resultMessageElement.textContent = messages[result];

        updateScores(result);
        playAgainButton.style.display = "block";
        disableChoices();

        // Play appropriate result sound
        if (result === "win") {
            resultSound.play();
        } else if (result === "lose") {
            sadSound.play();
        }
    });
});

startGameButton.addEventListener('click', () => {
    // Play button click sound
    buttonClickSound.play();
    
    startGame();
    startGameButton.style.display = "none"; // Hide start button
});

playAgainButton.addEventListener('click', () => {
    // Play button click sound
    buttonClickSound.play();
    
    resetGameForPlayAgain();
    enableChoices();
    playAgainButton.style.display = "none"; // Hide play again button until user makes a choice
});

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "draw";
    }
    if ((userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")) {
        return "win";
    }
    return "lose";
}

function updateScores(result) {
    if (result === "win") {
        userScore++;
        userScoreElement.textContent = `User: ${userScore}`;
    } else if (result === "lose") {
        computerScore++;
        computerScoreElement.textContent = `Computer: ${computerScore}`;
    }
}

function updateScoreDisplay() {
    userScoreElement.textContent = `User: ${userScore}`;
    computerScoreElement.textContent = `Computer: ${computerScore}`;
}

function resetGameForPlayAgain() {
    userChoiceElement.innerHTML = "";
    computerChoiceElement.innerHTML = "";
    resultMessageElement.textContent = "";
}

function disableChoices() {
    choicesElements.forEach(choice => {
        choice.classList.add('disabled');
    });
}

function enableChoices() {
    choicesElements.forEach(choice => {
        choice.classList.remove('disabled');
    });
}

function startGame() {
    enableChoices();
    const newGameButton = document.createElement("button");
    newGameButton.id = "newGame";
    newGameButton.textContent = "New Game";
    newGameButton.addEventListener('click', () => {
        // Play button click sound
        buttonClickSound.play();
        
        userScore = 0;
        computerScore = 0;
        updateScoreDisplay();
        resetGameForNewGame();
        enableChoices();
    });
    document.querySelector('.button-container').appendChild(newGameButton);
}

function resetGameForNewGame() {
    userChoiceElement.innerHTML = "";
    computerChoiceElement.innerHTML = "";
    resultMessageElement.textContent = "";
    playAgainButton.style.display = "none";
    choicesElements.forEach(choice => {
        choice.classList.add('disabled');
    });
}

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
const newGameButton = document.getElementById("newGame");
const userScoreElement = document.getElementById("userScore");
const computerScoreElement = document.getElementById("computerScore");
const choicesElements = document.querySelectorAll('.choice');

// Disable choices initially
choicesElements.forEach(choice => {
    choice.classList.add('disabled');
});

document.querySelectorAll('.choice').forEach(choice => {
    choice.addEventListener('click', function () {
        if (choice.classList.contains('disabled')) return;

        const userChoice = this.id;
        const computerChoice = getComputerChoice();
        const result = determineWinner(userChoice, computerChoice);

        userChoiceElement.innerHTML = `<img src="${choiceImages[userChoice]}" alt="${userChoice}">`;
        computerChoiceElement.innerHTML = `<img src="${choiceImages[computerChoice]}" alt="${computerChoice}">`;
        resultMessageElement.textContent = messages[result];

        updateScores(result);
        playAgainButton.style.display = "block";
        disableChoices();
    });
});

playAgainButton.addEventListener('click', () => {
    resetGameForPlayAgain();
    enableChoices();
    playAgainButton.style.display = "none"; // Hide "Play Again" button until user makes a choice
});

newGameButton.addEventListener('click', () => {
    userScore = 0;
    computerScore = 0;
    updateScoreDisplay();
    resetGameForNewGame();
    enableChoices();
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

function resetGameForNewGame() {
    userChoiceElement.innerHTML = "";
    computerChoiceElement.innerHTML = "";
    resultMessageElement.textContent = "";
    playAgainButton.style.display = "none";
    choicesElements.forEach(choice => {
        choice.classList.add('disabled');
    });
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

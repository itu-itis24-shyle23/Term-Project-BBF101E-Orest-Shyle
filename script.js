// Variables
let score = 0;
let lives = 3;
const word = "NYMPH".split(""); // Word for the game
let guessedLetters = [];
let gameOver = false; // Flag to track game status

// DOM Elements
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const heartsDisplay = document.getElementById("hearts");
const gameBoard = document.getElementById("game-board");
const guessInput = document.getElementById("guess-input");

// Initialize Game
function initGame() {
    gameBoard.innerHTML = "";
    word.forEach(() => {
        const card = document.createElement("div");
        card.className = "card hidden";
        const img = document.createElement("img");
        img.src = "BACK.svg"; 
        img.alt = "Hidden Card";
        card.appendChild(img);
        gameBoard.appendChild(card);
    });
    score = 0;
    lives = 3;
    guessedLetters = [];
    gameOver = false; // Reset the game state
    updateScoreLives();
}

// Update Score and Lives
function updateScoreLives() {
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    heartsDisplay.textContent = "❤".repeat(lives);
}

// Submit Guess
function submitGuess() {
    if (gameOver) {
        alert("The game is over! Click 'Reset Game' to start a new game.");
        return;
    }

    const guess = guessInput.value.toUpperCase().trim();
    guessInput.value = "";

    // Check if the input is valid (single letter)
    if (guess.length !== 1 || !/^[A-Z]$/.test(guess)) {
        alert("Please enter a single valid letter.");
        return;
    }

    // Check if the letter has already been guessed
    if (guessedLetters.includes(guess)) {
        alert(`You've already guessed the letter "${guess}". Try a different one.`);
        return;
    }

    if (word.includes(guess)) {
        revealLetters(guess);
        score += 20;

        // Check if all cards are revealed
        if (guessedLetters.length === word.length) {
            gameOver = true; // Mark the game as over
            setTimeout(() => {
                alert("Congratulations! You've revealed all the letters and won the game!");
            }, 500);
        }
    } else {
        lives--;
    }

    if (lives <= 0) {
        gameOver = true; // Mark the game as over
        setTimeout(() => {
            alert(`Game over! The word was: ${word.join("")}`);
        }, 500); 
    }

    updateScoreLives();
}

// Reveal Letters
function revealLetters(letter) {
    word.forEach((char, index) => {
        if (char === letter) {
            const card = gameBoard.children[index];
            const img = card.firstChild;
            img.src = `${char}.svg`; // Flip to the corresponding letter image
            card.classList.remove("hidden");
        }
    });
    guessedLetters.push(letter);
}

// Reset Game
function resetGame() {
    initGame();
}

// Initialize on Load
document.addEventListener("DOMContentLoaded", initGame);

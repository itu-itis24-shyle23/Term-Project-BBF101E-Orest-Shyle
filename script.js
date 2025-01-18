// Variables
let score = 0;
let lives = 3;
const word = "NYMPH".split(""); // Word for the game
let guessedLetters = [];

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
    const guess = guessInput.value.toUpperCase().trim();
    guessInput.value = "";

    // Check if the input is valid (single letter)
    if (guess.length !== 1 || !/^[A-Z]$/.test(guess)) {
        alert("Please enter a single valid letter.");
        return;
    }

    if (word.includes(guess) && !guessedLetters.includes(guess)) {
        revealLetters(guess);
        score += 20;

        // Check if all cards are revealed
        if (guessedLetters.length === word.length) {
            setTimeout(() => {
                alert("Congratulations! You've revealed all the letters and won the game!");
            }, 500); 
        }
    } else {
        lives--;
    }

    if (lives <= 0) {
        setTimeout(() => {
            alert(`Game over! The word was: ${word.join("")}`);
        }, 500); // Delay to allow UI updates
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

// Game variables
let cards = [];
let flippedCards = [];
let moves = 0;
let matches = 0;
let gameStarted = false;
let startTime = null;
let timerInterval = null;
let seconds = 0;

// Card symbols (4 pairs)
const cardSymbols = [
    'fas fa-star', 'fas fa-heart', 
    'fas fa-moon', 'fas fa-sun',
    'fas fa-star', 'fas fa-heart', 
    'fas fa-moon', 'fas fa-sun'
];

// DOM elements
const gameBoard = document.getElementById('game-board');
const movesElement = document.getElementById('moves');
const matchesElement = document.getElementById('matches');
const timerElement = document.getElementById('timer');
const resetBtn = document.getElementById('reset-btn');
const newGameBtn = document.getElementById('new-game-btn');
const winMessage = document.getElementById('win-message');
const winMovesElement = document.getElementById('win-moves');
const winTimeElement = document.getElementById('win-time');
const playAgainBtn = document.getElementById('play-again-btn');

// Initialize the game
function initGame() {
    // Reset game variables
    cards = [];
    flippedCards = [];
    moves = 0;
    matches = 0;
    gameStarted = false;
    seconds = 0;
    
    // Clear the game board
    gameBoard.innerHTML = '';
    
    // Update UI
    movesElement.textContent = moves;
    matchesElement.textContent = `${matches} / 4`;
    timerElement.textContent = '0s';
    
    // Clear any existing timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Shuffle the cards
    const shuffledSymbols = [...cardSymbols].sort(() => Math.random() - 0.5);
    
    // Create card elements
    for (let i = 0; i < shuffledSymbols.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = shuffledSymbols[i];
        card.dataset.index = i;
        
        // Create card front (icon)
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        const icon = document.createElement('i');
        icon.className = shuffledSymbols[i];
        cardFront.appendChild(icon);
        
        // Create card back (question mark)
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        const questionMark = document.createElement('i');
        questionMark.className = 'fas fa-question';
        cardBack.appendChild(questionMark);
        
        // Add front and back to card
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        
        // Add click event listener
        card.addEventListener('click', () => flipCard(card));
        
        // Add to game board and cards array
        gameBoard.appendChild(card);
        cards.push(card);
    }
    
    // Hide win message
    winMessage.classList.remove('show');
}

// Flip a card
function flipCard(card) {
    // Don't flip if already flipped, matched, or two cards are already flipped
    if (card.classList.contains('flipped') || 
        card.classList.contains('matched') || 
        flippedCards.length >= 2) {
        return;
    }
    
    // Start the timer on first flip
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }
    
    // Flip the card
    card.classList.add('flipped');
    flippedCards.push(card);
    
    // Check for match if two cards are flipped
    if (flippedCards.length === 2) {
        // Increment moves
        moves++;
        movesElement.textContent = moves;
        
        // Check if cards match
        const card1 = flippedCards[0];
        const card2 = flippedCards[1];
        
        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Match found
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                flippedCards = [];
                
                // Increment matches
                matches++;
                matchesElement.textContent = `${matches} / 4`;
                
                // Check for win
                if (matches === 4) {
                    endGame();
                }
            }, 500);
        } else {
            // No match - flip cards back after a delay
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
}

// Start the game timer
function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(() => {
        seconds = Math.floor((new Date() - startTime) / 1000);
        timerElement.textContent = `${seconds}s`;
    }, 1000);
}

// End the game (when all pairs are matched)
function endGame() {
    // Stop the timer
    clearInterval(timerInterval);
    
    // Show win message with stats
    winMovesElement.textContent = moves;
    winTimeElement.textContent = seconds;
    
    // Show win message after a short delay
    setTimeout(() => {
        winMessage.classList.add('show');
    }, 800);
}

// Reset the game
function resetGame() {
    // Flip all cards back
    cards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });
    
    // Reset game variables
    flippedCards = [];
    moves = 0;
    matches = 0;
    gameStarted = false;
    seconds = 0;
    
    // Update UI
    movesElement.textContent = moves;
    matchesElement.textContent = `${matches} / 4`;
    timerElement.textContent = '0s';
    
    // Clear timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Hide win message
    winMessage.classList.remove('show');
    
    // Shuffle cards again
    setTimeout(() => {
        const shuffledSymbols = [...cardSymbols].sort(() => Math.random() - 0.5);
        cards.forEach((card, index) => {
            card.dataset.symbol = shuffledSymbols[index];
            const icon = card.querySelector('.card-front i');
            icon.className = shuffledSymbols[index];
        });
    }, 500);
}

// Event listeners
resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', initGame);
playAgainBtn.addEventListener('click', initGame);

// Initialize the game on page load
document.addEventListener('DOMContentLoaded', initGame);
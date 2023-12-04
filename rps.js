let score = 0;
let totalGames = 0;
let userSelectedChoice = null;
const choices = ['ROCK', 'PAPER', 'SCISSORS'];
let countdownInterval;

// Add event listeners for the choice buttons
document.getElementById("rock").addEventListener("click", function() {
    toggleChoice('ROCK', 'rock');
});

document.getElementById("paper").addEventListener("click", function() {
    toggleChoice('PAPER', 'paper');
});

document.getElementById("scissors").addEventListener("click", function() {
    toggleChoice('SCISSORS', 'scissors');
});

// Add event listener for the play hand button
document.getElementById("playHandButton").addEventListener("click", function() {
    if (userSelectedChoice) {
        startCountdown(userSelectedChoice);
    }
});

// Start the game, hide the initial view and show the game view
function startGame() {
    document.getElementById('initialState').style.display = 'none';
    document.getElementById('gameState').style.display = 'block';
}

// Toggle choice function to select and deselect a choice
function toggleChoice(choice, elementId) {
    if (userSelectedChoice === choice) {
        userSelectedChoice = null;
        document.getElementById(elementId).classList.remove('selected');
    } else {
        if (userSelectedChoice) {
            const prevChoiceId = choices.find(c => c === userSelectedChoice).toLowerCase();
            document.getElementById(prevChoiceId).classList.remove('selected');
        }
        userSelectedChoice = choice;
        document.getElementById(elementId).classList.add('selected');
    }
}

// Start the countdown before playing the game
function startCountdown(userChoice) {
    const countdownElements = ['Rock...', 'Paper...', 'Scissors...'];
    let counter = 0;
    // Disable the playHandButton
    document.getElementById("playHandButton").disabled = true;
    countdownInterval = setInterval(() => {
        document.getElementById('choiceText').textContent = countdownElements[counter];
        counter++;

        if (counter === countdownElements.length) {
            clearInterval(countdownInterval);
            playGame(userChoice);
        }
    }, 1000);
}

// Play the game function
function playGame(userChoice) {
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  let resultText = '';
  const resultElement = document.getElementById('resultText');

  document.getElementById(computerChoice.toLowerCase()).classList.add('computer-selected');

  if (userChoice === computerChoice) {
      resultText = "Draw!";
      resultElement.className = 'draw';
  } else if (
      (userChoice === 'ROCK' && computerChoice === 'SCISSORS') ||
      (userChoice === 'PAPER' && computerChoice === 'ROCK') ||
      (userChoice === 'SCISSORS' && computerChoice === 'PAPER')
  ) {
      score++;
      resultText = "You Win!";
      resultElement.className = 'win';
  } else {
      resultText = "You Lose!";
      resultElement.className = 'lose';
  }
  totalGames++;
  resultElement.textContent = resultText;
  document.getElementById('score').textContent = `Score: ${score} out of ${totalGames}`;
}

// Reset the game for another round
function resetGame() {
    clearInterval(countdownInterval);
    document.getElementById('choiceText').textContent = '';
    document.getElementById('resultText').textContent = '';
    document.getElementById('resultText').className = '';
    choices.forEach(choice => {
        const choiceId = choice.toLowerCase();
        document.getElementById(choiceId).classList.remove('selected', 'computer-selected', 'draw');
    });
    userSelectedChoice = null;
     // Re-enable the playHandButton
     document.getElementById("playHandButton").disabled = false;
}

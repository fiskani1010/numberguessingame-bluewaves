document.addEventListener('DOMContentLoaded', function () {
    const minNumber = 1;
    const maxNumber = 100;
    let targetNumber;
    let attempts;
    let timerInterval;
    let timerSeconds = 60; // Set the timer duration in seconds

    const setBackgroundImage = () => {
        const randomIndex = Math.floor(Math.random() * 4) + 1; // Random number between 1 and 4
        document.body.style.backgroundImage = `url('backgrounds/${randomIndex}.jpg')`;
    }

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const startTimer = () => {
        timerInterval = setInterval(() => {
            timerSeconds--;
            updateTimerDisplay();

            if (timerSeconds === 0) {
                clearInterval(timerInterval);
                endGame('Time is up! You ran out of time.');
            }
        }, 1000);
    }

    const updateTimerDisplay = () => {
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        const timerDisplay = document.getElementById('timer');
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const startNewGame = () => {
        targetNumber = getRandomNumber(minNumber, maxNumber);
        attempts = 0;
        timerSeconds = 60; // Reset timer duration
        setBackgroundImage();
        document.getElementById('result').innerHTML = '';
        document.getElementById('guessInput').value = ''; // Clear input field
        clearInterval(timerInterval); // Clear any existing timer interval
        startTimer(); // Start the timer
        updateTimerDisplay(); // Update timer display initially
    }

    const endGame = (message) => {
        clearInterval(timerInterval);
        document.getElementById('result').innerHTML = message;
        document.getElementById('result').classList.add('error');
    }

    const checkGuess = () => {
        const guess = parseInt(document.getElementById('guessInput').value);
        const resultElement = document.getElementById('result');

        resultElement.classList.remove('success', 'error');

        if (isNaN(guess) || guess < minNumber || guess > maxNumber) {
            resultElement.innerHTML = 'Please enter a valid number between 1 and 100.';
        } else {
            attempts++;

            if (guess === targetNumber) {
                endGame(`Congratulations! You guessed the number ${targetNumber} in ${attempts} attempts.`);
                resultElement.classList.add('success');
                clearInterval(timerInterval); // Stop the timer when correct guess is made
            } else if (guess < targetNumber) {
                resultElement.innerHTML = 'Too low! Try a higher number.';
                resultElement.classList.add('error');
            } else {
                resultElement.innerHTML = 'Too high! Try a lower number.';
                resultElement.classList.add('error');
            }
        }
    }

    const guessButton = document.getElementById('guessButton');
    guessButton.addEventListener('click', checkGuess);

    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', startNewGame);

    startNewGame();
});

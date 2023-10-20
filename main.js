let randomNumber = parseInt(Math.random() * 100 + 1);

const submitButton = document.querySelector('#submit-btn');
const userInput = document.querySelector('#guess-field');
const previousGuesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.last-result');
const lowOrHigh = document.querySelector('.LowOrHigh');
const startOver = document.querySelector('.Result-Area');

const paragraph = document.createElement('p');

let prevGuess = []
let numberOfAttempts = 1;

let playGame = true;
if(playGame){
    submitButton.addEventListener('click', (event) => {
        event.preventDefault()
        const guessGame = parseInt(userInput.value);
        console.log(guessGame);
        validateGuess(guessGame)
    })
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please Enter Valid Number!')
    }
    else if(guess < 1){
        alert('Please Enter a Number More Than 1.')
    }
    else if(guess > 100){
        alert('Please Enter a Number Less Than 100.')
    }
    else{
        prevGuess.push(guess)
        if(numberOfAttempts === 11){
            displayGuess(guess)
            displayMessage(`Game Over!!! Last Random Number was: ${randomNumber}`)
            endGame()
        }
        else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage('You Guessed Right Number &#128516;')
        endGame()
    }
    else if(guess > randomNumber){
        displayMessage('You Guessed The Number is Too LOW..!')
    }
    else if(guess < randomNumber){
        displayMessage('You Guessed The Number is Too HIGH..!')
    }
}

function displayMessage(message){
    lowOrHigh.innerHTML = `<h2>${message}</h2>`
}

function displayGuess(guess){
    userInput.value = '';
    previousGuesses.innerHTML += `${guess}, `
    numberOfAttempts++;
    lastResult.innerHTML = `${11 - numberOfAttempts}`
}

function newGame(){
    const newGameButton = document.querySelector('#NewGame');
    newGameButton.addEventListener('click', (event) => {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numberOfAttempts = 1;
        previousGuesses.innerHTML = '';
        lastResult.innerHTML = `${11 - numberOfAttempts}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(paragraph)
        playGame = true;
    })
}

function endGame(){
    userInput.value = ''
    userInput.setAttribute('disabled','')
    paragraph.classList.add('button')
    paragraph.innerHTML = `<h2 id='NewGame'>New Game</h2>`;
    startOver.appendChild(paragraph)
    playGame = false;
    newGame()
}
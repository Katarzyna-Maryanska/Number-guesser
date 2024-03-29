// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI elements
const game = document.querySelector("#game"),
    minNum = document.querySelector(".min-num"),
    maxNum = document.querySelector(".max-num"),
    guessBtn = document.querySelector("#guess-btn"),
    guessInput = document.querySelector("#guess-input"),
    message = document.querySelector(".message");

//Assign UI min-max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event Listener

game.addEventListener("mousedown", function (e) {
    if (e.target.className === "play-again") {
        window.location.reload()
    }
});

//Listen for guess
guessBtn.addEventListener("click", function () {
    let guess = parseInt(guessInput.value);

    //validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, "red")
    }

    //check if won
    if (guess === winningNum) {
        //Game over -won

        gameOver(true, `${winningNum} is correct`, "green")

    } else {
        //Wrong number
        guessesLeft -=1;

        if (guessesLeft === 0) {
            //Game over -lost

            gameOver(false, `Game over. The correct number was ${winningNum}`);
        } else {
           //Game continues - answer wrong

            //Clear input
            guessInput.value = "";

            guessInput.style.borderColor = "red";
            setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, "red")
        }
    }
});

//Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = "green" : color = "red";

    //Disable input
    guessInput.disabled = true;
    //Change color
    guessInput.style.borderColor = color;
    message.style.color = color;
    //Set message
    setMessage(msg);

    //Play again
    guessBtn.value = "Play again";
    guessBtn.className += "play-again";
}

//Get winning num
function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Set message
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}


$ = document.querySelectorAll(".box");

// adding click event to all boxes
for(i = 1; i <= 9; i++){
    $[i-1].addEventListener("click", mainFunction);
}

document.querySelector(".reset-button-container").addEventListener("click", reset);

function mainFunction(e){
    if (checkForGameOver() === false){ //once game is over, so should be all clicks
        if (e.target.innerText !== ""){
            alert("Click Another Square!!!");
        }
        else{
            e.target.innerText = "X";
            if (checkForGameOver() === false){ //computer gets its turn only if the game isn't over after players turn
                setTimeout(computerTurn, 500);
                setTimeout(checkForGameOver, 501); //501 is provided to run checkForGameOver only after computerTurn
            }
        }
    }
}

//a function that randomly plays computers turn
//this is where the minimax happens
function computerTurn(){
    randomPosition = Math.floor(Math.random()*9);
    while ($[randomPosition].innerText !== "" && checkForGameOver() === false){
        randomPosition = Math.floor(Math.random()*9);
    }
    $[randomPosition].innerText = "O";
}

//function to check if game is over. But I think it can be written more easily.
function checkForGameOver(){
    var tempText = [];
    for(i = 1; i <= 9; i++){
        tempText[i] = $[i-1].innerText;
    }
    if (tempText[1] === tempText[2] && tempText[2] === tempText[3] && tempText[1] !== ""){
        document.querySelector(".win-message").innerText = tempText[1] + " Wins!!";
        return true;
    }
    else if (tempText[4] === tempText[5] && tempText[5] === tempText[6] && tempText[4] !== ""){
        document.querySelector(".win-message").innerText = tempText[4] + " Wins!!";
        return true;
    }
    else if (tempText[7] === tempText[8] && tempText[8] === tempText[9] && tempText[7] !== ""){
        document.querySelector(".win-message").innerText = tempText[7] + " Wins!!";
        return true;
    }
    else if (tempText[1] === tempText[4] && tempText[4] === tempText[7] && tempText[1] !== ""){
        document.querySelector(".win-message").innerText = tempText[1] + " Wins!!";
        return true;
    }
    else if (tempText[2] === tempText[5] && tempText[5] === tempText[8] && tempText[2] !== ""){
        document.querySelector(".win-message").innerText = tempText[2] + " Wins!!";
        return true;
    }
    else if (tempText[3] === tempText[6] && tempText[6] === tempText[9] && tempText[3] !== ""){
        document.querySelector(".win-message").innerText = tempText[3] + " Wins!!";
        return true;
    }
    else if (tempText[1] === tempText[5] && tempText[5] === tempText[9] && tempText[1] !== ""){
        document.querySelector(".win-message").innerText = tempText[1] + " Wins!!";
        return true;
    }
    else if (tempText[3] === tempText[5] && tempText[5] === tempText[7] && tempText[3] !== ""){
        document.querySelector(".win-message").innerText = tempText[3] + " Wins!!";
        return true;
    }
    //if none of above, which is for win only, is true, check for draw which can be done by filtering the remaining blank squares. If no squares are lest, then game is a draw else the game isn't over yet.
    else{
        arrayOfBlankCharacters = tempText.filter(element => {
            return (element === "");
        });

        if (arrayOfBlankCharacters.length === 0){
            document.querySelector(".win-message").innerText = "Game Drawn!!";
            return true;
        }
        else{
            return false;
        }
    }
}

//a function that resets the board and win message.
function reset(){
    for(i = 1; i <= 9; i++){
        $[i-1].innerText = "";
    }
    document.querySelector(".win-message").innerText = "";
}
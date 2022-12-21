$ = document.querySelectorAll(".box");

// adding click event to all boxes
$.forEach(element => {
    element.addEventListener("click", mainFunction);
});

document.querySelector(".reset-button-container").addEventListener("click", reset);

function mainFunction(e){
    if (checkForGameOver() === undefined){

        //once game is over, so should be all clicks
        if (e.target.innerText !== ""){
            alert("Click Another Square!!!");
        }
        else{
            e.target.innerText = "X";
            if (checkForGameOver() === undefined){ //computer gets its turn only if the game isn't over after player's turn
                setTimeout(computerTurn, 500);
                setTimeout(displayWinMessage, 501); //display win message for computer
            }
            displayWinMessage(); //display Win Message, necessary for player
        }
    }
}

//a function that randomly plays computers turn
//this is where the first minimax is
function computerTurn(){
    let board = getBoard();
    let depth = 1, bestScore = Infinity, bestMove;
    
    for(let i = 0; i < 9; i++){
        if (board[i] === ""){
            board[i] = "O";
            let score = minimax(board, true, depth+1);
            board[i] = "";
            if (score < bestScore){
                bestScore = score;
                bestMove = i;
            }
        }
    }
    board[bestMove] = "O"; //computer making the move
    //displaying the move in the screen
    // for(let i = 0; i < 9; i++){
    //     $[i].innerText = board[i];
    // }
    board.forEach((element, index) => {
        $[index].innerText = element;
    });
}

//minimax function
function minimax(position, maximizing, depth){

    // if checkForGameOver() === undefnied, game is not over
    if (checkForGameOver(position) !== undefined){

        if (checkForGameOver(position) === null){
            return 0;
        }
        else if(checkForGameOver(position) === "X"){
            return 1;
        }
        else if(checkForGameOver(position) === "O"){
            return -1;
        }
    }

    //for maximizing player
    if(maximizing === true){
        let bestScore = -Infinity;
        for(let i = 0; i < 9; i++){
            if(position[i] === ""){
                position[i] = "X";
                let score = minimax(position, false, depth+1);
                position[i] = "";
                if (score > bestScore){
                    bestScore = score;
                }
            }
        }
        return bestScore;
    }
    //for minimizing player
    else if(maximizing === false){
        let bestScore = Infinity;
        for(let i = 0; i < 9; i++){
            if(position[i] === ""){
                position[i] = "O";
                let score = minimax(position, true, depth+1);
                position[i] = "";
                if (score < bestScore){
                    bestScore = score;
                }
            }
        }
        return bestScore;
    }
}

//this function provides the current status of a board whenever called.
function getBoard(){
    let board = [];
    $.forEach((element, index) => {
        board[index] = element.innerText;
    });
    return board;
}

//function that returns undefined if game is to continue, null if game drawn and the winner if anybody wins
function checkForGameOver(position){
    let board = [];
    //if position available, check winner from position, else from board;
    if(position === undefined){
        board = getBoard();
    }
    else{
        board = position;
    }
    //available spot on the board, if none and the game is not won, its a draw
    let availableSpot = board.filter((element)=>{
        return element === "";
    })

    //wining conditions
    if (board[0] === board[1] && board[1] === board[2] && board[0] !== ""){
        return board[0];
    }
    else if (board[3] === board[4] && board[4] === board[5] && board[3] !== ""){
        return board[3];
    }
    else if (board[6] === board[7] && board[7] === board[8] && board[6] !== ""){
        return board[6];
    }
    else if (board[0] === board[3] && board[3] === board[6] && board[0] !== ""){
        return board[0];
    }
    else if (board[1] === board[4] && board[4] === board[7] && board[1] !== ""){
        return board[1];
    }
    else if (board[2] === board[5] && board[5] === board[8] && board[2] !== ""){
        return board[2];
    }
    else if (board[0] === board[4] && board[4] === board[8] && board[0] !== ""){
        return board[0];
    }
    else if (board[2] === board[4] && board[4] === board[6] && board[2] !== ""){
        return board[2];
    }
    else{
        if (availableSpot.length !== 0){
            return //undefined return means continue to play
        }
        else {
            return null; //null return means game is drawn
        }
    }
}

//function that will display win message. 
function displayWinMessage(){
    if (checkForGameOver() === null){ //null return means the game is drawn
        document.querySelector(".win-message").innerText = "Game Drawn!!"
    }
    else if(checkForGameOver() === "X" || checkForGameOver() === "O"){
        document.querySelector(".win-message").innerText = checkForGameOver() + " Wins!!";
    }
}

//a function that resets the board and win message.
function reset(){
    $.forEach(element => {
        element.innerText = "";
    });
    document.querySelector(".win-message").innerText = "";
}

let boxes = document.querySelectorAll(".cell");
let resetButton = document.querySelector(".resetbtn");
let newbtn = document.querySelector(".newgame");
let winmsg = document.querySelector("#msg");
let msgcontainer = document.querySelector(".msg-container");
let newclass = document.querySelector(".newclass");


window.addEventListener('load', app);

let game = ['', '', '', '', '', '', '', '', '']; 
let turn0 = 0; // Keeps track if X or O player's turn
let winner = null;
let clickcount = 0;
let currentplayer = "X";

// CREATE PLAYER
const player = (name) => {
  name = name;
  return {name};
 };

 let playerX = player("");
 let playerO = player("");

 // INITIALIZE APP
function app() {
  let inputField = document.querySelector('.input-field').focus();

  const addPlayerForm = document.getElementById('player-form');
  addPlayerForm.addEventListener('submit', addPlayers);
}

// Add PLAYERS
function addPlayers(event) {
  event.preventDefault();

  if (this.player1.value === '' || this.player2.value === '') {
    alert('You Must Enter a Name for Each Field');
    return;
  }

  const playerFormContainer = document.querySelector('.enter-players');
  const boardMain = document.querySelector('.maincontent');
  playerFormContainer.classList.add('hide-container');
  boardMain.classList.remove('hide-container');
;

  playerX.name = this.player1.value;
  playerO.name = this.player2.value;
  document.querySelector(".playerturn").innerText = `${playerX.name}, you are up!`;

checkWinner();
}
function handleclick(cellIndex){

game[cellIndex]= currentplayer;
clickcount++;
checkWinner();
// update the UI


// check for draw
if (!winner && clickcount === 9) {
    alert('Game over a tie');
    resetgame();
    return;
}
}

const winPatter = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetgame = () => {
    clickcount = 0;
    turn0 = 0;
    winner = null;
    enableBoxes();
    document.querySelector(".playerturn").innerText = `${playerX.name}, you are up!`;
    msgcontainer.classList.add("hide");  
}

boxes.forEach((cell) => {
    cell.addEventListener("click", () =>{
        if (turn0) {
            document.querySelector(".playerturn").innerText = `${playerX.name}, you are up!`;
            cell.innerText = "O"
            turn0 = false;
            cell.style.color = "white";

        }else{
            document.querySelector(".playerturn").innerText = `${playerO.name}, you are up!`;
            cell.innerText= "X"
            turn0 = true;
            cell.style.color = "yellow";
        }
        cell.disabled = true;

        checkWinner ();
        handleclick();
    });
});

const disableBoxes = () => {
    for(let cell of boxes){
        cell.disabled= true;
    }
} 

const enableBoxes = () => {
    for(let cell of boxes){
        cell.disabled= false;
        cell.innerText = "";
    }
} 



const showwinner = (winner) => {
    if(winner === "X"){
    msg.innerText = `Congratulations, Winner is ${playerX.name}!`;
    msgcontainer.classList.remove("hide");
    document.querySelector(".playerturn").innerText = "Board is Below";
    disableBoxes(); 
    
    }
    if(winner=== "O"){
        msg.innerText = `Congratulations, Winner is ${playerO.name}!`;
        document.querySelector(".playerturn").innerText = "Board is Below";
    msgcontainer.classList.remove("hide");
    disableBoxes(); 
    }
}





const checkWinner = () => {
    for(let pattern of winPatter){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if (pos1val === pos2val && pos2val === pos3val){
                winner = pos1val;
                showwinner(pos1val);
                return;
            }
        };
 };
};

newbtn.addEventListener("click", resetgame);
resetButton.addEventListener("click", resetgame);

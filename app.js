// Yatzy has 5 dice
// 3 throws per turn
// Players can hold on to dice before new throws
// Turns can be ended before all throws are used
// Players can pick where to store turn result
// Turn passes in circle fashion between players (top to bottom of list and back to top)
// UI Vars
// List of players
const players = [];
// Game buttons
const throwButton = document.getElementById("throw"),
endTurnBtn = document.getElementById("endTurn");
      
// Event listeners
// Add player
document.getElementById("playerform").addEventListener("submit", addPlayer)

// Start the game
document.getElementById("start").addEventListener("click", startGame, {once: true});


function addPlayer(e) {
  e.preventDefault();
  let board = document.querySelector('.mainBoard');
  let name = document.getElementById("name").value;
  
  // validate length
  if (name.length === 0) {
    return;
  }
  if (name.length > 3) {
    name = name.slice(0,3);
  }
  // add player to game
  // max 6 players
  if (players.length !== 6) {
    let player = new Player(name);
    players.push(player);

    // Add player rows to game sheet
    let insertDiv = document.getElementById("playerInsert"),
    DOMString = `<div class="playerList two columns" id="${name}${players.length - 1}">
    <h6>${name}</h6>
    <ul>
    <li class="${name}${players.length - 1} 1"></li>
    <li class="${name}${players.length - 1} 2"></li>
    <li class="${name}${players.length - 1} 3"></li>
    <li class="${name}${players.length - 1} 4"></li>
    <li class="${name}${players.length - 1} 5"></li>
    <li class="${name}${players.length - 1} 6"></li>
    <li class="${name}${players.length - 1} bonus"></li>
    <li class="${name}${players.length - 1} onePair"></li>
    <li class="${name}${players.length - 1} twoPair"></li>
    <li class="${name}${players.length - 1} threeKind"></li>
    <li class="${name}${players.length - 1} fourKind"></li>
    <li class="${name}${players.length - 1} house"></li>
    <li class="${name}${players.length - 1} chance"></li>
    <li class="${name}${players.length - 1} yatzy"></li>
    <li class="${name}${players.length - 1} sum"></li>
    </ul>
    </div>`;
    
    // insertDiv
    insertDiv.innerHTML += DOMString;
  }
  // add button to start game
  const button = document.getElementById("start")
        button.removeAttribute("style");
        
        // clear input field
        let text = document.getElementById("name");
        text.value = "";
        // Show board when there are players
        board.removeAttribute("style");
      }
      

// Start game
function startGame() {
// enable throw button, pass to turn manager
throwButton.removeAttribute("disabled");

for (i = 0; i < players.length; i++) {
  players[i].id = i
  players[i].max = players.length
}
  // give players a board
  players.forEach(item => item.gameBoard = Gameboard.fiveDie())
  

  // remove player submit form
  let form = document.getElementById("playerform");
  form.removeEventListener("submit", addPlayer)
  form.style.display = "none";

  turnManager()
  
}

function turnManager(e, playerID = 0) {
  let currentPlayer = players[playerID]

  // Reset buttons at beginning of turn
  if (!throwButton.classList.contains("button-primary")) {
    throwButton.classList.add("button-primary");
    throwButton.removeAttribute("disabled")
    endTurnBtn.classList.remove("button-primary");
    
  }

  // Player takes first turn
  function firstThrow(e) {
    currentPlayer.takeTurn(e, 1, 2);

      //Allow turn to end from here on 
      // end turn event
      endTurnBtn.addEventListener('click', endButton)
  }

  function endButton() {
    // remove eventlisteners on throwbutton
    throwButton.removeEventListener('click', firstThrow, {once: true})
    throwButton.removeEventListener('first', secondThrow, {once: true})
    throwButton.removeEventListener('second', thirdThrow, {once: true})
    
    // UI show button as disabled
    throwButton.setAttribute("disabled", "");
    throwButton.classList.remove("button-primary");
    // wait for player to insert values
    currentPlayer.scoreRefactor();
    endTurnBtn.removeEventListener('click', endButton)
  }
  
  // second throw
  function secondThrow(e) {
    currentPlayer.takeTurn(e, 2, 1)
  }
  // third throw
  function thirdThrow(e) {
    currentPlayer.takeTurn(e, 3, 0);
    throwButton.setAttribute("disabled", "");
    throwButton.classList.remove("button-primary");
    endTurnBtn.classList.add("button-primary");

    currentPlayer.scoreRefactor();
  }
  // listen for throws
    throwButton.addEventListener('click', firstThrow, {once: true})
    throwButton.addEventListener('first', secondThrow, {once: true})
    throwButton.addEventListener('second', thirdThrow, {once: true})

  // when turn ends
  document.addEventListener("endofturn", endOfTurn, {once: true});

  function endOfTurn(e) {
    console.log(playerID);
     // if game is not over, pass to next player
    if (isGameOver() === false) {
      // if player is final player, give turn back to first player
      playerID === (players.length-1) ? playerID = 0 : playerID++
      console.log(e)
      console.log(playerID)
      turnManager(e, playerID)
    } 

    if (isGameOver === true) {
      // end game functions here
    }
  }

}
  
// IS GAME OVER?
function isGameOver() {
  document.removeEventListener("endofturn", isGameOver);

  console.log("gotcha")
  let state;
  players.forEach(player => {
    for (let entry in player.gameBoard) {
      // bonus gets calculated on its own
      if (entry === 'bonus') {
        continue;
      }
      // if there are empty squares, game is not over
      if (player.gameBoard[entry] === "") {
        state  = false
        return;
      }
      // no empty squares, game is over
      state = true;
    }
  })

  if (state === false) {
    throwButton.removeAttribute("disabled")
  }
  return state;
}





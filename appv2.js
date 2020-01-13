import UI from './ui.js'
import Player from './playerv2.js'
import Gameboard from './gameboard.js'
import Conditionals from './conditionalsv2.js';
// UI
const ui = new UI();
// Players
let players = [];
// Gameboard
const gameBoard = Gameboard.fiveDie()

// Event listeners
// Add player event
ui.submitPlayerBtn.addEventListener('click', addPlayer);
// Start game event
ui.startGameBtn.addEventListener('click', startGame);


function addPlayer(e) {
  e.preventDefault();
  let name = ui.playerNameInput.value;
  // Name must have one character
  if (name.length === 0) {
    ui.sendMessage('Names must have characters')
    return;
  }
  // If name overflows, set to 4
  if (name.length > 4) {
    name = name.slice(0,4);
  }
  // Create new player, assign ID and board
  const player = new Player(name, players.length, gameBoard)
  // Put player in array
  players.push(player)

  // Insert player to UI
  ui.insertPlayers(name, players.length-1);
  // Show game board
  ui.showGameBoard();
  // Show start game button
  ui.showStartBtn();

  // First throw event
  ui.startGameBtn.addEventListener('click', turnManager.bind(player), {once: true});
  // End turn event
  // ui.endTurnBtn.addEventListener('click', finalizeTurn, {once: true})
} 


function startGame() {
  console.log("hello")
  ui.sendMessage(`${players[0].playerName}'s turn!`)
  // Hide player entry form
  ui.hideForm();
  // Show dice and turn buttons
  ui.showGameControls();

  // Start first turn with first player
  turnManager.bind(players[0])
}

function turnManager(e) {

  // Message whose turn it is
  ui.sendMessage(`${this.playerName}'s Turn!`);
  // Clear dice
  ui.removeDiceFace();
  ui.clearDiceValues();
  // Clear selected dice
  ui.clearSelected();
  const turnOne = firstTurn.bind(this),
        turnTwo = secondTurn.bind(this),
        turnThree = thirdTurn.bind(this),
        turnFinal = finalizeTurn.bind(this);
  // Event listeners
  // First turn
  ui.throwBtn.addEventListener('click', turnOne, {once: true})
  // Second turn
  ui.throwBtn.addEventListener('EndOfFirst', turnTwo)
  // Third turn
  ui.throwBtn.addEventListener('EndOfSecond', turnThree)

     // First turn
    function firstTurn(e) {
      // Roll dice
      const hand = this.roll()
  
      // Add hand to player
      this.hand = hand;
      // Update UI with dice
      ui.displayDiceValues(hand)
      // Set dice image
      ui.setDiceFace()
      // Add hold dice event listeners
      ui.diceHold();
      // Add second throw event listener
      ui.throwBtn.addEventListener('click', dispatchFirst, {once: true})
      // End turn button
      ui.endTurnBtn.addEventListener('click', turnFinal);
      // Remove event listener
    }
  
    // Second throw
    function secondTurn(e) {
      console.log("second")
      let hand = updateDice(this);
      // Update ui
      ui.displayDiceValues(hand)
      // Remove old dice face
      ui.removeDiceFace()
      // Set dice image
      ui.setDiceFace()
      // Remove Event listener
      ui.throwBtn.removeEventListener('EndOfFirst', turnTwo)
      ui.throwBtn.addEventListener('click', dispatchSecond);

    }
  
    // Third throw
    function thirdTurn(e) {
      console.log("third")
      let hand = updateDice(this);
      // Update ui
      ui.displayDiceValues(hand)
      // Remove old dice face
      ui.removeDiceFace()
      // Set dice image
      ui.setDiceFace()

      
      // Remove event listeners
      ui.throwBtn.removeEventListener("EndOfSecond", turnThree)
      ui.throwBtn.removeEventListener("click", dispatchSecond)
      
      turnFinal(this);
    }

    // Finalizes turn, ready to put score in board
    function finalizeTurn(e) {
      // Remove end turn event
      ui.endTurnBtn.removeEventListener('click', turnFinal);
      // Current player ID for field matching
      const ID = `${this.playerName}${this.id}`
      console.log("turn ended")
      // Conditional logic
      const conditionals = new Conditionals();
      // Final hand
      const handToEval = conditionals.currentHand(this.hand);
      // Get options 
      const options = conditionals.testConditions(handToEval, this.gameBoard);
      // Show available options in UI
      for (let i in options) {
        ui.showSelectionFields(ID, i, options[i])
      }
      // Parent element
      const parentElement = document.querySelector(`#${ID}`)
      // Add event listener to parentElement
      // Needs to persist, find a variable
      parentElement.addEventListener('click', placeValue);
    }


}
// Update player hand
function updateDice(player) {
  let hand;
  // Grab selected dice
  ui.dice.forEach(die => {
    // Dice is selected, add to hold
    if (die.classList.contains("selected")) {
      let i = die.classList[1];
      // Add die to hold
      player.hold[i] = parseInt(die.innerHTML)
    }
  })
  
  // New roll
  hand = player.roll();
  // merge new roll with held hand
  for (let die in player.hold) {
    hand[die] = player.hold[die];
  }
  // New hand
  player.hand = hand
  // Clear held hand
  player.clearHeldHand()
  return hand;
}
// Insert value
function placeValue(e) {
  // Player ID
  const ID = e.target.classList[0];
  // Current player
  const curPlayer = players[ID.slice(-1)];
  // Name of clicked field
  const field = e.target.classList[1];
  // User selects available option
  if (e.target.classList.contains("selected-field")) {
    // Remove Event listener
    const value = parseInt(e.target.innerHTML)
    e.target.parentElement.removeEventListener('click', placeValue)
    // Add value to player's board
    curPlayer.gameBoard[field] = value;
    // Clear selected field color
    ui.removeSelectedFromFields();
    // Remove all temporary values from UI
    ui.removeTempValues(curPlayer.gameBoard, ID);
    // Check for bonus
    if (checkForBonus(curPlayer.gameBoard)) {
      ui.setbonus(ID)
    }
    // Pass turn to next player
    passTurn(curPlayer);
    
  }
}
// Passes turn to next player
function passTurn(player) {
  // Player to pass turn from
  const curPlayer = player,
        firstPlayer = players[0],
        lastPlayer = (players.length-1),
        id = curPlayer.id;
    let nextTurn;

        // Check if ID is last in array
        if (id === lastPlayer) {
          console.log("beginning")
          // Start from beginning
          nextTurn = turnManager.bind(firstPlayer)
          nextTurn()
        } else {
          // Increment ID by one, pass to turnManager
          nextTurn = turnManager.bind(players[id+1])
          nextTurn();
        }

}

// End of first turn event
function dispatchFirst() {
  const event = new Event('EndOfFirst');
  ui.throwBtn.dispatchEvent(event);
}

// End of second turn event
function dispatchSecond() {
  const event = new Event('EndOfSecond')
  ui.throwBtn.dispatchEvent(event);
}

function checkForBonus(gameboard) {
  // Check if gameboard grants bonus
  const one = parseInt(gameboard[1]),
        two = parseInt(gameboard[2]),
        three = parseInt(gameboard[3]),
        four = parseInt(gameboard[4]),
        five = parseInt(gameboard[5]),
        six = parseInt(gameboard[6])

  let sum = one + two + three + four + five + six;

  if (gameboard.bonus !== false && sum >= 63) {
    // add bonus to board
    gameboard.bonus = 50;
    // add bonus to UI
    return true;
  } else {
    return false
  }
  // Update UI to reflect change

}
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

  console.log(players)
  // Insert player to UI
  ui.insertPlayers(name, players.length-1);
  // Show game board
  ui.showGameBoard();
  // Show start game button
  ui.showStartBtn();

  // First throw event
  ui.throwBtn.addEventListener('click', turnManager.bind(player), {once: true});
  // End turn event
  ui.endTurnBtn.addEventListener('click', finalizeTurn, {once: true})
} 


function startGame() {
  console.log("hello")
  ui.sendMessage(`${players[0].playerName}'s turn!`)
  // Hide player entry form
  ui.hideForm();
  // Show dice and turn buttons
  ui.showGameControls();
}

function turnManager(e) {
  let player = this;
  let event;

  const turnOne = firstTurn.bind(this);
  const turnTwo = secondTurn.bind(this);
  const turnThree = thirdTurn.bind(this);
  const turnFinal = finalizeTurn.bind(this);
  // console.log(turnOne)
  // Event listeners

  // First turn
  turnOne()
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
      console.log(this)
  
      // Add second throw event listener
      ui.throwBtn.addEventListener('click', dispatchFirst, {once: true})
      // End turn button
      ui.endTurnBtn.addEventListener('click', finalizeTurn)
    }
  
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
  
    function thirdTurn() {
      console.log("third")
      let hand = updateDice(this);
      // Update ui
      ui.displayDiceValues(hand)
      // Remove old dice face
      ui.removeDiceFace()
      // Set dice image
      ui.setDiceFace()

      turnFinal(this);
      
      // Remove event listeners
      ui.throwBtn.removeEventListener("EndOfSecond", turnThree)
      ui.throwBtn.removeEventListener("click", dispatchSecond)
    }

}

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




// Finalizes turn, ready to put score in board
function finalizeTurn(e) {
  const ID = `${this.playerName}${this.id}`
  console.log(this);
  console.log("turn ended")
  // Conditional logic
  const conditionals = new Conditionals();
  // Final hand
  const handToEval = conditionals.currentHand(this.hand);
  // Get options 
  const options = conditionals.testConditions(handToEval, this.gameBoard);

  // Show available options in UI
  console.log(options);
  for (let i in options) {
    console.log(i)
    ui.insertSelectionFields(ID, i)
  }
  // Add eventlistener to parentElement
  console.log(this)
  
}

// Passes turn to next player
function passTurn(e) {

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
import UI from './js/ui.js'
import Player from './js/player.js'
import Gameboard from './js/gameboard.js'
import Conditionals from './js/conditionals.js';
// UI
const ui = new UI();
// Players list
let players = [];

// Event listeners
// Add player event
ui.submitPlayerBtn.addEventListener('click', addPlayer);
// Start game event
ui.startGameBtn.addEventListener('click', startGame, {once: true});
// Add players to the game
function addPlayer(e) {
  e.preventDefault();
  if (players.length === 9) {
    ui.sendMessage('Maximum player limit reached!', 3000)
    return;
  }
  let name = ui.playerNameInput.value.toUpperCase();
  // Name must have one character
  if (name.length === 0) {
    ui.sendMessage('Names must have characters', 3000)
    return;
  }
  // If name overflows, set to 4
  if (name.length > 4) {
    name = name.slice(0,4);
  }
  // Create new player, assign ID and board
  const player = new Player(name, players.length, Gameboard.fiveDie())
  // Put player in array
  players.push(player)
  // First player added
  if (players.length === 1) {
  const boundTurn = turnManager.bind(players[0]);
  // First throw event
  ui.startGameBtn.addEventListener('click', boundTurn, {once: true});
    }
  // Clear input field
  ui.clearFormInput();
  // Insert player to UI
  ui.insertPlayers(name, players.length-1);
  // Show game board
  ui.showGameBoard();
  // Show start game button
  ui.showStartBtn();
} 

// Runs once when game starts
function startGame(e) {
  e.preventDefault();
  // Hide play again button
  ui.hideReset();
  // Hide player entry form
  ui.hideForm();
  // Show dice and turn buttons
  ui.showGameControls();
}
// Handles a player's turn
function turnManager() {
  // Message whose turn it is
  ui.sendMessage(`${this.playerName}'s Turn!`, 2000);
  // Clear dice
  ui.removeDiceFace();
  ui.clearDiceValues();
  // Clear selected dice
  ui.clearSelected();
  const turnOne = firstTurn.bind(this),
        turnTwo = secondTurn.bind(this),
        turnThree = thirdTurn.bind(this),
        turnFinal = finalizeTurn.bind(this),
        sacrifice = sacrificeSpace.bind(this);
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
      ui.throwBtn.addEventListener('click', dispatchFirst)
      // End turn button
      ui.endTurnBtn.addEventListener('click', turnFinal);
      // Remove event listener
    }
  
    // Second throw
    function secondTurn(e) {
      let hand = updateDice(this);
      // Update ui
      ui.displayDiceValues(hand)
      // Remove old dice face
      ui.removeDiceFace()
      // Set dice image
      ui.setDiceFace()
      // Remove Event listener
      ui.throwBtn.removeEventListener('EndOfFirst', turnTwo);
      ui.throwBtn.removeEventListener('click', dispatchFirst);
      ui.throwBtn.addEventListener('click', dispatchSecond);

    }
  
    // Third throw
    function thirdTurn(e) {
      let hand = updateDice(this);
      // Update ui
      ui.displayDiceValues(hand)
      // Remove old dice face
      ui.removeDiceFace()
      // Set dice image
      ui.setDiceFace()
      // Finalize turn
      turnFinal(this);
    }

    // Finalizes turn, ready to put score in board
    function finalizeTurn(e) {
      // Remove end turn event
      ui.endTurnBtn.removeEventListener('click', turnFinal);
      ui.throwBtn.removeEventListener('EndOfFirst', turnTwo)
      ui.throwBtn.removeEventListener('EndOfSecond', turnThree)
      ui.throwBtn.removeEventListener('click', dispatchFirst)
      ui.throwBtn.removeEventListener('click', dispatchSecond)
      // Current player ID for field matching
      const ID = `${this.playerName}${this.id}`
      // Conditional logic
      const conditionals = new Conditionals();
      // Final hand
      const handToEval = conditionals.currentHand(this.hand);
      // Get options 
      const options = conditionals.testConditions(handToEval, this.gameBoard);
      // Parent element
      const parentElement = document.querySelector(`#${ID}`)

      // Evaluate length of available options
      const length = Object.keys(options).length;
      if (length === 0) {
        // Add sacrifice options to UI
        ui.sacrificeFieldOptions(ID)
        // No options available, sacrifice a space
        parentElement.addEventListener('click', sacrifice);
      } else {
        // Show available options in UI
        for (let i in options) {
          ui.showSelectionFields(ID, i, options[i])
        }
        // Add event listener to parentElement
        // Needs to persist, find a variable
        parentElement.addEventListener('click', placeValue);
      }
    }

    // Player has no availabe options, sacrifices a space
    function sacrificeSpace(e) {
      // Get player ID
      const ID = `${this.playerName}${this.id}`,
            field = e.target.classList[1],
            curPlayer = players[ID.slice(-1)];
      // Click target is available for sacrifice, and is not bonus or sum
      if (e.target.classList.contains("sacrifice-field") && !e.target.classList.contains("sum") && !e.target.classList.contains("bonus")) {
        // Update player gameboard
        this.gameBoard[field] = 0;
        // Update UI
        e.target.innerHTML = 0;
        // Clear field colors
        ui.clearSacrificeFieldOptions();
        // remove event listener
        e.target.parentElement.removeEventListener('click', sacrifice);
        // Pass turn to next player
        passTurn(curPlayer)
      }
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
      player.hold[i] = parseInt(die.innerHTML);
    }
  })
  
  // New roll
  hand = player.roll();
  // merge new roll with held hand
  for (let die in player.hold) {
    hand[die] = player.hold[die];
  }
  // New hand
  player.hand = hand;
  // Clear held hand
  player.clearHeldHand();
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
    e.target.parentElement.removeEventListener('click', placeValue)
    // Add value to player's board
    const value = parseInt(e.target.innerHTML)
    curPlayer.gameBoard[field] = value;
    // Clear selected field color
    ui.removeSelectedFromFields();
    // Remove all temporary values from UI
    ui.removeTempValues(curPlayer.gameBoard, ID);
    // Check for bonus
    checkForBonus(curPlayer.gameBoard, ID);
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
    let nextTurn,
        gameState = isGameOver(players);

        // Check if game is over
        if (gameState === true) {
          return endGame(players);
        }
        // Check if ID is last in array
        if (id === lastPlayer) {
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
// Check if player has earned bonus
function checkForBonus(gameboard, id) {
  // Check if gameboard grants bonus
  const one = parseInt(gameboard[1]),
        two = parseInt(gameboard[2]),
        three = parseInt(gameboard[3]),
        four = parseInt(gameboard[4]),
        five = parseInt(gameboard[5]),
        six = parseInt(gameboard[6]);

  let sum = one + two + three + four + five + six;
  if (gameboard.bonus !== "" && sum >= 63) {
    // add bonus to board
    gameboard.bonus = 50;
    // add bonus to UI
    ui.setBonus(id, 50)
  } else {
    return;
  }

}
// Game over check
function isGameOver(playerArr) {
  // State of the game
  let state;
  // Check each player's arr
  playerArr.forEach(player => {
    for (let entry in player.gameBoard) {
      // skip Bonus field
      if (entry === "bonus" || entry === "sum") {
        continue;
      }
      if (player.gameBoard[entry] === "") {
        state = false;
        return state;
      } else {
        state = true;
      }
    }

  })
  return state;
}
// Game ends
function endGame(playerArr) {
  let winningSum = 0,
      winner;

  // Place total score in sum fields
  playerArr.forEach(player => {
    // Reset sum
    let sum = 0;
    for (let entry in player.gameBoard) {
      // handle empty bonus
      if (player.gameBoard[entry] === "") {
        player.gameBoard[entry] = 0
        // Add to UI

      }
      // Add sum together
      sum += parseInt(player.gameBoard[entry]);
    }
    // Add sum to gameboard
    player.gameBoard.sum = sum;
    // Update UI
    ui.setSum(`${player.playerName}${player.id}`, sum)
  })
  // Loop through players to find the highest score
  playerArr.forEach(player => {
    if (player.gameBoard.sum > winningSum) {
      // Set winner name
      winner = player.playerName;
      // Set winning sum
      winningSum = player.gameBoard.sum;
    }
  })
  // Declare a winner
  ui.sendMessage(`The winner is ${winner}, with a total of ${winningSum} points!`, 10000);

  // Hide player controls
  ui.hideGameControls();
  // Hide start game button
  ui.hideStartBtn();
  // Show player form
  ui.showForm();
  // Show play again button
  ui.showReset();
  // Play again event listener
  ui.playAgainBtn.addEventListener('click', restartGame, {once: true})

}

// Restart game after game over
function restartGame() {
  // Hide reset field
  ui.hideReset();
  // Show start game button
  ui.showStartBtn();
  // Reset game
  players.forEach(player => {
    // Clear out gameboard
    player.gameBoard = Gameboard.fiveDie();
  })
  // Clear fields from UI
  ui.clearAllGameBoards();
  // Bind first turn to first player
  const boundTurn = turnManager.bind(players[0]);
  // Set start game events
  ui.startGameBtn.addEventListener('click', boundTurn, {once: true})
  ui.startGameBtn.addEventListener('click', startGame, {once: true})

}
export default class UI {
  constructor() {
    this.mainboard = document.querySelector('.mainBoard')
    this.gameboard = document.querySelector('.gameboard');
    this.playerInsertDiv = document.getElementById("playerInsert");
    this.diceList = document.querySelector('.diceList');
    this.dice = document.querySelectorAll('.dice')
    this.throwBtn = document.getElementById("throw");
    this.endTurnBtn = document.getElementById("endTurn");
    this.submitPlayerBtn = document.getElementById("submit");
    this.startGameBtn = document.getElementById("start");
    this.playerNameInput = document.getElementById("name");
    this.messageBox = document.querySelector('.message-box');
    this.diceClassNames = ['one-face', 'two-face', 'three-face', 'four-face', 'five-face', 'six-face'],
    this.playerForm = document.querySelector('#playerform')
  }

  // Insert players in board
  insertPlayers(name, id) {
    // Add player rows to game sheet
    const DOMString = `<ul class="playerList" id="${name}${id}">
    <li>${name}</li>
    <li class="${name}${id} 1"></li>
    <li class="${name}${id} 2"></li>
    <li class="${name}${id} 3"></li>
    <li class="${name}${id} 4"></li>
    <li class="${name}${id} 5"></li>
    <li class="${name}${id} 6"></li>
    <li class="${name}${id} bonus"></li>
    <li class="${name}${id} onePair"></li>
    <li class="${name}${id} twoPair"></li>
    <li class="${name}${id} threeKind"></li>
    <li class="${name}${id} fourKind"></li>
    <li class="${name}${id} tinyStraight"></li>
    <li class="${name}${id} bigStraight"></li>
    <li class="${name}${id} house"></li>
    <li class="${name}${id} chance"></li>
    <li class="${name}${id} yatzy"></li>
    <li class="${name}${id} sum"></li>
    </ul>
    </div>`;

    // insert to UI
    this.playerInsertDiv.innerHTML += DOMString;
  }

  // At end of turn, show users their score options
  showSelectionFields(ID, option, value) {
    let field = document.querySelector(`[class="${ID} ${option}"]`);
    field.classList.add("selected-field");
    // Present value change to field
    field.innerHTML = value;
  }

  // Clear up UI after option is selected
  removeSelectedFromFields() {
    let fieldsToClear = document.querySelectorAll('.selected-field');
    fieldsToClear.forEach(field => field.classList.remove("selected-field"))
  }
  // Remove values from all temp fields
  removeTempValues(gameboard, id) {
    // Iterate through gameboard entries
    for (let entry in gameboard) {
      if (gameboard[entry] === "") {
        // Value was placeholder, remove it
        let field = document.querySelector(`[class="${id} ${entry}"]`)
        field.innerHTML = ""
      }

    }
  }


  // Display message to user
  sendMessage(message) {
    this.messageBox.innerHTML = message;
    this.messageBox.classList.remove("hidden")

    // Clear message after 2s
    setTimeout(() => {
      this.clearMessage()
    }, 2000)
  }
  // Clear message
  clearMessage() {
    this.messageBox.classList.add("hidden")
  }

  // Display functions
  // Display in-game buttons
  showGameControls() {
    this.throwBtn.classList.remove("hidden")
    this.endTurnBtn.classList.remove("hidden")
    this.diceList.classList.remove("hidden")
  }

  hideGameControls() {
    this.throwBtn.classList.add("hidden")
    this.endTurnBtn.classList.add("hidden")
    this.diceList.classList.add("hidden");
  }

  // Show 'start game' button
  showStartBtn() {
    // this.startGameBtn.style = "";
    this.startGameBtn.classList.remove("hidden");
  }
  // Hide 'start game' button
  hideStartBtn() {
    this.startGameBtn.classList.add("hidden");
  }
  // Show Gameboard
  showGameBoard() {
    // this.mainboard.style = "";
    this.mainboard.classList.remove("hidden")
  }

  // Hide the gameboard
  hideGameBoard() {
    // this.mainboard.style = "display: hidden;"
    this.mainboard.classList.add("hidden");
  }

  hideForm() {
    this.playerForm.classList.add("no-display");
  }

  showForm() {
    this.playerForm.classList.remove("no-display")
  }

  // UI State changes

  // Removes selected hue from player-list
  clearSelected() {
    const selectedItems = document.querySelectorAll('.selected')

    selectedItems.forEach(item => item.classList.remove("selected"));
  }

  // Inserting value into UI field
  insertValueToUI(option, playerId) {
    // All fields of current player
    const boardItems = document.querySelectorAll(`.${playerId}`);
    boardItems.forEach(item => {
      // Fields match name of option
      if (item.classList.contains(option)) {
        // insert value to field
        item.innerHTML = option;
      }
    })
  }

  displayDiceValues(hand) {
    // Loop through dice
    this.dice.forEach(die => {
      // Match hand values
      for (let dice in hand) {
        // Hand and dice matches?
        if (die.classList.contains(dice)) {
          // Add value to UI
          die.innerHTML = hand[dice];
        }
      }
    })
  }

  // Set dice selected
  setAsideDice(e) {
    if (e.target.classList.contains("dice")) {
      if (!e.target.classList.contains("selected")) {
        e.target.classList.add("selected");
      } else e.target.classList.remove("selected")
    }
  }

  diceHold() {
    this.diceList.addEventListener('click', this.setAsideDice)
  }

    // Assign dice icons
  setDiceFace() {
    const dice = this.dice,
          classNames = this.diceClassNames;
      // Assign correct dice face
      for (let die of dice) {
        // classNames.forEach(className => die.classList.contains(className) ? die.classList.remove(className) : '')
  
          switch (die.innerHTML) {
            case '1':
              die.classList.add("one-face");
              break;
            case '2':
              die.classList.add('two-face');
              break;
            case '3':
              die.classList.add('three-face');
              break;
            case '4':
              die.classList.add('four-face');
              break;
            case '5':
              die.classList.add('five-face');
              break;
            case '6':
              die.classList.add('six-face');
              break;
            default:
              break;
          }
        }
    }
  
    removeDiceFace() {
      const dice = this.dice,
            classNames = this.diceClassNames;
  
            // Remove all dice class names
            for (let die of dice) {
              classNames.forEach(className => die.classList.contains(className) ? die.classList.remove(className) : '')
            }
    }

    clearDiceValues() {
      for (let die of this.dice) {
        die.innerHTML = "";
      }
    }

    setBonus(id) {
      document.querySelector(`${id} bonus`).innerHTML = 50;
    }


}
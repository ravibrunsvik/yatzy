export default class UI {
  constructor() {
    this.header = document.querySelector("#header");
    this.mainboard = document.querySelector(".mainBoard");
    this.gameboard = document.querySelector(".gameboard");
    this.playerInsertDiv = document.getElementById("playerInsert");
    this.diceList = document.querySelector(".diceList");
    this.dice = document.querySelectorAll(".dice");
    this.throwBtn = document.getElementById("throw");
    this.endTurnBtn = document.getElementById("endTurn");
    this.submitPlayerBtn = document.getElementById("submit");
    this.startGameBtn = document.getElementById("start");
    this.playerNameInput = document.getElementById("name");
    this.messageBox = document.querySelector(".message-box");
    this.diceClassNames = [
      "one-face",
      "two-face",
      "three-face",
      "four-face",
      "five-face",
      "six-face",
    ];
    this.playerForm = document.querySelector("#playerform");
    this.playAgainBtn = document.querySelector("#reset");
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

  // Clear form input field
  clearFormInput() {
    this.playerNameInput.value = "";
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
    let fieldsToClear = document.querySelectorAll(".selected-field");
    fieldsToClear.forEach(field => field.classList.remove("selected-field"));
  }
  // Remove values from all temp fields
  removeTempValues(gameboard, id) {
    // Iterate through gameboard entries
    for (let entry in gameboard) {
      if (gameboard[entry] === "") {
        // Value was placeholder, remove it
        let field = document.querySelector(`[class="${id} ${entry}"]`);
        field.innerHTML = "";
      }
    }
  }

  // Clear gameboards after game end
  clearAllGameBoards() {
    const playerLists = document.querySelectorAll(".playerList");
    let IDs = [];
    playerLists.forEach(player => {
      IDs.push(player.id);
    });

    IDs.forEach(id => {
      document.querySelectorAll(`.${id}`).forEach(element => {
        element.innerHTML = "";
      });
    });
  }

  // Display message to user
  sendMessage(message, time) {
    this.messageBox.innerHTML = message;
    this.messageBox.classList.remove("hidden");

    // Clear message after 2s
    setTimeout(() => {
      this.clearMessage();
    }, time);
  }
  // Clear message
  clearMessage() {
    this.messageBox.classList.add("hidden");
  }

  // Display functions
  // Display in-game buttons

  hideHeader() {
    this.header.classList.add("no-display");
  }

  showHeader() {
    this.header.classList.remove("no-display");
  }

  showGameControls() {
    this.throwBtn.classList.remove("no-display");
    this.endTurnBtn.classList.remove("no-display");
    this.diceList.classList.remove("no-display");
  }

  hideGameControls() {
    this.throwBtn.classList.add("no-display");
    this.endTurnBtn.classList.add("no-display");
    this.diceList.classList.add("no-display");
  }

  // Show 'start game' button
  showStartBtn() {
    // this.startGameBtn.style = "";
    this.startGameBtn.classList.remove("no-display");
  }
  // Hide 'start game' button
  hideStartBtn() {
    this.startGameBtn.classList.add("no-display");
  }
  // Show Gameboard
  showGameBoard() {
    // this.mainboard.style = "";
    this.mainboard.classList.remove("no-display");
  }

  // Hide the gameboard
  hideGameBoard() {
    this.mainboard.classList.add("no-display");
  }

  hideForm() {
    this.playerForm.classList.add("no-display");
  }

  showForm() {
    this.playerForm.classList.remove("no-display");
  }

  showReset() {
    this.playAgainBtn.classList.remove("no-display");
  }

  hideReset() {
    if (!this.playAgainBtn.classList.contains("no-display"))
      this.playAgainBtn.classList.add("no-display");
  }

  // UI State changes
  sacrificeFieldOptions(id) {
    // Every field except bonus and sum
    const fieldList = document.querySelectorAll(`.${id}:not(.bonus):not(.sum)`);
    // Add "Selected" to all fields
    fieldList.forEach(field =>
      field.innerHTML === "" ? field.classList.add("sacrifice-field") : ""
    );
  }

  clearSacrificeFieldOptions() {
    const fieldList = document.querySelectorAll(".sacrifice-field");

    fieldList.forEach(field => {
      field.classList.remove("sacrifice-field");
    });
  }

  // Removes selected hue from player-list
  clearSelected() {
    const selectedItems = document.querySelectorAll(".selected");

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
    });
  }

  // Insert bonus
  setBonus(id, value) {
    document.querySelector(`.${id}+.bonus`).innerHTML = value;
  }

  // Insert final score
  setSum(id, sum) {
    // Get field by ID
    const field = document.querySelector(`.${id}+.sum`);
    // Insert to board
    field.innerHTML = sum;
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
    });
  }

  // Set dice selected
  setAsideDice(e) {
    if (e.target.classList.contains("dice")) {
      if (!e.target.classList.contains("selected")) {
        e.target.classList.add("selected");
      } else e.target.classList.remove("selected");
    }
  }

  diceHold() {
    this.diceList.addEventListener("click", this.setAsideDice);
  }

  // Assign dice icons
  setDiceFace() {
    const dice = this.dice;
    // Assign correct dice face
    for (let die of dice) {
      switch (die.innerHTML) {
        case "1":
          die.classList.add("one-face");
          break;
        case "2":
          die.classList.add("two-face");
          break;
        case "3":
          die.classList.add("three-face");
          break;
        case "4":
          die.classList.add("four-face");
          break;
        case "5":
          die.classList.add("five-face");
          break;
        case "6":
          die.classList.add("six-face");
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
      classNames.forEach(className => {
        die.classList.contains(className)
          ? die.classList.remove(className)
          : "";
      });
    }
  }

  triggerAnimation(timeout) {
    const dice = this.dice;

    for (let die of dice) {
      if (!die.classList.contains("selected")) {
        die.classList.add("animated");
        setTimeout(() => {
          die.classList.remove("animated");
        }, timeout);
      }
    }
  }

  clearDiceValues() {
    for (let die of this.dice) {
      die.innerHTML = "";
    }
  }
}

class Player {
  constructor(playerName) {
    this.playerName = playerName;
    this.options = {
      maxTurns: 3,
      turnCount: 1,
      previousHand: {}
    }
  }

   // Custom turn events
  dispatchFirst() {
    let throwBtn = document.querySelector("#throw")
    event = new Event('first');
    return throwBtn.dispatchEvent(event)
    
  }
  dispatchSecond() {
    let throwBtn = document.querySelector("#throw")
    event = new Event('second');
      return throwBtn.dispatchEvent(event)
    }
  takeTurn(e, turnCount = 1, turnsLeft = 2) {
    let UIdice = document.querySelectorAll(".dice"),
        UIselected = document.querySelectorAll(".selected"),
        dice = new Dice(),
        hand = [],
        event,
        previousHand,
        throwBtn = document.querySelector('#throw')

   
    
    if (turnCount === 1) {
      UIselected.forEach(el => el.classList.contains("selected") ? el.classList.remove("selected") : '')
      // roll dice
      hand = dice.roll();
      // set hand to roll
      this.hand = hand;
      // display throw in UI, add click events to hold dice
      hand.forEach((item, i) =>
      {
        UIdice[i].addEventListener('click', this.holdOnToDie);
        UIdice[i].innerHTML = item;  
      })
      // finish turn
      Dice.setDiceFace();
      return throwBtn.addEventListener('click', this.dispatchFirst, {once: true})
    }

    // Save dice from last turn, add new dice in saved indexes.
    if (turnCount !== 1) {
      // indexed dice
      const diceAmount = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      }
    // add saved dice to indexed dice object
      UIselected.forEach(item => {
        let diceKey = item.classList[1];
          diceAmount[diceKey] = Number(item.innerHTML);
      });

      // new hand to merge with saved hand
      hand = dice.roll();
  
      // add new values to unsaved dice
      for (let idx in diceAmount) {
        // if dice has not been set aside
        if (diceAmount[idx] === 0) {
        // copy from new hand
          diceAmount[idx] = hand[idx];
        }
        // add to current hand 
        this.hand[idx] = diceAmount[idx];
      }
      // update UI
      for (let idx in this.hand) {
        UIdice[idx].innerHTML = this.hand[idx];
      }
    }

    // what turn is it?
    if (turnCount === 2) {
      Dice.setDiceFace()
      // cleanup event listeners
      throwBtn.addEventListener('click', this.dispatchSecond, {once: true})
      return throwBtn.removeEventListener('click', this.dispatchFirst, {once: true})
    }

    if (turnCount === 3) {
      Dice.setDiceFace()
      // cleanup event listeners
      return throwBtn.removeEventListener('click', this.dispatchSecond, {once: true})
    }
  }
  holdOnToDie(e) {
    if (!e.target.classList.contains("selected")) {
      e.target.classList.add("selected");
    } else e.target.classList.remove("selected")
  } 
  
  scoreRefactor(e) {
    // final hand
    const playerID = `${this.playerName}${this.id}`,
          finalHand = this.getFinalHand(this.hand),
          currentBoard = this.gameBoard,
          throwBtn = document.querySelector("#throw"),
          chance = document.querySelector(`.${playerID}+.chance`);

    // remove button event listeners
    throwBtn.removeEventListener('click', this.dispatchFirst, {once: true})
    throwBtn.removeEventListener('click', this.dispatchSecond, {once: true})
    
    // chance available?
    if (chance.innerHTML === "") {
      chance.classList.add("selected");
    }
    // available options
    const options = this.calculateAvailableValues(currentBoard, finalHand);
    // const elements = document.querySelectorAll(`.${playerID}`);
    const parentElement = document.getElementById(playerID);
    // add event listeners to each single value
    for (let entry of options.value) {
      // get single value die element
      let element = document.querySelector(`[class^='${playerID} ${entry.die}']`);
      // Squary is empty and can be filled in
      if (element.innerHTML === "") {
        element.classList.add("selected");
      }
      
    }

    for (let entry in options) {
      let element = document.querySelector(`[class^="${playerID} ${entry}"]`)
    // Option is not available, continue
      if (options[entry] === false) {
        continue;
      }
      // Discard single value options
      if (entry === "value") {
        continue;
      }
      // All other options get event listener
        if (element.innerHTML === "") {
          element.classList.add("selected");
        }
    }
 

    function validate(e) {
      // Name of clicked element
      const UIelementName = e.target.classList[1],
            UIelement = e.target,
            parentElement = e.target.parentElement.parentElement,
            dice = document.querySelectorAll(".dice");

      // If element clicked is not among candidates, try again
      if (!UIelement.classList.contains("selected")) {
        // TODO: add message to UI

      }
      // Match name against option

      // single value check
      switch (UIelementName) {
        case('1'):
        case('2'):
        case('3'):
        case('4'):
        case('5'):
        case('6'):
        for (let entry of options.value) {
          if (entry.die.toString() === UIelementName && UIelement.innerHTML === "") {
            // add value to UI
            UIelement.innerHTML = entry.die * entry.amount;
            // add value to gameboard
            this.gameBoard[entry.die] = entry.die * entry.amount;
            // remove eventlistener
            parentElement.removeEventListener("click", validater)
            // clear dice
            dice.forEach(die => die.innerHTML = "");
            // end turn
            this.endTurn();
            break;
          }
        }
        break;
        case('chance'):
            if (UIelement.innerHTML === "" && this.gameBoard.chance === "") {

              parentElement.removeEventListener("click", validater);
              this.gameBoard.chance = this.hand.reduce((a, b) => a + b);
              UIelement.innerHTML = this.hand.reduce((a, b) => a + b);
              dice.forEach(die => die.innerHTML = "");
              this.endTurn()
            }
          break;
        default:
              // complex value check
          for (let entry in options) {
            if (entry === "value") {
              continue;
            }
            if (entry === UIelementName && UIelement.innerHTML === "") {
              // evaluate based on string
              let evaluateIncomingString = new Conditionals().eval({key: entry, value: options[entry]}, this)
              // add to board and UI
              this.gameBoard[entry] = evaluateIncomingString
              UIelement.innerHTML = evaluateIncomingString
              // clear dice
              dice.forEach(die => die.innerHTML = "");
              // remove event listener
              parentElement.removeEventListener("click", validater);
              this.endTurn();
              break;
              
            }
          } break;
      }
  }
       // add event listener to parent element
    /* validater creates reference to function
      this preserves function binding and enables us to remove event listener */
      const validater = validate.bind(this)
      return parentElement.addEventListener("click", validater);
  }

  endTurn() {
    const throwBtn = document.querySelector("#throw")
    // passes turn to next player in game
    let endOfTurn = new Event('endofturn')
    return throwBtn.dispatchEvent(endOfTurn);
    
  }
  


  // Get last hand as an object to compare
  getFinalHand(hand) {
    // Amount of each die
    const totalAmountOfDice = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
    }
    // Iterate through array to store in object
    hand.forEach(dice => {
      switch (dice) {
        case 1:
          totalAmountOfDice[1] += 1
          break;
        case 2:
          totalAmountOfDice[2] += 1
          break;
        case 3:
          totalAmountOfDice[3] += 1
          break;
        case 4:
          totalAmountOfDice[4] += 1
          break;
        case 5:
          totalAmountOfDice[5] += 1
          break;
        case 6:
          totalAmountOfDice[6] += 1
          break;
      }
    })
    return totalAmountOfDice
  }

  calculateAvailableValues(gameBoard, finalHand) {
      // Set up tests
      const test = new Conditionals()
      // Available choices
      const choices = test.runConditions(finalHand);
      return choices

  }
}


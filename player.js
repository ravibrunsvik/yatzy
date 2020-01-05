class Player {
  constructor(playerName) {
    this.playerName = playerName;
    this.options = {
      maxTurns: 3,
      turnCount: 1,
      previousHand: {}
    }
  }

  takeTurn(e, turnCount = 1, turnsLeft = 2) {
    let UIdice = document.querySelectorAll(".dice"),
        UIselected = document.querySelectorAll(".selected"),
        dice = new Dice(),
        hand = [],
        event,
        previousHand,
        throwBtn = document.getElementById(e.target.id);

    // Custom turn events
    function dispatchFirst() {
      event = new Event('first');
      throwBtn.dispatchEvent(event)
    }
    function dispatchSecond() {
      event = new Event('second');
        throwBtn.dispatchEvent(event)
      }
    
    if (turnCount === 1) {
      console.log("first")
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
      
      throwBtn.addEventListener('click', dispatchFirst, {once: true})
      // previousHand = {0: 0 ,1: 0, 2: 0, 3: 0, 4: 0 }
    }

    // dice magic
    // Save dice from last turn, add new dice in saved indexes.
    if (turnCount !== 1) {

      // UIselected.forEach(el => hand.push(el.innerHTML))
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
      console.log("second")
      // cleanup event listeners
      throwBtn.addEventListener('click', dispatchSecond, {once: true})
      throwBtn.removeEventListener('click', dispatchFirst, {once: true})
    }

    if (turnCount === 3) {
      console.log("third")
      // cleanup event listeners
      throwBtn.removeEventListener('click', dispatchSecond, {once: true})
    }
  }
  holdOnToDie(e) {
    if (!e.target.classList.contains("selected")) {
      e.target.classList.add("selected");
    } else e.target.classList.remove("selected")
  } 
  
  scoreRefactor() {
    // final hand
    const playerID = `${this.playerName}${this.id}`
    const finalHand = this.getFinalHand(this.hand);
    const currentBoard = this.gameBoard;
    // available options
    const options = this.calculateAvailableValues(currentBoard, finalHand);
    // const elements = document.querySelectorAll(`.${playerID}`);
    const parentElement = document.getElementById(playerID);
    // add event listeners to each single value
    for (let entry of options.value) {
      // get single value die element
      let element = document.querySelector(`[class$='${entry.die}']`);
      // Squary is empty and can be filled in
      if (element.innerHTML === "") {
        element.style.background =  "var(--list-selected)"
        element.classList.add("selected");
      }
      
    }

    // add event listeners to all other options
    for (let entry in options) {
    // Option is not available, continue
      if (options[entry] === false) {
        continue;
      }
      // Discard single value options
      if (entry === "value") {
        continue;
      }
      // All other options get event listener
      let element = document.querySelector(`[class^="${playerID} ${entry}"]`)
        if (element.innerHTML === "") {
          element.style.background = "var(--list-selected)"
          element.classList.add("selected");
        }
    }
    // add event listener to parent element
    /* validater creates reference to function
      this preserves function binding and enables us to remove event listener */
    const validater = validate.bind(this)
    parentElement.addEventListener("click", validater);

    function validate(e) {
      console.log(this)
      // Name of clicked element
      const UIelementName = e.target.classList[1],
            UIelement = e.target,
            parentElement = e.target.parentElement.parentElement;

      // If element clicked is not among candidates, try again
      if (!UIelement.classList.contains("selected")) {
        console.log("try again");
        // TODO: add message to UI
        return;
      }
      // Match name against option
      // single value check
      options.value.forEach(entry => {
        if (entry.die.toString() === UIelementName) {
          // add value to UI
          UIelement.innerHTML = entry.die * entry.amount;
          // add value to gameboard
          this.gameBoard[entry.die] = entry.die * entry.amount;
          // remove eventlistener
          parentElement.removeEventListener("click", validater)
          // end turn
          this.endTurn();
          return;
        } 
      })

      // complex value check
      for (let entry in options) {
        if (entry === "value") {
          continue;
        }
        if (entry === UIelementName) {
          // evaluate based on string
          let evaluateIncomingString = new Conditionals().eval({key: entry, value: options[entry]})
          this.gameBoard[entry] = evaluateIncomingString
          UIelement.innerHTML = evaluateIncomingString

          // remove event listener
          parentElement.removeEventListener("click", validater)
          this.endTurn()
          return;
        }
        console.log("try again");
      }



    }
  }

  insert(e) {
    // determine what element was pressed
    switch (UIelement) {
        case('1'):
        case('2'):
        case('3'):
        case('4'):
        case('5'):
        case('6'):
        console.log("single value")
        // this.el.innerHTML = this.value * this.dice;
        // this.player.gameBoard[value] = this.value * this.dice;
        break;
        }
  }

  // Put score in gameboard
  setScoreInGameBoard() {
    // set final hand
    let finalHand = this.getFinalHand(this.hand);
    let options = this.calculateAvailableValues(this.gameBoard, finalHand);
    // get elements for current player
    let elements = document.querySelectorAll(`.${this.playerName}`);
    // add listener for inputting single dice
    
    for (let option of options.value) {
      elements.forEach(el => {
        if (el.classList.contains(option.die)) {
          el.style.background = 'var(--list-selected)'
          el.addEventListener("click", insert({player: this, el: el, value: option.amount, dice: option.die}), {once: true})
        }
      })  
    }
    // other options
    for (let option in options) {
      if (options[option] === false) {
        continue;
      }
      if (option === "value") {
        continue;
      }

      if (options[option] !== "" && options[option] !== false) {
        continue;
      }
    
// NEEDS REFACTOR
    // if element matches option
    elements.forEach(el => {
      if (el.classList.contains(option)) {
        console.log(option)
        el.style.background = 'var(--list-selected)'; 
        el.addEventListener("click", insert.bind({player: this, el: el, key: option, value: options[option]}));
      }
    })
    }

    elements.forEach(el => {
      if (el.classList.contains("chance")) {
          el.style.background = 'var(--list-selected)'
          el.addEventListener("click", insert.bind({player: this, el: el, key: 'chance', value: 'chance'}))
      }

    })
  }

  // insertValue
  insertValue() {
    // set game board value
    let value = this.el.classList[1];
    // if item is single value 
    if (this.key === undefined) {
      switch (Number(value)) {
        case(1):
        case(2):
        case(3):
        case(4):
        case(5):
        case(6):
        this.el.innerHTML = this.value * this.dice;
        this.player.gameBoard[value] = this.value * this.dice;
        break;
        }
      }
        
      // init counter
      let counter = 0;
      // if complex value:
    switch (this.key) {
      case ('onePair'):
        // iterate for each
        // hold on to biggest die
          for (let entry of this.value) {
            entry.die > counter ? counter = entry.die : ''
          }
          // insert into UI
          this.el.innerHTML = (counter * 2);
          // insert into gameBoard
          this.player.gameBoard[this.key] = (counter * 2)
        break;
      case ('twoPair'):
        // combine dies
        for (let entry of this.value) {
          counter += entry.die
        }
        // insert into UI
        this.el.innerHTML = (counter * 2);
        // insert into gameBoard
        this.player.gameBoard[this.key] = (counter * 2)
        break;
      case ('threeKind'):
        for (let entry of this.value) {
          counter = entry.die
        }
          // insert into UI
          this.el.innerHTML = (counter * 3);
          // insert into gameBoard
          this.player.gameBoard[this.key] = (counter * 3)
        break;
      case ('fourKind'):
        for (let entry of this.value) {
          counter = entry.die
        }
          // insert into UI
          this.el.innerHTML = (counter * 4);
          // insert into gameBoard
          this.player.gameBoard[this.key] = (counter * 4)
        break;
      case('yatzy'): {
        for (let entry of this.value) {
          counter = entry.die
        }
          // insert into UI
          this.el.innerHTML = (counter * 5);
          // insert into gameBoard
          this.player.gameBoard[this.key] = (counter * 5)
      }
      case('tinyStraight'):
        counter = 15;
         // insert into UI
        this.el.innerHTML = (counter);
         // insert into gameBoard
        this.player.gameBoard[this.key] = (counter)
        break;
      case('bigStraight'):
        counter = 20;
        // insert into UI
        this.el.innerHTML = (counter);
        // insert into gameBoard
        this.player.gameBoard[this.key] = (counter)
        break;
      case('house'):
        for (let entry of this.value) {
          counter += Number(entry.die) * Number(entry.amount)
        }
        // insert into UI
        this.el.innerHTML = (counter);
          // insert into gameBoard
        this.player.gameBoard[this.key] = (counter)
        break;
      case('chance'):
        counter = this.player.hand.reduce((a, b) => a + b)
        this.el.innerHTML = counter;
          // insert into gameBoard
        this.player.gameBoard.chance = counter;
        break;
      default:
        break;
    }
    // set board value in UI

    // insert value into gameboard
    // cleanup event listener
    let hasEvents = document.querySelectorAll('li[style^="background"]');
      for (let el of hasEvents) {
        el.removeAttribute("style");
        el.removeEventListener("click", this.player.insertValue)
      }

    // clear dice
    let dice = document.querySelectorAll(".dice")
      for (let die of dice) {
        die.innerHTML = "";
        if (die.classList.contains("selected")) {
          die.classList.remove("selected")
        }
      }

      this.player.endTurn()
  }

  endTurn() {
    console.log("turn ended")
    // passes turn to next player in game
    let endOfTurn = new Event('endofturn')
    document.dispatchEvent(endOfTurn);

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
    //   // Is field empty, and can be used for score?
    // let copyOfBoard = JSON.parse(JSON.stringify(gameBoard))
    //   for (let entry in gameBoard) {
    //     if (gameBoard[entry] === "") {
    //       copyOfBoard[entry] = true
    //     } else {
    //       copyOfBoard[entry] = false
    //     }
    //   }
      // Does field qualify for score?
      // Set up tests
      const test = new Conditionals()
      // Available choices
      const choices = test.runConditions(finalHand);
      return choices

  }
}


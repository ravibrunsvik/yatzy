class Player {
  constructor(playerName) {
    this.playerName = playerName;
    this.options = {
      maxTurns: 3,
      turnCount: 1,
      previousHand: {}
    }
  }

  
  // Throw dice
  // throwDie(numberOfDice = 5) {
  //   // array to keep dice values
  //   const hand = [];
  //   // max and minimum values on dice
  //   const max = 6,
  //   min = 1;
  //   // return amount of dice asked for
  //   for (let i = 0; i < numberOfDice; i++) {
  //   // random number between min and max values
  //     hand.push(Math.floor(Math.random() * (max - min) + min))
  //   }
  //   return hand;
  // }


  // REFACTOR TURNS
  takeTurn(e, turnCount = 1, turnsLeft = 2) {
    console.log(e.target);
    let UIdice = document.querySelectorAll(".dice"),
        UIselected = document.querySelectorAll(".selected"),
        dice = new Dice(),
        hand = [],
        event,
        previousHand,
        throwBtn = document.getElementById(e.target.id);

        console.log(throwBtn);

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
    if (turnCount !== 1) {
      UIselected.forEach(el => hand.push(el.innerHTML))
      const diceAmount = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      }
    // add saved dice to object
      UIselected.forEach(item => {
        let diceKey = item.classList[1];
          diceAmount[diceKey] = Number(item.innerHTML);
      });

      // new hand to merge with saved hand
      hand = dice.roll();
  
      // add new values to unsaved dice
      for (let idx in diceAmount) {
        if (diceAmount[idx] === 0) {
          diceAmount[idx] = hand[idx];
        }
        this.hand[idx] = diceAmount[idx];
      }
      for (let idx in this.hand) {
        UIdice[idx].innerHTML = this.hand[idx];
      }
    }
    // what turn is it?
    if (turnCount === 2) {
      console.log("second")
      
      throwBtn.addEventListener('click', dispatchSecond, {once: true})
      throwBtn.removeEventListener('click', dispatchFirst, {once: true})
    }

    if (turnCount === 3) {
      console.log("third")
      throwBtn.removeEventListener('click', dispatchSecond, {once: true})
      
    }
    // amount of dice to be thrown

    // if dice exists, save selected
  }
  holdOnToDie(e) {
    if (!e.target.classList.contains("selected")) {
      e.target.classList.add("selected");
    } else e.target.classList.remove("selected")
  } 
  
  // Put score in gameboard
  setScoreInGameBoard() {
    // set final hand
    throwButton.setAttribute("disabled", "")
    let finalHand = this.getFinalHand(this.hand);
    let options = this.calculateAvailableValues(this.gameBoard, finalHand)
    // get elements for current player
    let elements = document.querySelectorAll(`.${this.playerName}`);
    // add listener for inputting single dice
    for (let option of options.value) {
      elements.forEach(el => {
        if (el.classList.contains(option.die)) {
          el.style.background = 'var(--list-selected)'
          el.addEventListener("click", this.insertValue.bind({player: this, el: el, value: option.amount, dice: option.die}))
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
    
    // if element matches option
    elements.forEach(el => {
      if (el.classList.contains(option)) {
        console.log(option)
        el.style.background = 'var(--list-selected)'; 
        el.addEventListener("click", this.insertValue.bind({player: this, el: el, key: option, value: options[option]}));
      }
    })
    }

    elements.forEach(el => {
      if (el.classList.contains("chance")) {
          el.style.background = 'var(--list-selected)'
          el.addEventListener("click", {player: this, el: el, key: 'chance', value: 'chance'})
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
        el.removeEventListener("click", this.insertValue)
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
      // Is field empty, and can be used for score?
    let copyOfBoard = JSON.parse(JSON.stringify(gameBoard))
      for (let entry in gameBoard) {
        if (gameBoard[entry] === "") {
          copyOfBoard[entry] = true
        } else {
          copyOfBoard[entry] = false
        }
      }
      // Does field qualify for score?
      // Set up tests
      const test = new Conditionals()
      // Available choices
      const choices = test.runConditions(finalHand);
      return choices

  }

  // instantiate gameboard
  gameBoard() {
    const gameBoard = {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      bonus: false,
      onePair: "",
      twoPair: "",
      threeOfAKind: "",
      fourOfAKind: "",
      smallStraight: "",
      largeStraight: "",
      house: "",
      chance: "",
      yatzy: "",
      sum: ""
  }
  this.gameBoard = gameBoard;
  }

}


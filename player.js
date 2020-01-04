class Player {
  constructor(playerName) {
    this.playerName = playerName;
  }

  
  // Throw dice
  throwDie(numberOfDice = 5) {
    // array to keep dice values
    const hand = [];
    // max and minimum values on dice
    const max = 6,
    min = 1;
    // return amount of dice asked for
    for (let i = 0; i < numberOfDice; i++) {
    // random number between min and max values
      hand.push(Math.floor(Math.random() * (max - min) + min))
    }
    return hand;
  }


  // first turn
  firstTurn(e) {
    console.log(e.target.id);
    let btn = document.getElementById(e.target.id);
      btn.addEventListener("click", this.secondTurn.bind(this))
    console.log("first turn");
    console.log(this);
    let dice = document.querySelectorAll(".dice:not(.selected)");
    // set hand
    this.hand = this.throwDie()
    for (let entry in this.hand) {
      dice[entry].addEventListener("click", this.holdOnToDie)
      dice[entry].innerHTML = this.hand[entry];
    }

    let promise = new Promise((res, rej) => {
      res(this)
    })
    return promise

  }


  secondTurn(e) {
    console.log(e.target);
    let btn = document.getElementById(e.target.id);
    btn.removeEventListener("click", this.secondTurn)
    btn.addEventListener("click", this.thirdTurn.bind(this))
    console.log("second turn")
    console.log(this)
    const diceAndValue = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    }

    // list of dice
    let dice = document.querySelectorAll(".dice");
    // list of selected dice
    let selected = document.querySelectorAll(".selected");
    let savedDice = [];
    // add saved dice to object
        selected.forEach(item => {
          let diceKey = item.classList[1];
            diceAndValue[diceKey] = Number(item.innerHTML);
        });

    // new hand to merge with saved hand
    this.hand = this.throwDie();

    // add new values to unsaved dice
    for (let value in diceAndValue) {
      if (diceAndValue[value] === 0) {
        diceAndValue[value] = this.hand[value];
      }
      this.hand[value] = diceAndValue[value];
    }
    for (let entry in this.hand) {
      dice[entry].innerHTML = this.hand[entry];
    }

    let promise = new Promise((res, rej) => {
      res(this)
    })
    return promise
    // return this;
    throwButton.addEventListener("click", this.thirdTurn.bind(this), {once: true});
  }
  
  thirdTurn(e) {
    let btn = document.getElementById(e.target.id);
    btn.removeEventListener("click", this.thirdTurn)
    console.log("third turn")

    const diceAndValue = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    }

    // list of dice
    let dice = document.querySelectorAll(".dice");
    // list of selected dice
    let selected = document.querySelectorAll(".selected");
    let savedDice = [];
    // add saved dice to object
        selected.forEach(item => {
          let diceKey = item.classList[1];
            diceAndValue[diceKey] = Number(item.innerHTML);
        });

         // new hand to merge with saved hand
    this.hand = this.throwDie();

    // add new values to unsaved dice
    for (let value in diceAndValue) {
      if (diceAndValue[value] === 0) {
        diceAndValue[value] = this.hand[value];
      }
      this.hand[value] = diceAndValue[value];
    }
    for (let entry in this.hand) {
      dice[entry].innerHTML = this.hand[entry];
    }

    throwButton.classList.remove("button-primary");
    throwButton.setAttribute("disabled", "");
    endTurnBtn.classList.add("button-primary");

    
  }
  holdOnToDie(e) {
    if (!e.target.classList.contains("selected")) {
      e.target.classList.add("selected");
    } else e.target.classList.remove("selected")
  } 
  
  // Put score in gameboard
  setScoreInGameBoard() {
    // document.removeEventListener()
    // set final hand
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
    console.log("hello")
    // passes turn to next player in game
    let turnOver = new Event('turnEnd')
    document.dispatchEvent(turnOver);


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


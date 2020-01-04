// Yatzy has 5 dice
// 3 throws per turn
// Players can hold on to dice before new throws
// Turns can be ended before all throws are used
// Players can pick where to store turn result
// Turn passes in circle fashion between players (top to bottom of list and back to top)
/*
 * conditional logic
    1 > 0
    2 > 0
    3 > 0
    4 > 0
    5 > 0
    6 > 0
    sum(1,2,3,4,5,6) = 63
    a >= 2 || b >= 2
    a >= 2 && b >= 2
    a >= 3
    a >= 4
    hand === [1, 2, 3, 4, 5]
    hand === [2, 3, 4, 5, 6]
    a === 3 && b === 2
    chance: hand
    a === 5
 *
*/

// UI Vars
// List of players
const players = [];
// List of boards
const currentBoards = [];
// list of dice

// buttons
const throwButton = document.getElementById("throw"),
      endTurnBtn = document.getElementById("endTurn");


// let testHand = {
//   1: 3,
//   2: 1,
//   3: 1,
//   4: 1,
//   5: 0,
//   6: 0
// }

class Conditionals {

  // returns aray of dice with values
  hasMoreThanOne(hand) {
    // array of dies that have value
    const hasValueOfOneOrMore = []
    // loop through hand
    for (let dice in hand) {
      let currentDie = dice
      let diceAmount = hand[dice]
      // Dice has a value
      if (diceAmount > 0) {
        let dieThatPassesTest = {
          die: Number(currentDie),
          amount: diceAmount
        }
      // add all values that pass
      hasValueOfOneOrMore.push(dieThatPassesTest)
    }
  }
  
  return hasValueOfOneOrMore;
}

// returns array of dice pairs
isAPair(hand) {
  const isPair = [];

  for (let dice in hand) {
    let currentDie = dice,
    diceAmount = hand[dice];
    if (diceAmount >= 2) {
      let dieThatPassesTest = {
        die: Number(currentDie),
        amount: 2
      }
      isPair.push(dieThatPassesTest);
    }
  }
  // if there is a pair
  if (isPair.length >= 1) {
    return isPair;
    
  } 
  return false;
}

isTwoPairs(hand) {
  // Grab all values of 2 or more
  const toCheck = this.isAPair(hand);
  // only continue if 2 pairs
  if (toCheck.length >= 2) {
    return toCheck;
  }
  // if no pairs, exit
  return false;
}

isThreeKind(hand) {
  const hasValue = [];
  
  // matches three of a kind?
  for (let dice in hand) {
    if (hand[dice] >= 3) {
      // should return object instead
      let object = {
        die: Number(dice),
        amount: 3
      }
      hasValue.push(object)
    }
  }
  
  if (hasValue.length === 0) {
    return false;
  }
  return hasValue;
}

isFourKind(hand) {
  const hasValue = [];

  // matches four of a kind?
  for (let dice in hand) {
    if (hand[dice] >= 4) {
      // should return object instead
      let object = {
        die: Number(dice),
        amount: 4
      }
      hasValue.push(object)
    }
  }
  
  if (hasValue.length === 0) {
    return false;
  }
  return hasValue;
}

isTinyStraight(hand) {
  // Array should be [1, 2, 3, 4, 5];
  let resultArr = [];
  let counter = 0;
  
  for (let dice in hand) {
    let currentDie = dice,
        diceAmount = hand[dice];
        if (diceAmount === 1) {
          resultArr.push(Number(currentDie));
        }
        
      }
      // Array sorted
      let sortedArray = resultArr.sort((a, b) => a - b);
      let smallStraightArray = [1, 2, 3, 4, 5];
      
      for (let entry in sortedArray) {
        if (sortedArray[entry] === smallStraightArray[entry])
        counter++
      }
      if (counter === 5) {
        return true;
      }
      return false;
} 
    
isBigStraight(hand) {
  // Array should be [2, 3, 4, 5, 6];
  let resultArr = [];
  let counter = 0;
  
  for (let dice in hand) {
    let currentDie = dice,
        diceAmount = hand[dice];
    if (diceAmount === 1) {
      resultArr.push(Number(currentDie));
    }
    
  }
  // Array sorted
  let sortedArray = resultArr.sort((a, b) => a - b);
  let bigStraightArray = [2, 3, 4, 5, 6];
  
  for (let entry in sortedArray) {
    if (sortedArray[entry] === bigStraightArray[entry])
    counter++
  }
  if (counter === 5) {
    return true;
  }
  return false;
} 
    
isHouse(hand) {
  // 3 of a and 2 of b
  let check = [];
  let counter = 0;
  for (let dice in hand) {
    let currentDie = dice,
    diceAmount = hand[dice]
    if (diceAmount === 3 || diceAmount === 2) {
      let object = {
        dice: currentDie,
        amount: diceAmount
      }
      counter += diceAmount
      check.push(object);
    }
    
  }
  if (check.length === 2 && counter === 5) {
    return check;
  }
  
  return false;
}
    
isYatzy(hand) {
  for (let dice in hand) {
    let diceAmount = hand[dice];
    if (diceAmount === 5) {
      return dice;
    }
    
  }
  return false;
}

isChance(field) {
  if (field === "") {
    return true;
  }

  return false;
}

runConditions(hand) {
  const value = this.hasMoreThanOne(hand),
        onePair = this.isAPair(hand),
        twoPair = this.isTwoPairs(hand),
        threeKind = this.isThreeKind(hand),
        fourKind = this.isFourKind(hand),
        tinyStraight = this.isTinyStraight(hand),
        bigStraight = this.isBigStraight(hand),
        house = this.isHouse(hand),
        yatzy = this.isYatzy(hand);

  let objectWithConditions = {
    value: value,
    onePair: onePair,
    twoPair: twoPair,
    threeKind: threeKind,
    fourKind: fourKind,
    tinyStraight: tinyStraight,
    bigStraight: bigStraight, 
    house: house,
    yatzy: yatzy
  }
  return objectWithConditions;
}

}

// player methods and actions
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
  firstTurn() {
    let dice = document.querySelectorAll(".dice:not(.selected)");
    for (let entry of dice) {
      console.log(entry.classList[1]);
      
    }
    // remove event listener
    throwButton.removeEventListener("click", initTurn);
    // set hand
    this.hand = this.throwDie()
    for (let entry in this.hand) {
      dice[entry].addEventListener("click", this.holdOnToDie)
      dice[entry].innerHTML = this.hand[entry];
    }
    // event listener to jump to second turn
    throwButton.addEventListener("click", this.secondTurn.bind(this), {once: true});
    endTurnBtn.addEventListener("click", this.setScoreInGameBoard.bind(this), {once: true})

  }


  secondTurn() {

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
          console.log(item.classList[1])
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

    throwButton.addEventListener("click", this.thirdTurn.bind(this), {once: true});
  }
  
  thirdTurn() {

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
          console.log(item.classList[1])
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

    throwButton.addEventListener("click", this.thirdTurn.bind(this), {once: true});


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
    console.log(options);

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
        el.style.background = 'var(--list-selected)'; 
        el.addEventListener("click", this.insertValue.bind({player: this, el: el, key: option, value: options[option]}));
      } 
    })
    }
  }

  // insertValue
  insertValue() {
    console.log(this);
    // set game board value
    let value = this.el.classList[1];
    // if item is single value 
    if (this.key === undefined) {
      switch (value) {
        case (1 || 2 || 3 || 4 || 5 || 6):
          this.el.innerHTML = this.value * this.dice;
          this.player.gameBoard[value] = this.value * this.dice;
          break;
        }
      }
      
      // KEY
      console.log(this.key);
      // VALUE
      console.log(this.value);
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
          counter += entry.die * entry.amount
        }
        // insert into UI
        this.el.innerHTML = (counter);
          // insert into gameBoard
        this.player.gameBoard[this.key] = (counter)
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
      }

      // Pass the turn to next player
      
  }

  removeAllListeners() {
    console.log('hello')
  }

  // Turn is over, decide where to put score
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

// Listen for add player events
document.getElementById("playerform").addEventListener("submit", addPlayer)

// Start the game
document.getElementById("start").addEventListener("click", startGame);

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
    let player = new Player(name)
    players.push(player);

    // Add player rows to game sheet
    let insertDiv = document.getElementById("playerInsert"),
    DOMString = `<div class="playerList two columns">
    <h6>${name}</h6>
    <ul>
    <li class="${name} 1"></li>
    <li class="${name} 2"></li>
    <li class="${name} 3"></li>
    <li class="${name} 4"></li>
    <li class="${name} 5"></li>
    <li class="${name} 6"></li>
    <li class="${name} bonus"></li>
    <li class="${name} onePair"></li>
    <li class="${name} twoPair"></li>
    <li class="${name} threeKind"></li>
    <li class="${name} fourKind"></li>
    <li class="${name} house"></li>
    <li class="${name} chance"></li>
    <li class="${name} yatzy"></li>
    <li class="${name} sum"></li>
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
  // give players a board
  players.forEach(item => item.gameBoard());
  console.log("boards given");
  let form = document.getElementById("playerform")
  
  // add listener to throw button
  throwButton.removeAttribute("disabled");
  throwButton.addEventListener("click", initTurn)
  form.removeEventListener("submit", addPlayer)
  form.style.display = "none";
}
// remove player add event when game starts
// Start game on throw
function initTurn(player) {
  if (typeof player === 'object') {
    player = 0
  }
  players[player].firstTurn();
    // add event listener for turn two and end
    throwButton.removeEventListener("click", initTurn)
}





export default class Conditionals {

  // Check current hand
  currentHand(hand) {
    let resultHand = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
    }
    // Add dice to hand
    for (let die in hand) {
      // Add each die to a total
      resultHand[hand[die]] += 1
    }
    return resultHand;
  }
  dieAmount(hand, gameboard, number) {
    let handCopy = JSON.parse(JSON.stringify(hand))
    let counter = 0;
    let dieType = 0;
    // If gameboard already has value, return
    if (gameboard[number] !== "") {
      return false;
    }
    // If value exists, add to counter
    for (let die in handCopy) {
      console.log(die)
      console.log(handCopy[die])
      if (parseInt(die) === number && handCopy[die] > 0) {
        counter = die * handCopy[die]
      }
    }
    // Return false if no value
    if (counter === 0) {
      return false;
    }
    // Else: return counter
    return counter;
  }

  // All conditionals

  // One pair
  onePair(hand, gameboard) {
    let handCopy = JSON.parse(JSON.stringify(hand))
    if (gameboard.onePair !== "") {
      return false
    }
    // eliminate less than 2s
    for (let die in handCopy) {
      // If less than two, remove
      if (handCopy[die] < 2) {
        delete handCopy[die]
      }
    }
    // Find largest
    let counter = 0;
    for (let die in handCopy) {
      if (die > counter) {
        counter = die * 2
      }
    }
    if (counter === 0) {
      return false
    }
      return parseInt(counter);
  }
  // Two pairs
  twoPairs(hand, gameboard) {
    let handCopy = JSON.parse(JSON.stringify(hand))
    let amountOfPairs = 0;

    if (gameboard.twoPair !== "") {
      return false;
    }
    let counter = 0;
    for (let die in handCopy) {
      if (handCopy[die] >= 2) {
        counter += die * 2
        amountOfPairs++
      }
    }
    if (counter === 0 || amountOfPairs < 2) {
      return false;
    }
      return counter;
    
  }
  
  
  // Three of a kind
  threeOfAKind(hand, gameboard) {
    let handCopy = JSON.parse(JSON.stringify(hand))

    if (gameboard.threeKind !== "") {
      return false
    }
    let counter = 0;
    for (let die in handCopy) {
      if (handCopy[die] >= 3) {
        counter += die * 3
      }
    }
    if (counter === 0) {
      return false;
    }
    return counter;
  }
  // Four of a kind
  fourOfAKind(hand, gameboard) {
    let handCopy = JSON.parse(JSON.stringify(hand))

    if (gameboard.fourKind !== "") {
      return false;
    }
    let counter = 0;
    for (let die in handCopy) {
      if (handCopy[die] >= 4) {
        counter += die * 4
      }
    }
    if (counter === 0) {
      return false;
    }
    return counter;
  }
  // Yatzy
  yatzy(hand, gameboard) {
    if (gameboard.yatzy !== "") {
      return false;
    }
    let counter = 0;
    for (let die in hand) {
      if (hand[die] >= 5) {
        counter += die * 5
      }
    }
    if (counter === 0) {
      return false
    }
    return counter + 50;
  }
  // House
  house(hand, gameboard) {
    let handCopy = JSON.parse(JSON.stringify(hand))

    if (gameboard.house !== "") {
      return false;
    }
    // A = 3, B = 2
    let counter = 0;
    let threeCount = false;
    let twoCount = false;
    for (let die in handCopy) {
      // Check for dice with amount = 3
      if (handCopy[die] === 3) {
        counter += die * 3
        threeCount = true;
      }
      // Check for dice with amount = 2
      if (handCopy[die] === 2) {
        counter += die * 2
        twoCount = true;
      }
    }
    if (threeCount && twoCount) {
      // If house
      return counter;
    } else {
      // If not house
      return false;
    }
  }

  // Tiny Straight
  tinyStraight(hand, gameboard) {
    let handCopy = JSON.parse(JSON.stringify(hand))

    if (gameboard.tinyStraight !== "") {
      return false;
    }
    const oneCheck = handCopy[1] === 1;
    const twoCheck = handCopy[2] === 1;
    const threeCheck = handCopy[3] === 1;
    const fourCheck = handCopy[4] === 1;
    const fiveCheck = handCopy[5] === 1

    if (oneCheck && twoCheck && threeCheck && fourCheck && fiveCheck) {
      return 15;
    } else {
      return false;
    }
    
  }
  // Large Straight
  bigStraight(hand, gameboard) {
    let handCopy = JSON.parse(JSON.stringify(hand))

    if (gameboard.bigStraight !== "") {
      return false;
    }
    const twoCheck = handCopy[2] === 1;
    const threeCheck = handCopy[3] === 1;
    const fourCheck = handCopy[4] === 1;
    const fiveCheck = handCopy[5] === 1
    const sixCheck = handCopy[6] === 1

    if (twoCheck && threeCheck && fourCheck && fiveCheck && sixCheck) {
      return 20;
    } else {
      return false;
    }
  }
  // Chance
  chance(hand, gameboard) {
    let handCopy = JSON.parse(JSON.stringify(hand))

    if (gameboard.chance !== "") {
      return false;
    } 
    // Return 
    let counter = 0;
    // Add dice together
    for (let die in handCopy) {
      if (handCopy[die] > 0) {
        counter += parseInt(die)
      }
    }
    return counter;
  }

  // Run check
  testConditions(hand, gameboard) {
    let object = {
      1: this.dieAmount(hand, gameboard, 1),
      2: this.dieAmount(hand, gameboard, 2),
      3: this.dieAmount(hand, gameboard, 3),
      4: this.dieAmount(hand, gameboard, 4),
      5: this.dieAmount(hand, gameboard, 5),
      6: this.dieAmount(hand, gameboard, 6),
      // hasOneOrMore: this.hasOneOrMore(hand, gameboard),
      onePair: this.onePair(hand, gameboard),
      twoPair: this.twoPairs(hand, gameboard),
      threeKind: this.threeOfAKind(hand, gameboard),
      fourKind: this.fourOfAKind(hand, gameboard),
      tinyStraight: this.tinyStraight(hand, gameboard),
      bigStraight: this.bigStraight(hand, gameboard),
      house: this.house(hand, gameboard),
      chance: this.chance(hand, gameboard),
      yatzy: this.yatzy(hand, gameboard)
    }
    // Remove false options
    for (let entry in object) {
      if (object[entry] === false) {
        delete object[entry]
      }
    }
    console.log(object);
    return object;
  } 

}
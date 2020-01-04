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
        die: Number(currentDie),
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
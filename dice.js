class Dice {

  roll(numberOfDice = 5) {
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


}
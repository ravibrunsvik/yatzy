class Gameboard {
 // instantiate gameboard
  static fiveDie() {
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
    return gameBoard;
  }
}
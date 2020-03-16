export default class Player {
  constructor(playerName, id, gameBoard) {
    this.playerName = playerName,
    this.id = id
    this.gameBoard = gameBoard;
    this.hand = {}
    this.hold = {}
  }

  // Roll dice
  roll(numberOfDice = 5) {
    const max = 7,
          min = 1;
    const hand = 
      {
        1: (Math.floor(Math.random() * (max - min) + min)),
        2: (Math.floor(Math.random() * (max - min) + min)),
        3: (Math.floor(Math.random() * (max - min) + min)),
        4: (Math.floor(Math.random() * (max - min) + min)),
        5: (Math.floor(Math.random() * (max - min) + min))
      }

    return hand;
  }


  // Clear held hand
  clearHeldHand() {
    this.hold = {};
  }

}
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

  firstTurn() {
    // Get hand
    let hand = this.roll();
    this.hand = hand;
    return hand;
  }

  secondTurn(savedItems) {
    // Roll dice
    let hand = this.roll();
    // If dice are set aside
    if (savedItems.length > 0) {
      console.log(savedItems);
    }
  }

  // Final hand
  
  // Put value in gameboard

  // Ends turn


  // Clear held hand
  clearHeldHand() {
    this.hold = {};
  }

}
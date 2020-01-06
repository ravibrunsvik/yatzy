class Dice {

  roll(numberOfDice = 5) {
    // array to keep dice values
    const hand = [];
    // max and minimum values on dice
    const max = 7,
          min = 1;
    // return amount of dice asked for
    for (let i = 0; i < numberOfDice; i++) {
    // random number between min and max values
      hand.push(Math.floor(Math.random() * (max - min) + min))
    }
    return hand;
  }

  // Assign dice icons
  static setDiceFace() {

    const dice = document.querySelectorAll('.dice');
    let classNames = ['one-face', 'two-face', 'three-face', 'four-face', 'five-face', 'six-face']

    for (let die of dice) {
      classNames.forEach(className => die.classList.contains(className) ? die.classList.remove(className) : '')

        switch (die.innerHTML) {
          case '1':
            die.classList.add("one-face")
            break;
          case '2':
            die.classList.add('two-face')
            
            break;
          case '3':
            die.classList.add('three-face')
            break;
          case '4':
            die.classList.add('four-face');
            break;
          case '5':
            die.classList.add('five-face');
            break;
          case '6':
            die.classList.add('six-face')
            break;
          default:
            break;
        }
      }
  }

  static removeDiceFace() {
    const dice = document.querySelectorAll('.dice'),
          classNames = ['one-face', 'two-face', 'three-face', 'four-face', 'five-face', 'six-face'];

          for (let die of dice) {
            classNames.forEach(className => die.classList.contains(className) ? die.classList.remove(className) : '')
          }
  }
}
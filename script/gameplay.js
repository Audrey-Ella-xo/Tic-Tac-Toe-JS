export const gamePlay = (function () {
  const gameBoard = {
      role: 0,
      result: Array(9).fill(null), // create a fixed length array
      turn: 1
  };

  // switching roles after every turn
  const switchRole = () => {
      gameBoard.role= gameBoard.role ? 0 : 1; // 0 is a falsy value
  }

  const getRole = () => {
      return gameBoard.role;
  }

  // we reset role so that player 1 will always start first
  const resetRole = () => {
    gameBoard.role = 0;
  }

  // we set an array that contains all fields picked (representation of gameboard as an array)
  const setResult = (fieldValue, ind) => {
    gameBoard.result[ind] = fieldValue;
  }

  const getResult = () => {
    return gameBoard.result;
  }

  const resetResult = () => {
    gameBoard.result = Array(9).fill(null);
  }

  // stores 'X' if player1
  //        'O' if player2
  // inside result property of gameBoard object
  const storeX_OInsideResult = (ind) => {
    getRole() ? setResult('O', ind) : setResult('X', ind);
  }

  // one round has 9 turns at most
  const nextTurn = () => {
    gameBoard.turn++;
  }

  const getTurn = () => {
    return gameBoard.turn;
  }

  //in case players want to play again or play a new game
  const resetTurn = () => {
    gameBoard.turn = 1;
  }

  // storing the name of the round/game winner
  const setWinner = (winner) => {
    gameBoard.winner = winner
  }

  const getWinner = () => {
    return gameBoard.winner;
  }

  //in case players want to play again or play a new game
  const resetWinner = () => {
    gameBoard.winner = undefined;
  }

  // assembles all the reset methods needed for starting a new round/game
  const resetBoard = () => {
    resetTurn();
    resetResult();
    resetWinner();
    resetRole();
  }

  // in case of win:  stores winner inside gameBoard and scores of each player
  //            draw: stores null   inside gameBoard
  const checkWinner = (pickedFields, player) => {
    const winConditions = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
    if (getTurn() < 5) {
      pickedFields;
    } else {
      // check for draw first then check for win
      // because if not after setting the winner it will be changed to null
      if (getTurn() === 9) {
        setWinner(null);
      }
      winConditions.forEach(cond => {
        let win1, win2, win3 = false;
        pickedFields.forEach( field => {
          if (field === cond[0]){
            win1 = true;
          } else if (field === cond[1]) {
            win2 = true;
          } else if ( field === cond[2]) {
            win3 = true;
          }
        });
        if (win1 && win2 && win3) {
          setWinner(player.getUsername());
        }
      });
      // the reason why we set score outside for each
      // lets take this example: x|o|x
      //                         o|x|o
      //                         x|o|x
      // where the pick order is clockwise and the fith field is the last pick
      // at this case we have two win conditions satisfied (753, 159)
      // if we put it inside each it will increment by 2 
      if (getWinner()) {
        player.setScore();
      }
    }
  }

  const play = (domField, players, index) => {
    // Changing backgroud of domField element (i.e. rendering X/O in the view)
    domField.background = players[getRole()].getX_OField();
    // Stores X/O inside result
    storeX_OInsideResult(index);
    // Checking Winner
    // Step1: Storing picked fields as an array
    // Step2: Checking if the generated array is a winning condition
    checkWinner(players[getRole()].fieldsPick(index + 1), players[getRole()]);
    // Next turn
    nextTurn();
    // switch role
    switchRole();
  }

  return { play, getWinner, resetBoard, getResult };
})();
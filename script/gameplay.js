export const gamePlay = (function () {
  const gameBoard = {
      role: 0,
      result: Array(9).fill(null), // create a fixed length array
      round: 1
  };
  // switching roles after every round
  const switchRole = () => {
      gameBoard.role= gameBoard.role ? 0 : 1; // 0 is a falsy value
  }
  const getRole = () => {
      return gameBoard.role;
  }

  //in case players want to play again or play a new game
  const resetRole = () => {
    gameBoard.role = 0;
  }

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
  const nextRound = () => {
    gameBoard.round++;
  }
  const getRound = () => {
    return gameBoard.round;
  }

  //in case players want to play again or play a new game
  const resetRound = () => {
    gameBoard.round = 1;
  }
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

  //in case players want to play again
  const newRound = () => {
    resetRound();
    resetResult();
    resetWinner();
    resetRole();
  }

  // storing the winner inside gameBoard when someone wins
  //         null when draw
  const checkWinner = (pickedFields, player) => {
    const winConditions = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
    // console.log('round', getRound());
    if (getRound() < 5) {
      pickedFields;
    } else {
      // check for draw first then check for win
      // because if not after setting the winner it will be changed for null
      if (getRound() === 9) {
        // console.log('draw');
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
          // console.log('win');
          setWinner(player.getUsername());
          player.setScore();
        }
      });
    }
  }

  const play = (domField, players, index) => {
    // Changing backgroud of domField element (i.e. rendering X/O in the view)
    // console.log('Field Case', index + 1);
    // console.log(players[getRole()].getX_OField());
    domField.background = players[getRole()].getX_OField();
    // Stores X/O inside result
    storeX_OInsideResult(index);
    // console.log('player', getRole() + 1);
    // Checking Winner
    // Step1: Storing picked fields as an array
    // Step2: Checking if the generated array is a winning condition
    checkWinner(players[getRole()].fieldsPick(index + 1), players[getRole()]);
    // console.log(gameBoard.winner);
    // Next round
    nextRound();
    // switch role
    switchRole();
  }

  return { play, getRound, getWinner, newRound, getResult };
})(); 
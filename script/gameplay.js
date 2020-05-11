export const gamePlay = (function () {
  const gameBoard = {
      role: 0
  };

  // switching roles after every round
  const switchRole = () => {
      gameBoard.role= gameBoard.role ? 0 : 1; // 0 is falsy value
  }

  const getRole = () => {
      return gameBoard.role;
  }

  const play = (domField, players) => {
    console.log("inside play");
    console.log(players);
    domField.background = players[getRole()].getX_O();
    switchRole();
    console.log(domField.background);
  }

  return { play };
})();
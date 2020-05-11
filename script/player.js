export const Player = () => {
  const player = {
    fields: [],
    score: 0
  };

  // player username
  const setUsername = (name) => {
      player.username = name;
  }

  const getUsername = () => {
      return player.username;
  }

  // stores string that used to set the css backgroud property
  const setX_OField = (x_O) => {
      player.x_OField = x_O;
  }

  const getX_OField = () => {
    return player.x_OField;
  }

  // Stores  'X': player1
  //         'O': player2
  // it can be used in case you want add feature for who want to have X/O
  const setX_O = (XorO) => {
    player.x_O = XorO;
  }

  const getX_O = () => {
    return player.x_O;
  }

  // return an array of picked fields
  const fieldsPick = (lastFieldIndex) => {
    player.fields.push(lastFieldIndex);
    // sorting picks for checks and return it as a string when we have 3 picks
    // the reason why we are retruning a string because we will use includes method
    if (player.fields.length >= 3) {
      return player.fields;
    }
  }

  // set score in case player won
  const setScore = () => {
    player.score++;
  }

  const getScore = () => {
    return player.score;
  }

  // reset the score when restarting a new game
  const resetScore = () => {
    player.score = 0;
  }

  // empty the picked fields array at end of the round
  const resetPickedFields = () => {
    player.fields = [];
  }

  return { setUsername, getUsername, setX_OField, getX_OField, setX_O, getX_O, fieldsPick, resetPickedFields, setScore, getScore, resetScore };
}

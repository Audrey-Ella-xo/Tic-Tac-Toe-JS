const Player = () => {
  const player = {
    fields: [],
    score: 0,
  };

  // player username
  const setUsername = (name) => {
    player.username = name;
  };

  const getUsername = () => player.username;

  // stores string that used to set the css backgroud property
  const setXOField = (xO) => {
    player.xOField = xO;
  };

  const getXOField = () => player.xOField;

  // Stores  'X': player1
  //         'O': player2
  // it can be used in case you want add feature for who want to have X/O
  const setXO = (XorO) => {
    player.xO = XorO;
  };

  const getXO = () => player.xO;

  // return an array of picked fields
  const fieldsPick = (lastFieldIndex) => {
    player.fields.push(lastFieldIndex);
    // sorting picks for checks and return it when we have 3 picks
    if (player.fields.length >= 3) {
      return player.fields;
    }
    return false;
  };

  // set score in case player won
  const setScore = () => {
    player.score += 1;
  };

  const getScore = () => player.score;

  // reset the score when restarting a new game
  const resetScore = () => {
    player.score = 0;
  };

  // empty the picked fields array at end of the round
  const resetPickedFields = () => {
    player.fields = [];
  };

  return {
    setUsername,
    getUsername,
    setXOField,
    getXOField,
    setXO,
    getXO,
    fieldsPick,
    resetPickedFields,
    setScore,
    getScore,
    resetScore,
  };
};

export default Player;

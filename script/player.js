export const Player = () => {
  const player = {fields: [],
    score: 0
  };

  const setUsername = (name) => {
      player.username = name;
  }
  const getUsername = () => {
      return player.username;
  }
  const setX_OField = (x_O) => {
      player.x_OField = x_O;
  }
  const getX_OField = () => {
    return player.x_OField;
  }
  // XorO is 'X': player1
  //         'O': player2
  const setX_O = (XorO) => {
    player.x_O = XorO;
  }
  const getX_O = () => {
    return player.x_O;
  }
  // push to array picked fields
  const fieldsPick = (lastFieldIndex) => {
    player.fields.push(lastFieldIndex);
    // sorting picks for checks and return it as a string when we have 3 picks
    // the reason why we are retruning a string because we will use includes method
    if (player.fields.length >= 3) {
      return player.fields;
    }
  }

  const setScore = () => {
    player.score++;
  }

  const getScore = () => {
    return player.score;
  }

  const resetScore = () => {
    player.score = 0;
  }

  const resetPickedFields = () => {
    player.fields = [];
  }

  return { setUsername, getUsername, setX_OField, getX_OField, setX_O, getX_O, fieldsPick, resetPickedFields, setScore, getScore, resetScore };
}
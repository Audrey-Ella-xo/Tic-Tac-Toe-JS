export const Player = () => {
  const player = {};

  const setUsername = (name) => {
      player.username = name;
  }

  const getUsername = () => {
      return player.username;
  }

  return { setUsername, getUsername };
}
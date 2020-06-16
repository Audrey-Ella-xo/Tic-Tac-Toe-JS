import gamePlay from './gameplay';
import Player from './player';

describe('testing gameplay methods', () => {
    test('Play the game', () => {
        const players = [Player(), Player()];
        // setting usernames
        players[0].setUsername('player1');
        players[1].setUsername('player2');

        const domField = document.createElement('div');
        // picking 1 to 6 fields while respecting the order
        for (let index = 0; index < 6; index++) {
            gamePlay.play(domField, players, index);
        }
        // we expect at the 7th field
        expect(gamePlay.play(domField, players, 6)).toStrictEqual({
            result: [
              "X", "O", "X",
              "O", "X", "O",
              "X", null, null,
            ],
            role: 1,
            turn: 8,
            winner: 'player1'});
    });

    test('Getting game winner', () => {
        expect(gamePlay.getWinner()).toBe('player1');
    });

    test('Getting game result', () => {
        expect(gamePlay.getResult()).toStrictEqual(["X", "O", "X",
                                                    "O", "X", "O",
                                                    "X", null, null]);
    });

    test('Reset the gameboard', () => {
        expect(gamePlay.resetBoard()).toStrictEqual({
            role: 0,
            result: Array(9).fill(null),
            turn: 1,
            winner: undefined
          });
    });
});
import dom from './dom';

describe('testing runApp method that have 3 event listners', () => {
  test('distpatch start game event', () => {
    document.body.innerHTML = `<section class="menu" style="display: flex;">
        <h1>Tic Tac Toe</h1>
        <form>
            <div>
                <label for="player1">Player 1</label>
                <input type="text" name="player1" class="player" id="player1" value="Player 1">
            </div>
            <div>
                <label for="player2">Player 2</label>
                <input type="text" name="player2" class="player" id="player2" value="Player 2">
            </div>
            <input type="submit" value="Start!" id="start-game">
        </form>
    </section>
    <section class="game-play" style="display: none;">
        <h1>Tic Tac Toe</h1>
        <div class="scoreboard">
            <div class="players-scoreboard">
                <h4 id="player-1-name"></h4>
                <h2 id="player-1-score"></h2>
            </div>
            <div class="players-scoreboard">
                <h4 id="player-2-name"></h4>
                <h2 id="player-2-score"></h2>
            </div>
        </div>
        <table class="game-board">
          <tbody>
            <tr>
                <td class="game-br game-bb"></td>
                <td class="game-bb"></td>
                <td class="game-bl game-bb"></td>
            </tr>
            <tr>
                <td class="game-br game-bb"></td>
                <td class="game-bb"></td>
                <td class="game-bl game-bb"></td>
            </tr>
            <tr>
                <td class="game-br"></td>
                <td></td>
                <td class="game-bl"></td>
            </tr>
          </tbody>
        </table>
    </section>
    <section class="end-result" style="display: none;">
      <h1>Tic Tac Toe</h1>
      <h1 id="winner"></h1>
      <h1 id="result-message"></h1>
      <div>
          <button class="result-btns" id="new-round">Play Again!</button>
          <button class="result-btns" id="new-game">New Game</button>
      </div>
    </section>
    <script src="./bundle.js"></script>`;

    dom.runApp();
    // select start button
    const starGame = document.getElementById('start-game');
    const event = new Event('click');

    // fire start game click event
    starGame.dispatchEvent(event);

    const gameBoard = document.querySelector('.game-play');

    // Since gameboard element is invisible, if the method is called (event dispatched)
    // the gameboard element will be shown
    expect(gameBoard.style.display).toBe('flex');
  });

  test('distpatch new game event', () => {
    document.body.innerHTML = `<section class="menu" style="display: none;">
        <h1>Tic Tac Toe</h1>
        <form>
            <div>
                <label for="player1">Player 1</label>
                <input type="text" name="player1" class="player" id="player1" value="Player 1">
            </div>
            <div>
                <label for="player2">Player 2</label>
                <input type="text" name="player2" class="player" id="player2" value="Player 2">
            </div>
            <input type="submit" value="Start!" id="start-game">
        </form>
    </section>
    <section class="game-play" style="display: none;">
        <h1>Tic Tac Toe</h1>
        <div class="scoreboard">
            <div class="players-scoreboard">
                <h4 id="player-1-name"></h4>
                <h2 id="player-1-score"></h2>
            </div>
            <div class="players-scoreboard">
                <h4 id="player-2-name"></h4>
                <h2 id="player-2-score"></h2>
            </div>
        </div>
        <table class="game-board">
          <tbody>
            <tr>
                <td class="game-br game-bb"></td>
                <td class="game-bb"></td>
                <td class="game-bl game-bb"></td>
            </tr>
            <tr>
                <td class="game-br game-bb"></td>
                <td class="game-bb"></td>
                <td class="game-bl game-bb"></td>
            </tr>
            <tr>
                <td class="game-br"></td>
                <td></td>
                <td class="game-bl"></td>
            </tr>
          </tbody>
        </table>
    </section>
    <section class="end-result" style="display: flex;">
      <h1>Tic Tac Toe</h1>
      <h1 id="winner"></h1>
      <h1 id="result-message"></h1>
      <div>
          <button class="result-btns" id="new-round">Play Again!</button>
          <button class="result-btns" id="new-game">New Game</button>
      </div>
    </section>
    <script src="./bundle.js"></script>`;

    dom.runApp();
    const newGame = document.getElementById('new-game');
    const event = new Event('click');

    const menu = document.querySelector('.menu');

    newGame.dispatchEvent(event);

    expect(menu.style.display).toBe('flex');
  });

  test('distpatch new round event', () => {
    document.body.innerHTML = `<section class="menu" style="display: none;">
        <h1>Tic Tac Toe</h1>
        <form>
            <div>
                <label for="player1">Player 1</label>
                <input type="text" name="player1" class="player" id="player1" value="Player 1">
            </div>
            <div>
                <label for="player2">Player 2</label>
                <input type="text" name="player2" class="player" id="player2" value="Player 2">
            </div>
            <input type="submit" value="Start!" id="start-game">
        </form>
    </section>
    <section class="game-play" style="display: none;">
        <h1>Tic Tac Toe</h1>
        <div class="scoreboard">
            <div class="players-scoreboard">
                <h4 id="player-1-name"></h4>
                <h2 id="player-1-score"></h2>
            </div>
            <div class="players-scoreboard">
                <h4 id="player-2-name"></h4>
                <h2 id="player-2-score"></h2>
            </div>
        </div>
        <table class="game-board">
          <tbody>
            <tr>
                <td class="game-br game-bb"></td>
                <td class="game-bb"></td>
                <td class="game-bl game-bb"></td>
            </tr>
            <tr>
                <td class="game-br game-bb"></td>
                <td class="game-bb"></td>
                <td class="game-bl game-bb"></td>
            </tr>
            <tr>
                <td class="game-br"></td>
                <td></td>
                <td class="game-bl"></td>
            </tr>
          </tbody>
        </table>
    </section>
    <section class="end-result" style="display: flex;">
      <h1>Tic Tac Toe</h1>
      <h1 id="winner"></h1>
      <h1 id="result-message"></h1>
      <div>
          <button class="result-btns" id="new-round">Play Again!</button>
          <button class="result-btns" id="new-game">New Game</button>
      </div>
    </section>
    <script src="./bundle.js"></script>`;

    dom.runApp();
    const newRound = document.getElementById('new-round');
    const event = new Event('click');

    const menu = document.querySelector('.menu');

    newRound.dispatchEvent(event);

    expect(menu.style.display).toBe('flex');
  });
});
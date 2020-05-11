import { Player } from './player.js';

const player1 = Player();
const player2 = Player();

const dom = ( function () {
    const getPlayersFromDom = (event) => {
      const players = document.querySelectorAll('.player');
      event.preventDefault();
      player1.setUsername(players[0].value);
      player2.setUsername(players[1].value);
      console.log(player1.getUsername());
      console.log(player2.getUsername());
    };

    // this function render: Menu when number is 1 (default)
    //                       Gameplay when number is 2
    //                       Result when number is 3
    const render = (number = 1) => {
      const views = document.querySelectorAll('section');
      views.forEach(( view, i ) => {
          if ( i === number - 1 ) {
            view.style.display = 'block';
          } else {
            view.style.display = 'none';
          }
      });
    }

    const getPlayersAndRenderGame = (event) => {
        getPlayersFromDom(event);
        render(2);
    }

    const startGame = () => {
      const start = document.querySelector('#start-game');
      // this event will run only once
      start.addEventListener('click', getPlayersAndRenderGame, {once: true});
    };
    return { render, startGame };
})();

// calls
dom.render();
dom.startGame(); 
import { Player } from './player.js';
import { gamePlay } from './gameplay.js';

const state = { players: [Player(), Player()] } 

const dom = ( function () {
    const getPlayersFromDom = (event) => {
      inputs = document.querySelectorAll('.player'); 
      event.preventDefault();
      inputs.forEach( (input, i) => { state.players[i].setUsername(input.value); console.log(state.players[i].getUsername()); });
    };

    // this function render: Menu when number is 1 (default)
    //                       Gameplay when number is 2
    //                       Result when number is 3
    const render = (number = 1) => {
      const views = document.querySelectorAll('section');
      views.forEach(( view, i ) => {
        view.style.display = (i === number - 1) ? 'block' : 'none';
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

    const boardField = document.querySelectorAll('td');

    // gives player1: X since i equal 0 it will read 0.svg which is 'X' image
    //       player2: O
    const setX_OBackgroudImages = (players) => {
      players.forEach((player, i) => {
          player.setX_O(`no-repeat url("../image/${i}.svg")`); 
      });
    }

    const renderX_O = () => {
        boardField.forEach( field => {
          field.addEventListener('click', (e) => {
            setX_OBackgroudImages(state.players);
            e.preventDefault();
            // Module gamePlay method call
            gamePlay.play(field.style, state.players);
          });
        } );
    }
    return { render, startGame, renderX_O };
})();

// calls
dom.render();
dom.startGame();
dom.renderX_O();
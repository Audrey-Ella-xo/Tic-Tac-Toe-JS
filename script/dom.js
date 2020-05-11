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
    const setX_O = (players) => { 
      players.forEach((player, i) => {
         // setting X-image for players (since i equal 0 it will read 0.svg which is 'X' image) and O-image for player2 
         player.setX_OField(`no-repeat url("../image/${i}.svg")`); 
         // setting 'X' for player1 and 'O' for player2 
         i ? player.setX_O('O') : player.setX_O('X'); 
      });
    }

    const renderX_O = () => {
      setX_O(state.players); boardField.forEach( (field, i) => { 
          field.addEventListener('click', (e) => {

            e.preventDefault();
            // Module gamePlay method call
            gamePlay.play(field.style, state.players, i); }, {once: true}); 
        } );
    }
    const renderResult = () => { boardField.forEach( (field, i) => { field.addEventListener('click', (e) => { e.preventDefault(); if (gamePlay.getWinner() !== undefined) { console.log(gamePlay.getWinner()); setTimeout(function(){ render(3); }, 500); } }, {once: true}); }); } 
    return { render, startGame, renderX_O, renderResult };
})();

// calls
dom.render();
dom.startGame();
dom.renderResult(); 
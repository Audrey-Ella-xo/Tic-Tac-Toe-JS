import { Player } from './player.js';
import { gamePlay } from './gameplay.js';

const state = {
    players: [Player(), Player()],

}

export const dom = ( function () {

    // render: Menu when number is 1 (default)
    //         Gameplay when number is 2
    //         Result when number is 3
    const render = (number = 1) => {
      const views = document.querySelectorAll('section');
      views.forEach(( view, i ) => {
        view.style.display = (i === number - 1) ? 'flex' : 'none';
      });
    }

    // selecting where to render usernames & score
    const scoreboardHtml = document.querySelectorAll('.players-scoreboard');

    // this method renders entered player username
    const renderPlayersName = () => {
      scoreboardHtml.forEach((playerScore, i) => {
        playerScore.children[0].appendChild(document.createTextNode(state.players[i].getUsername()));
      });
    }

    // this method renders player score (it needs to be called before the start of the first game and after every finished game)
    const renderPlayersScore = () => {
      scoreboardHtml.forEach((playerScore, i) => {
        playerScore.children[1].appendChild(document.createTextNode(state.players[i].getScore()));
      });
    }

    // gets values of inputs and store them inside player1&2 (instances of Player factory)
    // then call renderPlayersName
    const getPlayersFromDom = (event) => {
      const inputs = document.querySelectorAll('.player');
      event.preventDefault();
      inputs.forEach( (input, i) => {
        state.players[i].setUsername(input.value);
      });
      renderPlayersName();
      renderPlayersScore();
    };

    // gets call previous method and render Gameplay
    const getPlayersAndRenderGame = (event) => {
        getPlayersFromDom(event);
        render(2);
    }

    // Selecting gameBoard fields
    const boardField = document.querySelectorAll('td');
    
    // gives player1: X
    //       player2: O
    const setX_O = (players) => {
      players.forEach((player, i) => {
          // setting X-image for players (since i equal 0 it will read 0.svg which is 'X' image) and O-image for player2
          player.setX_OField(`center no-repeat url("../image/${i}.svg")`);
          // setting 'X' for player1 and 'O' for player2
          i ? player.setX_O('O') : player.setX_O('X');
      });
    }

    // gameplay logic: checking winner/draw
    const play = (field, i, event) => {
      event.preventDefault();
      // stop the rendering X/O on clicked fields when we have the final result
      if (gamePlay.getWinner() === undefined) {
        // Module gamePlay method call
        gamePlay.play(field.style, state.players, i);
      }
    }

    // Render X/O images in the page (it listens click event only once to prevent changing values)
    const renderX_O = () => {
        setX_O(state.players);
        boardField.forEach( (field, i) => {
          field.addEventListener('click', function (e) {
            play(this, i, e);
          }, {once: true});
        } );
    }

    // since removeEventListener didn't work for the rest of unclicked fields when the game ends
    // which causes double eventListenning for those fields when we play again for that reason 
    // we will create a custom event that auto-clicks the rest of unclicked fields before we render the new round
    // Disclaimer: by following this approach the console will return errors because we are using once parameter
    // but that won't hinder performance since we are making sure to only dispatsh what it wasn't dispatched by event listener
    const autoClickEvent = new MouseEvent('click');

    // select the section that contains the result view
    const resultMessageHtml = document.querySelector('.end-result');

    // render the winner of the game or draw in case of draw
    const renderWinDraw = (winner) => {
      if (winner) {
        resultMessageHtml.children[0].appendChild(document.createTextNode(winner));
        resultMessageHtml.children[1].appendChild(document.createTextNode('Won'));
      } else {
        resultMessageHtml.children[1].appendChild(document.createTextNode('Draw'));
      }
    }

    // renders the result view when games end
    const renderResult = () => {
      boardField.forEach( field => {
        field.addEventListener('click', (e) => {
          e.preventDefault();
          // when result is decided
          if (gamePlay.getWinner() !== undefined) {
            // check unclicked fields and then dispatch click event
            gamePlay.getResult().forEach( (result, i) => {
              if (result === null){
                boardField[i].dispatchEvent(autoClickEvent);
              }
            } );
            // render result message
            renderWinDraw(gamePlay.getWinner());
            // render the result view after 500ms
            setTimeout(function(){ render(3); }, 500);
          }
        }, {once: true});
      });
    }

    // event listening start button of menu view and then render gameplay view and result view when game ends
    const startGame = () => {
      const start = document.querySelector('#start-game');
      // render first view (getting players usernames)
      render();
      // listening start button of the first view this event will run only once
      start.addEventListener('click', getPlayersAndRenderGame, {once: true});
      // gameplay
      renderX_O();
      // result
      renderResult();
    };

    // for index: 0 it selects play again
    //            1 it selects new game
    const playBtns = document.querySelectorAll('.result-btns');

    // it refresh board preparing for a new game
    const emptyBoard = () => {
      boardField.forEach( field => {
        field.style.background = 'none';
      });
    }

    // we reset Picked fields for each player
    const resetPickedFields = () => {
      state.players.forEach( player => {
        player.resetPickedFields();
      })
    }

    // empty html element for future asignment
    const deleteRendredScores = () => {
      scoreboardHtml.forEach((playerScore, i) => {
        playerScore.children[1].innerHTML = '';
      });
    }

    //reset the result message before rendering a new one
    const deleteRenderedResultMessage = () => {
      // reset winner username
      resultMessageHtml.children[0].innerHTML = '';
      // reset win/draw message
      resultMessageHtml.children[1].innerHTML = '';
    }

    // delete the previous score and set the new score
    const reRenderPlayerScore = () => {
      deleteRendredScores();
      renderPlayersScore();
    }

    // playing again while preserving username and score
    const playAgain = () => {
      playBtns[0].addEventListener('click', (e) => {
        emptyBoard();
        reRenderPlayerScore();
        render(2);
        resetPickedFields();
        // reset the board properties (turn counter, role , result and winner)
        gamePlay.resetBoard();
        renderX_O();
        deleteRenderedResultMessage();
        renderResult();
      })
    }

    // deteting the rendered usenames preparing for a new game where
    // we could have diffrent players
    const deleteRendredUsernames = () => {
      scoreboardHtml.forEach((playerScore, i) => {
        playerScore.children[0].innerHTML = '';
      });
    }

    // resets the score of both players to 0
    const resetScoreBoard = () => {
      state.players.forEach( player => {
        player.resetScore();
      })
    }

    // playing again without preserving anything
    const newGame = () => {
      playBtns[1].addEventListener('click', (e) => {
        emptyBoard();
        deleteRendredUsernames();
        deleteRendredScores();
        resetScoreBoard();
        render(1);
        resetPickedFields();
        // reset the board properties (round counter, role , result and winner)
        gamePlay.resetBoard();
        deleteRenderedResultMessage();
        startGame();
      })
    }

    // runs the program
    const runApp = () => {
      startGame();
      playAgain();
      newGame();
    }
    

    return { runApp };
})();
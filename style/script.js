const ticTacToe = new TicTacToe();
ticTacToe.start();
function TicTacToe() {
    const board = new Board();
    const player =  new Player(board);
    const computer = new Computer(board);
    let turn = 0;

    this.start = function() {
        // Make an observer to track when a change is made on the board, using a mutation observer
        const config = {childList: true} // when a child of a div is changed, we'll notice with this                
        const observer = new MutationObserver(()=> takeTurn()) // When a change is made, call the method Take Turn
        board.positions.forEach((el)=> observer.observe(el, config));
        takeTurn();
    }

    function takeTurn() {
        if (board.checkWinner()) {
            return;
        }

        if (turn % 2 === 0) {
            player.takeTurn();
        } else {
            computer.takeTurn();
        }


        turn++;
    };
}
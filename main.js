var game = null;

$(document).ready(initializeApp);

function initializeApp(){
  game = new Gameboard();
  game.initializeBoard();
}

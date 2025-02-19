import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];



function getActivePlayer(gameTurns){
  let curPlayer = 'X';

      if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
        curPlayer = 'O';
      }
  
      return curPlayer;
}




function App() {
  const [players, setPlayers] = useState({'X': 'Player 1', 'O': 'Player 2'});
  const [gameTurn, setGameTurn] = useState([]);
  //const [activePlayer, setActivePlayer] = useState('X');

  let gameBoard = [...initialGameBoard.map(array => [...array])]; //editing a brand new array (gameboard) rather than the inital

  const activePlayer = getActivePlayer(gameTurn);

    for(const turn of gameTurn){
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }

    let winner = null;

  for (const combinations of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column]
    const secondSquareSymbol =  gameBoard[combinations[1].row][combinations[1].column]
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){  
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurn(prevTurns => {
      const curPlayer = getActivePlayer(prevTurns);

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: curPlayer}, ...prevTurns];

      return updatedTurns
    });
  }

  function resetBoard(){
    setGameTurn([]);
  }

  function handlePlayerName(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers, 
        [symbol]: newName}
    }
    );
  }

  return (
    <main>
      <div id='game-container'>
      <ol id='players' className='highlight-player'>
        <Player name={'Player 1'} symbol='X' isActive={activePlayer === 'X'} onChange={handlePlayerName}/>
        <Player name={'Player 2'} symbol='O' isActive={activePlayer === 'O'} onChange={handlePlayerName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onReset={resetBoard}/>}
        <GameBoard onSelectCell={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurn}/>
    </main> 
  )
}

export default App

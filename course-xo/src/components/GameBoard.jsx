export default function GameBoard({onSelectCell, board}){
    

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleCellClick(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });
    // onSelectCell(); 
    // }

    return (
        <ol id='game-board'>
        {board.map((row, rowIndex) => (
        <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                    {/* if there is a player symbol on the button disable it (button can only be selected once) */}
                    <button onClick={() => onSelectCell(rowIndex, colIndex)} disabled={playerSymbol ? true : false}>{playerSymbol}</button>
                    </li>
                ))}
            </ol>
        </li>))}
        </ol>
    );

}
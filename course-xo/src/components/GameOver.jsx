import Player from "./Player";

export default function GameOver({winner, onReset}){

    return (
        <div id='game-over'>
            <h2>Game Over!</h2>
            {winner ? <p>{winner} WON!</p> : <p>DRAW!</p>}
            <p>
            <button onClick={onReset}>Rematch!</button>
            </p>
        </div>
    );
}
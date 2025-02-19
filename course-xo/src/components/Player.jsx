import { useState } from "react";


export default function Player({name, symbol, isActive, onChange}){

    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);


    function handleEdit(editStatus){
        setIsEditing(editStatus);
        if (isEditing) {
        onChange(symbol, playerName);
        }
    }

    return(
          <li className={isActive ? 'active' : undefined}>
            <span className='player-symbol'>{symbol}</span>
            <span className='player'>
            {/* Updating old player name to the new name */}
            {!isEditing ? <span className='player-name'>{playerName}</span>
            : <input type='text' value={playerName} onChange={(e)=>setPlayerName(e.target.value)} />}
            {/* Disabling the saving feature if the input is empty */}
            {isEditing ? (<button onClick={() => {
            if (playerName.trim() !== '') {
                handleEdit(false);
            }
            }}
            >
            Save
            </button>
            ) : (<button onClick={() => handleEdit(true)}>Edit</button>)}
            </span>
          </li>
    );
}
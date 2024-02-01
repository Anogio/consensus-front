import './App.css';
import React, { useState } from 'react';

import Game from './game/Game'

function App() {
  const [playerNameInput, setPlayerNameInput] = useState('')
  const [playerName, setPlayerName] = useState()

  function handleKeyDown(e) {
    if (e.key === "Enter") {
          setPlayerName(playerNameInput)
        }
  } 

  return (
    <div className="App">
      <header className="App-header">
        {
          !playerName ? 
          <div>
            <h1>
              Bienvenue sur Consensus !
            </h1>
          <input onKeyDown={handleKeyDown} value={playerNameInput} onChange={e => setPlayerNameInput(e.target.value)} placeholder='Mon nom' />
          <button onClick={() => setPlayerName(playerNameInput)}>Confirmer</button>
          </div>
        :
        <Game playerName={playerName} />
        }
      </header>
    </div>
  );
}

export default App;

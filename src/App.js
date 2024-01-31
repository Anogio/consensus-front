import './App.css';
import React, { useState } from 'react';

import Game from './Game'

function App() {
  const [playerNameInput, setPlayerNameInput] = useState('')
  const [playerName, setPlayerName] = useState()

  return (
    <div className="App">
      <header className="App-header">
        {
          !playerName ? 
          <div>
          <input value={playerNameInput} onChange={e => setPlayerNameInput(e.target.value)} placeholder='Mon nom' />
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

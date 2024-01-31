import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import CompletedRound from './CompletedRound';
import OngoingRound from './OngoingRound';


function Game({ playerName }) {
    const baseUrl = process.env.APP_ENV === "production"
      ? "consensus-back.vercel.app"
      : "127.0.0.1:8000";

    const socketUrl = `ws://${baseUrl}/ws?player_name=${encodeURIComponent(playerName)}`;
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {shouldReconnect: (closeEvent) => true});

    const [nPlayers, setNPlayers] = useState(0)
    const [gameState, setGameState] = useState()
    const [connectionEstablished, setConnectionEstablished] = useState(false)
    const [guesses, setGuesses] = useState([])

    useEffect(() => {
        const connectionStatus = {
            [ReadyState.CONNECTING]: 'Connecting',
            [ReadyState.OPEN]: 'Open',
            [ReadyState.CLOSING]: 'Closing',
            [ReadyState.CLOSED]: 'Closed',
            [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
          }[readyState];
        console.log("READY STATE: ", readyState, connectionStatus)
        if (readyState === ReadyState.OPEN) {
            setConnectionEstablished(true)
        } else {
            setConnectionEstablished(false)
        }
    }
    , [readyState])

    useEffect(() => {
        if (lastMessage !== null) {
            const event = JSON.parse(lastMessage.data)
            console.log(event)

            const type = event.type
            const data = event.data

            if (type === "players_info") {
                setNPlayers(data.n_players)
            }
            if (type === "game_state") {
                setGameState(data)
            }
            if (type === "error") {
                alert(data.message)
            }
        }
    }, [lastMessage]);

    function updateGuesses(guesses) {
        const cleanGuesses = guesses.map((guess) => guess.toLowerCase().trim())
        sendMessage(JSON.stringify({ words: cleanGuesses.filter((v) => v.length > 0) }))
        setGuesses(cleanGuesses)
    }

    if (!connectionEstablished) {
        return <div>
            Connection en cours...
        </div>
    }
    return <div>
        <div>
            Bonjour {playerName}. 
            Il y a {nPlayers} joueurs en ligne actuellement
            {
                !! gameState ?
                    gameState.round.is_completed ? <CompletedRound gameState={gameState} guesses={guesses} playerName={playerName} /> : 
                    <OngoingRound gameState={gameState} sendGuesses={updateGuesses} /> 
                    : <></>
            }
        </div>
    </div>
}

export default Game

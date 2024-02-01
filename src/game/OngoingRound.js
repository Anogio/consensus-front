import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import { N_GUESSES } from '../constants';
import { useDebounce } from 'use-debounce';

function OngoingRound({gameState, sendGuesses}) {
    const [guesses, setGuesses] = useState(Array(N_GUESSES).fill("") )
    const [debouncedGuesses] = useDebounce(guesses, 500);

    function updateGuesses(indexToUpdate, newValue) {
        setGuesses(guesses.map((value, index) => index === indexToUpdate ? newValue : value))
    }

    useEffect(() => {
        sendGuesses(debouncedGuesses)
    }, [debouncedGuesses])

    return <div>
        <div>
        Le thème est: <b>{gameState.round.theme_word}</b>. Temps restant: <Countdown date={Date.parse(gameState.round_end)} />
        </div>
        <div>
            {
               Array.from(Array(N_GUESSES).keys()).map((index) =>
                <input key={index} placeholder={`Mot ${index + 1}`} value={guesses[index]}  onChange={e => updateGuesses(index, e.target.value)} />
               
               )
            }
        </div>
    </div>
}

export default OngoingRound
import React from 'react';
import Countdown from 'react-countdown';

function CompletedRound({gameState, guesses, playerName}) {
    const yourRank = gameState.result.ranked_score_by_player_name.findIndex((item) => item.player_name === playerName)
    const yourScore = (yourRank !== -1) ? gameState.result.ranked_score_by_player_name[yourRank].score : undefined

    return <div>
        <div>Le thème était: <b>{gameState.round.theme_word}</b>. Prochaine manche dans: <Countdown date={Date.parse(gameState.next_round_start)} /></div>
        <br/>
        {yourScore ? <div>Vous finissez au rang {yourRank + 1} avec un score de {yourScore} !</div> : <></>}
        <div>
            {
                guesses.map((guess) => {
                    const value = guess.length ? gameState.result.ranked_value_by_word.find((item) => item.word === guess).value : undefined
                    if (value !== undefined) {
                        return <input disabled value={`${guess} - ${value} points`} />
                    }
                    return <input disabled value="" />
                })
            }
        </div>
        <br />
        <div>
            Classement des joueurs:
            </div><div> 
            {
                gameState.result.ranked_score_by_player_name.map((item) => ` ${item.player_name}: ${item.score},`)
            }
        </div>
        <div>Meilleurs mots:
        </div><div> 
            {
                gameState.result.ranked_value_by_word.map((item) => ` ${item.word}: ${item.value},`)
            }
        </div>
    </div>
}

export default CompletedRound
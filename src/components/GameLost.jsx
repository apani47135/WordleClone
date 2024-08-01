import React, { useContext } from "react";
import { WordleContext } from "../Context/WordleContext";

function GameLost() {
  const { state } = useContext(WordleContext);

  return (
    <>
      <br />
      <div>Thanks for playing!</div>
      <br />
      <div>The correct answer was {state.wordToGuess}</div>
      <br />
      <div>Refresh to play again</div>
    </>
  );
}

export default GameLost;

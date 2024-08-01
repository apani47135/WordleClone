import React, { useContext, useEffect, useState } from "react";
import Wordrow from "./Wordrow";
import { WordleContext } from "../Context/WordleContext";
import { Container } from "@mui/material";
import GameLost from "./GameLost";
import Keyboard from "./Keyboard";

function Wordgrid() {
  const { state, dispatch } = useContext(WordleContext);
  console.log(state);
  const items = Array(6).fill(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch random word
    const fetchRandomWord = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(
          "https://random-word-api.herokuapp.com/word?length=5"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        dispatch({ type: "SET_WORD", word: data[0] }); // Dispatch the word to the context
      } catch (error) {
        console.error("Error fetching random word:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchRandomWord(); // Call the function to fetch the word
  }, []); // Empty dependency array ensures this runs once when component mounts

  return (
    <Container component="section" sx={{ p: 2, width: "100%" }} maxWidth="xs">
      <h1>Wordle Clone</h1>
      {loading && <p>Loading...</p>}
      {!loading &&
        (!state.finished || (state.finished && state.game_won)) &&
        items.map((_, index) => (
          <Wordrow active={index} key={`wordrow_${index}`} />
        ))}
      {!loading && state.finished && state.game_won && (
        <div>
          <br />
          Congrats, you won!
          <br />
          Refresh to play again
        </div>
      )}
      {!loading && state.finished && !state.game_won && <GameLost />}
      {!loading && !state.finished && <Keyboard />}
    </Container>
  );
}

export default Wordgrid;

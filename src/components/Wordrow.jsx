import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { WordleContext } from "../Context/WordleContext";

function Wordrow(props) {
  const { state, dispatch } = useContext(WordleContext);

  const [currentGuess, setCurrentGuess] = useState("");
  const [guessAccuracy, setGuessAccuracy] = useState([]);

  //Function to determine accuracy of the current guess
  const determineAccuracy = () => {
    const result = [];
    const solution = state.wordToGuess;
    const guess = currentGuess;

    // Arrays to keep track of matched letters
    const solutionMatches = new Array(solution.length).fill(false);
    const guessMatches = new Array(guess.length).fill(false);

    // First pass: Check for correct letters in the correct positions (green)
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === solution[i]) {
        result[i] = "green";
        solutionMatches[i] = true;
        guessMatches[i] = true;
        dispatch({
          type: "SET_LETTERS_GUESSED",
          lettersGuessed: { currentLetter: guess[i], color: "green" },
        });
      }
    }

    // Second pass: Check for correct letters in wrong positions (yellow)
    for (let i = 0; i < guess.length; i++) {
      if (!guessMatches[i]) {
        // Only check unmatched letters
        for (let j = 0; j < solution.length; j++) {
          if (!solutionMatches[j] && guess[i] === solution[j]) {
            result[i] = "yellow";
            dispatch({
              type: "SET_LETTERS_GUESSED",
              lettersGuessed: { currentLetter: guess[i], color: "yellow" },
            });
            solutionMatches[j] = true;
            break;
          }
        }
      }
      if (!result[i]) {
        result[i] = "gray"; // Mark unmatched letters with blank
        dispatch({
          type: "SET_LETTERS_GUESSED",
          lettersGuessed: { currentLetter: guess[i], color: "gray" },
        });
      }
    }

    console.log(result);
    setGuessAccuracy(result);
  };

  const handleEnter = () => {
    determineAccuracy();
    if (currentGuess === state.wordToGuess) {
      dispatch({ type: "FINISH_GAME", finished: true, game_won: true });
    } else if (state.guess === 5 && currentGuess !== state.wordToGuess) {
      dispatch({ type: "FINISH_GAME", finished: true, game_won: false });
    } else {
      dispatch({ type: "INCREMENT" });
    }
  };

  useEffect(() => {
    if (props.active !== state.guess || state.finished) return;
    const handleKeydown = (event) => {
      const allowedKeys = /^[a-zA-Z]$/;
      const key = event.key.toLowerCase();
      if (event.key === "Enter") {
        if (currentGuess.length < 5) {
          alert("Please enter a valid guess");
        } else {
          handleEnter();
        }
      } else if (key === "backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (allowedKeys.test(key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess((prev) => prev + key.toUpperCase());
        }
      }
    };
    // Add event listener on component mount
    window.addEventListener("keydown", handleKeydown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [currentGuess, state.guess]);

  const items = Array(5).fill(null);
  return (
    <Grid container spacing={1} marginTop={1} justifyContent="center">
      {items.map((_, index) => (
        <Grid item xs={2} key={`letter_${index}`}>
          <Box
            sx={{
              backgroundColor:
                guessAccuracy[index] === "green"
                  ? "green"
                  : guessAccuracy[index] === "yellow"
                  ? "yellow"
                  : guessAccuracy[index] === "gray"
                  ? "gray"
                  : "#F5F5F5",
              width: "100%", // Responsive width
              maxWidth: "60px", // Maximum width to maintain box size
              height: "60px", // Fixed height
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #E0E0E0",
              borderRadius: "5px",
              fontSize: "1.5em",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            <p>{currentGuess[index]}</p>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default Wordrow;

import React, { createContext, useReducer } from "react";

// Define action types
const INCREMENT = "INCREMENT";
const FINISH_GAME = "FINISH_GAME";
const SET_WORD = "SET_WORD";
const SET_LETTERS_GUESSED = "SET_LETTERS_GUESSED";

// Initial state
const initialState = {
  guess: 0,
  finished: false,
  game_won: false,
  wordToGuess: "",
  lettersGuessed: [],
};
// Reducer function
const wordleReducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, guess: state.guess + 1 };
    case FINISH_GAME:
      return { ...state, finished: action.finished, game_won: action.game_won };
    case SET_WORD:
      console.log("Setting word:", action.word);
      return { ...state, wordToGuess: action.word.toUpperCase() };
    case SET_LETTERS_GUESSED:
      const index = state.lettersGuessed.findIndex(
        (item) => item.currentLetter === action.lettersGuessed.currentLetter
      );
      if (index != -1) {
        const updatedData = state.lettersGuessed;
        updatedData[index] = {
          ...updatedData[index],
          color: action.lettersGuessed.color,
        };
        return { ...state, lettersGuessed: updatedData };
      }
      const newLettersGuessed = [
        ...state.lettersGuessed,
        action.lettersGuessed,
      ];
      return { ...state, lettersGuessed: newLettersGuessed };

    default:
      return state;
  }
};
// Create the context
export const WordleContext = createContext();

export const WordleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wordleReducer, initialState);

  return (
    <WordleContext.Provider value={{ state, dispatch }}>
      {children}
    </WordleContext.Provider>
  );
};

import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { WordleContext } from "../Context/WordleContext";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

function Keyboard() {
  const { state } = useContext(WordleContext);

  const hasLetterBeenUsed = (letter) => {
    console.log("in here");
    // Find the object with the specified id
    const foundObject = state.lettersGuessed.find(
      (item) => item.currentLetter === letter
    );

    // Return the age of the found object or a default value if not found
    return foundObject ? foundObject.color : "";
  };

  const simulateKeyPress = (key) => {
    const event = new KeyboardEvent("keydown", {
      key: key,
      code: `Key${key.toUpperCase()}`,
      keyCode: key.charCodeAt(0),
      charCode: key.charCodeAt(0),
      bubbles: true,
    });

    window.dispatchEvent(event);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {keys.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 0.5,
            mb: 1,
          }}
        >
          {row.map((key) => (
            <Button
              key={key}
              variant="contained"
              onClick={() => simulateKeyPress(key)}
              sx={{
                flex: 1,
                minWidth: 0,
                padding: "10px 0",
                fontSize: "1rem",
                backgroundColor: hasLetterBeenUsed(key),
              }}
            >
              {key}
            </Button>
          ))}
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
        <Button
          variant="contained"
          onClick={() => simulateKeyPress("Backspace")}
          sx={{ flex: 1, minWidth: 0, padding: "10px 0", fontSize: "1rem" }}
        >
          Backspace
        </Button>
        <Button
          variant="contained"
          onClick={() => simulateKeyPress("Enter")}
          sx={{ flex: 1, minWidth: 0, padding: "10px 0", fontSize: "1rem" }}
        >
          Enter
        </Button>
      </Box>
    </Box>
  );
}

export default Keyboard;

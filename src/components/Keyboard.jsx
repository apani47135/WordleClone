import React from "react";
import { Box, Button } from "@mui/material";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

function Keyboard() {
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

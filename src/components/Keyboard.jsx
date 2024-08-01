import React from "react";
import { Box, Grid, Button } from "@mui/material";

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
        <Grid container spacing={0} justifyContent="center" key={rowIndex}>
          {row.map((key) => (
            <Grid item key={key}>
              <Button
                variant="contained"
                onClick={() => simulateKeyPress(key)}
                sx={{
                  maxWidth: "30px",
                  maxHeight: "30px",
                  margin: "2px",
                  fontSize: "1rem",
                }}
              >
                {key}
              </Button>
            </Grid>
          ))}
        </Grid>
      ))}
      <Grid container spacing={1} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            onClick={() => simulateKeyPress("Enter")}
            sx={{ minWidth: "70px", minHeight: "40px", margin: "5px" }}
          >
            Enter
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => simulateKeyPress("Backspace")}
            sx={{ minWidth: "70px", minHeight: "40px", margin: "5px" }}
          >
            Backspace
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Keyboard;

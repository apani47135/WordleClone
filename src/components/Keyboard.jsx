import React from "react";
import { Box, Grid, Button } from "@mui/material";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

function CustomKeyboard({ onKeyPress }) {
  return (
    <Box sx={{ mt: 2 }}>
      {keys.map((row, rowIndex) => (
        <Grid container spacing={1} justifyContent="center" key={rowIndex}>
          {row.map((key) => (
            <Grid item key={key}>
              <Button
                variant="contained"
                onClick={() => onKeyPress(key)}
                sx={{
                  minWidth: "40px",
                  minHeight: "40px",
                  margin: "5px",
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
            onClick={() => onKeyPress("Enter")}
            sx={{ minWidth: "70px", minHeight: "40px", margin: "5px" }}
          >
            Enter
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => onKeyPress("Backspace")}
            sx={{ minWidth: "70px", minHeight: "40px", margin: "5px" }}
          >
            Backspace
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CustomKeyboard;

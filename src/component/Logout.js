import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Logout() {
  const nevigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/user/logout");
      console.log(res);

      nevigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onChange={handleSubmit}
        >
          Logout
        </Button>
        <Grid container>
          <Grid item xs></Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

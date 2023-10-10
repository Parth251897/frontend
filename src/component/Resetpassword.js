import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import api from "./api.js";
import { useNavigate } from "react-router-dom";

function Resetpassword() {
  const navigate = useNavigate();

  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(""); 

  async function handleResetPassword(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/setnewpassword", { email,password,confirmPassword });
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
          <h1>Reset Password Page</h1>
          <form onSubmit={handleResetPassword}>
          <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => email(e.target.value)}
            />
            <br />
            <br />
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <br />
            <br />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Reset Password
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Resetpassword;

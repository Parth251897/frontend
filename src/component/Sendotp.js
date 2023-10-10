import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import api from "./api.js";
import { useNavigate } from "react-router-dom";

function Sendotp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState("");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleEmailSubmit(e) {
    e.preventDefault();

    if (!isEmailValid) {
      alert("Email address is invalid");
      return;
    }

    try {
      const res = await api.post("/sentotp", { email });
      console.log(res.data);

      setEmailSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleOtpSubmit(e) {
    e.preventDefault();

    if (otp === "") {
      alert("OTP is required");
    } else {
      try {
        const ress = await api.post("/verifyotp", { email, otp });

        setEmailSubmitted(true);
        navigate("/Resetpassword");
      } catch (error) {
        alert("OTP is invalied");
        console.log(error);
      }
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
          <h1>OTP Verification Page</h1>
          <form onSubmit={emailSubmitted ? handleOtpSubmit : handleEmailSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={emailSubmitted}
            />
            <br />
            <br />
            {emailSubmitted ? (
              <>
                <TextField
                  label="OTP"
                  variant="outlined"
                  fullWidth
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <br />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  href="/Resetpassword"
                >
                  Verify OTP
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!isEmailValid}
                >
                  Send Email
                </Button>
              </>
            )}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Sendotp;

import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "./api.js";
import { useNavigate } from "react-router-dom";

function PasswordChangeForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.patch("/updatepassword", formData);
      if (res.status === 200) {
        navigate("/Header");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        console.error("Password change failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "300px", margin: "0 auto" }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          type="password"
          label="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          label="Confirm New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Change Password
        </Button>
      </form>
    </Paper>
  );
}

export default PasswordChangeForm;

import React, { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TextField, Button, Container, Typography, Grid } from "@mui/material";
import axios from "axios";
// import "./common.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Registration() {
  const [userdetail, setuserdetail] = useState([]);

  const [createuser, setcreateuser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    // role: "",
  });

  async function getalluserdetails() {
    try {
      const result = await axios.get(
        `http://localhost:5000/user/alluserdetail`
      );
      

      setuserdetail(result.data.userfind);
    } catch (error) {
      console.log(error);
    }
  }

  async function adduser() {
    try {
      const result = await axios.post(
        `http://localhost:5000/user/register`,
        createuser
      );
      await getalluserdetails();
      // setcreateuser(result.data.Register);

      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getalluserdetails();
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setcreateuser((val) => ({ ...val, [name]: value }));
  };

  



  return (
    <Container maxWidth="md">
      <Paper elevation={3} className="form-container">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">Register</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              onChange={handleChange}
              value={createuser.name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              onChange={handleChange}
              value={createuser.email}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              value={createuser.password}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              type="number"
              name="phone"
              onChange={handleChange}
              value={createuser.phone}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={adduser}
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} className="user-table">
        <Typography variant="h5" align="center">User Details</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              {/* <TableCell>Is Activated</TableCell> */}
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userdetail?.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.name}</TableCell>
                <TableCell>{v.email}</TableCell>
                <TableCell>{v.phone}</TableCell>
                <TableCell>{v.role}</TableCell>
                {/* <TableCell>{v.isActivated}</TableCell> */}
                <TableCell>{v.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default Registration;

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid, // Import Grid component
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import api from "./api.js";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userdetail, setUserDetail] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/logout");
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function getalluserdetails() {
    try {
      const result = await api.get("/alluserdetail");
      setUserDetail(result.data.userfind);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getalluserdetails();
  }, []);

  return (
    <>
      <div>
        <AppBar sx={{ bgcolor: "text.primary" }}>
          <Toolbar>
            <Typography sx={{ color: "white" }}>ADMIN</Typography>
            <Button
              sx={{ color: "white", marginLeft: "auto" }}
              onClick={handleSubmit}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Grid container>
          {/* Sidebar */}
          <Grid item xs={3}>
            <Box
              sx={{
                width: 200,
                bgcolor: "black",
                height: "100vh",
                marginTop: "64px",
                border: "1px solid black",
                position: "fixed",
              }}
            >
              <nav>
                <List>
                  <ListItem disablePadding>
                    <Link
                      to="/dashboard/Dashboard"
                      style={{ textDecoration: "none" }}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <MdDashboard style={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Dashboard"
                          primaryTypographyProps={{ style: { color: "white" } }}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link
                      to="/Changepassword"
                      style={{ textDecoration: "none" }}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <HomeIcon style={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Change Password"
                          primaryTypographyProps={{ style: { color: "white" } }}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem disablePadding>
                    <Link
                      to="/dashboard/cart"
                      style={{ textDecoration: "none" }}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <ShoppingCartCheckoutIcon
                            style={{ color: "white" }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="Cart"
                          primaryTypographyProps={{ style: { color: "white" } }}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                </List>
              </nav>
            </Box>
          </Grid>
          {/* User Details Table */}

          <Grid item xs={10} sm={8} md={12} lg={8}>
            <Paper
              elevation={3}
              className="user-table"
              style={{ marginTop: "80px" }}
            >
              <>
                <Typography variant="h6" align="center">
                  User Details
                </Typography>
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
                  {userdetail?.map((v) => (
                    <TableBody>
                      <TableRow key={v.id}>
                        <TableCell>{v.name}</TableCell>
                        <TableCell>{v.email}</TableCell>
                        <TableCell>{v.phone}</TableCell>
                        <TableCell>{v.role}</TableCell>
                        {/* <TableCell>{v.isActivated}</TableCell> */}
                        <TableCell>{v.created}</TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                </Table>
              </>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

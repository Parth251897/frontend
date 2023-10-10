import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export default function ListComponent() {
  return (
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
            <Link to="/dashboard/Dashboard" style={{ textDecoration: "none" }}>
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
            <Link to="/dashboard/home" style={{ textDecoration: "none" }}>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Product List"
                  primaryTypographyProps={{ style: { color: "white" } }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link to="/dashboard/cart" style={{ textDecoration: "none" }}>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingCartCheckoutIcon style={{ color: "white" }} />
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
  );
}

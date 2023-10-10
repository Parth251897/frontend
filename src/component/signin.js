import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2,'min req').max(50,'max req').required("Username is required"),
  email: Yup.string().email('Invalid email').required('email is Required'),
  phone: Yup.string().required("phoneNumber is required"),
  password: Yup.string().min(8,'').max(12,'').required("Password is required"),
  role: Yup.string().required("Role is required"),
});

export default function Loginn() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/user/register",
          values
        );
        console.log(res);
        const userToken = res.data.accesstoken;
        localStorage.setItem("authorization", userToken);
        if (res.status === 200) {
          toast.success("Create SUCESSFULLY");
          navigate("/");
        } else {
          toast.error("user not Create");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="MasterField"
              label="Username or email or phone"
              name="MasterField"
              onChange={formik.handleChange}
              value={formik.values.MasterField}
              autoFocus
              error={
                formik.touched.MasterField && Boolean(formik.errors.MasterField)
              }
              helperText={
                formik.touched.MasterField && formik.errors.MasterField
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.role}
                label="Role"
                onChange={formik.handleChange}
                name="role"
                fullWidth
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="supervisor">Supervisor</MenuItem>
              </Select>
              {formik.touched.role && formik.errors.role && (
                <div className="error">{formik.errors.role}</div>
              )}
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/Sendotp" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Sign-Up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}

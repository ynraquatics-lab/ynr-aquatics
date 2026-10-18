import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
  Link,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Validation errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (email: string) => {
    // simple email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const signup = () => {
    let hasError = false;

    // Name validation
    if (!name.trim()) {
      setNameError("Full Name is required");
      hasError = true;
    } else setNameError("");

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      hasError = true;
    } else setEmailError("");

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    } else setPasswordError("");

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm your password");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      hasError = true;
    } else setConfirmPasswordError("");

    if (hasError) return;

    // If no errors, submit form (for now just console.log)
    console.log({ name, email, password, confirmPassword });

    // TODO: integrate Keycloak signup API or redirect
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 380, borderRadius: 3 }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          Create Account
        </Typography>

        {/* Name */}
        <TextField
          fullWidth
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Email */}
        <TextField
          fullWidth
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Password */}
        <TextField
          fullWidth
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password */}
        <TextField
          fullWidth
          placeholder="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Signup Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{ borderRadius: 3, py: 1.2, mb: 2 }}
          onClick={signup}
        >
          Sign Up
        </Button>

        {/* Login Link */}
        <Typography variant="body2" textAlign="center" mb={2}>
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/login"
            sx={{
              fontWeight: 600,
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Sign in
          </Link>
        </Typography>

        <Divider sx={{ mb: 2 }}>Or sign up with</Divider>

        {/* Social Signup */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
            <GoogleIcon />
          </IconButton>
          <IconButton sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
            <FacebookIcon />
          </IconButton>
          <IconButton sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
            <AppleIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignupPage;

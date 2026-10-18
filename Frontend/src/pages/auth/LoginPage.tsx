import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";

import { Link as RouterLink } from "react-router-dom";
import { keycloakLogin } from "../../features/auth/authSlice";  
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, accessToken } = useAppSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  // redirect after login
  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard"); // change to your dashboard route
    }
  }, [accessToken, navigate]);

  // login button click
  const login = (): void => {
    // validation
    let hasError = false;
    if (!email) {
      setEmailError("Username required");
      hasError = true;
    } else setEmailError("");

    if (!password) {
      setPasswordError("Password required");
      hasError = true;
    } else setPasswordError("");

    if (hasError) return;

    // dispatch Redux thunk
    dispatch(keycloakLogin({ username: email, password }));
  };

  const forgotPassword = (): void => {
    window.location.href =
      "http://keycloak-url/realms/your-realm/account"; // Keycloak forgot password
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
        <Typography variant="h5" textAlign="center" mb={1}>
          Login
        </Typography>

        {/* Username */}
        <TextField
          fullWidth
          placeholder="User Name"
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Forgot password */}
        <Box sx={{ textAlign: "right", mt: 1, mb: 2 }}>
          <Link
            component="button"
            variant="body2"
            onClick={forgotPassword}
            sx={{
              color: "black",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Forgot password?
          </Link>
        </Box>

        {/* Redux error */}
        {error && (
          <Typography variant="body2" color="error" mb={2}>
            {error}
          </Typography>
        )}

        {/* Login button */}
        <Button
          variant="contained"
          fullWidth
          sx={{ borderRadius: 3, py: 1.2, mb: 3 }}
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Get Started"}
        </Button>

        {/* Signup link */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="body2">
            Don’t have an account?{" "}
            <Link
              component={RouterLink}
              to="/signup"
              sx={{
                fontWeight: 600,
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }}>Or sign in with</Divider>

        {/* Social icons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton
            onClick={login}
            sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}
          >
            <GoogleIcon />
          </IconButton>

          <IconButton
            onClick={login}
            sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}
          >
            <FacebookIcon />
          </IconButton>

          <IconButton
            onClick={login}
            sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}
          >
            <AppleIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;

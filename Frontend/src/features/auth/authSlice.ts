import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginRequest {
  username: string;
  password: string;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

/* ---------- KEYCLOAK LOGIN ---------- */
export const keycloakLogin = createAsyncThunk<
  TokenResponse,
  LoginRequest,
  { rejectValue: string }
>("auth/keycloakLogin", async (data, { rejectWithValue }) => {
  try {
    const form = new URLSearchParams();
    form.append("client_id", "frontend-client");
    form.append("grant_type", "password");
    form.append("username", data.username);
    form.append("password", data.password);

    const res = await axios.post<TokenResponse>(
      "http://localhost:8080/realms/myrealm/protocol/openid-connect/token",
      form,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    return res.data;
  } catch {
    return rejectWithValue("Invalid username or password");
  }
});

/* ---------- SLICE ---------- */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(keycloakLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(keycloakLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
      })
      .addCase(keycloakLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

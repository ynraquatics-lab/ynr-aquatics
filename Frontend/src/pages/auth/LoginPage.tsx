import { useEffect, useState, type FormEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { keycloakLogin } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import loginBackground from "../../assets/images/Backgroun_img_login.png";
import "./AuthPage.css";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    document.title = "YNR Aquatics | Log in";
  }, []);

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken, navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextUsernameError = username.trim() ? "" : "Username is required.";
    const nextPasswordError = password ? "" : "Password is required.";

    setUsernameError(nextUsernameError);
    setPasswordError(nextPasswordError);

    if (nextUsernameError || nextPasswordError || loading) {
      return;
    }

    dispatch(keycloakLogin({ username: username.trim(), password }));
  };

  return (
    <main
      className="registration-page"
      style={{
        backgroundImage:
          `linear-gradient(115deg, rgba(3, 28, 47, .9), rgba(5, 67, 83, .62)), url("${loginBackground}")`,
      }}
    >
      <div className="registration-shell">
        <section className="registration-intro" aria-labelledby="brand-title">
          <a className="brand-lockup" href="/" aria-label="YNR Aquatics home">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path
                  d="M7 28c5 0 5-5 10-5s5 5 10 5 5-5 10-5 5 5 10 5M7 37c5 0 5-5 10-5s5 5 10 5 5-5 10-5 5 5 10 5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M24 5c-5.2 6.1-8 10.4-8 14a8 8 0 0 0 16 0c0-3.6-2.8-7.9-8-14Z"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="brand-name">
              YNR <span>AQUATICS</span>
            </span>
          </a>

          <div className="intro-copy">
            <p className="eyebrow">GOOD TO HAVE YOU BACK</p>
            <h1 id="brand-title">
              Your next
              <br />
              <span>adventure awaits.</span>
            </h1>
            <p className="intro-description">
              Sign in to pick up where the water takes you.
            </p>
          </div>

          <p className="intro-note">
            <span aria-hidden="true" />
            A deeper connection to the water.
          </p>
        </section>

        <section className="registration-card" aria-labelledby="form-title">
          <div className="card-heading">
            <p className="card-eyebrow">WELCOME BACK</p>
            <h2 id="form-title">Log in to your account</h2>
            <p>Enter your details to continue.</p>
          </div>

          <form
            className="registration-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="field-group">
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setUsernameError("");
                }}
                aria-invalid={Boolean(usernameError)}
                aria-describedby={
                  usernameError ? "login-username-error" : undefined
                }
              />
              {usernameError && (
                <p
                  className="field-message field-error"
                  id="login-username-error"
                >
                  {usernameError}
                </p>
              )}
            </div>

            <div className="field-group">
              <label htmlFor="login-password">Password</label>
              <div className="password-control">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setPasswordError("");
                  }}
                  aria-invalid={Boolean(passwordError)}
                  aria-describedby={
                    passwordError ? "login-password-error" : undefined
                  }
                />
                <button
                  className="password-toggle"
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 7 9 7a15 15 0 0 1-3.1 3.8M6.2 6.2C4.1 7.6 3 10 3 12c0 0 3.5 7 9 7a9.8 9.8 0 0 0 4.1-.9" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && (
                <p
                  className="field-message field-error"
                  id="login-password-error"
                >
                  {passwordError}
                </p>
              )}
            </div>

            {error && (
              <p className="submission-message" role="alert">
                {error}
              </p>
            )}

            <button
              className="register-button"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? "Logging in..." : "Log in"}</span>
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="login-prompt">
            Don’t have an account? <RouterLink to="/signup">Register</RouterLink>
          </p>

          <div className="card-footer">
            <span aria-hidden="true" />
            <span>BUILT FOR LIFE IN THE WATER</span>
            <span aria-hidden="true" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;

import { useState, type FormEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import loginBackground from "../../assets/images/Backgroun_img_login.png";
import {
  validateRegistrationForm,
  type RegistrationFormData,
  type ValidationErrors,
} from "../../features/auth/registration";
import { registerUser } from "../../features/auth/registrationService";
import "./AuthPage.css";

const SignupPage = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const validationErrors = validateRegistrationForm(formData);
    setErrors(validationErrors);
    setSubmissionError(null);
    setSubmissionSuccess(null);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser({
        ...formData,
        username: formData.username.trim(),
      });
      setSubmissionSuccess("Your YNR Aquatics account has been created.");
    } catch {
      setSubmissionError(
        "We couldn't confirm your registration. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field: keyof RegistrationFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmissionError(null);
    setSubmissionSuccess(null);
  };

  return (
    <main
      className="registration-page"
      style={{
        backgroundImage: `linear-gradient(115deg, rgba(3, 28, 47, .9), rgba(5, 67, 83, .62)), url("${loginBackground}")`,
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
            <p className="eyebrow">FIND YOUR FLOW</p>
            <h1 id="brand-title">
              Make a splash
              <br />
              with <span>YNR Aquatics.</span>
            </h1>
            <p className="intro-description">
              Your next aquatic adventure starts here. Create an account and
              dive in.
            </p>
          </div>

          <p className="intro-note">
            <span aria-hidden="true" />
            A deeper connection to the water.
          </p>
        </section>

        <section className="registration-card" aria-labelledby="form-title">
          <div className="card-heading">
            <p className="card-eyebrow">WELCOME TO THE WATER</p>
            <h2 id="form-title">Create your account</h2>
            <p>Join the YNR Aquatics community.</p>
          </div>

          <form className="registration-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                minLength={3}
                required
                placeholder="Enter your username"
                value={formData.username}
                disabled={isSubmitting}
                onChange={(event) =>
                  handleFieldChange("username", event.target.value)
                }
                aria-invalid={Boolean(errors.username)}
                aria-describedby={
                  errors.username ? "username-error" : "username-hint"
                }
              />
              {errors.username ? (
                <p className="field-message field-error" id="username-error">
                  {errors.username}
                </p>
              ) : (
                <p className="field-message field-hint" id="username-hint">
                  Use 3–32 characters.
                </p>
              )}
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <div className="password-control">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  minLength={8}
                  required
                  placeholder="Create a password"
                  value={formData.password}
                  disabled={isSubmitting}
                  onChange={(event) =>
                    handleFieldChange("password", event.target.value)
                  }
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : "password-hint"
                  }
                />
                <button
                  className="password-toggle"
                  type="button"
                  disabled={isSubmitting}
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
              {errors.password ? (
                <p className="field-message field-error" id="password-error">
                  {errors.password}
                </p>
              ) : (
                <p className="field-message field-hint" id="password-hint">
                  Use at least 8 characters.
                </p>
              )}
            </div>

            {submissionError && (
              <p className="submission-message" role="alert">
                {submissionError}
              </p>
            )}

            {submissionSuccess && (
              <p className="submission-message submission-success" role="status">
                {submissionSuccess}
              </p>
            )}

            <button
              className="register-button"
              type="submit"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Registering..." : "Register"}</span>
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="login-prompt">
            Already have an account?{" "}
            <RouterLink to="/login">Log in</RouterLink>
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

export default SignupPage;

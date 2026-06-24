import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthBrandPanel from "../components/AuthBrandPanel";
import ScreenLoader from "../components/ScreenLoader";
import {
  UserIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from "../components/icons";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";

const getErrorMessage = (error) =>
  error?.response?.data?.message ?? "Registration failed. Please try again.";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { user, loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <ScreenLoader label="Checking your session" />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await handleRegister({ username, email, password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <AuthBrandPanel
        heading="Hire faster with AI-led interviews your team can trust."
        subheading="Create your account to start building interview flows and reviewing candidates with AI assistance."
      />

      <div className="form-panel">
        <div className="form-container">
          <div className="form-header">
            <h1>Create your account</h1>
            <p>Start your free trial, no credit card required</p>
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <UserIcon className="input-icon" />
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <MailIcon className="input-icon" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <LockIcon className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <label className="checkbox-row">
              <input type="checkbox" required />I agree to the Terms of Service
              and Privacy Policy
            </label>

            <button
              type="submit"
              className="button primary-button full-width"
              disabled={isSubmitting}
            >
              {isSubmitting ? <span className="spinner" /> : "Create account"}
            </button>
          </form>

          <p className="switch-auth">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;

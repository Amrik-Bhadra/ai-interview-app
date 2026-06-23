import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthBrandPanel from "../components/AuthBrandPanel";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from "../components/icons";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate('/');
  };

  return (
    <main>
      <AuthBrandPanel
        heading="Run interviews that feel human, powered by AI."
        subheading="Sign in to manage your interview pipelines, candidates, and AI-generated insights in one place."
      />

      <div className="form-panel">
        <div className="form-container">
          <div className="form-header">
            <h1>Welcome back</h1>
            <p>Log in to continue to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit}>
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
                  placeholder="Enter password"
                  autoComplete="current-password"
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

            <div className="form-options">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button
              className="button primary-button full-width"
              disabled={loading}
            >
              {loading ? <span className="spinner" /> : "Login"}
            </button>
          </form>

          <p className="switch-auth">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;

import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthBrandPanel from "../components/AuthBrandPanel";
import ScreenLoader from "../components/ScreenLoader";
import { MailIcon, ArrowLeftIcon } from "../components/icons";
import { useAuth } from "../hooks/useAuth";
import { forgotPassword } from "../services/auth.api";
import "../auth.form.scss";
import { usePageTitle } from "../../../hooks/usePageTitle";

const getErrorMessage = (error) =>
  error?.response?.data?.message ?? "Something went wrong. Please try again.";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  usePageTitle("Forgot Password");

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <ScreenLoader label="Checking your session" />;
  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await forgotPassword({ email });
      setSent(true);
      setTimeout(() => navigate("/verify-otp", { state: { email } }), 1400);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <AuthBrandPanel
        heading="Let's get you back in."
        subheading="Reset your password and pick up your interview prep right where you left off."
      />

      <div className="form-panel">
        <div className="form-container">
          <Link to="/login" className="back-link-auth">
            <ArrowLeftIcon /> Back to login
          </Link>

          <div className="form-header">
            <h1>{sent ? "Check your inbox" : "Forgot password?"}</h1>
            <p>
              {sent
                ? `We sent a verification code to ${email}. Redirecting you now…`
                : "Enter your registered email and we'll send you a one-time password."}
            </p>
          </div>

          {!sent && (
            <>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="email">Email address</label>
                  <div className="input-wrapper">
                    <MailIcon className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="button primary-button full-width"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <span className="spinner" /> : "Send OTP"}
                </button>
              </form>

              <p className="switch-auth">
                Remembered it? <Link to="/login">Login</Link>
              </p>
            </>
          )}

          {sent && (
            <div className="sent-confirmation">
              <div className="sent-icon" aria-hidden="true">
                ✉
              </div>
              <p>
                Didn't get it? Check your spam folder or{" "}
                <button className="inline-link" onClick={() => setSent(false)}>
                  try again
                </button>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;

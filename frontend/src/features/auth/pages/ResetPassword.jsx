import { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthBrandPanel from "../components/AuthBrandPanel";
import ScreenLoader from "../components/ScreenLoader";
import { LockIcon, EyeIcon, EyeOffIcon, KeyIcon, ArrowLeftIcon } from "../components/icons";
import { useAuth } from "../hooks/useAuth";
import { resetPassword } from "../services/auth.api";
import "../auth.form.scss";
import { usePageTitle } from "../../../hooks/usePageTitle";

const getErrorMessage = (error) =>
  error?.response?.data?.message ?? "Failed to reset password. Please try again.";

const getStrength = (pw) => {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
const strengthClass = ["", "weak", "fair", "good", "strong"];

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  usePageTitle("Reset Password");

  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;
  const resetToken = state?.resetToken; // was: otp — now the signed token from verifyOtp

  // Guard: both email and resetToken must be present
  useEffect(() => {
    if (!loading && (!email || !resetToken)) {
      navigate("/forgot-password", { replace: true });
    }
  }, [loading, email, resetToken, navigate]);

  if (loading) return <ScreenLoader label="Checking your session" />;
  if (user) return <Navigate to="/" replace />;
  if (!email || !resetToken) return null;

  const strength = getStrength(newPassword);
  const mismatch = confirmPassword && newPassword !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mismatch || strength < 2) return;
    setError("");
    setIsSubmitting(true);

    try {
      // Backend expects: { email, resetToken, newPassword }
      await resetPassword({ email, resetToken, newPassword });
      setSuccess(true);
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <AuthBrandPanel
        heading="Set a strong new password for your account."
        subheading="Choose something you haven't used before. Your account security matters to us."
      />

      <div className="form-panel">
        <div className="form-container">
          <Link to="/verify-otp" className="back-link-auth">
            <ArrowLeftIcon /> Back
          </Link>

          <div className="form-header">
            <h1>{success ? "Password updated!" : "Reset your password"}</h1>
            <p>
              {success
                ? "Redirecting you to login…"
                : "Must be at least 8 characters with a number and uppercase letter."}
            </p>
          </div>

          {!success && (
            <>
              {error && <p className="form-error" role="alert">{error}</p>}

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="newPassword">New password</label>
                  <div className="input-wrapper">
                    <KeyIcon className="input-icon" />
                    <input
                      type={showNew ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-visibility"
                      onClick={() => setShowNew((v) => !v)}
                      aria-label={showNew ? "Hide password" : "Show password"}
                    >
                      {showNew ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>

                  {newPassword && (
                    <div className="password-strength">
                      <div className="strength-bars">
                        {[1, 2, 3, 4].map((level) => (
                          <span
                            key={level}
                            className={`strength-bar ${strength >= level ? strengthClass[strength] : ""}`}
                          />
                        ))}
                      </div>
                      <span className={`strength-text ${strengthClass[strength]}`}>
                        {strengthLabel[strength]}
                      </span>
                    </div>
                  )}
                </div>

                <div className="input-group">
                  <label htmlFor="confirmPassword">Confirm new password</label>
                  <div className={`input-wrapper ${mismatch ? "input-error" : ""}`}>
                    <LockIcon className="input-icon" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Repeat your new password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-visibility"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {mismatch && <p className="field-error">Passwords don't match</p>}
                </div>

                <button
                  type="submit"
                  className="button primary-button full-width"
                  disabled={isSubmitting || !!mismatch || strength < 2}
                >
                  {isSubmitting ? <span className="spinner" /> : "Reset password"}
                </button>
              </form>
            </>
          )}

          {success && (
            <div className="sent-confirmation">
              <div className="sent-icon success" aria-hidden="true">✓</div>
              <p>Your password has been updated. Redirecting to login…</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
import { useRef, useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthBrandPanel from "../components/AuthBrandPanel";
import ScreenLoader from "../components/ScreenLoader";
import { ArrowLeftIcon } from "../components/icons";
import { useAuth } from "../hooks/useAuth";
import { verifyOtp, forgotPassword } from "../services/auth.api";
import "../auth.form.scss";

const OTP_LENGTH = 5; // backend generates 5-digit OTP
const getErrorMessage = (error) =>
  error?.response?.data?.message ?? "Invalid OTP. Please try again.";

const VerifyOtp = () => {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef([]);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  // Guard direct URL access — no email in state means they skipped the flow
  useEffect(() => {
    if (!loading && !email) navigate("/forgot-password", { replace: true });
  }, [loading, email, navigate]);

  // Resend cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  if (loading) return <ScreenLoader label="Checking your session" />;
  if (user) return <Navigate to="/" replace />;
  if (!email) return null;

  const focusAt = (index) => inputRefs.current[index]?.focus();

  const handleChange = (index, value) => {
    // Full OTP paste support
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, "").slice(0, OTP_LENGTH);
      const next = [...digits];
      pasted.split("").forEach((ch, i) => { if (i < OTP_LENGTH) next[i] = ch; });
      setDigits(next);
      focusAt(Math.min(pasted.length, OTP_LENGTH - 1));
      return;
    }

    const char = value.replace(/\D/g, "");
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (char && index < OTP_LENGTH - 1) focusAt(index + 1);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        focusAt(index - 1);
      }
    }
    if (e.key === "ArrowLeft" && index > 0) focusAt(index - 1);
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) focusAt(index + 1);
  };

  const otp = digits.join("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length < OTP_LENGTH) return;
    setError("");
    setIsSubmitting(true);

    try {
      // Backend returns { message, resetToken }
      const data = await verifyOtp({ email, otp });

      // Pass resetToken (not otp) forward — that's what resetPassword expects
      navigate("/reset-password", {
        state: { email, resetToken: data.resetToken },
      });
    } catch (err) {
      setError(getErrorMessage(err));
      // Clear boxes and refocus on any error (wrong OTP, too many attempts, expired)
      setDigits(Array(OTP_LENGTH).fill(""));
      focusAt(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setIsResending(true);
    setError("");
    try {
      await forgotPassword({ email });
      setResendCooldown(30);
      setDigits(Array(OTP_LENGTH).fill(""));
      focusAt(0);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main>
      <AuthBrandPanel
        heading="One step away from getting back in."
        subheading="Enter the 5-digit verification code we sent to your email to continue resetting your password."
      />

      <div className="form-panel">
        <div className="form-container">
          <Link to="/forgot-password" className="back-link-auth">
            <ArrowLeftIcon /> Back
          </Link>

          <div className="form-header">
            <h1>Enter verification code</h1>
            <p>
              We sent a 5-digit code to <strong>{email}</strong>.
              It expires in <strong>5 minutes</strong>.
            </p>
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="otp-group">
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  className={`otp-input ${digit ? "filled" : ""}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={OTP_LENGTH}
                  value={digit}
                  autoFocus={i === 0}
                  autoComplete="one-time-code"
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onFocus={(e) => e.target.select()}
                  aria-label={`Digit ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="submit"
              className="button primary-button full-width"
              disabled={isSubmitting || otp.length < OTP_LENGTH}
            >
              {isSubmitting ? <span className="spinner" /> : "Verify code"}
            </button>
          </form>

          <p className="switch-auth">
            Didn't receive a code?{" "}
            <button
              className="inline-link"
              onClick={handleResend}
              disabled={resendCooldown > 0 || isResending}
            >
              {isResending
                ? "Sending…"
                : resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Resend OTP"}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
};

export default VerifyOtp;
import { Link, useNavigate } from "react-router-dom";
import "../style/notfound.scss";

const bars = [55, 80, 40, 95, 60, 85, 45, 70, 35, 90, 50, 75, 40, 65, 30];

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="notfound">
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      <div className="notfound-content">
        <div className="brand-logo">
          <span className="dot" />
          IntervueAI
        </div>

        <div className="waveform" aria-hidden="true">
          {bars.map((h, i) => (
            <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }} />
          ))}
          <div className="flatline" />
        </div>

        <h1 className="error-code">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </h1>

        <h2>We lost the signal on this page</h2>
        <p>The link you followed doesn't lead anywhere &mdash; it may be broken, moved, or never existed.</p>

        <div className="actions">
          <Link to="/" className="button primary-button">
            Back to home
          </Link>
          <button className="button ghost-button" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
import { Link } from "react-router-dom";

const bars = [40, 70, 35, 90, 55, 80, 45, 65, 30, 75, 50, 85];

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const features = [
  "AI-generated technical & behavioral questions",
  "Resume-to-role match scoring, out of 100",
  "Skill gap analysis with severity ratings",
  "Day-by-day personalised preparation plan",
];

const AuthBrandPanel = ({ heading, subheading }) => (
  <div className="brand-panel">
    <Link to="/" className="brand-logo">
      <span className="dot" />
      IntervueAI
    </Link>

    <div className="brand-copy">
      <h2>{heading}</h2>
      <p>{subheading}</p>

      <div className="waveform" aria-hidden="true">
        {bars.map((h, i) => (
          <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
        ))}
      </div>

      <ul className="feature-list">
        {features.map((f) => (
          <li key={f}>
            <CheckIcon />
            {f}
          </li>
        ))}
      </ul>
    </div>

    <div />
  </div>
);

export default AuthBrandPanel;
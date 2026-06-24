const bars = [40, 70, 35, 90, 55, 80, 45, 65, 30, 75, 50, 85];

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AuthBrandPanel = ({ heading, subheading }) => (
  <div className="brand-panel">
    <div className="brand-logo">
      <span className="dot" />
      IntervueAI
    </div>

    <div className="brand-copy">
      <h2>{heading}</h2>
      <p>{subheading}</p>

      <div className="waveform" aria-hidden="true">
        {bars.map((h, i) => (
          <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
        ))}
      </div>

      <ul className="feature-list">
        <li><CheckIcon /> AI-generated interview questions</li>
        <li><CheckIcon /> Real-time transcript & scoring</li>
        <li><CheckIcon /> Bias-free, structured evaluation</li>
      </ul>
    </div>

    <div />
  </div>
);

export default AuthBrandPanel;
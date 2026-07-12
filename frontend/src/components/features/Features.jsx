import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./features.scss";

const icons = {
  question: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 9a3 3 0 1 1 4 2.83c-.7.27-1 .9-1 1.67v.5" strokeLinecap="round" />
      <circle cx="12" cy="17.5" r="0.6" fill="currentColor" stroke="none" />
      <rect x="3" y="3" width="18" height="18" rx="5" />
    </svg>
  ),
  score: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
      <path d="M12 3v9l6-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  gap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 19V10M12 19V5M20 19v-7" strokeLinecap="round" />
    </svg>
  ),
  plan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l2.6 5.8 6.2.6-4.7 4.2 1.4 6.1L12 16.8l-5.5 2.9 1.4-6.1-4.7-4.2 6.2-.6z" strokeLinejoin="round" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
    </svg>
  ),
};

const features = [
  { title: "Resume-matched questions", description: "Every technical and behavioral question is written around your resume and the job description — not a generic bank.", icon: "question" },
  { title: "Match scoring, 0–100", description: "See exactly how you stack up against the role before you're ever in the room.", icon: "score" },
  { title: "Skill gap analysis", description: "Know which gaps actually matter — ranked by severity — and which experience already covers you.", icon: "gap" },
  { title: "Day-by-day prep plans", description: "A structured study plan that turns feedback into focused, measurable daily tasks.", icon: "plan" },
  { title: "STAR-ready answers", description: "Behavioral answers built on the STAR framework, drawing directly on your own project history.", icon: "star" },
  { title: "Private by default", description: "Your resume and reports are scoped to your account only — never shared.", icon: "lock" },
];

const Features = () => {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="features" id="features" ref={ref}>
      <div className="features__inner">
        <div className={`features__heading ${visible ? "is-visible" : ""}`}>
          <span className="eyebrow">Features</span>
          <h2>Everything you need before you walk in.</h2>
          <p>From resume to ready — one pipeline, built around how interviews actually get won.</p>
        </div>

        <div className="features__grid">
          {features.map((f, i) => (
            <div key={f.title} className={`feature-card ${visible ? "is-visible" : ""}`} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="feature-card__icon">{icons[f.icon]}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
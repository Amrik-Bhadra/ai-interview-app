import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCountUp } from "../../hooks/useCountUp";
import { useTypewriter } from "../../hooks/useTypewriter";
import "./hero.scss";

const stats = [
  { value: 12400, label: "questions generated", suffix: "+" },
  { value: 84, label: "avg. match accuracy", suffix: "%" },
  { value: 5, label: "day avg. prep plan", suffix: "-day" },
];

const skillTags = ["Node.js", "REST APIs", "MongoDB", "System Design", "JWT Auth"];

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const StatBlock = ({ value, suffix, label, start }) => {
  const count = useCountUp(value, { start, duration: 1600 });
  return (
    <div className="hero__stat">
      <strong>{count.toLocaleString()}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 400);
    return () => clearTimeout(t);
  }, []);

  const score = useCountUp(84, { start: started, duration: 1600 });
  const question = useTypewriter(
    "Walk me through how you'd cache MongoDB reads for a high-traffic endpoint.",
    { start: started, speed: 22 }
  );

  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;

  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">AI-powered interview preparation</span>
          <h1>
            Turn any job description into an <span className="highlight">interview edge.</span>
          </h1>
          <p>
            Upload your resume, add the role you're chasing, and get a tailored match
            score, curated questions, and a day-by-day prep plan — built by AI, ready
            in minutes.
          </p>

          <div className="hero__actions">
            <button type="button" className="button primary-button" onClick={() => navigate("/register")}>
              Start preparing free
            </button>
            <button type="button" className="button" onClick={() => navigate("/login")}>
              Sign in
            </button>
          </div>

          <div className="hero__stats">
            {stats.map((s) => <StatBlock key={s.label} {...s} start={started} />)}
          </div>
        </div>

        <div className="hero__visual">
          <div className="report-card">
            <div className="report-card__header">
              <span className="report-card__badge">Live report</span>
              <span className="report-card__role">Backend Developer</span>
            </div>

            <div className="report-card__score">
              <svg viewBox="0 0 120 120">
                <circle className="track" cx="60" cy="60" r={RADIUS} />
                <circle
                  className="progress"
                  cx="60" cy="60" r={RADIUS}
                  style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: offset }}
                />
              </svg>
              <div className="report-card__score-value">
                <strong>{score}</strong>
                <span>match score</span>
              </div>
            </div>

            <div className="report-card__question">
              <span className="report-card__label">Next question</span>
              <p>{question}<span className="cursor" /></p>
            </div>

            <div className="report-card__tags">
              {skillTags.map((tag, i) => (
                <span key={tag} className="report-card__tag" style={{ animationDelay: `${1.1 + i * 0.12}s` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import { useEffect, useRef, useState } from "react";

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const ScoreGauge = ({ score = 0, size = 140, duration = 1200 }) => {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const [animatedScore, setAnimatedScore] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setAnimatedScore(Math.round(eased * score));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [score, duration]);

  const offset = circumference - (animatedScore / 100) * circumference;
  const tone = score >= 80 ? "var(--primary-light)" : score >= 60 ? "#ffc154" : "var(--error)";

  return (
    <div className="score-gauge" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <circle
          className="score-gauge-progress"
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={tone} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="score-gauge-label">
        <span className="score-value">{animatedScore}%</span>
        <span className="score-caption">Match score</span>
      </div>
    </div>
  );
};

export default ScoreGauge;
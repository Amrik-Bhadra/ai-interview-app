import { useEffect, useState } from "react";
import { CheckIcon, SparkleIcon } from "../components/icons";

const steps = [
  "Parsing your resume",
  "Reading the job description",
  "Matching skills & generating questions",
  "Finalizing your report",
];

const GeneratingModal = ({ isComplete }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (isComplete) {
      setActiveStep(steps.length);
      return;
    }
    if (activeStep >= steps.length - 1) return;
    const timer = setTimeout(() => setActiveStep((s) => s + 1), 1600);
    return () => clearTimeout(timer);
  }, [activeStep, isComplete]);

  const progress = Math.min((activeStep / steps.length) * 100, 100);

  return (
    <div className="generating-overlay">
      <div className="generating-modal">
        <div className="generating-icon"><SparkleIcon /></div>
        <h3>Generating your interview report</h3>
        <p>This usually takes under a minute. Don't close this tab.</p>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <ul className="step-list">
          {steps.map((step, i) => (
            <li key={step} className={i < activeStep ? "done" : i === activeStep ? "active" : ""}>
              <span className="step-marker">
                {i < activeStep ? <CheckIcon /> : <span className="step-dot" />}
              </span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GeneratingModal;
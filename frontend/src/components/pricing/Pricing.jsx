import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./pricing.scss";

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const plans = [
  {
    name: "Starter", price: "Free", period: "", description: "For your next interview.",
    features: ["1 report per month", "Core question bank", "Match score & skill gaps", "Email support"],
    cta: "Get started", to: "/register", highlighted: false,
  },
  {
    name: "Professional", price: "$19", period: "/month", description: "For active interview seasons.",
    features: ["Unlimited reports", "Full day-by-day prep plans", "Priority report generation", "Resume version history", "Priority support"],
    cta: "Start free trial", to: "/register", highlighted: true,
  },
  {
    name: "Enterprise", price: "Custom", period: "", description: "For bootcamps, universities & career teams.",
    features: ["Seats for your whole cohort", "SSO & centralized billing", "Usage analytics dashboard", "Dedicated onboarding"],
    cta: "Talk to sales", to: "/register", highlighted: false,
  },
];

const Pricing = () => {
  const [ref, visible] = useScrollReveal();
  const navigate = useNavigate();

  return (
    <section className="pricing" id="pricing" ref={ref}>
      <div className="pricing__inner">
        <div className={`pricing__heading ${visible ? "is-visible" : ""}`}>
          <span className="eyebrow">Pricing</span>
          <h2>Straightforward pricing, built to scale with you.</h2>
          <p>Start free. Upgrade only when you're interviewing seriously.</p>
        </div>

        <div className="pricing__grid">
          {plans.map((plan, i) => (
            <div key={plan.name} className={`pricing-card ${plan.highlighted ? "is-highlighted" : ""} ${visible ? "is-visible" : ""}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              {plan.highlighted && <span className="pricing-card__ribbon">Most popular</span>}
              <h3>{plan.name}</h3>
              <p className="pricing-card__desc">{plan.description}</p>
              <div className="pricing-card__price">
                <strong>{plan.price}</strong>
                {plan.period && <span>{plan.period}</span>}
              </div>
              <ul>
                {plan.features.map((f) => <li key={f}><CheckIcon />{f}</li>)}
              </ul>
              <button
                onClick={() => navigate(plan.to)}
                className={`button full-width ${plan.highlighted ? "primary-button" : "secondary-button"}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
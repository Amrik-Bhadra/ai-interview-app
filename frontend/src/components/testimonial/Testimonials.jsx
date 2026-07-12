import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./testimonials.scss";

const testimonials = [
  {
    quote: "The skill gap breakdown was the most useful part — it told me exactly which two topics to spend my week on instead of studying everything.",
    name: "Priya Nair", role: "Backend Engineer, hired at a Series B fintech", initials: "PN",
  },
  {
    quote: "I've used generic question banks before. This is the first tool that actually wrote questions around my resume instead of just the job title.",
    name: "Daniel Cho", role: "Full Stack Developer", initials: "DC",
  },
  {
    quote: "The day-by-day plan turned a vague 'go study everything' feeling into something I could actually execute in a week.",
    name: "Amara Whitfield", role: "DevOps Engineer", initials: "AW",
  },
];

const Testimonials = () => {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="testimonials" id="reviews" ref={ref}>
      <div className="testimonials__inner">
        <div className={`testimonials__heading ${visible ? "is-visible" : ""}`}>
          <span className="eyebrow">Reviews</span>
          <h2>Built for people about to walk into the room.</h2>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <figure key={t.name} className={`testimonial-card ${visible ? "is-visible" : ""}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <span className="avatar">{t.initials}</span>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
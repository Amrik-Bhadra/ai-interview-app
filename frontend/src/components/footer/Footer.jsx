import { Link } from "react-router-dom";
import "./footer.scss";

const columns = [
  { title: "Product", links: [{ label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }, { label: "Reviews", href: "#reviews" }] },
  { title: "Account", links: [{ label: "Sign in", to: "/login" }, { label: "Create account", to: "/register" }] },
  { title: "Legal", links: [{ label: "Privacy policy", to: "#" }, { label: "Terms of service", to: "#" }] },
];

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__inner">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo">
            <span className="dot" />
            IntervueAI
          </Link>
          <p>AI-driven interview preparation, matched to your resume and the role you want.</p>
        </div>

        <div className="site-footer__columns">
          {columns.map((col) => (
            <div key={col.title} className="site-footer__column">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? <Link to={link.to}>{link.label}</Link> : <a href={link.href}>{link.label}</a>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} IntervueAI. All rights reserved.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
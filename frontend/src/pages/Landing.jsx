import { usePageTitle } from "../hooks/usePageTitle.js";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero.jsx";
import Features from "../components/features/Features";
import Pricing from "../components/pricing/Pricing";
import Testimonials from "../components/testimonial/Testimonials";
import Footer from "../components/footer/Footer";
import "./Landing.scss";

const Landing = () => {
  usePageTitle("AI Interview Preparation");

  return (
    <div className="landing">
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
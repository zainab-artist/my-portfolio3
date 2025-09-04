// src/pages/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      {/*hero section*/}
      <motion.section 
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Hi, I'm Zainab 👋</h1>
        <p>Passionate Frontend Developer in Training</p>
        
        <div className="cta-buttons">
          <Link to="/projects" className="cta-button">
            🚀 View My Projects
          </Link>
          <Link to="/about" className="secondary-button">
            📖 My Learning Journey
          </Link>
        </div>
      </motion.section>

    {/* quick stats*/}
      <section className="stats-simple">
        <div className="stat">
          <span className="number">4+</span>
          <span className="label">Projects Built</span>
        </div>
        <div className="stat">
          <span className="number">100%</span>
          <span className="label">Passion for Coding</span>
        </div>
        <div className="stat">
          <span className="number">∞</span>
          <span className="label">Curiosity to Learn</span>
        </div>
      </section>

      {/* project preview*/}
      <section className="projects-preview">
        <h2>Recent Work</h2>
        <div className="preview-cards">
          <div className="preview-card">
            <h3>Portfolio Website</h3>
            <p>My personal portfolio built with React</p>
            <Link to="/projects" className="card-link">
              View Details →
            </Link>
          </div>
          <div className="preview-card">
            <h3>React Projects</h3>
            <p>Various React applications and components</p>
            <Link to="/projects" className="card-link">
              View Details →
            </Link>
          </div>
        </div>
        
        <Link to="/projects" className="view-all-btn">
          View All Projects
        </Link>
      </section>
    </div>
  );
}

export default Home;
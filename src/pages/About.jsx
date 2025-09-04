// src/pages/About.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page">
      {/* About me*/}
      <motion.section 
        className="about-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="avatar-container">
          <div className="avatar-placeholder">
            <span className="avatar-icon">👩‍💻</span>
          </div>
        </div>
        <h1>About My Journey</h1>
        <p>Passionate beginner frontend developer on a learning adventure</p>
      </motion.section>

      {/* lrearning journey*/}
      <section className="learning-path">
        <motion.div 
          className="path-item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h3>🎯 Where I Started</h3>
          <p>
            I began my web development journey learning HTML, CSS, and JavaScript fundamentals 
            through online courses and practice projects. Every day is a new opportunity to grow.
          </p>
        </motion.div>

        <motion.div 
          className="path-item"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h3>📚 Current Focus</h3>
          <p>
            Currently diving deep into React ecosystem, modern CSS techniques, and building 
            responsive, accessible web applications. Learning by doing is my approach!
          </p>
        </motion.div>

        <motion.div 
          className="path-item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3>🚀 Future Goals</h3>
          <p>
            My goal is to become a proficient frontend developer, contribute to open source, 
            and eventually work on meaningful projects that make a difference.
          </p>
        </motion.div>
      </section>

      {/* learning skills*/}
      <section className="skills-section">
        <h2>What I'm Learning</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h4>💻 Frontend</h4>
            <div className="skills-list">
              <span className="skill-tag">HTML5</span><br/>
              <span className="skill-tag">CSS3</span><br/>
              <span className="skill-tag">JavaScript</span><br/>
              <span className="skill-tag">React</span><br/>
              <span className="skill-tag">Responsive Design</span><br/>
            </div>
          </div>

          <div className="skill-category">
            <h4>🛠️ Tools</h4>
            <div className="skills-list">
              <span className="skill-tag">Git</span><br/>
              <span className="skill-tag">VS Code</span><br/>
              <span className="skill-tag">Figma</span><br/>
              <span className="skill-tag">Chrome DevTools</span><br/>
            </div>
          </div>
        </div>
      </section>

      
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h2>Let's Connect!</h2>
        <p>I'm always open to learning opportunities and meeting fellow developers</p>
        <div className="cta-buttons">
          <Link to="/contact" className="cta-button">
            📧 Get In Touch
          </Link>
          <Link to="/projects" className="secondary-button">
            🚀 See My Projects
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

export default About;
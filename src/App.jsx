// src/App.jsx
import './styles/globals.css';
import ContactForm from './components/contact/ContactForm';
import LivePreview from './components/contact/LivePreview';
import FeedbackWall from './components/feedback/FeedbackWall';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import Navbar from './components/layout/Navbar';
import ThemeToggle from './components/layout/ThemeToggle';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';


function App() {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  return (
    <Router>
      <div className="App">
        <Navbar />
        <ThemeToggle />
        
        <main className="main-container">
          <Routes>
            {/* home page*/}
            <Route path="/" element={
              <Home />
            } />
            
            {/* about me*/}
            <Route path="/about" element={
              <About />
            } />
            
            {/* projects*/}
            <Route path="/projects" element={
              <Projects />
            } />
            
            {/*contact me*/}
            <Route path="/contact" element={
              <ContactPage 
                formData={formData} 
                setFormData={setFormData} 
              />
            } />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// separate component for contact page
function ContactPage({ formData, setFormData }) {
  return (
    <div className="content-grid">
      <div className="left-column">
        <ContactForm formData={formData} setFormData={setFormData} />
        <LivePreview formData={formData} />
      </div>
      <div className="right-column">
        <FeedbackWall />
      </div>
    </div>
  );
}

export default App;
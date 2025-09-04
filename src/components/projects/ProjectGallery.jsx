import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code, Play } from 'lucide-react';
import './ProjectGallery.css';


const ProjectGallery = () => {
  const [selectedTech, setSelectedTech] = useState('all');
  const [expandedProject, setExpandedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce React App',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      description: 'A full-featured e-commerce platform with shopping cart and user authentication',
      technologies: ['React', 'CSS', 'JavaScript'],
      status: 'Completed',
      priority: 'High',
      githubUrl: '#',
      liveDemoUrl: '#',
      details: 'This project includes user authentication, product filtering, shopping cart functionality, and payment integration.'
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop',
      description: 'Real-time weather application with 5-day forecast',
      technologies: ['React', 'API', 'CSS'],
      status: 'Completed',
      priority: 'Medium',
      githubUrl: '#',
      liveDemoUrl: '#',
      details: 'Integrated with Weather API to provide real-time weather data and forecasts for any location.'
    },
    {
      id: 3,
      title: 'Task Management App',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      description: 'Drag and drop task manager with team collaboration',
      technologies: ['React', 'JavaScript', 'Firebase'],
      status: 'In Progress',
      priority: 'High',
      githubUrl: '#',
      liveDemoUrl: '#',
      details: 'Features include drag-and-drop functionality, team assignments, and real-time updates using Firebase.'
    },
    {
      id: 4,
      title: 'Portfolio Website',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      description: 'Personal portfolio built with React and modern design',
      technologies: ['React', 'CSS', 'JavaScript'],
      status: 'Completed',
      priority: 'Featured',
      githubUrl: '#',
      liveDemoUrl: '#',
      details: 'Responsive portfolio website with dark mode, animations, and project showcase.'
    }
  ];

  const allTechnologies = ['all', ...new Set(projects.flatMap(project => project.technologies))];

  const filteredProjects = selectedTech === 'all' 
    ? projects 
    : projects.filter(project => project.technologies.includes(selectedTech));

  const toggleDetails = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <section className="project-gallery" id="projects">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
      </motion.h2>

      <div className="filter-buttons">
        {allTechnologies.map(tech => (
          <button
            key={tech}
            onClick={() => setSelectedTech(tech)}
            className={selectedTech === tech ? 'active' : ''}
          >
            {tech}
          </button>
))}
      </div>

      <div className="projects-grid">
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="project-image">
<img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <button className="project-link" onClick={() => window.open(project.liveDemoUrl, 'https://github.com/zainab-artist/my-portfolio2')}>
                    <Play size={20} />
                  </button>
                  <button className="project-link" onClick={() => window.open(project.githubUrl, 'https://my-portfolio2.vercel.app')}>
                    <Github size={20} />
                  </button>
                </div>
                <div className="project-badges">
                  <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                  <span className={`priority-badge ${project.priority.toLowerCase()}`}>
                    {project.priority}
                  </span>
                </div>
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <button 
                  className="view-details-btn"
                  onClick={() => toggleDetails(project.id)}
                >
                  <Code size={16} />
                  {expandedProject === project.id ? 'Hide Details' : 'View Details'}
                </button>

                <AnimatePresence>
                  {expandedProject === project.id && (
                    <motion.div
                      className="project-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p>{project.details}</p>
                      <div className="project-links">
                        <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github size={16} />
                          Source Code
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectGallery;
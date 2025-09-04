
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Save, AlertCircle } from 'lucide-react';
import './ContactForm.css';

  const ContactForm = ({formData, setFormData}) =>{

  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasSavedData, setHasSavedData] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      setHasSavedData(true);
    }
  }, []);

  // Save to localStorage when formData changes
  useEffect(() => {
    if (formData.name || formData.email|| formData.message) {
      localStorage.setItem('contactFormData', JSON.stringify(formData));
      setHasSavedData(true);
    }
  }, [formData]);

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required';
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Validate field after a delay (debounced for email)
    if (name === 'email') {
      clearTimeout(window.emailValidationTimeout);
      window.emailValidationTimeout = setTimeout(() => {
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
      }, 400);
    } else {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowModal(true);
        localStorage.removeItem('contactFormData');
        setHasSavedData(false);
      }, 1500);
    }
  };

  return (
    <section className="contact-form-section" id="contact">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Get in Touch
      </motion.h2>
      
      <AnimatePresence>
        {hasSavedData && (
          <motion.div 
            className="saved-data-hint"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Save size={16} />
            <span>You have unsent message data saved!</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.form 
        onSubmit={handleSubmit} 
        className="contact-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
>
       <div className="form-group">
  <label htmlFor="name">Name *</label>
  <input
    type="text"
    id="name"
    name="name"
    value={formData.name || ""}
    onChange={(e) =>
      setFormData({ ...formData, name: e.target.value })
    }
    className={errors.name ? 'error' : ''}
    placeholder="Your full name"
  />
  {errors.name && (
    <div className="error-message">
      <AlertCircle size={14} />
      <span>{errors.name}</span>
    </div>
  )}
</div>

<div className="form-group">
  <label htmlFor="email">Email *</label>
  <input
    type="email"
    id="email"
    name="email"
    value={formData.email || ""}
    onChange={(e) =>
      setFormData({ ...formData, email: e.target.value })
    }
    className={errors.email ? 'error' : ''}
    placeholder="your.email@example.com"
  />
  {errors.email && (
    <div className="error-message">
      <AlertCircle size={14} />
      <span>{errors.email}</span>
    </div>
  )}
</div>

<div className="form-group">
  <label htmlFor="message">Message *</label>
  <textarea
    id="message"
    name="message"
    value={formData.message ||""}
    onChange={(e) =>
      setFormData({ ...formData, message: e.target.value }) 
    }
    rows="5"
    className={errors.message ? 'error' : ''}
    placeholder="Your message here..."
  />
  {errors.message && (
    <div className="error-message">
      <AlertCircle size={14} />
      <span>{errors.message}</span>
    </div>
  )}
</div>
        
        <motion.button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <div className="loading-spinner"></div>
          ) : (
            <>
              <Send size={18} />
              Send Message
            </>
          )}
        </motion.button>
      </motion.form>
      
      <AnimatePresence>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} name={formData.name} />
        )}
      </AnimatePresence>
    </section>
  );
};

// Modal Component
const Modal = ({ onClose, name }) => {
  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>🎉 Thank you, {name}!</h3>
        </div>
        <div className="modal-body">
          <p>Your message has been sent successfully. I'll get back to you soon!</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="modal-close-btn">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
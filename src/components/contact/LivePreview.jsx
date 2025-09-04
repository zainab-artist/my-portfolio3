import React from 'react';
import { motion } from 'framer-motion';
import './LivePreview.css';

const LivePreview = ({ formData }) => {
  return (
    <motion.div 
      className="live-preview"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>✨ Live Preview</h3>
      
      <div className="preview-card">
        <div className="preview-header">
          <div className="preview-avatar">
            {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="preview-info">
            <div className="preview-name">
              {formData.name || 'Your Name'}
            </div>
            <div className="preview-email">
              {formData.email || 'your.email@example.com'}
            </div>
          </div>
        </div>
        
        <div className="preview-message">
          {formData.message || 'Your Massage will appear here...'}
        </div>
        
        <div className="preview-footer">
          <span className="preview-time">Now</span>
          <div className="preview-status">📧</div>
        </div>
      </div>
    </motion.div>
  );
};

export default LivePreview;
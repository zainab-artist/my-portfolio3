import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageCircle, Award } from 'lucide-react';
import './FeedbackWall.css';

const FeedbackWall = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [showForm, setShowForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    name: '',
    rating: 0,
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newFeedback.name && newFeedback.rating > 0 && newFeedback.comment) {
      const feedback = {
        ...newFeedback,
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        timestamp: new Date().getTime()
      };
      
      setFeedbacks([feedback, ...feedbacks]);
      setNewFeedback({ name: '', rating: 0, comment: '' });
      setShowForm(false);
    }
  };

  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    if (sortBy === 'newest') return b.timestamp - a.timestamp;
    if (sortBy === 'highest') return b.rating - a.rating;
    return 0;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={18} 
        className={i < rating ? 'star filled' : 'star'} 
      />
    ));
  };

  const handleRatingClick = (star) => {
    setNewFeedback({...newFeedback, rating: star});
  };

  return (
    <section className="feedback-wall" id="feedback">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Visitor Feedback
      </motion.h2>

      <motion.button
        className="add-feedback-btn"
        onClick={() => setShowForm(!showForm)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={18} />
        {showForm ? 'Cancel' : 'Add Feedback'}
      </motion.button>

      <AnimatePresence>
        {showForm && (
          <motion.form
            className="feedback-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                value={newFeedback.name}
                onChange={(e) => setNewFeedback({...newFeedback, name: e.target.value})}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Rating (1-5 stars)</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= newFeedback.rating ? 'star filled selectable' : 'star selectable'}
                    onClick={() => handleRatingClick(star)}
                  >
                    <Star size={24} />
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comment">Your Comment</label>
              <textarea
                id="comment"
                value={newFeedback.comment}
                onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                placeholder="Share your thoughts..."
                rows="3"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit Feedback
            </button>
          </motion.form>
        )}
      </AnimatePresence>
{feedbacks.length > 0 && (
        <div className="sort-options">
          <label htmlFor="sort-select">Sort by:</label>
          <select 
            id="sort-select"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="highest">Highest Rating</option>
          </select>
        </div>
      )}

      <div className="feedbacks-container">
        <AnimatePresence>
          {sortedFeedbacks.length > 0 ? (
            sortedFeedbacks.map((feedback) => (
              <motion.div
                key={feedback.id}
                className={`feedback-card ${feedback.rating === 5 ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {feedback.rating === 5 && (
                  <div className="featured-badge">
                    <Award size={16} />
                    Featured
                  </div>
                )}
                
                <div className="feedback-header">
                  <h4>{feedback.name}</h4>
                  <span className="feedback-date">{feedback.date}</span>
                </div>
                
                <div className="feedback-rating">
                  {renderStars(feedback.rating)}
                </div>
                
                <p className="feedback-comment">{feedback.comment}</p>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="no-feedback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <MessageCircle size={48} />
              <p>No feedback yet. Be the first to share your thoughts!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeedbackWall;
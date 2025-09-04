// src/pages/Contact.jsx
import React from 'react';
import ContactForm from '../components/contact/ContactForm';
import LivePreview from '../components/contact/LivePreview';
import FeedbackWall from '../components/feedback/FeedbackWall';

function Contact() {
  return (
    <div>
      <h1>Contact Me</h1>
      <ContactForm />
      <LivePreview />
    </div>
  );
}

export default Contact;
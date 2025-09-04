import React, { useState, useEffect } from 'react';
import { Sun, Moon, Cloud } from 'lucide-react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  return (
    <div className="theme-toggle">
      <button
        onClick={() => changeTheme('light')}
        className={theme === 'light' ? 'active' : ''}
        aria-label="Light theme"
      >
        <Sun size={18} />
      </button>
      <button
        onClick={() => changeTheme('dark')}
        className={theme === 'dark' ? 'active' : ''}
        aria-label="Dark theme"
      >
        <Moon size={18} />
      </button>
      <button
        onClick={() => changeTheme('ocean')}
        className={theme === 'ocean' ? 'active' : ''}
        aria-label="Ocean theme"
      >
        <Cloud size={18} />
      </button>
    </div>
  );
};

export default ThemeToggle;
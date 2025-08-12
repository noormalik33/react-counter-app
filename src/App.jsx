import { FaBriefcase, FaEnvelope, FaLinkedin, FaGithub, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import Counter from './components/Counter';
import HistoryLog from './components/HistoryLog';
import {
  playIncrementSound,
  playDecrementSound,
  playResetSound,
  playUndoSound,
  playToggleSound,
  playStepSound
} from './utils/sound';
import { motion } from 'framer-motion';
import './index.css';

function App() {
  const [count, setCount] = useState(() => Number(localStorage.getItem('count')) || 0);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('history')) || []);
  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'mixed');
  const [formData, setFormData] = useState({ customIncrement: '', customDecrement: '' });

  useEffect(() => {
    try {
      localStorage.setItem('count', count);
      localStorage.setItem('history', JSON.stringify(history));
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [count, history, theme]);

  const updateCount = (operation) => {
    console.log(`${operation} button clicked`);
    try {
      let newCount = count;
      if (operation === 'increment') {
        newCount = count + step;
        playIncrementSound();
      } else if (operation === 'decrement') {
        newCount = count - step;
        playDecrementSound();
      } else if (operation === 'reset') {
        newCount = 0;
        playResetSound();
      }
      setCount(newCount);
      setHistory([
        ...history,
        { operation, value: newCount, timestamp: new Date().toLocaleTimeString() }
      ]);
    } catch (error) {
      console.error('Error in updateCount:', error);
    }
  };

  const undoLastAction = () => {
    console.log('Undo button clicked');
    try {
      if (history.length === 0) return;
      playUndoSound();
      const lastAction = history[history.length - 1];
      let revertedCount = count;
      if (lastAction.operation === 'increment') {
        revertedCount = count - step;
      } else if (lastAction.operation === 'decrement') {
        revertedCount = count + step;
      } else if (lastAction.operation === 'customIncrement') {
        revertedCount = count - (lastAction.value - history[history.length - 2]?.value || 0);
      } else if (lastAction.operation === 'customDecrement') {
        revertedCount = count + (history[history.length - 2]?.value - lastAction.value || 0);
      } else if (lastAction.operation === 'reset') {
        revertedCount = history[history.length - 2]?.value || 0;
      }
      setCount(revertedCount);
      setHistory(history.slice(0, -1));
    } catch (error) {
      console.error('Error in undoLastAction:', error);
    }
  };

  const toggleTheme = () => {
    console.log('Theme toggle button clicked');
    playToggleSound();
    setTheme((prevTheme) => (prevTheme === 'mixed' ? 'light' : 'mixed'));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    playStepSound();
  };

  const handleCustomIncrement = (e) => {
    e.preventDefault();
    const incrementValue = parseInt(formData.customIncrement) || 0;
    if (incrementValue) {
      const newCount = count + incrementValue;
      setCount(newCount);
      setHistory([
        ...history,
        { operation: 'customIncrement', value: newCount, timestamp: new Date().toLocaleTimeString() }
      ]);
      playIncrementSound();
      setFormData((prev) => ({ ...prev, customIncrement: '' }));
    }
  };

  const handleCustomDecrement = (e) => {
    e.preventDefault();
    const decrementValue = parseInt(formData.customDecrement) || 0;
    if (decrementValue) {
      const newCount = count - decrementValue;
      setCount(newCount);
      setHistory([
        ...history,
        { operation: 'customDecrement', value: newCount, timestamp: new Date().toLocaleTimeString() }
      ]);
      playDecrementSound();
      setFormData((prev) => ({ ...prev, customDecrement: '' }));
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden ${
        theme === 'mixed' ? 'bg-mixed-primary text-text-mixed' : 'bg-mixed-light text-text-mixed-light'
      }`}
    >
      <div className="particle-bg"></div>

      <motion.button
        className={`absolute top-3 right-3 sm:top-4 sm:right-4 btn-mixed ${
          theme === 'mixed' ? 'bg-mixed-accent text-text-mixed' : 'bg-mixed-accent-light text-text-mixed-light'
        } focus:ring-mixed-accent flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm`}
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${theme === 'mixed' ? 'light' : 'dark'} mode`}
      >
        {theme === 'mixed' ? '☀️ Light' : '🌌 Dark'}
      </motion.button>

      <h1
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-inter font-bold ${
          theme === 'mixed' ? 'text-mixed-accent' : 'text-mixed-accent-light'
        } mb-4 sm:mb-6 md:mb-8 text-center animate-mixed-slide`}
      >
        WELCOME TO "REACT COUNTER APP"
      </h1>

      <h5
        className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-inter font-semibold ${
          theme === 'mixed' ? 'text-mixed-accent' : 'text-mixed-accent-light'
        } mb-4 sm:mb-6 md:mb-8 text-center animate-mixed-slide`}
      >
        BY NOOR MALIK
      </h5>

      <div className="mb-4 sm:mb-6 z-10 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 animate-mixed-slide">
        <label
          className={`font-inter text-base sm:text-lg ${
            theme === 'mixed' ? 'text-mixed-accent' : 'text-mixed-accent-light'
          }`}
          htmlFor="step-input"
        >
          Step Size:
        </label>
        <input
          id="step-input"
          type="number"
          min="1"
          value={step}
          onChange={(e) => {
            playStepSound();
            setStep(Math.max(1, Number(e.target.value)));
          }}
          className={`input-mixed ${
            theme === 'mixed' ? 'bg-mixed-secondary border-mixed-accent text-text-mixed focus:ring-mixed-accent' : 'bg-mixed-light border-mixed-accent-light text-text-mixed-light focus:ring-mixed-accent-light'
          } w-16 sm:w-20`}
        />
      </div>

      <Counter count={count} updateCount={updateCount} theme={theme} />

      <HistoryLog history={history} undoLastAction={undoLastAction} theme={theme} setHistory={setHistory} />

      <div className="mt-4 sm:mt-6 z-10 pointer-events-auto animate-mixed-slide">
        <form onSubmit={handleCustomIncrement} className="mb-4">
          <div
            className={`flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 ${
              theme === 'mixed' ? 'bg-mixed-secondary' : 'bg-mixed-secondary-light'
            } p-4 sm:p-5 rounded-xl shadow-mixed border ${
              theme === 'mixed' ? 'border-mixed-accent' : 'border-mixed-accent-light'
            }`}
          >
            <label
              htmlFor="customIncrement"
              className={`font-inter text-base sm:text-lg ${
                theme === 'mixed' ? 'text-mixed-accent' : 'text-mixed-accent-light'
              }`}
            >
              Custom Increment:
            </label>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <input
                id="customIncrement"
                type="number"
                name="customIncrement"
                value={formData.customIncrement}
                onChange={handleInputChange}
                className={`input-mixed ${
                  theme === 'mixed' ? 'bg-mixed-primary border-mixed-accent text-text-mixed focus:ring-mixed-accent' : 'bg-mixed-light border-mixed-accent-light text-text-mixed-light focus:ring-mixed-accent-light'
                } w-full sm:w-32`}
                placeholder="Enter value"
              />
              <motion.button
                type="submit"
                className={`btn-mixed ${
                  theme === 'mixed' ? 'bg-mixed-accent text-text-mixed hover:bg-mixed-accent/90' : 'bg-mixed-accent-light text-text-mixed-light hover:bg-mixed-accent-light/90'
                } pointfocus:ring-mixed-accent`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add
              </motion.button>
            </div>
          </div>
        </form>

        <form onSubmit={handleCustomDecrement}>
          <div
            className={`flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 ${
              theme === 'mixed' ? 'bg-mixed-secondary' : 'bg-mixed-secondary-light'
            } p-4 sm:p-5 rounded-xl shadow-mixed border ${
              theme === 'mixed' ? 'border-mixed-accent' : 'border-mixed-accent-light'
            }`}
          >
            <label
              htmlFor="customDecrement"
              className={`font-inter text-base sm:text-lg ${
                theme === 'mixed' ? 'text-mixed-accent' : 'text-mixed-accent-light'
              }`}
            >
              Custom Decrement:
            </label>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <input
                id="customDecrement"
                type="number"
                name="customDecrement"
                value={formData.customDecrement}
                onChange={handleInputChange}
                className={`input-mixed ${
                  theme === 'mixed' ? 'bg-mixed-primary border-mixed-accent text-text-mixed focus:ring-mixed-accent' : 'bg-mixed-light border-mixed-accent-light text-text-mixed-light focus:ring-mixed-accent-light'
                } w-full sm:w-32`}
                placeholder="Enter value"
              />
              <motion.button
                type="submit"
                className={`btn-mixed ${
                  theme === 'mixed' ? 'bg-mixed-accent text-text-mixed hover:bg-mixed-accent/90' : 'bg-mixed-accent-light text-text-mixed-light hover:bg-mixed-accent-light/90'
                } focus:ring-mixed-accent`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subtract
              </motion.button>
            </div>
          </div>
        </form>
      </div>

      <footer
        className={`w-full p-4 ${
          theme === 'mixed' ? 'bg-mixed-accent text-text-mixed' : 'bg-mixed-accent-light text-text-mixed-light'
        } text-xs sm:text-sm flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 fixed bottom-0 left-0 font-inter`}
      >
        <span>Developed by</span>
        <a
          href="https://your-portfolio-link.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-mixed-accent transition-colors flex items-center gap-1"
        >
          <FaBriefcase className="inline-block" /> Noor Malik
        </a>
        <span className="hidden sm:inline">|</span>
        <a
          href="mailto:noormalik56500@gmail.com"
          className="hover:text-mixed-accent transition-colors flex items-center gap-1"
        >
          <FaEnvelope /> Email
        </a>
        <span className="hidden sm:inline">|</span>
        <a
          href="https://www.linkedin.com/in/noormalik56500/"
          className="hover:text-mixed-accent transition-colors flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin /> LinkedIn
        </a>
        <span className="hidden sm:inline">|</span>
        <a
          href="https://github.com/noormalik33"
          className="hover:text-mixed-accent transition-colors flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub /> GitHub
        </a>
        <span className="hidden sm:inline">|</span>
        <a
          href="https://www.youtube.com/@CoreITTech1"
          className="hover:text-mixed-accent transition-colors flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube /> YouTube
        </a>
        <span className="hidden sm:inline">|</span>
        <a
          href="https://www.instagram.com/coreit.tech"
          className="hover:text-mixed-accent transition-colors flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram /> Instagram
        </a>
        <span className="hidden sm:inline">|</span>
        <a
          href="https://www.facebook.com/share/1AmgLDUnc9/"
          className="hover:text-mixed-accent transition-colors flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook /> Facebook
        </a>
      </footer>
    </div>
  );
}

export default App;
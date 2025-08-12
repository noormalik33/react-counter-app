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
      className={`min-h-screen flex flex-col justify-between p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 pb-12 sm:pb-14 md:pb-16 lg:pb-20 relative overflow-hidden ${
        theme === 'mixed' ? 'bg-mixed-primary text-text-mixed' : 'bg-mixed-light text-text-mixed-light'
      }`}
    >
      <div className="flex-1">
        <div className="particle-bg"></div>

        <motion.button
          className={`fixed top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 btn-mixed ${
            theme === 'mixed' ? 'bg-mixed-accent text-text-mixed' : 'bg-mixed-accent-light text-text-mixed-light'
          } focus:ring-mixed-accent flex items-center space-x-1 text-xs sm:text-sm min-w-[60px] sm:min-w-[70px] md:min-w-[80px] p-1 sm:p-2 z-50`}
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${theme === 'mixed' ? 'light' : 'dark'} mode`}
        >
          {theme === 'mixed' ? '☀️ Light' : '🌌 Dark'}
        </motion.button>

        <div className="mt-10 sm:mt-12 md:mt-14 pt-4">
          <h1
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-inter font-bold ${
              theme === 'mixed' ? 'text-mixed-accent' : 'text-mixed-accent-light'
            } mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-center animate-mixed-slide`}
          >
            WELCOME TO "REACT COUNTER APP"
          </h1>

          <h5
            className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-inter font-semibold ${
              theme === 'mixed' ? 'text-mixed-accent' : 'text-mixed-accent-light'
            } mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-center animate-mixed-slide`}
          >
            BY NOOR MALIK
          </h5>

          <div className="mb-3 sm:mb-4 md:mb-6 z-10 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 animate-mixed-slide max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <label
              className={`font-inter text-xs sm:text-sm md:text-base ${
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
              } w-14 sm:w-16 md:w-20`}
            />
          </div>

          <Counter count={count} updateCount={updateCount} theme={theme} />

          <HistoryLog history={history} undoLastAction={undoLastAction} theme={theme} setHistory={setHistory} />

          <div className="mt-3 sm:mt-4 md:mt-6 z-10 pointer-events-auto animate-mixed-slide max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <form onSubmit={handleCustomIncrement} className="mb-4 sm:mb-6 md:mb-8">
              <div
                className={`flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 ${
                  theme === 'mixed' ? 'bg-mixed-secondary' : 'bg-mixed-secondary-light'
                } p-2 sm:p-3 md:p-4 rounded-xl shadow-mixed border ${
                  theme === 'mixed' ? 'border-mixed-accent' : 'border-mixed-accent-light'
                }`}
              >
                <label
                  htmlFor="customIncrement"
                  className={`font-inter text-xs sm:text-sm md:text-base ${
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
                    } w-full sm:w-24 md:w-28`}
                    placeholder="Value"
                  />
                  <motion.button
                    type="submit"
                    className={`btn-mixed ${
                      theme === 'mixed' ? 'bg-mixed-accent text-text-mixed hover:bg-mixed-accent/90' : 'bg-mixed-accent-light text-text-mixed-light hover:bg-mixed-accent-light/90'
                    } focus:ring-mixed-accent min-w-[70px] sm:min-w-[80px]`}
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
                className={`flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 ${
                  theme === 'mixed' ? 'bg-mixed-secondary' : 'bg-mixed-secondary-light'
                } p-2 sm:p-3 md:p-4 rounded-xl shadow-mixed border ${
                  theme === 'mixed' ? 'border-mixed-accent' : 'border-mixed-accent-light'
                }`}
              >
                <label
                  htmlFor="customDecrement"
                  className={`font-inter text-xs sm:text-sm md:text-base ${
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
                    } w-full sm:w-24 md:w-28`}
                    placeholder="Value"
                  />
                  <motion.button
                    type="submit"
                    className={`btn-mixed ${
                      theme === 'mixed' ? 'bg-mixed-accent text-text-mixed hover:bg-mixed-accent/90' : 'bg-mixed-accent-light text-text-mixed-light hover:bg-mixed-accent-light/90'
                    } focus:ring-mixed-accent min-w-[70px] sm:min-w-[80px]`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subtract
                  </motion.button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer
        className={`w-full p-1 sm:p-2 md:p-4 ${
          theme === 'mixed' ? 'bg-mixed-accent text-text-mixed' : 'bg-mixed-accent-light text-text-mixed-light'
        } text-xs sm:text-sm flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3 font-inter fixed bottom-0 left-0 z-40`}
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
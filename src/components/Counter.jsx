import React from 'react';
import { motion } from 'framer-motion';

function Counter({ count, updateCount, theme }) {
  return (
    <motion.div
      className={`p-4 sm:p-6 md:p-8 rounded-xl shadow-mixed flex flex-col items-center border ${
        theme === 'mixed' ? 'bg-mixed-primary border-mixed-accent' : 'bg-mixed-light border-mixed-accent-light'
      } z-10 pointer-events-auto max-w-md mx-auto`}
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      role="region"
      aria-label="Counter controls"
    >
      <motion.div
        className={`text-3xl sm:text-4xl md:text-5xl font-inter font-semibold ${
          theme === 'mixed' ? 'text-mixed-accent' : 'text-mixed-accent-light'
        } mb-4 sm:mb-6 animate-mixed-pulse ${theme === 'mixed' ? 'glow-effect' : 'glow-effect-light'}`}
        key={count}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        aria-live="polite"
      >
        {count}
      </motion.div>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        <motion.button
          className={`btn-mixed ${
            theme === 'mixed' ? 'bg-mixed-accent text-text-mixed hover:bg-mixed-accent/90' : 'bg-mixed-accent-light text-text-mixed-light hover:bg-mixed-accent-light/90'
          } focus:ring-mixed-accent min-w-[100px]`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => updateCount('increment')}
          aria-label="Increment counter"
        >
          Increment
        </motion.button>
        <motion.button
          className={`btn-mixed ${
            theme === 'mixed' ? 'bg-mixed-accent text-text-mixed hover:bg-mixed-accent/90' : 'bg-mixed-accent-light text-text-mixed-light hover:bg-mixed-accent-light/90'
          } focus:ring-mixed-accent min-w-[100px]`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => updateCount('decrement')}
          aria-label="Decrement counter"
        >
          Decrement
        </motion.button>
        <motion.button
          className={`btn-mixed ${
            theme === 'mixed' ? 'bg-mixed-accent text-text-mixed hover:bg-mixed-accent/90' : 'bg-mixed-accent-light text-text-mixed-light hover:bg-mixed-accent-light/90'
          } focus:ring-mixed-accent min-w-[100px]`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => updateCount('reset')}
          aria-label="Reset counter"
        >
          Reset
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Counter;
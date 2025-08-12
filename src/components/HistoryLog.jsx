import React from 'react';
import { motion } from 'framer-motion';
import { playClearHistorySound } from '../utils/sound';

function HistoryLog({ history, undoLastAction, theme, setHistory }) {
  const clearHistory = () => {
    console.log('Clear history button clicked');
    try {
      playClearHistorySound();
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return (
    <div className="mt-3 sm:mt-4 md:mt-6 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto z-10 pointer-events-auto" role="region" aria-label="History log">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-3 md:mb-4 gap-2 sm:gap-0">
        <h2 className={`text-lg sm:text-xl md:text-2xl font-inter font-semibold ${
          theme === 'mixed' ? 'text-mixed-accent' : 'text-mixed-accent-light'
        } glow-effect`}>History Log</h2>
        <div className="flex space-x-2 sm:space-x-3">
          <motion.button
            className={`btn-mixed bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 min-w-[80px] sm:min-w-[100px]`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearHistory}
            aria-label="Clear history"
          >
            Clear History
          </motion.button>
          <motion.button
            className={`btn-mixed bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 min-w-[80px] sm:min-w-[100px]`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={undoLastAction}
            disabled={history.length === 0}
            aria-label="Undo last action"
          >
            Undo Last
          </motion.button>
        </div>
      </div>
      <div className={`p-2 sm:p-3 md:p-4 rounded-xl shadow-mixed border ${
        theme === 'mixed' ? 'bg-mixed-secondary border-mixed-accent' : 'bg-mixed-secondary-light border-mixed-accent-light'
      } max-h-[30vh] sm:max-h-[40vh] md:max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-mixed-accent scrollbar-track-mixed-primary`}>
        {history.length === 0 ? (
          <p className={`font-inter text-xs sm:text-sm md:text-base ${
            theme === 'mixed' ? 'text-text-mixed' : 'text-text-mixed-light'
          }`}>No actions yet.</p>
        ) : (
          <ul className="space-y-1 sm:space-y-2">
            {history.map((entry, index) => (
              <motion.li
                key={index}
                className={`font-inter text-xs sm:text-sm md:text-base ${
                  theme === 'mixed' ? 'text-text-mixed' : 'text-text-mixed-light'
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {entry.timestamp}: {entry.operation.charAt(0).toUpperCase() + entry.operation.slice(1)} to {entry.value}
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HistoryLog;
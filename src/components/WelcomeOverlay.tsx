import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsVisible(false);
    }
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
    localStorage.setItem('hasVisited', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center p-8 max-w-2xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block text-amber-400 mb-6"
            >
              {/* <Bee size={48} /> */}
              🥜
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Welcome to <strong>Mr.B Nut</strong>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-300 mb-8"
            >
              Discover the pure , Homemade and Healthy Products.
            </motion.p>
            
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={handleEnter}
              className="bg-amber-400 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-300 transition-colors duration-300 transform hover:scale-105"
            >
              Enter Site
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
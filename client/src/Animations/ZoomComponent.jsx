import React from 'react';
import { motion } from 'framer-motion';

const ZoomComponent = ({ isOpen, selectedImage, closeModal }) => {
  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-full max-h-full overflow-auto"
          >
            <img src={selectedImage} alt="Zoomed" className="max-w-full max-h-full" />
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white text-gray-800"
              onClick={closeModal}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ZoomComponent;

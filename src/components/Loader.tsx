import React from "react";
import { motion } from "framer-motion";
import peanutImage from "../photos/logo.png"; // Replace with actual peanut character image

const MrBNutLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
      <motion.img
        src={peanutImage}
        alt="Mr. B Nut Loader"
        className="w-[150px] h-[150px] drop-shadow-lg"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      />
      <motion.div
        className="w-16 h-3 bg-gray-300 rounded-full mt-2"
        style={{ filter: "blur(2px)" }}
        animate={{ scaleX: [1, 0.8, 1], opacity: [0.6, 0.3, 0.6] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      />
    </div>
  );
};

export default MrBNutLoader;

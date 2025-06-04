import React from "react";
import { motion } from "framer-motion";
import { HeroSectionProps } from "@/app/types";
import { josefinSans } from "@/app/utils/font";


const HeroSection: React.FC<HeroSectionProps> = ({ hoveredOption, setHoveredOption }) => {
  return (
    <main className="relative z-10 min-h-screen max-h-screen overflow-hidden flex flex-col items-center justify-center px-4 md:px-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <h1 className=" md:text-[6vw] text-[8vw] font-light mb-6 md:mb-8 tracking-tight">
          <motion.span 
            className="font-normal"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            deflated
          </motion.span>
          <span className="mx-2 md:mx-4"></span>
          <motion.span
            className="italic font-light cursor-pointer relative"
            onMouseEnter={() => setHoveredOption(true)}
            onMouseLeave={() => setHoveredOption(false)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            pappadam
            {hoveredOption && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute top-full left-1/2 md:left-3/4 tracking-widest transform -translate-x-1/2 mt-2 text-xs font-light text-white/70 whitespace-nowrap w-full"
              >
                deflatedpappadam@gmail.com
              </motion.div>
            )}
          </motion.span>
        </h1>

        <motion.div 
          className="mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className={`text-sm md:text-base text-white/60 tracking-wider ${josefinSans.className}`}>
            We r a pappadam but deflated
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default HeroSection;
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { NavbarProps } from "@/app/types";
import { quicksand } from "@/app/utils/font";


const Navbar: React.FC<NavbarProps> = () => {
  return (
    <motion.header 
      className="fixed flex w-full justify-between items-center top-0 right-0 z-40 p-8 md:p-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className={`text-sm md:text-base ${quicksand.className}`}>
        deflated pappadam
      </h2>

      <Link
        href="mailto:deflatedpappadam@gmail.com"
        className="border border-white/90 px-3 py-1 md:px-6 md:py-2 rounded text-xs md:text-sm font-light tracking-wider bg-white text-black hover:text-white hover:bg-transparent transition-all duration-300 hover:scale-105"
      >
        Contact Us
      </Link>
    </motion.header>
  );
};

export default Navbar;
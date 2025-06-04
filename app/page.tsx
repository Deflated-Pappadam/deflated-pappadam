"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValue, useScroll } from "framer-motion";
import { FloatingItem } from "./types";
import { useMouseTracking } from "./hooks/useMouseTracking";
import { useMobileDetection } from "./hooks/useMobileDetection";
import { getPortfolioItems } from "./data/PortfolioData";
import Navbar from "./components/ui/NavBar";
import FloatingItemComponent from "./components/ui/FloatingItemComponent";
import HeroSection from "./components/sections/HeroSection";
import AboutPage from "./components/sections/AboutSection";
import Footer from "./components/ui/Footer";
// import ProjectSection from "./components/sections/ProjectSection";

const Page: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [hoveredOption, setHoveredOption] = useState(false);

  // Custom hooks
  const isMobile = useMobileDetection();
  
  // Motion values for mouse tracking
  const globalMouseX = useMotionValue(0);
  const globalMouseY = useMotionValue(0);
  
  // Mouse tracking hook
  const { cursorRef } = useMouseTracking(globalMouseX, globalMouseY, isMobile);
  
  const { scrollY } = useScroll();

  // Initialize floating items
  useEffect(() => {
    if(cursorRef.current) {}
    const portfolioItems = getPortfolioItems(isMobile);
    const initialItems: FloatingItem[] = portfolioItems.map((item, index) => ({
      id: `item-${index}`,
      ...item,
    }));

    setItems(initialItems);
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-x-hidden relative h-fit"
      style={{ 
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      {/* Custom Cursor */}
      {/* {!isMobile && (
        <div
          ref={cursorRef}
          className="fixed w-5 h-5 bg-white/20 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            transform: 'translate3d(-50%, -50%, 0)',
            transition: 'opacity 0.2s ease',
          }}
        />
      )} */}

      {/* Navbar */}
      <Navbar hoveredOption={hoveredOption} setHoveredOption={setHoveredOption} />

      {/* Floating Background Items */}
      <div className="fixed inset-0 pointer-events-none">
        {items.map((item) => (
          <FloatingItemComponent 
            key={item.id} 
            item={item} 
            globalMouseX={globalMouseX}
            globalMouseY={globalMouseY}
            scrollY={scrollY}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Main Content */}
      <HeroSection hoveredOption={hoveredOption} setHoveredOption={setHoveredOption} />
      <AboutPage/>
      {/* <ProjectSection/> */}
      <Footer/>

    </div>
  );
};

export default Page;
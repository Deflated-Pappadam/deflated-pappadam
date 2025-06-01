"use client";
import React, { useEffect, useRef, useState,useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, MotionValue } from "framer-motion";
import Link from "next/link";
import { josefinSans, quicksand } from "./utils/font";

interface FloatingItem {
  id: string;
  text?: string;
  imageUrl?: string;
  type: "text" | "image" | "testimonial";
  baseX: number;
  baseY: number;
  mobileX?: number;
  mobileY?: number;
  size: "small" | "medium" | "large";
  author?: string;
  title?: string;
  width?: number;
  height?: number;
  mobileWidth?: number;
  mobileHeight?: number;
  followStrength: number;
  scrollSpeed?: number;
}

const FloatingItemComponent = React.memo(({ 
  item, 
  globalMouseX, 
  globalMouseY, 
  scrollY,
  isMobile 
}: { 
  item: FloatingItem;
  globalMouseX: MotionValue<number>;
  globalMouseY: MotionValue<number>;
  scrollY: MotionValue<number>;
  isMobile: boolean;
}) => {
  // Simple spring configuration for smooth movement only
  const springConfig = useMemo(() => ({
    stiffness: 80,
    damping: 30,
    mass: 0.6,
    restDelta: 0.0001,
  }), []);

  const itemX = useSpring(0, springConfig);
  const itemY = useSpring(0, springConfig);

  // Mouse-based parallax transforms
  const mouseParallaxX = useTransform(
    globalMouseX,
    (mouseX) => {
      if (isMobile) return 0;
      const viewportCenterX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
      const distanceFromCenter = mouseX - viewportCenterX;
      return distanceFromCenter * item.followStrength;
    }
  );

  const mouseParallaxY = useTransform(
    globalMouseY,
    (mouseY) => {
      if (isMobile) return 0;
      const viewportCenterY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
      const distanceFromCenter = mouseY - viewportCenterY;
      return distanceFromCenter * item.followStrength;
    }
  );

  // Scroll-based parallax
  const scrollParallaxY = useTransform(
    scrollY,
    [0, 1000],
    [0, (item.scrollSpeed || 0.5) * -200]
  );

  // Combine transforms for movement only
  useEffect(() => {
    if (!isMobile) {
      const unsubscribeMouseX = mouseParallaxX.on("change", (value) => {
        itemX.set(value);
      });
      
      const unsubscribeMouseY = mouseParallaxY.on("change", (value) => {
        const scrollOffset = scrollParallaxY.get();
        itemY.set(value + scrollOffset);
      });

      const unsubscribeScrollY = scrollParallaxY.on("change", (value) => {
        const mouseOffset = mouseParallaxY.get();
        itemY.set(mouseOffset + value);
      });

      return () => {
        unsubscribeMouseX();
        unsubscribeMouseY();
        unsubscribeScrollY();
      };
    }
  }, [mouseParallaxX, mouseParallaxY, scrollParallaxY, itemX, itemY, isMobile]);

  const baseStyle = useMemo(() => ({
    width: isMobile
      ? item.mobileWidth
        ? `${item.mobileWidth}px`
        : item.width
        ? `${item.width * 0.6}px`
        : "auto"
      : item.width
      ? `${item.width}px`
      : "auto",
    height: isMobile
      ? item.mobileHeight
        ? `${item.mobileHeight}px`
        : item.height
        ? `${item.height * 0.6}px`
        : "auto"
      : item.height
      ? `${item.height}px`
      : "auto",
  }), [item, isMobile]);

  const positionX = isMobile ? item.mobileX ?? item.baseX * 0.3 : item.baseX;
  const positionY = isMobile ? item.mobileY ?? item.baseY * 0.8 : item.baseY;

  if (item.type === "image") {
    return (
      <motion.div
        className="absolute will-change-transform"
        style={{
          left: positionX,
          top: positionY,
          x: isMobile ? 0 : itemX,
          y: isMobile ? 0 : itemY,
          ...baseStyle,
        }}
      >
        <img
          src={item.imageUrl}
          alt="Portfolio work"
          className="w-full h-full object-cover rounded-lg opacity-90 shadow-2xl backdrop grayscale-75 brightness-50 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
      </motion.div>
    );
  }

  if (item.type === "testimonial") {
    return (
      <motion.div
        className="absolute will-change-transform"
        style={{
          left: positionX,
          top: positionY,
          x: isMobile ? 0 : itemX,
          y: isMobile ? 0 : itemY,
          ...baseStyle,
        }}
      >
        <div className="bg-white/8 backdrop-blur-sm border border-white/10 p-4 md:p-6 rounded-lg max-w-sm transition-all duration-300 hover:bg-white/12 hover:border-white/20">
          <p className={`${isMobile ? "text-xs" : "text-sm"} font-light leading-relaxed mb-3 md:mb-4 text-white/90`}>
            &quot;{item.text}&quot;
          </p>
          <div className={`${isMobile ? "text-xs" : "text-xs"} font-light text-white/70`}>
            — {item.author}
            {item.title && <br />}
            {item.title}
          </div>
        </div>
      </motion.div>
    );
  }

  const isMainTitle = item.text === "visual" || item.text === "identity";
  return (
    <motion.div
      className={`absolute whitespace-pre-line font-light tracking-wider will-change-transform ${
        isMainTitle
          ? `${isMobile ? "text-xs" : "text-sm"} opacity-60`
          : item.size === "small"
          ? `${isMobile ? "text-xs" : "text-xs"} opacity-50`
          : item.size === "medium"
          ? `${isMobile ? "text-xs" : "text-sm"} opacity-60`
          : `${isMobile ? "text-sm" : "text-base"} opacity-40`
      }`}
      style={{
        left: positionX,
        top: positionY,
        x: isMobile ? 0 : itemX,
        y: isMobile ? 0 : itemY,
        fontFamily: isMainTitle ? "system-ui, sans-serif" : "Georgia, serif",
        fontWeight: isMainTitle ? "300" : "400",
      }}
    >
      {item.text}
    </motion.div>
  );
});

FloatingItemComponent.displayName = "FloatingItemComponent";

const Page: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(false);

  // Motion values for mouse tracking
  const globalMouseX = useMotionValue(0);
  const globalMouseY = useMotionValue(0);
  
  const { scrollY } = useScroll();

  // Check if mobile with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Initialize floating items
  useEffect(() => {
    const portfolioItems = [
      {
        imageUrl: "/images/logo.png",
        size: "medium" as const,
        type: "image" as const,
        baseX: 500,
        baseY: 110,
        mobileX: 50,
        mobileY: 120,
        width: 200,
        height: 80,
        mobileWidth: 120,
        mobileHeight: 50,
        followStrength: isMobile ? 0.01 : 0.02,
        scrollSpeed: 0.3,
      },
      {
        imageUrl: "/images/blossomflora.png",
        size: "large" as const,
        type: "image" as const,
        baseX: 128,
        baseY: 150,
        mobileX: -20,
        mobileY: 700,
        width: 270,
        height: 140,
        mobileWidth: 150,
        mobileHeight: 80,
        followStrength: isMobile ? 0.015 : 0.03,
        scrollSpeed: 0.7,
      },
      {
        imageUrl: "/images/adi.png",
        size: "small" as const,
        type: "image" as const,
        baseX: 1390,
        baseY: 720,
        mobileX: 200,
        mobileY: 800,
        width: 240,
        height: 100,
        mobileWidth: 130,
        mobileHeight: 60,
        followStrength: isMobile ? 0.02 : 0.04,
        scrollSpeed: 0.5,
      },
      {
        imageUrl: "/images/ayadacliff.png",
        size: "small" as const,
        type: "image" as const,
        baseX: 600,
        baseY: 740,
        mobileX: 270,
        mobileY: 100,
        width: 300,
        height: 180,
        mobileWidth: 160,
        mobileHeight: 100,
        followStrength: isMobile ? 0.015 : 0.03,
        scrollSpeed: 0.4,
      },
      {
        text: "VISUAL\nIDENTITY",
        size: "small" as const,
        type: "text" as const,
        baseX: 474,
        baseY: 600,
        mobileX: 20,
        mobileY: 270,
        followStrength: isMobile ? 0.02 : 0.04,
        scrollSpeed: 0.6,
      },
      {
        text: "WEB DEVELOPMENT",
        size: "small" as const,
        type: "text" as const,
        baseX: 1274,
        baseY: 600,
        mobileX: 220,
        mobileY: 520,
        followStrength: isMobile ? 0.02 : 0.04,
        scrollSpeed: 0.8,
      },
      {
        text: "BRANDING",
        size: "medium" as const,
        type: "text" as const,
        baseX: 1400,
        baseY: 200,
        mobileX: 250,
        mobileY: 350,
        followStrength: isMobile ? 0.01 : 0.02,
        scrollSpeed: 0.3,
      },
      {
        text: "CREATIVE",
        size: "small" as const,
        type: "text" as const,
        baseX: 200,
        baseY: 500,
        mobileX: 30,
        mobileY: 550,
        followStrength: isMobile ? 0.015 : 0.03,
        scrollSpeed: 0.9,
      },
      {
        text: "Our flower shop needed a fresh online presence and Deflated Pappadam delivered beyond expectations. The SEO work brought us so many new customers!",
        author: "Ritvik Jesse",
        title: "Owner, Blossom Flora",
        size: "medium" as const,
        type: "testimonial" as const,
        baseX: 829,
        baseY: 95,
        mobileX: 20,
        mobileY: 1050,
        width: 300,
        mobileWidth: 280,
        followStrength: isMobile ? 0.015 : 0.03,
        scrollSpeed: 0.4,
      },
      {
        text: "The team delivered a stunning showroom website that perfectly represents our German interior design aesthetic. Professional, creative, and always responsive.",
        author: "Midhun",
        title: "Owner, Gamior Interiors",
        size: "medium" as const,
        type: "testimonial" as const,
        baseX: 70,
        baseY: 580,
        mobileX: 20,
        mobileY: 1300,
        width: 280,
        mobileWidth: 280,
        followStrength: isMobile ? 0.02 : 0.04,
        scrollSpeed: 0.6,
      },
      {
        text: "Working with Deflated Pappadam was incredible! They transformed our resort website into something beautiful and functional.",
        author: "Riswan Bisar",
        title: "Owner, Ayada Cliff Resort",
        size: "medium" as const,
        type: "testimonial" as const,
        baseX: 950,
        baseY: 600,
        mobileX: 20,
        mobileY: 1550,
        width: 290,
        mobileWidth: 280,
        followStrength: isMobile ? 0.015 : 0.03,
        scrollSpeed: 0.5,
      },
    ];

    const initialItems: FloatingItem[] = portfolioItems.map((item, index) => ({
      id: `item-${index}`,
      ...item,
    }));

    setItems(initialItems);
  }, [isMobile]);

  // Mouse move handler with RAF optimization
  useEffect(() => {
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          globalMouseX.set(e.clientX);
          globalMouseY.set(e.clientY);

          // Update custom cursor
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
          }
        });
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(rafId);
      };
    }
  }, [globalMouseX, globalMouseY, isMobile]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-x-hidden relative"
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

      {/* Header */}
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
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light mb-6 md:mb-8 tracking-tight">
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

      {/* Mobile-specific bottom spacing */}
      {isMobile && <div className="h-screen"></div>}
    </div>
  );
};

export default Page;
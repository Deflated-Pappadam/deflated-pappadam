"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

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
}

const Page: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Global mouse position for all elements to follow
  const globalMouseX = useMotionValue(0);
  const globalMouseY = useMotionValue(0);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize floating items
  useEffect(() => {
    const portfolioItems = [
      // Logo/Brand image
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
      },

      // Large portfolio image
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
      },

      // Bottom portfolio image
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
      },

      // Center tablet mockup
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
      },

      // Text elements
      {
        text: "VISUAL\nIDENTITY",
        size: "small" as const,
        type: "text" as const,
        baseX: 474,
        baseY: 600,
        mobileX: 20,
        mobileY: 270,
        followStrength: isMobile ? 0.02 : 0.04,
      },
      {
        text: "WEB DEVELOPMENT",
        size: "small" as const,
        type: "text" as const,
        baseX: 1174,
        baseY: 500,
        mobileX: 220,
        mobileY: 520,
        followStrength: isMobile ? 0.02 : 0.04,
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
      },

      // Testimonials
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
      },
    ];

    const initialItems: FloatingItem[] = portfolioItems.map((item, index) => ({
      id: `item-${index}`,
      ...item,
    }));

    setItems(initialItems);
  }, [isMobile]);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        // Update global mouse position for all elements
        globalMouseX.set(e.clientX);
        globalMouseY.set(e.clientY);

        // Update cursor position
        if (cursorRef.current) {
          cursorRef.current.style.left = `${e.clientX - 10}px`;
          cursorRef.current.style.top = `${e.clientY - 10}px`;
        }
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [globalMouseX, globalMouseY, isMobile]);

  // Floating item component with smooth following motion
  const FloatingItemComponent = ({ item }: { item: FloatingItem }) => {
    // Create individual springs for this item that follow the global mouse
    const itemX = useSpring(0, {
      stiffness: 15,
      damping: 25,
      mass: 1.2,
      restDelta: 0.01,
    });

    const itemY = useSpring(0, {
      stiffness: 15,
      damping: 25,
      mass: 1.2,
      restDelta: 0.01,
    });

    // Update item position based on global mouse movement
    useEffect(() => {
      if (!isMobile) {
        const unsubscribeX = globalMouseX.on("change", (mouseX) => {
          const viewportCenterX = window.innerWidth / 2;
          const distanceFromCenter = mouseX - viewportCenterX;
          const targetOffset = distanceFromCenter * item.followStrength;
          itemX.set(targetOffset);
        });

        const unsubscribeY = globalMouseY.on("change", (mouseY) => {
          const viewportCenterY = window.innerHeight / 2;
          const distanceFromCenter = mouseY - viewportCenterY;
          const targetOffset = distanceFromCenter * item.followStrength;
          itemY.set(targetOffset);
        });

        return () => {
          unsubscribeX();
          unsubscribeY();
        };
      }
    }, [
      item.followStrength,
      itemX,
      itemY,
      globalMouseX,
      globalMouseY,
      isMobile,
    ]);

    const baseStyle = {
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
    };

    const positionX = isMobile ? item.mobileX ?? item.baseX * 0.3 : item.baseX;
    const positionY = isMobile ? item.mobileY ?? item.baseY * 0.8 : item.baseY;

    if (item.type === "image") {
      return (
        <motion.div
          key={item.id}
          className="absolute"
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
            className="w-full h-full object-cover rounded-lg opacity-90 shadow-2xl backdrop grayscale-75 brightness-50"
          />
        </motion.div>
      );
    } else if (item.type === "testimonial") {
      return (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: positionX,
            top: positionY,
            x: isMobile ? 0 : itemX,
            y: isMobile ? 0 : itemY,
            ...baseStyle,
          }}
        >
          <div className="bg-white/8 backdrop-blur-sm border border-white/10 p-4 md:p-6 rounded-lg max-w-sm">
            <p
              className={`${
                isMobile ? "text-xs" : "text-sm"
              } font-light leading-relaxed mb-3 md:mb-4 text-white/90`}
            >
              &quot;{item.text}&quot;
            </p>
            <div
              className={`${
                isMobile ? "text-xs" : "text-xs"
              } font-light text-white/70`}
            >
              — {item.author}
              {item.title && <br />}
              {item.title}
            </div>
          </div>
        </motion.div>
      );
    } else {
      const isMainTitle = item.text === "visual" || item.text === "identity";
      return (
        <motion.div
          key={item.id}
          className={`absolute whitespace-pre-line font-light tracking-wider ${
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
            fontFamily: isMainTitle
              ? "system-ui, sans-serif"
              : "Georgia, serif",
            fontWeight: isMainTitle ? "300" : "400",
          }}
        >
          {item.text}
        </motion.div>
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`h-screen bg-black text-white overflow-hidden relative ${
        isMobile ? "cursor-auto" : "cursor-none"
      }`}
    >
      {/* Custom Cursor - Hidden on mobile */}
      {!isMobile && (
        <div
          ref={cursorRef}
          className="fixed w-5 h-5 bg-white rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-75"
        />
      )}

      {/* Header */}
      <header className="fixed flex w-full justify-between items-center top-0 right-0 z-40 p-4 md:p-8">
        <h2 className="text-sm md:text-base">deflated pappadam</h2>

        <button className="border border-white/90 px-3 py-1 md:px-6 md:py-2 rounded text-xs md:text-sm font-light tracking-wider bg-white text-black hover:text-white hover:bg-transparent transition-colors">
          Contact Us
        </button>
      </header>

      {/* Floating Background Items */}
      <div className="fixed inset-0 pointer-events-none">
        {items.map((item) => (
          <FloatingItemComponent key={item.id} item={item} />
        ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light mb-6 md:mb-8 tracking-tight">
            <span className="font-normal">deflated</span>
            <span className="mx-2 md:mx-4"></span>
            <span className="italic font-light">pappadam</span>
          </h1>

          <div className="mb-12 md:mb-16">
            <p className="text-sm md:text-base text-white/60 tracking-wider">
              We r a pappadam but deflated
            </p>
          </div>
        </div>
      </main>

      {/* Mobile-specific bottom spacing */}
      {isMobile && <div className="h-screen"></div>}
    </div>
  );
};

export default Page;

import React, { useEffect, useMemo } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { FloatingItemProps } from "@/app/types";

const FloatingItemComponent = React.memo(({ 
  item, 
  globalMouseX, 
  globalMouseY, 
  scrollY,
  isMobile 
}: FloatingItemProps) => {
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

  // Convert position percentages to viewport units
  const getViewportPosition = (position: number, isMobile: boolean, isX: boolean = true) => {
    if (isMobile) {
      // For mobile, use a simpler calculation based on mobile viewport
      // Assuming mobile coordinates are designed for ~400px width viewport
      const mobileBaseWidth = 400;
      const mobileBaseHeight = 800;
      const percentage = position / (isX ? mobileBaseWidth : mobileBaseHeight) * 100;
      return `${Math.max(0, Math.min(percentage, 95))}${isX ? 'vw' : 'vh'}`;
    }
    // For desktop, convert pixel values to viewport percentages
    const percentage = (position / (isX ? 1920 : 1080)) * 110;
    return `${Math.max(0, Math.min(percentage, 95))}${isX ? 'vw' : 'vh'}`;
  };

  // Calculate responsive sizes using viewport units
  const getResponsiveSize = (size: number, isMobile: boolean, isWidth: boolean = true) => {
    if (isMobile) {
      // For mobile, use more conservative sizing
      const mobileBaseWidth = 400;
      const mobileBaseHeight = 800;
      const percentage = (size / (isWidth ? mobileBaseWidth : mobileBaseHeight)) * 100;
      return `${Math.max(5, Math.min(percentage, 80))}${isWidth ? 'vw' : 'vh'}`;
    }
    const percentage = (size / (isWidth ? 1920 : 1080)) * 120;
    return `${Math.max(1, Math.min(percentage, 90))}${isWidth ? 'vw' : 'vh'}`;
  };

  const baseStyle = useMemo(() => ({
    width: item.width ? getResponsiveSize(item.width, isMobile, true) : "auto",
    height: item.height ? getResponsiveSize(item.height, isMobile, false) : "auto",
    fontSize: isMobile ? 'clamp(12px, 4vw, 18px)' : 'clamp(14px, 1.2vw, 24px)', // More reliable responsive font size
  }), [item, isMobile]);

  // Use mobile-specific positions if available, otherwise use desktop positions
  const positionX = isMobile && item.mobileX !== undefined 
    ? getViewportPosition(item.mobileX, true, true)
    : getViewportPosition(item.baseX, false, true);
    
  const positionY = isMobile && item.mobileY !== undefined 
    ? getViewportPosition(item.mobileY, true, false)
    : getViewportPosition(item.baseY, false, false);

  if (item.type === "image") {
    return (
      <motion.div
        className="absolute will-change-transform"
        style={{
          left: positionX,
          top: positionY,
          x: isMobile ? 0 : itemX,
          y: isMobile ? 0 : itemY,
          width: baseStyle.width,
          height: baseStyle.height,
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

  if (item.type === "testimonial" && !isMobile) {
    return (
      <motion.div
        className="absolute will-change-transform"
        style={{
          left: positionX,
          top: positionY,
          x: isMobile ? 0 : itemX,
          y: isMobile ? 0 : itemY,
          width: item.width ? getResponsiveSize(item.width, isMobile, true) : 'auto',
          maxWidth: '25vw',
        }}
      >
        <div className="bg-white/8 backdrop-blur-sm border border-white/10 p-4 md:p-6 rounded-lg transition-all duration-300 hover:bg-white/12 hover:border-white/20">
          <p className="text-[0.9vw] font-light leading-relaxed mb-3 md:mb-4 text-white/90" >
            &quot;{item.text}&quot;
          </p>
          <div className="text-xs font-light text-white/70" style={{ fontSize: isMobile ? 'clamp(8px, 2.5vw, 12px)' : 'clamp(10px, 0.7vw, 14px)' }}>
            — {item.author}
            {item.title && <br />}
            {item.title}
          </div>
        </div>
      </motion.div>
    );
  }

  const isMainTitle = item.text === "visual" || item.text === "identity" || item.text?.includes("VISUAL");
  
  if (item.type !== "testimonial") {
    return (
      <motion.div
        className={`absolute whitespace-pre-line font-light tracking-wider will-change-transform ${
          isMainTitle
            ? "opacity-60"
            : item.size === "small"
            ? "opacity-50"
            : item.size === "medium"
            ? "opacity-60"
            : "opacity-40"
        }`}
        style={{
          left: positionX,
          top: positionY,
          x: isMobile ? 0 : itemX,
          y: isMobile ? 0 : itemY,
          fontFamily: isMainTitle ? "system-ui, sans-serif" : "Georgia, serif",
          fontWeight: isMainTitle ? "300" : "400",
          fontSize: item.size === "small" 
            ? (isMobile ? 'clamp(10px, 3.5vw, 16px)' : 'clamp(12px, 1vw, 18px)')
            : item.size === "medium"
            ? (isMobile ? 'clamp(12px, 4.5vw, 20px)' : 'clamp(16px, 1.4vw, 24px)')
            : (isMobile ? 'clamp(14px, 5vw, 24px)' : 'clamp(18px, 1.6vw, 28px)'),
        }}
      >
        {item.text}
      </motion.div>
    );
  }
});

FloatingItemComponent.displayName = "FloatingItemComponent";

export default FloatingItemComponent;
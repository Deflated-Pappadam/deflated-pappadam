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

  if (item.type === "testimonial" && !isMobile) {
    return (
      <motion.div
        className="absolute will-change-transform "
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
  if (item.type !== "testimonial" ) {
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
}
});

FloatingItemComponent.displayName = "FloatingItemComponent";

export default FloatingItemComponent;
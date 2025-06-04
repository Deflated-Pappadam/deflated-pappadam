import React, {  useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { greatvibes, josefinSans  } from '@/app/utils/font';

interface AnimatedTextProps {
  children: string;
  className?: string;
}

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
 
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const mainInView = useInView(mainRef, { once: true, margin: "-10%" });
  const detailsInView = useInView(detailsRef, { once: true, margin: "-20%" });
  
  // Subtle parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

  const textRevealVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const AnimatedText: React.FC<AnimatedTextProps> = ({ children, className = "" }) => {
    const words = children.split(' ');
    
    return (
      <motion.span
        className={className}
        variants={textRevealVariants}
        initial="hidden"
        animate={mainInView ? "visible" : "hidden"}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Main About Section */}
      <section ref={mainRef} className="flex items-center justify-center px-8 py-20 relative">
        <motion.div
          className="max-w-6xl mx-auto"
          style={{ y, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mainInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white/90"
          >
        
            <p className={`text-white/60 ${josefinSans.className}`}>
              <AnimatedText>We embrace the freedom to explore innovative and unconventional ideas, constantly</AnimatedText>{' '}
              <span className={`text-white/60 ${greatvibes.className} tracking-wider leading-relaxed`}>pushing the boundaries of creativity to deliver</span>{' '}
              <AnimatedText>extraordinary results.</AnimatedText>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Detailed About Section */}
      <section ref={detailsRef} className="min-h-[60vh] flex items-center px-8 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={detailsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h3 
              className="text-sm uppercase tracking-[0.3em] text-white/60 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={detailsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              About Us
            </motion.h3>
            
            <motion.p 
              className="text-lg leading-relaxed text-white/80 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={detailsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Based in the vibrant city of Thiruvananthapuram, Kerala, we are a dynamic freelance collective of recent graduates who&apos;ve come together with a shared passion for technology and innovation.  Whether it&apos;s building, designing, or innovating, we thrive on turning &ldquo;what if&rdquo; into &ldquo;what&apos;s next&rdquo;.
             </motion.p>
          </motion.div>

          {/* Right Visual Element */}
          <motion.div 
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={detailsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Main Circle */}
              <motion.div
                className="w-80 h-80 rounded-full border border-white/10 relative flex items-center justify-center"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* Inner content */}
                <motion.div 
                  className="text-center"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <motion.div
                    className="text-sm font-light tracking-wider mb-2 cursor-pointer flex justify-center items-center"
                    whileHover={{ scale: 1.1 }}
                  >
                  <img src='images/logo.png' alt="Deflated Pappadam Logo" className="w-full" />
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white/20"
                animate={{
                  y: [-5, 5, -5],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-white/15"
                animate={{
                  y: [5, -5, 5],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-20" />
    </div>
  );
};

export default AboutPage;
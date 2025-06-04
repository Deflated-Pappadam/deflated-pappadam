import React from "react";
import { motion } from "framer-motion";

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: "Pappadam Analytics Dashboard",
      description: "A comprehensive analytics platform for tracking pappadam inflation patterns across various markets.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      tags: ["React", "D3.js", "Node.js"],
      status: "Live",
      gradient: "from-blue-500/20 to-purple-600/20"
    },
    {
      id: 2,
      title: "Deflation Simulator",
      description: "An interactive web application that simulates the deflation process of various objects in real-time.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      tags: ["Three.js", "WebGL", "Physics Engine"],
      status: "In Progress",
      gradient: "from-emerald-500/20 to-teal-600/20"
    },
    {
      id: 3,
      title: "Minimalist Portfolio Engine",
      description: "A lightweight, customizable portfolio framework designed for creative professionals and developers.",
      image: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=300&fit=crop",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      status: "Live",
      gradient: "from-rose-500/20 to-pink-600/20"
    },
    {
      id: 4,
      title: "Ambient Sound Generator",
      description: "A procedural ambient sound generator that creates unique soundscapes based on environmental data.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      tags: ["Web Audio API", "Machine Learning", "Python"],
      status: "Concept",
      gradient: "from-amber-500/20 to-orange-600/20"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-4">
            Projects
          </h1>
          <p className="text-white/60 text-sm md:text-base tracking-wider">
            A collection of deflated endeavors and inflated ambitions
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                {/* Project Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10`} />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      project.status === 'Live' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : project.status === 'In Progress'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-white/10 text-white/70 border border-white/20'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-light mb-3 group-hover:text-white/90 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group/btn relative overflow-hidden px-6 py-2 border border-white/20 rounded-full text-sm font-light tracking-wider transition-all duration-300 hover:border-white/40"
                  >
                    <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                      View Project
                    </span>
                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16 md:mt-24"
        >
          <p className="text-white/40 text-sm tracking-widest">
            More projects deflating soon...
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;
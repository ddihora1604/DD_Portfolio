import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Calendar, ArrowUpRight, Plus, Minus } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Split description for preview and full content
  const shortDescription = project.description.split('.').slice(0, 2).join('.') + '.';
  const remainingDescription = project.description.split('.').slice(2).join('.').trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer relative"
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)"
      }}
      layout
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        whileHover={{ scale: 1.1 }}
      />
      
      {/* Floating orbs for visual appeal */}
      <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-cyan-400/15 to-pink-500/15 rounded-full blur-lg group-hover:scale-125 transition-transform duration-700" />

      <div className="relative z-10">
        <div className="relative overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-56 object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/30"
            whileHover={{ 
              scale: 1.15, 
              backgroundColor: "rgba(59, 130, 246, 0.3)",
              borderColor: "rgba(59, 130, 246, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-5 h-5 text-white" />
          </motion.a>

          <div className="absolute bottom-4 left-4 right-4">
            <motion.div 
              className="flex items-center gap-2 text-white/80 text-sm mb-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="font-medium">{project.date}</span>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="p-6 space-y-4"
          layout
        >
          <motion.div layout>
            <motion.h3 
              className="text-xl font-bold group-hover:text-blue-400 transition-colors duration-300 mb-1"
              whileHover={{ x: 5 }}
            >
              {project.title}
            </motion.h3>
            <p className="text-blue-400 text-sm font-medium mb-3 uppercase tracking-wide">
              {project.subtitle}
            </p>
          </motion.div>
          
          <motion.div layout>
            <p className="text-white/70 text-sm leading-relaxed">
              {shortDescription}
            </p>
            
            <AnimatePresence>
              {isExpanded && remainingDescription && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <motion.p 
                    className="text-white/70 text-sm leading-relaxed mt-3 pt-3 border-t border-white/10"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {remainingDescription}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-2"
            layout
          >
            {(isExpanded ? project.tech : project.tech.slice(0, 4)).map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-3 py-1.5 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-300 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
            
            {!isExpanded && project.tech.length > 4 && (
              <motion.span 
                className="px-3 py-1.5 text-xs bg-white/10 rounded-full text-white/60 border border-white/20"
                whileHover={{ scale: 1.05 }}
              >
                +{project.tech.length - 4} more
              </motion.span>
            )}
          </motion.div>

          {/* Expand/Collapse Button */}
          {remainingDescription && (
            <motion.button
              onClick={toggleExpanded}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 font-medium text-sm group/btn"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isExpanded ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </motion.div>
              <span className="group-hover/btn:underline">
                {isExpanded ? "Show Less" : "More Details"}
              </span>
            </motion.button>
          )}

          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 font-medium pt-2 group/link"
            whileHover={{ x: 8 }}
            whileTap={{ scale: 0.95 }}
            layout
          >
            <span className="group-hover/link:underline">View Project</span>
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}
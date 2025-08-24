import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 20px 40px rgba(0, 212, 255, 0.2)" 
      }}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <ExternalLink className="w-5 h-5 text-white" />
        </motion.a>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
            <Calendar className="w-4 h-4" />
            <span>{project.date}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors duration-300 mb-1">
            {project.title}
          </h3>
          <p className="text-blue-400 text-sm font-medium mb-3">{project.subtitle}</p>
        </div>
        
        <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs bg-white/10 rounded-full text-blue-400 border border-blue-400/30"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-3 py-1 text-xs bg-white/10 rounded-full text-white/60">
              +{project.tech.length - 4} more
            </span>
          )}
        </div>

        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium pt-2"
          whileHover={{ x: 5 }}
        >
          View Project <ArrowUpRight className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  );
}
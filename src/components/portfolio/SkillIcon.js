import React from "react";
import { motion } from "framer-motion";

export default function SkillIcon({ skill, index }) {
  const IconComponent = skill.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.1, 
        boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)" 
      }}
      className="glass-card p-4 rounded-xl text-center group cursor-pointer"
    >
      <IconComponent className="w-8 h-8 mx-auto mb-2 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
      <span className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">
        {skill.name}
      </span>
    </motion.div>
  );
}
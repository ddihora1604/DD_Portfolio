import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, Building, Award } from "lucide-react";

export default function ExperienceCard({ experience, index, isEven }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -100 : 100, scale: 0.8 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={`relative ${isEven ? 'md:pr-8' : 'md:pl-8'}`}
    >
      {/* Timeline connector */}
      <div className={`hidden md:block absolute top-6 ${isEven ? 'right-0' : 'left-0'} w-8 h-0.5 bg-gradient-to-r ${isEven ? 'from-blue-500 to-transparent' : 'from-transparent to-blue-500'}`} />
      
      {/* Experience Card */}
      <motion.div
        whileHover={{ 
          scale: 1.02, 
          y: -5,
          boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)"
        }}
        transition={{ duration: 0.3 }}
        className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 group overflow-hidden"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating orbs */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400/15 to-pink-500/15 rounded-full blur-lg group-hover:scale-125 transition-transform duration-700" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30"
            >
              <Briefcase className="w-7 h-7 text-white" />
            </motion.div>
            
            <div className="flex-1">
              <motion.h3 
                className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                {experience.title}
              </motion.h3>
              
              <motion.div 
                className="flex items-center gap-2 mb-3"
                whileHover={{ x: 5 }}
              >
                <Building className="w-5 h-5 text-blue-400" />
                <h4 className="text-blue-400 font-semibold text-lg">{experience.company}</h4>
              </motion.div>
              
              <div className="flex flex-wrap gap-4 text-white/70">
                <motion.div 
                  className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                >
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium">{experience.duration}</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.1)" }}
                >
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium">{experience.location}</span>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="space-y-4">
            {experience.description.map((desc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ x: 5 }}
                className="group/item"
              >
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent hover:from-blue-500/10 hover:to-purple-500/5 transition-all duration-300">
                  <motion.div 
                    className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3 flex-shrink-0 shadow-lg shadow-blue-400/50"
                    whileHover={{ scale: 1.5 }}
                  />
                  <p className="text-white/80 leading-relaxed group-hover/item:text-white transition-colors duration-300">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Achievement badge */}
          <motion.div
            className="mt-6 flex items-center gap-2 text-yellow-400/80"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Award className="w-5 h-5" />
            <span className="text-sm font-medium">Research Excellence</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
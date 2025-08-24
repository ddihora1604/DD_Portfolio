import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Calendar } from "lucide-react";

export default function ExtraCurricularCard({ activity, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-12 translate-x-12" />
      
      <div className="relative">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center overflow-hidden p-1.5 flex-shrink-0">
            {activity.logo ? (
              <img 
                src={activity.logo} 
                alt={`${activity.organization} logo`}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                style={{
                  imageRendering: 'crisp-edges'
                }}
                loading="lazy"
              />
            ) : (
              <Award className="w-6 h-6 text-white" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{activity.title}</h3>
            <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
              <Users className="w-4 h-4" />
              <span>{activity.organization}</span>
            </div>
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{activity.duration}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {activity.skills && activity.skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="flex items-start gap-3"
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
              <p className="text-white/70 leading-relaxed">{skill}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
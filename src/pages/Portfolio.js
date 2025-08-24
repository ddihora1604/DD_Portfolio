import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowDown, 
  ArrowRight,
  Mail, 
  Github, 
  Linkedin,
  Instagram,
  Twitter,
  Briefcase,
  Building,
  Calendar,
  MapPin,
  Award
} from "lucide-react";

import LoadingScreen from "../components/portfolio/LoadingScreen";
import ProjectCard from "../components/portfolio/ProjectCard";
import { createFadeInAnimation, createScaleAnimation, createTextRevealAnimation, createSlideInAnimation, createMagneticEffect, createFloatingAnimation, createTimelineAnimation } from "../utils/animations";
import lenis from "../utils/lenis";

const projects = [
  {
    id: 1,
    title: "NyayMitra",
    subtitle: "AI-Driven Legal Service Provider Platform",
    description: "Developed a comprehensive legal service platform featuring an AI-Powered Chatbot for instant legal guidance, Geo-Enabled Lawyer Search, Smart Contract Drafting, Interactive Legal Flowcharts, Legal Research and Advisory System, automated Legal Document Analysis with Question-Answering, and real-time Case Status Tracking.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/e68260242_Nyaymitra.jpg",
    tech: ["ChromaDB", "Reactflow", "OpenMap", "LangChain", "Next.js", "Python", "Gemini", "Llama"],
    link: "https://github.com/ddihora1604/NyayMitra",
    date: "April 2025"
  },
  {
    id: 2,
    title: "ReddIQ",
    subtitle: "Social Media Analysis Dashboard",
    description: "Developed an interactive dashboard to analyze Reddit data using NLP and machine learning techniques, featuring Sentiments and Trending Topics, Time-Series visualizations, Community Distribution, Coordinated Activity Identification, Semantic Mapping, and an AI-powered chatbot for intelligent querying.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6f7e2ef86_ReddIQ.png",
    tech: ["Flask", "D3.js", "UMAP", "SentenceTransformers", "LDA", "Python", "JavaScript", "Gemini", "Reddit API"],
    link: "https://github.com/ddihora1604/research-engineering-intern-assignment_1",
    date: "May 2025"
  },
  {
    id: 3,
    title: "Agenix",
    subtitle: "AI Agent Marketplace",
    description: "Developed a marketplace that integrates various AI agents, including independent agents like Professional Email Writer, Document Summarizer, YouTube Summarizer, Web Crawler, Image Generator, and Blog Writer along with a Job Agent, Case Study Agent and a Deep Research Agent, combined into custom workflows.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8f218f516_Agenix.jpg",
    tech: ["Crew AI", "FluxAI", "FAISS", "Langflow", "Next.js", "Python", "LangChain", "Gemini", "Llama"],
    link: "https://github.com/ddihora1604/Agenix",
    date: "March 2025"
  },
  {
    id: 4,
    title: "GreenGuard",
    subtitle: "AI-Powered Crop Disease Detection",
    description: "Designed a custom CNN architecture, AGDFNet (Attention-Guided Multi-Scale Disease Feature Network), which integrates Adaptive Lesion Modules, Adaptive Focal Loss, and Feature Aggregation techniques to optimize feature extraction, enhancing disease detection and providing real-time treatment recommendations via a chatbot.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/f76015762_GreenGuard.jpg",
    tech: ["AGDFNet", "MobileNetV2", "InceptionV3", "TensorFlow", "React.js", "Flask", "LangChain", "Mixtral"],
    link: "https://github.com/ddihora1604/GreenGuard",
    date: "April 2024 - May 2025"
  }
];

const experiences = [
  {
    id: 1,
    title: "Research Intern",
    company: "Indian Institute of Technology Kharagpur",
    duration: "March 2025 - Present",
    location: "Kharagpur, India",
    description: [
      "Researching and analyzing key ESG (Environmental, Social, Governance indicators) metrics and their impact on stock performance and market behavior. Training ML models (like Chronos and KNN) on financial datasets to extract insights from ESG disclosures.",
      "Performed a comprehensive analysis of tokenization techniques used in large language models, comparing methods like BPE, WordPiece, and SentencePiece. Analyzed challenges in tokenizing temporal and numeric data and explored solutions like Digit-Aware Tokenizers, Prompt Tuning, and Model Grafting."
    ]
  },
  {
    id: 2,
    title: "AI/ML Intern",
    company: "Indian Institute of Technology Patna",
    duration: "March 2025 - July 2025",
    location: "Patna, India",
    description: [
      "Implemented a suite of advanced ML and deep learning models, including Ridge classifier, RIDOR-like Rule Output classifier, RNN classifier, Rotation Forest, and RUSBoost on curated datasets for robust classification tasks."
    ]
  }
];

const extraCurriculars = [
  {
    id: 1,
    title: "Founding Member and Lead Researcher",
    organization: "RFG LABS",
    type: "Freelance",
    duration: "Jun 2024 - May 2025",
    location: "Mumbai, Maharashtra, India",
    workType: "Hybrid",
    skills: ["Research and Development (R&D)", "Technological Innovation", "Statistical Data Analysis", "Market Research"],
    logo: require("../assets/images/RFG.png")
  },
  {
    id: 2,
    title: "Management Head",
    organization: "DJS-NSDC",
    type: "Full-time",
    duration: "May 2024 - May 2025",
    location: "Mumbai, Maharashtra, India",
    workType: "Hybrid",
    skills: ["Event Management", "Executing Events", "Managing Finance", "Team Coordination", "Resource Management"],
    logo: require("../assets/images/NSDC.png")
  },
  {
    id: 3,
    title: "Student Representative",
    organization: "DJSCE Lok Sabha",
    type: "Part-time",
    duration: "May 2024 - May 2024",
    location: "Mumbai, Maharashtra, India",
    workType: "Remote",
    skills: ["Political Campaigns", "Community Outreach", "Social Promotion", "Relationship Building", "Public Administration"],
    logo: require("../assets/images/Lok Sabha.png")
  },
  {
    id: 4,
    title: "Event Manager",
    organization: "TEDx DJSCE",
    type: "Full-time",
    duration: "Feb 2024 - May 2024",
    location: "Mumbai, Maharashtra, India",
    workType: "On-site",
    skills: ["Event Management", "Event Planning", "Live Events", "Executive Management", "Team Management"],
    logo: require("../assets/images/Tedx.png")
  },
  {
    id: 5,
    title: "Public Relations and Media Specialist",
    organization: "DJSCE Trinity",
    type: "Full-time",
    duration: "Jan 2024 - May 2024",
    location: "Mumbai, Maharashtra, India",
    workType: "On-site",
    skills: ["Public Relations", "Strategic Public Relations Planning", "Social Media Communications", "Media managing", "Event Photography"],
    logo: require("../assets/images/Trinity.png")
  },
  {
    id: 6,
    title: "Publicity Assistant",
    organization: "DJS CodeStars",
    type: "Full-time",
    duration: "Nov 2023 - May 2024",
    location: "Mumbai, Maharashtra, India",
    workType: "Hybrid",
    skills: ["Public Relations", "Strategic Public Relations Planning", "Interpersonal Communication", "Public Administration"],
    logo: require("../assets/images/Codestars.png")
  },
  {
    id: 7,
    title: "Event Manager",
    organization: "Google Developer Student Club DJSCE",
    type: "Full-time",
    duration: "Sep 2023 - May 2024",
    location: "Mumbai, Maharashtra, India",
    workType: "On-site",
    skills: ["Event Management", "Executing Events", "Strategic Communications", "Performance Management", "Resource Management"],
    logo: require("../assets/images/GDSC.png")
  },
  {
    id: 8,
    title: "Marketing And Public Relations Specialist",
    organization: "DJS Nova",
    type: "Full-time",
    duration: "Sep 2023 - May 2024",
    location: "Mumbai, Maharashtra, India",
    workType: "Hybrid",
    skills: ["Marketing Strategy", "Marketing Management", "Sponsorship Relations", "Public Relations", "Strategic Public Relations Planning"],
    logo: require("../assets/images/NOVA.png")
  }
];

const skillCategories = [
  {
    name: "Programming Languages",
    skills: ["Python", "JavaScript", "C++", "SQL", "HTML", "CSS"]
  },
  {
    name: "Frameworks & Tools",
    skills: ["React.js", "Next.js", "Flask", "LangChain", "Git", "GitHub", "Streamlit", "Firebase"]
  },
  {
    name: "Libraries & Technologies",
    skills: ["TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-Learn", "Transformers", "NLTK"]
  },
  {
    name: "Specializations",
    skills: ["AI/ML", "Deep Learning", "NLP", "Computer Vision", "Generative AI", "Data Analysis"]
  }
];

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 13500); // Total: 10s Spline + 3s Progress + 0.5s transition = 13.5s

    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'extracurriculars', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Initialize animations after loading is complete
  useEffect(() => {
    if (!isLoading) {
      // Add delay to ensure DOM is ready
      setTimeout(() => {
        // Enhanced fade-in animations for sections
        createFadeInAnimation('.animate-section', { duration: 1.8, y: 100, stagger: 0.2 });
        
        // Advanced scale animations for cards with bounce effect
        createScaleAnimation('.animate-card', { scale: 0.6, duration: 1.5 });
        
        // Enhanced text reveal animations
        createTextRevealAnimation('.animate-text');
        
        // Slide-in animations for navigation
        createSlideInAnimation('.animate-nav', 'top', { duration: 1.2 });

        // Slide-in animations for different elements
        createSlideInAnimation('.animate-slide-left', 'left', { duration: 1.4 });
        createSlideInAnimation('.animate-slide-right', 'right', { duration: 1.4 });
        createSlideInAnimation('.animate-slide-up', 'bottom', { duration: 1.6 });

        // Magnetic effects for interactive elements
        createMagneticEffect('.animate-magnetic');

        // Floating animation for special elements
        createFloatingAnimation('.animate-float');

        // Timeline animation for experience section
        createTimelineAnimation('#experience');
        
      }, 150);
    }
  }, [isLoading]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      lenis.scrollTo(element, { duration: 2.0, easing: (t) => 1 - Math.pow(1 - t, 4) });
    }
  };

  return (
    <div className="relative text-white font-georgia">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.95,
              filter: "blur(10px)"
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              filter: "blur(0px)"
            }}
            transition={{ 
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.2
            }}
          >
            {/* Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="fixed top-0 left-0 right-0 z-50 p-6 animate-nav"
            >
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
              {/* <motion.div
                className="text-2xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-float"
                whileHover={{ scale: 1.05 }}
              >
                DARSHAN
              </motion.div> */}
              
              <div className="hidden md:flex items-center space-x-8">
                {['Home', 'About', 'Experience', 'Projects', 'Extra-Curriculars', 'Contact'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace('-', ''))}
                    className={`capitalize transition-all duration-300 text-base font-medium ${
                      activeSection === item.toLowerCase().replace('-', '') 
                        ? 'text-white' 
                        : 'text-white/60 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.nav>

          {/* Hero Section */}
          <section id="home" className="min-h-screen flex items-center justify-center relative text-center">
            <div className="container mx-auto px-6 flex flex-col items-center">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Darshan
                  <br className="md:hidden" /> Dihora</span>
                </h1>
                
                <h2 className="text-3xl md:text-4xl text-white/80">
                  AI Enthusiast
                </h2>
                
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                  Dedicated to learning and exploring in the world of business and technology!
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2 hover:scale-105 transition-transform duration-200"
                  >
                    View My Work <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-3 border border-white/40 rounded-lg text-white font-semibold backdrop-blur-sm hover:border-white hover:scale-105 transition-all duration-200"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </div>
            
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            >
              <ArrowDown className="w-6 h-6 text-white/50" />
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="min-h-screen flex items-center justify-center py-20 bg-black/40 backdrop-blur-sm animate-section">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-16 items-center animate-text"
              >
                <motion.div
                  className="relative animate-slide-left animate-float"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative w-80 h-80 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full animate-spin-slow opacity-75 blur-sm" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm">
                      <img
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/c1aa58748_Profile.png"
                        alt="Darshan Dihora"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
                
                <div className="space-y-8 animate-slide-right">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="animate-magnetic"
                  >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                      About <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Me</span>
                    </h2>
                    <p className="text-lg text-white/70 leading-relaxed mb-4">
                      I'm a passionate B.Tech student specializing in Artificial Intelligence (AI) and Data Science, with a minor in IoT and Industry 4.0.
                    </p>
                    <p className="text-lg text-white/70 leading-relaxed mb-8">
                      I specialize in creating cutting-edge AI solutions, while actively building skills in AI, ML, data science, finance, UI/UX design, and web development.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-32 bg-gradient-to-b from-black/40 via-gray-900/50 to-black/40 backdrop-blur-sm animate-section relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
              {/* Enhanced Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center mb-20 animate-text"
              >
                <motion.div
                  className="inline-block mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-300 text-sm font-medium border border-blue-500/30">
                    Professional Journey
                  </span>
                </motion.div>
                
                <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  My <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Experience</span>
                </h2>
                
                <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                  Research and development journey at premier Indian institutes, 
                  driving innovation in AI, machine learning, and data science
                </p>
                
                {/* Animated underline */}
                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mt-8"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>
              
              {/* Timeline Container */}
              <div className="relative max-w-6xl mx-auto">
                {/* Parallel Experiences Layout */}
                <div className="text-center mb-12">
                  <motion.div
                    className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-blue-300 text-sm font-medium">Concurrent Research Positions • 2025</span>
                  </motion.div>
                </div>

                {/* Parallel Cards Container */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  {experiences.map((experience, index) => (
                    <motion.div
                      key={experience.id}
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.2,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      className="relative"
                    >
                      {/* Connection line between cards */}
                      {index === 0 && (
                        <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 z-10" />
                      )}
                      
                      {/* Experience Card */}
                      <motion.div
                        whileHover={{ 
                          scale: 1.02, 
                          y: -5,
                          boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)"
                        }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 group overflow-hidden h-full"
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
                                className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300"
                                whileHover={{ x: 5 }}
                              >
                                {experience.title}
                              </motion.h3>
                              
                              <motion.div 
                                className="flex items-center gap-2 mb-3"
                                whileHover={{ x: 5 }}
                              >
                                <Building className="w-4 h-4 text-blue-400" />
                                <h4 className="text-blue-400 font-semibold text-sm">{experience.company}</h4>
                              </motion.div>
                              
                              <div className="flex flex-col gap-2 text-white/70">
                                <motion.div 
                                  className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full"
                                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                                >
                                  <Calendar className="w-3 h-3 text-blue-400" />
                                  <span className="text-xs font-medium">{experience.duration}</span>
                                </motion.div>
                                
                                <motion.div 
                                  className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full"
                                  whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.1)" }}
                                >
                                  <MapPin className="w-3 h-3 text-purple-400" />
                                  <span className="text-xs font-medium">{experience.location}</span>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Description */}
                          <div className="space-y-3">
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
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-white/5 to-transparent hover:from-blue-500/10 hover:to-purple-500/5 transition-all duration-300">
                                  <motion.div 
                                    className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-blue-400/50"
                                    whileHover={{ scale: 1.5 }}
                                  />
                                  <p className="text-white/80 leading-relaxed text-sm group-hover/item:text-white transition-colors duration-300">
                                    {desc}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Institute badge */}
                          <motion.div
                            className="mt-4 flex items-center gap-2 text-yellow-400/80"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Award className="w-4 h-4" />
                            <span className="text-xs font-medium">
                              {index === 0 ? 'IIT Kharagpur' : 'IIT Patna'}
                            </span>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Bottom CTA */}
              <motion.div
                className="text-center mt-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.div
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-white/10 backdrop-blur-sm animate-magnetic"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.15)" }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/80 font-medium">Currently researching at IIT Kharagpur</span>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="min-h-screen py-20 bg-black/40 backdrop-blur-sm animate-section">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-16 animate-text"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Featured <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Projects</span>
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Innovative AI solutions across legal tech, social media analysis, and agriculture
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {projects.map((project, index) => (
                  <div key={project.id} className="animate-card animate-magnetic">
                    <ProjectCard
                      project={project}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Skills & Technologies Section */}
          <section id="skills" className="py-20 bg-black/40 backdrop-blur-sm">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Skills & <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Technologies</span>
                </h2>
              </motion.div>
              
              <div className="max-w-6xl mx-auto space-y-12">
                {skillCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl font-semibold mb-6 text-blue-400">{category.name}</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" }}
                          className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300"
                        >
                          <span className="text-white/90 font-medium">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Extra-Curriculars Section */}
          <section id="extracurriculars" className="py-20 bg-black/40 backdrop-blur-sm">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Leadership & Impact</span>
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Building communities, leading initiatives, and creating meaningful change through diverse leadership roles
                </p>
              </motion.div>

              {/* Timeline Container */}
              <div className="relative max-w-6xl mx-auto">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 h-full rounded-full opacity-30 hidden lg:block" />
                
                {/* Timeline Items */}
                <div className="space-y-12">
                  {extraCurriculars.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      className={`relative flex items-center justify-center lg:justify-${index % 2 === 0 ? 'start' : 'end'}`}
                    >
                      {/* Timeline Node */}
                      <motion.div 
                        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900 z-10 hidden lg:block"
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Card */}
                      <motion.div
                        whileHover={{ 
                          scale: 1.02, 
                          y: -8,
                          boxShadow: "0 25px 50px rgba(59, 130, 246, 0.15)"
                        }}
                        transition={{ duration: 0.3 }}
                        className={`relative w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'} group`}
                      >
                        <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden">
                          {/* Background Effects */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                          
                          <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex items-start space-x-5 flex-1 min-w-0">
                                <motion.div 
                                  className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 flex-shrink-0 p-3 shadow-lg"
                                  whileHover={{ scale: 1.1, rotate: 3, boxShadow: "0 12px 30px rgba(59, 130, 246, 0.25)" }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <img 
                                    src={activity.logo} 
                                    alt={`${activity.organization} logo`}
                                    className="w-full h-full object-contain filter brightness-125 contrast-125 drop-shadow-sm"
                                  />
                                  {/* Subtle glow effect */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.div>
                                <div className="flex-1 min-w-0 pt-1">
                                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight mb-3">
                                    {activity.title}
                                  </h3>
                                  <p className="text-blue-400 font-semibold text-base mb-3">{activity.organization}</p>
                                  
                                  {/* Job Type Badge */}
                                  <motion.div 
                                    className="inline-block"
                                    initial={{ opacity: 0.8 }}
                                    whileHover={{ opacity: 1, scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
                                      activity.type === 'Full-time' ? 'bg-green-500/20 text-green-400 border-green-400/30' :
                                      activity.type === 'Part-time' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30' :
                                      'bg-purple-500/20 text-purple-400 border-purple-400/30'
                                    }`}>
                                      {activity.type}
                                    </span>
                                  </motion.div>
                                </div>
                              </div>
                            </div>

                            {/* Duration and Location */}
                            <div className="space-y-3 mb-6 text-sm">
                              <motion.div 
                                className="flex items-center space-x-3 bg-gradient-to-r from-blue-500/10 to-blue-400/5 border border-blue-400/20 px-4 py-2.5 rounded-xl"
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.15)" }}
                                transition={{ duration: 0.2 }}
                              >
                                <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                <span className="font-medium text-white/90">{activity.duration}</span>
                              </motion.div>
                              <motion.div 
                                className="flex items-center space-x-3 bg-gradient-to-r from-purple-500/10 to-purple-400/5 border border-purple-400/20 px-4 py-2.5 rounded-xl"
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(168, 85, 247, 0.15)" }}
                                transition={{ duration: 0.2 }}
                              >
                                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                <span className="font-medium text-white/90">{activity.location}</span>
                              </motion.div>
                              <motion.div 
                                className="flex items-center space-x-3 bg-gradient-to-r from-cyan-500/10 to-cyan-400/5 border border-cyan-400/20 px-4 py-2.5 rounded-xl"
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(6, 182, 212, 0.15)" }}
                                transition={{ duration: 0.2 }}
                              >
                                <Briefcase className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                <span className="font-medium text-white/90">{activity.workType}</span>
                              </motion.div>
                            </div>

                            {/* Skills */}
                            <div className="mb-6">
                              <h4 className="text-base font-semibold text-white/90 mb-4 flex items-center">
                                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></span>
                                Key Skills
                              </h4>
                              <div className="flex flex-wrap gap-2.5">
                                {activity.skills.map((skill, skillIndex) => (
                                  <motion.span
                                    key={skillIndex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                                    whileHover={{ 
                                      scale: 1.05, 
                                      y: -2,
                                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
                                    }}
                                    className="px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl text-sm text-white/85 border border-white/20 hover:border-blue-400/60 hover:bg-gradient-to-r hover:from-blue-400/10 hover:to-purple-400/5 transition-all duration-300 font-medium"
                                  >
                                    {skill}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Hover Border Glow */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Summary Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                  {/* Stats removed for cleaner design */}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="min-h-screen flex items-center justify-center py-20 bg-black/40 backdrop-blur-sm animate-section">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-4xl mx-auto animate-text"
              >
                <div className="text-center mb-16">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Get In <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Touch</span>
                  </h2>
                  <p className="text-lg text-white/70">
                    Ready to create something amazing together? Let's connect!
                  </p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="glass-card p-12 rounded-2xl"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Details */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold mb-8 text-cyan-400">Contact Details</h3>
                      
                      <motion.a
                        href="mailto:ddihora1604@gmail.com"
                        className="flex items-center space-x-4 text-white/70 hover:text-cyan-400 transition-all duration-300 group"
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="p-3 rounded-xl bg-white/5 group-hover:bg-cyan-400/20 transition-all duration-300"
                          whileHover={{ rotate: 15 }}
                        >
                          <Mail className="w-6 h-6" />
                        </motion.div>
                        <span className="text-lg">ddihora1604@gmail.com</span>
                      </motion.a>
                      
                      <motion.div
                        className="flex items-center space-x-4 text-white/70"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        <motion.div
                          className="p-3 rounded-xl bg-white/5"
                          whileHover={{ rotate: 15, backgroundColor: "rgba(34, 197, 94, 0.2)" }}
                          transition={{ duration: 0.3 }}
                        >
                          <MapPin className="w-6 h-6 text-green-400" />
                        </motion.div>
                        <span className="text-lg">Mumbai, India</span>
                      </motion.div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold mb-8 text-purple-400">Follow Me</h3>
                      
                      <motion.a
                        href="https://www.linkedin.com/in/darshan-dihora-38bb652a1/"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 text-white/70 hover:text-blue-400 transition-all duration-300 group"
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="p-3 rounded-xl bg-white/5 group-hover:bg-blue-400/20 transition-all duration-300"
                          whileHover={{ rotate: 15 }}
                        >
                          <Linkedin className="w-6 h-6" />
                        </motion.div>
                        <span className="text-lg">LinkedIn</span>
                      </motion.a>
                      
                      <motion.a
                        href="https://github.com/ddihora1604"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 text-white/70 hover:text-gray-300 transition-all duration-300 group"
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="p-3 rounded-xl bg-white/5 group-hover:bg-gray-300/20 transition-all duration-300"
                          whileHover={{ rotate: 15 }}
                        >
                          <Github className="w-6 h-6" />
                        </motion.div>
                        <span className="text-lg">GitHub</span>
                      </motion.a>
                      
                      <motion.a
                        href="https://www.instagram.com/darshan.dihora/"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 text-white/70 hover:text-pink-400 transition-all duration-300 group"
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="p-3 rounded-xl bg-white/5 group-hover:bg-pink-400/20 transition-all duration-300"
                          whileHover={{ rotate: 15 }}
                        >
                          <Instagram className="w-6 h-6" />
                        </motion.div>
                        <span className="text-lg">Instagram</span>
                      </motion.a>
                      
                      <motion.a
                        href="https://x.com/ddihora1604"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 text-white/70 hover:text-blue-300 transition-all duration-300 group"
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="p-3 rounded-xl bg-white/5 group-hover:bg-blue-300/20 transition-all duration-300"
                          whileHover={{ rotate: 15 }}
                        >
                          <Twitter className="w-6 h-6" />
                        </motion.div>
                        <span className="text-lg">Twitter (X)</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 border-t border-white/10 backdrop-blur-sm bg-black/40">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center"
              >
                <p className="text-white/50">
                  © 2025 Darshan Dihora.
                </p>
              </motion.div>
            </div>
          </footer>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
        }
        .glow-button {
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
        }
        .glass-card {
          background: rgba(17, 24, 39, 0.3);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
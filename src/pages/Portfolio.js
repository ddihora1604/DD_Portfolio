import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowDown, 
  ArrowRight,
  Mail, 
  Github, 
  Linkedin
} from "lucide-react";

import LoadingScreen from "../components/portfolio/LoadingScreen";
import ProjectCard from "../components/portfolio/ProjectCard";
import ContactForm from "../components/portfolio/ContactForm";
import ExperienceCard from "../components/portfolio/ExperienceCard";
import ExtraCurricularCard from "../components/portfolio/ExtraCurricularCard";

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
    title: "Management Head",
    organization: "DJS NSDC",
    duration: "May 2024 – May 2025",
    description: [
      "Organized Nexus Kaggle Competition and Technograd 2.0 to promote advancements in AI and DS.",
      "Organized Synergy 2.0, a Buildathon based on domains like AI in Fintech, Social Cause, Social Media, Cybersecurity, and Healthcare."
    ]
  },
  {
    id: 2,
    title: "Event Manager",
    organization: "GDSC DJSCE and TEDxDJSCE",
    duration: "September 2023 – May 2024",
    description: [
      "Managed and coordinated technical events and workshops for the Google Developer Student Club.",
      "Organized TEDx events to promote innovation and knowledge sharing among students."
    ]
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
    }, 3000);

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative text-white font-georgia">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 p-6"
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
              <motion.div
                className="text-2xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                DARSHAN
              </motion.div>
              
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
              <motion.div
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="space-y-6"
              >
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Darshan
                  <br className="md:hidden" /> Dihora</span>
                </h1>
                
                <h2 className="text-3xl md:text-4xl text-white/80">
                  — AI Enthusiast
                </h2>
                
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                  Crafting digital experiences that inspire and engage through
                  innovative design and cutting-edge technology.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <motion.button
                    onClick={() => scrollToSection('projects')}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold flex items-center gap-2"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(99, 102, 241, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View My Work <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-3 border border-white/40 rounded-lg text-white font-semibold backdrop-blur-sm hover:border-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get In Touch
                  </motion.button>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            >
              <ArrowDown className="w-6 h-6 text-white/50" />
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="min-h-screen flex items-center justify-center py-20 bg-black/40 backdrop-blur-sm">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-16 items-center"
              >
                <motion.div
                  className="relative"
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
                
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                      About <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Me</span>
                    </h2>
                    <p className="text-lg text-white/70 leading-relaxed mb-4">
                      I'm a passionate B.Tech student in Artificial Intelligence and Data Science at SVKM's Dwarkadas J. Sanghvi College of Engineering, Mumbai, with a CGPA of 9.37.
                    </p>
                    <p className="text-lg text-white/70 leading-relaxed mb-8">
                      I specialize in creating cutting-edge AI solutions, from legal tech platforms to crop disease detection systems. My expertise spans across machine learning, deep learning, natural language processing, and full-stack development.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    <h3 className="text-2xl font-semibold mb-6 text-blue-400">Education</h3>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-semibold text-white">B.Tech in Artificial Intelligence and Data Science</h4>
                      <p className="text-white/70">SVKM's Dwarkadas J. Sanghvi College of Engineering</p>
                      <p className="text-white/60 text-sm">CGPA: 9.37 | November 2022 - June 2026</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="min-h-screen py-20 bg-black/40 backdrop-blur-sm">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Experience</span>
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Research and development experience at premier Indian institutes
                </p>
              </motion.div>
              
              <div className="max-w-4xl mx-auto space-y-8">
                {experiences.map((experience, index) => (
                  <ExperienceCard
                    key={experience.id}
                    experience={experience}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="min-h-screen py-20 bg-black/40 backdrop-blur-sm">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-16"
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
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
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
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Extra-Curriculars</span>
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Leadership roles and community contributions
                </p>
              </motion.div>
              
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                {extraCurriculars.map((activity, index) => (
                  <ExtraCurricularCard
                    key={activity.id}
                    activity={activity}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="min-h-screen flex items-center justify-center py-20 bg-black/40 backdrop-blur-sm">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Get In <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Touch</span>
                  </h2>
                  <p className="text-lg text-white/70">
                    Ready to create something amazing together? Let's talk about your next project.
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12">
                  <ContactForm />
                  
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="glass-card p-8 rounded-2xl">
                      <h3 className="text-2xl font-semibold mb-6 text-blue-400">Connect With Me</h3>
                      <div className="space-y-4">
                        <motion.a
                          href="mailto:ddihora1604@gmail.com"
                          className="flex items-center space-x-4 text-white/70 hover:text-blue-400 transition-all duration-300"
                          whileHover={{ scale: 1.05, x: 10 }}
                        >
                          <Mail className="w-6 h-6" />
                          <span>ddihora1604@gmail.com</span>
                        </motion.a>
                        
                        <motion.a
                          href="https://github.com/ddihora1604"
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center space-x-4 text-white/70 hover:text-blue-400 transition-all duration-300"
                          whileHover={{ scale: 1.05, x: 10 }}
                        >
                          <Github className="w-6 h-6" />
                          <span>GitHub</span>
                        </motion.a>
                        
                        <motion.a
                          href="https://www.linkedin.com/in/darshan-dihora-38bb652a1/"
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center space-x-4 text-white/70 hover:text-blue-400 transition-all duration-300"
                          whileHover={{ scale: 1.05, x: 10 }}
                        >
                          <Linkedin className="w-6 h-6" />
                          <span>LinkedIn</span>
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </div>
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
                  © 2024 Darshan Dihora. Crafted with passion and cutting-edge technology.
                </p>
              </motion.div>
            </div>
          </footer>
        </>
      )}
      
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
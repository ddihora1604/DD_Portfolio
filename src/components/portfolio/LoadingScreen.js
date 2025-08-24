
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [showSpline, setShowSpline] = useState(true);
  const [showProgress, setShowProgress] = useState(false);
  const [showCloudMessage, setShowCloudMessage] = useState(false);

  useEffect(() => {
    // Stage 1: Let Spline animation play for 10 seconds (one full cycle)
    const splineTimer = setTimeout(() => {
      setShowSpline(false);
      // Small delay before showing progress
      setTimeout(() => {
        setShowProgress(true);
      }, 500);
    }, 10000); // Changed from 4000 to 10000 (10 seconds)

    // Cloud message timing - appears when robot waves (around 6 seconds in)
    const cloudAppearTimer = setTimeout(() => {
      setShowCloudMessage(true);
    }, 6000); // Changed to 6000 (show cloud after 6 seconds)

    // Cloud message disappears just before robot stops waving (at 9 seconds)
    const cloudDisappearTimer = setTimeout(() => {
      setShowCloudMessage(false);
    }, 9000); // Changed to 9000 (hide cloud at 9 seconds)

    return () => {
      clearTimeout(splineTimer);
      clearTimeout(cloudAppearTimer);
      clearTimeout(cloudDisappearTimer);
    };
  }, []);

  useEffect(() => {
    if (showProgress) {
      // Stage 2: Progress bar animation for 3 seconds - ensuring all numbers 1-100 are shown
      const duration = 3000; // 3 seconds for progress
      const totalSteps = 100; // We want to show all numbers from 1 to 100
      const interval = duration / totalSteps; // Calculate exact interval for each step
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setProgress(currentStep);
        
        if (currentStep >= 100) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [showProgress]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#0a0a1f] flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 0.95,
        filter: "blur(10px)"
      }}
      transition={{ 
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {/* Stage 1: Spline Animation */}
      <AnimatePresence>
        {showSpline && (
          <motion.div 
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.1,
              filter: "blur(5px)"
            }}
            transition={{ 
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <iframe
              src="https://my.spline.design/genkubgreetingrobot-glNAap16qn4Llfe2KaklnhRH/"
              frameBorder="0"
              width="100%"
              height="100%"
              title="Robot Greeting Animation"
              className="w-full h-full"
              style={{
                background: 'transparent'
              }}
            />

            {/* Cloud Message Overlay */}
            <AnimatePresence>
              {showCloudMessage && (
                <motion.div
                  className="absolute top-1 left-1/2 transform -translate-x-1/4 z-20"
                  initial={{ 
                    opacity: 0, 
                    scale: 0.3,
                    y: 20,
                    rotate: -5
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: 0,
                    rotate: 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8,
                    y: -20,
                    rotate: 5
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.68, -0.55, 0.265, 1.55],
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                >
                  {/* Cloud Container */}
                  <div className="relative">
                    {/* Cloud Shape - Clean white cloud */}
                    <motion.div 
                      className="relative"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Main cloud structure */}
                      <div className="relative w-36 h-24">
                        {/* Clean cloud with single border like the uploaded image */}
                        <svg width="144" height="96" viewBox="0 0 144 96" className="absolute inset-0">
                          {/* Single path for clean cloud outline */}
                          <path 
                            d="M 20 70 
                               C 20 55, 35 45, 50 50
                               C 55 35, 75 35, 85 45
                               C 95 35, 115 40, 120 55
                               C 130 55, 135 65, 125 75
                               C 125 80, 115 85, 105 82
                               C 95 90, 75 90, 65 85
                               C 55 90, 35 85, 30 75
                               C 15 75, 15 65, 20 70 Z"
                            fill="white" 
                            stroke="black" 
                            strokeWidth="3"
                            strokeLinejoin="round"
                          />
                          
                          {/* Small thought bubbles */}
                          <circle cx="50" cy="78" r="6" fill="white" stroke="black" strokeWidth="2"/>
                          <circle cx="42" cy="82" r="4" fill="white" stroke="black" strokeWidth="2"/>
                        </svg>
                      </div>

                      {/* "HEY" Text - Properly centered in the cloud */}
                      <motion.div
                        className="absolute flex items-center justify-center"
                        style={{ 
                          top: '26px',
                          left: '5px',
                          width: '144px',
                          height: '70px'
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          delay: 0.4,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                      >
                        <span className="text-xl font-bold text-black tracking-wide font-sans select-none">
                          HEY!
                        </span>
                      </motion.div>

                      {/* Subtle drop shadow */}
                      <div className="absolute inset-0 w-36 h-24 bg-black/10 rounded-full blur-lg transform translate-y-2 -z-10"></div>
                    </motion.div>

                    {/* Floating animation for the entire cloud */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        y: [0, -6, 0],
                        rotate: [0, 1, 0, -1, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Progress Indicator */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            className="relative z-10 w-full h-full flex items-center justify-center"
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              filter: "blur(10px)"
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              filter: "blur(0px)"
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9,
              filter: "blur(5px)"
            }}
            transition={{ 
              duration: 1,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <div className="flex flex-col items-center justify-center space-y-12 font-dmsans">
              
              {/* Main Loading Text */}
              <motion.div
                className="text-center space-y-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.h1 
                  className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Darshan
                  </span>
                </motion.h1>
                <motion.span 
                  className="block text-white/90 text-2xl lg:text-3xl font-normal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  loading your portfolio
                </motion.span>
              </motion.div>

              {/* Progress Section */}
              <motion.div
                className="w-96 space-y-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                
                {/* Progress Bar Container */}
                <div className="relative">
                  <div className="w-full h-4 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border border-white/20">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full relative"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ 
                        duration: 0.1,
                        ease: "linear"
                      }}
                    >
                      {/* Animated shine effect on progress bar */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        animate={{
                          x: ["-100%", "100%"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Glow effect under progress bar */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/80 via-purple-500/80 to-pink-500/80 rounded-full blur-xl opacity-60" />
                </div>

                {/* Progress Percentage */}
                <motion.div 
                  className="text-center"
                  animate={{ 
                    scale: progress === 100 ? [1, 1.15, 1] : 1,
                    filter: progress === 100 ? ["blur(0px)", "blur(2px)", "blur(0px)"] : "blur(0px)"
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.p
                    className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                    animate={{ 
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {progress}%
                  </motion.p>
                </motion.div>

                {/* Loading Dots Animation */}
                <motion.div
                  className="flex justify-center space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.1 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
                      animate={{
                        scale: [1, 1.6, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const diagramToChat = {
    hidden: { width: "0%", opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex-1">
            <motion.div
              className="inline-block mb-6 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium"
              variants={itemVariants}
            >
              Premium Chrome Extension - $10 One-time
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={itemVariants}
            >
              Transform <span className="text-emerald-600">Flowcharts</span> into <span className="text-emerald-600">Chat Interfaces</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
              variants={itemVariants}
            >
              Automatically render beautiful, interactive Mermaid diagrams in ChatGPT conversations with our premium Chrome extension.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="#download"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-center font-medium"
              >
                Buy Now - $10
              </motion.a>
              
              <motion.a
                href="#examples"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg text-center font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                See Examples
              </motion.a>
            </motion.div>
            
            <motion.div
              className="mt-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
              variants={itemVariants}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Trusted by hundreds of ChatGPT power users</span>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex-1 relative"
            variants={itemVariants}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="mb-4 flex justify-between items-center">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-500">ChatGPT</div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm">Create a flowchart for user authentication process</p>
                </div>
                
                <div className="bg-emerald-50 dark:bg-gray-900 p-3 rounded-lg">
                  <p className="text-sm mb-2">Here's a flowchart for the user authentication process:</p>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 font-mono text-xs overflow-hidden">
                    <pre>{`flowchart TD
    A[Start] --> B{User Registered?}
    B -->|Yes| C[Enter Password]
    B -->|No| D[Create Account]
    C --> E{Password Correct?}
    E -->|Yes| F[Access Granted]
    E -->|No| G[Access Denied]
    D --> H[Enter Details]
    H --> I[Verification]
    I --> C`}</pre>
                  </div>
                  
                  <motion.div 
                    className="mt-4 bg-white dark:bg-gray-900 p-3 rounded border border-emerald-200 dark:border-emerald-800"
                    variants={diagramToChat}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xs font-medium text-emerald-600">Rendered Diagram</div>
                      <div className="flex gap-2">
                        <button className="text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V18M8 5C8 6.10457 8.89543 7 10 7H12C13.1046 7 14 6.10457 14 5M8 5C8 3.89543 8.89543 3 10 3H12C13.1046 3 14 3.89543 14 5M14 5H16C17.1046 5 18 5.89543 18 7V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button className="text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 16L8 12M8 12L4 8M8 12H16M16 16L20 12M20 12L16 8M20 12H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <svg width="280" height="200" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="160" y="10" width="80" height="30" rx="5" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
                        <text x="200" y="30" textAnchor="middle" fill="currentColor" fontSize="12">Start</text>
                        
                        <path d="M200 40L200 70" stroke="#10B981" strokeWidth="2" />
                        <polygon points="195,65 200,70 205,65" fill="#10B981" />
                        
                        <polygon points="160,80 240,80 200,110" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
                        <text x="200" y="95" textAnchor="middle" fill="currentColor" fontSize="10">User Registered?</text>
                        
                        <path d="M160 95L120 120" stroke="#10B981" strokeWidth="2" />
                        <text x="135" y="100" textAnchor="middle" fill="currentColor" fontSize="8">No</text>
                        <polygon points="115,115 120,120 125,115" fill="#10B981" />
                        
                        <path d="M240 95L280 120" stroke="#10B981" strokeWidth="2" />
                        <text x="265" y="100" textAnchor="middle" fill="currentColor" fontSize="8">Yes</text>
                        <polygon points="275,115 280,120 285,115" fill="#10B981" />
                        
                        <rect x="80" y="120" width="80" height="30" rx="5" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
                        <text x="120" y="140" textAnchor="middle" fill="currentColor" fontSize="10">Create Account</text>
                        
                        <rect x="240" y="120" width="80" height="30" rx="5" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
                        <text x="280" y="140" textAnchor="middle" fill="currentColor" fontSize="10">Enter Password</text>
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            <motion.div
              className="absolute -bottom-4 -right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <div className="text-sm font-medium">Premium Feature</div>
              <div className="text-xs opacity-80">One-time $10 payment</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const diagramExamples = [
  {
    id: "flowchart",
    title: "Flowchart",
    code: `flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]`,
    preview: (
      <svg width="100%" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="160" y="10" width="80" height="30" rx="5" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
        <text x="200" y="30" textAnchor="middle" fill="currentColor" fontSize="12">Start</text>
        
        <path d="M200 40L200 70" stroke="#10B981" strokeWidth="2" />
        <polygon points="195,65 200,70 205,65" fill="#10B981" />
        
        <polygon points="160,80 240,80 200,110" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
        <text x="200" y="95" textAnchor="middle" fill="currentColor" fontSize="10">Is it working?</text>
        
        <path d="M160 95L120 120" stroke="#10B981" strokeWidth="2" />
        <text x="135" y="100" textAnchor="middle" fill="currentColor" fontSize="8">No</text>
        <polygon points="115,115 120,120 125,115" fill="#10B981" />
        
        <path d="M240 95L280 120" stroke="#10B981" strokeWidth="2" />
        <text x="265" y="100" textAnchor="middle" fill="currentColor" fontSize="8">Yes</text>
        <polygon points="275,115 280,120 285,115" fill="#10B981" />
        
        <rect x="80" y="120" width="80" height="30" rx="5" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
        <text x="120" y="140" textAnchor="middle" fill="currentColor" fontSize="10">Debug</text>
        
        <rect x="240" y="120" width="80" height="30" rx="5" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
        <text x="280" y="140" textAnchor="middle" fill="currentColor" fontSize="10">Great!</text>
        
        <path d="M120 150L200 170" stroke="#10B981" strokeWidth="2" />
        <polygon points="195,165 200,170 195,175" fill="#10B981" />
        
        <path d="M280 150L280 170" stroke="#10B981" strokeWidth="2" />
        <polygon points="275,165 280,170 285,165" fill="#10B981" />
        
        <rect x="240" y="170" width="80" height="30" rx="5" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
        <text x="280" y="190" textAnchor="middle" fill="currentColor" fontSize="10">End</text>
      </svg>
    )
  },
  {
    id: "sequence",
    title: "Sequence Diagram",
    code: `sequenceDiagram
    participant User
    participant ChatGPT
    participant Extension
    
    User->>ChatGPT: Ask for diagram
    ChatGPT->>User: Provide Mermaid code
    Extension->>Extension: Detect Mermaid syntax
    Extension->>User: Render beautiful diagram`,
    preview: (
      <svg width="100%" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="10" width="60" height="20" rx="2" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
        <text x="80" y="24" textAnchor="middle" fill="currentColor" fontSize="10">User</text>
        
        <rect x="170" y="10" width="60" height="20" rx="2" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
        <text x="200" y="24" textAnchor="middle" fill="currentColor" fontSize="10">ChatGPT</text>
        
        <rect x="290" y="10" width="60" height="20" rx="2" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
        <text x="320" y="24" textAnchor="middle" fill="currentColor" fontSize="10">Extension</text>
        
        <line x1="80" y1="30" x2="80" y2="190" stroke="#10B981" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4" />
        <line x1="200" y1="30" x2="200" y2="190" stroke="#10B981" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4" />
        <line x1="320" y1="30" x2="320" y2="190" stroke="#10B981" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4" />
        
        <line x1="80" y1="60" x2="200" y2="60" stroke="#10B981" strokeWidth="2" />
        <polygon points="195,55 200,60 195,65" fill="#10B981" />
        <text x="140" y="55" textAnchor="middle" fill="currentColor" fontSize="8">Ask for diagram</text>
        
        <line x1="200" y1="90" x2="80" y2="90" stroke="#10B981" strokeWidth="2" />
        <polygon points="85,85 80,90 85,95" fill="#10B981" />
        <text x="140" y="85" textAnchor="middle" fill="currentColor" fontSize="8">Provide Mermaid code</text>
        
        <path d="M320 120 Q 340 120 340 135 Q 340 150 320 150" stroke="#10B981" strokeWidth="2" />
        <polygon points="315,145 320,150 325,145" fill="#10B981" />
        <text x="360" y="135" textAnchor="middle" fill="currentColor" fontSize="8">Detect Mermaid syntax</text>
        
        <line x1="320" y1="180" x2="80" y2="180" stroke="#10B981" strokeWidth="2" />
        <polygon points="85,175 80,180 85,185" fill="#10B981" />
        <text x="200" y="175" textAnchor="middle" fill="currentColor" fontSize="8">Render beautiful diagram</text>
      </svg>
    )
  },
  {
    id: "class",
    title: "Class Diagram",
    code: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    Animal <|-- Dog`,
    preview: (
      <svg width="100%" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="100" y="20" width="120" height="80" rx="2" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
        <line x1="100" y1="40" x2="220" y2="40" stroke="#10B981" strokeWidth="1" />
        <line x1="100" y1="70" x2="220" y2="70" stroke="#10B981" strokeWidth="1" />
        <text x="160" y="35" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">Animal</text>
        <text x="110" y="55" textAnchor="start" fill="currentColor" fontSize="10">+String name</text>
        <text x="110" y="65" textAnchor="start" fill="currentColor" fontSize="10">+int age</text>
        <text x="110" y="85" textAnchor="start" fill="currentColor" fontSize="10">+makeSound()</text>
        
        <rect x="220" y="120" width="120" height="60" rx="2" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
        <line x1="220" y1="140" x2="340" y2="140" stroke="#10B981" strokeWidth="1" />
        <line x1="220" y1="160" x2="340" y2="160" stroke="#10B981" strokeWidth="1" />
        <text x="280" y="135" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">Dog</text>
        <text x="230" y="155" textAnchor="start" fill="currentColor" fontSize="10">+String breed</text>
        <text x="230" y="175" textAnchor="start" fill="currentColor" fontSize="10">+bark()</text>
        
        <line x1="160" y1="100" x2="220" y2="120" stroke="#10B981" strokeWidth="2" />
        <polygon points="215,115 220,120 215,125" fill="#10B981" />
      </svg>
    )
  },
  {
    id: "gantt",
    title: "Gantt Chart",
    code: `gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2023-01-01, 30d
    Another task     :after a1, 20d
    section Another
    Task in sec      :2023-01-12, 12d
    another task     :24d`,
    preview: (
      <svg width="100%" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="200" y="20" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">A Gantt Diagram</text>
        
        <line x1="50" y1="40" x2="350" y2="40" stroke="currentColor" strokeWidth="1" />
        <text x="50" y="55" textAnchor="start" fill="currentColor" fontSize="10" fontWeight="bold">Section</text>
        
        <rect x="80" y="60" width="100" height="20" rx="2" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
        <text x="130" y="74" textAnchor="middle" fill="currentColor" fontSize="10">A task</text>
        
        <rect x="180" y="85" width="80" height="20" rx="2" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
        <text x="220" y="99" textAnchor="middle" fill="currentColor" fontSize="10">Another task</text>
        
        <line x1="50" y1="115" x2="350" y2="115" stroke="currentColor" strokeWidth="1" />
        <text x="50" y="130" textAnchor="start" fill="currentColor" fontSize="10" fontWeight="bold">Another</text>
        
        <rect x="120" y="135" width="60" height="20" rx="2" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
        <text x="150" y="149" textAnchor="middle" fill="currentColor" fontSize="10">Task in sec</text>
        
        <rect x="180" y="160" width="90" height="20" rx="2" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
        <text x="225" y="174" textAnchor="middle" fill="currentColor" fontSize="10">another task</text>
        
        <line x1="50" y1="190" x2="350" y2="190" stroke="currentColor" strokeWidth="1" />
        
        <text x="80" y="35" textAnchor="middle" fill="currentColor" fontSize="8">Jan 1</text>
        <text x="130" y="35" textAnchor="middle" fill="currentColor" fontSize="8">Jan 15</text>
        <text x="180" y="35" textAnchor="middle" fill="currentColor" fontSize="8">Jan 30</text>
        <text x="230" y="35" textAnchor="middle" fill="currentColor" fontSize="8">Feb 15</text>
        <text x="280" y="35" textAnchor="middle" fill="currentColor" fontSize="8">Mar 1</text>
        <text x="330" y="35" textAnchor="middle" fill="currentColor" fontSize="8">Mar 15</text>
      </svg>
    )
  }
];

const Examples = () => {
  const [activeTab, setActiveTab] = useState("flowchart");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const tabVariants = {
    inactive: { 
      color: "var(--color-gray-500)", 
      borderColor: "transparent" 
    },
    active: { 
      color: "var(--color-emerald-600)", 
      borderColor: "var(--color-emerald-600)",
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="examples" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Diagram Examples
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Flow2Chat supports a wide variety of diagram types to visualize complex concepts in ChatGPT.
          </motion.p>
        </motion.div>
        
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
            {diagramExamples.map((example) => (
              <motion.button
                key={example.id}
                onClick={() => setActiveTab(example.id)}
                className={`px-4 py-2 border-b-2 whitespace-nowrap ${
                  activeTab === example.id 
                    ? "border-emerald-600 text-emerald-600" 
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                variants={tabVariants}
                initial="inactive"
                animate={activeTab === example.id ? "active" : "inactive"}
              >
                {example.title}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {diagramExamples.map((example) => (
            activeTab === example.id && (
              <motion.div
                key={`content-${example.id}`}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <h3 className="text-xl font-semibold mb-4">{example.title}</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-xs overflow-auto mb-4">
                  <pre className="whitespace-pre">{example.code}</pre>
                </div>
              </motion.div>
            )
          ))}
          
          {diagramExamples.map((example) => (
            activeTab === example.id && (
              <motion.div
                key={`preview-${example.id}`}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Rendered Result</h3>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800 overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-xs font-medium text-emerald-600">Flow2Chat Rendering</div>
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
                  
                  {example.preview}
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Examples;

"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Minus, Plus } from 'lucide-react';

export default function FAQ() {
  const faqItems = [
    {
      question: "Can I change the colors of the diagrams?",
      answer: "Yes. You can also change the theme to a custom one with a Pro license."
    },
    {
      question: "Does it work in Firefox / Edge?",
      answer: "Yes. Edge works via Chrome store. Firefox build is on the roadmap."
    },
    {
      question: "Does it work in other LLM chat websites?",
      answer: "No. It works only in ChatGPT for now. Gemini support is on the roadmap."
    },
    {
      question: "Any tracking or analytics?",
      answer: "No. Flow2Chat has no tracking or analytics. It's fully local and private."
    },
    {
      question: "How do I upgrade to Pro?",
      answer: "Install the free Chrome extension, then purchase the Pro license via Gumroad to unlock advanced features."
    }
  ];
  
  return (
    <section id="faq" className="max-w-6xl mx-auto px-4 py-14" tabIndex={-1} role="region" aria-label="FAQ">
      <motion.h2 
        className="text-3xl md:text-4xl font-extrabold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        FAQ
      </motion.h2>
      <motion.div 
        className="space-y-4" 
        id="faq-accordion"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {faqItems.map((item, index) => (
          <FAQItem 
            key={index}
            question={item.question}
            answer={item.answer}
            delay={0.1 * index}
          />
        ))}
      </motion.div>
    </section>
  );
}

type FAQItemProps = {
  question: string;
  answer: string;
  delay?: number;
}

function FAQItem({ question, answer, delay = 0 }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="p-4 rounded-2xl bg-[var(--card)] border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.01 }}
    >
      <motion.button 
        className="w-full cursor-pointer flex justify-between items-center font-semibold"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          initial={{ rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <Minus className="text-[var(--muted)] font-bold" size={18} /> : <Plus className="text-[var(--muted)] font-bold" size={18} />}
        </motion.div>
      </motion.button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-[var(--muted)]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
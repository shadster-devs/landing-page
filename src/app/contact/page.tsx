"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, User } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-block mb-4 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
          Get in Touch
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Contact Us</h1>
        <p className="text-[var(--muted)] text-lg">
          Have questions or feedback? We&apos;d love to hear from you.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] h-full">
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            
            {isSubmitted ? (
              <motion.div 
                className="bg-accent/10 text-accent p-6 rounded-xl text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-white">
                    <MessageSquare size={28} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Message sent!</h3>
                <p>Thank you for contacting us. We&apos;ll get back to you as soon as possible.</p>
                <button 
                  className="mt-4 px-5 py-2 rounded-lg border border-accent text-accent"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="name">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--muted)]">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-transparent border border-[var(--border)] rounded-lg focus:outline-none focus:border-accent"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--muted)]">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-transparent border border-[var(--border)] rounded-lg focus:outline-none focus:border-accent"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="subject">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-transparent border border-[var(--border)] rounded-lg focus:outline-none focus:border-accent"
                    required
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="general" className="bg-[var(--card)]">General Inquiry</option>
                    <option value="support" className="bg-[var(--card)]">Technical Support</option>
                    <option value="billing" className="bg-[var(--card)]">Billing Question</option>
                    <option value="feature" className="bg-[var(--card)]">Feature Request</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-transparent border border-[var(--border)] rounded-lg focus:outline-none focus:border-accent"
                    rows={5}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full px-5 py-3 rounded-xl bg-accent hover:bg-accent-600 text-white font-semibold flex justify-center items-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message <Send size={18} className="ml-2" />
                    </span>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] h-full">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Email</h3>
                <a 
                  href="mailto:support@flow2chat.com" 
                  className="text-accent hover:underline flex items-center gap-2"
                >
                  <Mail size={18} />
                  support@flow2chat.com
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Response Time</h3>
                <p className="text-[var(--muted)]">
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Support Hours</h3>
                <p className="text-[var(--muted)]">
                  Monday - Friday: 9AM - 5PM PT<br />
                  Weekend: Limited support
                </p>
              </div>
              
              <div className="pt-4">
                <p className="text-[var(--muted)] text-sm border-t border-[var(--border)] pt-4">
                  For Pro users, we offer priority support with faster response times.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

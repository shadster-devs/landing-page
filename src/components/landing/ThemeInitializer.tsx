"use client";

import { useEffect } from 'react';

export default function ThemeInitializer() {
  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || (saved === null && window.matchMedia && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, []);
  
  return null; // This component doesn't render anything
}

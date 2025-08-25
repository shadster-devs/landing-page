"use client";

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export default function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
      securityLevel: 'strict',
      fontFamily: 'var(--font-inter, ui-sans-serif, system-ui, -apple-system, sans-serif)',
    });

    const renderChart = async () => {
      try {
        setError(null);
        // Use the mermaid API to render
        const { svg } = await mermaid.render(`mermaid-${Math.random().toString(36).substring(2, 11)}`, chart);
        setSvgContent(svg);
      } catch (err) {
        console.error('Error rendering mermaid diagram:', err);
        setError('Failed to render diagram');
      }
    };

    renderChart();

    // Re-render when theme changes
    const handleThemeChange = () => {
      mermaid.initialize({
        startOnLoad: false,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
      });
      renderChart();
    };

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', handleThemeChange);
    }

    return () => {
      if (themeToggle) {
        themeToggle.removeEventListener('click', handleThemeChange);
      }
    };
  }, [chart]);

  if (error) {
    return (
      <div className={`p-4 bg-red-500/10 text-red-500 rounded-lg ${className}`}>
        <p>Error rendering diagram: {error}</p>
        <pre className="mt-2 p-3 bg-[var(--card)] rounded overflow-auto text-xs">{chart}</pre>
      </div>
    );
  }

  return (
    <div 
      ref={ref} 
      className={`mermaid-diagram ${className}`} 
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

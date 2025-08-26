"use client";

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { AlertCircle } from 'lucide-react';

type MermaidTheme = 'default' | 'dark' | 'forest' | 'neutral' | 'base';

interface MermaidDiagramProps {
  chart: string;
  theme?: MermaidTheme;
  className?: string;
  customTheme?: string; // Custom theme as a string
}

export default function MermaidDiagram({ 
  chart, 
  theme = 'default', 
  className = '',
  customTheme
}: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use exactly the theme that was selected, don't auto-switch based on dark mode
    const mermaidTheme = theme;

    // Initialize mermaid with configuration
    const config: any = {
      startOnLoad: false,
      theme: mermaidTheme,
      securityLevel: 'loose',
      suppressErrorRendering: true,
      logLevel: 'fatal',
      fontFamily: 'var(--font-inter, ui-sans-serif, system-ui, -apple-system, sans-serif)',
      flowchart: { useMaxWidth: true },
      sequence: { useMaxWidth: true },
      gantt: { useMaxWidth: true },
    };

    // Add custom theme CSS if provided
    if (customTheme && customTheme.trim() !== '') {
      // Custom theme is handled separately - not through themeVariables
      // This would be used for a completely custom theme definition
    }

    mermaid.initialize(config);

    const renderChart = async () => {
      setIsLoading(true);
      try {
        setError(null);
        
        // Use a unique ID for each render to avoid conflicts
        const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;
        
        // Use the mermaid API to render
        const { svg } = await mermaid.render(id, chart);
        setSvgContent(svg);
      } catch (err: any) {
        console.error('Error rendering mermaid diagram:', err);
        setError(err?.message || 'Failed to render diagram');
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      renderChart();
    }, 10);

    // Re-render when theme changes
    const handleThemeChange = () => {
      renderChart();
    };

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', handleThemeChange);
    }

    return () => {
      clearTimeout(timer);
      if (themeToggle) {
        themeToggle.removeEventListener('click', handleThemeChange);
      }
    };
  }, [chart, theme, customTheme]);

  if (error) {
    return (
      <div className={`p-4 bg-red-500/10 text-red-500 rounded-lg ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle size={18} />
          <p className="font-medium">Error rendering diagram</p>
        </div>
        <pre className="mt-2 p-3 bg-[var(--card)] rounded overflow-auto text-xs whitespace-pre-wrap">{error}</pre>
        <p className="mt-3 text-xs opacity-80">Check your Mermaid syntax and try again.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
        <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full"></div>
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
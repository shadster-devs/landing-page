"use client";

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { AlertCircle } from 'lucide-react';

type MermaidTheme = 'default' | 'dark' | 'forest' | 'neutral' | 'base';

interface MermaidDiagramProps {
  chart: string;
  theme?: MermaidTheme;
  className?: string;
}

export default function MermaidDiagram({ 
  chart, 
  theme = 'default', 
  className = '',
}: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Debounce rendering to prevent flickering
    const renderChart = async () => {
      setIsLoading(true);
      try {
        setError(null);
        
        // Use exactly the theme that was selected, don't auto-switch based on dark mode
        const mermaidTheme = theme;

        // Initialize mermaid with configuration for crisp rendering
        const config: any = {
          startOnLoad: false,
          theme: mermaidTheme,
          securityLevel: 'loose',
          suppressErrorRendering: true,
          logLevel: 'fatal',
          fontFamily: 'var(--font-inter, ui-sans-serif, system-ui, -apple-system, sans-serif)',
          flowchart: { 
            useMaxWidth: false,  // Don't constrain width for better quality
            htmlLabels: true     // Use HTML labels for better rendering
          },
          sequence: { 
            useMaxWidth: false,
            htmlLabels: true 
          },
          gantt: { 
            useMaxWidth: false 
          },
        };


        mermaid.initialize(config);
        
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

    // Debounced rendering to reduce flickering
    const timer = setTimeout(() => {
      renderChart();
    }, 150); // Single delay, no multiple renders

    return () => clearTimeout(timer);
  }, [chart, theme]); // Removed customTheme to reduce re-renders

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
      <div className={`flex items-center justify-center min-h-[200px] ${className} opacity-50`}>
        <div className="w-16 h-16 text-gray-400">
          {/* Minimal loading indicator */}
          <svg viewBox="0 0 24 24" fill="none" className="animate-pulse">
            <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={ref} 
      className={`mermaid-diagram ${className}`} 
      style={{
        // Ensure crisp SVG rendering at all zoom levels
        imageRendering: 'crisp-edges',
        shapeRendering: 'geometricPrecision',
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

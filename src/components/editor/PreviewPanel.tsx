"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Copy, Download, RotateCcw, ZoomIn, ZoomOut, Link as LinkIcon, Palette } from "lucide-react";
import React from "react";
import MermaidDiagram from "@/components/editor/MermaidDiagram";



export default function PreviewPanel({
  diagramTheme,
  code,
  renderKey,
  toggleThemePanel,
  copyShareLink,
  showToast,
}: {
  diagramTheme: any;
  code: string;
  renderKey: number | string;
  toggleThemePanel: () => void;
  copyShareLink: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}) {
  const [zoomPct, setZoomPct] = useState<number>(100);
  
  const stageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const panzoom = useRef({ scale: 1, tx: 0, ty: 0 });
  
  // Enhanced transform logic with smooth transitions
  const applyTransform = (smooth = false) => {
    if (!contentRef.current) return;
    const { scale, tx, ty } = panzoom.current;
    
    // Add smooth transition for theme/code changes
    if (smooth) {
      contentRef.current.style.transition = 'transform 0.3s ease-out';
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.transition = '';
        }
      }, 300);
    }
    
    contentRef.current.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    contentRef.current.style.transformOrigin = '0 0';
  };

  // Self-contained pan/zoom logic
  useEffect(() => {
    const stage = stageRef.current;
    const content = contentRef.current;
    if (!stage || !content) return;
    applyTransform();

    let dragging = false; let lastX = 0; let lastY = 0;
    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as Element).closest('.pz-toolbar, .pz-actions')) return;
      dragging = true; lastX = e.clientX; lastY = e.clientY; stage.classList.add('pz-grabbing');
    };
    const onMouseUp = () => { dragging = false; stage.classList.remove('pz-grabbing'); };
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      panzoom.current.tx += e.clientX - lastX; panzoom.current.ty += e.clientY - lastY; lastX = e.clientX; lastY = e.clientY; applyTransform();
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = stage.getBoundingClientRect();
      const cx = e.clientX - rect.left; const cy = e.clientY - rect.top;
      const prev = panzoom.current.scale; const delta = e.deltaY < 0 ? 1.1 : 0.9; let next = prev * delta;
      next = Math.min(4, Math.max(0.2, next));
      const wx = (cx - panzoom.current.tx) / prev; const wy = (cy - panzoom.current.ty) / prev;
      panzoom.current.tx = cx - wx * next; panzoom.current.ty = cy - wy * next; panzoom.current.scale = next; applyTransform();
      setZoomPct(Math.round(next * 100));
    };
    stage.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      stage.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      stage.removeEventListener('wheel', onWheel as any);
    };
  }, [stageRef.current, contentRef.current]);

  // Auto-center when diagram first loads (no animation on spawn)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    // Center immediately on spawn without animation
    const timer = setTimeout(() => {
      handleResetView(false); // No smooth animation on initial load
    }, 200);
    return () => clearTimeout(timer);
  }, [renderKey]); // Only depend on renderKey to reduce re-runs

  // Exact same center point zoom as extension
  const centerPointZoom = (factor: number) => {
    const stage = stageRef.current; if (!stage) return;
    const rect = stage.getBoundingClientRect(); const cx = rect.width / 2; const cy = rect.height / 2;
    const prev = panzoom.current.scale; let next = prev * factor; next = Math.min(4, Math.max(0.2, next));
    const wx = (cx - panzoom.current.tx) / prev; const wy = (cy - panzoom.current.ty) / prev;
    panzoom.current.tx = cx - wx * next; panzoom.current.ty = cy - wy * next; panzoom.current.scale = next; applyTransform();
    setZoomPct(Math.round(next * 100));
  };

  // Exact same fit to view as extension
  const handleFitToView = () => {
    const stage = stageRef.current; const content = contentRef.current;
    if (!stage || !content) return;
    const svgEl = content.querySelector('svg') as SVGSVGElement | null;
    if (!svgEl) return;
    const bbox = svgEl.getBBox();
    const padding = 24;
    const sw = stage.clientWidth - padding * 2; const sh = stage.clientHeight - padding * 2;
    const scale = Math.max(0.2, Math.min(4, Math.min(sw / bbox.width, sh / bbox.height)));
    const tx = (stage.clientWidth - bbox.width * scale) / 2 - bbox.x * scale;
    const ty = (stage.clientHeight - bbox.height * scale) / 2 - bbox.y * scale;
    panzoom.current = { scale, tx, ty }; applyTransform();
    setZoomPct(Math.round(scale * 100));
  };

  // Reset view to center the SVG properly with smooth animation
  const handleResetView = (smooth = true) => {
    const stage = stageRef.current; 
    const content = contentRef.current;
    if (!stage || !content) return;
    
    const svgEl = content.querySelector('svg') as SVGSVGElement | null;
    if (!svgEl) {
      // Fallback to simple reset
      panzoom.current = { scale: 1, tx: 0, ty: 0 }; 
      applyTransform(smooth); 
      setZoomPct(100);
      return;
    }
    
    // Get proper dimensions for centering
    const bbox = svgEl.getBBox();
    const stageRect = stage.getBoundingClientRect();
    
    // Center both horizontally and vertically
    const tx = (stageRect.width - bbox.width) / 2 - bbox.x;
    const ty = (stageRect.height - bbox.height) / 2 - bbox.y;
    
    panzoom.current = { scale: 1, tx, ty };
    applyTransform(smooth);
    setZoomPct(100);
  };



  // Handle copy action with toast
  const handleCopy = async () => {
    const svgEl = contentRef.current?.querySelector('svg');
    if (!svgEl) {
      showToast('No diagram to copy', 'error');
      return;
    }
    
    try {
      const svgData = new XMLSerializer().serializeToString(svgEl);
      const encodedSvg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        showToast('Copy failed', 'error');
        return;
      }
      
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load SVG'));
        img.src = encodedSvg;
      });
      
      // Get proper SVG dimensions including viewBox
      const svgRect = svgEl.getBoundingClientRect();
      const scale = 2; // 2x resolution for crisp quality
      
      canvas.width = (svgRect.width + 40) * scale; // Add padding
      canvas.height = (svgRect.height + 40) * scale;
      
      // Scale context for high DPI
      ctx.scale(scale, scale);

      // White background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
      
      // Center the image with padding
      const offsetX = 20;
      const offsetY = 20;
      ctx.drawImage(img, offsetX, offsetY, svgRect.width, svgRect.height);
      
      // Copy to clipboard
      canvas.toBlob(async (blob) => {
        if (!blob) {
          showToast('Copy failed', 'error');
          return;
        }
        
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          showToast('Diagram copied to clipboard', 'success');
        } catch (e) {
          showToast('Copy failed', 'error');
          console.error(e);
        }
      }, 'image/png');
    } catch (e) {
      showToast('Copy failed', 'error');
      console.error('Copy error:', e);
    }
  };

  // Handle download action - parent function has toasts
  const handleDownload = () => {
    const svgEl = contentRef.current?.querySelector('svg');
    if (!svgEl) {
      showToast('No diagram to download', 'error');
      return;
    }
    
    try {
      // Create canvas and convert SVG to PNG
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        showToast('Download failed', 'error');
        return;
      }
      
      const svgData = new XMLSerializer().serializeToString(svgEl);
      const encodedSvg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
      
            const img = new Image();
      img.onload = () => {
        // Get proper SVG dimensions including viewBox
        const svgRect = svgEl.getBoundingClientRect();
        const scale = 2; // 2x resolution for crisp quality
        
        canvas.width = (svgRect.width + 40) * scale; // Add padding
        canvas.height = (svgRect.height + 40) * scale;
        
        // Scale context for high DPI
        ctx.scale(scale, scale);

        // White background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
        
        // Center the image with padding
        const offsetX = 20;
        const offsetY = 20;
        ctx.drawImage(img, offsetX, offsetY, svgRect.width, svgRect.height);

        // Download
        const link = document.createElement('a');
        link.download = `flow2chat-diagram-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('Diagram downloaded successfully', 'success');
      };
      
      img.onerror = () => {
        showToast('Download failed', 'error');
      };
      
      img.src = encodedSvg;
    } catch (e) {
      console.error('Download error:', e);
      showToast('Download failed', 'error');
    }
  };

  // Handle share action - parent function has toasts
  const handleShare = () => {
    copyShareLink();
  };

  return (
    <section className="flex flex-col transition-all duration-300 min-w-[250px] h-full relative">
      {/* Match the extension's exact structure */}
      <div className="relative overflow-hidden flex-1">
        <div 
          className="relative w-full h-[100vh] overflow-hidden cursor-grab border border-gray-200 dark:border-gray-700 bg-white grid-bg" 
          ref={stageRef}
        >
          {/* Exact same structure as extension - single contentRef with SVG */}
          <div 
            className="w-max h-max will-change-transform transition-all duration-300 ease-out" 
            ref={contentRef}
          >
              <MermaidDiagram
              key={`${renderKey}-${diagramTheme}`}
                chart={code}
                theme={diagramTheme}
              />
          </div>
          
          {/* All controls in top right corner - theme + actions + zoom */}
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg p-2 flex flex-col gap-1">
              {/* Theme button at top */}
              <button 
                className="p-1.5 rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95" 
                title="Theme settings" 
                onClick={toggleThemePanel}
              >
                <Palette size={16} />
              </button>
              
              {/* Divider */}
              <div className="h-px bg-gray-200 dark:bg-gray-600 my-1"></div>
              
              {/* Action buttons */}
              <button 
                className="p-1.5 rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95" 
                title="Copy as PNG" 
                onClick={handleCopy}
              >
                <Copy size={16} />
              </button>
              <button 
                className="p-1.5 rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95" 
                title="Download PNG" 
                onClick={handleDownload}
          >
            <Download size={16} />
              </button>
              <button 
                className="p-1.5 rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95" 
                title="Copy Share Link" 
                onClick={handleShare}
          >
            <LinkIcon size={16} />
              </button>
              
              {/* Divider */}
              <div className="h-px bg-gray-200 dark:bg-gray-600 my-1"></div>
              
              {/* Zoom controls */}
              <button 
                className="p-1.5 rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95" 
                title="Zoom in" 
                onClick={() => centerPointZoom(1.2)}
          >
            <ZoomIn size={16} />
              </button>
              <button 
                className="p-1.5 rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95" 
                title="Zoom out" 
                onClick={() => centerPointZoom(1/1.2)}
          >
            <ZoomOut size={16} />
              </button>
              <button 
                className="p-1.5 rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95" 
                title="Reset & Center" 
                onClick={() => handleResetView(true)}
          >
            <RotateCcw size={16} />
              </button>
            </div>
          </div>
          
          {/* Zoom indicator (matching extension) */}
          <div className="absolute left-3 bottom-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1 text-xs text-gray-600 dark:text-gray-300 shadow-md">
            Zoom: {zoomPct}%
          </div>
          

        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef, useMemo, useCallback, useDeferredValue } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Download,
  Code,
  CheckCircle2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Link as LinkIcon,
  RefreshCw,
  GripVertical,
  Paintbrush,
  FileCode,
  Upload,
  Maximize,
} from "lucide-react";
import MermaidDiagram from "@/components/MermaidDiagram";

// -----------------------------
// Constants & Utilities
// -----------------------------

type BuiltInTheme = "default" | "dark" | "forest" | "neutral" | "base";

const diagramThemes: { id: BuiltInTheme; name: string }[] = [
  { id: "default", name: "Default" },
  { id: "dark", name: "Dark" },
  { id: "forest", name: "Forest" },
  { id: "neutral", name: "Neutral" },
  { id: "base", name: "Base" },
];

const templates = [
  {
    name: "Flowchart",
    code: `flowchart TD
    A[Christmas] --> B(Go shopping)
    B --> C{Let me think}
    C --> |One| D[Laptop]
    C --> |Two| E[iPhone]
    C --> |Three| F[fa:fa-car Car]
    C --> |Four| G[Something else]`,
  },
  {
    name: "Sequence Diagram",
    code: `sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Request data
    System->>Database: Query
    Database-->>System: Return results
    System-->>User: Display data`,
  },
  {
    name: "Class Diagram",
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
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat`,
  },
  {
    name: "Gantt Chart",
    code: `gantt
    title Project Schedule
    dateFormat  YYYY-MM-DD
    section Planning
    Define Requirements     :a1, 2023-06-01, 15d
    Design                  :a2, after a1, 20d
    section Development
    Code                    :a3, after a2, 30d
    Test                    :a4, after a3, 15d
    section Deployment
    Deploy                  :a5, after a4, 5d
    Feedback                :a6, after a5, 10d`,
  },
  {
    name: "Entity Relationship",
    code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`,
  },
  {
    name: "State Diagram",
    code: `stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]`,
  },
  {
    name: "Pie Chart",
    code: `pie title Product Usage
    "Chrome" : 42.7
    "Firefox" : 30.2
    "Edge" : 15.5
    "Safari" : 9.8
    "Others" : 1.8`,
  },
  {
    name: "User Journey",
    code: `journey
    title User Journey for Flow2Chat
    section Discovery
      Find Extension: 5: User
      Read Reviews: 3: User
    section Installation
      Install Extension: 5: User
      Initial Setup: 3: User, System
    section Usage
      Create Diagram: 5: User, System
      View Results: 5: User`,
  },
] as const;

const STORAGE_KEY = "flow2chat-editor:v2";

function debounce<T extends (...args: any[]) => void>(fn: T, ms = 250) {
  let t: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

function base64Encode(str: string) {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    return "";
  }
}

function base64Decode(str: string) {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    return "";
  }
}

// -----------------------------
// Component
// -----------------------------

export default function Editor() {
  // ------- State
  const [code, setCode] = useState<string>(templates[0].code);
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
  const [isCopied, setIsCopied] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [diagramTheme, setDiagramTheme] = useState<BuiltInTheme>("default");
  const [customTheme, setCustomTheme] = useState("");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [search, setSearch] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("");
  const [panelSizes, setPanelSizes] = useState({ code: 50, preview: 50 });
  const [isResizing, setIsResizing] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const svgMountRef = useRef<HTMLDivElement>(null);
  const resizeDividerRef = useRef<HTMLDivElement>(null);
  const pointerOrigin = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panOrigin = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const resizeStartX = useRef<number>(0);

  const deferredCode = useDeferredValue(code);

  // ------- Derived
  const filteredTemplates = useMemo(() => {
    if (!search.trim()) return templates as readonly typeof templates[number][];
    const q = search.toLowerCase();
    return templates.filter((t) => t.name.toLowerCase().includes(q));
  }, [search]);

  // ------- Persistence (load)
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const fromUrl = q.get("d");
      const raw = localStorage.getItem(STORAGE_KEY);
      if (fromUrl) {
        const decoded = base64Decode(fromUrl);
        if (decoded) setCode(decoded);
      } else if (raw) {
        const saved = JSON.parse(raw);
        if (saved.code) setCode(saved.code);
        if (typeof saved.selectedTemplate === "number") setSelectedTemplate(saved.selectedTemplate);
        if (saved.diagramTheme) setDiagramTheme(saved.diagramTheme as BuiltInTheme);
        if (saved.customTheme) setCustomTheme(saved.customTheme);
        if (typeof saved.zoom === "number") setZoom(saved.zoom);
        if (saved.pan) setPan(saved.pan);
      }
    } catch {}
  }, []);

  // ------- Persistence (save)
  useEffect(() => {
    const payload = {
      code,
      selectedTemplate,
      diagramTheme,
      customTheme,
      zoom,
      pan,
      _ts: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setLastSavedAt(Date.now());
    } catch {}
  }, [code, selectedTemplate, diagramTheme, customTheme, zoom, pan]);

  // ------- Update render key (debounced to avoid thrash)
  const bumpRender = useMemo(() => debounce(() => setRenderKey((v) => v + 1), 120), []);
  useEffect(() => {
    bumpRender();
  }, [deferredCode, diagramTheme, bumpRender]);
  
  // ------- Toast handling
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ------- Handlers
  const onChangeCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      showToast("Code copied to clipboard", "success");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch {
      // Fallback
      const el = textareaRef.current;
      if (!el) return;
      el.select();
      document.execCommand("copy");
      showToast("Code copied to clipboard", "success");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }
  };
  
  // Copy SVG as image to clipboard (based on extension logic)
  const copyDiagramAsPng = async () => {
    try {
      const svg = svgMountRef.current?.querySelector("svg");
      if (!svg) {
        showToast("No diagram to copy", "error");
        return;
      }
      
      const svgData = new XMLSerializer().serializeToString(svg);
      
      // Use base64 encoding to avoid CORS issues
      const encodedSvg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
      
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        showToast("Failed to copy diagram", "error");
        return;
      }
      
      try {
        const img = new Image();
        
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Failed to load SVG"));
          img.src = encodedSvg;
        });
        
        // Set canvas size to match the image
        canvas.width = img.width || 800;
        canvas.height = img.height || 600;
        
        // White background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        // Copy to clipboard
        canvas.toBlob(async (blob) => {
          if (!blob) {
            showToast("Failed to copy diagram", "error");
            return;
          }
          
          try {
            // Use the clipboard API to copy the image
            await navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob })
            ]);
            showToast("Diagram copied to clipboard", "success");
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
          } catch (e) {
            showToast("Failed to copy diagram", "error");
            console.error(e);
          }
        }, "image/png");
      } catch (e) {
        showToast("Failed to copy diagram", "error");
        console.error(e);
      }
    } catch (e) {
      showToast("Failed to copy diagram", "error");
      console.error(e);
    }
  };

  const copyShareLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("d", base64Encode(code));
    try {
      await navigator.clipboard.writeText(url.toString());
      showToast("Share link copied to clipboard", "success");
    } catch {
      showToast("Unable to copy share link", "error");
    }
  };

  // Download as SVG
  const downloadSVG = async () => {
    setIsDownloading(true);
    try {
      const svg = svgMountRef.current?.querySelector("svg");
      if (!svg) {
        showToast("No diagram to download", "error");
        setIsDownloading(false);
        return;
      }
      
      // Clean up the SVG for download
      const clone = svg.cloneNode(true) as SVGSVGElement;
      
      // Make sure width and height are set
      if (!clone.hasAttribute("width") || !clone.hasAttribute("height")) {
        const bbox = svg.getBBox();
        clone.setAttribute("width", String(bbox.width));
        clone.setAttribute("height", String(bbox.height));
        // Add some padding
        clone.setAttribute("viewBox", `${bbox.x - 5} ${bbox.y - 5} ${bbox.width + 10} ${bbox.height + 10}`);
      }
      
      const xml = new XMLSerializer().serializeToString(clone);
      const blob = new Blob([xml], { type: "image/svg+xml" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `flow2chat-diagram-${Date.now()}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast("SVG downloaded successfully", "success");
      setIsDownloading(false);
    } catch (e) {
      console.error(e);
      showToast("SVG export failed", "error");
      setIsDownloading(false);
    }
  };

  // Download SVG as PNG image (based on extension logic)
  const svgToPng = async () => {
    setIsDownloading(true);
    try {
      const svg = svgMountRef.current?.querySelector("svg");
      if (!svg) {
        showToast("No diagram to download", "error");
        setIsDownloading(false);
        return;
      }
      
      const svgData = new XMLSerializer().serializeToString(svg);
      
      // Use base64 encoding to avoid CORS issues
      const encodedSvg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
      
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        showToast("Failed to download diagram", "error");
        setIsDownloading(false);
        return;
      }
      
      const img = new Image();
      
      img.onload = () => {
        // Set canvas size to match the image
        canvas.width = img.width || 800;
        canvas.height = img.height || 600;
        
        // White background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        // Download
        const link = document.createElement("a");
        link.download = `flow2chat-diagram-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast("PNG downloaded successfully", "success");
        setIsDownloading(false);
      };
      
      img.onerror = () => {
        showToast("Failed to download diagram", "error");
        setIsDownloading(false);
      };
      
      img.src = encodedSvg;
    } catch (e) {
      console.error(e);
      showToast("PNG export failed", "error");
      setIsDownloading(false);
    }
  };

  const onSelectTemplate = (idx: number) => {
    setSelectedTemplate(idx);
    setCode(templates[idx].code);
    setRenderKey((v) => v + 1);
  };

  const onThemeChange = (t: BuiltInTheme) => {
    setDiagramTheme(t);
    setRenderKey((v) => v + 1);
    showToast(`${t.charAt(0).toUpperCase() + t.slice(1)} theme applied`, "success");
  };
  
  // Custom theme functionality is now a Pro feature

  // ------- Zoom / Pan (pointer-aware, zoom-to-cursor)
  const setZoomAt = useCallback((delta: number, clientX: number, clientY: number) => {
    const container = previewRef.current;
    const mount = svgMountRef.current;
    if (!container || !mount) return;

    const rect = container.getBoundingClientRect();
    const cx = clientX - rect.left;
    const cy = clientY - rect.top;

    setZoom((prevZoom) => {
      const newZoom = Math.min(3, Math.max(0.5, prevZoom + delta));
      if (newZoom === prevZoom) return prevZoom;

      // Keep cursor point stable while zooming
      setPan((prevPan) => {
        const dx = cx - prevPan.x;
        const dy = cy - prevPan.y;
        const scale = newZoom / prevZoom;
        return {
          x: cx - dx * scale,
          y: cy - dy * scale,
        };
      });
      return newZoom;
    });
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoomAt(delta, e.clientX, e.clientY);
  }, [setZoomAt]);
  
  // Add wheel event with passive: false to prevent scrolling
  useEffect(() => {
    const container = previewRef.current;
    if (!container) return;
    
    // Use { passive: false } to ensure preventDefault works
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // left only
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    pointerOrigin.current = { x: e.clientX, y: e.clientY };
    panOrigin.current = { ...pan };
    setIsPanning(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isPanning) return;
    const dx = e.clientX - pointerOrigin.current.x;
    const dy = e.clientY - pointerOrigin.current.y;
    setPan({ x: panOrigin.current.x + dx, y: panOrigin.current.y + dy });
  };

  const endPan = () => setIsPanning(false);

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const fitToView = () => {
    const container = previewRef.current;
    const svg = svgMountRef.current?.querySelector("svg");
    if (!container || !svg) return;
    const c = container.getBoundingClientRect();
    const s = svg.getBoundingClientRect();
    // Add small padding
    const pad = 24;
    const scaleX = (c.width - pad * 2) / s.width;
    const scaleY = (c.height - pad * 2) / s.height;
    const newZoom = Math.max(0.2, Math.min(3, Math.min(scaleX, scaleY)));
    setZoom(newZoom);
    // Center
    const centerX = c.width / 2 - (s.left - c.left) * newZoom - (s.width * newZoom) / 2;
    const centerY = c.height / 2 - (s.top - c.top) * newZoom - (s.height * newZoom) / 2;
    setPan({ x: centerX, y: centerY });
  };

  // ------- Panel resize functionality
  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    resizeStartX.current = e.clientX;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;
      
      const containerWidth = document.querySelector(".editor-container")?.clientWidth || 0;
      if (containerWidth === 0) return;
      
      const deltaX = e.clientX - resizeStartX.current;
      const deltaPercent = (deltaX / containerWidth) * 100;
      
      setPanelSizes(prev => {
        const newCodeSize = Math.min(Math.max(20, prev.code + deltaPercent), 80);
        return {
          code: newCodeSize,
          preview: 100 - newCodeSize
        };
      });
      
      resizeStartX.current = e.clientX;
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  // ------- Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key.toLowerCase() === "s") {
          e.preventDefault();
          // saving happens automatically; just surface status
          setStatus("Saved");
          setTimeout(() => setStatus(""), 1200);
        }
        if (e.key.toLowerCase() === "e") {
          e.preventDefault();
          svgToPng();
        }
        if (e.key.toLowerCase() === "c") {
          e.preventDefault();
          copyCode();
        }
        if (e.key.toLowerCase() === "enter") {
          e.preventDefault();
          setRenderKey((v) => v + 1);
        }
      } else {
        if (e.key === "+" || e.key === "=") {
          setZoomAt(0.1, window.innerWidth / 2, window.innerHeight / 2);
        } else if (e.key === "-") {
          setZoomAt(-0.1, window.innerWidth / 2, window.innerHeight / 2);
        } else if (e.key === "0") {
          resetView();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [copyCode, setZoomAt]);

  // ------- Theme editing
  const onCustomThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomTheme((prev: any) => ({ ...prev, [name]: value }));
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="flex flex-col h-[calc(100vh-65px)] overflow-hidden bg-[var(--bg)]">
      {/* Top banner with CTA */}
      <div className="bg-accent text-white py-2 px-4 flex items-center justify-between">
        <div className="text-md">Render diagrams directly in ChatGPT conversations with Flow2Chat extension</div>
        <div className="flex items-center gap-2">
          <motion.a
            href="https://chromewebstore.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white text-sm py-2 px-3 rounded hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Chrome - Free
          </motion.a>
          <motion.a
            href="/#pricing"
            className="bg-white text-accent text-sm py-2 px-3 rounded hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See Pro Features
          </motion.a>
        </div>
      </div>

      {/* Main content area with resizable panels */}
      <div className="flex flex-1 overflow-hidden editor-container">
        {/* Templates sidebar */}
        {showTemplates && (
          <motion.aside
            className="w-72 border-r border-[var(--border)] overflow-hidden bg-[var(--card)] flex flex-col"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-2 border-b border-[var(--border)] flex items-center justify-between">
              <h3 className="font-medium">Templates</h3>
              <motion.button
                onClick={() => setShowTemplates(false)}
                className="p-1.5 rounded hover:bg-[var(--bg)]/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close templates"
              >
                <X size={16} />
              </motion.button>
            </div>
            <div className="p-3">
              <input
                type="text"
                placeholder="Search templates…"
                className="w-full bg-[var(--bg)]/50 border border-white/10 rounded px-2 py-1 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="px-2 pb-3 overflow-y-auto">
              <div className="space-y-1">
                {filteredTemplates.map((template, index) => (
                  <motion.button
                    key={template.name}
                    className={`w-full text-left px-3 py-2 rounded text-sm ${
                      index === selectedTemplate ? "bg-accent/20 text-accent font-medium" : "hover:bg-[var(--bg)]/50"
                    }`}
                    onClick={() => onSelectTemplate(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {template.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.aside>
        )}

        {/* Code panel */}
        <section 
          className="flex flex-col border-r border-[var(--border)] transition-all duration-300 min-w-[250px]"
          style={{ width: `${panelSizes.code}%` }}
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--card)]">
            <div className="flex items-center space-x-2">
              <Code size={18} className="text-[var(--muted)]" />
              <span className="font-medium text-sm">Code</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                className="p-1.5 rounded hover:bg-[var(--bg)]/50 text-[var(--muted)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowTemplates((v) => !v);
                  if (showThemePanel) setShowThemePanel(false);
                }}
                aria-label="Templates"
              >
                <FileCode size={16} />
              </motion.button>
              
              <motion.button
                className="p-1.5 rounded hover:bg-[var(--bg)]/50 text-[var(--muted)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRenderKey((v) => v + 1)}
                aria-label="Render diagram"
              >
                <RefreshCw size={16} />
              </motion.button>
              
              <label className="p-1.5 rounded hover:bg-[var(--bg)]/50 text-[var(--muted)] cursor-pointer">
                <Upload size={16} />
                <input
                  type="file"
                  accept=".mmd,.mermaid,.txt"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    f.text().then((t) => {
                      setCode(t);
                      showToast("File imported successfully", "success");
                    });
                    e.currentTarget.value = "";
                  }}
                />
              </label>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <textarea
              ref={textareaRef}
              className="w-full h-full p-4 font-mono text-sm bg-[var(--bg)] text-[var(--text)] focus:outline-none resize-none border-none"
              value={code}
              onChange={onChangeCode}
              spellCheck={false}
              placeholder="Enter Mermaid code here…"
              aria-label="Mermaid code editor"
            />
          </div>

          <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--card)] text-xs text-[var(--muted)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>{code.split("\n").length} lines • {code.length} chars</span>
              {status && <span className="text-accent">• {status}</span>}
            </div>
            <div className="flex items-center gap-2">
              {lastSavedAt && <span>Saved {new Date(lastSavedAt).toLocaleTimeString()}</span>}
            </div>
          </div>
        </section>
        
        {/* Resize divider */}
        <div 
          ref={resizeDividerRef}
          className="w-1 hover:w-2 bg-transparent hover:bg-accent/30 cursor-col-resize flex items-center justify-center transition-all"
          onMouseDown={startResizing}
        >
          <GripVertical size={16} className="text-[var(--muted)] opacity-0 hover:opacity-100 transition-opacity" />
        </div>

        {/* Preview panel */}
        <section 
          className="flex flex-col transition-all duration-300 min-w-[250px] relative"
          style={{ width: `${panelSizes.preview}%` }}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Preview content with proper pan & zoom */}
          <div
            ref={previewRef}
            className="flex-1 overflow-hidden bg-white/95 flex items-center justify-center p-4 select-none"
            style={{ cursor: isPanning ? "grabbing" : "grab" }}
            aria-label="Diagram preview"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endPan}
            onPointerLeave={endPan}
          >
            {/* Two-layer transform: translate then scale to keep pan in screen pixels */}
            <div style={{ transform: `translate(${pan.x}px, ${pan.y}px)`, transformOrigin: "0 0" }}>
              <div style={{ transform: `scale(${zoom})`, transformOrigin: "0 0" }}>
                <div ref={svgMountRef} className="mermaid-diagram">
                  <MermaidDiagram
                    key={`${renderKey}-${diagramTheme}`}
                    chart={code}
                    theme={diagramTheme}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating controls */}
          <motion.div 
            className="absolute top-3 right-3 flex flex-col gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div className="bg-[var(--card)]/80 backdrop-blur-sm rounded-lg shadow-lg p-2 flex flex-col gap-1">
              <motion.button
                className="p-1.5 rounded hover:bg-[var(--bg)]/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowThemePanel((v) => !v);
                  if (showTemplates) setShowTemplates(false);
                }}
                aria-label="Theme settings"
              >
                <Paintbrush size={16} />
              </motion.button>
              
              <motion.button
                className="p-1.5 rounded hover:bg-[var(--bg)]/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyDiagramAsPng}
              >
                {isCopied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              </motion.button>
              
              <motion.button
                className="p-1.5 rounded hover:bg-[var(--bg)]/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={svgToPng}
              >
                <Download size={16} />
              </motion.button>
              
              <motion.button
                className="p-1.5 rounded hover:bg-[var(--bg)]/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyShareLink}
              >
                <LinkIcon size={16} />
              </motion.button>
            </motion.div>
            
            <motion.div className="bg-[var(--card)]/80 backdrop-blur-sm rounded-lg shadow-lg p-2 flex flex-col gap-1">
              <motion.button
                className="p-1.5 rounded hover:bg-[var(--bg)]/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setZoomAt(0.1, window.innerWidth / 2, window.innerHeight / 2)}
              >
                <ZoomIn size={16} />
              </motion.button>
              
              <motion.button
                className="p-1.5 rounded hover:bg-[var(--bg)]/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setZoomAt(-0.1, window.innerWidth / 2, window.innerHeight / 2)}
              >
                <ZoomOut size={16} />
              </motion.button>
              
              <motion.button
                className="p-1.5 rounded hover:bg-[var(--bg)]/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetView}
              >
                <RotateCcw size={16} />
              </motion.button>
              
              <motion.button
                className="p-1.5 rounded hover:bg-[var(--bg)]/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fitToView}
              >
                <Maximize size={16} />
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Zoom indicator */}
          <motion.div 
            className="absolute bottom-3 left-3 bg-[var(--card)]/80 backdrop-blur-sm rounded-lg shadow-lg px-2 py-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-xs text-[var(--muted)]">Zoom: {Math.round(zoom * 100)}%</span>
          </motion.div>
        </section>

        {/* Theme panel */}
        {showThemePanel && (
          <motion.aside
            className="w-72 border-l border-[var(--border)] overflow-y-auto bg-[var(--card)]"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
              <h3 className="font-medium">Theme Settings</h3>
              <motion.button
                onClick={() => setShowThemePanel(false)}
                className="p-1.5 rounded hover:bg-[var(--bg)]/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close theme panel"
              >
                <X size={16} />
              </motion.button>
            </div>

            <div className="p-4 space-y-6">
              {/* Built-in themes */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Built-in Themes</h4>
                <div className="grid grid-cols-2 gap-2">
                  {diagramThemes.map((theme) => (
                    <motion.button
                      key={theme.id}
                      className={`px-3 py-2 rounded text-xs font-medium ${diagramTheme === theme.id ? "bg-accent text-white" : "bg-[var(--bg)]/50 hover:bg-[var(--bg)]"}`}
                      onClick={() => onThemeChange(theme.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {theme.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Pro Feature: Custom CSS Theme */}
              <div className="space-y-3 mt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Custom Theme</h4>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">Coming Soon</span>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </div>
      
      {/* Toast notification */}
      {toast && (
        <motion.div 
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-accent' : 
            toast.type === 'error' ? 'bg-red-500/90' : 
            'bg-[var(--card)]/90'
          } backdrop-blur-sm text-white border border-[var(--border)]`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
}


"use client";

import { useState, useEffect, useRef, useMemo, useCallback, useDeferredValue } from "react";
import EditorBanner from "@/components/editor/EditorBanner";
import TemplatesSidebar from "@/components/editor/TemplatesSidebar";
import CodePanel from "@/components/editor/CodePanel";
import PreviewPanel from "@/components/editor/PreviewPanel";
import ThemePanel from "@/components/editor/ThemePanel";
import { templates as allTemplates } from "@/components/editor/templates";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/ui/ToastContainer";
import AdBanner from "@/components/ads/AdBanner";
import {
  X,
  GripVertical,
} from "lucide-react";

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

const templates = allTemplates;

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
  const [renderKey, setRenderKey] = useState(0);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [diagramTheme, setDiagramTheme] = useState<BuiltInTheme>("default");
  const [plan, setPlan] = useState<'free'|'pro'>('free');
  const [search, setSearch] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("");
  const [panelSizes, setPanelSizes] = useState({ code: 50, preview: 50, theme: 20 });
  const [isResizing, setIsResizing] = useState<'code-preview' | 'preview-theme' | null>(null);
  const { toasts, showToast, removeToast } = useToast();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const codePreviewDividerRef = useRef<HTMLDivElement>(null);
  const previewThemeDividerRef = useRef<HTMLDivElement>(null);
  const resizeStartX = useRef<number>(0);

  const deferredCode = useDeferredValue(code);

  // ------- Derived
  const filteredTemplates = useMemo(() => {
    if (!search.trim()) return templates as readonly typeof templates[number][];
    const q = search.toLowerCase();
    return templates.filter((t) => t.name.toLowerCase().includes(q));
  }, [search]);

  // ------- Extension integration
  const [extensionConnected, setExtensionConnected] = useState(false);
  
  useEffect(() => {
    // Listen for messages from the extension
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.source !== 'flow2chat_extension') return;
      
      const { type, data } = event.data;
      
      if (type === 'f2c_extension_connected') {
        console.log('Flow2Chat extension connected:', data.version);
        setExtensionConnected(true);
        // Request settings
        window.postMessage({ source: 'flow2chat_page', type: 'f2c_request_settings' }, '*');
        
        // Check URL for theme parameters
        const urlParams = new URLSearchParams(window.location.search);
        const themeParam = urlParams.get('theme');
        if (themeParam?.startsWith('custom:')) {
          const themeId = themeParam.split(':')[1];
          // Request this specific theme from extension
          window.postMessage({ 
            source: 'flow2chat_page', 
            type: 'f2c_request_theme',
            data: { themeId } 
          }, '*');
        }
      }
      else if (type === 'f2c_settings_update') {
        console.log('Received settings from extension:', data);
        // Apply settings from extension
        if (data.plan === 'pro' || data.plan === 'free') {
          setPlan(data.plan);
          
          // Validate URL theme against user's plan
          const urlTheme = localStorage.getItem('f2c_url_theme');
          if (urlTheme) {
            if (urlTheme === 'default' || data.plan === 'pro') {
              // User can access this theme - keep it
              setDiagramTheme(urlTheme as BuiltInTheme);
              if (urlTheme !== 'default') {
                showToast(`Applied ${urlTheme} theme from share link`, 'success');
              }
            } else {
              // Free user trying to use Pro theme - fallback to default
              setDiagramTheme('default');
              showToast('Pro theme not available on free plan - using default', 'info');
              localStorage.removeItem('f2c_url_theme');
            }
          }
        }
        
        // Only apply extension theme if no URL theme is present
        const urlTheme = localStorage.getItem('f2c_url_theme');
        if (!urlTheme && data.theme) {
          setDiagramTheme(data.theme as BuiltInTheme);
        }
        
        // Show toast
        showToast('Settings synced from extension', 'info');
      }
      else if (type === 'f2c_settings_saved') {
        if (data.success) {
          showToast('Settings saved to extension', 'success');
        } else {
          showToast('Failed to save settings: ' + (data.error || 'Unknown error'), 'error');
        }
      }
      
    };
    
    window.addEventListener('message', handleMessage);
    
    // Announce page ready
    window.postMessage({ source: 'flow2chat_page', type: 'f2c_page_ready' }, '*');
    
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  
  // Function to save settings to extension
  const saveToExtension = useCallback(() => {
    if (!extensionConnected) return;
    
    window.postMessage({
      source: 'flow2chat_page',
      type: 'f2c_save_settings',
      data: {
        plan,
        theme: diagramTheme
      }
    }, '*');
  }, [extensionConnected, plan, diagramTheme]);
  

  
  // Effect to adjust panel sizes when theme panel is toggled
  useEffect(() => {
    if (showThemePanel) {
      // When showing theme panel, adjust sizes to make room for it
      setPanelSizes(prev => {
        const newPreviewSize = Math.max(30, prev.preview * 0.7);
        return {
          code: prev.code,
          preview: newPreviewSize,
          theme: 100 - prev.code - newPreviewSize
        };
      });
    }
  }, [showThemePanel]);
  
  // ------- Persistence (load)
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const fromUrl = q.get("d");
      const codeParam = q.get('code');
      const themeParam = q.get('theme');
      const raw = localStorage.getItem(STORAGE_KEY);
      
      // Load saved data first
      if (raw && !fromUrl && !codeParam) {
        const saved = JSON.parse(raw);
        if (saved.code) setCode(saved.code);
        if (typeof saved.selectedTemplate === "number") setSelectedTemplate(saved.selectedTemplate);
        if (saved.diagramTheme) setDiagramTheme(saved.diagramTheme as BuiltInTheme);

      }

      // URL params override saved data
      if (fromUrl) {
        const decoded = base64Decode(fromUrl);
        if (decoded) setCode(decoded);
      } else if (codeParam) {
        // Direct code param from extension share (not base64)
        setCode(codeParam);
      }

      // Apply theme from URL (overrides saved theme)
      if (themeParam && ["default","dark","forest","neutral","base"].includes(themeParam)) {
        console.log('🎨 Applying theme from URL:', themeParam);
        setDiagramTheme(themeParam as BuiltInTheme);
        // Store for validation when extension connects
        localStorage.setItem('f2c_url_theme', themeParam);
        console.log('🎨 DiagramTheme state should now be:', themeParam);
      }
      
      // If no extension connection after 2 seconds, assume Pro access for URL themes
      setTimeout(() => {
        const urlTheme = localStorage.getItem('f2c_url_theme');
        if (urlTheme && !extensionConnected) {
          localStorage.removeItem('f2c_url_theme');
          // Without extension, allow all themes (assume Pro for shared links)
          setDiagramTheme(urlTheme as BuiltInTheme);
          if (urlTheme !== 'default') {
            showToast(`Applied ${urlTheme} theme from share link`, 'success');
          }
        }
      }, 2000);
    } catch {}
  }, []);

  // ------- Persistence (save)
  useEffect(() => {
    const payload = {
      code,
      selectedTemplate,
      diagramTheme,

      _ts: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setLastSavedAt(Date.now());
    } catch {}
  }, [code, selectedTemplate, diagramTheme]);

  // ------- Update render key (debounced to avoid thrash)
  const bumpRender = useMemo(() => debounce(() => setRenderKey((v) => v + 1), 120), []);
  useEffect(() => {
    bumpRender();
  }, [deferredCode, diagramTheme, bumpRender]);
  

  // ------- Handlers
  const onChangeCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value);

  
  const copyShareLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("d", base64Encode(code));
    
    // Add theme information to share link
    url.searchParams.set("theme", diagramTheme);
    
    try {
      await navigator.clipboard.writeText(url.toString());
      showToast("Share link copied to clipboard", "success");
    } catch {
      showToast("Unable to copy share link", "error");
    }
  };


  const onSelectTemplate = (idx: number) => {
    setSelectedTemplate(idx);
    setCode(templates[idx].code);
    setRenderKey((v) => v + 1);
  };

  const onThemeChange = (t: string) => {
    setDiagramTheme(t as any);
    showToast(`${t.charAt(0).toUpperCase() + t.slice(1)} theme applied`, "success");
    setRenderKey((v) => v + 1);
  };
  
  // Custom theme functionality is now a Pro feature



  // ------- Panel resize functionality
  const startResizing = useCallback((e: React.MouseEvent, type: 'code-preview' | 'preview-theme') => {
    e.preventDefault();
    setIsResizing(type);
    resizeStartX.current = e.clientX;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(null);
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
        if (isResizing === 'code-preview') {
          // Resizing between code and preview
          const maxCodeSize = showThemePanel ? 60 : 80;
          const newCodeSize = Math.min(Math.max(20, prev.code + deltaPercent), maxCodeSize);
          
          if (showThemePanel) {
            // When theme panel is visible, adjust all three panels
            const remainingWidth = 100 - newCodeSize;
            const previewRatio = prev.preview / (prev.preview + prev.theme);
            
            return {
              code: newCodeSize,
              preview: remainingWidth * previewRatio,
              theme: remainingWidth * (1 - previewRatio)
            };
          } else {
            // When theme panel is hidden, only adjust code and preview
            return {
              code: newCodeSize,
              preview: 100 - newCodeSize,
              theme: prev.theme
            };
          }
        } else {
          // Resizing between preview and theme
          const availableWidth = 100 - prev.code;
          const newPreviewSize = Math.min(Math.max(20, prev.preview + deltaPercent), availableWidth - 15);
          
          return {
            code: prev.code,
            preview: newPreviewSize,
            theme: availableWidth - newPreviewSize
          };
        }
      });
      
      resizeStartX.current = e.clientX;
    },
    [isResizing, showThemePanel]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="flex flex-col h-[calc(100vh-65px)] overflow-hidden bg-[var(--bg)]">
      {/* Top banner with CTA - hidden for Pro users */}
      <EditorBanner plan={plan} />

      {/* Main content area with resizable panels */}
      <div className="flex flex-1 overflow-hidden editor-container">
        {/* Sidebar ad for free users (left side) */}
        {!showTemplates && plan === 'free' && (
          <div className="w-[320px] min-w-[300px] border-r border-[var(--border)] bg-[var(--card)] p-4">
            <div className="text-xs text-[var(--muted)] mb-2 text-center">Advertisement</div>
            <AdBanner position="sidebar" plan={plan} />
          </div>
        )}

        {/* Templates sidebar */}
        <TemplatesSidebar
          visible={showTemplates}
          onClose={() => setShowTemplates(false)}
          search={search}
          onSearch={setSearch}
          templates={filteredTemplates}
          selectedIndex={selectedTemplate}
          onSelect={onSelectTemplate}
        />

        {/* Code panel */}
        <section 
          className="flex flex-col border-r border-[var(--border)] transition-all duration-300 min-w-[200px]"
          style={{ width: `${panelSizes.code}%` }}
        >
          <CodePanel
            code={code}
            onChangeCode={onChangeCode}
            onToggleTemplates={() => { setShowTemplates(v=>!v); if (showThemePanel) setShowThemePanel(false); }}
            onRender={() => setRenderKey((v) => v + 1)}
            textareaRef={textareaRef as React.RefObject<HTMLTextAreaElement>}
            status={status}
            lastSavedAt={lastSavedAt}
            onImport={(t)=>{ setCode(t); showToast("File imported successfully", "success"); }}
          />
        </section>
        
        {/* Code-Preview divider */}
        <div 
          ref={codePreviewDividerRef}
          className="w-1 hover:w-2 bg-transparent hover:bg-accent/30 cursor-col-resize flex items-center justify-center transition-all"
          onMouseDown={(e) => startResizing(e, 'code-preview')}
        >
          <GripVertical size={16} className="text-[var(--muted)] opacity-0 hover:opacity-100 transition-opacity" />
        </div>

        {/* Preview panel */}
        <div 
          className="flex flex-col transition-all duration-300 min-w-[200px] relative"
          style={{ width: showThemePanel ? `${panelSizes.preview}%` : `${100 - panelSizes.code}%` }}
        >
          <PreviewPanel
            diagramTheme={diagramTheme}
            code={code}
            renderKey={renderKey}
            toggleThemePanel={() => { setShowThemePanel(v=>!v); if (showTemplates) setShowTemplates(false); }}
            copyShareLink={copyShareLink}
            showToast={showToast}
          />
        </div>
        
        {/* Preview-Theme divider */}
        {showThemePanel && (
          <div 
            ref={previewThemeDividerRef}
            className="w-1 hover:w-2 bg-transparent hover:bg-accent/30 cursor-col-resize flex items-center justify-center transition-all"
            onMouseDown={(e) => startResizing(e, 'preview-theme')}
          >
            <GripVertical size={16} className="text-[var(--muted)] opacity-0 hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* Theme panel */}
        {showThemePanel && (
          <div 
            className="transition-all duration-300 min-w-[200px] relative"
            style={{ width: `${panelSizes.theme}%` }}
          >
            <ThemePanel
              isOpen={showThemePanel}
              onClose={() => setShowThemePanel(false)}
              diagramTheme={diagramTheme}
              onThemeChange={onThemeChange}
              extensionConnected={extensionConnected}
              saveToExtension={saveToExtension}
            />
          </div>
        )}

      </div>
      
      {/* Bottom ad banner for free users */}
      <AdBanner position="bottom" plan={plan} className="mx-4 mb-2" />

      {/* Unified toast system */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

    </div>
  );
}
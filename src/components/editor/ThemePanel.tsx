"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

type BuiltInTheme = "default" | "dark" | "forest" | "neutral" | "base";

interface ThemePanelProps {
  isOpen: boolean;
  onClose: () => void;
  diagramTheme: BuiltInTheme;
  onThemeChange: (theme: string) => void;
  extensionConnected: boolean;
  saveToExtension: () => void;
}

const diagramThemes: { id: BuiltInTheme; name: string }[] = [
  { id: "default", name: "Default" },
  { id: "dark", name: "Dark" },
  { id: "forest", name: "Forest" },
  { id: "neutral", name: "Neutral" },
  { id: "base", name: "Base" },
];

export default function ThemePanel({
  isOpen,
  onClose,
  diagramTheme,
  onThemeChange,
  extensionConnected,
  saveToExtension,
}: ThemePanelProps) {
  if (!isOpen) return null;

  return (
    <motion.aside
      className="border-l border-[var(--border)] overflow-y-auto bg-[var(--card)] h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
        <h3 className="font-medium">Theme Settings</h3>
        <motion.button
          onClick={onClose}
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
                className={`px-3 py-2 rounded text-xs font-medium ${
                  diagramTheme === theme.id
                    ? "bg-accent text-white"
                    : "bg-[var(--bg)]/50 hover:bg-[var(--bg)]"
                }`}
                onClick={() => onThemeChange(theme.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {theme.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Custom theme editor - Coming Soon */}
        <div className="space-y-3 mt-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Custom Theme Editor</h4>
            <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
          </div>

          <div className="text-center py-8 space-y-3">
            <div className="text-4xl opacity-50">🎨</div>
            <div className="text-sm font-medium">Custom Themes Coming Soon</div>
            <div className="text-xs text-[var(--muted)]">
              Create and customize your own diagram themes with CSS and variables.
            </div>
            <div className="text-xs text-accent font-medium">Available in a future update</div>
          </div>
        </div>

        {/* Extension integration */}
        {extensionConnected && (
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-[var(--muted)]">Extension connected</span>
              </div>
              <button
                className="px-3 py-1 text-xs rounded-lg border hover:bg-[var(--bg)]/80"
                onClick={saveToExtension}
              >
                Save to Extension
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

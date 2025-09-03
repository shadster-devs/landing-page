"use client";

import { motion } from "framer-motion";
import { Code, FileCode, RefreshCw, Upload } from "lucide-react";
import React from "react";

export default function CodePanel({
  code,
  onChangeCode,
  onToggleTemplates,
  onRender,
  textareaRef,
  status,
  lastSavedAt,
  onImport,
}: {
  code: string;
  onChangeCode: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onToggleTemplates: () => void;
  onRender: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  status: string;
  lastSavedAt: number | null;
  onImport: (text: string) => void;
}) {
  return (
    <>
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
            onClick={onToggleTemplates}
            aria-label="Templates"
          >
            <FileCode size={16} />
          </motion.button>
          
          <motion.button
            className="p-1.5 rounded hover:bg-[var(--bg)]/50 text-[var(--muted)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRender}
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
                f.text().then(onImport);
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
    </>
  );
}


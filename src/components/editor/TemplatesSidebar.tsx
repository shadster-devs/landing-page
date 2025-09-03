"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

type Template = { name: string; code: string };

export default function TemplatesSidebar({
  visible,
  onClose,
  search,
  onSearch,
  templates,
  selectedIndex,
  onSelect,
}: {
  visible: boolean;
  onClose: () => void;
  search: string;
  onSearch: (s: string) => void;
  templates: readonly Template[];
  selectedIndex: number;
  onSelect: (i: number) => void;
}) {
  if (!visible) return null;
  return (
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
          onClick={onClose}
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
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="px-2 pb-3 overflow-y-auto">
        <div className="space-y-1">
          {templates.map((template, index) => (
            <motion.button
              key={template.name}
              className={`w-full text-left px-3 py-2 rounded text-sm ${
                index === selectedIndex ? "bg-accent/20 text-accent font-medium" : "hover:bg-[var(--bg)]/50"
              }`}
              onClick={() => onSelect(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {template.name}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}


"use client";

import { PhysicsMode } from "@/components/physics/PhysicsEngine";
import { Sparkles, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModeToggleProps {
  mode: PhysicsMode;
  onToggle: () => void;
}

export default function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <>
      <AnimatePresence>
        {mode === "antigravity" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.4 }}
            className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white/70"
          >
            Drag any card · Toggle to read
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2 px-5 py-3 rounded-full font-medium text-sm transition-colors shadow-lg ${
          mode === "static"
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white pulse-glow"
            : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
        }`}
        aria-label={
          mode === "static"
            ? "Drop the resume"
            : "Return to normal resume view"
        }
      >
        <AnimatePresence mode="wait">
          {mode === "static" ? (
            <motion.span
              key="drop"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-2"
            >
              <Sparkles size={16} />
              Drop it
            </motion.span>
          ) : (
            <motion.span
              key="read"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-2"
            >
              <BookOpen size={16} />
              Put it back
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}

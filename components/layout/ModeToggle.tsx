"use client";

import { PhysicsMode } from "@/components/physics/usePhysicsWorld";
import { Orbit, BookOpen } from "lucide-react";
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
            transition={{ delay: 0.5 }}
            className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white/70"
          >
            Drag elements to toss them · Toggle off to read
          </motion.div>
        )}
      </AnimatePresence>
    <button
      onClick={onToggle}
      className={`hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2 px-5 py-3 rounded-full font-medium text-sm transition-all duration-300 shadow-lg ${
        mode === "static"
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white pulse-glow hover:scale-105"
          : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:scale-105"
      }`}
      aria-live="polite"
      aria-label={
        mode === "static"
          ? "Enable antigravity mode"
          : "Return to normal resume view"
      }
    >
      {mode === "static" ? (
        <>
          <Orbit size={18} className="animate-spin" style={{ animationDuration: "3s" }} />
          Try Antigravity
        </>
      ) : (
        <>
          <BookOpen size={18} />
          Read Resume
        </>
      )}
    </button>
    </>
  );
}

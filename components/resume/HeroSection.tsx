"use client";

import { personalInfo } from "@/lib/resume-data";
import { MapPin, ArrowDown, Sparkles, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "Lead Software Engineer",
  ".NET Full-Stack Architect",
  "AI / RAG Engineer",
  "Engineering Team Lead",
  "Microsoft Certified (MCSD)",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Status pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs text-white/70"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        Available for Senior / Staff / Principal roles
      </motion.div>

      {/* Big name */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.95] mb-6"
      >
        <span className="block gradient-text">Sanath</span>
        <span className="block gradient-text-vibrant">Kumar.</span>
      </motion.h1>

      {/* Rotating role */}
      <div className="h-10 sm:h-12 mb-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={roleIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="text-lg sm:text-2xl text-white/80 font-light flex items-center gap-2"
          >
            <Sparkles className="text-purple-400" size={18} />
            {roles[roleIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sub-tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center text-sm sm:text-base text-white/50 max-w-2xl mb-10 leading-relaxed"
      >
        12+ years of building scalable distributed systems and production AI/RAG
        pipelines. I&apos;ve shipped semantic search engines processing millions of
        records, led engineering teams of 4–6, and collaborated directly with
        US-based stakeholders across e-commerce, market research, and healthcare.
      </motion.p>

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-12 w-full max-w-3xl"
      >
        <StatBlock value="12+" label="Years Experience" />
        <StatBlock value="10M+" label="Users Served" />
        <StatBlock value="300ms" label="p95 Latency" />
        <StatBlock value="40%" label="Match Quality ↑" />
      </motion.div>

      {/* Interviewer callout */}
      <motion.a
        href="https://chat.sanath.xyz"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="group mb-6 flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md border border-cyan-400/30 hover:border-cyan-400/60 transition-all shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
        </span>
        <MessageCircle size={16} className="text-cyan-300" />
        <span className="text-sm text-white/90">
          <span className="font-semibold text-white">Interviewers:</span>{" "}
          chat with my AI clone at{" "}
          <span className="text-cyan-300 font-mono group-hover:underline">
            chat.sanath.xyz
          </span>
        </span>
      </motion.a>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="flex flex-wrap items-center justify-center gap-3 mb-16"
      >
        <a
          href={`mailto:${personalInfo.email}`}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all"
        >
          Get in touch
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all"
        >
          LinkedIn
        </a>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all"
        >
          GitHub
        </a>
      </motion.div>

      {/* Location pill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute top-6 left-6 sm:top-8 sm:left-8 hidden sm:flex items-center gap-2 text-xs text-white/40"
      >
        <MapPin size={12} />
        {personalInfo.location}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs"
      >
        <span className="tracking-widest">SCROLL</span>
        <ArrowDown size={14} className="animate-scroll" />
      </motion.div>
    </section>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold gradient-text-vibrant tabular-nums">
        {value}
      </div>
      <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
}

"use client";

import { personalInfo } from "@/lib/resume-data";
import { MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center lg:text-left"
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        {/* Profile photo placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-4xl font-bold text-white shrink-0 shadow-lg shadow-purple-500/25"
        >
          SK
        </motion.div>
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold gradient-text mb-2"
          >
            {personalInfo.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 font-light mb-1"
          >
            {personalInfo.title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base text-white/50 mb-4"
          >
            {personalInfo.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-white/60"
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-purple-400" />
              {personalInfo.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={14} className="text-pink-400" />
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:text-white/90 transition-colors"
              >
                {personalInfo.email}
              </a>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={14} className="text-orange-400" />
              {personalInfo.phone}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

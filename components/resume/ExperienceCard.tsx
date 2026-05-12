"use client";

import { Experience } from "@/lib/resume-data";
import { Building2, Calendar, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";

interface ExperienceCardProps {
  experience: Experience;
  gradient: string;
  isCurrent?: boolean;
}

export default function ExperienceCard({
  experience,
  gradient,
  isCurrent = false,
}: ExperienceCardProps) {
  return (
    <TiltCard intensity={3}>
      <div
        className="glass-card gradient-border p-7 md:p-8 relative overflow-hidden"
        style={{ "--gradient": gradient } as React.CSSProperties}
      >
        {isCurrent && (
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-[10px] text-emerald-300 font-medium uppercase tracking-wider">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            Current
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5">
              {experience.role}
            </h3>
            <p className="text-sm text-white/70 flex items-center gap-2 flex-wrap">
              <Building2 size={14} className="text-purple-400" />
              <span className="font-medium">{experience.company}</span>
              {experience.product && (
                <>
                  <span className="text-white/30">·</span>
                  <span className="text-white/50">{experience.product}</span>
                </>
              )}
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-1 text-xs text-white/40 shrink-0">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              {experience.period}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={11} />
              {experience.location}
            </span>
          </div>
        </div>

        {experience.description && (
          <p className="text-xs text-white/40 mb-5 italic border-l-2 border-purple-400/30 pl-3">
            {experience.description}
          </p>
        )}

        <div className="space-y-5">
          {experience.highlights.map((highlight, i) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex flex-wrap items-baseline gap-2 mb-2.5">
                <ArrowRight size={14} className="text-purple-400 shrink-0" />
                <h4 className="text-sm md:text-base font-semibold text-white">
                  {highlight.title}
                </h4>
                <span className="text-[10px] md:text-xs text-white/30 font-mono">
                  {highlight.tech}
                </span>
              </div>
              <ul className="space-y-2 ml-6">
                {highlight.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="text-sm text-white/70 leading-relaxed relative before:content-[''] before:absolute before:left-[-14px] before:top-[10px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gradient-to-r before:from-purple-400 before:to-pink-400"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {experience.leadership && experience.leadership.length > 0 && (
          <div className="mt-5 pt-5 border-t border-white/10">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-base">👥</span>
              <h4 className="text-sm md:text-base font-semibold text-white">
                Leadership &amp; Delivery
              </h4>
            </div>
            <ul className="space-y-2 ml-6">
              {experience.leadership.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-white/70 leading-relaxed relative before:content-[''] before:absolute before:left-[-14px] before:top-[10px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gradient-to-r before:from-amber-400 before:to-orange-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </TiltCard>
  );
}

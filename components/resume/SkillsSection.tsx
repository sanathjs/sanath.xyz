"use client";

import { skills, skillCategoryLabels, SkillCategory } from "@/lib/resume-data";
import SkillTag from "./SkillTag";
import { motion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";

const categoryIcons: Record<SkillCategory, string> = {
  language: "⚡",
  framework: "🧬",
  ai: "🧠",
  database: "🗄️",
  cloud: "☁️",
  concept: "🏛️",
  tool: "🛠️",
};

export default function SkillsSection() {
  const categories: SkillCategory[] = [
    "language",
    "framework",
    "ai",
    "database",
    "cloud",
    "concept",
    "tool",
  ];

  return (
    <TiltCard intensity={3}>
      <div
        className="glass-card gradient-border p-8 md:p-10"
        style={
          {
            "--gradient": "linear-gradient(135deg, #ec4899, #f97316, #f59e0b)",
          } as React.CSSProperties
        }
      >
        <h2 className="section-heading">Technical Skills</h2>
        <div className="space-y-5">
          {categories.map((category, idx) => {
            const items = skills.filter((s) => s.category === category);
            if (items.length === 0) return null;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <p className="text-xs text-white/40 mb-2.5 font-medium flex items-center gap-2">
                  <span>{categoryIcons[category]}</span>
                  {skillCategoryLabels[category]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: idx * 0.05 + i * 0.02,
                      }}
                    >
                      <SkillTag skill={skill} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </TiltCard>
  );
}

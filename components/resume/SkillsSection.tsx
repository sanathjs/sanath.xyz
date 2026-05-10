"use client";

import { skills, skillCategoryLabels, SkillCategory } from "@/lib/resume-data";
import SkillTag from "./SkillTag";

export default function SkillsSection() {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="glass-card gradient-border p-6" style={{ "--gradient": "linear-gradient(135deg, #ec4899, #f97316)" } as React.CSSProperties}>
      <h2 className="section-heading">Technical Skills</h2>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category}>
            <p className="text-xs text-white/40 mb-2 font-medium">
              {skillCategoryLabels[category as SkillCategory]}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills
                .filter((s) => s.category === category)
                .map((skill) => (
                  <SkillTag key={skill.name} skill={skill} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

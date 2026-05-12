"use client";

import { Skill, skillCategoryColors } from "@/lib/resume-data";

export default function SkillTag({ skill }: { skill: Skill }) {
  return (
    <span
      className={`skill-tag bg-gradient-to-r ${skillCategoryColors[skill.category]}`}
      style={{
        boxShadow: "0 4px 14px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
      }}
    >
      {skill.name}
    </span>
  );
}

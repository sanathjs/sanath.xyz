"use client";

import { Skill, skillCategoryColors } from "@/lib/resume-data";

interface SkillTagProps {
  skill: Skill;
}

export default function SkillTag({ skill }: SkillTagProps) {
  return (
    <span
      className={`skill-tag bg-gradient-to-r ${skillCategoryColors[skill.category]} shadow-lg`}
      style={{
        boxShadow: `0 2px 8px rgba(0,0,0,0.3)`,
      }}
    >
      {skill.name}
    </span>
  );
}

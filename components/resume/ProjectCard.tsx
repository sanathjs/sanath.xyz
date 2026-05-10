"use client";

import { Project } from "@/lib/resume-data";
import { ExternalLink, Folder } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      className="glass-card gradient-border p-6"
      style={
        {
          "--gradient": "linear-gradient(135deg, #3b82f6, #06b6d4)",
        } as React.CSSProperties
      }
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Folder size={16} className="text-cyan-400" />
            {project.name}
          </h3>
          <p className="text-sm text-white/60">{project.description}</p>
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/80 transition-colors shrink-0"
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>
      <p className="text-xs text-white/30 font-mono mb-3">{project.tech}</p>
      <ul className="space-y-1.5">
        {project.bullets.map((bullet, i) => (
          <li
            key={i}
            className="text-sm text-white/65 leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-cyan-400/60"
          >
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { Project } from "@/lib/resume-data";
import { ExternalLink, Sparkles } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <TiltCard intensity={4}>
      <div
        className="glass-card gradient-border p-7 md:p-8 relative overflow-hidden group"
        style={
          {
            "--gradient": "linear-gradient(135deg, #3b82f6, #06b6d4, #10b981)",
          } as React.CSSProperties
        }
      >
        <div
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-3xl pointer-events-none"
        />

        <div className="flex items-start justify-between gap-3 mb-3 relative">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 mb-1.5">
              <Sparkles size={18} className="text-cyan-400" />
              {project.name}
            </h3>
            <p className="text-sm text-white/60">{project.description}</p>
          </div>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-cyan-400 transition-colors shrink-0 hover:scale-110 transform duration-200"
              aria-label={`View ${project.name}`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
        <p className="text-[11px] text-white/40 font-mono mb-4 tracking-tight">
          {project.tech}
        </p>
        <ul className="space-y-2">
          {project.bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-sm text-white/70 leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gradient-to-r before:from-cyan-400 before:to-blue-400"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </TiltCard>
  );
}

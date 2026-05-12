"use client";

import { Project } from "@/lib/resume-data";
import { ExternalLink, Sparkles } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

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
            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 mb-1.5 flex-wrap">
              <Sparkles size={18} className="text-cyan-400" />
              {project.name}
              {project.url && (
                <span className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-[10px] text-emerald-300 font-medium uppercase tracking-wider">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  Live
                </span>
              )}
            </h3>
            <p className="text-sm text-white/60">{project.description}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors hover:scale-110 transform duration-200"
                aria-label={`${project.name} source code`}
              >
                <GitHubIcon size={18} />
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-cyan-400 transition-colors hover:scale-110 transform duration-200"
                aria-label={`Open ${project.name} live demo`}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
        <p className="text-[11px] text-white/40 font-mono mb-4 tracking-tight">
          {project.tech}
        </p>
        <ul className="space-y-2 mb-4">
          {project.bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-sm text-white/70 leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gradient-to-r before:from-cyan-400 before:to-blue-400"
            >
              {bullet}
            </li>
          ))}
        </ul>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:scale-105 transition-all"
          >
            <Sparkles size={14} />
            Try the live demo →
          </a>
        )}
      </div>
    </TiltCard>
  );
}

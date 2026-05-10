"use client";

import { Experience } from "@/lib/resume-data";
import { Building2, Calendar, MapPin } from "lucide-react";

interface ExperienceCardProps {
  experience: Experience;
  gradient: string;
}

export default function ExperienceCard({
  experience,
  gradient,
}: ExperienceCardProps) {
  return (
    <div
      className="glass-card gradient-border p-6"
      style={{ "--gradient": gradient } as React.CSSProperties}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {experience.role}
          </h3>
          <p className="text-sm text-white/70 flex items-center gap-1.5">
            <Building2 size={13} className="text-purple-400" />
            {experience.company}
            {experience.product && (
              <span className="text-white/40">({experience.product})</span>
            )}
          </p>
        </div>
        <div className="flex flex-col sm:items-end gap-1 text-xs text-white/50 shrink-0">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {experience.period}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {experience.location}
          </span>
        </div>
      </div>

      {experience.description && (
        <p className="text-xs text-white/50 mb-4 italic">
          {experience.description}
        </p>
      )}

      <div className="space-y-4">
        {experience.highlights.map((highlight) => (
          <div key={highlight.title}>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 mb-2">
              <h4 className="text-sm font-semibold text-white/90">
                {highlight.title}
              </h4>
              <span className="text-xs text-white/30 font-mono">
                {highlight.tech}
              </span>
            </div>
            <ul className="space-y-1.5">
              {highlight.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="text-sm text-white/65 leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-purple-400/60"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {experience.leadership && experience.leadership.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <h4 className="text-sm font-semibold text-white/90 mb-2">
            Leadership & Delivery
          </h4>
          <ul className="space-y-1.5">
            {experience.leadership.map((item, i) => (
              <li
                key={i}
                className="text-sm text-white/65 leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-amber-400/60"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

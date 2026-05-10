"use client";

import {
  education,
  certifications,
  publications,
  domains,
} from "@/lib/resume-data";
import { GraduationCap, Award, BookOpen, Globe } from "lucide-react";

export default function EducationCard() {
  return (
    <div
      className="glass-card gradient-border p-6"
      style={
        {
          "--gradient": "linear-gradient(135deg, #10b981, #14b8a6)",
        } as React.CSSProperties
      }
    >
      <div className="space-y-5">
        {/* Education */}
        <div>
          <h2 className="section-heading flex items-center gap-2">
            <GraduationCap size={14} className="text-emerald-400" />
            Education
          </h2>
          <p className="text-sm text-white/80 font-medium">
            {education.degree}
          </p>
          <p className="text-xs text-white/50">
            {education.institution} · {education.period}
          </p>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="section-heading flex items-center gap-2">
            <Award size={14} className="text-amber-400" />
            Certifications
          </h2>
          {certifications.map((cert) => (
            <p key={cert} className="text-sm text-white/70">
              {cert}
            </p>
          ))}
        </div>

        {/* Publications */}
        <div>
          <h2 className="section-heading flex items-center gap-2">
            <BookOpen size={14} className="text-blue-400" />
            Publications
          </h2>
          {publications.map((pub) => (
            <p key={pub} className="text-sm text-white/70">
              {pub}
            </p>
          ))}
        </div>

        {/* Domains */}
        <div>
          <h2 className="section-heading flex items-center gap-2">
            <Globe size={14} className="text-teal-400" />
            Domains
          </h2>
          <div className="flex flex-wrap gap-2">
            {domains.map((domain) => (
              <span
                key={domain}
                className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/10"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

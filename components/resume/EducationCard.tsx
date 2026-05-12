"use client";

import {
  education,
  certifications,
  publications,
  domains,
} from "@/lib/resume-data";
import { GraduationCap, Award, BookOpen, Globe } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

export default function EducationCard() {
  return (
    <TiltCard intensity={4}>
      <div
        className="glass-card gradient-border p-7 md:p-8 h-full"
        style={
          {
            "--gradient": "linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)",
          } as React.CSSProperties
        }
      >
        <div className="space-y-6">
          <div>
            <h2 className="section-heading flex items-center gap-2">
              <GraduationCap size={16} className="text-emerald-400" />
              Education
            </h2>
            <p className="text-base text-white/90 font-medium">
              {education.degree}
            </p>
            <p className="text-xs text-white/50 mt-1">
              {education.institution}
            </p>
            <p className="text-xs text-white/40 mt-0.5">{education.period}</p>
          </div>

          <div>
            <h2 className="section-heading flex items-center gap-2">
              <Award size={16} className="text-amber-400" />
              Certifications
            </h2>
            {certifications.map((cert) => (
              <p key={cert} className="text-sm text-white/75">
                {cert}
              </p>
            ))}
          </div>

          <div>
            <h2 className="section-heading flex items-center gap-2">
              <BookOpen size={16} className="text-blue-400" />
              Publications
            </h2>
            <ul className="space-y-1">
              {publications.map((pub) => (
                <li key={pub} className="text-sm text-white/75">
                  · {pub}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="section-heading flex items-center gap-2">
              <Globe size={16} className="text-teal-400" />
              Domains
            </h2>
            <div className="flex flex-wrap gap-2">
              {domains.map((domain) => (
                <span
                  key={domain}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/65 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors"
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

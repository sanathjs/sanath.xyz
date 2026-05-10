"use client";

import { summary } from "@/lib/resume-data";

export default function SummaryCard() {
  return (
    <div className="glass-card gradient-border p-6" style={{ "--gradient": "linear-gradient(135deg, #6366f1, #a855f7)" } as React.CSSProperties}>
      <h2 className="section-heading">Professional Summary</h2>
      <p className="text-white/75 leading-relaxed text-sm">{summary}</p>
    </div>
  );
}

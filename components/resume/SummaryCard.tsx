"use client";

import { summary } from "@/lib/resume-data";
import { Quote } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

export default function SummaryCard() {
  return (
    <TiltCard intensity={4}>
      <div
        className="glass-card gradient-border p-8 md:p-10 relative overflow-hidden"
        style={
          {
            "--gradient": "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
          } as React.CSSProperties
        }
      >
        <Quote
          className="absolute top-6 right-6 text-white/5"
          size={80}
          strokeWidth={1}
        />
        <div className="relative">
          <h2 className="section-heading">About</h2>
          <p className="text-white/80 leading-relaxed text-base md:text-lg font-light">
            {summary}
          </p>
        </div>
      </div>
    </TiltCard>
  );
}

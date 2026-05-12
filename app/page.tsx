"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { experiences, projects } from "@/lib/resume-data";
import HeroSection from "@/components/resume/HeroSection";
import SummaryCard from "@/components/resume/SummaryCard";
import SkillsSection from "@/components/resume/SkillsSection";
import ExperienceCard from "@/components/resume/ExperienceCard";
import ProjectCard from "@/components/resume/ProjectCard";
import EducationCard from "@/components/resume/EducationCard";
import ContactCard from "@/components/resume/ContactCard";
import PhysicsEngine, {
  PhysicsModeContext,
} from "@/components/physics/PhysicsEngine";
import PhysicsBody from "@/components/physics/PhysicsBody";
import AnimatedBackground from "@/components/effects/AnimatedBackground";
import Starfield from "@/components/effects/Starfield";

const experienceGradients = [
  "linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6)",
  "linear-gradient(135deg, #8b5cf6, #6366f1, #3b82f6)",
  "linear-gradient(135deg, #3b82f6, #06b6d4, #10b981)",
  "linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)",
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

function SectionTitle({
  number,
  title,
  hidden,
}: {
  number: string;
  title: string;
  hidden?: boolean;
}) {
  if (hidden) return null;
  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.5 }}
      className="mb-10 flex items-end gap-4"
    >
      <span className="text-xs font-mono text-white/30 mb-1">{number}</span>
      <h2 className="text-3xl md:text-4xl font-bold gradient-text tracking-tight">
        {title}
      </h2>
      <span className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent mb-3" />
    </motion.div>
  );
}

function ResumeContent() {
  const physicsMode = useContext(PhysicsModeContext);
  const isAntigravity = physicsMode?.mode === "antigravity";

  return (
    <>
      <Starfield visible={isAntigravity} />
      <main className="relative">
        {/* Hero - full viewport */}
        <PhysicsBody id="hero">
          <HeroSection />
        </PhysicsBody>

        {/* Content sections */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {/* About */}
          <section className="mb-24">
            <SectionTitle number="01" title="About" hidden={isAntigravity} />
            <PhysicsBody id="summary">
              <motion.div
                {...fadeInUp}
                transition={{ duration: 0.6 }}
              >
                <SummaryCard />
              </motion.div>
            </PhysicsBody>
          </section>

          {/* Skills */}
          <section className="mb-24">
            <SectionTitle
              number="02"
              title="Stack"
              hidden={isAntigravity}
            />
            <PhysicsBody id="skills">
              <motion.div
                {...fadeInUp}
                transition={{ duration: 0.6 }}
              >
                <SkillsSection />
              </motion.div>
            </PhysicsBody>
          </section>

          {/* Experience */}
          <section className="mb-24">
            <SectionTitle
              number="03"
              title="Experience"
              hidden={isAntigravity}
            />
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <PhysicsBody key={exp.company} id={`exp-${i}`}>
                  <motion.div
                    {...fadeInUp}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                  >
                    <ExperienceCard
                      experience={exp}
                      gradient={
                        experienceGradients[i % experienceGradients.length]
                      }
                      isCurrent={i === 0}
                    />
                  </motion.div>
                </PhysicsBody>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-24">
            <SectionTitle
              number="04"
              title="Projects"
              hidden={isAntigravity}
            />
            <div className="space-y-6">
              {projects.map((project, i) => (
                <PhysicsBody
                  key={project.name}
                  id={`project-${project.name}`}
                >
                  <motion.div
                    {...fadeInUp}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                </PhysicsBody>
              ))}
            </div>
          </section>

          {/* Education + Contact */}
          <section>
            <SectionTitle
              number="05"
              title="Et cetera"
              hidden={isAntigravity}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PhysicsBody id="education">
                <motion.div
                  {...fadeInUp}
                  transition={{ duration: 0.6 }}
                >
                  <EducationCard />
                </motion.div>
              </PhysicsBody>
              <PhysicsBody id="contact">
                <motion.div
                  {...fadeInUp}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <ContactCard />
                </motion.div>
              </PhysicsBody>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>
              Built with Next.js + Framer Motion · Deployed on Vercel
            </p>
            <p>© 2026 Sanath Kumar J S</p>
          </footer>
        </div>
      </main>
    </>
  );
}

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <PhysicsEngine>
        <ResumeContent />
      </PhysicsEngine>
    </>
  );
}

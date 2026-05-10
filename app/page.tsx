"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { experiences, projects } from "@/lib/resume-data";
import { PHYSICS_CONFIG } from "@/lib/physics-config";
import HeroSection from "@/components/resume/HeroSection";
import SummaryCard from "@/components/resume/SummaryCard";
import SkillsSection from "@/components/resume/SkillsSection";
import ExperienceCard from "@/components/resume/ExperienceCard";
import ProjectCard from "@/components/resume/ProjectCard";
import EducationCard from "@/components/resume/EducationCard";
import ContactCard from "@/components/resume/ContactCard";
import PhysicsEngine from "@/components/physics/PhysicsEngine";
import PhysicsBody from "@/components/physics/PhysicsBody";
import { PhysicsContext } from "@/components/physics/PhysicsEngine";
import Starfield from "@/components/effects/Starfield";

const experienceGradients = [
  "linear-gradient(135deg, #f59e0b, #f97316)",
  "linear-gradient(135deg, #8b5cf6, #6366f1)",
  "linear-gradient(135deg, #3b82f6, #6366f1)",
  "linear-gradient(135deg, #10b981, #059669)",
];

const fadeSlideUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

function ResumeContent() {
  const physics = useContext(PhysicsContext);
  const isAntigravity = physics?.mode === "antigravity";

  return (
    <>
      <Starfield visible={isAntigravity} />
      <main className="relative min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Hero */}
          <PhysicsBody id="hero" density={PHYSICS_CONFIG.density.hero}>
            <section className="mb-10">
              <HeroSection />
            </section>
          </PhysicsBody>

          {/* Summary */}
          <PhysicsBody id="summary">
            <motion.section
              className="mb-8"
              variants={fadeSlideUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <SummaryCard />
            </motion.section>
          </PhysicsBody>

          {/* Skills */}
          <PhysicsBody id="skills">
            <motion.section
              className="mb-8"
              variants={fadeSlideUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <SkillsSection />
            </motion.section>
          </PhysicsBody>

          {/* Experience */}
          <section className="mb-8">
            {!isAntigravity && (
              <motion.h2
                className="section-heading mb-6"
                variants={fadeSlideUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                Professional Experience
              </motion.h2>
            )}
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <PhysicsBody key={exp.company} id={`exp-${i}`}>
                  <motion.div
                    variants={fadeSlideUp}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.5, delay: 1.0 + i * 0.15 }}
                  >
                    <ExperienceCard
                      experience={exp}
                      gradient={
                        experienceGradients[i % experienceGradients.length]
                      }
                    />
                  </motion.div>
                </PhysicsBody>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-8">
            {!isAntigravity && (
              <motion.h2
                className="section-heading mb-6"
                variants={fadeSlideUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                Notable Projects
              </motion.h2>
            )}
            <div className="space-y-6">
              {projects.map((project, i) => (
                <PhysicsBody
                  key={project.name}
                  id={`project-${project.name}`}
                >
                  <motion.div
                    variants={fadeSlideUp}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.5, delay: 1.8 + i * 0.15 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                </PhysicsBody>
              ))}
            </div>
          </section>

          {/* Education & Contact */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <PhysicsBody id="education">
              <motion.div
                variants={fadeSlideUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 2.0 }}
              >
                <EducationCard />
              </motion.div>
            </PhysicsBody>
            <PhysicsBody id="contact">
              <motion.div
                variants={fadeSlideUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, delay: 2.1 }}
              >
                <ContactCard />
              </motion.div>
            </PhysicsBody>
          </section>
        </div>
      </main>
    </>
  );
}

export default function Home() {
  return (
    <PhysicsEngine>
      <ResumeContent />
    </PhysicsEngine>
  );
}

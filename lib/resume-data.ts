export type SkillCategory =
  | "language"
  | "framework"
  | "database"
  | "cloud"
  | "ai"
  | "tool"
  | "concept";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface ExperienceHighlight {
  title: string;
  tech: string;
  bullets: string[];
}

export interface Experience {
  company: string;
  product?: string;
  role: string;
  period: string;
  location: string;
  description?: string;
  highlights: ExperienceHighlight[];
  leadership?: string[];
}

export interface Project {
  name: string;
  tech: string;
  description: string;
  bullets: string[];
  url?: string;
}

export const personalInfo = {
  name: "Sanath Kumar J S",
  title: "Lead Software Engineer",
  subtitle: ".NET Full-Stack · AI / RAG Systems",
  location: "Bengaluru, India",
  phone: "+91-9036953988",
  email: "sanathjs@gmail.com",
  linkedin: "https://linkedin.com/in/sanathjs",
  github: "https://github.com/sanathjs",
  website: "sanath.xyz",
};

export const summary =
  "Results-driven Lead Software Engineer with 12+ years of full-stack .NET expertise, specialising in scalable distributed systems, RESTful API architecture, and production-grade AI/RAG pipelines. Shipped two semantic search systems in production (pgvector, HuggingFace embeddings, Groq LLM) processing millions of records at 300–800 ms p95 latency. Proven engineering leader — led and mentored teams of 4–6 engineers, drove 60% → 90% on-time delivery, and collaborated directly with US-based stakeholders across e-commerce, market research, and healthcare domains. Microsoft Certified Solutions Developer.";

export const skills: Skill[] = [
  // Languages
  { name: "C#", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "SQL", category: "language" },
  // Frameworks
  { name: ".NET 8", category: "framework" },
  { name: "ASP.NET Core", category: "framework" },
  { name: "Next.js", category: "framework" },
  { name: "React", category: "framework" },
  { name: "Angular", category: "framework" },
  // AI / ML
  { name: "RAG Pipelines", category: "ai" },
  { name: "Vector Embeddings", category: "ai" },
  { name: "pgvector", category: "ai" },
  { name: "Groq LLM", category: "ai" },
  { name: "HuggingFace", category: "ai" },
  { name: "Semantic Search", category: "ai" },
  { name: "Prompt Engineering", category: "ai" },
  // Databases
  { name: "SQL Server", category: "database" },
  { name: "PostgreSQL", category: "database" },
  { name: "Redis", category: "database" },
  { name: "Supabase", category: "database" },
  { name: "MongoDB", category: "database" },
  // Cloud / DevOps
  { name: "Azure", category: "cloud" },
  { name: "Docker", category: "cloud" },
  { name: "CI/CD", category: "cloud" },
  { name: "Vercel", category: "cloud" },
  // Architecture / Concepts
  { name: "Microservices", category: "concept" },
  { name: "REST APIs", category: "concept" },
  { name: "JWT / OAuth 2.0", category: "concept" },
  { name: "CQRS", category: "concept" },
  { name: "Clean Architecture", category: "concept" },
  // Tools
  { name: "Git", category: "tool" },
  { name: "Jira", category: "tool" },
  { name: "Swagger", category: "tool" },
  { name: "Postman", category: "tool" },
];

export const experiences: Experience[] = [
  {
    company: "Ingenio Inc.",
    product: "Keen Platform",
    role: "Lead Software Engineer / Tech Lead",
    period: "Jan 2020 – Present",
    location: "Bengaluru, India",
    description:
      "US consumer marketplace for psychic, tarot, and life-coaching services with 10M+ registered users.",
    highlights: [
      {
        title: "Semantic Advisor Search",
        tech: "C# · .NET 8 · pgvector · HuggingFace · Groq LLM · Azure",
        bullets: [
          "Architected and shipped a production RAG-based semantic search engine replacing keyword search; improved advisor match quality by ~40% and user engagement measurably.",
          "Designed a 3-signal weighted vector search (questions ×0.45, title ×0.30, body ×0.25) with HNSW indexing — p95 query latency 300–800 ms at scale on Supabase pgvector.",
          "Implemented confidence-gated answer generation (HIGH ≥ 0.62 / MEDIUM ≥ 0.52) using Groq llama-3.3-70b; added pre-flight prompt injection detection eliminating hallucinated responses in production.",
        ],
      },
      {
        title: "Advisor Feedback Search",
        tech: "C# · .NET 8 · pgvector · Semantic Search · Azure",
        bullets: [
          "Built second production RAG pipeline performing semantic search over 100,000+ advisor reviews with incremental ingestion — sub-second retrieval.",
          "Reduced review surfacing time from minutes (manual browsing) to sub-second, directly improving advisor conversion rates.",
        ],
      },
      {
        title: "JWT Authentication Migration",
        tech: "C# · .NET 8 · JWT · OAuth 2.0 · RBAC",
        bullets: [
          "Led platform-wide zero-downtime migration from session-based auth to JWT across all services serving 10M+ users.",
          "Eliminated session state from all API services — reduced server memory consumption by ~30%. Designed RBAC policies and token refresh strategy.",
        ],
      },
      {
        title: "Third-Party Platform Integrations",
        tech: "C# · REST APIs · Zendesk · Zinrelo · Iterable · ContentStack",
        bullets: [
          "Engineered Zinrelo loyalty rewards, Iterable marketing campaigns, Zendesk support, and ContentStack CMS integrations; designed API gateway layer with Polly retry policies and circuit breakers.",
        ],
      },
    ],
    leadership: [
      "Led and mentored a team of 4–6 engineers; conducted architecture reviews, code reviews, and 1:1s. Drove sprint on-time delivery from ~60% → ~90% within two quarters.",
      "Collaborated directly with US-based product managers; reduced mid-sprint scope changes by 35% through upfront requirement validation.",
    ],
  },
  {
    company: "Euromonitor International",
    product: "Passport Platform",
    role: "Senior Software Engineer / Tech Lead",
    period: "Mar 2017 – Dec 2019",
    location: "Bengaluru, India",
    description:
      "Global market intelligence SaaS platform serving 400+ Fortune 500 companies across 100+ country markets.",
    highlights: [
      {
        title: "Data Pipeline & Analytics",
        tech: "C# · .NET · SQL Server · React · Azure",
        bullets: [
          "Led technical design for a data pipeline processing 5M+ data points; improved report generation speed by 60% through query optimisation and strategic caching.",
          "Architected a hybrid microservice / monolithic platform aligned with domain boundaries, enabling independent scaling of high-traffic analytics modules.",
          "Delivered features end-to-end: C# Web API backends, React SPAs, SQL Server stored procedures, and Azure-hosted deployments.",
          "Mentored 3 junior developers; established code review standards and xUnit testing culture — increased code coverage from ~20% to ~65%.",
        ],
      },
    ],
  },
  {
    company: "Capgemini India Pvt. Ltd.",
    product: "CarePricer",
    role: "Software Engineer / Consultant",
    period: "Jul 2014 – Feb 2017",
    location: "Bengaluru, India",
    description:
      "US healthcare patient bill estimation tool for revenue cycle management.",
    highlights: [
      {
        title: "Patient Cost Estimation Platform",
        tech: "ASP.NET Web API · Angular · SQL Server",
        bullets: [
          "Built CarePricer patient cost estimation platform integrating payer contracts, historical charges, and patient benefits; served 50+ hospital client integrations and reduced billing inquiry resolution time by 45%.",
          "Developed RESTful APIs, complex insurance benefit calculation logic (EOB parsing across multiple payer formats), and Angular front-end components with real-time validation.",
        ],
      },
    ],
  },
  {
    company: "Toyota Tsusho Network Integration",
    product: "Toyota Protect",
    role: "Junior Developer (Intern → Full-time)",
    period: "Jun 2012 – Jun 2014",
    location: "Bengaluru, India",
    description:
      "Extended warranty and insurance-related services platform for Toyota vehicle owners.",
    highlights: [
      {
        title: "Warranty & Insurance Platform",
        tech: "C# · ASP.NET · SQL Server",
        bullets: [
          "Developed platform features for vehicle warranty and insurance management; built SQL Server stored procedures and data access layers for policy management, claims processing, and customer records.",
        ],
      },
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Interview Bot",
    tech: "Next.js 14 · .NET 8 · pgvector · Groq · HuggingFace · Supabase",
    description: "AI-Powered Mock Interview Assistant",
    bullets: [
      "Full-stack AI interview assistant using multi-signal RAG (3 embeddings per chunk: body, title, AI-generated question variants). Deployed on $0/month stack: Vercel + Render.com + Supabase + Groq.",
      "Implemented prompt injection detection, voice I/O (Groq Whisper STT + Web Speech TTS), session analytics, and unanswered question tracking with prep dashboard.",
    ],
    url: "https://github.com/sanathjs/interview-bot",
  },
];

export const education = {
  degree: "B.E. Computer Science",
  institution: "SDM Institute of Technology, Ujire, Karnataka",
  period: "2008 – 2012",
};

export const certifications = [
  "Microsoft Certified Solutions Developer (MCSD) · Microsoft",
];

export const publications = [
  "NoSQL/MongoDB for Beginners",
  "Deploying Node.js to Microsoft Azure",
];

export const domains = [
  "E-Commerce",
  "Market Research",
  "US Healthcare",
  "Indian Vehicle Insurance",
  "AI/ML Products",
];

export const skillCategoryColors: Record<SkillCategory, string> = {
  language: "from-blue-500 to-blue-600",
  framework: "from-purple-500 to-purple-600",
  database: "from-emerald-500 to-emerald-600",
  cloud: "from-orange-500 to-orange-600",
  ai: "from-pink-500 to-fuchsia-500",
  tool: "from-slate-400 to-slate-500",
  concept: "from-cyan-500 to-teal-500",
};

export const skillCategoryLabels: Record<SkillCategory, string> = {
  language: "Languages",
  framework: "Frameworks",
  database: "Databases",
  cloud: "Cloud / DevOps",
  ai: "AI / ML",
  tool: "Tools",
  concept: "Architecture",
};

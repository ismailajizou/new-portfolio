// Starting content for the portfolio, taken from the career knowledge base.
// Used by `yarn seed` on an empty database and as the fallback for site
// settings before anything has been saved in the backoffice.

type ProjectSeed = {
  name: string;
  tagline: string;
  description: string;
  highlights?: string[];
  stack?: string[];
  url?: string;
  status?: "SHIPPED" | "IN_PROGRESS";
};

type ExperienceSeed = {
  company: string;
  role: string;
  location: string;
  employmentType: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  highlights: string[];
  stack: string[];
  url?: string;
  projects: ProjectSeed[];
};

export const DEFAULT_SETTINGS = {
  name: "Ismail Ajizou",
  role: "Lead Full Stack Developer",
  headline:
    "I lead a two-person team that ships production platforms, from architecture to deployment.",
  about: [
    "I'm a Lead Full Stack Developer based in Casablanca. At Piyes I lead a team of two: I set the architecture, design how each feature gets built, and own the infrastructure it runs on. We moved the business from a WhatsApp-based workflow to piyes.com, an e-commerce platform with more than 19,000 products, and built the first ReparTrust MVP in one month.",
    "Before that I coached 90 bootcamp students at ARK-X Talent Factory, with more than 90% landing a job or internship in each session. One of them is now my teammate.",
    "I work mostly in TypeScript, Vue and Nuxt, React and Next.js, Laravel and Node.js, and I'm preparing for the AWS Solutions Architect certification.",
  ].join("\n\n"),
  location: "Casablanca, Morocco",
  availability:
    "Open to Full Stack, Team Lead and Tech Lead roles in Morocco, the UAE and Europe. Remote or relocation both work.",
  email: "ismailajizou1@gmail.com",
  contactHeading: "Let's build something." as string | null,
  responseTime: "Usually within two days" as string | null,
  resumeUrl: null as string | null,
  portraitUrl: "/assets/avatar.png" as string | null,
  githubUrl: "https://github.com/ismailajizou" as string | null,
  linkedinUrl: "https://www.linkedin.com/in/ismail-ajizou" as string | null,
  twitterUrl: null as string | null,
  seoTitle: "Ismail Ajizou, Lead Full Stack Developer",
  seoDescription:
    "Lead Full Stack Developer in Casablanca. I lead a two-person team shipping an e-commerce platform and a parts-sourcing marketplace on Laravel, Nuxt and self-managed infrastructure.",
};

export const DEFAULT_EXPERIENCES: ExperienceSeed[] = [
  {
    company: "WeHELP Group",
    role: "Full Stack Developer",
    location: "Meknès, Morocco",
    employmentType: "Internship, then full-time",
    startDate: "2022-04",
    endDate: "2023-07",
    summary:
      "Small marketing agency with four developers. I joined as an intern and stayed on full-time.",
    highlights: [
      "Learned Next.js and TypeScript in three days for my first project, then built it.",
      "Mentored 10+ interns, each on their own project. All of them delivered on time.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "Laravel",
      "MySQL",
    ],
    projects: [
      {
        name: "Hospitality TV platform",
        tagline: "Hotel management, point of sale and in-room TV in one PWA",
        description:
          "A hospitality TV solution that connects a hotel management system, a point-of-sale system and the in-room TV, delivered as a Progressive Web App. I built it alone.",
        highlights: ["Lighthouse score above 85%."],
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
      },
      {
        name: "Virtual try-on",
        tagline: "Try eyeglasses and shoes on from the browser",
        description:
          "A virtual try-on web app for eyeglasses and shoes, with a recommendation engine based on face shape. I built it alone.",
        stack: ["React", "TypeScript", "Laravel", "MySQL"],
      },
      {
        name: "Legal announcements",
        tagline: "Publish legal announcements from ready-made templates",
        description:
          "A platform to manage and publish legal announcements. Users fill in a form and get a ready-to-publish announcement from a template.",
        stack: ["Next.js", "TypeScript", "Laravel", "MySQL"],
      },
    ],
  },
  {
    company: "IT TRUST",
    role: "Freelance Full Stack Developer",
    location: "Remote",
    employmentType: "Freelance, part-time",
    startDate: "2022-11",
    endDate: "2023-06",
    summary:
      "An accounting firm that became a fintech software company. I co-developed two of its platforms with the founder, after hours.",
    highlights: [
      "Translated finance requirements into database design, technical specs and roadmaps for a product owner who was not a developer.",
      "Mentored the founder on development decisions and on implementing his ideas.",
    ],
    stack: ["Laravel", "Vue.js", "Inertia.js"],
    projects: [
      {
        name: "Asset management",
        tagline: "Company assets management system",
        description:
          "Co-developed a system for managing a company's assets, on a Laravel backend and a Vue.js frontend.",
        stack: ["Laravel", "Vue.js"],
      },
      {
        name: "Process management",
        tagline: "Process-management platform",
        description:
          "Co-developed a process-management platform, on a Laravel backend and a Vue.js frontend.",
        stack: ["Laravel", "Vue.js"],
      },
    ],
  },
  {
    company: "ARK-X Talent Factory",
    role: "MERN Stack Coach & Full Stack Developer",
    location: "Casablanca, Morocco",
    employmentType: "Full-time",
    startDate: "2023-07",
    endDate: "2025-02",
    summary:
      "Coding bootcamp. Half my time went to coaching and curriculum, the other half to building the internal tools coaches and administration relied on.",
    highlights: [
      "Coached 90 students directly, with 90%+ placement in each session.",
      "Co-wrote the curriculum redesign. The course rating rose from 2 to 4.5 stars.",
      "Built the frontends of two internal tools that replaced scattered Excel sheets.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Docker",
      "Tailwind CSS",
    ],
    projects: [
      {
        name: "Bootcamp coaching",
        tagline: "90 students across two five-month sessions",
        description:
          "Coached 90 students directly across two MERN sessions, 30 and then 60. More than 90% landed a job or internship in each session. One former student is now my teammate at Piyes.",
        highlights: [
          "Guided 15+ student full-stack projects through code review, problem solving and group coaching.",
        ],
      },
      {
        name: "Curriculum redesign",
        tagline: "Course rating from 2 to 4.5 stars",
        description:
          "Wrote 30% of the redesigned MERN curriculum and reviewed the other coaches' sections. Students rated the course 2 stars in the first session and 4.5 in the second.",
        highlights: [
          "Authored 4 nanodegrees for advanced students: Git/GitHub, Docker, Tailwind and unit testing.",
        ],
      },
      {
        name: "Student tracking ERP",
        tagline: "Progress and absences in one app instead of spreadsheets",
        description:
          "Built the React frontend in a team of four developers. Coaches and administration use it to track student progress and absences from one database.",
        stack: ["React", "Node.js", "Express", "MongoDB"],
      },
      {
        name: "Assessment platform",
        tagline: "One grading process across Casablanca and Rabat",
        description:
          "Built frontend parts of the platform. The learning lead creates assessments that go out to coaches on both sites, so every class is graded the same way.",
        stack: ["React", "Node.js", "MongoDB"],
      },
    ],
  },
  {
    company: "Confidential client",
    role: "Frontend Developer (Freelance)",
    location: "Remote",
    employmentType: "Freelance",
    startDate: "2025-01",
    endDate: "2025-02",
    summary:
      "A school management platform at MVP stage, built by a team of four frontend developers.",
    highlights: [
      "Worked on feature branches with pull requests reviewed by the lead.",
      "Delivered a four-module batch alongside a full-time role, about 8 hours a week.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Material UI",
      "Zustand",
      "TanStack Query",
      "React Hook Form",
      "Zod",
    ],
    projects: [
      {
        name: "School management MVP",
        tagline: "Students, attendance and staff modules",
        description:
          "Built the student management, attendance tracking and staff administration modules, including the timetable views.",
        stack: ["Next.js", "TypeScript", "Material UI"],
      },
    ],
  },
  {
    company: "Piyes",
    role: "Lead Full Stack Developer",
    location: "Casablanca, Morocco",
    employmentType: "Full-time",
    startDate: "2025-02",
    endDate: null,
    summary:
      "A marketplace between clients and car parts suppliers. I lead a team of two developers, report to the CEO, and own the architecture and the infrastructure.",
    highlights: [
      "Led the move from a manual WhatsApp-based workflow to a full e-commerce platform.",
      "Set the architecture and design how each feature gets built, then delegate the build to an intermediate developer.",
      "Own the infrastructure: Docker, GitLab CI/CD to a container registry, automatic redeploys through Portainer on a Moroccan VPS, daily database backups and Sentry.",
      "Presented Piyes and ReparTrust at GITEX Marrakech 2025, GITEX Dubai 2025 and GITEX Marrakech 2026.",
    ],
    stack: [
      "Vue.js",
      "Nuxt",
      "Pinia",
      "TanStack Query",
      "Tailwind CSS",
      "PHP",
      "Laravel",
      "PostgreSQL",
      "Redis",
      "Go",
      "n8n",
      "Docker",
      "GitLab CI/CD",
      "Portainer",
    ],
    url: "https://piyes.com",
    projects: [
      {
        name: "piyes.com",
        tagline: "E-commerce platform for car parts",
        description:
          "Replaced WhatsApp-based ordering with a full storefront: cart, orders and payments. Stock comes from a Stellantis API sync, with more than 19,000 products live.",
        highlights: [
          "CMI/Payzone payments built from sparse documentation: cash by code at an agency, and credit card through a hosted 3DS page. Both are confirmed by webhooks.",
          "PostgreSQL full-text search over the catalogue. Sale prices are computed from the supplier price plus a margin.",
          "Nuxt hybrid rendering: product pages are server-rendered for SEO, the rest renders on the client.",
          "Backend is a Laravel modular monolith.",
        ],
        stack: ["Nuxt", "Vue.js", "Laravel", "PostgreSQL", "Redis", "Docker"],
        url: "https://piyes.com",
      },
      {
        name: "ReparTrust",
        tagline: "Parts-sourcing marketplace for workshops and suppliers",
        description:
          "A workshop posts a request for parts, suppliers answer with offers, and the workshop compares them side by side. It replaces sourcing by phone, WhatsApp and email. It just launched, and workshops and insurers are being onboarded.",
        highlights: [
          "First MVP in one month with two developers, architecture and feature list included.",
          "Modular monolith on Laravel, chosen over microservices for speed to market and team size.",
          "Started as a repair-lifecycle tracker and pivoted to parts sourcing. The old modules stay dormant and working, so the pivot needed no rewrite.",
          "In-app notifications over WebSockets with Laravel Reverb.",
          "Since launch: part-quote suggestions, anonymised supplier offers, a market view of open requests and VIN or plate search.",
        ],
        stack: [
          "Laravel",
          "Vue.js",
          "PostgreSQL",
          "Laravel Reverb",
          "Redis",
          "Docker",
        ],
        url: "https://repartrust.com",
      },
      {
        name: "Stock import service",
        tagline: "Go service that streams supplier stock files",
        description:
          "n8n crashed when it parsed large supplier stock files. I moved the parsing into a small Go service that streams the CSV from SFTP and hands n8n small batches.",
        highlights: [
          "Handles daily full-stock files of 16,000+ rows and delta files several times an hour.",
          "Posts batches of 300 rows to n8n webhooks with bounded concurrency and retries.",
          "n8n keeps the matching, transform and bulk API logic.",
        ],
        stack: ["Go", "n8n", "SFTP"],
      },
      {
        name: "RFQ automation",
        tagline: "MCP tools that let Claude enter parts requests",
        description:
          "The ReparTrust API exposes MCP tools, so Claude can create and look up parts requests from client emails and supplier websites. It is an internal tool.",
        highlights: [
          "Lookups by VIN or plate, authenticated with an API token.",
        ],
        stack: ["Laravel", "MCP", "Claude"],
      },
      {
        name: "Telegram RFQ bot",
        tagline: "Parts requests sent from Telegram",
        description:
          "A Telegram bot that lets workshops create a parts request without opening the app. It is in testing and not live yet.",
        status: "IN_PROGRESS",
      },
    ],
  },
];

export const DEFAULT_INDEPENDENT_PROJECTS: ProjectSeed[] = [
  {
    name: "zod-i18n",
    tagline: "Open-source contribution",
    description:
      "Merged contributions to aiji42/zod-i18n in 2022: added French language support and fixed entries in the French and Arabic locales.",
    stack: ["TypeScript", "Zod"],
    url: "https://github.com/aiji42/zod-i18n/commits/main/?author=ismailajizou",
  },
];

export const DEFAULT_SKILLS: {
  category: string;
  items: (string | [name: string, note: string])[];
}[] = [
  {
    category: "Frontend",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Vue.js",
      "Nuxt",
      "Tailwind CSS",
      "Pinia",
      "Zustand",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Inertia.js",
      "Material UI",
    ],
  },
  {
    category: "Backend",
    items: [
      "PHP",
      "Laravel",
      "Node.js",
      "Express",
      "Nest.js",
      "Go",
      "Prisma",
      "Laravel Reverb",
      "MCP",
      ["Java / Spring", "certification"],
      ["Python / Django", "academic"],
    ],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    category: "DevOps",
    items: [
      "Docker",
      "Docker Compose",
      "GitLab CI/CD",
      "Portainer",
      "Linux",
      "VPS deployment",
      "n8n",
      ["AWS", "studying"],
    ],
  },
  {
    category: "Architecture",
    items: [
      "Modular monolith",
      "Domain-driven design",
      "PWA",
      "Real-time notifications",
    ],
  },
  {
    category: "Ways of working",
    items: ["Agile / Scrum", "Code review", "Mentoring and coaching"],
  },
];

export const DEFAULT_EDUCATION = [
  {
    institution: "EST Meknès, Moulay Ismail University",
    degree: "DUT",
    field: "Computer Engineering (Génie Informatique)",
    startDate: "2020-09",
    endDate: "2022-06",
    description:
      "Final-year project in a team of three: an autonomous parking-access system using computer vision. We trained TensorFlow plate-detection and OCR models on Moroccan plates (3,700+ annotated images after augmentation), deployed them as TFLite for edge hardware, and I helped build the Django admin backend.",
  },
];

export const DEFAULT_CERTIFICATIONS = [
  {
    name: "Spring Framework Specialization",
    issuer: "LearnQuest (Coursera)",
    date: "2024-10",
    url: "https://coursera.org/verify/specialization/3M5YPDR3HX8A",
    status: "SHIPPED" as const,
  },
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: null,
    url: null,
    status: "IN_PROGRESS" as const,
  },
];

export const DEFAULT_EVENTS = [
  {
    name: "GITEX Marrakech",
    year: "2025",
    location: "Marrakech, Morocco",
    description: "Presented Piyes and ReparTrust.",
  },
  {
    name: "GITEX Dubai",
    year: "2025",
    location: "Dubai, UAE",
    description: "Presented Piyes and ReparTrust.",
  },
  {
    name: "GITEX Marrakech",
    year: "2026",
    location: "Marrakech, Morocco",
    description: "Presented Piyes and ReparTrust.",
  },
];

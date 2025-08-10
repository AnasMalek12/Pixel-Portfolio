export type Skill = {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
};

export type Software = {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
};

export type Education = {
  title: string;
  institution: string;
  period: string;
  description?: string;
};

export type Experience = {
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description?: string;
};

export type SocialLink = {
  platform: 'email' | 'linkedin' | 'github' | 'behance' | 'instagram' | 'twitter';
  username: string;
  url: string;
};

export type ProjectType = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
};

// Updated Interface: Added resumeUrl
export interface PortfolioConfig {
  name: string;
  title: string;
  avatar: string;
  about: string;
  theme: {
    primary: string;
    secondary: string;
    background: string;
  };
  availableForWork: boolean;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  software: Software[];
  socialLinks: SocialLink[];
  projects: ProjectType[];
  resumeUrl?: string; // Added this property
}

const portfolioConfig: PortfolioConfig = {
  name: "Anas Malek ",
  title: "Fullstact Web Developer & App Developer ",
  avatar: "https://res.cloudinary.com/dmvzrbyq1/image/upload/v1749820555/Profile.webp",
  about: "I am an Master of Science in Information Technology student with experience in full-stack web development using React, Node.js, and MongoDB, as well as mobile app development using Flutter. I enjoy building practical and easy-to-use applications and have a clear understanding of both front-end and back-end development. I am focused on writing clean code and creating reliable solutions.",
  theme: {
    primary: "#7B61FF",
    secondary: "#FF61DC",
    background: "#2A1B6A"
  },
  availableForWork: true,
  // Updated Object: Added resumeUrl
  resumeUrl: "https://drive.google.com/file/d/1Ii-3VlpzqAGRIWfSYPNXGwa4Iu919UD6/view?usp=drive_link",
  education: [
    {
      title: "Master of Science in Information Technology",
      institution: "Charotar University of Science and Technology (CHARUSAT)",
      period: "2024-2026",
      description: "Focused on core concepts of Computer Science as well as Web & App Development"
    },
    {
      title: "Bachelor of Commerce",
      institution: "Sardar Patel University (SPU), Vallabh Vidyanagar",
      period: "2019-2022",
      description: "Focused on Accounting and Computer science"
    }
  ],
  experience: [
    // {
    //   title: "Co-CEO - Geeks for Geeks LPU",
    //   company: "LPU STudent Club",
    //   location: "LPU, Punjab",
    //   period: "2023 - 2024",
    //   type: "Full-time",
    //   description: "Lead tech community at LPU, organizing events, mentoring peers, and driving coding culture on campus"
    // },
    // {
    //   title: "Co-Founder & CO-CEO - Apna College LPU",
    //   company: "LPU STudent Club",
    //   location: "LPU, Punjab",
    //   period: "2022 - 2023",
    //   type: "Full-time",
    //   description: "Lead tech community at LPU, organizing events, mentoring peers, and driving coding culture on campus"
    // }
  ],
  skills: [
    { name: "MERN Stack", level: 5 },
    { name: "Flutter", level: 4 },
    { name: "SQL & MongoDB", level: 5 },
    { name: "Next.js", level: 4 },
    { name: "WebSockets", level: 3 },
    { name: "Tailwind CSS", level: 5 },
    { name: "Version Control (Git & Github)", level: 5 },
    { name: "Docker", level: 3 },
    { name: "Kubernetes", level: 3 },
    { name: "WebRTC", level: 3 },
    { name: "TensorFlow", level: 3 }
    
  ],
  software: [
    { name: "Photoshop", level: 5 },
    { name: "Premier Pro", level: 5 },
    { name: "VS Code", level: 5 },
    { name: "Cursor", level: 4 },
    { name: "DaVinci Resolve", level: 4 },
    { name: "After Effects", level: 4 },
  ],
  socialLinks: [
    {
      platform: "email",
      username: "Connectwithanasmalek@gmail.com",
      url: "mailto:connectwithanasmalek@gmail.com"
    },
    {
      platform: "github",
      username: "@AnasMalek12",
      url: "https://github.com/AnasMalek12"
    },
    {
      platform: "linkedin",
      username: "@AnasMalek12",
      url: "https://www.linkedin.com/in/anasmalek12/"
    },
    // {
    //   platform: "behance",
    //   username: "@pixelartist",
    //   url: "https://behance.net/"
    // }
  ],
  projects: [
    // {
    //   title: "Retro Space Portfolio",
    //   description: "Retro Space-Themed Developer Portfolio – Designed and developed a pixel-art inspired, retro-style portfolio with a terminal interface and animated space backdrop. Features include smooth transitions, 8-bit styled UI, and interactive windows like portfolio.exe and skills.exe to showcase projects, skills, and social links in a fun, gamified format.",
    //   image: "https://res.cloudinary.com/dugzwn4dz/image/upload/v1744401796/Screenshot_2025-04-12_012745_fo5qxg.webp",
    //   tags: ["React", "Animation", "Framer Motion", "MongoDB", "JavaScript 2D Platformer", "Tailwind CSS", "TypeScript"],
    //   link: "https://madhavendra.netlify.app/"
    // },
    // {
    //   title: "HappyBuddy AI",
    //   description: "An AI-powered child health and mental wellness assistant that lets kids interact with their favorite cartoon characters via text, voice, and video chat. It includes a smart parent dashboard with emotional analysis, risk prediction (e.g., bullying, depression), wearable integration, and auto-generated therapist-ready reports for early intervention.",
    //   image: "https://res.cloudinary.com/dugzwn4dz/image/upload/v1744401796/Screenshot_2025-04-12_012618_kpdroh.webp",
    //   tags: ["MERN Stack", "Gemini API", "OAuth2.0", "JWT", "WebRTC", "Socket.io", "Tailwind CSS", "React-pdf", "TypeScript", "Three.js"],
    //   link: "https://happybuddy.netlify.app/"
    // },
    // {
    //   title: "Calmly AI",
    //   description: "Built Calmly AI, a voice-enabled AI therapist for mental well-being using React, TypeScript, Gemini API, RNN-based context memory, and voice chat via speech-to-text and text-to-speech.",
    //   image: "https://res.cloudinary.com/dugzwn4dz/image/upload/v1744402109/Screenshot_2025-04-12_013728_ha9mft.webp",
    //   tags: ["React", "Express", "TypeScript", "Tailwind CSS", "Gemini API", "RNN", "Context Memory", "Speech-to-Text", "Text-to-Speech", "Voice Chat"],
    //   link: "https://calmly-v1.netlify.app/"
    // },
    // {
    //   title: "Retro Pixel Art Portfolio",
    //   description: "A retro-style portfolio with pixel art design elements, including a animated space backdrop. Features include smooth transitions, 8-bit styled UI, and interactive windows to showcase projects, skills, and social links in a fun, gamified format.",
    //   image: "https://res.cloudinary.com/dugzwn4dz/image/upload/v1744401796/Screenshot_2025-04-12_012502_rajjrw.webp",
    //   tags: ["React", "Framer Motion", "Tailwind CSS", "TypeScript", "shadcn"],
    //   link: "https://madhavendrasingh.netlify.app/"
    // }
    
  ]
};

export default portfolioConfig;

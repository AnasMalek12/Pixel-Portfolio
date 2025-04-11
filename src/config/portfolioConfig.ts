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
}

const portfolioConfig: PortfolioConfig = {
  name: "Madhavendra Singh ",
  title: "Fullstact Web Developer & Enterpreneur",
  avatar: "https://res.cloudinary.com/dugzwn4dz/image/upload/v1744397098/madhav-pixel-art_1_mrera8.webp",
  about: "I'm an AI SaaS developer and full-stack web developer building smart, scalable tech products.With a strong grip on AI & ML, I turn bold ideas into functional, real-world tools.As an entrepreneur, I'm obsessed with automating the future—one product at a time.Currently building powerful AI-first startups that replace human effort with code.",
  theme: {
    primary: "#7B61FF",
    secondary: "#FF61DC",
    background: "#2A1B6A"
  },
  availableForWork: true,
  education: [
    {
      title: "Btech Computer Science",
      institution: "Lovely Professional University",
      period: "2022-2026",
      description: "Focused on core concepts of Computer Science and Engineering"
    },
    {
      title: "12th",
      institution: "Kendriya Vidyalaya, Bhilwara",
      period: "2020-2022",
      description: "Focused on core subjects of Physics, Chemistry, Mathematics, and Computer Science"
    }
  ],
  experience: [
    {
      title: "Co-CEO - Geeks for Geeks LPU",
      company: "LPU STudent Club",
      location: "LPU, Punjab",
      period: "2023 - 2024",
      type: "Full-time",
      description: "Lead tech community at LPU, organizing events, mentoring peers, and driving coding culture on campus"
    },
    {
      title: "Co-Founder & CO-CEO - Apna College LPU",
      company: "LPU STudent Club",
      location: "LPU, Punjab",
      period: "2022 - 2023",
      type: "Full-time",
      description: "Lead tech community at LPU, organizing events, mentoring peers, and driving coding culture on campus"
    }
  ],
  skills: [
    { name: "MERN Stack", level: 5 },
    { name: "TypeScript", level: 4 },
    { name: "Tailwind CSS", level: 5 },
    { name: "Next.js", level: 4 },
    { name: "WebSockets", level: 3 },
    { name: "LangChain", level: 3 },
    { name: "Python", level: 5 },
    { name: "TensorFlow", level: 3 },
    { name: "PyTorch", level: 3 },
    { name: "Redis", level: 3 },
    { name: "Google Cloud", level: 4 }
    
  ],
  software: [
    { name: "Photoshop", level: 5 },
    { name: "Premier Pro", level: 5 },
    { name: "Unity 3D", level: 4 },
    { name: "Figma", level: 5 },
    { name: "VS Code", level: 5 },
    { name: "Cursor", level: 5 },
    { name: "Git", level: 5 },
    { name: "Blender", level: 4 },
    { name: "Unreal Engine", level: 3 },
    { name: "After Effects", level: 4 },
  ],
  socialLinks: [
    {
      platform: "email",
      username: "official.madhavendra@gmail.com",
      url: "mailto:official.madhavendra@gmail.com"
    },
    {
      platform: "github",
      username: "MadhavendraSinghShaktawat",
      url: "https://github.com/MadhavendraSinghShaktawat"
    },
    {
      platform: "linkedin",
      username: "@MadhavendraSinghShaktawat",
      url: "https://www.linkedin.com/in/madhavendrasinghshaktawat/"
    },
    // {
    //   platform: "behance",
    //   username: "@pixelartist",
    //   url: "https://behance.net/"
    // }
  ],
  projects: [
    {
      title: "Retro Space Portfolio",
      description: "Retro Space-Themed Developer Portfolio – Designed and developed a pixel-art inspired, retro-style portfolio with a terminal interface and animated space backdrop. Features include smooth transitions, 8-bit styled UI, and interactive windows like portfolio.exe and skills.exe to showcase projects, skills, and social links in a fun, gamified format.",
      image: "https://res.cloudinary.com/dugzwn4dz/image/upload/v1744401796/Screenshot_2025-04-12_012745_fo5qxg.webp",
      tags: ["React", "Animation", "Framer Motion", "MongoDB", "JavaScript 2D Platformer", "Tailwind CSS", "TypeScript"],
      link: "https://madhavendra.netlify.app/"
    },
    {
      title: "HappyBuddy AI",
      description: "An AI-powered child health and mental wellness assistant that lets kids interact with their favorite cartoon characters via text, voice, and video chat. It includes a smart parent dashboard with emotional analysis, risk prediction (e.g., bullying, depression), wearable integration, and auto-generated therapist-ready reports for early intervention.",
      image: "https://res.cloudinary.com/dugzwn4dz/image/upload/v1744401796/Screenshot_2025-04-12_012618_kpdroh.webp",
      tags: ["MERN Stack", "Gemini API", "OAuth2.0", "JWT", "WebRTC", "Socket.io", "Tailwind CSS", "React-pdf", "TypeScript", "Three.js"],
      link: "https://happybuddy.netlify.app/"
    },
    {
      title: "Calmly AI",
      description: "Built Calmly AI, a voice-enabled AI therapist for mental well-being using React, TypeScript, Gemini API, RNN-based context memory, and voice chat via speech-to-text and text-to-speech.",
      image: "https://res.cloudinary.com/dugzwn4dz/image/upload/v1744402109/Screenshot_2025-04-12_013728_ha9mft.webp",
      tags: ["React", "Express", "TypeScript", "Tailwind CSS", "Gemini API", "RNN", "Context Memory", "Speech-to-Text", "Text-to-Speech", "Voice Chat"],
      link: "https://calmly-v1.netlify.app/"
    },
    {
      title: "Retro Pixel Art Portfolio",
      description: "A retro-style portfolio with pixel art design elements, including a animated space backdrop. Features include smooth transitions, 8-bit styled UI, and interactive windows to showcase projects, skills, and social links in a fun, gamified format.",
      image: "https://res.cloudinary.com/dugzwn4dz/image/upload/v1744401796/Screenshot_2025-04-12_012502_rajjrw.webp",
      tags: ["React", "Framer Motion", "Tailwind CSS", "TypeScript", "shadcn"],
      link: "https://madhavendrasingh.netlify.app/"
    }
    
  ]
};

export default portfolioConfig;

export interface Location {
  city: string;
  region: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
  icon: string;
}

export interface Basics {
  name: string;
  label: string;
  email: string;
  phone: string;
  website: string;
  location: Location;
  profiles: Profile[];
  summary: string;
  longBio: string;
}

export interface Skill {
  name: string;
  level: number;
  keywords: string[];
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  url: string;
  github: string;
  technologies: string[];
  image: string;
  featured: boolean;
  category: string;
}

export interface Work {
  company: string;
  position: string;
  website: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  logo: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface Certification {
  name: string;
  date: string;
  issuer: string;
  url: string;
  description: string;
  image: string;
  featured: boolean;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  blog?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone?: string;
  location: Location;
  education: Education[];
  skills: string[];
  certifications: string[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  socialLinks?: SocialLinks;
} 
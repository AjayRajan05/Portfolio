export interface Location {
  city: string;
  region: string;
  country: string;
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
  title: string;
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
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  gpa: string;
  courses: string[];
  logo: string;
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
  basics: Basics;
  skills: SkillCategory[];
  projects: Project[];
  work: Work[];
  education: Education[];
  certifications: Certification[];
  socialLinks?: SocialLinks;
} 
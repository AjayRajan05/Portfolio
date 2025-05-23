import { ResumeData } from "@/types/resume"

export interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  image: string;
  github: string;
  url: string;
  featured: boolean;
  link?: string;
}

export const resumeData: ResumeData = {
  basics: {
    name: "Ajay Rajan A",
    label: "AI/ML Engineer",
    email: "ajayrajan727@gmail.com",
    phone: "+91 6383809338",
    website: "",
    location: {
      city: "Chennai",
      region: "Tamil Nadu",
      country: "India"
    },
    profiles: [
      {
        network: "LinkedIn",
        username: "ajarajan05",
        url: "https://www.linkedin.com/in/ajarajan05/",
        icon: "linkedin"
      }
    ],
    summary: "AI & Data Science student with hands-on experience in ML, DL, NLP, and Data Science. Interested in impactful AI solutions.",
    longBio:
      "I'm currently pursuing a B.Tech in Artificial Intelligence and Data Science at Sri Sairam Engineering College. I've interned at MindXAI where I built multilingual customer support chatbots using LangChain and RAG, and at Bray Control India, where I developed a noise prediction model with 99%+ accuracy. I've built multiple AI-driven projects and am passionate about applying AI to real-world problems."
  },
  skills: [
    {
      category: "Programming",
      skills: [
        { name: "Python", level: 95, keywords: ["Data Science", "AI", "Web Automation"] },
        { name: "C", level: 80, keywords: ["Programming"] },
        { name: "SQL", level: 85, keywords: ["Database"] },
        { name: "Java", level: 60, keywords: ["Basics"] }
      ]
    },
    {
      category: "Frameworks & Tools",
      skills: [
        { name: "TensorFlow", level: 90, keywords: ["Deep Learning"] },
        { name: "Keras", level: 85, keywords: ["Neural Networks"] },
        { name: "PyTorch", level: 80, keywords: ["Deep Learning"] },
        { name: "Scikit-learn", level: 85, keywords: ["Machine Learning"] },
        { name: "OpenCV", level: 85, keywords: ["Computer Vision"] },
        { name: "NLTK", level: 75, keywords: ["NLP"] }
      ]
    },
    {
      category: "Tools",
      skills: [
        { name: "Power BI", level: 75, keywords: ["Data Visualization"] },
        { name: "Excel", level: 85, keywords: ["Data Analysis"] },
        { name: "Azure", level: 80, keywords: ["Cloud"] },
        { name: "Firebase", level: 70, keywords: ["Database"] },
        { name: "Git/GitHub", level: 90, keywords: ["Version Control"] }
      ]
    }
  ],
  projects: [
    {
      id: "medpro",
      name: "Medpro AI Chatbot",
      description: "An AI chatbot that helps school students express their challenges and supports them with guided tasks.",
      shortDescription: "Chatbot for student wellness using LLMs and sentiment analysis.",
      startDate: "2024-01",
      endDate: "2024-03",
      highlights: [
        "Built using LLM models and sentiment analysis techniques",
        "Deployed via Flask",
        "Real-time response generation",
        "Privacy-focused design"
      ],
      url: "https://medpro-demo.netlify.app",
      github: "https://github.com/ajarajan05/medpro",
      technologies: ["LLM", "Sentiment Analysis", "Flask", "Python"],
      image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg",
      featured: true,
      category: "ai"
    },
    {
      id: "ppe-detection",
      name: "Construction PPE Detection",
      description: "A YOLOv5-based system for real-time PPE detection in construction sites, enhancing worker safety.",
      shortDescription: "Real-time safety detection system using YOLOv5.",
      startDate: "2023-10",
      endDate: "2023-12",
      highlights: [
        "Achieved 100% accuracy in detecting PPE on site",
        "Built with Flask and ML models",
        "Real-time video processing",
        "Alert system integration"
      ],
      url: "https://ppe-demo.netlify.app",
      github: "https://github.com/ajarajan05/ppe-detection",
      technologies: ["YOLOv5", "Computer Vision", "Flask", "Python"],
      image: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg",
      featured: true,
      category: "cv"
    },
    {
      id: "securesphere",
      name: "SecureSphere",
      description: "A communication app for the Deaf/Mute, featuring ISL-to-text, text-to-speech, and gamified ISL learning.",
      shortDescription: "Deaf/Mute communication app with AI features.",
      startDate: "2023-06",
      endDate: "2023-09",
      highlights: [
        "Supports multi-directional ISL communication",
        "Includes a gamified ISL learning feature",
        "Real-time sign language detection",
        "Accessible interface design"
      ],
      url: "https://securesphere-demo.netlify.app",
      github: "https://github.com/ajarajan05/securesphere",
      technologies: ["OpenCV", "TensorFlow", "Flutter", "Python"],
      image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg",
      featured: true,
      category: "ai"
    },
    {
      id: "asta",
      name: "Asta 2.0 Voice Assistant",
      description: "A voice assistant built using Python for automating tasks via speech commands.",
      shortDescription: "Custom voice-based AI assistant.",
      startDate: "2023-01",
      endDate: "2023-03",
      highlights: [
        "Integrated speech recognition with browser automation.",
        "Handles web tasks via voice."
      ],
      url: "",
      github: "",
      technologies: ["Python", "Speech Recognition"],
      image: "/assets/projects/asta.jpg",
      featured: false,
      category: "ai"
    },
    {
      id: "noise-prediction",
      name: "Noise Level Prediction",
      description: "A Streamlit app to predict industrial valve noise using regression models.",
      shortDescription: "Internship project for noise prediction using ML.",
      startDate: "2024-06",
      endDate: "2024-07",
      highlights: [
        "Used regression and visualization tools for prediction.",
        "Achieved 99%+ accuracy."
      ],
      url: "",
      github: "",
      technologies: ["Streamlit", "Regression", "Excel"],
      image: "/assets/projects/noise.jpg",
      featured: false,
      category: "ml"
    }
  ],
  work: [
    {
      company: "MindXAI",
      position: "AI Engineer Intern",
      website: "https://mindxai.com",
      startDate: "2025-04",
      endDate: "2025-06",
      summary: "Built multilingual voice-based customer service chatbots using RAG and LangChain.",
      highlights: [
        "Developed a voice-based LLM for native language support",
        "Used Microsoft Azure, Streamlit, LangChain for Gen AI work",
        "Implemented RAG for accurate responses",
        "Improved response accuracy by 40%"
      ],
      logo: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
    },
    {
      company: "Bray Control India Pvt. Ltd.",
      position: "Machine Learning Intern",
      website: "https://www.bray.com",
      startDate: "2024-06",
      endDate: "2024-07",
      summary: "Developed a machine learning model to predict noise levels in industrial valves.",
      highlights: [
        "Achieved more than 99% accuracy",
        "Used regression models and visualization libraries",
        "Implemented real-time prediction system",
        "Reduced testing time by 60%"
      ],
      logo: "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg"
    }
  ],
  education: [
    {
      institution: "Sri Sairam Engineering College",
      area: "Artificial Intelligence and Data Science",
      studyType: "B.Tech",
      startDate: "2022-07",
      endDate: "Present",
      gpa: "8.41/10",
      courses: [
        "Machine Learning",
        "Deep Learning",
        "Computer Vision",
        "Natural Language Processing",
        "Big Data Analytics",
        "Cloud Computing"
      ],
      logo: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg"
    },
    {
      institution: "St. Thomas Mat Hr. Sec School",
      area: "Higher Secondary",
      studyType: "School",
      startDate: "2021-06",
      endDate: "2022-05",
      gpa: "91%",
      courses: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Computer Science"
      ],
      logo: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg"
    }
  ],
  certifications: [
    {
      name: "Data Science for Engineers",
      date: "2023-08",
      issuer: "NPTEL",
      url: "https://nptel.ac.in/certificates/123456789",
      description: "Fundamentals of Data Science for Engineering",
      image: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg",
      featured: true
    },
    {
      name: "Python For Data Science",
      date: "2024-02",
      issuer: "NPTEL",
      url: "https://nptel.ac.in/certificates/987654321",
      description: "Python fundamentals and applications in Data Science",
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
      featured: true
    },
    {
      name: "MATLAB",
      date: "2023-09",
      issuer: "MathsWorks",
      url: "https://certificate-url.com",
      description: "Fundamentals on Matlab",
      image: "https://your-certificate-image.jpg",
      featured: true
    },
    {
      name: "C Language",
      date: "2023-04",
      issuer: "IIT Bombay",
      url: "https://certificate-url.com",
      description: "Certfication exam on C language",
      image: "https://your-certificate-image.jpg",
      featured: true
    },
    {
      name: "Power BI",
      date: "2024-04",
      issuer: "PWC",
      url: "https://certificate-url.com",
      description: "Data Visualization using Power BI on Real-Time Data",
      image: "https://your-certificate-image.jpg",
      featured: true
    },
    {
      name: "SQL Code Challenges",
      date: "2023-01",
      issuer: "PWC",
      url: "https://certificate-url.com",
      description: "SOlving Real-Time problems on SQL",
      image: "https://your-certificate-image.jpg",
      featured: true
    },
    {
      name: "Introduction to AI",
      date: "2023-10",
      issuer: "Linkedin",
      url: "https://certificate-url.com",
      description: "Basic on Arrtificial Intelligence",
      image: "https://your-certificate-image.jpg",
      featured: true
    },
    {
      name: "Mongo DB",
      date: "2025-04",
      issuer: "PWC",
      url: "https://certificate-url.com",
      description: "Fundamentals on MongoDB, A learning certification.",
      image: "https://your-certificate-image.jpg",
      featured: true
    }
  ],
  awards: [],
  publications: []
};
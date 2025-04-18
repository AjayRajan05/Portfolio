export const content = {
  // Hero Section
  hero: {
    title: "Hi, I'm Ajay Rajan",
    subtitle: "AI Engineer & Data Scientist",
    description: "I build intelligent systems using ML, NLP, and Deep Learning to solve real-world problems across industries.",
    cta: {
      primary: "View My Work",
      secondary: "Contact Me"
    }
  },

  // About Section
  about: {
    title: "About Me",
    subtitle: "AI-Driven. Impact-Oriented. Curious Always.",
    whoAmI: "I'm an Artificial Intelligence and Data Science student with a passion for building intelligent systems using Machine Learning, Deep Learning, and NLP. I enjoy solving real-world problems and constantly learning new technologies to sharpen my edge.",
    journey: "From internships at Bray Controls and Forage to national-level hackathons like Smart India Hackathon, I've built AI tools that optimize safety, health, and education. My goal is to merge innovation with impact in every project I pursue."
  },

  // Skills Section
  skills: {
    title: "My Skills",
    subtitle: "Technologies and tools I work with",
    categories: [
      {
        name: "AI/ML & Data Science",
        items: [
          { name: "TensorFlow", level: 85 },
          { name: "Keras", level: 80 },
          { name: "PyTorch", level: 75 },
          { name: "Scikit-learn", level: 85 },
          { name: "OpenCV", level: 80 },
          { name: "NLTK", level: 75 }
        ]
      },
      {
        name: "Programming & Tools",
        items: [
          { name: "Python", level: 90 },
          { name: "C", level: 80 },
          { name: "SQL", level: 75 },
          { name: "Azure", level: 65 },
          { name: "Firebase", level: 70 },
          { name: "Git & GitHub", level: 85 }
        ]
      },
      {
        name: "Visualization & Others",
        items: [
          { name: "Power BI", level: 80 },
          { name: "Excel", level: 80 },
          { name: "Matplotlib", level: 75 },
          { name: "Seaborn", level: 70 },
          { name: "Streamlit", level: 70 }
        ]
      }
    ]
  },

  // Achievements Section
  achievements: {
    title: "My Achievements",
    subtitle: "Milestones and recognitions in my AI journey",
    items: [
      {
        title: "Smart India Hackathon 2024 Finalist",
        description: "Developed an AI-powered agriculture platform with 92% accurate ML model and NLP chatbot.",
        date: "2024",
        icon: "trophy"
      },
      {
        title: "AI Intern @ Bray Controls",
        description: "Built a 99% accurate noise prediction model for industrial valves.",
        date: "2024",
        icon: "certificate"
      },
      {
        title: "Power BI Intern @ Forage",
        description: "Designed 5 dashboards for real-world datasets using Excel, DAX, and Power BI.",
        date: "2024",
        icon: "graph"
      },
      {
        title: "Open Source & Tech Speaker",
        description: "Regular contributor to open-source AI tools and presenter at student AI meetups.",
        date: "2022–Present",
        icon: "speaker"
      }
    ]
  },

  // Projects Section
  projects: {
    title: "My Projects",
    subtitle: "Some real-world problems I've tackled with AI",
    items: [
      {
        title: "MedPro",
        description: "AI chatbot designed to help school students communicate and receive mental health support via interactive tasks.",
        technologies: ["Flask", "LLM", "Sentiment Analysis"],
        image: "/projects/medpro.jpg",
        link: "https://github.com/your-username/medpro"
      },
      {
        title: "Construction PPE Detection",
        description: "A real-time YOLOv5 system that detects safety equipment in construction sites with 100% accuracy.",
        technologies: ["YOLOv5", "OpenCV", "Flask"],
        image: "/projects/ppe-detection.jpg",
        link: "https://github.com/your-username/ppe-detection"
      },
      {
        title: "SecureSphere",
        description: "Mobile app for Deaf/Mute communication via ISL-to-Text-to-Speech and interactive ISL learning features.",
        technologies: ["TensorFlow", "OpenCV", "Flutter", "SiGML"],
        image: "/projects/securesphere.jpg",
        link: "https://github.com/your-username/securesphere"
      },
      {
        title: "Asta 2.0",
        description: "Voice-enabled personal AI assistant using Speech Recognition and Web Automation.",
        technologies: ["Python", "SpeechRecognition", "Web Automation"],
        image: "/projects/asta.jpg",
        link: "https://github.com/your-username/asta"
      },
      {
        title: "Noise Level Prediction",
        description: "Internship project with Streamlit app to predict valve noise using regression models (99% accuracy).",
        technologies: ["Streamlit", "Regression", "Data Prep"],
        image: "/projects/noise-prediction.jpg",
        link: "https://github.com/your-username/noise-prediction"
      }
    ]
  },

  // Contact Section
  contact: {
    title: "Get in Touch",
    subtitle: "Let’s collaborate, connect, or geek out about AI!",
    email: "ajayrajan727@gmail.com",
    phone: "+91 63838 09338",
    location: "Chennai, India",
    social: {
      github: "https://github.com/ajayrajan727",
      linkedin: "https://www.linkedin.com/in/ajarajan05",
      twitter: "https://twitter.com/amudh"
    }
  },

  // Footer Section
  footer: {
    about: "AI & Data Science enthusiast with a passion for using technology to solve impactful, real-world challenges. Always learning, always building.",
    quickLinks: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Skills", href: "/skills" },
      { name: "Achievements", href: "/certifications" },
      { name: "Projects", href: "/projects" },
      { name: "Contact", href: "/contact" }
    ]
  }
};

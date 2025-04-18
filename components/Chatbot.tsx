'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, XMarkIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { resumeData } from '@/config/resume';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface SuggestedQuery {
  text: string;
  category: 'experience' | 'skills' | 'projects' | 'education' | 'contact' | 'achievements' | 'certifications';
}

const suggestedQueries: SuggestedQuery[] = [
  { text: "Tell me about your experience", category: 'experience' },
  { text: "What are your core skills?", category: 'skills' },
  { text: "Show me your recent projects", category: 'projects' },
  { text: "What's your educational background?", category: 'education' },
  { text: "How can I contact you?", category: 'contact' },
  { text: "What are your achievements?", category: 'achievements' },
  { text: "Do you have any certifications?", category: 'certifications' }
];

const initialBotMessages = [
  `Hi! I'm your AI assistant. I can help you learn more about ${resumeData.personalInfo.name}'s portfolio and experience.`,
  "Here are some things you can ask me:",
  ...suggestedQueries.map(query => `- ${query.text}`),
];

const knowledgeBase = {
  experience: [
    {
      question: "experience",
      answer: `I have experience in AI and Data Science, including:
      ${resumeData.experience.map(exp => 
        `- ${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate})
         ${exp.highlights.map(highlight => `  • ${highlight}`).join('\n')}`
      ).join('\n\n')}`
    }
  ],
  skills: [
    {
      question: "skills",
      answer: `My skills include:
      
      Technical Skills:
      ${resumeData.skills.technical.map(skill => `- ${skill}`).join('\n')}
      
      Tools & Technologies:
      ${resumeData.skills.tools.map(tool => `- ${tool}`).join('\n')}
      
      Soft Skills:
      ${resumeData.skills.soft.map(skill => `- ${skill}`).join('\n')}`
    }
  ],
  projects: [
    {
      question: "projects",
      answer: `Some of my recent projects include:
      ${resumeData.projects.map(project => 
        `- ${project.title}: ${project.description}
         Technologies: ${project.technologies.join(', ')}
         Highlights:
         ${project.highlights.map(highlight => `  • ${highlight}`).join('\n')}
         GitHub: ${project.link}`
      ).join('\n\n')}`
    }
  ],
  education: [
    {
      question: "education",
      answer: `My educational background:
      ${resumeData.education.map(edu => 
        `- ${edu.degree} in ${edu.field}
         Institution: ${edu.institution}
         Location: ${edu.location}
         Duration: ${edu.startDate} - ${edu.endDate}
         GPA: ${edu.gpa}
         ${edu.highlights ? `Highlights:
         ${edu.highlights.map(highlight => `  • ${highlight}`).join('\n')}` : ''}`
      ).join('\n\n')}`
    }
  ],
  contact: [
    {
      question: "contact",
      answer: `You can reach me through:
      - Email: ${resumeData.personalInfo.email}
      - Phone: ${resumeData.personalInfo.phone}
      - Location: ${resumeData.personalInfo.location}
      - LinkedIn: ${resumeData.personalInfo.linkedin}
      - GitHub: ${resumeData.personalInfo.github}`
    }
  ],
  achievements: [
    {
      question: "achievements",
      answer: `My achievements include:
      ${resumeData.achievements.map(achievement => 
        `- ${achievement.title} (${achievement.date})
         ${achievement.description}
         Organization: ${achievement.organization}`
      ).join('\n\n')}`
    }
  ],
  certifications: [
    {
      question: "certifications",
      answer: `My certifications include:
      ${resumeData.certifications.map(cert => 
        `- ${cert.name}
         Issuer: ${cert.issuer}
         Date: ${cert.date}
         Link: ${cert.link}`
      ).join('\n\n')}`
    }
  ]
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(
    initialBotMessages.map((text, index) => ({
      id: `bot-${index}`,
      text,
      sender: 'bot' as const,
      timestamp: new Date(),
    }))
  );
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call the API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
        }),
      });

      const data = await response.json();
      
      // Add bot response
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        text: data.reply || "Sorry, I couldn't generate a response.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling chat API:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: `bot-${Date.now()}`,
        text: "Sorry, I encountered an error. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
      >
        <ChatBubbleLeftIcon className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">AI Portfolio Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-200 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  disabled={isLoading || !inputValue.trim()}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <PaperAirplaneIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot; 
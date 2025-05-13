import { SectionTitle } from "@/components/shared/SectionTitle";
import { resumeData } from "@/data/resume";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileText, Download, Mail } from "lucide-react";

export default function AboutPage() {
  const { basics, education } = resumeData;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="About Me"
          subtitle="Learn more about my background, expertise, and values"
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Sidebar with image and contact buttons */}
          <div className="space-y-6">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/assests/logos/A.jpg"
                alt="Ajay Rajan"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-4">
              <Button className="w-full" asChild>
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              
              <Button variant="outline" className="w-full" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  View Resume
                </a>
              </Button>
              
              <Button variant="secondary" className="w-full" asChild>
                <a href={`mailto:${basics.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </a>
              </Button>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Biography</h2>
              {basics.longBio.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Education</h2>
              
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-primary/60 pl-4 py-1">
                  <h3 className="text-xl font-semibold">{edu.institution}</h3>
                  <p className="text-primary">{edu.studyType} in {edu.area}</p>
                  <p className="text-muted-foreground text-sm mt-1">{edu.startDate} — {edu.endDate}</p>
                  
                  <div className="mt-3">
                    <p className="text-sm font-medium">Relevant Courses:</p>
                    <ul className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-muted-foreground">
                      {edu.courses.map((course, courseIndex) => (
                        <li key={courseIndex} className="flex items-start">
                          <span className="mr-2 mt-1.5 h-1 w-1 rounded-full bg-primary/80 flex-shrink-0"></span>
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client"

import { useEffect, useRef } from "react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { resumeData } from "@/data/resume";
import Image from "next/image";
import { Calendar, Briefcase, GraduationCap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parseISO } from "date-fns";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Format date from YYYY-MM to display format
function formatDate(dateString: string): string {
  if (dateString === "Present") return "Present";
  
  try {
    return format(parseISO(`${dateString}-01`), "MMM yyyy");
  } catch (error) {
    return dateString;
  }
}

export default function ExperiencePage() {
  const { work, education } = resumeData;
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const timeline = timelineRef.current;
    
    // GSAP animation for timeline items
    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.from(".timeline-line", {
        height: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timeline,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.5
        }
      });

      // Timeline items animation
      gsap.from(".timeline-item", {
        x: ({index}) => index % 2 === 0 ? -30 : 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timeline,
          start: "top 80%"
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <SectionTitle
        title="Experience & Education"
        subtitle="My professional journey and academic background"
      />

      <Tabs defaultValue="work" className="mt-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="work" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Work Experience
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Education
          </TabsTrigger>
        </TabsList>

        {/* Work Experience Timeline */}
        <TabsContent value="work" className="mt-8">
          <div ref={timelineRef} className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px timeline-line"></div>
            
            <div className="space-y-12">
              {work.map((job, index) => (
                <div key={index} className={`timeline-item relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2 md:px-8">
                    <div className={`bg-card rounded-lg border border-border shadow-sm p-6 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      {/* Timeline dot */}
                      <div className="absolute top-6 md:top-10 left-1/2 h-4 w-4 rounded-full bg-primary border-4 border-card -translate-x-1/2"></div>
                      
                      <div className="flex items-start gap-4">
                        <div className="hidden sm:block flex-shrink-0 w-16 h-16 relative bg-muted rounded-lg overflow-hidden">
                          {job.logo ? (
                            <Image
                              src={job.logo}
                              alt={job.company}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full w-full bg-primary/10 text-primary">
                              {job.company.substring(0, 2)}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {formatDate(job.startDate)} — {formatDate(job.endDate)}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-semibold">{job.position}</h3>
                          <p className="text-primary font-medium">{job.company}</p>
                          <p className="text-muted-foreground mt-2 mb-4">{job.summary}</p>
                          
                          <ul className="space-y-2 mt-4">
                            {job.highlights.map((highlight, hIndex) => (
                              <li key={hIndex} className="flex items-start">
                                <div className="mr-2 mt-1 flex-shrink-0 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                                </div>
                                <span className="text-sm">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Education Timeline */}
        <TabsContent value="education" className="mt-8">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px timeline-line"></div>
            
            <div className="space-y-12">
              {education.map((edu, index) => (
                <div key={index} className={`timeline-item relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2 md:px-8">
                    <div className={`bg-card rounded-lg border border-border shadow-sm p-6 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      {/* Timeline dot */}
                      <div className="absolute top-6 md:top-10 left-1/2 h-4 w-4 rounded-full bg-primary border-4 border-card -translate-x-1/2"></div>
                      
                      <div className="flex items-start gap-4">
                        <div className="hidden sm:block flex-shrink-0 w-16 h-16 relative bg-muted rounded-lg overflow-hidden">
                          {edu.logo ? (
                            <Image
                              src={edu.logo}
                              alt={edu.institution}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full w-full bg-primary/10 text-primary">
                              {edu.institution.substring(0, 2)}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-semibold">{edu.institution}</h3>
                          <p className="text-primary font-medium">{edu.studyType} in {edu.area}</p>
                          <p className="text-muted-foreground mt-2">GPA: {edu.gpa}</p>
                          
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Relevant Courses:</h4>
                            <ul className="grid grid-cols-1 gap-1 text-sm text-muted-foreground">
                              {edu.courses.map((course, courseIndex) => (
                                <li key={courseIndex} className="flex items-start">
                                  <div className="mr-2 mt-1 flex-shrink-0 h-3 w-3 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="h-1 w-1 rounded-full bg-primary"></span>
                                  </div>
                                  <span>{course}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
"use client"

import { useState } from "react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { resumeData } from "@/data/resume";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Award, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function CertificationsPage() {
  const { certifications, awards, publications } = resumeData;

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <SectionTitle
        title="Certifications & Achievements"
        subtitle="Professional credentials, awards, and publications"
      />

      <Tabs defaultValue="certifications" className="mt-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="certifications" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Certifications
          </TabsTrigger>
          <TabsTrigger value="awards" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Awards
          </TabsTrigger>
          <TabsTrigger value="publications" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Publications
          </TabsTrigger>
        </TabsList>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="mt-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {certifications.map((cert, index) => (
              <motion.div 
                key={index}
                className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                variants={fadeInUp}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Certificate image */}
                  <div className="sm:w-1/3 aspect-square sm:aspect-auto relative">
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Certificate details */}
                  <div className="p-5 sm:w-2/3 flex flex-col">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{cert.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                    <p className="text-primary font-medium mb-1">{cert.issuer}</p>
                    <p className="text-muted-foreground text-sm flex-grow mb-4">{cert.description}</p>
                    
                    <div className="mt-auto flex justify-end">
                      <Button asChild variant="outline" size="sm" className="group/btn">
                        <a href={cert.url} target="_blank" rel="noopener noreferrer">
                          View Certificate
                          <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        {/* Awards Tab */}
        <TabsContent value="awards" className="mt-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {awards.map((award, index) => (
              <motion.div 
                key={index}
                className="bg-card rounded-xl border border-border p-6 shadow-sm"
                variants={fadeInUp}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{award.date}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                <p className="text-primary font-medium mb-4">{award.awarder}</p>
                <p className="text-muted-foreground text-sm">{award.summary}</p>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        {/* Publications Tab */}
        <TabsContent value="publications" className="mt-8">
          <motion.div 
            className="space-y-6"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {publications.map((pub, index) => (
              <motion.div 
                key={index}
                className="bg-card rounded-xl border border-border p-6 shadow-sm"
                variants={fadeInUp}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{pub.releaseDate}</span>
                      <Badge className="ml-3">{pub.publisher}</Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{pub.name}</h3>
                    <p className="text-muted-foreground">{pub.summary}</p>
                  </div>
                  
                  <div className="flex-shrink-0 mt-4 md:mt-0">
                    <Button asChild variant="outline" size="sm">
                      <a href={pub.url} target="_blank" rel="noopener noreferrer">
                        Read Paper
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
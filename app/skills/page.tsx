"use client"

import { useState } from "react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { resumeData } from "@/data/resume";
import { Progress } from "@/components/ui/progress";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function SkillsPage() {
  const { skills } = resumeData;
  const [selectedCategory, setSelectedCategory] = useState(skills[0].category);

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
        title="My Skills"
        subtitle="A comprehensive overview of my technical expertise"
      />

      <Tabs 
        defaultValue={selectedCategory} 
        onValueChange={setSelectedCategory}
        className="mt-8"
      >
        <TabsList className="w-full flex overflow-x-auto space-x-1 sm:space-x-2 mb-8 pb-px">
          {skills.map((category) => (
            <TabsTrigger 
              key={category.category} 
              value={category.category}
              className="flex-shrink-0"
            >
              {category.category}
            </TabsTrigger>
          ))}
        </TabsList>

        {skills.map((category) => (
          <TabsContent 
            key={category.category} 
            value={category.category}
            className="mt-0"
          >
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {category.skills.map((skill) => (
                <motion.div 
                  key={skill.name}
                  variants={fadeInUp}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <CardTitle>{skill.name}</CardTitle>
                      <CardDescription>
                        {skill.level >= 90 ? "Expert" : 
                         skill.level >= 80 ? "Advanced" : 
                         skill.level >= 70 ? "Proficient" : 
                         skill.level >= 50 ? "Intermediate" : "Beginner"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Proficiency</span>
                          <span>{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} />
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {skill.keywords.map((keyword, kwIndex) => (
                            <Badge
                              key={`${skill.name}-${kwIndex}`}
                              variant="secondary"
                              className="rounded-md"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
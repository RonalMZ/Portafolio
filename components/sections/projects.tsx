"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Github, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { ProjectImage } from "@/components/project-image";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="bg-muted/30 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Proyectos"
          title="Proyectos con evidencia real."
          description="Una selección corta de trabajo que puede revisarse: demos activas, repositorios públicos y decisiones técnicas concretas."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card className="group flex h-full flex-col overflow-hidden border-border/60 bg-background/70 shadow-sm backdrop-blur transition-colors duration-300 hover:border-primary/40">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ProjectImage
                    image={project.image}
                    title={project.title}
                    tags={project.tags}
                    status={project.status}
                  />
                  <ProgressiveBlur direction="top" className="opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                  {project.featured && (
                    <Badge className="absolute left-3 top-3 gap-1 bg-background/80 text-foreground backdrop-blur">
                      <Sparkles className="h-3 w-3 text-primary" /> Destacado
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <div className="mb-3 inline-flex w-fit rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {project.status}
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </CardContent>

                <CardContent className="space-y-2 pt-0">
                  {project.proof.map((item) => (
                    <div
                      key={item}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="mt-auto flex-wrap gap-2 pt-0">
                  {project.demo && (
                    <Button asChild size="sm" className="flex-1">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Ver demo de ${project.title}`}
                      >
                        <ExternalLink /> Ver Demo
                      </a>
                    </Button>
                  )}
                  {project.code && (
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Ver código de ${project.title}`}
                      >
                        <Github /> Ver Código
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

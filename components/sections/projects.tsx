"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
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
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="bg-muted/30 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Proyectos"
          title="Cosas que he construido (y que pienso seguir mejorando)."
          description="Pequeños productos, experimentos con IA y mini-tiendas. Cada uno me enseñó algo distinto sobre escribir código que de verdad termina en producción."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card className="group flex h-full flex-col overflow-hidden border-border/60 bg-background/60 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ProjectImage
                    image={project.image}
                    title={project.title}
                    tags={project.tags}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  {project.featured && (
                    <Badge className="absolute left-3 top-3 gap-1 bg-background/80 text-foreground backdrop-blur">
                      <Sparkles className="h-3 w-3 text-primary" /> Destacado
                    </Badge>
                  )}
                </div>

                <CardHeader>
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

                <CardFooter className="mt-auto gap-2 pt-0">
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
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

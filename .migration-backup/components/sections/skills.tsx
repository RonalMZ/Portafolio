"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { skillCategories } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Habilidades"
          title="Mi caja de herramientas — clasificada por uso real."
          description="Estos son los niveles honestos: puedo construir con todo lo de aquí, algunas cosas con los ojos cerrados y otras con la documentación abierta en otra pestaña."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Card className="h-full border-border/60">
                  <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.skills.map((skill, sIdx) => (
                      <div key={skill.name}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{
                              duration: 0.9,
                              delay: 0.1 + sIdx * 0.05,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-primary via-purple-500 to-cyan-400"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

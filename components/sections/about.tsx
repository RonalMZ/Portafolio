"use client";

import { MapPin } from "lucide-react";
import { personalInfo, stats } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { InView } from "@/components/motion-primitives/in-view";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Sobre mí"
          title="Júnior, hambriento de buenos productos."
          description="Vivo el desarrollo como un oficio: construir algo, romperlo, mejorarlo, y volverlo a construir. Aprendo más rápido cuando el código termina en manos de personas reales."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <InView
            className="space-y-5 text-lg leading-relaxed text-muted-foreground"
          >
            <p>{personalInfo.bio}</p>
            <p>{personalInfo.longBio}</p>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              {personalInfo.location}
            </div>
          </InView>

          <InView delay={0.1} className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/40"
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </InView>
        </div>
      </div>
    </section>
  );
}

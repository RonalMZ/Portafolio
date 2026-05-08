"use client";

import { motion } from "framer-motion";
import { Download, Github, Linkedin, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-1/3 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-10 top-10 -z-10 h-72 w-72 rounded-full bg-purple-500/20 blur-[100px]" />
        <div className="absolute bottom-10 left-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_85%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.15]" />
      </div>

      <div className="container grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Disponible para mi primer rol — {personalInfo.location}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {personalInfo.name.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-400 bg-clip-text text-transparent [background-size:200%_100%] animate-gradient-shift">
              {personalInfo.name.split(" ").slice(-1)[0]}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg font-medium text-muted-foreground sm:text-xl"
          >
            {personalInfo.role}{" "}
            <span className="mx-2 text-border">|</span>{" "}
            <span className="text-foreground">{personalInfo.specialty}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg"
          >
            {personalInfo.tagline}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <a href="#projects">
                Ver Proyectos <ArrowRight className="ml-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={personalInfo.social.cv} download>
                <Download /> Descargar CV
              </a>
            </Button>
            <div className="ml-2 flex items-center gap-1">
              <Button asChild variant="ghost" size="icon" aria-label="GitHub">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                aria-label="LinkedIn"
              >
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-sm"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary via-purple-500 to-cyan-400 opacity-30 blur-3xl" />
          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/30 via-purple-500/20 to-cyan-400/20 p-1 shadow-2xl">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-7xl font-bold text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.3),transparent_60%)]" />
              <span className="relative tracking-tight">RJ</span>
              <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
                <Sparkles className="h-3 w-3" /> AI-ready
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

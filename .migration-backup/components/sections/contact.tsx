"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/section-heading";
import { Chatbot } from "@/components/chatbot";
import { personalInfo } from "@/lib/data";

export function Contact() {
  const [sent, setSent] = React.useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const message = String(data.get("message") || "");
    const email = String(data.get("email") || "");
    const subject = encodeURIComponent(`Mensaje desde el portafolio — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Contacto"
          title="¿Construimos algo juntos?"
          description="Si tienes una vacante, un proyecto pequeño, o solo quieres saludar — escríbeme. Te respondo el mismo día."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Nombre
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Tu nombre"
                  className="mt-1.5"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="mt-1.5"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="message" className="text-sm font-medium">
                Mensaje
              </label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Cuéntame sobre la vacante o el proyecto…"
                className="mt-1.5"
              />
            </div>
            <Button type="submit" size="lg" className="mt-5 w-full sm:w-auto">
              {sent ? <Check /> : <Send />}
              {sent ? "¡Listo!" : "Enviar mensaje"}
            </Button>

            <div className="mt-8 grid gap-2 border-t border-border/60 pt-6 text-sm text-muted-foreground">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-primary" /> {personalInfo.email}
              </a>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <Github className="h-4 w-4 text-primary" /> GitHub
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <Linkedin className="h-4 w-4 text-primary" /> LinkedIn
              </a>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Chatbot />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

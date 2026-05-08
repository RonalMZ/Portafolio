import { Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-primary to-purple-500 text-primary-foreground">
            <Sparkles className="h-3 w-3" />
          </span>
          © {new Date().getFullYear()} {personalInfo.name}. Construido con
          React, Tailwind y demasiado café.
        </div>
        <div className="flex items-center gap-1">
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Email"
            className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

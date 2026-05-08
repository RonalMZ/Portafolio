import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { timeline } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="bg-muted/30 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Experiencia y formación"
          title="Cómo llegué hasta aquí (todavía está pasando)."
          description="Una mezcla de bootcamp, cursos especializados, lecturas obsesivas y proyectos reales para clientes locales."
        />

        <div className="relative mt-12">
          <div className="absolute left-4 top-2 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-primary via-border to-transparent md:left-1/2" />
          <ul className="space-y-10">
            {timeline.map((item, idx) => {
              const Icon = item.icon;
              const isRight = idx % 2 === 1;
              return (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className={`relative grid gap-4 pl-12 md:grid-cols-2 md:gap-12 md:pl-0 ${
                    isRight ? "md:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <span className="absolute left-0 top-1 grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-primary md:left-1/2 md:-translate-x-1/2">
                    <Icon className="h-4 w-4" />
                  </span>

                  <div
                    className={`md:px-8 ${isRight ? "md:text-left" : "md:text-right"}`}
                  >
                    <div className="rounded-xl border border-border/60 bg-background/60 p-5 shadow-sm backdrop-blur">
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {item.period}
                      </div>
                      <h3 className="mt-1 text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.organization}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div aria-hidden className="hidden md:block" />
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

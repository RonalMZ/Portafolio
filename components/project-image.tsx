"use client";

import * as React from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { Project } from "@/lib/data";

type ProjectImageProps = Pick<Project, "image" | "title" | "tags">;

export function ProjectImage({ image, title, tags }: ProjectImageProps) {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.28),transparent_35%),linear-gradient(135deg,hsl(var(--muted)),hsl(var(--background)))] px-6 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-xl border border-border/70 bg-background/70 text-muted-foreground">
          <ImageOff className="h-7 w-7" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Preview no disponible · {tags.slice(0, 2).join(" + ")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={image}
      alt={title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      onError={() => setFailed(true)}
    />
  );
}

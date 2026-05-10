"use client";

import * as React from "react";
import Image from "next/image";
import { Boxes, ImageOff } from "lucide-react";
import type { Project } from "@/lib/data";

type ProjectImageProps = Pick<Project, "image" | "title" | "tags" | "status">;

export function ProjectImage({ image, title, tags, status }: ProjectImageProps) {
  const [failed, setFailed] = React.useState(false);

  if (!image || failed) {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.30),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.18),transparent_36%),linear-gradient(135deg,hsl(var(--muted)),hsl(var(--background)))] p-5">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>{status}</span>
          {failed ? <ImageOff className="h-4 w-4" /> : <Boxes className="h-4 w-4" />}
        </div>
        <div className="max-w-[90%]">
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {tags.slice(0, 3).join(" / ")}
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

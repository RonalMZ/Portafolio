"use client";

import * as React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { categories, type Category } from "@/lib/products";
import { formatMXN } from "@/lib/utils";

export type FilterState = {
  query: string;
  category: Category | "Todas";
  priceMax: number;
  minRating: number;
};

const DEFAULTS: FilterState = {
  query: "",
  category: "Todas",
  priceMax: 2500,
  minRating: 0,
};

export function CatalogFilters({
  value,
  onChange,
}: {
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const update = (patch: Partial<FilterState>) =>
    onChange({ ...value, ...patch });
  const reset = () => onChange(DEFAULTS);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value.query}
          onChange={(e) => update({ query: e.target.value })}
          placeholder="Busca por nombre, marca o tag (ej. tenis, audífonos)…"
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => update({ category: "Todas" })}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            value.category === "Todas"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border/60 bg-background hover:bg-accent"
          }`}
        >
          Todas
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => update({ category: c })}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              value.category === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/60 bg-background hover:bg-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 md:w-72">
        <div>
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Precio máx.
            </span>
            <span className="font-medium text-foreground">
              {formatMXN(value.priceMax)}
            </span>
          </div>
          <Slider
            value={[value.priceMax]}
            min={200}
            max={2500}
            step={50}
            onValueChange={(v) => update({ priceMax: v[0] })}
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>Rating mínimo</span>
            <span className="font-medium text-foreground">
              {value.minRating === 0 ? "cualquiera" : `${value.minRating}★+`}
            </span>
          </div>
          <Slider
            value={[value.minRating]}
            min={0}
            max={5}
            step={0.5}
            onValueChange={(v) => update({ minRating: v[0] })}
          />
        </div>
      </div>

      {(value.query ||
        value.category !== "Todas" ||
        value.priceMax !== DEFAULTS.priceMax ||
        value.minRating !== DEFAULTS.minRating) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          className="self-end md:self-auto"
        >
          <X className="h-4 w-4" /> Limpiar
        </Button>
      )}

      <Badge variant="outline" className="md:self-auto">
        Demo
      </Badge>
    </div>
  );
}

export const DEFAULT_FILTERS = DEFAULTS;

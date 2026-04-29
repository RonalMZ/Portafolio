"use client";

import * as React from "react";
import { Frown } from "lucide-react";
import { CatalogFilters, DEFAULT_FILTERS, type FilterState } from "@/components/catalog-filters";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export function Catalog() {
  const [filters, setFilters] = React.useState<FilterState>(DEFAULT_FILTERS);

  const filtered = React.useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return products.filter((p) => {
      if (filters.category !== "Todas" && p.category !== filters.category)
        return false;
      if (p.price > filters.priceMax) return false;
      if (p.rating < filters.minRating) return false;
      if (q) {
        const haystack = [
          p.name,
          p.brand,
          p.category,
          p.shortDescription,
          ...p.tags,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <section id="catalogo" className="container scroll-mt-20 py-12 sm:py-16">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Catálogo
          </h2>
          <p className="text-sm text-muted-foreground">
            {filtered.length} producto{filtered.length === 1 ? "" : "s"}{" "}
            disponible{filtered.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <CatalogFilters value={filters} onChange={setFilters} />

      {filtered.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/50 p-10 text-center">
          <Frown className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No encontramos nada con esos filtros. Prueba pidiéndoselo a la IA
            con la sección de recomendaciones.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
